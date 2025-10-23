import { useRef, useEffect } from "react";
import type { PannellumViewer, ViewerConfig } from "@/types/panorama.types";

declare global {
    interface Window {
        pannellum?: {
            viewer: (element: HTMLElement, config: unknown) => unknown;
        };
    }
}

interface UsePannellumViewerProps {
    viewerRef: React.RefObject<HTMLDivElement | null>;
    imageSource: string | null;
    config?: Partial<Omit<ViewerConfig, 'panorama'>>;
}

interface UsePannellumViewerReturn {
    viewerInstance: PannellumViewer | null;
    isReady: boolean;
}

const DEFAULT_CONFIG: Omit<ViewerConfig, 'panorama'> = {
    type: "equirectangular",
    autoLoad: true,
    autoRotate: -2,
    showControls: false,
    showFullscreenCtrl: false,
    showZoomCtrl: true,
    keyboardZoom: false,
    disableKeyboardCtrl: true,
    mouseZoom: true,
    strings: {
        loadingLabel: "Chargement en cours...",
    },
};

export const usePannellumViewer = ({
    viewerRef,
    imageSource,
    config = {},
}: UsePannellumViewerProps): UsePannellumViewerReturn => {
    const viewerInstanceRef = useRef<PannellumViewer | null>(null);
    const isInitializedRef = useRef(false);

    useEffect(() => {
        // Only initialize once when we have all requirements
        if (!viewerRef.current || !imageSource || !window.pannellum || isInitializedRef.current) {
            return;
        }

        const fullConfig: ViewerConfig = {
            ...DEFAULT_CONFIG,
            ...config,
            panorama: imageSource,
        };

        try {
            viewerInstanceRef.current = window.pannellum.viewer(
                viewerRef.current,
                fullConfig
            ) as PannellumViewer;
            isInitializedRef.current = true;
        } catch (error) {
            console.error("Failed to initialize Pannellum viewer:", error);
        }

        // Cleanup only on unmount or when imageSource changes
        return () => {
            if (viewerInstanceRef.current) {
                try {
                    viewerInstanceRef.current.destroy();
                } catch (error) {
                    console.error("Error destroying viewer:", error);
                }
                viewerInstanceRef.current = null;
                isInitializedRef.current = false;
            }
        };
    }, [imageSource]); // Only depend on imageSource, not config or viewerRef

    return {
        viewerInstance: viewerInstanceRef.current,
        isReady: isInitializedRef.current,
    };
};