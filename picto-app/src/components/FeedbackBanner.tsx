import { MessageBannerRef, MessageBannerType } from "@/utils/Types";
import { forwardRef, useImperativeHandle, useState } from "react";
import { LuCircleCheck, LuCircleX, LuTriangleAlert, LuX } from "react-icons/lu";
import "./css/FeedbackBanner.css";


const ErrorBanner = forwardRef<MessageBannerRef>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageBannerType>("warning");


  useImperativeHandle(ref, () => ({
    trigger: (msg: string, type?: MessageBannerType  , duration = 5000) => {
      if(msg==="") return;
      setMessageType(type||"warning");
      setMessage(msg);
      setVisible(true);


      setTimeout(() => {
        setVisible(false);     
      }, duration);

    },
  }));


  return (
    <div className={`feedback_banner ${visible ? "visible" : ""} feedback_banner_${messageType}`}>
        {
          messageType ==="success" ? 
            <LuCircleCheck size={22} />
          :
            messageType ==="failure" ? 
              <LuCircleX size={22} />
              :
              <LuTriangleAlert size={22}/>
        }
        <p>{message}</p>
        <LuX size={22} onClick={()=>setVisible(false)} style={{cursor:"pointer"}}/>
    </div>
  );
});

export default ErrorBanner;