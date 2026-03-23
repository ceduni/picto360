export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export function parseGiphyUrlToDirectGif(url: string): string | null {
    try {
        const parsedUrl = new URL(url);
        if (parsedUrl.hostname === "giphy.com") {
            const pathSegments = parsedUrl.pathname.split("/").filter(Boolean);
            const gifId = pathSegments[pathSegments.length - 1];
            return `https://media.giphy.com/media/${gifId}/giphy.gif`;
        }
        return null;
    } catch {
        return null;
    }
}

export function isValidYouTubeUrl(url: string): boolean {
    try {
        const parsedUrl = new URL(url);
        return (
            parsedUrl.hostname === "www.youtube.com" &&
            parsedUrl.pathname === "/watch" &&
            parsedUrl.searchParams.has("v")
        );
    } catch {
        return false;
    }
}

export function isValidImageUrl(url: string): boolean {
    try {
        const parsedUrl = new URL(url);
        return (
            parsedUrl.protocol === "http:" ||
            parsedUrl.protocol === "https:"
        ) && (parsedUrl.pathname.match(/\.(jpeg|jpg|gif|png|svg)$/) != null);
    } catch {
        return false;
    }
}

export function isValidVideoUrl(url: string): boolean {
    try {
        const parsedUrl = new URL(url);
        return (
            parsedUrl.protocol === "http:" ||
            parsedUrl.protocol === "https:"
        ) && (parsedUrl.pathname.match(/\.(mp4|webm|ogg)$/) != null);
    } catch {
        return false;
    }
}