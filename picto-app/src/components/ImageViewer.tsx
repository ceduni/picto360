import React, { useEffect, useRef } from "react";
import { useImageViewer } from "../hooks/useImageViewer";
import ContextMenu from "@components/ContextMenu";
import "./css/ImageViewer.css";
import { MdOutlineFileDownload } from "react-icons/md";

interface HotSpot {
  pitch: number;
  yaw: number;
  type: string;
  text?: string;
  URL?: string;
  sceneId?: string;
  targetYaw?: number;
  targetPitch?: number;
  cssClass?: string;
  clickHandlerFunc?: (args: any) => void;
  clickHandlerArgs?: any;
  createTooltipFunc?: (args: any) => HTMLElement;
  createTooltipArgs?: any;
  id: string;
}

interface PannellumViewerProps {
  width: string;
  height: string;
}

declare global {
  interface Window {
    pannellum: any;
  }
}

const ImageViewer: React.FC<PannellumViewerProps> = ({ width, height }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  const {
    imageSrc,
    showPopup,
    contextMenu,
    handleDragOver,
    handleDrop,
    handleImageChange,
    handleContextMenuItemClick,
    closeContextMenu,
  } = useImageViewer();

  useEffect(() => {
    if (viewerRef.current && imageSrc) {
      const viewer = window.pannellum.viewer(viewerRef.current, {
        type: "equirectangular",
        panorama: imageSrc,
        autoLoad: true,
        autoRotate: -2,
        showZoomCtrl: true,
        strings: {
          loadingLabel: "Chargement en cours...",
        },
      });

      const handleMouseDown = (event: MouseEvent) => {
        const coords = viewer.mouseEventToCoords(event);
        const hotspotId = `hotspot-${Date.now()}`;

        const hotspot: HotSpot = {
          id: hotspotId,
          pitch: coords[0],
          yaw: coords[1],
          type: "info",
          text: "You clicked here!",
          /*clickHandlerFunc: (args: any) => { //args error -> args is not used
            alert("Missing annotation");
          },*/
        };

        viewer.addHotSpot(hotspot);
      };

      viewer.on("mousedown", handleMouseDown);

      // Cleanup
      return () => {
        viewer.off("mousedown", handleMouseDown);
        viewer.destroy();
      };
    }
  }, [imageSrc]);

  return (
    <>
      {showPopup && (
        <div className="modal">
          <div className="modal-content">
            <h2>Choisissez une image</h2>
            <div
              className="drop-zone"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              style={{
                border: "2px dashed #ccc",
                padding: "50px",
                cursor: "pointer",
              }}
            >
              <p id="download-logo">
                <MdOutlineFileDownload />
              </p>
              <p>
                Déposez votre image ici ou cliquez pour sélectionner une image
              </p>
            </div>
            <input type="file" onChange={handleImageChange} />
          </div>
        </div>
      )}
      <div
        ref={viewerRef}
        className="viewer-container"
        style={{ width, height }}
      ></div>
      <ContextMenu
        visible={contextMenu.visible}
        x={contextMenu.x}
        y={contextMenu.y}
        onMenuItemClick={handleContextMenuItemClick}
        onClose={closeContextMenu}
      />
    </>
  );
};

export default ImageViewer;
