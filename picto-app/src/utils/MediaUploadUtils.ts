import imageCompression from "browser-image-compression";
import type { ActivityFull, Playground, PlaygroundMedia } from "@/utils/Types";

const BASE = import.meta.env.VITE_BACKEND_URL;

export type MediaKind = "IMAGE" | "GIF" | "VIDEO";
export type MediaScope = "main" | "annotation";

const MB = 1024 * 1024;
const GB = 1024 * MB;

// Mirrors the backend limits (media.service.ts): Cloudflare Images caps
// uploads at 10MB, R2 uploads are single presigned PUTs capped at 5GB.
const MAX_SIZE: Record<MediaKind, number> = {
    IMAGE: 10 * MB,
    GIF: 5 * GB,
    VIDEO: 5 * GB,
};

interface UploadTicket {
    media: PlaygroundMedia;
    provider: "CF_IMAGES" | "R2";
    uploadUrl: string;
    method: "POST" | "PUT";
    headers?: Record<string, string>;
}

export interface MediaAccess {
    url: string;
    kind: MediaKind;
    expiresAt: string;
}

export function classifyFile(file: File): MediaKind | null {
    const mime = file.type.toLowerCase();
    if (mime === "image/gif") return "GIF";
    if (mime.startsWith("image/")) return "IMAGE";
    if (mime.startsWith("video/")) return "VIDEO";
    return null;
}

export function isVideoMedia(media: PlaygroundMedia) {
    return media.__t === "PictoVideo";
}

async function request<T>(path: string, token: string, init?: RequestInit): Promise<T> {
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
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Request to ${path} failed (${res.status})`);
    }
    return res.json() as Promise<T>;
}

/**
 * fetch() can't report upload progress, so the file itself is sent with XHR.
 */
function sendFile(
    ticket: UploadTicket,
    file: Blob,
    onProgress?: (fraction: number) => void
): Promise<void> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(ticket.method, ticket.uploadUrl);
        Object.entries(ticket.headers ?? {}).forEach(([name, value]) => xhr.setRequestHeader(name, value));

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) onProgress?.(event.loaded / event.total);
        };
        xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`Upload failed (${xhr.status})`)));
        xhr.onerror = () => reject(new Error("Upload failed (network error)"));

        if (ticket.provider === "CF_IMAGES") {
            const form = new FormData();
            form.append("file", file);
            xhr.send(form);
        } else {
            xhr.send(file);
        }
    });
}

/**
 * Images over the Cloudflare Images limit are compressed in the browser
 * rather than rejected (360° panoramas are often larger than 10MB).
 */
async function fitToLimit(file: File, kind: MediaKind): Promise<File> {
    if (file.size <= MAX_SIZE[kind]) return file;
    if (kind !== "IMAGE") {
        throw new Error(`Le fichier dépasse la taille maximale (${MAX_SIZE[kind] / GB} Go).`);
    }
    const compressed = await imageCompression(file, {
        maxSizeMB: 9.5,
        maxWidthOrHeight: 12000, // Cloudflare Images max dimension
        useWebWorker: true,
    });
    return new File([compressed], file.name, { type: compressed.type || file.type });
}

/**
 * Direct upload: ask the backend where to send the file, send it straight to
 * Cloudflare Images / R2, then let the backend verify it. Resolves with the
 * READY media record.
 */
export async function uploadMedia(
    file: File,
    playgroundId: string,
    token: string,
    { scope = "main", onProgress }: { scope?: MediaScope; onProgress?: (fraction: number) => void } = {}
): Promise<PlaygroundMedia> {
    const kind = classifyFile(file);
    if (!kind) throw new Error("Seules les images et les vidéos sont acceptées.");

    const toUpload = await fitToLimit(file, kind);

    const ticket = await request<UploadTicket>("/media/uploads", token, {
        method: "POST",
        body: JSON.stringify({
            playgroundId,
            filename: toUpload.name,
            mimeType: toUpload.type,
            size: toUpload.size,
            scope,
        }),
    });

    await sendFile(ticket, toUpload, onProgress);

    return request<PlaygroundMedia>(`/media/uploads/${ticket.media._id}/complete`, token, { method: "POST" });
}

/** Get the activity's playground, creating it on first use. */
export async function ensureActivityPlayground(activityId: string, token: string): Promise<Playground> {
    return request<Playground>(`/activities/${activityId}/playground`, token, { method: "POST" });
}

/**
 * Set an uploaded media as the playground's main media. With `replace`, the
 * previous main media is removed (and deleted from storage).
 */
export async function attachPlaygroundMedia(
    activityId: string,
    mediaId: string,
    token: string,
    replace = false
): Promise<ActivityFull> {
    return request<ActivityFull>(`/activities/${activityId}/playground/media`, token, {
        method: "POST",
        body: JSON.stringify({ mediaId, replace }),
    });
}

/** Short lived, signed URL to read a media (image or video) from the browser. */
export async function getMediaAccessUrl(mediaId: string, token: string): Promise<MediaAccess> {
    return request<MediaAccess>(`/media/${mediaId}/access-url`, token);
}
