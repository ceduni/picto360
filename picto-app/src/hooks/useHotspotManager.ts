import { useState, useCallback, useRef, useEffect } from "react";
import type { HotspotData, PannellumViewer } from "@/utils/Types";
import { createHotspotInstance, deleteHotspotInstance } from "@/utils/HotspotUtils";
import type { ViewerDataSource } from "@/utils/viewerDataSource";

interface UseHotspotManagerProps {
    viewerId: string;
    viewerInstance: PannellumViewer | null;
    initialHotspots: HotspotData[];
    onHotspotClick: (event: MouseEvent, hotspot: HotspotData) => void;
    dataSource: ViewerDataSource;
}

interface UseHotspotManagerReturn {
    hotspots: HotspotData[];
    selectedHotspot: HotspotData | null;
    setSelectedHotspot: (hotspot: HotspotData | null) => void;
    createHotspot: (hotspotData: HotspotData) => Promise<void>;
    updateHotspot: (updatedHotspot: HotspotData) => Promise<void>;
    deleteHotspot: (toDeleteHotspot: HotspotData) => Promise<void>;
    createNewHotspotData: (type: string, coords: [number, number]) => HotspotData;
    decrementCounter: () => void;
}

export const useHotspotManager = ({
    viewerId,
    viewerInstance,
    initialHotspots,
    onHotspotClick,
    dataSource,
}: UseHotspotManagerProps): UseHotspotManagerReturn => {
    const [hotspots, setHotspots] = useState<HotspotData[]>(initialHotspots);
    const [selectedHotspot, setSelectedHotspot] = useState<HotspotData | null>(null);
    const hotspotCounter = useRef(0);
    const hotspotsLoadedRef = useRef(false);

    // Sync with initial hotspots when they change
    useEffect(() => {
        setHotspots(initialHotspots);
        hotspotsLoadedRef.current = false;
    }, [initialHotspots]);

    // Stable function to add hotspot to viewer
    const addHotspotToViewer = useCallback(
        (hotspotData: HotspotData): void => {
            if (!hotspotData.content || !viewerInstance) {
                console.warn('⚠️ Cannot add hotspot - missing content or viewer', {
                    hasContent: !!hotspotData.content,
                    hasViewer: !!viewerInstance,
                    hotspotId: hotspotData.id
                });
                return;
            }

            try {
                viewerInstance.removeHotSpot(hotspotData.id);
                const hotspotInstance = createHotspotInstance(hotspotData, onHotspotClick);

                viewerInstance.addHotSpot(hotspotInstance);

                hotspotCounter.current++;
            } catch (error) {
                console.error("Failed to add hotspot to viewer:", error);
            }
        },
        [viewerInstance, onHotspotClick]
    );

    // Load existing hotspots into viewer
    useEffect(() => {
        if (!viewerInstance || hotspots.length === 0) {
            return;
        }

        if (hotspotsLoadedRef.current) {
            return;
        }

        const loadHandler = (): void => {
            if (hotspotsLoadedRef.current) {
                console.log('Hotspots already loaded, skipping...');
                return;
            }

            hotspots.forEach((hotspot) => {
                if (hotspot) {
                    addHotspotToViewer(hotspot);
                }
            });

            hotspotsLoadedRef.current = true;
        };

        try {
            viewerInstance.on("load", loadHandler);
        } catch (error) {
            console.error("Failed to attach load handler:", error);
        }
    }, [viewerInstance, hotspots, addHotspotToViewer]);

    const createHotspot = useCallback(
        async (hotspotData: HotspotData): Promise<void> => {
            if (!hotspotData.content && !hotspotData.pendingAsset) {
                throw new Error("Hotspot must have content");
            }

            try {
                const newHotspotList = [...hotspots, hotspotData];
                const runtimeHotspots = await dataSource.createHotspot(viewerId, newHotspotList);
                const runtimeHotspot = runtimeHotspots[runtimeHotspots.length - 1];

                setHotspots(runtimeHotspots);
                addHotspotToViewer(runtimeHotspot);
            } catch (error) {
                console.error("Failed to create hotspot:", error);
                throw error;
            }
        },
        [hotspots, viewerId, dataSource, addHotspotToViewer]
    );

    const updateHotspot = useCallback(
        async (updatedHotspot: HotspotData): Promise<void> => {
            const newHotspotList = hotspots.map((hs) =>
                hs.id === updatedHotspot.id ? updatedHotspot : hs
            );

            try {
                const runtimeHotspots = await dataSource.updateHotspot(viewerId, newHotspotList);
                const runtimeHotspot = runtimeHotspots.find((hs) => hs.id === updatedHotspot.id);

                setHotspots(runtimeHotspots);

                if (runtimeHotspot) {
                    addHotspotToViewer(runtimeHotspot);
                }
            } catch (error) {
                console.error("Failed to update hotspot:", error);
                throw error;
            }
        },
        [hotspots, viewerId, dataSource, addHotspotToViewer]
    );

    const deleteHotspot = useCallback(
        async (toDeleteHotspot: HotspotData): Promise<void> => {
            if (!viewerInstance) {
                throw new Error("Viewer instance not available");
            }

            const newHotspotList = hotspots.filter((hs) => hs.id !== toDeleteHotspot.id);

            try {
                const runtimeHotspots = await dataSource.deleteHotspot(viewerId, newHotspotList);
                setHotspots(runtimeHotspots);

                viewerInstance.removeHotSpot(toDeleteHotspot.id);
                deleteHotspotInstance(viewerInstance, toDeleteHotspot);
                hotspotCounter.current--;
            } catch (error) {
                console.error("Failed to delete hotspot:", error);
                throw error;
            }
        },
        [hotspots, viewerId, viewerInstance, dataSource]
    );

    const generateHotspotId = useCallback((): string => {
        return `hotspot-${Date.now()}-${hotspotCounter.current++}`;
    }, []);

    const createNewHotspotData = useCallback(
        (type: string, coords: [number, number]): HotspotData => {
            if (!type || coords.length !== 2) {
                throw new Error("Invalid hotspot parameters");
            }

            return {
                id: generateHotspotId(),
                pitch: coords[0],
                yaw: coords[1],
                type: type.toLowerCase(),
                cssClass: "hotspot-manager__custom_hotspot",
            };
        },
        [generateHotspotId]
    );

    const decrementCounter = useCallback((): void => {
        hotspotCounter.current = Math.max(0, hotspotCounter.current - 1);
    }, []);

    return {
        hotspots,
        selectedHotspot,
        setSelectedHotspot,
        createHotspot,
        updateHotspot,
        deleteHotspot,
        createNewHotspotData,
        decrementCounter,
    };
};
