import React, { useEffect, useCallback, useState, useRef, useMemo } from "react";
import { PiTargetBold } from "react-icons/pi";
import ContextMenu from "./ContextMenu";
import HotspotManager from "./HotspotManager";
import "./css/PanoramaViewer.css";

declare global {
  interface Window {
    //TODO: Remove any
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

const PanoramaViewer: React.FC<PanoramaViewerProps> = ({ width, height, imageSrc, isEditMode }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstanceRef = useRef<unknown>(null);
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
    [imageSrc]
  );

  const setupViewer = useCallback(() => {
    if (!viewerRef.current || !imageSrc) return;

    const viewer = window.pannellum.viewer(viewerRef.current, viewerConfig);
    viewerInstanceRef.current = viewer;

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      const position = { x: event.clientX, y: event.clientY };
      setContextMenuState({ visible: true, position });
      setTargetIconPosition(position);

      const coords = viewer.mouseEventToCoords(event);
      contextMenuCoordsRef.current = { pitch: coords[0], yaw: coords[1] };
    };

    viewerRef.current.addEventListener("contextmenu", handleContextMenu);

    return () => {
      viewerRef.current?.removeEventListener("contextmenu", handleContextMenu);
      viewer.destroy();
    };
  }, [imageSrc, viewerConfig]);

  useEffect(() => {
    const cleanup = setupViewer();
    return cleanup;
  }, [setupViewer]);

  const hideContextMenu = useCallback(() => {
    setContextMenuState((prev) => ({ ...prev, visible: false }));
    setTargetIconPosition(null);
  }, []);

  const handleContextMenuClick = useCallback(
    (annotationType: string) => {
      if (!viewerInstanceRef.current) return;

      const { pitch, yaw } = contextMenuCoordsRef.current;
      const coords = [pitch, yaw];

      // Pass the annotation type and coordinates to HotspotManager
      //TODO: Remove any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (viewerInstanceRef.current as any).addHotspot(annotationType, coords);
      hideContextMenu();
    },
    [hideContextMenu]
  );

  useEffect(() => {
    if (!isEditMode) {
      hideContextMenu();
    }
  }, [isEditMode, hideContextMenu]);

  return (
    <>
      <div
        ref={viewerRef}
        className="panorama-viewer"
        style={{ width, height }}
        onContextMenu={(e) => {
          if (!isEditMode) {
            e.preventDefault();
          }
        }}
      />
      {isEditMode && contextMenuState.visible && (
        <ContextMenu
          visible={contextMenuState.visible}
          anchorPosition={contextMenuState.position}
          onMenuItemClick={handleContextMenuClick}
          onClose={hideContextMenu}
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
      <HotspotManager viewer={viewerInstanceRef.current} />
    </>
  );
};

export default React.memo(PanoramaViewer);
