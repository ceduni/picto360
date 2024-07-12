import React, { useState, useRef } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import {
  FaCamera,
  FaFileImport,
  FaGoogleDrive,
  FaDropbox,
} from "react-icons/fa";
import { GrOnedrive } from "react-icons/gr";

import "./css/ImageUpload.css";

interface ImageUploadProps {
  onImageUpload: (imageSrc: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [showPopup, setShowPopup] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEvents = (event: React.DragEvent, isDragging: boolean) => {
    event.preventDefault();
    setIsDragging(isDragging);
  };

  const handleDrop = (event: React.DragEvent) => {
    handleDragEvents(event, false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      processFile(event.dataTransfer.files[0]);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      processFile(event.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const url = URL.createObjectURL(file);
    onImageUpload(url);
    setShowPopup(false);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    showPopup && (
      <div className="modal">
        <div className="modal-content">
          <img id="logo" src="/logo_picto360.png" alt="Logo" />
          <div
            className={`drop-zone ${isDragging ? "dragging" : ""}`}
            onDragOver={(event) => handleDragEvents(event, true)}
            onDragLeave={(event) => handleDragEvents(event, false)}
            onDrop={handleDrop}
          >
            <div id="download-icon">
              <MdOutlineFileDownload />
            </div>
            <div id="drop-text">Déposez une image ou un projet</div>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleImageChange} />
          <div className="icon-container">
            <div className="icon camera">
              <FaCamera />
            </div>
            <div className="icon import" onClick={triggerFileInput}>
              <FaFileImport />
            </div>
            <div className="icon drive">
              <FaGoogleDrive />
            </div>
            <div className="icon dropbox">
              <FaDropbox />
            </div>
            <div className="icon onedrive">
              <GrOnedrive />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ImageUpload;
