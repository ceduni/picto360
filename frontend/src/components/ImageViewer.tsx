import React, { useEffect, useRef, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import ContextMenu from "./ContextMenu";
import "./ImageViewer.css";

declare global {
  interface Window {
    pannellum: any;
  }
}

const ImageViewer: React.FC = () => {
  const viewerElement = useRef<HTMLDivElement>(null);
  const [imageSrc, setImageSrc] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  // Initialize the pannellum viewer (360° image window)
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

  useEffect(() => {
    const handleContextMenu = (e: Event) => {
      const customEvent = e as CustomEvent;
      setContextMenu({
        visible: true,
        x: customEvent.detail.x,
        y: customEvent.detail.y,
      });
    };

    window.addEventListener(
      "showContextMenu",
      handleContextMenu as EventListener
    );

    return () => {
      window.removeEventListener(
        "showContextMenu",
        handleContextMenu as EventListener
      );
    };
  }, []);

  // Drag and drop logic for image upload
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setShowPopup(false);
    }
  };

  // Handle file input for image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setShowPopup(false);
    }
  };

  // Handle context menu item click
  const handleContextMenuItemClick = (type: string) => {
    console.log("Context menu item clicked:", type);
    setContextMenu({ ...contextMenu, visible: false });
  };

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false }); //function to close context menu
  };

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
