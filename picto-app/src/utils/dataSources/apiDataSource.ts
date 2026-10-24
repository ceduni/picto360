import type { HotspotData, Playground } from "@/utils/Types";
import type { LoadedViewerData, ViewerDataSource } from "@/utils/viewerDataSource";
import { getMediaAccessUrl, isVideoMedia, uploadMedia } from "../MediaUploadUtils";

const BASE = import.meta.env.VITE_BACKEND_URL;

/**
 * Hotspot types supported end-to-end against the backend. Image/GIF/video
 * hotspots either point to an external URL (YouTube, Giphy, …) or to a file
 * uploaded to R2 through the /media pipeline. createHotspot/updateHotspot throw a clear error for any
 * other type rather than silently corrupting data.
 */
type SupportedHotspotType = "text" | "label" | "hyperlink" | "image" | "gif" | "video";
type SupportedAnnotationType = "TEXT" | "LABEL" | "LINK" | "IMAGE" | "GIF" | "VIDEO";
type MediaAnnotationType = "IMAGE" | "GIF" | "VIDEO";

const HOTSPOT_TYPE_TO_ANNOTATION_TYPE: Record<SupportedHotspotType, SupportedAnnotationType> = {
    text: "TEXT",
    label: "LABEL",
    hyperlink: "LINK",
    image: "IMAGE",
    gif: "GIF",
    video: "VIDEO",
};

const ANNOTATION_TYPE_TO_HOTSPOT_TYPE: Record<SupportedAnnotationType, SupportedHotspotType> = {
    TEXT: "text",
    LABEL: "label",
    LINK: "hyperlink",
    IMAGE: "image",
    GIF: "gif",
    VIDEO: "video",
};

const MEDIA_TITLES: Record<MediaAnnotationType, string> = {
    IMAGE: "Image",
    GIF: "GIF",
    VIDEO: "Vidéo",
};

function toAnnotationType(hotspotType: string): SupportedAnnotationType {
    const mapped = HOTSPOT_TYPE_TO_ANNOTATION_TYPE[hotspotType.toLowerCase() as SupportedHotspotType];
    if (!mapped) {
        throw new Error(
            `Hotspot type "${hotspotType}" is not supported in this context yet (only text, label, link, image, GIF and video hotspots are).`
        );
    }
    return mapped;
}

function mediaAnnotationType(hotspot: HotspotData): MediaAnnotationType | null {
    const type = HOTSPOT_TYPE_TO_ANNOTATION_TYPE[hotspot.type.toLowerCase() as SupportedHotspotType];
    return type === "IMAGE" || type === "GIF" || type === "VIDEO" ? type : null;
}

type ContentPayload =
    | { contentType: "TextContent"; title: string; body: string }
    | { contentType: "LinkContent"; title: string; url: string; description?: string }
    | {
          contentType: "MediaContent";
          title: string;
          mediaType: MediaAnnotationType;
          // exactly one of the two is set
          media: string | null;
          externalUrl: string | null;
      };

function buildContentPayload(hotspot: HotspotData, mediaId: string | null): ContentPayload {
    const mediaType = mediaAnnotationType(hotspot);
    if (mediaType) {
        return {
            contentType: "MediaContent",
            title: hotspot.fileName || MEDIA_TITLES[mediaType],
            mediaType,
            media: mediaId,
            externalUrl: mediaId ? null : hotspot.content || "",
        };
    }
    if (hotspot.type.toLowerCase() === "hyperlink") {
        return {
            contentType: "LinkContent",
            title: hotspot.content || hotspot.url_text || "Lien",
            url: hotspot.url_text || "",
            description: hotspot.content,
        };
    }
    return {
        contentType: "TextContent",
        title: hotspot.type.toLowerCase() === "label" ? "Étiquette" : "Texte",
        body: hotspot.content || "",
    };
}

interface PopulatedAnnotation {
    _id: string;
    pitch: number;
    yaw: number;
    type: SupportedAnnotationType | string;
    cssClass?: string;
    visible: boolean;
    content: {
        _id: string;
        contentType: "TextContent" | "LinkContent" | "MediaContent";
        title?: string;
        body?: string;
        url?: string;
        description?: string;
        media?: string | null;
        externalUrl?: string | null;
        access?: { url: string } | null; // signed by the backend for uploaded media
    };
}

function annotationToHotspot(annotation: PopulatedAnnotation): HotspotData {
    const type = ANNOTATION_TYPE_TO_HOTSPOT_TYPE[annotation.type as SupportedAnnotationType] ?? annotation.type;
    const base: HotspotData = {
        id: String(annotation._id),
        pitch: annotation.pitch,
        yaw: annotation.yaw,
        type,
        cssClass: annotation.cssClass,
        visible: annotation.visible,
    };

    const content = annotation.content;
    if (content?.contentType === "MediaContent") {
        if (content.media) {
            return {
                ...base,
                assetSource: "local",
                assetId: String(content.media),
                fileName: content.title,
                content: content.access?.url ?? "",
            };
        }
        return { ...base, content: content.externalUrl ?? "" };
    }
    if (content?.contentType === "LinkContent") {
        return { ...base, url_text: content.url, content: content.description || content.url };
    }
    return { ...base, content: content?.body };
}

interface CacheEntry {
    annotationId: string;
    contentId: string;
    mediaId: string | null; // uploaded file behind a media hotspot, if any
}

async function request(path: string, token: string, init?: RequestInit) {
    const res = await fetch(`${BASE}${path}`, {
        ...init,
        headers: {
            // Only with a body: Fastify rejects an empty body declared as JSON
            ...(init?.body !== undefined ? { "Content-Type": "application/json" } : {}),
            Authorization: `Bearer ${token}`,
            ...(init?.headers ?? {}),
        },
    });
    if (!res.ok) {
        throw new Error(`Request to ${path} failed (${res.status})`);
    }
    if (res.status === 204) return undefined;
    return res.json();
}

/**
 * `ViewerDataSource` implementation backed by the backend API (R2 for the
 * panorama background and hotspot files, Mongo Annotation/Content documents
 * for hotspots). `viewerId` here is a
 * PictoPlayground id (an activity's `playground`), not a client-generated
 * UUID like IndexedDbDataSource uses.
 *
 * create/update/deleteHotspot all receive the *full* intended hotspot list
 * (per the ViewerDataSource contract) and reconcile it against the last
 * known server state for this project — new ids are created, known ids are
 * updated, and known ids missing from the new list are deleted. This mirrors
 * IndexedDbDataSource's "persist the whole list every call" semantics rather
 * than diffing for the *minimal* set of changes. Only hotspots carrying a
 * `pendingAsset` trigger an upload.
 */
export class ApiDataSource implements ViewerDataSource {
    private cache = new Map<string, Map<string, CacheEntry>>();

    constructor(private getToken: () => Promise<string>) {}

    async load(projectId: string): Promise<LoadedViewerData> {
        const token = await this.getToken();
        const [project, annotations] = await Promise.all([
            request(`/projects/${projectId}`, token) as Promise<Playground>,
            request(`/projects/${projectId}/annotations`, token) as Promise<PopulatedAnnotation[]>,
        ]);

        const projectCache = new Map<string, CacheEntry>();
        const hotspots = annotations.map((annotation) => {
            projectCache.set(String(annotation._id), {
                annotationId: String(annotation._id),
                contentId: String(annotation.content?._id),
                mediaId: annotation.content?.media ? String(annotation.content.media) : null,
            });
            return annotationToHotspot(annotation);
        });
        this.cache.set(projectId, projectCache);

        const mainMedia = project?.main_medias?.[0];
        if (mainMedia && isVideoMedia(mainMedia)) {
            // Pannellum here has no video support yet (follow-up, see main)
            throw new Error("360° video playgrounds can't be edited in the viewer yet.");
        }

        return {
            imageSource: mainMedia ? (await getMediaAccessUrl(mainMedia._id, token)).url : null,
            hotspots,
            dispose: () => {},
        };
    }

    async createHotspot(projectId: string, hotspots: HotspotData[]): Promise<HotspotData[]> {
        return this.reconcile(projectId, hotspots);
    }

    async updateHotspot(projectId: string, hotspots: HotspotData[]): Promise<HotspotData[]> {
        return this.reconcile(projectId, hotspots);
    }

    async deleteHotspot(projectId: string, hotspots: HotspotData[]): Promise<HotspotData[]> {
        return this.reconcile(projectId, hotspots);
    }

    private async reconcile(projectId: string, hotspots: HotspotData[]): Promise<HotspotData[]> {
        const token = await this.getToken();
        const known = this.cache.get(projectId) ?? new Map<string, CacheEntry>();
        const nextCache = new Map<string, CacheEntry>();
        const result: HotspotData[] = [];

        for (const hotspot of hotspots) {
            const resolved = await this.resolveMedia(projectId, hotspot, token);
            const existing = known.get(hotspot.id);
            if (existing) {
                await this.persistExisting(existing, resolved.hotspot, resolved.mediaId, token);
                // The hotspot's file was replaced (new upload, or switched to a URL)
                if (existing.mediaId && existing.mediaId !== resolved.mediaId) {
                    await this.deleteMedia(existing.mediaId, token);
                }
                nextCache.set(hotspot.id, { ...existing, mediaId: resolved.mediaId });
                result.push(resolved.hotspot);
            } else {
                const created = await this.persistNew(projectId, resolved.hotspot, resolved.mediaId, token);
                nextCache.set(created.hotspot.id, created.entry);
                result.push(created.hotspot);
            }
        }

        const nextIds = new Set(hotspots.map((h) => h.id));
        for (const [id, entry] of known) {
            if (!nextIds.has(id)) {
                await request(`/annotations/${entry.annotationId}`, token, { method: "DELETE" });
                await request(`/content/${entry.contentId}`, token, { method: "DELETE" });
                if (entry.mediaId) await this.deleteMedia(entry.mediaId, token);
            }
        }

        this.cache.set(projectId, nextCache);
        return result;
    }

    /**
     * Uploads a media hotspot's pending file, if any, and returns the hotspot
     * as it should be rendered (signed URL as `content`) along with the media
     * id to store. `mediaId` is null for URL-based or non-media hotspots.
     */
    private async resolveMedia(
        projectId: string,
        hotspot: HotspotData,
        token: string
    ): Promise<{ hotspot: HotspotData; mediaId: string | null }> {
        if (!mediaAnnotationType(hotspot)) return { hotspot, mediaId: null };

        const { pendingAsset, ...rest } = hotspot;

        if (pendingAsset) {
            const file = new File([pendingAsset.blob], pendingAsset.fileName, { type: pendingAsset.mimeType });
            const media = await uploadMedia(file, projectId, token, { scope: "annotation" });
            const access = await getMediaAccessUrl(media._id, token);
            return {
                hotspot: {
                    ...rest,
                    assetSource: "local",
                    assetId: media._id,
                    fileName: pendingAsset.fileName,
                    mimeType: pendingAsset.mimeType,
                    content: access.url,
                },
                mediaId: media._id,
            };
        }

        if (rest.assetSource === "local" && rest.assetId) {
            return { hotspot: rest, mediaId: rest.assetId };
        }

        return {
            hotspot: { ...rest, assetSource: undefined, assetId: undefined, fileName: undefined, mimeType: undefined },
            mediaId: null,
        };
    }

    // Best effort: a leftover file must not block saving the annotations.
    private async deleteMedia(mediaId: string, token: string) {
        try {
            await request(`/media/${mediaId}`, token, { method: "DELETE" });
        } catch (error) {
            console.warn(`Could not delete media ${mediaId}:`, error);
        }
    }

    private async persistNew(
        projectId: string,
        hotspot: HotspotData,
        mediaId: string | null,
        token: string
    ): Promise<{ hotspot: HotspotData; entry: CacheEntry }> {
        const payload = buildContentPayload(hotspot, mediaId);
        const content = await request("/content", token, { method: "POST", body: JSON.stringify(payload) });

        const annotation = await request("/annotations", token, {
            method: "POST",
            body: JSON.stringify({
                pitch: hotspot.pitch,
                yaw: hotspot.yaw,
                type: toAnnotationType(hotspot.type),
                content: content._id,
                project: projectId,
                visible: hotspot.visible ?? true,
                cssClass: hotspot.cssClass,
            }),
        });

        return {
            hotspot: { ...hotspot, id: String(annotation._id) },
            entry: { annotationId: String(annotation._id), contentId: String(content._id), mediaId },
        };
    }

    private async persistExisting(entry: CacheEntry, hotspot: HotspotData, mediaId: string | null, token: string): Promise<void> {
        const payload = buildContentPayload(hotspot, mediaId);
        await request(`/content/${entry.contentId}`, token, { method: "PUT", body: JSON.stringify(payload) });
        await request(`/annotations/${entry.annotationId}`, token, {
            method: "PUT",
            body: JSON.stringify({
                pitch: hotspot.pitch,
                yaw: hotspot.yaw,
                cssClass: hotspot.cssClass,
                visible: hotspot.visible ?? true,
            }),
        });
    }
}
