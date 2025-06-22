  import ImageUploader from "@/components/ImageUploader";
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./css/HomePage.css";  
import { useAuth } from "@/authContext/authContext";
import { doSignOut } from "@/firebase/authentification";

interface HomeProps{
    setImageSrc:(newImage: string) =>void
}

  const HomePage: React.FC<HomeProps> = ({setImageSrc}) => {
   
    const {userLoggedIn,currentUser} = useAuth();

    const navigate = useNavigate();

    const handleImageUpload = useCallback((newImageSrc: string) => {
        setImageSrc(newImageSrc);
        navigate('/view');
    }, []);

    const handleLogClick = useCallback(() => {
        navigate('/login');
    }, []);

    const onProfileClick = useCallback(() =>{
        navigate('/profile')
    },[]);

    const onLoggOut = async (e: { preventDefault: () => void })=> {
            e.preventDefault();
            if(userLoggedIn){
                await doSignOut()
            }
        }

    return(
        <div className="home_background">

            <div className="home-page__content">

                <div className="top-content">
                    <img className="image-uploader__logo" 
                        src="/images/logo_picto360.png" alt="Logo-picto360" />
                    {
                        userLoggedIn && 
                        <div className="profile-button" onClick={onProfileClick}>
                            <span className="material-icons" >
                            account_circle
                            </span>
                            <h2 className="profil_user-name" >
                                {currentUser?.displayName}
                            </h2>
                        </div>
                    }
                </div>

                <div className="home-page__center">
                    <div className="home-page__login_container">
                        {userLoggedIn ?
                        <button type="button" className="home-page__create_group_button" onClick={onLoggOut}>
                            {/* Créer un groupe    */}
                            Log out :
                            {currentUser?.displayName}
                        </button>
                        : 
                        <button type="button" className="home-page__login_button"
                            onClick={handleLogClick}>
                            Se connecter
                        </button>
                        }

                        <button type ="button" className="home-page_create_activity">
                            Créer une activité
                        </button>
                    </div>

                    <ImageUploader onImageUpload={handleImageUpload} />

                </div>


            </div>
            {/* TODO : Do the css */}

        </div>
    )

}

export default React.memo(HomePage);

function setIsSigninIn(arg0: boolean) {
    throw new Error("Function not implemented.");
}
