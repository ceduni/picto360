import React, { useEffect, useCallback, useState, useRef, useMemo } from "react";
import { PiTargetBold } from "react-icons/pi";
import ContextMenu from "./ContextMenu";
import HotspotManager from "./HotspotManager";
import Compass from "./Compass";
import "./css/PanoramaViewer.css";

declare global {
  interface Window {
    //TODO: Replace any (if possible)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pannellum: any;
  }
}

interface PanoramaViewerProps {
  width: string;
  height: string;
  imageSrc: string;
  isEditMode: boolean;
}

interface HotspotCreationEvent {
  type: string;
  coords: [number, number];
}

interface PannellumViewer {
  mouseEventToCoords: (event: MouseEvent) => [number, number];
  destroy: () => void;
  getYaw: () => number;
  getPitch: () => number;
  getHfov: () => number;
  setShowCompass: (show: boolean) => void;
  setNorthOffset: (offset: number) => void;
  getNorthOffset: () => number;
}

const PanoramaViewer: React.FC<PanoramaViewerProps> = ({ width, height, imageSrc, isEditMode }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstanceRef = useRef<PannellumViewer | null>(null);
  const [contextMenuState, setContextMenuState] = useState({
    visible: false,
    position: { x: 0, y: 0 },
  });
  const [targetIconPosition, setTargetIconPosition] = useState<{ x: number; y: number } | null>(null);
  const contextMenuCoordsRef = useRef<{ pitch: number; yaw: number }>({ pitch: 0, yaw: 0 });
  const [showCompass, setShowCompass] = useState(true);
  const [northOffset, setNorthOffset] = useState(0);
  const [compassRotation, setCompassRotation] = useState(0);

  const normalizeAngle = (angle: number) => (angle + 360) % 360;

  const viewerConfig = useMemo(
    () => ({
      type: "equirectangular",
      panorama: imageSrc,
      autoLoad: true,
      autoRotate: -2,
      showControls: false,
      showFullscreenCtrl: false,
      showZoomCtrl: true,
      keyboardZoom: false,
      disableKeyboardCtrl: true,
      mouseZoom: true,
      compass: showCompass /*TODO: make it a setting*/,
      northOffset: northOffset,
      strings: {
        loadingLabel: "Chargement en cours...",
      },
    }),
    [imageSrc, showCompass] // northOffset excluded as it forces the viewer to reload
  );

  const initializeViewer = useCallback(() => {
    if (!viewerRef.current || !imageSrc) {
      console.error("PanellumViewer - Viewer ref or image source is missing.");
      return;
    }

    if (!viewerInstanceRef.current) {
      console.log("PanellumViewer - Initializing Pannellum viewer...");
      viewerInstanceRef.current = window.pannellum.viewer(viewerRef.current, viewerConfig) as PannellumViewer;
      setShowCompass(showCompass);
    }
  }, [imageSrc, viewerConfig, showCompass]);

  useEffect(() => {
    initializeViewer();

    return () => {
      if (viewerInstanceRef.current) {
        console.log("PanellumViewer - Destroying Pannellum viewer...");
        viewerInstanceRef.current.destroy();
        viewerInstanceRef.current = null;
      }
    };
  }, [initializeViewer]);

  const updateCompassRotation = useCallback(() => {
    if (viewerInstanceRef.current) {
      const yaw = viewerInstanceRef.current.getYaw();
      const rotation = normalizeAngle(yaw + northOffset);
      setCompassRotation(rotation);
    }
  }, [northOffset]);

  useEffect(() => {
    if (!viewerInstanceRef.current) return;

    let animationFrame: number;

    const animateCompass = () => {
      updateCompassRotation();
      animationFrame = requestAnimationFrame(animateCompass);
    };

    animateCompass();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [updateCompassRotation]);

  useEffect(() => {
    if (!viewerInstanceRef.current) return;

    const handleAutoRotateChange = updateCompassRotation;
    const handleLoad = updateCompassRotation;

    viewerRef.current?.addEventListener("load", handleLoad);
    viewerRef.current?.addEventListener("autorotatechange", handleAutoRotateChange);

    return () => {
      viewerRef.current?.removeEventListener("load", handleLoad);
      viewerRef.current?.removeEventListener("autorotatechange", handleAutoRotateChange);
    };
  }, [updateCompassRotation]);

  const resetCompassToNorth = useCallback(() => {
    if (!viewerInstanceRef.current) return;

    const currentYaw = normalizeAngle(viewerInstanceRef.current.getYaw());
    const newNorthOffset = normalizeAngle(360 - currentYaw);

    const startOffset = northOffset;
    let startTime: number | null = null;
    const duration = 500;
    const easeOutQuad = (t: number): number => t * (2 - t);

    const animateReset = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutQuad(progress);
      const interpolatedOffset = startOffset + easeProgress * (newNorthOffset - startOffset);

      const normalizedOffset = normalizeAngle(interpolatedOffset);
      setNorthOffset(normalizedOffset);
      viewerInstanceRef.current?.setNorthOffset(normalizedOffset);

      if (progress < 1) {
        requestAnimationFrame(animateReset);
      }
    };

    requestAnimationFrame(animateReset);
  }, [northOffset]);

  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault(); // Suppress the browser's native context menu

      if (!isEditMode || !viewerInstanceRef.current) return;

      const position = { x: event.clientX, y: event.clientY };
      setContextMenuState({ visible: true, position });
      setTargetIconPosition(position);

      const coords = viewerInstanceRef.current.mouseEventToCoords(event.nativeEvent);
      console.log("PanellumViewer - Mouse coords to pitch/yaw:", coords);
      contextMenuCoordsRef.current = { pitch: coords[0], yaw: coords[1] };
    },
    [isEditMode]
  );

  const hideContextMenu = useCallback(() => {
    setContextMenuState({ visible: false, position: { x: 0, y: 0 } });
    setTargetIconPosition(null);
  }, []);

  const handleContextMenuClick = useCallback(
    (menuItemType: string) => {
      if (menuItemType === "ResetNorth") {
        resetCompassToNorth();
        hideContextMenu();
        return;
      }

      if (!viewerInstanceRef.current) {
        console.error("PanellumViewer - Viewer instance is not ready.");
        return;
      }

      // Hotspot creation actions
      const { pitch, yaw } = contextMenuCoordsRef.current;
      const coords = [pitch, yaw];
      console.log(`PanellumViewer - Performing action of type ${menuItemType} at pitch = ${pitch}, yaw = ${yaw}...`);

      // Dispatch a custom event instead of calling the method directly
      const event = new CustomEvent<HotspotCreationEvent>("hotspotCreation", {
        detail: { type: menuItemType, coords: coords as [number, number] },
      });
      viewerRef.current?.dispatchEvent(event);

      hideContextMenu();
    },
    [hideContextMenu, resetCompassToNorth]
  );

  // Clear context menu state and target position when switching to Preview Mode
  useEffect(() => {
    if (!isEditMode) {
      hideContextMenu();
    }
  }, [isEditMode, hideContextMenu]);

  const handleRelocateContextMenu = useCallback(
    (newPosition: { x: number; y: number }) => {
      if (!isEditMode) return;

      setContextMenuState((prev) => ({
        ...prev,
        position: newPosition,
      }));

      setTargetIconPosition(newPosition);

      if (viewerInstanceRef.current) {
        const coords = viewerInstanceRef.current.mouseEventToCoords({
          clientX: newPosition.x,
          clientY: newPosition.y,
        } as MouseEvent);

        contextMenuCoordsRef.current = { pitch: coords[0], yaw: coords[1] };
      }
    },
    [isEditMode]
  );

  return (
    <>
      <div ref={viewerRef} className="panorama-viewer" style={{ width, height }} onContextMenu={handleContextMenu} />
      <Compass rotation={compassRotation} show={showCompass} />
      {isEditMode && contextMenuState.visible && (
        <ContextMenu
          visible={contextMenuState.visible}
          anchorPosition={contextMenuState.position}
          onMenuItemClick={handleContextMenuClick}
          onClose={hideContextMenu}
          onRelocate={handleRelocateContextMenu}
          isEditMode={isEditMode}
        />
      )}
      {isEditMode && targetIconPosition && (
        <div
          style={{
            top: targetIconPosition.y,
            left: targetIconPosition.x,
          }}
          className="panorama-viewer__target-icon"
        >
          <PiTargetBold />
        </div>
      )}
      <HotspotManager viewer={viewerInstanceRef.current} viewerElement={viewerRef.current} />
    </>
  );
};

export default React.memo(PanoramaViewer);
