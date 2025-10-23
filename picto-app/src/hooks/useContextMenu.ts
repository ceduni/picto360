import { useState, useCallback, useRef, useEffect } from "react";
import type { PannellumViewer, ContextMenuPosition, ContextMenuCoords } from "@/types/panorama.types";

interface UseContextMenuProps {
    isEditMode: boolean;
    viewerInstance: PannellumViewer | null;
    onShowWarning: (message: string) => void;
}

interface UseContextMenuReturn {
    visible: boolean;
    position: ContextMenuPosition;
    targetIconPosition: ContextMenuPosition | null;
    coords: ContextMenuCoords;
    showContextMenu: (event: React.MouseEvent<HTMLDivElement>) => void;
    hideContextMenu: () => void;
    relocateContextMenu: (newPosition: ContextMenuPosition) => void;
    clearTargetIcon: () => void;
}

const HOTSPOT_TOOLTIP_SELECTOR = ".hotspot-manager__custom-tooltip";

export const useContextMenu = ({
    isEditMode,
    viewerInstance,
    onShowWarning,
}: UseContextMenuProps): UseContextMenuReturn => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState<ContextMenuPosition>({ x: 0, y: 0 });
    const [targetIconPosition, setTargetIconPosition] = useState<ContextMenuPosition | null>(null);
    const coordsRef = useRef<ContextMenuCoords>({ pitch: 0, yaw: 0 });

    const showContextMenu = useCallback(
        (event: React.MouseEvent<HTMLDivElement>): void => {
            event.preventDefault();

            if (!isEditMode || !viewerInstance) {
                return;
            }

            const target = event.target as HTMLElement;
            if (target.closest(HOTSPOT_TOOLTIP_SELECTOR)) {
                event.stopPropagation();
                onShowWarning("Impossible de superposer des annotations");
                return;
            }

            const pos: ContextMenuPosition = { 
                x: event.clientX, 
                y: event.clientY 
            };
            
            setVisible(true);
            setPosition(pos);
            setTargetIconPosition(pos);

            try {
                const coords = viewerInstance.mouseEventToCoords(event.nativeEvent);
                coordsRef.current = { pitch: coords[0], yaw: coords[1] };
            } catch (error) {
                console.error("Failed to get coordinates:", error);
                coordsRef.current = { pitch: 0, yaw: 0 };
            }
        },
        [isEditMode, viewerInstance, onShowWarning]
    );

    const hideContextMenu = useCallback((): void => {
        setVisible(false);
        setPosition({ x: 0, y: 0 });
        setTargetIconPosition(null);
    }, []);

    const relocateContextMenu = useCallback(
        (newPosition: ContextMenuPosition): void => {
            if (!isEditMode || !viewerInstance) {
                return;
            }

            setPosition(newPosition);
            setTargetIconPosition(newPosition);

            try {
                const coords = viewerInstance.mouseEventToCoords({
                    clientX: newPosition.x,
                    clientY: newPosition.y,
                } as MouseEvent);

                coordsRef.current = { pitch: coords[0], yaw: coords[1] };
            } catch (error) {
                console.error("Failed to relocate context menu:", error);
            }
        },
        [isEditMode, viewerInstance]
    );

    const clearTargetIcon = useCallback((): void => {
        setTargetIconPosition(null);
    }, []);

    useEffect(() => {
        if (!isEditMode) {
            hideContextMenu();
        }
    }, [isEditMode, hideContextMenu]);

    return {
        visible,
        position,
        targetIconPosition,
        coords: coordsRef.current,
        showContextMenu,
        hideContextMenu,
        relocateContextMenu,
        clearTargetIcon,
    };
};