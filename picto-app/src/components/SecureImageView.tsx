import { useState } from "react"
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";
import React from "react";
import { refreshPrivateImageURL, signPrivateImageURL } from "@/utils/ImageUploadUtils";
import { useAuth } from "@/authContext/authContext";

interface SecureImageProps {
    imageId? : string,
    initialUrl : string,
}

function SecureImage( {imageId, initialUrl} : SecureImageProps) {

    const [src, setSrc] = useState<string>(initialUrl);
    const [retryCount, setRetryCount] = useState(0);
    const { setBannerMessage } = useFeedbackBanner();
    const { currentUser } = useAuth();
    

    const handleError = async () =>{
        // Prevent infinite retries if backend down or key missing
        if (retryCount >= 2) return;
        if (!currentUser) {
            setBannerMessage({ message: "Vous devez être connecté visualiser ce fichier", type: "failure" });
            return;
        }

        const token = await currentUser.getIdToken();

        try{
            
            let fresh_url = ""
            if (imageId){
                fresh_url = await signPrivateImageURL(imageId,token)
            }else{
                fresh_url = await refreshPrivateImageURL(initialUrl,token)
            }

            setRetryCount (prev => prev +1)
            setSrc (fresh_url); // update the image source with the new valid signature
        }catch{
            setBannerMessage({ message:"Vous n'avex pas accès à cette image !", type: "failure"})
        }
    }

    return(
        <img 
            src= {src}
            onError={handleError}
            alt="Secure User content"
        />
    )
}

export default React.memo(SecureImage)