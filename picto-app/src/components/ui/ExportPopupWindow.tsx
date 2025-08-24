import { Box, CircularProgress, Fade, IconButton, Modal, Typography } from "@mui/material"
import {
  Cancel as CancelIcon,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "@components/css/ExportPopupWindow.css"
import { FaGoogleDrive } from "react-icons/fa";
import { IoFileTrayFull } from "react-icons/io5";
import { getExportService } from "@/utils/ExportFileUtils";
import { useDriveAuth } from "@/hooks/useDriveAuth";
import { PiExportBold } from "react-icons/pi";
import { getViewerItem } from "@/utils/storedImageData";

interface ExportPopupProps {
    isOpen:boolean;
    setIsPopupOpen:React.Dispatch<React.SetStateAction<boolean>>;
    viewerId?:string;
    authStatus:string|null;
    titleState:{
        projectTitle:string,
        setProjectTitle: (e:React.ChangeEvent<HTMLInputElement>)=>void,
        saveProjectTitleToDB:()=>void
    }
}

const ExportPopupWindow: React.FC<ExportPopupProps> = ({ isOpen, setIsPopupOpen, viewerId, authStatus, titleState}) => {
    const { startDriveAuth } = useDriveAuth();
    const driveService = getExportService(); // for file export

    const [exportFormat,setExportFormat] = useState<"picto" | "separated">("picto")
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [exportStatus, setExportStatus] = useState<string>('');
    const [showWessage,setShowMessage] = useState(false);

    const handlePopupClose = () =>{
        setIsPopupOpen(false);
    }

    // check the dive auth status
    useEffect(()=>{
        setIsAuthenticated(false);
        
        if(!authStatus) {
            return;
        };
        
        console.log("Auth status:",authStatus)
        
        if(authStatus==="success"){
            setIsAuthenticated(true);
            setIsPopupOpen(true);
        }
    },[authStatus]);

    useEffect(()=>{
        if (exportStatus) {
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 5000);
        }
    },[exportStatus])

    const handleSelectFormat = (select : HTMLSelectElement)=>{
        if(!select.value) return;
        setExportFormat(select.value as "picto"|"separated");
    }


    const handleAuthenticate = async () => {
        try {
            await startDriveAuth(viewerId);
        } catch (error) {
            setExportStatus(`Authentication failed: ${error}`);
            console.log("Authentification Failed:",error)
        }
    };

    const handleExportToDrive = async () => {
        // Get your app's current image and annotations
        if (!viewerId) return null;
        const viewerItem = await getViewerItem(viewerId);

        const imageBlob = viewerItem?.blob; 
        const annotations = viewerItem?.annotations;
        const fileName = viewerItem?.name;
                        
        if (!imageBlob || imageBlob === undefined) {
            setExportStatus('Please select an image and add annotations');
            console.log(exportStatus);
            return null;
        }


        setIsExporting(true);
        setExportStatus('Exporting to Google Drive...');

        try {
            const result = await driveService.exportToGoogleDrive(
                imageBlob,
                annotations || [],
                {
                    imageName: fileName,
                    folderName: 'Picto360° '+ fileName +' Annotations',
                    includeMetadata: true
                },
                // format: exportFormat
            );

            if (result.success) {
                setExportStatus("Export successful! \n"  +`View files: ${result.driveUrl}`);
            } else {
                const {logoutFromDrive} = useDriveAuth();
                logoutFromDrive();
                console.log(result.error);
                throw new Error(result.error);
            }
        } catch (error) {
            
            setExportStatus(`Export failed: ${error}`);
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportToDisk = async()=>{
        // Get your app's current image and annotations
        if (!viewerId) return null;
        const viewerItem = await getViewerItem(viewerId);

        const imageBlob = viewerItem?.blob; 
        const annotations = viewerItem?.annotations;
        const fileName = viewerItem?.name || "Untitled";
                        
        if (!imageBlob || imageBlob === undefined) {
            setExportStatus('Please select an image');
            console.log(exportStatus);
            return null;
        }


        setIsExporting(true);
        setExportStatus('Exporting to Disk...');
        console.log("Exporting to Disk...");

        try{
            await driveService.exportFileToDisk(imageBlob,  
                                                fileName,  
                                                exportFormat,
                                                annotations && annotations?.length>0 ? annotations: undefined,                                                
                                    );
            setTimeout(()=>{},1000)

        } catch (error) {
            setExportStatus(`Export failed: ${error}`);
        } finally {
            setIsExporting(false);
        }        
    }

    
    return (
        <Modal open={isOpen} onClose={handlePopupClose} closeAfterTransition >
            <Fade in={isOpen}>
            <div className="popup-export-content"
                style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "white",
                padding: "16px",
                borderRadius: "8px",
                outline: "none",       // remove focus ring
                alignContent:"center",
                width:400,
            }}>
                <div className="popup_window-header">
                    <p className="popup_window-title">
                        {isAuthenticated ? 
                        "Confirmer l'export"
                        :
                        "Exporter vers"
                        }
                    </p>

                    <IconButton onClick={handlePopupClose}>
                        <CancelIcon sx={{ color: "#282828", "&:hover": { color: "red" } }} />
                    </IconButton>
                </div>
                {isAuthenticated ?
                <div className="popup-export-main-content">
                    <div className="popup-field-container">
                        <input type="text" 
                                maxLength={20}
                                value={titleState.projectTitle}
                                onChange={(e)=>{titleState.setProjectTitle(e)}}
                                placeholder="Titre du fichier" 
                                className="popup-text-field"
                                onBlur={titleState.saveProjectTitleToDB}
                                onKeyDown={(event:React.KeyboardEvent<HTMLInputElement>)=>{
                                    if(event.key==="Enter"){
                                        event.preventDefault(); // avoid submitting forms
                                        titleState.saveProjectTitleToDB()
                                        event.currentTarget.blur();                                        
                                    }
                                    }
                                }
                                />
                        <p>.picto</p>
                    </div>
                    { showWessage &&
                        <div className="popup-message">
                            <p className="popup-message-text">{exportStatus}</p>
                        </div>
                    }
                    <div className="export_options">
                        <button type="button" 
                                className="export-single_options" 
                                onClick={async ()=>{
                                    await handleExportToDrive();
                                    setIsPopupOpen(false);
                                }}
                                disabled= {isExporting}>
                                <PiExportBold size={20}/>
                            {
                                isExporting ?
                                <CircularProgress/>
                                :
                                <p>Exporter</p>                                
                            }

                        </button>
                        <div  >

                        </div>
                    </div>
                </div>                    
                :
                <div className="popup-export-content">
                    <div className="popup-select-export_format">

                        <p>Type d'export </p>
                        <select title="export_format" name="formats" id="format-select" onSelect={(e)=>handleSelectFormat(e.currentTarget)}>
                            <option selected value="picto">.picto</option>
                            <option value="separated">Fichiers séparés</option>
                        </select>

                    </div>
                    { showWessage &&
                        <div className="popup-message">
                            <p className="popup-message-text">{exportStatus}</p>
                        </div>
                    }
                    <div className="export_options">
                        <button type="button" 
                                className="export-single_options" 
                                onClick={handleAuthenticate}
                                disabled={isExporting}>
                            <FaGoogleDrive size={20}/>
                            <p>Google Drive</p>
                        </button>
                        <button type="button" 
                                className="export-single_options"
                                disabled={isExporting}
                                onClick={async ()=>{
                                    await handleExportToDisk();
                                    setIsPopupOpen(false);
                                }}                                
                                >
                            <IoFileTrayFull size={20}/>
                            {
                                isExporting ?
                                <CircularProgress/>
                                :
                                <p>Ordinateur</p>
                            }                            
                        </button>
                    </div>
                </div>
                }
            </div>
            </Fade>
        </Modal>
    )
}    

export default React.memo(ExportPopupWindow);