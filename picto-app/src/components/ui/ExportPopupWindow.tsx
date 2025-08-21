import { Box, Fade, IconButton, Modal, Typography } from "@mui/material"
import {
  Cancel as CancelIcon,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "./ExportPopupWindow.css"
import { FaGoogleDrive } from "react-icons/fa";
import { IoFileTrayFull } from "react-icons/io5";
import { getGoogleDriveService } from "@/utils/GoogleDriveUtils";
import { HotspotData } from "../HotspotManager";
import { useDriveAuth } from "@/hooks/useDriveAuth";
import { PiExportBold } from "react-icons/pi";
import { getAnnotations, getBlob } from "@/utils/storedImageData";
import { blob } from "stream/consumers";

interface ExportPopupProps {
    isOpen:boolean;
    setIsPopupOpen:React.Dispatch<React.SetStateAction<boolean>>;
    viewerId?:string;
    authStatus:string|null;
}

const ExportPopupWindow: React.FC<ExportPopupProps> = ({ isOpen, setIsPopupOpen, viewerId, authStatus}) => {
    const { startDriveAuth } = useDriveAuth();
    const [driveService] = useState(getGoogleDriveService()); // for file export

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [exportStatus, setExportStatus] = useState<string>('');

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

    // useEffect(()=>{
    //     if(isOpen){
    //         setIsAuthenticated(false);
    //     }
    // },[isOpen])


    const handleAuthenticate = async () => {
        try {
            await startDriveAuth(viewerId);
        } catch (error) {
            setExportStatus(`Authentication failed: ${error}`);
            console.log("Authentification Failed:",error)
        }
    };

    const handleExport = async () => {
        // Get your app's current image and annotations
        if (!viewerId) return null;
        const imageBlob = await getBlob(viewerId); 
        const annotations = await getAnnotations(viewerId);
        
        // const annotations = getCurrentAnnotations(); // Implement this
        
        console.log("Strarting export ...")
        
        // if (!imageBlob || !annotations) {
        if (!imageBlob || imageBlob === undefined) {
            setExportStatus('Please select an image and add annotations');
            console.log(exportStatus);
            return null;
        }


        setIsExporting(true);
        setExportStatus('Exporting to Google Drive...');
        console.log("Exporting to Google Drive...");

        try {
            const result = await driveService.exportToGoogleDrive(
                imageBlob,
                annotations || [],
                {
                    imageName: 'my_360_image',
                    folderName: '360° Annotations',
                    includeMetadata: true
                }
            );

            setExportStatus(`Export successful! View files: ${result.driveUrl}`);
            if (result.success) {
                console.log(`Export successful! View files: ${result.driveUrl}`);
            } else {
                console.log(result.error);
                throw new Error(result.error);
            }
        } catch (error) {
            
            setExportStatus(`Export failed: ${error}`);
        } finally {
            setIsExporting(false);
        }
    };

    const handleSignOut = () => {
        driveService.signOut();
        setIsAuthenticated(false);
        setExportStatus('Signed out from Google Drive');
    };

    // // Placeholder functions - implement based on your app
    // const getCurrentImageBlob = (): Blob | null => {
    //     // Return current 360° image as Blob

    //     if (!blob  || blob === undefined) {
    //         return null;
    //     }
    //     return blob;
    // };


    const getCurrentAnnotations = (): HotspotData[] => {
        // Return current annotations
        return [];
    };
    
    return (
        <Modal open={isOpen} onClose={handlePopupClose} closeAfterTransition>
            <Fade in={isOpen}>
            <Box
                sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={handlePopupClose}>
                    <CancelIcon sx={{ color: "#282828", "&:hover": { color: "red" } }} />
                </IconButton>
                </Box>
                {isAuthenticated ?
                <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <Typography variant="h6" component="h2" sx={{ marginBottom: "1rem" }}>
                        Confirmer l'export
                    </Typography>
                    <input
                        type="text"/>
                    <div className="export_options">
                        <div className="export-single_options" onClick={handleExport}>
                            <PiExportBold size={20}/>
                            <p>Exporter</p>
                        </div>
                    </div>
                </Box>                    
                :
                <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <Typography variant="h6" component="h2" sx={{ marginBottom: "1rem" }}>
                        Exporter vers
                    </Typography>
                    <div className="export_options">
                        <div className="export-single_options" onClick={handleAuthenticate}>
                            <FaGoogleDrive size={20}/>
                            <p>Google Drive</p>
                        </div>
                        <div className="export-single_options">
                            <IoFileTrayFull size={20}/>
                            <p>Ordinateur</p>
                        </div>
                    </div>
                </Box>
                }
            </Box>
            </Fade>
        </Modal>
    )
}    

export default React.memo(ExportPopupWindow);