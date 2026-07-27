import type { HotspotData } from "@/utils/Types";
import type { LoadedViewerData, ViewerDataSource } from "@/utils/viewerDataSource";

const BASE = import.meta.env.VITE_BACKEND_URL;

/**
 * Hotspot types supported end-to-end against the backend. Image/GIF/video
 * hotspots need a Cloudflare R2 upload pipeline that doesn't exist yet
 * (uploadFileToR2/getR2UploadUrl in the backend's cloudflare.ts are empty
 * stubs) — deliberately out of scope here. createHotspot/updateHotspot throw
 * a clear error for those types rather than silently corrupting data.
 */
type SupportedHotspotType = "text" | "label" | "hyperlink";
type SupportedAnnotationType = "TEXT" | "LABEL" | "LINK";

const HOTSPOT_TYPE_TO_ANNOTATION_TYPE: Record<SupportedHotspotType, SupportedAnnotationType> = {
    text: "TEXT",
    label: "LABEL",
    hyperlink: "LINK",
};

const ANNOTATION_TYPE_TO_HOTSPOT_TYPE: Record<SupportedAnnotationType, SupportedHotspotType> = {
    TEXT: "text",
    LABEL: "label",
    LINK: "hyperlink",
};

function toAnnotationType(hotspotType: string): SupportedAnnotationType {
    const mapped = HOTSPOT_TYPE_TO_ANNOTATION_TYPE[hotspotType.toLowerCase() as SupportedHotspotType];
    if (!mapped) {
        throw new Error(
            `Hotspot type "${hotspotType}" is not supported in this context yet (only text, label, and link hotspots are).`
        );
    }
    return mapped;
}

interface ContentPayload {
    contentType: "TextContent" | "LinkContent";
    title: string;
    body?: string;
    url?: string;
    description?: string;
}

function buildContentPayload(hotspot: HotspotData): ContentPayload {
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
        contentType: "TextContent" | "LinkContent";
        body?: string;
        url?: string;
        description?: string;
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

    if (annotation.content?.contentType === "LinkContent") {
        return { ...base, url_text: annotation.content.url, content: annotation.content.description || annotation.content.url };
    }
    return { ...base, content: annotation.content?.body };
}

interface CacheEntry {
    annotationId: string;
    contentId: string;
}

async function request(path: string, token: string, init?: RequestInit) {
    const res = await fetch(`${BASE}${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
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
 * `ViewerDataSource` implementation backed by the backend API (Cloudflare
 * Images for the panorama background, Mongo Annotation/Content documents for
 * hotspots). `viewerId` here is a PictoProject id (an activity's
 * `playground`), not a client-generated UUID like IndexedDbDataSource uses.
 *
 * create/update/deleteHotspot all receive the *full* intended hotspot list
 * (per the ViewerDataSource contract) and reconcile it against the last
 * known server state for this project — new ids are created, known ids are
 * updated, and known ids missing from the new list are deleted. This mirrors
 * IndexedDbDataSource's "persist the whole list every call" semantics rather
 * than diffing for the *minimal* set of changes.
 */
export class ApiDataSource implements ViewerDataSource {
    private cache = new Map<string, Map<string, CacheEntry>>();

    constructor(private getToken: () => Promise<string>) {}

    async load(projectId: string): Promise<LoadedViewerData> {
        const token = await this.getToken();
        const [project, annotations] = await Promise.all([
            request(`/projects/${projectId}`, token),
            request(`/projects/${projectId}/annotations`, token) as Promise<PopulatedAnnotation[]>,
        ]);

        const projectCache = new Map<string, CacheEntry>();
        const hotspots = annotations.map((annotation) => {
            projectCache.set(String(annotation._id), {
                annotationId: String(annotation._id),
                contentId: String(annotation.content?._id),
            });
            return annotationToHotspot(annotation);
        });
        this.cache.set(projectId, projectCache);

        return {
            imageSource: project?.images?.[0]?.url ?? null,
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
            const existing = known.get(hotspot.id);
            if (existing) {
                await this.persistExisting(existing, hotspot, token);
                nextCache.set(hotspot.id, existing);
                result.push(hotspot);
            } else {
                const created = await this.persistNew(projectId, hotspot, token);
                nextCache.set(created.hotspot.id, created.entry);
                result.push(created.hotspot);
            }
        }

        const nextIds = new Set(hotspots.map((h) => h.id));
        for (const [id, entry] of known) {
            if (!nextIds.has(id)) {
                await request(`/annotations/${entry.annotationId}`, token, { method: "DELETE" });
                await request(`/content/${entry.contentId}`, token, { method: "DELETE" });
            }
        }

        this.cache.set(projectId, nextCache);
        return result;
    }

    private async persistNew(
        projectId: string,
        hotspot: HotspotData,
        token: string
    ): Promise<{ hotspot: HotspotData; entry: CacheEntry }> {
        const payload = buildContentPayload(hotspot);
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
            entry: { annotationId: String(annotation._id), contentId: String(content._id) },
        };
    }

    private async persistExisting(entry: CacheEntry, hotspot: HotspotData, token: string): Promise<void> {
        const payload = buildContentPayload(hotspot);
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
