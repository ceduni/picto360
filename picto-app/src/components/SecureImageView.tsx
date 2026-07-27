import { useState } from "react"
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";

interface SecureImageProps {
    imageId : string,
    initialUrl : string,
}

function SecureImage( {imageId, initialUrl} : SecureImageProps) {

    const [src, setSrc] = useState<string>(initialUrl);
    const [retryCount, setRetryCount] = useState(0);
    const { setBannerMessage } = useFeedbackBanner();
    

    const handleError = async () =>{
        // Prevent infinite retries if backend down or key missing
        if (retryCount >= 2) return;

        try{
            const response = await fetch(`/api/refresh-image-url?id=${imageId}`);
            const data = await response.json()

            setRetryCount (prev => prev +1)
            setSrc ( data.freshUrl); // update the image source with the new valid signature
        }catch(err){
            setBannerMessage({ message:"This image is not accessible, try again!", type: "failure"})
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