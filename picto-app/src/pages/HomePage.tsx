  import ImageUploader from "@/components/ImageUploader";
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./css/HomePage.css";
import { color } from "framer-motion";
  

interface HomeProps{
    setImageSrc:(newImage: string) =>void
}

  const HomePage: React.FC<HomeProps> = ({setImageSrc}) => {

    const navigate = useNavigate();

    const handleImageUpload = useCallback((newImageSrc: string) => {
        setImageSrc(newImageSrc);
        navigate('/view');
    }, []);

    const handleLogClick = useCallback(() => {
        navigate('/login');
    }, []);

    return(
        <div className="home_background">
            <div className="home-page__content">
                <img className="image-uploader__logo" 
                 src="/images/logo_picto360.png" alt="Logo-picto360" />

                <div className="image-uploader__login_container">
                    <button type="button" className="image-uploader__login_button"
                        onClick={handleLogClick}>
                        Se connecter
                    </button>
                </div>
                <ImageUploader onImageUpload={handleImageUpload} />
            </div>
            {/* TODO : Do the css */}

        </div>
    )

}

export default React.memo(HomePage);