import { MessageBannerRef, MessageBannerType } from "@/utils/Types";
import { useState,useEffect,useRef } from "react";

export function useFeedbackBanner (){
    const [bannerMessage,setBannerMessage] = useState<{message:string,type?:MessageBannerType}|null>(null);
    const bannerRef = useRef<MessageBannerRef>(null);


    useEffect(()=>{
        if( bannerMessage!=null){
            bannerRef.current?.trigger( bannerMessage.message, bannerMessage.type);
        }
    },[ bannerMessage])

    return { setBannerMessage , bannerRef}
}