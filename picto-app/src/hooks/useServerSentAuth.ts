import {
  DriveAuthStatus,
  ExportErrorEvent,
  ExportStatusEvent,
  UploadCompleteEvent,
  UploadProgress,
} from "@/utils/Types";
import { useEffect, useState } from "react";

export function useServerSentAuth() {
  const [driveAuthStatus, setAuthStatus] = useState<DriveAuthStatus | null>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [exportStatus, setExportStatus] = useState<ExportStatusEvent | null>(null);
  const [exportError, setExportError] = useState<ExportErrorEvent | null>(null);
  const [uploadComplete, setUploadComplete] = useState<UploadCompleteEvent | null>(null);
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  async function getDriveAuthStatus() {
    try {
      const result = await fetch(`${baseUrl}/api/auth/status`, { credentials: "include" });
      const data = await result.json() as DriveAuthStatus;

      if ((!result.ok || !data.isAuthenticated)) {
        return null;
      }

      return data;
    } catch (_err) {
      return null;
    }
  }

  useEffect(() => {
    let es: EventSource | null = null;
    let canceled = false;

    getDriveAuthStatus().then((status) => {
      if (!canceled) {
        setAuthStatus(status);
      }
    });

    es = new EventSource(`${baseUrl}/api/auth/stream`, { withCredentials: true });

    es.addEventListener("auth-status", (evt) => {
      if (!canceled) {
        const next = JSON.parse((evt as MessageEvent).data) as DriveAuthStatus;
        setAuthStatus(next);
      }
    });

    es.addEventListener("export-status", (evt) => {
      const data = JSON.parse((evt as MessageEvent).data) as ExportStatusEvent;
      setExportError(null);
      setExportStatus(data);
    });

    es.addEventListener("upload-progress", (evt) => {
      const data = JSON.parse((evt as MessageEvent).data) as UploadProgress;
      setExportError(null);
      setUploadComplete(null);
      setUploadProgress(data);
      console.log(`Progress for ${data.file}: ${data.percent}%`);
    });

    es.addEventListener("upload-complete", (evt) => {
      const data = JSON.parse((evt as MessageEvent).data) as UploadCompleteEvent;
      setUploadComplete(data);
    });

    es.addEventListener("export-error", (evt) => {
      const data = JSON.parse((evt as MessageEvent).data) as ExportErrorEvent;
      setExportError(data);
      setUploadProgress(null);
    });

    return () => {
      canceled = true;
      if (es) {
        es.close();
      }
    };
  }, []);

  return { driveAuthStatus, uploadProgress, exportStatus, exportError, uploadComplete };
}
