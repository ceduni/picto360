import "./css/Toolbar.css";
import logo from "/images/logo_picto360.png";

import React, { useState, useEffect, useCallback } from "react";
import { MdSettings, MdOutlineFileDownload, MdLogout, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ToggleSwitch from "./ui/ToggleSwitch";
import ExportPopupWindow from "./ui/ExportPopupWindow";
import SharePopupWindow from "./ui/SharePopupWindow";
import SettingsPopupWindow from "./ui/SettingsPopupWindow";
import { useDriveAuth } from "@/hooks/useDriveAuth";
import { DriveAuthStatus } from "@/utils/Types";
import { getViewerItem, putViewerItem } from "@/utils/storedImageData";
import { IoMdTrash } from "react-icons/io";

interface ToolbarProps {
    isEditMode: boolean;
    toggleEditMode: () => void;
    viewerId?: string;
    driveAuthStatus: DriveAuthStatus | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ isEditMode, toggleEditMode, viewerId, driveAuthStatus }) => {

    const [projectTitle, setProjectTitle] = useState("Untitled");
    const [isSaved, setIsSaved] = useState(false);
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [showExportOptions, setShowExportOptions] = useState(false);
    const [showSettingsOptions, setShowSettingsOptions] = useState(false);

    const { logoutFromDrive } = useDriveAuth()

    // Change the project title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;

        setProjectTitle(newTitle);
    };

    const handleSave = useCallback(() => {
        if (isEditMode) {
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 1500);
        }
    }, [isEditMode]);

    const handleToggleEditMode = useCallback(() => {
        toggleEditMode();
    }, [toggleEditMode]);

    const getViewerFromDB = async () => {
        if (viewerId === "null" || !viewerId) {
            navigate("/", { replace: true });
            return;
        }

        const viewerItem = await getViewerItem(viewerId);

        const name = viewerItem?.name;
        if (name) {
            setProjectTitle(name)
        };
    }

    const saveProjectTitleToDB = async () => {
        if (viewerId === "null" || !viewerId) {
            return;
        }

        await putViewerItem(viewerId, projectTitle);
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "s") {
                event.preventDefault();
                if (isEditMode) {
                    handleSave();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleSave, isEditMode]);

    const navigate = useNavigate();
    const redirectHomePage = useCallback(() => navigate('/'), [])

    return (
        <div className={`toolbar-container toolbar-container--${isEditMode ? "edit-mode" : "preview-mode"}`} onLoad={getViewerFromDB}>
            <div className="toolbar">
                <div className="toolbar__left">
                    <img src={logo} alt="Picto 360 logo" className="toolbar__logo" onClick={redirectHomePage} />

                    <div className="toolbar__title-container">
                        <span className="toolbar__title-value">{projectTitle}</span>
                        <span className="toolbar__title-extension">.picto</span>
                    </div>

                    <button className="toolbar__icon-button has-helper" title="Paramètres du projet" onClick={() => { setShowSettingsOptions(true) }}>
                        <MdSettings className="toolbar__settings-icon" />
                        <span className="helper">Paramètres du projet</span>
                    </button>

                    <button className="toolbar__icon-button has-helper" onClick={() => { setShowExportOptions(true) }} title="Exporter">
                        <MdOutlineFileDownload className="toolbar__export-icon" />
                        <span className="helper">Exporter le projet</span>
                    </button>
                </div>

                <div className="toolbar__right">
                    {/* <button className="toolbar__icon-button has-helper" onClick={() => { setShowExportOptions(true) }} title="Exporter">
                        <IoMdTrash className="toolbar__export-icon" />
                        <span className="helper">Supprimer toutes les annotations</span>
                    </button> */}

                    <div className="toolbar__mode-switcher">
                        <ToggleSwitch id="edit-mode" checked={isEditMode} onChange={handleToggleEditMode} variant="icon" checkedIcon={<MdEdit />} uncheckedIcon={<MdRemoveRedEye />} />
                        <span onClick={toggleEditMode} className="toolbar__mode-switcher__label">{(isEditMode ? "Mode annotation" : "Mode visualisation")}</span>
                    </div>

                    {/* <button
                  onClick={!isSaved ? handleSave : undefined}
                  className="toolbar__icon-button"
                  disabled={!isEditMode}
                  title={isEditMode && !isSaved ? "Sauvegarder" : ""}
                >
                  {isSaved ? (
                    <MdCheck className="toolbar__check-icon" />
                  ) : (
                    <MdSaveAlt className="toolbar__save-icon" />
                  )}
                </button> */}


                    {/* <button onClick={()=>{ setShowShareOptions(true)}} className="toolbar__icon-button" title="Partager">
                <MdShare />
              </button> */}

                    {
                        driveAuthStatus?.isAuthenticated &&
                        <button className="toolbar__icon-button" onClick={async () => { await logoutFromDrive(); }} title="Déconnexion">
                            <MdLogout />
                        </button>
                    }
                </div>
            </div>

            {/* Share Options Modal */}
            <SharePopupWindow isOpen={showShareOptions} setIsPopupOpen={setShowShareOptions} />
            <ExportPopupWindow isOpen={showExportOptions} setIsPopupOpen={setShowExportOptions}
                viewerId={viewerId} driveAuthStatus={driveAuthStatus}
                titleState={{ projectTitle, setProjectTitle: handleTitleChange, saveProjectTitleToDB }} />
            <SettingsPopupWindow isOpen={showSettingsOptions} setIsPopupOpen={setShowSettingsOptions}
                state={{ fileName: projectTitle, setFileName: (e) => { setProjectTitle(e.target.value) } }} />
        </div>
    );
};

export default React.memo(Toolbar);