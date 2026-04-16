import "@css/SettingsPopupWindow.css";

import React, { useState } from "react";
import { FaGoogleDrive } from "react-icons/fa";
import { IoFileTrayFull } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { getExportService } from "@/utils/ExportFileUtils";
import { savePendingDriveExport, useDriveAuth } from "@/hooks/useDriveAuth";
import { getViewerItem } from "@/utils/storedImageData";
import {
  DriveAuthStatus,
  ExportDestination,
  ExportFormat,
  HotspotData,
} from "../../utils/Types";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";
import DropSelector, { SelectorOption } from "./DropSelector";
import ErrorBanner from "../FeedbackBanner";

interface ExportPopupProps {
  isOpen: boolean;
  fileNameMaxLength?: number;
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  viewerId?: string;
  exportInProgress: boolean;
  onExportStart: (fileName?: string) => void;
  onExportSuccess: () => void;
  onExportFailure: (message?: string) => void;
  titleState: {
    projectTitle: string;
    setProjectTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    saveProjectTitleToDB: () => void;
  };
  driveAuthStatus: DriveAuthStatus | null;
}

// type ExportStatus = "idle" | "exporting" | "success" | "failure";

const ExportPopupWindow: React.FC<ExportPopupProps> = ({
  isOpen,
  setIsPopupOpen,
  viewerId,
  exportInProgress,
  onExportStart,
  onExportSuccess,
  onExportFailure,
  titleState,
  driveAuthStatus,
  fileNameMaxLength = 50,
}) => {
  const { projectTitle, setProjectTitle } = titleState;
  const { startDriveAuth } = useDriveAuth();
  const exportService = getExportService();
  const { setBannerMessage, bannerRef } = useFeedbackBanner();

  const exportOptions: SelectorOption[] = [
    { value: "picto", label: "Projet .picto" },
    { value: "raw", label: "Fichiers separes" },
  ];

  const [exportFormat, setExportFormat] = useState<ExportFormat>("picto");
<<<<<<< feat/export-with-images
  const [includeLocalFiles, setIncludeLocalFiles] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [, setExportStatus] = useState<ExportStatus>("idle");
=======
>>>>>>> main

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handlePopupClose();
    }
  };

  const handleAuthenticate = async () => {
    try {
      if (!viewerId) {
        throw new Error("viewerId missing in URL");
      }

      savePendingDriveExport({
        viewerId,
        format: exportFormat,
        fileName: projectTitle || "Untitled",
        folderName: `${projectTitle || "Untitled"} Annotations`,
        includeMetadata: true,
        includeLocalFiles,
      });

      await startDriveAuth(viewerId, { autoExport: true });
    } catch (_error) {
      setBannerMessage({ message: "Authentication failed, try again", type: "failure" });
    }
  };

  const exportToDrive = async (
    imageBlob: Blob,
    annotations?: HotspotData[],
    fileName?: string,
    assets?: NonNullable<Awaited<ReturnType<typeof getViewerItem>>>["assets"],
  ) => {
    try {
      const resolvedFileName = fileName || "Untitled";
      const result = await exportService.exportToGoogleDrive(
        imageBlob,
        annotations || [],
        exportFormat,
        {
          fileName: resolvedFileName,
          folderName: `Picto360 deg ${resolvedFileName} Annotations`,
          includeMetadata: true,
          includeLocalFiles,
        },
        assets,
      );

      if (result.success) {
        onExportSuccess();
        setBannerMessage({ message: "Exporte avec succes vers le drive", type: "success" });
      } else {
        const errorMessage = result.error || "Export failed";
        onExportFailure(errorMessage);
        setBannerMessage({ message: "Export echoue, essayez a nouveau", type: "failure" });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Export failed";
      onExportFailure(errorMessage);
    }
  };

  const exportToDisk = async (
    imageBlob: Blob,
    annotations?: HotspotData[],
    fileName?: string,
    assets?: NonNullable<Awaited<ReturnType<typeof getViewerItem>>>["assets"],
  ) => {
    try {
      await exportService.exportToDisk(
        imageBlob,
        fileName || "Untitled",
        exportFormat,
        annotations && annotations.length > 0 ? annotations : undefined,
        {
          includeLocalFiles,
        },
        assets,
      );
      onExportSuccess();
      setBannerMessage({ message: "Fichier exporte avec succes vers le disque", type: "success" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Export failed";
      onExportFailure(errorMessage);
      setBannerMessage({ message: "Export non reussi, essayez a nouveau", type: "failure" });
    }
  };

  const handleExportTo = async (destination: ExportDestination) => {
    if (!viewerId) {
      return null;
    }

    const viewerItem = await getViewerItem(viewerId);
    const imageBlob = viewerItem?.compressedBlob;
    const annotations = viewerItem?.annotations;
    const fileName = viewerItem?.name || "Untitled";
    const assets = viewerItem?.assets;

    if (!imageBlob) {
      setBannerMessage({ message: "No image found, upload an image", type: "warning" });
      return null;
    }

    onExportStart(fileName);
    setIsPopupOpen(false);

    switch (destination) {
      case "drive":
<<<<<<< feat/export-with-images
        setExportStatus("exporting");
        // onDriveExportStart(fileName);
        setIsPopupOpen(false);
        await exportToDrive(imageBlob, annotations, fileName, assets);
        break;
      case "disk":
      default:
        setExportStatus("exporting");
        await exportToDisk(imageBlob, annotations, fileName, assets);
=======
        await exportToDrive(imageBlob, annotations, fileName);
        break;
      case "disk":
      default:
        await exportToDisk(imageBlob, annotations, fileName);
        break;
>>>>>>> main
    }

    return null;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`settings-modal-backdrop ${isOpen ? "settings-modal-backdrop--open" : ""}`}
      onClick={handleBackdropClick}
    >
      <ErrorBanner ref={bannerRef} />
      <div className={`settings-modal ${isOpen ? "settings-modal--open" : ""}`}>
        <div className="settings-modal__header">
          <h2 className="settings-modal__title">Exporter vers</h2>
          <button
            className="settings-modal__close-button"
            onClick={handlePopupClose}
            aria-label="Fermer les parametres"
          >
            <MdClose />
          </button>
        </div>

        <div className="settings-modal__content">
          <div className="popup-select-export_format">
            <label className="settings-modal__label">Type d'export</label>
            <DropSelector
              id="export-type"
              value={exportFormat}
              options={exportOptions}
              variant="default"
              onChange={setExportFormat}
            />
          </div>

          <div className="settings-modal__section">
            <label htmlFor="file-name" className="settings-modal__label">
              Nom du fichier
            </label>
            <div
              className={`settings-modal__filename-wrapper ${
                exportFormat === "picto" ? "settings-modal__filename-wrapper--extension" : ""
              }`}
            >
              <input
                id="file-name"
                className="settings-modal__input settings-modal__input--filename"
                type="text"
                value={projectTitle}
                onChange={setProjectTitle}
                placeholder="Entrez le nom du fichier"
                maxLength={fileNameMaxLength}
                onBlur={titleState.saveProjectTitleToDB}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    titleState.saveProjectTitleToDB();
                    event.currentTarget.blur();
                  }
                }}
              />
              {exportFormat === "picto" && (
                <code className="settings-modal__file-extension">.picto</code>
              )}
            </div>
          </div>
          {exportFormat === "picto" && (
            <div className="settings-modal__section_horizontal">
              <input
                id="include-local-files"
                type="checkbox"
                checked={includeLocalFiles}
                onChange={(event) => setIncludeLocalFiles(event.target.checked)}
                className="settings-modal__checkbox"
              />
              <label htmlFor="include-local-files" className="settings-modal__label">
                Inclure les fichiers locaux intégrés
              </label>
            </div>
          )}
        </div>

        <div className="settings-modal__footer" style={{ justifyContent: "space-between" }}>
          <p style={{ width: "100%" }} className="export-instruction">
            Choisissez une destination d'exportation :
          </p>
          <button
            className="settings-modal__button settings-modal__button--secondary"
            onClick={handlePopupClose}
          >
            Annuler
          </button>
          <div style={{ flexGrow: 2, display: "flex", justifyContent: "flex-end", gap: "6px" }}>
            <button
              type="button"
              className="settings-modal__button settings-modal__button--primary"
              onClick={async () => {
                if (exportInProgress) {
                  return;
                 }

                if (!driveAuthStatus?.isAuthenticated) {
                  await handleAuthenticate();
                  return;
                }

                await handleExportTo("drive");
              }}
              disabled={exportInProgress}
            >
              <FaGoogleDrive size={20} />
              Google Drive
            </button>

            <button
              type="button"
              className="settings-modal__button settings-modal__button--primary"
              disabled={exportInProgress}
              onClick={async () => {
                await handleExportTo("disk");
                setIsPopupOpen(false);
              }}
            >
              <IoFileTrayFull size={20} />
              Ordinateur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExportPopupWindow);
