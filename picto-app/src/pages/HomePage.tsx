  import ImageUploader from "@/components/ImageUploader";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./css/HomePage.css";  
import { useAuth } from "@/authContext/authContext";
import GotoProfile from "@/components/GotoProfile";
import { putViewerItem,compressBeforeUpload } from "@/utils/storedImageData";
import { CustomFileExporter } from "@/pictoFileExtention/PictoFileFormat";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";
import ErrorBanner from "@/components/FeedbackBanner";


interface HomeProps{

}

  const HomePage: React.FC<HomeProps> = () => {
   
    const {userLoggedIn} = useAuth();
    const { setBannerMessage,bannerRef } = useFeedbackBanner();

    const navigate = useNavigate();

    const handleImageUpload = useCallback(async (newImageSrc: File) : Promise<boolean> => {
        if(!ImageUploader) return false;

        const viewerId = crypto.randomUUID();
        const filetype = newImageSrc.name.split(".").pop();
        const fileName = newImageSrc.name.split(".")[0];
        // console.log("Filetype:",filetype);

        switch(filetype){
            case "picto":
                try{
                    const extractedFile = await CustomFileExporter.extractCustomFile(newImageSrc);
                    await putViewerItem(viewerId,fileName,extractedFile.imageBlob,extractedFile.annotations);
                    setBannerMessage({message:"Fichier chargé avec succès",type:"success"})
                }catch(error){
                    setBannerMessage({message:"Error on picto file",type:"failure"})
                    // console.log("Error on picto file",error)
                }
                break
            case "jpg" :
            case "JPG" :
            case "jpeg" :
            case "png":
                await putViewerItem(viewerId,undefined,newImageSrc,undefined);
                setBannerMessage({message:"Image chargé avec succès",type:"success"})
                break;
            default:
                setBannerMessage({message:"Format de fichier Invalide",type:"failure"})
                return false
        }
        
        await navigate(`/view/${viewerId}`);
        if(filetype != "picto" && newImageSrc.size >= 10000000) {
            const compressed_image = await compressBeforeUpload(newImageSrc);
            if (compressed_image?.type.includes("image")) 
                await putViewerItem(viewerId,undefined,undefined,undefined,compressed_image);
        }
        return true

    }, []);

    const handleLogClick = useCallback(() => {
        navigate('/login');
    }, []);

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
                <ErrorBanner ref={bannerRef}/>
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
