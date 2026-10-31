import type { ActivityFull, Playground, PlaygroundMedia } from "@/utils/Types";

const BASE = import.meta.env.VITE_BACKEND_URL;

export type MediaKind = "IMAGE" | "GIF" | "VIDEO";
export type MediaScope = "main" | "annotation";

const GB = 1024 * 1024 * 1024;

// Mirrors the backend limit (media.service.ts): every file goes to R2 as a
// single presigned PUT, uploaded at full quality.
const MAX_UPLOAD_SIZE = 5 * GB;

interface UploadTicket {
    media: PlaygroundMedia;
    uploadUrl: string;                 // presigned R2 PUT
    headers: Record<string, string>;   // must be sent as-is (part of the signature)
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
        xhr.open("PUT", ticket.uploadUrl);
        Object.entries(ticket.headers).forEach(([name, value]) => xhr.setRequestHeader(name, value));

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) onProgress?.(event.loaded / event.total);
        };
        xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`Upload failed (${xhr.status})`)));
        xhr.onerror = () => reject(new Error("Upload failed (network error)"));

        xhr.send(file);
    });
}

/**
 * Direct upload: ask the backend for a presigned URL, send the file straight
 * to R2, then let the backend verify it. Resolves with the READY media record.
 */
export async function uploadMedia(
    file: File,
    playgroundId: string,
    token: string,
    { scope = "main", onProgress }: { scope?: MediaScope; onProgress?: (fraction: number) => void } = {}
): Promise<PlaygroundMedia> {
    if (!classifyFile(file)) throw new Error("Seules les images et les vidéos sont acceptées.");
    if (file.size > MAX_UPLOAD_SIZE) throw new Error(`Le fichier dépasse la taille maximale (${MAX_UPLOAD_SIZE / GB} Go).`);

    const ticket = await request<UploadTicket>("/media/uploads", token, {
        method: "POST",
        body: JSON.stringify({
            playgroundId,
            filename: file.name,
            mimeType: file.type,
            size: file.size,
            scope,
        }),
    });

    try {
        await sendFile(ticket, file, onProgress);
        return await request<PlaygroundMedia>(`/media/uploads/${ticket.media._id}/complete`, token, { method: "POST" });
    } catch (error) {
        // Don't leave a PENDING record behind. Best effort: if this call fails
        // too, the backend drops PENDING records after a day anyway.
        await request(`/media/uploads/${ticket.media._id}/abort`, token, { method: "POST" }).catch(() => undefined);
        throw error;
    }
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
