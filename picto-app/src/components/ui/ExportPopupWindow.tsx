import "@css/SettingsPopupWindow.css";

import { CircularProgress, } from "@mui/material"
import React, { useEffect, useState } from "react";
import { FaGoogleDrive } from "react-icons/fa";
import { IoFileTrayFull } from "react-icons/io5";
import { getExportService } from "@/utils/ExportFileUtils";
import { useDriveAuth } from "@/hooks/useDriveAuth";
import { getViewerItem } from "@/utils/storedImageData";
import { DriveAuthStatus, ExportDestination, HotspotData, } from "../../utils/Types";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";
import { MdClose, MdAdd } from "react-icons/md";
import DropSelector, { SelectorOption } from "./DropSelector";
import ErrorBanner from "../FeedbackBanner";


interface ExportPopupProps {
    isOpen: boolean;
    fileNameMaxLength?: number;
    setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
    viewerId?: string;
    titleState: {
        projectTitle: string,
        setProjectTitle: (e: React.ChangeEvent<HTMLInputElement>) => void,
        saveProjectTitleToDB: () => void
    }
    driveAuthStatus: DriveAuthStatus | null;
}

const ExportPopupWindow: React.FC<ExportPopupProps> = ({ isOpen, setIsPopupOpen, viewerId, titleState, driveAuthStatus, fileNameMaxLength = 50 }) => {
    const { projectTitle, setProjectTitle } = titleState;
    const { startDriveAuth, logoutFromDrive } = useDriveAuth();
    const driveService = getExportService(); // for file export
    const { setBannerMessage, bannerRef } = useFeedbackBanner();

    // Annotation type options with icons
    const exportOptions: SelectorOption[] = [
        { value: "picto", label: "Projet .picto" },
        { value: "raw", label: "Fichiers séparés" },
    ];

    const [exportFormat, setExportFormat] = useState("picto")
    const [isExporting, setIsExporting] = useState(false);
    const [exportStatus, setExportStatus] = useState<string>('');
    const [showWessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (exportStatus) {
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 5000);
        }
    }, [exportStatus])

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handlePopupClose();
        }
    };

    const handleAuthenticate = async () => {
        try {
            await startDriveAuth(viewerId);
        } catch (error) {
            setExportStatus(`Authentication failed: ${error}`);
            setBannerMessage({ message: "Authentication failed, try again", type: "failure" })
        }
    };

    const exportToDrive = async (imageBlob: Blob, annotations?: HotspotData[], fileName?: string) => {
        try {
            const result = await driveService.exportToGoogleDrive(
                imageBlob,
                annotations || [],
                exportFormat,
                {
                    fileName: fileName || "Untitled",
                    folderName: 'Picto360° ' + fileName + ' Annotations',
                    includeMetadata: true,
                },
            );

            if (result.success) {
                setExportStatus("Export successful! \n" + `View files: ${result.driveUrl}`);
                setBannerMessage({ message: "Exporté avec succes vers le drive", type: "success" })

            } else {
                setBannerMessage({ message: "Export échoué, essayez à nouveau", type: "failure" })
                // logoutFromDrive();
                // console.log(result.error);
                // throw new Error(result.error);
            }
        } catch (error) {
            setExportStatus(`Export failed: ${error}`);
        } finally {
            setIsExporting(false);
        }
    };

    const exportToDisk = async (imageBlob: Blob, annotations?: HotspotData[], fileName?: string) => {
        try {
            await driveService.exportFileToDisk(imageBlob,
                fileName || "Untitled",
                exportFormat,
                annotations && annotations?.length > 0 ? annotations : undefined,
            );
            setBannerMessage({ message: "Fichier exporté avec succès vers le disque", type: "success" })
        } catch (error) {
            setBannerMessage({ message: "Export n'a pas réussi, essaie à nouveau", type: "failure" })
            // bannerRef.current?.trigger(,"failure")

            setExportStatus(`Export failed: ${error}`);
        } finally {
            setIsExporting(false);

        }
    }

    const handleExportTo = async (destination: ExportDestination) => {
        // Get your app's current image and annotations
        if (!viewerId) return null;
        const viewerItem = await getViewerItem(viewerId);

        const imageBlob = viewerItem?.compressedBlob; 
        const annotations = viewerItem?.annotations;
        const fileName = viewerItem?.name || "Untitled";

        if (!imageBlob || imageBlob === undefined) {
            setBannerMessage({ message: "No image found, upload an image", type: "warning" })

            // bannerRef.current?.trigger("No image found, upload an image","warning")

            setExportStatus('Please select an image');
            return null;
        }

        setIsExporting(true);

        switch (destination) {
            case "drive":
                setExportStatus('Exporting to Google Drive...');
                await exportToDrive(imageBlob, annotations, fileName);
                break
            case "disk":
            default:
                setExportStatus('Exporting to Disk...');
                await exportToDisk(imageBlob, annotations, fileName);
        }
    }

    useEffect(() => {
        setIsPopupOpen(isExporting);

    }, [isExporting])

    if (!isOpen) return null;

    return (
        <div className={`settings-modal-backdrop ${isOpen ? 'settings-modal-backdrop--open' : ''}`} onClick={handleBackdropClick}>
             <ErrorBanner ref={bannerRef} />
            <div className={`settings-modal ${isOpen ? 'settings-modal--open' : ''}`}>
                <div className="settings-modal__header">
                    <h2 className="settings-modal__title">Exporter vers</h2>
                    <button className="settings-modal__close-button" onClick={handlePopupClose} aria-label="Fermer les paramètres">
                        <MdClose />
                    </button>
                </div>

                <div className="settings-modal__content">
                    <div className="popup-select-export_format">
                        <label className="settings-modal__label">
                            Type d'export
                        </label>
                        <DropSelector id="export-type" value={exportFormat} options={exportOptions} variant="default" onChange={setExportFormat}></DropSelector>
                    </div>

                    {/* File Name */}
                    <div className="settings-modal__section">
                        <label htmlFor="file-name" className="settings-modal__label">
                            Nom du fichier
                        </label>
                        <div className={`settings-modal__filename-wrapper ${exportFormat === "picto" ? "settings-modal__filename-wrapper--extension" : ""}`}>
                            <input id="file-name" className="settings-modal__input settings-modal__input--filename"
                                type="text"
                                value={projectTitle}
                                onChange={setProjectTitle}
                                placeholder="Entrez le nom du fichier"
                                maxLength={fileNameMaxLength}
                                onBlur={titleState.saveProjectTitleToDB}
                                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault(); // avoid submitting forms
                                        titleState.saveProjectTitleToDB()
                                        event.currentTarget.blur();
                                    }
                                }}
                            />
                            {exportFormat === "picto" && <code className="settings-modal__file-extension">.picto</code>}
                        </div>
                    </div>
                </div>
                {showWessage &&
                    <div className="popup-message">
                        <p className="popup-message-text">{exportStatus}</p>
                    </div>
                }
                <div className="settings-modal__footer" style={{ justifyContent: "space-between" }}>
                    <p style={{width: "100%"}} className="export-instruction">Choisissez une destination d'exportation :</p>
                    <button className="settings-modal__button settings-modal__button--secondary" onClick={handlePopupClose}>
                        Annuler
                    </button>
                    <div style={{flexGrow: 2, display: "flex", justifyContent: "flex-end", gap: "6px"}}>
                        <button type="button"
                            className="settings-modal__button settings-modal__button--primary"
                            onClick={async () => {
                                if (!driveAuthStatus?.isAuthenticated) await handleAuthenticate();
                                await handleExportTo("drive");
                                return;
                            }
                            }
                            disabled>
                            <FaGoogleDrive size={20} />
                            Google Drive
                        </button>
                        <button type="button" className="settings-modal__button settings-modal__button--primary" disabled={isExporting}
                            onClick={async () => {
                                await handleExportTo("disk");
                                setIsPopupOpen(false);
                            }}
                        >
                            <IoFileTrayFull size={20} />
                            {
                                isExporting ? <CircularProgress /> : "Ordinateur"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ExportPopupWindow);