import "./css/PanoramaViewer.css";

import React, { useRef, useCallback, useEffect } from "react";
import { PiTargetBold } from "react-icons/pi";
import ContextMenu from "./ContextMenu";
import EditionPannel from "./EditionPannel";
import type { HotspotData } from "@/utils/Types";
import { useHotspotCreation } from "@/hooks/useHotspotCreation";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";
import { usePannellumViewer } from "@/hooks/usePannellumViewer";
import { useViewerData } from "@/hooks/useViewerData";
import { useContextMenu } from "@/hooks/useContextMenu";
import { useHotspotManager } from "@/hooks/useHotspotManager";
import { useEditionPanel } from "@/hooks/useEditionPanel";


interface PanoramaViewerProps {
    width: string;
    height: string;
    viewerId: string;
    isEditMode: boolean;
}

const PanoramaViewer: React.FC<PanoramaViewerProps> = ({
    width,
    height,
    viewerId,
    isEditMode,
}) => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const { setBannerMessage } = useFeedbackBanner();

    // Load viewer data
    const { imageSource, hotspots: initialHotspots, isLoading, error } = useViewerData({ viewerId });

    // Initialize Pannellum
    const { viewerInstance } = usePannellumViewer({
        viewerRef,
        imageSource,
    });


    const {
        visible: contextMenuVisible,
        position: contextMenuPosition,
        targetIconPosition,
        getCoords,
        showContextMenu,
        hideContextMenu,
        relocateContextMenu,
        clearTargetIcon,
    } = useContextMenu({
        isEditMode,
        viewerInstance,
        onShowWarning: (message) => setBannerMessage({ message, type: "warning" }),
    });

    // Hotspot click handler
    const handleHotspotClick = useCallback(
        (event: MouseEvent, hotspot: HotspotData): void => {
            event.preventDefault();
            setSelectedHotspot(hotspot);
            openPanel("editing");
        },
        []
    );

    // Hotspot management
    const {
        selectedHotspot,
        setSelectedHotspot,
        createHotspot,
        updateHotspot,
        deleteHotspot,
        createNewHotspotData,
        decrementCounter,
    } = useHotspotManager({
        viewerId,
        viewerInstance,
        initialHotspots,
        onHotspotClick: handleHotspotClick,
    });

    // Edition panel
    const { panelState, openPanel, closePanel } = useEditionPanel();

    // Hotspot creation
    const handleHotspotCreation = useCallback(
        (type: string, coords: [number, number]): void => {
            console.log('🎯 handleHotspotCreation called with:', {
                type,
                coords,
                pitch: coords[0],
                yaw: coords[1]
            });
            
            try {
                const newHotspot = createNewHotspotData(type, coords);
                console.log('🎯 New hotspot data created:', newHotspot);
                setSelectedHotspot(newHotspot);
                openPanel("creating");
            } catch (error) {
                console.error("Failed to create hotspot:", error);
                setBannerMessage({ message: "Erreur lors de la création", type: "failure" });
            }
        },
        [createNewHotspotData, setSelectedHotspot, openPanel, setBannerMessage]
    );

    const { dispatchHotspotEvent } = useHotspotCreation(
        viewerRef.current,
        handleHotspotCreation
    );

    // Handlers - NOW USING getCoords()
    const handleContextMenuClick = useCallback(
        (menuItemType: string): void => {
            if (!viewerInstance) return;

            const contextMenuCoords = getCoords();
            console.log('🎯 Context menu clicked, coords:', contextMenuCoords);
            const coords: [number, number] = [contextMenuCoords.pitch, contextMenuCoords.yaw];
            console.log('🎯 Dispatching event with coords:', coords);
            
            dispatchHotspotEvent(menuItemType, coords);
            hideContextMenu();
        },
        [viewerInstance, getCoords, dispatchHotspotEvent, hideContextMenu]
    );

    const handleHotspotCreate = useCallback(
        async (hotspotData: HotspotData): Promise<void> => {
            try {
                await createHotspot(hotspotData);
                clearTargetIcon();
            } catch (error) {
                setBannerMessage({ message: "Erreur lors de la sauvegarde", type: "failure" });
            }
        },
        [createHotspot, clearTargetIcon, setBannerMessage]
    );

    const handleHotspotSave = useCallback(
        async (updatedHotspot: HotspotData): Promise<void> => {
            try {
                await updateHotspot(updatedHotspot);
            } catch (error) {
                setBannerMessage({ message: "Erreur lors de la mise à jour", type: "failure" });
            }
        },
        [updateHotspot, setBannerMessage]
    );

    const handleHotspotDelete = useCallback(
        async (toDeleteHotspot: HotspotData): Promise<void> => {
            try {
                await deleteHotspot(toDeleteHotspot);
            } catch (error) {
                setBannerMessage({ message: "Erreur lors de la suppression", type: "failure" });
            }
        },
        [deleteHotspot, setBannerMessage]
    );

    const handlePanelClose = useCallback((): void => {
        if (panelState?.state === "creating") {
            decrementCounter();
            clearTargetIcon();
        }
        closePanel();
        setSelectedHotspot(null);
    }, [panelState, decrementCounter, clearTargetIcon, closePanel, setSelectedHotspot]);

    // Close panel on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent): void => {
            const target = e.target as HTMLElement;

            if (
                target.closest(".hotspot-manager__custom-tooltip") ||
                target.closest(".edition_pannel") ||
                panelState?.state === "creating"
            ) {
                return;
            }

            setSelectedHotspot(null);
        };

        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, [panelState, setSelectedHotspot]);

    // Error state
    if (error) {
        return (
            <div className="panorama-viewer__error">
                Erreur lors du chargement: {error.message}
            </div>
        );
    }

    // Loading state
    if (isLoading) {
        return <div className="panorama-viewer__loading">Chargement...</div>;
    }

    return (
        <>
            <div
                ref={viewerRef}
                className="panorama-viewer"
                style={{ width, height }}
                onContextMenu={showContextMenu}
                role="application"
                aria-label="Visualiseur panoramique 360°"
            />

            {isEditMode && contextMenuVisible && (
                <ContextMenu
                    visible={contextMenuVisible}
                    anchorPosition={contextMenuPosition}
                    onMenuItemClick={handleContextMenuClick}
                    onClose={hideContextMenu}
                    onRelocate={relocateContextMenu}
                    isEditMode={isEditMode}
                />
            )}

            {isEditMode && targetIconPosition && (
                <div
                    style={{
                        top: targetIconPosition.y,
                        left: targetIconPosition.x,
                    }}
                    className="panorama-viewer__target-icon"
                    aria-hidden="true"
                >
                    <PiTargetBold />
                </div>
            )}

            {isEditMode && panelState?.isOpen && selectedHotspot && (
                <EditionPannel
                    hotspot={selectedHotspot}
                    onSave={handleHotspotSave}
                    onClose={handlePanelClose}
                    onDelete={handleHotspotDelete}
                    onCreate={handleHotspotCreate}
                    pannelState={panelState.state}
                />
            )}
        </>
    );
};

export default React.memo(PanoramaViewer);