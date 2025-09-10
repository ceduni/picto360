import {CircularProgress, Fade, IconButton, Modal } from "@mui/material"
import {
  Cancel as CancelIcon,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "@components/css/ExportPopupWindow.css"
import { FaGoogleDrive } from "react-icons/fa";
import { IoFileTrayFull } from "react-icons/io5";
import { getExportService } from "@/utils/ExportFileUtils";
import { useDriveAuth } from "@/hooks/useDriveAuth";
import { getViewerItem } from "@/utils/storedImageData";
import { DriveAuthStatus, 
        ExportDestination, 
        ExportFormat, 
        HotspotData,
} from "../../utils/Types";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";
import ErrorBanner from "../FeedbackBanner";



interface ExportPopupProps {
    isOpen:boolean;
    setIsPopupOpen:React.Dispatch<React.SetStateAction<boolean>>;
    viewerId?:string;
    titleState:{
        projectTitle:string,
        setProjectTitle: (e:React.ChangeEvent<HTMLInputElement>)=>void,
        saveProjectTitleToDB:()=>void
    }
    driveAuthStatus:DriveAuthStatus|null;

}

const ExportPopupWindow: React.FC<ExportPopupProps> = ({ isOpen, setIsPopupOpen, viewerId, titleState,driveAuthStatus}) => {
    const { startDriveAuth,logoutFromDrive } = useDriveAuth();
    const driveService = getExportService(); // for file export
    const { setBannerMessage,bannerRef } = useFeedbackBanner();

    const [exportFormat,setExportFormat] = useState<ExportFormat>("picto")
    const [isExporting, setIsExporting] = useState(false);
    const [exportStatus, setExportStatus] = useState<string>('');
    const [showWessage,setShowMessage] = useState(false);

    const handlePopupClose = () =>{
        setIsPopupOpen(false);
    }

    // useEffect(()=>{
    //       console.log("Auth status:" ,authStatus)
    // })

    useEffect(()=>{
        if (exportStatus) {
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 5000);
        }
    },[exportStatus])

    const handleSelectFormat = (select : HTMLSelectElement)=>{
        if(!select.value) return;
        setExportFormat(select.value as "picto"|"raw");
        setBannerMessage({message:"Format sélectionné",type:"success"})
    }

    const handleAuthenticate = async () => {
        try {
            await startDriveAuth(viewerId);
        } catch (error) {
            setExportStatus(`Authentication failed: ${error}`);
            setBannerMessage({message:"Authentication failed, try again",type:"failure"})
        }
    };

    const exportToDrive = async (imageBlob:Blob,annotations?:HotspotData[],fileName?:string) => {
        try {
            const result = await driveService.exportToGoogleDrive(
                imageBlob,
                annotations || [],
                exportFormat ,
                {
                    fileName: fileName || "Untitled",
                    folderName: 'Picto360° '+ fileName +' Annotations',
                    includeMetadata: true,
                },
            );

            if (result.success) {
                setExportStatus("Export successful! \n"  +`View files: ${result.driveUrl}`);
                setBannerMessage({message:"Exporté avec succes vers le drive",type:"success"})            

            } else {
                setBannerMessage({message:"Export échoué, essayez à nouveau",type:"failure"})
                logoutFromDrive();
                // console.log(result.error);
                // throw new Error(result.error);
            }
        } catch (error) {
            setExportStatus(`Export failed: ${error}`);
        } finally {
            setIsExporting(false);
        }
    };

    const exportToDisk = async(imageBlob:Blob,annotations?:HotspotData[],fileName?:string)=>{
        try{            
            await driveService.exportFileToDisk(imageBlob,  
                                                fileName || "Untitled",  
                                                exportFormat,
                                                annotations && annotations?.length>0 ? annotations: undefined,                                                
                                    );
            setBannerMessage({message:"Exporté avec succes vers le disk",type:"success"})            
        } catch (error) {
            setBannerMessage({message:"Export failed, try again",type:"failure"})            
            // bannerRef.current?.trigger(,"failure")

            setExportStatus(`Export failed: ${error}`);
        } finally {
            setIsExporting(false);

        }        
    }

    const handleExportTo  = async(destination:ExportDestination)=>{
        // Get your app's current image and annotations
        if (!viewerId) return null;
        const viewerItem = await getViewerItem(viewerId);

        const imageBlob = viewerItem?.blob; 
        const annotations = viewerItem?.annotations;
        const fileName = viewerItem?.name || "Untitled";
                        
        if (!imageBlob || imageBlob === undefined) {
            setBannerMessage({message:"No image found, upload an image",type:"warning"})            

            // bannerRef.current?.trigger("No image found, upload an image","warning")

            setExportStatus('Please select an image');
            return null;
        }

        setIsExporting(true);

        switch(destination){
            case "drive":
                setExportStatus('Exporting to Google Drive...');
                await exportToDrive(imageBlob,annotations,fileName);
                break
            case "disk":
            default:
                setExportStatus('Exporting to Disk...');
                await exportToDisk(imageBlob,annotations,fileName);                
        }
    }

    useEffect(()=>{
        setIsPopupOpen(isExporting);
        
    },[isExporting])

    
    return (
        <div>
            <ErrorBanner ref={bannerRef} />
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
                        Exporter vers
                    </p>

                    <IconButton onClick={handlePopupClose}>
                        <CancelIcon sx={{ color: "#282828", "&:hover": { color: "red" } }} />
                    </IconButton>
                </div>
                <div className="popup-export-content">
                    <div className="popup-select-export_format">
                        <p>Type d'export </p>
                        <select title="Exporter sous" value={exportFormat} onChange={(e)=>handleSelectFormat(e.currentTarget)}>
                            <option value="picto">.picto</option>
                            <option value="raw">Fichiers séparés</option>
                        </select>   
                    </div>

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
                        <p>{exportFormat==="picto"?".picto":""}</p>
                    </div>


                    { showWessage &&
                        <div className="popup-message">
                            <p className="popup-message-text">{exportStatus}</p>
                        </div>
                    }
                    <div className="export_options">
                        <button type="button" 
                                className="export-single_options" 
                                onClick={async()=>
                                    {
                                        if(!driveAuthStatus?.isAuthenticated) await handleAuthenticate();
                                        await handleExportTo("drive");
                                        return;
                                    }
                                }
                                disabled={isExporting}>
                            <FaGoogleDrive size={20}/>
                            <p>
                            {
                                driveAuthStatus?.isAuthenticated?
                                "Google Drive"
                                :
                                "Login"
                            }
                                
                            </p>
                        </button>
                        <button type="button" 
                                className="export-single_options"
                                disabled={isExporting}
                                onClick={async ()=>{
                                    await handleExportTo("disk");
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
            </div>
            </Fade>
        </Modal>
        </div>
    )
}    

export default React.memo(ExportPopupWindow);