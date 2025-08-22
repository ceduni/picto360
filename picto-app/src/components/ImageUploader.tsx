import React, { useState, useRef } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaCamera, FaFileImport, FaGoogleDrive, FaDropbox } from "react-icons/fa";
import { GrOnedrive } from "react-icons/gr";
//import WelcomeMessage from "./ui/WelcomeMessage";
import "./css/ImageUploader.css";

interface ImageUploaderProps {
  onImageUpload: (imageSrc: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  //TODO: manage errors + add red color to the drop zone
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
    // const url = URL.createObjectURL(file);
    onImageUpload(file);
    console.log("File uploaded: ", file);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
      <div className="image-uploader__content">
        {/*<WelcomeMessage
          text="Votre vision, enrichie en 360°."
          color="#ffffff"
          fontSize="4rem"
          fontFamily="'Courier New', sans-serif"
          fontWeight="bold"
          textShadow="2px 2px 4px rgba(0,0,0,0.1)"
        />*/}
        <div
          className={`image-uploader__drop-zone ${isDragging ? "image-uploader__drop-zone--dragging" : ""}`}
          onDragOver={(event) => handleDragEvents(event, true)}
          onDragLeave={(event) => handleDragEvents(event, false)}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          {" "}
          {/*TODO: add clicking action*/}
          <div className="image-uploader__download-icon">
            <MdOutlineFileDownload />
          </div>
          <div className="image-uploader__drop-text">Déposez une image ou un projet</div>
          {/*TODO: mention the supported files format + file size limit*/}
        </div>

        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="image-uploader__file-input" />

        
        {/* 
        Othe ways to import images or picto files

        <div className="image-uploader__icon-container">
          <div className="image-uploader__icon image-uploader__icon--camera" onClick={triggerFileInput}>
            <FaCamera />
          </div>
          <div className="image-uploader__icon image-uploader__icon--import" onClick={triggerFileInput}>
            <FaFileImport />
          </div>
          <div className="image-uploader__icon image-uploader__icon--drive">
            <FaGoogleDrive />
          </div>
          <div className="image-uploader__icon image-uploader__icon--dropbox">
            <FaDropbox />
          </div>
          <div className="image-uploader__icon image-uploader__icon--onedrive">
            <GrOnedrive />
          </div>
        </div> */}
      </div>
  );
};

export default React.memo(ImageUploader);
