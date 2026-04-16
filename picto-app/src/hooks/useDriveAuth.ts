// hooks/useDriveAuth.ts
import { ExportFormat } from "@/utils/Types";
import { useLocation } from "react-router-dom";

export interface PendingDriveExport {
  viewerId: string;
  format: ExportFormat;
  fileName?: string;
  folderName?: string;
  includeMetadata?: boolean;
}

interface StartDriveAuthOptions {
  autoExport?: boolean;
  returnTo?: string;
}

const OAUTH_VIEWER_ID_KEY = "oauth:viewerId";
const OAUTH_RETURN_TO_KEY = "oauth:returnTo";
const PENDING_DRIVE_EXPORT_KEY = "oauth:pendingDriveExport";

export function savePendingDriveExport(payload: PendingDriveExport) {
  sessionStorage.setItem(PENDING_DRIVE_EXPORT_KEY, JSON.stringify(payload));
}

export function getPendingDriveExport(): PendingDriveExport | null {
  const rawValue = sessionStorage.getItem(PENDING_DRIVE_EXPORT_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as PendingDriveExport;
  } catch (_error) {
    sessionStorage.removeItem(PENDING_DRIVE_EXPORT_KEY);
    return null;
  }
}

export function clearPendingDriveExport() {
  sessionStorage.removeItem(PENDING_DRIVE_EXPORT_KEY);
}

export function useDriveAuth() {
  const location = useLocation();

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  async function startDriveAuth(viewerId?: string, options: StartDriveAuthOptions = {}) {
    if (!viewerId || viewerId === undefined) throw new Error("viewerId missing in URL");
    const returnTo = options.returnTo || location.pathname + location.search;

    // Fallbacks in case 'state' gets lost
    sessionStorage.setItem(OAUTH_VIEWER_ID_KEY, viewerId);
    sessionStorage.setItem(OAUTH_RETURN_TO_KEY, returnTo);

    const authUrl = await getAuthUrl(viewerId, returnTo, options.autoExport === true);
    window.location.href = authUrl; // go to Google
  }

  // Get OAuth URL from backend
  async function getAuthUrl(viewerId: string, returnTo: string, autoExport = false): Promise<string> {
    const endpoint = autoExport ? "/api/drive/auth-and-export-url" : "/api/drive/auth-url";

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ returnTo, viewerId }),
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
    const res = await fetch(`${baseUrl}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Logout failed");
  }

  return { startDriveAuth, logoutFromDrive };
}
