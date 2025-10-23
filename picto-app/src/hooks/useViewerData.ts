import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getViewerItem } from "@/utils/storedImageData";
import type { HotspotData } from "@/utils/Types";

interface UseViewerDataProps {
    viewerId: string;
}

interface UseViewerDataReturn {
    imageSource: string | null;
    hotspots: HotspotData[];
    isLoading: boolean;
    error: Error | null;
}

export const useViewerData = ({ viewerId }: UseViewerDataProps): UseViewerDataReturn => {
    const [imageSource, setImageSource] = useState<string | null>(null);
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
        let isMounted = true;

        const loadViewerData = async (): Promise<void> => {
            try {
                setIsLoading(true);
                setError(null);

                const viewerItem = await getViewerItem(viewerId);
                
                if (!isMounted) return;

                if (!viewerItem?.blob) {
                    navigate("/");
                    return;
                }

                objectUrl = URL.createObjectURL(viewerItem.blob);
                setImageSource(objectUrl);

                if (viewerItem.annotations && Array.isArray(viewerItem.annotations)) {
                    setHotspots(viewerItem.annotations);
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
        };
    }, [viewerId, navigate]);

    return { imageSource, hotspots, isLoading, error };
};
