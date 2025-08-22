// hooks/useDriveAuth.ts
import { useLocation } from "react-router-dom";
import { getExportService } from "@/utils/ExportFileUtils";
import { useState } from "react";

export function useDriveAuth() {
  const driveService = getExportService();
  const location = useLocation();
  const [authStatus,setAuthStatus] = useState<string|null> (null);

  const baseUrl =  'http://localhost:5000'; 
  
  async function startDriveAuth(viewerId?:string) {
    if (!viewerId || viewerId === undefined) throw new Error("viewerId missing in URL");
    const returnTo = location.pathname + location.search;

    // Fallbacks in case 'state' gets lost
    sessionStorage.setItem("oauth:viewerId", viewerId);
    sessionStorage.setItem("oauth:returnTo", returnTo);
    
    console.log("Return to :" , returnTo)
    const authUrl = await getAuthUrl(viewerId, returnTo);
    window.location.href = authUrl; // go to Google
  }

  // Get OAuth URL from backend
  async function getAuthUrl(viewerId: string, returnTo: string): Promise<string> {

    try {
      const response = await fetch(`${baseUrl}/api/drive/auth-url`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ returnTo,viewerId }),        
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get auth URL');
      }

      return data.authUrl as string;
    } catch (error) {
      throw new Error(`Failed to get auth URL: ${error}`);
    }
  }  


  async function getDriveAuthStatus () {
    try{
      const result = await fetch(`http://localhost:5000/api/auth-status`,{
          method:"GET",
          credentials:"include",
      });

      if(!result.ok){
          return null;
      }
      const data = await result.json();

      return data.authStatus;
    }catch(err){
      return null;
    }
  }

    
  const checkDriveAuth = async()=>{
          const authStatu = await getDriveAuthStatus()
          const url = new URL(window.location.href);

          if(!authStatu) {
              url.searchParams.delete("auth");
          }else{
              url.searchParams.set("auth",authStatu);
          }
          window.history.replaceState({}, "", url.toString());
          setAuthStatus(authStatu)
  }

  async function logoutFromDrive() {
    const res = await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Logout failed");
    setAuthStatus(null);
  }

  return { startDriveAuth,authStatus, checkDriveAuth,logoutFromDrive };
}