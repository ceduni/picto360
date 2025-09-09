import { DriveAuthStatus } from "@/utils/Types";
import { useEffect, useState } from "react";

export function useServerSentAuth(){
  const [driveAuthStatus, setAuthStatus] = useState<DriveAuthStatus | null>(null);  

  async function getDriveAuthStatus () {
    try{
      const result = await fetch(`http://localhost:5000/api/auth/status`,{credentials:"include",});

      if(!result.ok){
          return null;
      }
      const data = await result.json();

      return data;
    }catch(err){
      return null;
    }
  }
  
  // async function checkDriveAuth (){
  //         const authStatus = await getDriveAuthStatus()
  //         const url = new URL(window.location.href);
          
  //         url.searchParams.delete("auth");

  //         if(authStatus) {
  //             url.searchParams.set("auth",authStatus);
  //         }
  //         window.history.replaceState({}, "", url.toString());
  // }

  useEffect(()=>{
    let es: EventSource | null = null;
    let canceled = false;

    // 1) initial snapshot
    getDriveAuthStatus().then((status) => {
        if (!canceled) setAuthStatus(status);
    });

    // 2) open stream immediately
    es = new EventSource("http://localhost:5000/api/auth/stream", { withCredentials: true });

    es.addEventListener("auth-status", (evt) => {
        if (!canceled) {
        const next = JSON.parse((evt as MessageEvent).data) as DriveAuthStatus;
        console.log("Auth status event:", next);
        setAuthStatus(next);
        }
    });

    es.addEventListener("ping", (evt) => {
        console.debug("Ping", JSON.parse((evt as MessageEvent).data));
    });

    es.onerror = () => {
        console.warn("SSE connection lost. The browser will retry automatically.");
    };

    return () => {
        canceled = true;
        if (es) es.close();
    };     

  },[]);  

  return {driveAuthStatus};
}