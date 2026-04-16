import {
  ExportProgressState,
  ExportErrorEvent,
  ExportStatusEvent,
  UploadCompleteEvent,
  UploadProgress,
} from "@/utils/Types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface UseExportProgressParams {
  uploadProgress: UploadProgress | null;
  exportStatus: ExportStatusEvent | null;
  exportError: ExportErrorEvent | null;
  uploadComplete: UploadCompleteEvent | null;
}

const SUCCESS_CLOSE_DELAY_MS = 1600;

const idleState: ExportProgressState = {
  isOpen: false,
  isActive: false,
  phase: "idle",
  title: "Export to Google Drive",
  detail: "",
  progressPercent: null,
};

export function useExportProgress({
  uploadProgress,
  exportStatus,
  exportError,
  uploadComplete,
}: UseExportProgressParams) {
  const [progressState, setProgressState] = useState<ExportProgressState>(idleState);
  const closeTimerRef = useRef<number | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const startDriveExport = useCallback((fileName?: string) => {
    clearCloseTimer();
    setProgressState({
      isOpen: true,
      isActive: true,
      phase: "preparing",
      title: "Export to Google Drive",
      detail: "Preparing files and contacting the export service...",
      progressPercent: 0,
      fileName,
    });
  }, [clearCloseTimer]);

  const markDriveExportSuccess = useCallback(() => {
    clearCloseTimer();
    setProgressState((current) => ({
      ...current,
      isOpen: true,
      isActive: false,
      phase: "success",
      title: "Export complete",
      detail: "Your file was exported successfully to Google Drive.",
      progressPercent: 100,
      error: undefined,
    }));

    closeTimerRef.current = window.setTimeout(() => {
      setProgressState(idleState);
      closeTimerRef.current = null;
    }, SUCCESS_CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const markDriveExportFailure = useCallback((message?: string) => {
    clearCloseTimer();
    setProgressState((current) => ({
      ...current,
      isOpen: true,
      isActive: false,
      phase: "failure",
      title: "Export failed",
      detail: message || "The export could not be completed.",
      error: message || "The export could not be completed.",
    }));
  }, [clearCloseTimer]);

  const closeProgressPopup = useCallback(() => {
    setProgressState((current) => {
      if (current.isActive) {
        return current;
      }

      clearCloseTimer();
      return idleState;
    });
  }, [clearCloseTimer]);

  useEffect(() => {
    if (!exportStatus) {
      return;
    }

    if (exportStatus.status === "folder_created") {
      setProgressState((current) => ({
        ...current,
        isOpen: true,
        isActive: true,
        phase: "folder_created",
        title: "Export to Google Drive",
        detail: exportStatus.folderName
          ? `Folder "${exportStatus.folderName}" created. Starting upload...`
          : "Google Drive folder created. Starting upload...",
        folderName: exportStatus.folderName,
        error: undefined,
      }));
    }
  }, [exportStatus]);

  useEffect(() => {
    if (!uploadProgress) {
      return;
    }

    const nextPercent = Number.parseFloat(uploadProgress.percent);

    setProgressState((current) => ({
      ...current,
      isOpen: true,
      isActive: true,
      phase: "uploading",
      title: "Uploading to Google Drive",
      detail: `Uploading ${uploadProgress.file}...`,
      fileName: uploadProgress.file,
      progressPercent: Number.isNaN(nextPercent) ? current.progressPercent : nextPercent,
      error: undefined,
    }));
  }, [uploadProgress]);

  useEffect(() => {
    if (!uploadComplete) {
      return;
    }

    // ✅ Show finalizing state (SSE sent before HTTP response completes)
    // Will transition to success when HTTP response returns
    setProgressState((current) => ({
      ...current,
      isOpen: true,
      isActive: true,
      phase: "finalizing",
      title: "Finalizing export",
      detail: "Upload completed. Finalizing Google Drive export...",
      progressPercent: 100,
      error: undefined,
    }));
  }, [uploadComplete]);

  useEffect(() => {
    if (!exportError) {
      return;
    }

    markDriveExportFailure(exportError.error);
  }, [exportError, markDriveExportFailure]);

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  return useMemo(() => ({
    progressState,
    startDriveExport,
    markDriveExportSuccess,
    markDriveExportFailure,
    closeProgressPopup,
  }), [
    closeProgressPopup,
    markDriveExportFailure,
    markDriveExportSuccess,
    progressState,
    startDriveExport,
  ]);
}
