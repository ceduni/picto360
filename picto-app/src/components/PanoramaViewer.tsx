import React, { useEffect, useCallback, useState, useRef, useMemo } from "react";
import { useHotspotCreation } from "../hooks/useHotspotCreation";
import { PiTargetBold } from "react-icons/pi";
import ContextMenu from "./ContextMenu";
import HotspotManager from "./HotspotManager";
import "./css/PanoramaViewer.css";

declare global {
  interface Window {
    //TODO: Replace any (if possible)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pannellum: any;
  }
}

interface PanoramaViewerProps {
  width: string;
  height: string;
  imageSrc: string;
  isEditMode: boolean;
}

interface PannellumViewer {
  mouseEventToCoords: (event: MouseEvent) => [number, number];
  destroy: () => void;
  getYaw: () => number;
  getPitch: () => number;
  getHfov: () => number;
}

const PanoramaViewer: React.FC<PanoramaViewerProps> = ({ width, height, imageSrc, isEditMode }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstanceRef = useRef<PannellumViewer | null>(null);
  const [contextMenuState, setContextMenuState] = useState({
    visible: false,
    position: { x: 0, y: 0 },
  });
  const [targetIconPosition, setTargetIconPosition] = useState<{ x: number; y: number } | null>(null);
  const contextMenuCoordsRef = useRef<{ pitch: number; yaw: number }>({ pitch: 0, yaw: 0 });

  const viewerConfig = useMemo(
    () => ({
      type: "equirectangular",
      panorama: imageSrc,
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
    }),
    [imageSrc] // northOffset excluded as it forces the viewer to reload
  );

  const initializeViewer = useCallback(() => {
    if (!viewerRef.current || !imageSrc) {
      console.error("PanellumViewer - Viewer ref or image source is missing.");
      return;
    }

    if (!viewerInstanceRef.current) {
      console.log("PanellumViewer - Initializing Pannellum viewer...");
      viewerInstanceRef.current = window.pannellum.viewer(viewerRef.current, viewerConfig) as PannellumViewer;
    }
  }, [imageSrc, viewerConfig]);

  useEffect(() => {
    initializeViewer();

    return () => {
      if (viewerInstanceRef.current) {
        console.log("PanellumViewer - Destroying Pannellum viewer...");
        viewerInstanceRef.current.destroy();
        viewerInstanceRef.current = null;
      }
    };
  }, [initializeViewer]);


  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault(); // Suppress the browser's native context menu

      if (!isEditMode || !viewerInstanceRef.current) return;

      const position = { x: event.clientX, y: event.clientY };
      setContextMenuState({ visible: true, position });
      setTargetIconPosition(position);

      const coords = viewerInstanceRef.current.mouseEventToCoords(event.nativeEvent);
      console.log("PanellumViewer - Mouse coords to pitch/yaw:", coords);
      contextMenuCoordsRef.current = { pitch: coords[0], yaw: coords[1] };
    },
    [isEditMode]
  );

  const hideContextMenu = useCallback(() => {
    setContextMenuState({ visible: false, position: { x: 0, y: 0 } });
    setTargetIconPosition(null);
  }, []);

  const handleHotspotCreation = useCallback((type: string, coords: [number, number]) => {
    console.log(`PanellumViewer - Performing action of type ${type} at pitch = ${coords[0]}, yaw = ${coords[1]}...`);
  }, []);

  const { dispatchHotspotEvent } = useHotspotCreation(viewerRef.current, handleHotspotCreation);

  const handleContextMenuClick = useCallback(
    (menuItemType: string) => {
    

      if (!viewerInstanceRef.current) {
        console.error("PanellumViewer - Viewer instance is not ready.");
        return;
      }

      const { pitch, yaw } = contextMenuCoordsRef.current;
      const coords: [number, number] = [pitch, yaw];

      dispatchHotspotEvent(menuItemType, coords);

      hideContextMenu();
    },
    [hideContextMenu, dispatchHotspotEvent]
  );

  // Clear context menu state and target position when switching to Preview Mode
  useEffect(() => {
    if (!isEditMode) {
      hideContextMenu();
    }
  }, [isEditMode, hideContextMenu]);

  const handleRelocateContextMenu = useCallback(
    (newPosition: { x: number; y: number }) => {
      if (!isEditMode) return;

      setContextMenuState((prev) => ({
        ...prev,
        position: newPosition,
      }));

      setTargetIconPosition(newPosition);

      if (viewerInstanceRef.current) {
        const coords = viewerInstanceRef.current.mouseEventToCoords({
          clientX: newPosition.x,
          clientY: newPosition.y,
        } as MouseEvent);

        contextMenuCoordsRef.current = { pitch: coords[0], yaw: coords[1] };
      }
    },
    [isEditMode]
  );

  return (
    <>
      <div ref={viewerRef} className="panorama-viewer" style={{ width, height }} onContextMenu={handleContextMenu} />
      
      {isEditMode && contextMenuState.visible && (
        <ContextMenu
          visible={contextMenuState.visible}
          anchorPosition={contextMenuState.position}
          onMenuItemClick={handleContextMenuClick}
          onClose={hideContextMenu}
          onRelocate={handleRelocateContextMenu}
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
        >
          <PiTargetBold />
        </div>
      )}
      <HotspotManager viewer={viewerInstanceRef.current} viewerElement={viewerRef.current} />
    </>
  );
};

export default React.memo(PanoramaViewer);
