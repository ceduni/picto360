// hooks/useDriveAuth.ts
import { useLocation, useParams } from "react-router-dom";
import { getGoogleDriveService } from "@/utils/GoogleDriveUtils";

export function useDriveAuth() {
  const driveService = getGoogleDriveService();
  const location = useLocation();

  async function startDriveAuth(viewerId?:string) {
    if (!viewerId || viewerId === undefined) throw new Error("viewerId missing in URL");
    const returnTo = location.pathname + location.search;

    // Fallbacks in case 'state' gets lost
    sessionStorage.setItem("oauth:viewerId", viewerId);
    sessionStorage.setItem("oauth:returnTo", returnTo);
    
    console.log("Return to :" , returnTo)
    const authUrl = await driveService.getAuthUrl(viewerId, returnTo);
    window.location.href = authUrl; // go to Google
  }

  return { startDriveAuth };
}