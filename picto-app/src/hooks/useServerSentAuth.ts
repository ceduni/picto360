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
        // console.log("Auth status event:", next);
        setAuthStatus(next);
        }
    });

    // progress
    es.addEventListener("upload-progress", (e) => {
      const data = JSON.parse(e.data);
      console.log(`Progress for ${data.id}: ${data.percent}%`);
    });

    // export done
    es.addEventListener("export-complete", (e) => {
      const data = JSON.parse(e.data);
      console.log(`✅ Export finished for ${data.id}`);
    });    

    // es.addEventListener("ping", (evt) => {
    //     console.debug("Ping", JSON.parse((evt as MessageEvent).data));
    // });

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