import { useRef, useEffect, useState } from "react";
import type { PannellumViewer } from "@/types/panorama.types";

interface UseVideoViewerProps {
    viewerRef: React.RefObject<HTMLDivElement | null>;
    videoSource: string | null;
}

interface UseVideoViewerReturn {
    viewerInstance: PannellumViewer | null;
    isReady: boolean;
}

/**
 * Same contract as usePannellumViewer, but drives a 360 video through the
 * three.js engine. Returns a null instance while inactive so components can
 * call both hooks and pick whichever engine matches the media type.
 *
 * The engine loads lazily (dynamic import), so the instance is kept in state:
 * consumers must re-render when it becomes available.
 */
export const useVideoViewer = ({
    viewerRef,
    videoSource,
}: UseVideoViewerProps): UseVideoViewerReturn => {
    const instanceRef = useRef<PannellumViewer | null>(null);
    const [viewerInstance, setViewerInstance] = useState<PannellumViewer | null>(null);

    useEffect(() => {
        if (!viewerRef.current || !videoSource || instanceRef.current) {
            return;
        }

        let cancelled = false;
        const host = viewerRef.current;

        void (async () => {
            try {
                const { createVideoViewer } = await import("@/engines/createVideoViewer");
                if (cancelled || !host.isConnected) {
                    return;
                }
                const instance = createVideoViewer(host, videoSource);
                instanceRef.current = instance;
                setViewerInstance(instance);
            } catch (error) {
                console.error("Failed to initialize video viewer:", error);
            }
        })();

        return () => {
            cancelled = true;
            if (instanceRef.current) {
                try {
                    instanceRef.current.destroy();
                } catch (error) {
                    console.error("Error destroying video viewer:", error);
                }
                instanceRef.current = null;
                setViewerInstance(null);
            }
        };
    }, [videoSource]);

    return {
        viewerInstance,
        isReady: viewerInstance !== null,
    };
};
