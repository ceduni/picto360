import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";
import {
  clearPendingDriveExport,
  getPendingDriveExport,
} from "@/hooks/useDriveAuth";
import { getExportService } from "@/utils/ExportFileUtils";
import { DriveAuthStatus } from "@/utils/Types";
import { getViewerItem } from "@/utils/storedImageData";

interface UseAutoDriveExportParams {
  viewerId?: string;
  driveAuthStatus: DriveAuthStatus | null;
  onDriveExportStart?: (fileName?: string) => void;
  onDriveExportSuccess?: () => void;
  onDriveExportFailure?: (message?: string) => void;
}

const AUTO_EXPORT_QUERY_KEY = "autoExport";
const AUTO_EXPORT_DESTINATION = "drive";
const DRIVE_AUTH_QUERY_KEY = "driveAuth";
const MESSAGE_QUERY_KEY = "message";
const VIEWER_ID_QUERY_KEY = "viewerId";

export function useAutoDriveExport({
  viewerId,
  driveAuthStatus,
  onDriveExportStart,
  onDriveExportSuccess,
  onDriveExportFailure,
}: UseAutoDriveExportParams) {
  const [isHandlingAutoExport, setIsHandlingAutoExport] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const driveService = useMemo(() => getExportService(), []);
  const { bannerRef, setBannerMessage } = useFeedbackBanner();

  const clearOAuthSearchParams = useCallback(() => {
    const params = new URLSearchParams(location.search);
    params.delete(AUTO_EXPORT_QUERY_KEY);
    params.delete(DRIVE_AUTH_QUERY_KEY);
    params.delete(MESSAGE_QUERY_KEY);
    params.delete(VIEWER_ID_QUERY_KEY);

    const search = params.toString();
    navigate(
      {
        pathname: location.pathname,
        search: search ? `?${search}` : "",
        hash: location.hash,
      },
      { replace: true },
    );
  }, [location.hash, location.pathname, location.search, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const autoExport = params.get(AUTO_EXPORT_QUERY_KEY);
    const driveAuth = params.get(DRIVE_AUTH_QUERY_KEY);
    const message = params.get(MESSAGE_QUERY_KEY);
    const targetViewerId = viewerId;

    if (autoExport !== AUTO_EXPORT_DESTINATION || !driveAuth) {
      return;
    }

    if (driveAuth === "error") {
      clearPendingDriveExport();
      setBannerMessage({
        message: message || "Authentication failed, try again",
        type: "failure",
      });
      clearOAuthSearchParams();
      return;
    }

    if (
      driveAuth !== "success" ||
      !viewerId ||
      viewerId !== targetViewerId ||
      !driveAuthStatus?.isAuthenticated ||
      isHandlingAutoExport
    ) {
      return;
    }

    let isCancelled = false;

    const runAutoExport = async () => {
      setIsHandlingAutoExport(true);

      try {
        const pendingExport = getPendingDriveExport();

        if (!pendingExport || pendingExport.viewerId !== viewerId) {
          throw new Error("Pending Drive export was not found");
        }

        const viewerItem = await getViewerItem(viewerId);
        const imageBlob = viewerItem?.compressedBlob;

        if (!imageBlob) {
          throw new Error("No image found for automatic export");
        }

        const annotations = viewerItem?.annotations || [];
        const assets = viewerItem?.assets;
        const resolvedFileName = pendingExport.fileName || viewerItem?.name || "Untitled";

        onDriveExportStart?.(resolvedFileName);

        const result = await driveService.exportToGoogleDrive(
          imageBlob,
          annotations,
          pendingExport.format,
          {
            fileName: resolvedFileName,
            folderName:
              pendingExport.folderName ||
              `Picto360 ${resolvedFileName} Annotations`,
            includeMetadata: pendingExport.includeMetadata ?? true,
            includeLocalFiles: pendingExport.includeLocalFiles ?? false,
          },
          assets,
        );

        if (!isCancelled) {
          if (result.success) {
            onDriveExportSuccess?.();
            setBannerMessage({
              message: "Exported successfully to Google Drive",
              type: "success",
            });
          } else {
            throw new Error(result.error || "Automatic export failed");
          }
        }
      } catch (error) {
        if (!isCancelled) {
          onDriveExportFailure?.(
            error instanceof Error
              ? error.message
              : "Automatic export failed",
          );
          setBannerMessage({
            message:
              error instanceof Error
                ? error.message
                : "Automatic export failed",
            type: "failure",
          });
        }
      } finally {
        clearPendingDriveExport();
        if (!isCancelled) {
          clearOAuthSearchParams();
          setIsHandlingAutoExport(false);
        }
      }
    };

    void runAutoExport();

    return () => {
      isCancelled = true;
    };
  }, [
    clearOAuthSearchParams,
    driveAuthStatus?.isAuthenticated,
    driveService,
    isHandlingAutoExport,
    location.search,
    setBannerMessage,
    viewerId,
    onDriveExportFailure,
    onDriveExportStart,
    onDriveExportSuccess,
  ]);

  return { bannerRef, isHandlingAutoExport };
}
