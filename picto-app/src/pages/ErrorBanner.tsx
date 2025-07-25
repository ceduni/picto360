import { forwardRef, useImperativeHandle, useState } from "react";
import { LuTriangleAlert, LuX } from "react-icons/lu";

export type ErrorBannerRef = {
  trigger: (message: string, duration?: number) => void;
};


const ErrorBanner = forwardRef<ErrorBannerRef>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  useImperativeHandle(ref, () => ({
    trigger: (msg: string, duration = 3000) => {
      setMessage(msg);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, duration);
    },
  }));


  return (
    <div className={`error_banner ${visible ? "visible" : ""}`}>
        <LuTriangleAlert size={22}/>
        <p>{message}</p>
        <LuX size={22} onClick={()=>setVisible(false)} style={{cursor:"pointer"}}/>
    </div>
  );
});

export default ErrorBanner;