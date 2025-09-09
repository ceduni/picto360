// hooks/useDriveAuth.ts
import { useLocation } from "react-router-dom";
// import { getExportService } from "@/utils/ExportFileUtils";
// import { useEffect, useState } from "react";

export function useDriveAuth() {
  // const driveService = getExportService();
  const location = useLocation();

  const baseUrl =  'http://localhost:5000'; 
  
  async function startDriveAuth(viewerId?:string) {
    if (!viewerId || viewerId === undefined) throw new Error("viewerId missing in URL");
    const returnTo = location.pathname + location.search;

    // Fallbacks in case 'state' gets lost
    sessionStorage.setItem("oauth:viewerId", viewerId);
    sessionStorage.setItem("oauth:returnTo", returnTo);
    
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


  async function logoutFromDrive() {
    const res = await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Logout failed");
  }

  return { startDriveAuth,logoutFromDrive };
}