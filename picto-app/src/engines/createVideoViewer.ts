import * as THREE from "three";
import type { PannellumViewer } from "@/types/panorama.types";
import "@/components/css/Video360.css";

/**
 * Video 360 engine built on three.js.
 *
 * Implements the same viewer API surface as the Pannellum viewer used for
 * images (see `PannellumViewer`), so the existing annotation stack
 * (context menu, hotspot manager, edition panel) works unchanged over video:
 *   - addHotSpot / removeHotSpot: DOM hotspots projected onto the sphere
 *   - mouseEventToCoords: [pitch, yaw] under the cursor (same convention)
 *   - on("load"): fired when the first video frame is available
 *   - getYaw / getPitch / getHfov / destroy
 */

interface HotspotConfig {
    id: string;
    pitch: number;
    yaw: number;
    cssClass?: string;
    /** Visible only within this time window (video projects). */
    timeRange?: { start: number; end?: number };
    createTooltipFunc?: (hotSpotDiv: HTMLElement) => void;
    clickHandlerFunc?: (event: MouseEvent, args: unknown) => void;
    clickHandlerArgs?: unknown;
}

interface ManagedHotspot {
    config: HotspotConfig;
    div: HTMLDivElement;
    worldPosition: THREE.Vector3;
    clickListener: (event: MouseEvent) => void;
    markerDiv: HTMLDivElement | null;
}

export interface VideoViewerOptions {
    autoRotate?: number; // degrees per second, 0 to disable
    loop?: boolean;
    muted?: boolean;
    minHfov?: number;
    maxHfov?: number;
}

const DEFAULT_OPTIONS: Required<VideoViewerOptions> = {
    autoRotate: -2,
    loop: true,
    muted: true,
    minHfov: 30,
    maxHfov: 120,
};

const SPHERE_RADIUS = 500;

const PLAY_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.14v14l11-7-11-7z"/></svg>`;
const PAUSE_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>`;
const MUTED_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 12 20 8.5 18.5 7l-3.5 3.5L11.5 7 10 8.5l3.5 3.5L10 15.5 11.5 17l3.5-3.5 3.5 3.5 1.5-1.5zM3 9v6h4l5 5V4L7 9H3z"/></svg>`;
const SOUND_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>`;

export function createVideoViewer(
    host: HTMLElement,
    videoUrl: string,
    partialOptions: VideoViewerOptions = {},
): PannellumViewer {
    const options = { ...DEFAULT_OPTIONS, ...partialOptions };

    // --- DOM scaffold ------------------------------------------------------
    const container = document.createElement("div");
    container.className = "v360-container";
    host.appendChild(container);

    const hotspotLayer = document.createElement("div");
    hotspotLayer.className = "v360-hotspot-layer";
    container.appendChild(hotspotLayer);

    // --- Video element -----------------------------------------------------
    const video = document.createElement("video");
    video.src = videoUrl;
    video.playsInline = true;
    video.loop = options.loop;
    video.muted = options.muted;
    video.preload = "auto";
    video.setAttribute("playsinline", "true"); // iOS Safari
    video.setAttribute("muted", ""); // autoplay policies
    // No crossOrigin: sources are same-origin blob/object URLs, and the
    // attribute can mark the video as tainted on some browsers, breaking
    // frame uploads to the 2D canvas / WebGL.
    // Keep the element rendered, merely out of sight: Firefox and mobile
    // Chrome stop delivering frames to WebGL textures when the video element
    // is `display: none` (audio keeps playing, texture stays black).
    video.style.position = "absolute";
    video.style.left = "-9999px";
    video.style.width = "1px";
    video.style.height = "1px";
    video.style.opacity = "0";
    video.style.pointerEvents = "none";
    container.appendChild(video);

    // --- three.js scene ----------------------------------------------------
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.insertBefore(renderer.domElement, hotspotLayer);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, SPHERE_RADIUS * 2);

    const geometry = new THREE.SphereGeometry(SPHERE_RADIUS, 64, 40);
    geometry.scale(-1, 1, 1); // view from inside the sphere

    // Frame pipeline: <video> -> CPU-backed 2D canvas -> WebGL texture.
    // Some Chrome/GPU drivers break GPU-side video frame copies
    // (glCopySubTextureCHROMIUM shared-image errors: black frames while the
    // audio keeps playing). `willReadFrequently` forces a software-backed
    // canvas, so each frame is a plain CPU memory upload that cannot hit the
    // GPU copy path. Resolution is capped to keep the CPU copy cheap.
    //
    // The texture is created only once the video dimensions are known
    // (loadedmetadata): resizing the canvas after the texture exists makes
    // three.js issue per-frame texSubImage2D updates that overflow the
    // original allocation ("Offset overflows texture dimensions" -> black).
    const MAX_FRAME_WIDTH = 2560;
    const frameCanvas = document.createElement("canvas");
    frameCanvas.width = 2;
    frameCanvas.height = 1;
    const frameContext = frameCanvas.getContext("2d", { willReadFrequently: true });

    let texture: THREE.CanvasTexture | null = null;
    let material: THREE.MeshBasicMaterial | null = null;
    let sphereMesh: THREE.Mesh | null = null;

    const attachSphereTexture = (): void => {
        if (texture || destroyed || video.videoWidth <= 0) {
            return;
        }
        const targetWidth = Math.min(video.videoWidth, MAX_FRAME_WIDTH);
        const scale = targetWidth / video.videoWidth;
        frameCanvas.width = Math.max(2, Math.round(video.videoWidth * scale));
        frameCanvas.height = Math.max(1, Math.round(video.videoHeight * scale));

        texture = new THREE.CanvasTexture(frameCanvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        material = new THREE.MeshBasicMaterial({ map: texture });
        sphereMesh = new THREE.Mesh(geometry, material);
        scene.add(sphereMesh);
    };

    if (video.readyState >= 1 && video.videoWidth > 0) {
        attachSphereTexture();
    } else {
        video.addEventListener("loadedmetadata", attachSphereTexture, { once: true });
    }

    const updateVideoFrame = (): void => {
        if (!texture || video.readyState < 2) {
            return; // texture not ready or no frame available yet
        }
        frameContext?.drawImage(video, 0, 0, frameCanvas.width, frameCanvas.height);
        texture.needsUpdate = true;
    };

    // --- Viewer state ------------------------------------------------------
    let yaw = 0;
    let pitch = 0;
    let hfov = 100;
    let autoRotateActive = options.autoRotate !== 0;
    let isDragging = false;
    let rafId = 0;
    let destroyed = false;

    const hotspots = new Map<string, ManagedHotspot>();
    const loadHandlers: Array<() => void> = [];
    let loadFired = false;

    const cameraDirection = new THREE.Vector3();
    const projected = new THREE.Vector3();

    // --- Coordinate helpers (pannellum pitch/yaw convention) ---------------
    // yaw: 0 at initial center, positive to the right; pitch: positive up.
    const directionFromPitchYaw = (p: number, y: number): THREE.Vector3 => {
        const phi = THREE.MathUtils.degToRad(90 - p);
        const theta = THREE.MathUtils.degToRad(y);
        return new THREE.Vector3(
            Math.sin(phi) * Math.cos(theta),
            Math.cos(phi),
            Math.sin(phi) * Math.sin(theta),
        );
    };

    const clampPitch = (p: number): number => THREE.MathUtils.clamp(p, -90, 90);
    const wrapYaw = (y: number): number => {
        let wrapped = y;
        while (wrapped > 180) wrapped -= 360;
        while (wrapped < -180) wrapped += 360;
        return wrapped;
    };

    // --- Camera updates ----------------------------------------------------
    const applyCamera = (): void => {
        const target = directionFromPitchYaw(pitch, yaw);
        camera.lookAt(target);
        // three.js fov is vertical; pannellum hfov is horizontal.
        const vfov = 2 * THREE.MathUtils.radToDeg(
            Math.atan(Math.tan(THREE.MathUtils.degToRad(hfov) / 2) / camera.aspect),
        );
        camera.fov = THREE.MathUtils.clamp(vfov, 1, 150);
        camera.updateProjectionMatrix();
    };

    const resize = (): void => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width === 0 || height === 0) {
            return;
        }
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        applyCamera();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // --- Hotspot projection ------------------------------------------------
    const isWithinTimeRange = (timeRange: { start: number; end?: number } | undefined): boolean => {
        if (!timeRange) {
            return true;
        }
        const t = video.currentTime;
        return t >= timeRange.start && (timeRange.end === undefined || t <= timeRange.end);
    };

    const updateHotspotPositions = (): void => {
        if (hotspots.size === 0) {
            return;
        }
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.getWorldDirection(cameraDirection);

        hotspots.forEach((hotspot) => {
            if (!isWithinTimeRange(hotspot.config.timeRange)) {
                hotspot.div.style.visibility = "hidden";
                return;
            }
            const inFront = hotspot.worldPosition.dot(cameraDirection) > 0;
            if (!inFront) {
                hotspot.div.style.visibility = "hidden";
                return;
            }
            projected.copy(hotspot.worldPosition).project(camera);
            hotspot.div.style.visibility = "visible";
            hotspot.div.style.left = `${(projected.x * 0.5 + 0.5) * width}px`;
            hotspot.div.style.top = `${(-projected.y * 0.5 + 0.5) * height}px`;
            hotspot.div.style.transform = "translate(-50%, -50%)";
        });
    };

    // --- Render loop -------------------------------------------------------
    let lastTime = performance.now();
    const render = (time: number): void => {
        if (destroyed) {
            return;
        }
        const dt = Math.min((time - lastTime) / 1000, 0.1); // clamp tab-switch gaps
        lastTime = time;

        if (autoRotateActive && !isDragging) {
            yaw = wrapYaw(yaw + options.autoRotate * dt);
        }
        applyInertia(dt);
        updateVideoFrame();
        applyCamera();
        updateHotspotPositions();
        updateTimeline();
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(render);
    };

    // --- Pointer controls (drag + pinch) -----------------------------------
    const pointers = new Map<number, { x: number; y: number }>();
    let lastPinchDistance = 0;
    // Angular velocities in degrees/second, used for drag inertia.
    let velocityYaw = 0;
    let velocityPitch = 0;
    let lastMoveTime = 0;
    const INTERACTION_EPSILON = 5; // deg/s below which inertia stops

    const degreesPerPixel = (): number => hfov / Math.max(container.clientWidth, 1);

    const onPointerDown = (event: PointerEvent): void => {
        autoRotateActive = false;
        isDragging = true;
        velocityYaw = 0;
        velocityPitch = 0;
        lastMoveTime = performance.now();
        pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
        try {
            renderer.domElement.setPointerCapture(event.pointerId);
        } catch {
            // Synthetic/untrusted pointers may not support capture; drag still works.
        }
    };

    const onPointerMove = (event: PointerEvent): void => {
        const previous = pointers.get(event.pointerId);
        if (!previous) {
            return;
        }
        pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

        if (pointers.size === 2) {
            // Pinch zoom
            const [a, b] = [...pointers.values()];
            const distance = Math.hypot(a.x - b.x, a.y - b.y);
            if (lastPinchDistance > 0) {
                hfov = THREE.MathUtils.clamp(
                    hfov * (lastPinchDistance / distance),
                    options.minHfov,
                    options.maxHfov,
                );
            }
            lastPinchDistance = distance;
            return;
        }

        if (!isDragging) {
            return;
        }

        const dx = event.clientX - previous.x;
        const dy = event.clientY - previous.y;
        const scale = degreesPerPixel();
        // Grab-the-world: dragging right moves the scene right (yaw decreases).
        yaw = wrapYaw(yaw - dx * scale);
        pitch = clampPitch(pitch + dy * scale);

        // Track release velocity (deg/s), smoothed so a single uneven event
        // does not launch the camera.
        const now = performance.now();
        const dt = Math.max(now - lastMoveTime, 1) / 1000;
        lastMoveTime = now;
        const instantYaw = (-dx * scale) / dt;
        const instantPitch = (dy * scale) / dt;
        velocityYaw = velocityYaw * 0.4 + instantYaw * 0.6;
        velocityPitch = velocityPitch * 0.4 + instantPitch * 0.6;
    };

    const onPointerUp = (event: PointerEvent): void => {
        pointers.delete(event.pointerId);
        if (pointers.size < 2) {
            lastPinchDistance = 0;
        }
        if (pointers.size === 0) {
            isDragging = false;
        }
    };

    const onMouseWheel = (event: WheelEvent): void => {
        event.preventDefault();
        autoRotateActive = false;
        hfov = THREE.MathUtils.clamp(
            hfov + event.deltaY * 0.05,
            options.minHfov,
            options.maxHfov,
        );
    };

    /** Frame-rate-independent inertia, applied inside the render loop. */
    const applyInertia = (dt: number): void => {
        if (isDragging || destroyed) {
            return;
        }
        if (Math.abs(velocityYaw) < INTERACTION_EPSILON && Math.abs(velocityPitch) < INTERACTION_EPSILON) {
            velocityYaw = 0;
            velocityPitch = 0;
            return;
        }
        yaw = wrapYaw(yaw + velocityYaw * dt);
        pitch = clampPitch(pitch + velocityPitch * dt);
        const decay = Math.pow(0.93, dt * 60); // ~0.93 per 60fps frame
        velocityYaw *= decay;
        velocityPitch *= decay;
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointercancel", onPointerUp);
    renderer.domElement.addEventListener("wheel", onMouseWheel, { passive: false });

    // --- Playback controls --------------------------------------------------
    const controls = document.createElement("div");
    controls.className = "v360-controls";

    const playButton = document.createElement("button");
    playButton.type = "button";
    playButton.setAttribute("aria-label", "Lecture / pause");
    const muteButton = document.createElement("button");
    muteButton.type = "button";
    muteButton.setAttribute("aria-label", "Activer / couper le son");

    const syncPlayIcon = (): void => {
        playButton.innerHTML = video.paused ? PLAY_ICON : PAUSE_ICON;
    };
    const syncMuteIcon = (): void => {
        muteButton.innerHTML = video.muted ? MUTED_ICON : SOUND_ICON;
    };

    playButton.addEventListener("click", (event) => {
        event.stopPropagation();
        if (video.paused) {
            void video.play();
        } else {
            video.pause();
        }
    });
    muteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        video.muted = !video.muted;
        syncMuteIcon();
    });
    video.addEventListener("play", syncPlayIcon);
    video.addEventListener("pause", syncPlayIcon);

    controls.appendChild(playButton);
    controls.appendChild(muteButton);
    container.appendChild(controls);
    syncPlayIcon();
    syncMuteIcon();

    // --- Timeline bar (playhead, seek, annotation time ranges) -------------
    const formatTime = (seconds: number): string => {
        if (!Number.isFinite(seconds)) {
            return "0:00";
        }
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    const timeline = document.createElement("div");
    timeline.className = "v360-timeline";
    const timeLabel = document.createElement("span");
    timeLabel.className = "v360-timeline__time";
    const track = document.createElement("div");
    track.className = "v360-timeline__track";
    const progress = document.createElement("div");
    progress.className = "v360-timeline__progress";
    const playhead = document.createElement("div");
    playhead.className = "v360-timeline__playhead";
    const durationLabel = document.createElement("span");
    durationLabel.className = "v360-timeline__duration";
    track.appendChild(progress);
    track.appendChild(playhead);
    timeline.appendChild(timeLabel);
    timeline.appendChild(track);
    timeline.appendChild(durationLabel);
    container.appendChild(timeline);

    const updateTimeline = (): void => {
        const duration = video.duration;
        if (!Number.isFinite(duration) || duration <= 0) {
            return;
        }
        const ratio = THREE.MathUtils.clamp(video.currentTime / duration, 0, 1);
        progress.style.width = `${ratio * 100}%`;
        playhead.style.left = `${ratio * 100}%`;
        timeLabel.textContent = formatTime(video.currentTime);
        durationLabel.textContent = formatTime(duration);
    };

    const seekFromPointerEvent = (event: PointerEvent): void => {
        const rect = track.getBoundingClientRect();
        const ratio = THREE.MathUtils.clamp((event.clientX - rect.left) / rect.width, 0, 1);
        if (Number.isFinite(video.duration) && video.duration > 0) {
            video.currentTime = ratio * video.duration;
        }
    };

    let scrubbing = false;
    const onTrackPointerDown = (event: PointerEvent): void => {
        scrubbing = true;
        autoRotateActive = false;
        seekFromPointerEvent(event);
        track.setPointerCapture(event.pointerId);
    };
    const onTrackPointerMove = (event: PointerEvent): void => {
        if (scrubbing) {
            seekFromPointerEvent(event);
        }
    };
    const onTrackPointerUp = (): void => {
        scrubbing = false;
    };
    track.addEventListener("pointerdown", onTrackPointerDown);
    track.addEventListener("pointermove", onTrackPointerMove);
    track.addEventListener("pointerup", onTrackPointerUp);
    track.addEventListener("pointercancel", onTrackPointerUp);

    const syncMarker = (marker: HTMLDivElement, timeRange: { start: number; end?: number }): void => {
        const duration = video.duration;
        if (!Number.isFinite(duration) || duration <= 0) {
            marker.style.display = "none";
            return;
        }
        marker.style.display = "block";
        const startRatio = THREE.MathUtils.clamp(timeRange.start / duration, 0, 1) * 100;
        const end = timeRange.end ?? duration;
        const endRatio = THREE.MathUtils.clamp(end / duration, 0, 1) * 100;
        marker.style.left = `${startRatio}%`;
        marker.style.width = `${Math.max(endRatio - startRatio, 0.75)}%`;
    };

    const syncAllMarkers = (): void => {
        hotspots.forEach((hotspot) => {
            if (hotspot.markerDiv && hotspot.config.timeRange) {
                syncMarker(hotspot.markerDiv, hotspot.config.timeRange);
            }
        });
    };
    video.addEventListener("loadedmetadata", () => {
        syncAllMarkers();
        updateTimeline();
    });

    // --- "load" event --------------------------------------------------------
    const fireLoad = (): void => {
        if (loadFired || destroyed) {
            return;
        }
        loadFired = true;
        loadHandlers.forEach((handler) => handler());
    };

    if (video.readyState >= 2) {
        fireLoad();
    } else {
        video.addEventListener("loadeddata", fireLoad, { once: true });
    }

    // Autoplay muted; on failure (rare with muted) the controls still work.
    void video.play().catch(() => undefined);

    resize();
    rafId = requestAnimationFrame(render);

    // --- Public API (pannellum-compatible) -----------------------------------
    const api: PannellumViewer = {
        addHotSpot(config: unknown): void {
            const hotspotConfig = config as HotspotConfig;
            if (!hotspotConfig?.id) {
                return;
            }
            api.removeHotSpot(hotspotConfig.id);

            const div = document.createElement("div");
            div.className = `pnlm-hotspot-base ${hotspotConfig.cssClass ?? ""}`.trim();
            div.style.position = "absolute";

            const clickListener = (event: MouseEvent): void => {
                hotspotConfig.clickHandlerFunc?.(event, hotspotConfig.clickHandlerArgs);
            };
            div.addEventListener("click", clickListener);
            hotspotConfig.createTooltipFunc?.(div);

            hotspotLayer.appendChild(div);

            // Timeline marker for timed annotations; clicking it seeks to the start.
            let markerDiv: HTMLDivElement | null = null;
            if (hotspotConfig.timeRange) {
                markerDiv = document.createElement("div");
                markerDiv.className = "v360-timeline__marker";
                markerDiv.title = `${formatTime(hotspotConfig.timeRange.start)} → ${
                    hotspotConfig.timeRange.end !== undefined ? formatTime(hotspotConfig.timeRange.end) : "fin"
                }`;
                markerDiv.addEventListener("pointerdown", (event) => {
                    event.stopPropagation();
                    video.currentTime = hotspotConfig.timeRange!.start;
                });
                track.appendChild(markerDiv);
                syncMarker(markerDiv, hotspotConfig.timeRange);
            }

            hotspots.set(hotspotConfig.id, {
                config: hotspotConfig,
                div,
                worldPosition: directionFromPitchYaw(hotspotConfig.pitch, hotspotConfig.yaw)
                    .multiplyScalar(SPHERE_RADIUS),
                clickListener,
                markerDiv,
            });
            updateHotspotPositions();
        },

        removeHotSpot(id: string): void {
            const hotspot = hotspots.get(id);
            if (!hotspot) {
                return;
            }
            hotspot.div.removeEventListener("click", hotspot.clickListener);
            hotspot.div.remove();
            hotspot.markerDiv?.remove();
            hotspots.delete(id);
        },

        mouseEventToCoords(event: MouseEvent): [number, number] {
            const rect = container.getBoundingClientRect();
            const ndc = new THREE.Vector2(
                ((event.clientX - rect.left) / rect.width) * 2 - 1,
                -((event.clientY - rect.top) / rect.height) * 2 + 1,
            );
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(ndc, camera);
            if (!sphereMesh) {
                return [pitch, yaw];
            }
            const hits = raycaster.intersectObject(sphereMesh);
            if (hits.length === 0) {
                return [pitch, yaw];
            }
            const direction = hits[0].point.normalize();
            const hitPitch = 90 - THREE.MathUtils.radToDeg(
                Math.acos(THREE.MathUtils.clamp(direction.y, -1, 1)),
            );
            const hitYaw = THREE.MathUtils.radToDeg(Math.atan2(direction.z, direction.x));
            return [hitPitch, hitYaw];
        },

        getYaw: (): number => yaw,
        getPitch: (): number => pitch,
        getHfov: (): number => hfov,
        getCurrentTime: (): number => video.currentTime,
        getDuration: (): number => video.duration,

        on(event: string, handler: () => void): void {
            if (event === "load") {
                if (loadFired) {
                    handler();
                } else {
                    loadHandlers.push(handler);
                }
            }
            // Other pannellum events are not required by the annotation stack.
        },

        destroy(): void {
            if (destroyed) {
                return;
            }
            destroyed = true;
            cancelAnimationFrame(rafId);
            resizeObserver.disconnect();
            renderer.domElement.removeEventListener("pointerdown", onPointerDown);
            renderer.domElement.removeEventListener("pointermove", onPointerMove);
            renderer.domElement.removeEventListener("pointerup", onPointerUp);
            renderer.domElement.removeEventListener("pointercancel", onPointerUp);
            renderer.domElement.removeEventListener("wheel", onMouseWheel);
            video.removeEventListener("play", syncPlayIcon);
            video.removeEventListener("pause", syncPlayIcon);
            video.removeEventListener("loadeddata", fireLoad);

            video.pause();
            video.removeAttribute("src");
            video.load();

            hotspots.forEach((hotspot) => hotspot.div.remove());
            hotspots.clear();

            texture?.dispose();
            material?.dispose();
            geometry.dispose();
            renderer.dispose();
            container.remove();
        },
    };

    return api;
}
