import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/authContext/authContext";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";
import { getMediaAccessUrl, isVideoMedia } from "@/utils/MediaUploadUtils";
import type { PlaygroundMedia } from "@/utils/Types";

interface SecureMediaViewProps {
    media: PlaygroundMedia;
}

const MAX_RETRIES = 2;

/**
 * Renders a private playground media (Cloudflare Images or R2) through a
 * short lived signed URL, and re-signs it when it expires (the element errors).
 */
function SecureMediaView({ media }: SecureMediaViewProps) {
    const [src, setSrc] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const { currentUser } = useAuth();
    const { setBannerMessage } = useFeedbackBanner();

    const sign = useCallback(async () => {
        if (!currentUser) {
            setBannerMessage({ message: "Vous devez être connecté pour visualiser ce fichier", type: "failure" });
            return;
        }
        try {
            const token = await currentUser.getIdToken();
            const access = await getMediaAccessUrl(media._id, token);
            setSrc(access.url);
        } catch {
            setBannerMessage({ message: "Vous n'avez pas accès à ce fichier !", type: "failure" });
        }
    }, [currentUser, media._id, setBannerMessage]);

    useEffect(() => {
        setRetryCount(0);
        sign();
    }, [sign]);

    const handleError = () => {
        // Prevent infinite retries if backend down or key missing
        if (retryCount >= MAX_RETRIES) return;
        setRetryCount((prev) => prev + 1);
        sign();
    };

    if (!src) return <div className="secure-media secure-media--loading" aria-busy="true" />;

    return isVideoMedia(media) ? (
        <video className="secure-media" src={src} onError={handleError} controls preload="metadata" />
    ) : (
        <img className="secure-media" src={src} onError={handleError} alt={media.name ?? "Contenu de l'activité"} />
    );
}

export default React.memo(SecureMediaView);
