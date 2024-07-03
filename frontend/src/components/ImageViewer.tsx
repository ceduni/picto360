import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineFileDownload } from "react-icons/md";
import './ImageViewer.css';

declare global {
  interface Window {
    pannellum: any;
  }
}

const ImageViewer: React.FC = () => {
  const viewerElement = useRef<HTMLDivElement>(null);
  const [imageSrc, setImageSrc] = useState('');
  const [showPopup, setShowPopup] = useState(true);

  // Fenetre image360°
  useEffect(() => {
    if (viewerElement.current  && imageSrc) {
      window.pannellum.viewer(viewerElement.current, {
        type: 'equirectangular',
        panorama: imageSrc,
        autoLoad: true,
        autoRotate: -2,
        showZoomCtrl: false,

      });
    }
  }, [imageSrc]);

  // Permettre le glisser déposer
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setShowPopup(false);
    }
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
              style={{ border: '2px dashed #ccc', padding: '50px', cursor: 'pointer' }}
              >
                <p id='download-logo'><MdOutlineFileDownload /></p>
              <p>Déposez votre image ici ou cliquez pour sélectionner une image</p>
            </div>
            <input type="file" onChange={handleImageChange} />
            
          </div>
        </div>
      )}
      <div
        ref={viewerElement}
        className="viewer-container"
      ></div>
    </>
  );
};

export default ImageViewer;