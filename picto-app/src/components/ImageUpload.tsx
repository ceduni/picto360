import React, { useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import "./css/ImageUpload.css";

interface ImageUploadProps {
  onImageUpload: (imageSrc: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [showPopup, setShowPopup] = useState(true);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      const url = URL.createObjectURL(file);
      onImageUpload(url);
      setShowPopup(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      onImageUpload(url);
      setShowPopup(false);
    }
  };

  return (
    showPopup && (
      <div className="modal">
        <div className="modal-content">
          <h2>Choisissez une image</h2>
          <div
            className="drop-zone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
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
    )
  );
};

export default ImageUpload;
