import React, { useState, useRef } from "react";
import { InformationCircleIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
// import { FaCamera, FaFileImport, FaGoogleDrive, FaDropbox } from "react-icons/fa";
// import { GrOnedrive } from "react-icons/gr";
//import WelcomeMessage from "./ui/WelcomeMessage";
import "./css/ImageUploader.css";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";

interface ImageUploaderProps {
    onImageUpload: (imageSrc: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
    //TODO: manage errors + add red color to the drop zone
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { setBannerMessage } = useFeedbackBanner()

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
        try {
            onImageUpload(file);
            setBannerMessage({ message: "Fichier chargé avec succès", type: "success" })
        } catch (error) {
            setBannerMessage({ message: "Erreur de chargement de fichier", type: "failure" })
            return;
        }
    };

    const triggerFileInput = (e: React.MouseEvent) => {
        e.preventDefault()
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="image-uploader__content">
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
                    <ArrowUpTrayIcon width={24} height={24} className="image-uploader__download-icon-ico" />
                </div>
                <p className="image-uploader__drop-text">
                    <b>Selectionnez une image ou un projet Picto
                        <span className="has-helper">
                            <InformationCircleIcon width={18} height={18} />
                            <span className="helper mid">Fichier <code><b>.picto</b></code></span>
                        </span>
                    </b> 
                    <br /> ou glissez là simplement ici
                </p>
                {/*TODO: mention the supported files format + file size limit*/}
            </div>

            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="image-uploader__file-input" />

        </div>
    );
};

export default React.memo(ImageUploader);
