import React, { useEffect, useRef, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import {
  AiOutlineForm,
  AiOutlineFileText,
  AiOutlineLink,
  AiOutlinePicture,
} from "react-icons/ai";
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
  const contextMenuRef = useRef<HTMLDivElement>(null);

  // Initialize the pannellum viewer (360° image window)
  useEffect(() => {
    if (viewerElement.current && imageSrc) {
      window.pannellum.viewer(viewerElement.current, {
        type: "equirectangular",
        panorama: imageSrc,
        autoLoad: true,
        autoRotate: -2,
        showZoomCtrl: false,
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

    // Event listener to close the context menu when clicking outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener(
        "showContextMenu",
        handleContextMenu as EventListener
      );
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu]);

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
    // logic to handle the creation of different types of hotspots here
    setContextMenu({ ...contextMenu, visible: false });
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
      {contextMenu.visible && (
        <div
          ref={contextMenuRef}
          className="context-menu"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
        >
          <ul>
            <li onClick={() => handleContextMenuItemClick("Form")}>
              <AiOutlineForm className="menu-icon" /> Formulaire
            </li>
            <li onClick={() => handleContextMenuItemClick("Text")}>
              <AiOutlineFileText className="menu-icon" /> Texte
            </li>
            <li onClick={() => handleContextMenuItemClick("Link")}>
              <AiOutlineLink className="menu-icon" /> Lien
            </li>
            <li onClick={() => handleContextMenuItemClick("Media")}>
              <AiOutlinePicture className="menu-icon" /> Média
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ImageViewer;
