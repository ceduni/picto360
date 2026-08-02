import { MessageBannerRef, MessageBannerType } from "@/utils/Types";
import { forwardRef, useImperativeHandle, useState } from "react";
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
    <div hidden={!visible} className={`feedback_banner ${visible ? "visible" : ""} feedback_banner_${messageType}`}>
        {
          messageType ==="success" ?
            <CheckCircleIcon width={22} height={22} />
          :
            messageType ==="failure" ?
              <XCircleIcon width={22} height={22} />
              :
              <ExclamationTriangleIcon width={22} height={22} />
        }
        <p>{message}</p>
        <XMarkIcon width={22} height={22} onClick={()=>setVisible(false)} style={{cursor:"pointer"}}/>
    </div>
  );
});

export default ErrorBanner;