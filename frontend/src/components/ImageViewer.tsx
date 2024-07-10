import React, { useEffect, useRef } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import ContextMenu from "../../../picto-app/src/components/ContextMenu";
import { useImageViewer } from "../hooks/useImageViewer";
import "./ImageViewer.css";

declare global {
  interface Window {
    pannellum: any;
  }
}

const ImageViewer: React.FC = () => {
  const viewerElement = useRef<HTMLDivElement>(null);
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
    if (viewerElement.current && imageSrc) {
      window.pannellum.viewer(viewerElement.current, {
        type: "equirectangular",
        panorama: imageSrc,
        autoLoad: true,
        autoRotate: -2,
        showZoomCtrl: false,
        strings: {
          loadingLabel: "Chargement en cours...",
        },
      });
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
      <div ref={viewerElement} className="viewer-container"></div>
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
