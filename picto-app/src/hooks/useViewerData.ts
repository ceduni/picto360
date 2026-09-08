import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { HotspotData } from "@/utils/Types";
import type { ViewerDataSource } from "@/utils/viewerDataSource";

interface UseViewerDataProps {
    viewerId: string;
    dataSource: ViewerDataSource;
}

interface UseViewerDataReturn {
    imageSource: string | null;
    hotspots: HotspotData[];
    isLoading: boolean;
    error: Error | null;
}

export const useViewerData = ({ viewerId, dataSource }: UseViewerDataProps): UseViewerDataReturn => {
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

        let dispose: (() => void) | undefined;
        let isMounted = true;

        const loadViewerData = async (): Promise<void> => {
            try {
                setIsLoading(true);
                setError(null);

                const loaded = await dataSource.load(viewerId);
                dispose = loaded.dispose;

                if (!isMounted) return;

                if (!loaded.imageSource) {
                    navigate("/");
                    return;
                }

                setImageSource(loaded.imageSource);
                setHotspots(loaded.hotspots);
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
            dispose?.();
        };
    }, [viewerId, dataSource, navigate]);

    return { imageSource, hotspots, isLoading, error };
};
