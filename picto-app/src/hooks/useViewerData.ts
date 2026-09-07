import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getViewerItem } from "@/utils/storedImageData";
import { hydrateStoredHotspots } from "@/utils/HotspotAssetUtils";
import type { HotspotData } from "@/utils/Types";

export type ViewerMediaType = "image" | "video";

interface UseViewerDataProps {
    viewerId: string;
}

interface UseViewerDataReturn {
    imageSource: string | null; // deprecated alias of mediaSource, kept for callers
    mediaSource: string | null;
    mediaType: ViewerMediaType;
    hotspots: HotspotData[];
    isLoading: boolean;
    error: Error | null;
}

const resolveMediaType = (item?: { mimeType?: string; blob?: Blob; compressedBlob?: Blob }): ViewerMediaType => {
    const mimeType = item?.mimeType ?? item?.compressedBlob?.type ?? item?.blob?.type ?? "";
    return mimeType.startsWith("video/") ? "video" : "image";
};

export const useViewerData = ({ viewerId }: UseViewerDataProps): UseViewerDataReturn => {
    const [imageSource, setImageSource] = useState<string | null>(null);
    const [mediaType, setMediaType] = useState<ViewerMediaType>("image");
    const [hotspots, setHotspots] = useState<HotspotData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!viewerId || viewerId === "null") {
            navigate("/", { replace: true });
            return;
        }

        let objectUrl: string | undefined;
        let hotspotObjectUrls: string[] = [];
        let isMounted = true;

        const loadViewerData = async (): Promise<void> => {
            try {
                setIsLoading(true);
                setError(null);

                const viewerItem = await getViewerItem(viewerId);
                const compressedImage = viewerItem?.compressedBlob || viewerItem?.blob;
                const annotations = viewerItem?.annotations;
                const assets = viewerItem?.assets || [];

                if (!isMounted) return;

                if (!compressedImage) {
                    navigate("/");
                    return;
                }

                objectUrl = URL.createObjectURL(compressedImage);
                setImageSource(objectUrl);
                setMediaType(resolveMediaType({
                    mimeType: viewerItem?.mimeType,
                    blob: viewerItem?.blob,
                    compressedBlob: compressedImage,
                }));

                if (annotations && Array.isArray(annotations)) {
                    const hydratedHotspots = hydrateStoredHotspots(annotations, assets);
                    hotspotObjectUrls = hydratedHotspots.objectUrls;
                    setHotspots(hydratedHotspots.hotspots);
                }
            } catch (err) {
                if (!isMounted) return;

                const error = err instanceof Error ? err : new Error("Failed to load viewer data");
                setError(error);
                console.error("Error loading viewer data:", error);
                navigate("/");
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadViewerData();

        return () => {
            isMounted = false;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
            hotspotObjectUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [viewerId, navigate]);

    return { imageSource, mediaSource: imageSource, mediaType, hotspots, isLoading, error };
};
