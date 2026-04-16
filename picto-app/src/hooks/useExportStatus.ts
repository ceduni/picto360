import { UploadProgress,ExportStatusEvent,ExportErrorEvent,UploadCompleteEvent } from "@/utils/Types";
import { useEffect, useState } from "react";


export function useExportStatus() {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [exportStatus, setExportStatus] = useState<ExportStatusEvent | null>(null);
  const [exportError, setExportError] = useState<ExportErrorEvent | null>(null);
  const [uploadComplete, setUploadComplete] = useState<UploadCompleteEvent | null>(null);

    useEffect(() => {

    }, [exportStatus, uploadProgress, exportError, uploadComplete]);

  return {
    uploadProgress,
    exportStatus,
    exportError,
    uploadComplete,
    setExportStatus, setUploadProgress, setExportError, setUploadComplete
};

}