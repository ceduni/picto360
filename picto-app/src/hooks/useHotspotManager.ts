import { useState, useCallback, useRef, useEffect } from "react";
import type { PannellumViewer } from "@/types/panorama.types";
import { putViewerItem } from "@/utils/storedImageData";
import { HotspotData } from "@/utils/Types";
import { createHotspotInstance, deleteHotspotInstance } from "@/utils/HotspotUtils";

interface UseHotspotManagerProps {
    viewerId: string;
    viewerInstance: PannellumViewer | null;
    initialHotspots: HotspotData[];
}

interface UseHotspotManagerReturn {
    hotspots: HotspotData[];
    selectedHotspot: HotspotData | null;
    setSelectedHotspot: (hotspot: HotspotData | null) => void;
    addHotspotToViewer: (
        hotspotData: HotspotData, 
        onClickHandler?: (event: MouseEvent, args: HotspotData) => void
    ) => void;
    createHotspot: (hotspotData: HotspotData) => Promise<void>;
    updateHotspot: (
        updatedHotspot: HotspotData, 
        onClickHandler?: (event: MouseEvent, args: HotspotData) => void
    ) => Promise<void>;
    deleteHotspot: (toDeleteHotspot: HotspotData) => Promise<void>;
    createNewHotspotData: (type: string, coords: [number, number]) => HotspotData;
    decrementCounter: () => void;
}

export const useHotspotManager = ({
    viewerId,
    viewerInstance,
    initialHotspots,
}: UseHotspotManagerProps): UseHotspotManagerReturn => {
    const [hotspots, setHotspots] = useState<HotspotData[]>(initialHotspots);
    const [selectedHotspot, setSelectedHotspot] = useState<HotspotData | null>(null);
    const hotspotCounter = useRef(0);
    const hotspotsLoadedRef = useRef(false);

    // Sync with initial hotspots when they change
    useEffect(() => {
        setHotspots(initialHotspots);
        hotspotsLoadedRef.current = false; // Reset flag when initial hotspots change
    }, [initialHotspots]);

    // Create stable callback reference that won't change
    const addHotspotToViewerStable = useCallback(
        (
            hotspotData: HotspotData, 
            onClickHandler?: (event: MouseEvent, args: HotspotData) => void
        ): void => {
            if (!hotspotData.content || !viewerInstance) {
                return;
            }

            try {
                viewerInstance.removeHotSpot(hotspotData.id);
                const hotspotInstance = createHotspotInstance(hotspotData, onClickHandler!);
                viewerInstance.addHotSpot(hotspotInstance);
                hotspotCounter.current++;
            } catch (error) {
                console.error("Failed to add hotspot to viewer:", error);
            }
        },
        [viewerInstance]
    );

    // Load existing hotspots into viewer - only once when viewer is ready
    useEffect(() => {
        if (!viewerInstance || hotspots.length === 0 || hotspotsLoadedRef.current) {
            return;
        }

        const loadHandler = (): void => {
            if (hotspotsLoadedRef.current) return; // Double-check

            hotspots.forEach((hotspot) => {
                if (hotspot?.content) {
                    addHotspotToViewerStable(hotspot);
                }
            });
            
            hotspotsLoadedRef.current = true;
        };

        try {
            viewerInstance.on("load", loadHandler);
        } catch (error) {
            console.error("Failed to attach load handler:", error);
        }

        // No cleanup needed - we want the hotspots to persist
    }, [viewerInstance, hotspots, addHotspotToViewerStable]);

    const createHotspot = useCallback(
        async (hotspotData: HotspotData): Promise<void> => {
            if (!hotspotData.content) {
                throw new Error("Hotspot must have content");
            }

            const newHotspotList = [...hotspots, hotspotData];
            
            try {
                await putViewerItem(viewerId, undefined, undefined, newHotspotList);
                setHotspots(newHotspotList);
            } catch (error) {
                console.error("Failed to create hotspot:", error);
                throw error;
            }
        },
        [hotspots, viewerId]
    );

    const updateHotspot = useCallback(
        async (
            updatedHotspot: HotspotData, 
            onClickHandler?: (event: MouseEvent, args: HotspotData) => void
        ): Promise<void> => {
            const newHotspotList = hotspots.map((hs) =>
                hs.id === updatedHotspot.id ? updatedHotspot : hs
            );

            try {
                await putViewerItem(viewerId, undefined, undefined, newHotspotList);
                setHotspots(newHotspotList);

                if (viewerInstance) {
                    viewerInstance.removeHotSpot(updatedHotspot.id);
                    const hotspotInstance = createHotspotInstance(updatedHotspot, onClickHandler!);
                    viewerInstance.addHotSpot(hotspotInstance);
                }
            } catch (error) {
                console.error("Failed to update hotspot:", error);
                throw error;
            }
        },
        [hotspots, viewerId, viewerInstance]
    );

    const deleteHotspot = useCallback(
        async (toDeleteHotspot: HotspotData): Promise<void> => {
            if (!viewerInstance) {
                throw new Error("Viewer instance not available");
            }

            const newHotspotList = hotspots.filter((hs) => hs.id !== toDeleteHotspot.id);
            
            try {
                await putViewerItem(viewerId, undefined, undefined, newHotspotList);
                setHotspots(newHotspotList);

                viewerInstance.removeHotSpot(toDeleteHotspot.id);
                deleteHotspotInstance(viewerInstance, toDeleteHotspot);
                hotspotCounter.current--;
            } catch (error) {
                console.error("Failed to delete hotspot:", error);
                throw error;
            }
        },
        [hotspots, viewerId, viewerInstance]
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
        addHotspotToViewer: addHotspotToViewerStable,
        createHotspot,
        updateHotspot,
        deleteHotspot,
        createNewHotspotData,
        decrementCounter,
    };
};