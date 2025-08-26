  import ImageUploader from "@/components/ImageUploader";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./css/HomePage.css";  
import { useAuth } from "@/authContext/authContext";
import { doSignOut } from "@/firebase/authentification";
import GotoProfile from "@/components/GotoProfile";
import { putViewerItem,compressBeforeUpload } from "@/utils/storedImageData";
import { CustomFileExporter } from "@/pictoFileExtention/PictoFileFormat";


interface HomeProps{

}

  const HomePage: React.FC<HomeProps> = () => {
   
    const {userLoggedIn,currentUser} = useAuth();

    const navigate = useNavigate();

    const handleImageUpload = useCallback(async (newImageSrc: File) => {
        if(!ImageUploader) return;

        const viewerId = crypto.randomUUID();
        const filetype = newImageSrc.name.split(".").pop();
        const fileName = newImageSrc.name.split(".")[0];
        console.log("Filetype:",filetype);

        switch(filetype){
            case "picto":
                try{
                    const extractedFile = await CustomFileExporter.extractCustomFile(newImageSrc);
                    await putViewerItem(viewerId,fileName,extractedFile.imageBlob,extractedFile.annotations);
                }catch(error){
                    console.log("Error on picto file",error)
                }
                break
            case "jpg":
            case "png":
                await putViewerItem(viewerId,undefined,newImageSrc,undefined);
                break;
            default:
                console.log("Invalid file Format")
                return
        }
        
        await navigate(`/view/${viewerId}`);

        // await fetch("http://localhost:3000",{
            
        // })
        
        // const compressedImage = await compressBeforeUpload(newImageSrc);
        // await putViewerItem(viewerId,undefined,undefined,undefined,compressedImage);

    }, []);

    const handleLogClick = useCallback(() => {
        navigate('/login');
    }, []);


    const onLoggOut = async (e: { preventDefault: () => void })=> {
            e.preventDefault();
            if(userLoggedIn){
                await doSignOut()
            }
        }

    const onCreateActivityClick = () => {
        if(userLoggedIn){
            handleCreateActivity();
        }else{
            handleLogClick();
        }
    }

    const handleCreateActivity = useCallback (() => {
        navigate('/activity_creation');
    },[])

    return(
        <div className="home_background">

            <div className="home-page__content">

                <div className="top-content">
                    <img className="image-uploader__logo" 
                        src="/images/logo_picto360.png" alt="Logo-picto360" />
                    <GotoProfile displayType={userLoggedIn ? undefined : "name"} />
                </div>

                <div className="home-page__center">
                    <div className="home-page__login_container">
                        {userLoggedIn ?
                        <button type="button" className="home-page__create_group_button">
                            {/* Créer un groupe    */}
                            Créer un groupe
                        </button>
                        : 
                        <button type="button" className="home-page__login_button"
                            onClick={handleLogClick}>
                            Se connecter
                        </button>
                        }

                        <button type ="button" className="home-page_create_activity" onClick={onCreateActivityClick}>
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
