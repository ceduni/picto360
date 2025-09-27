import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  AppBar,
  Toolbar as MUIToolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import {
  SaveOutlined as SaveIcon,
  Share as ShareIcon,
  Settings as SettingsIcon,
  FileUpload as ExportIcon,
  Done as CheckIcon,
  LogoutOutlined,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/images/logo_picto360.png";
import ToggleSwitch from "./ui/ToggleSwitch";
import "./css/Toolbar.css";
import { useNavigate } from "react-router-dom";
import ExportPopupWindow from "./ui/ExportPopupWindow";
import SharePopupWindow from "./ui/SharePopupWindow";
import { getViewerItem, putViewerItem } from "@/utils/storedImageData";
import { DriveAuthStatus, MessageBannerRef } from "@/utils/Types";
import { useDriveAuth } from "@/hooks/useDriveAuth";

interface ToolbarProps {
  isEditMode: boolean;
  toggleEditMode: () => void;
  viewerId?:string;
  driveAuthStatus:DriveAuthStatus|null;
}

const CHARACTER_LIMIT = 20;

const Toolbar: React.FC<ToolbarProps> = ({ isEditMode, toggleEditMode ,viewerId,driveAuthStatus}) => {

  const [projectTitle, setProjectTitle] = useState(""); //TODO: manage project uniqueness in DB
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const projectTitleRef = useRef<HTMLDivElement>(null);

  const spanRef = useRef<HTMLSpanElement>(null);
  const [titleWidth, setTitleWidth] = useState(1);

  const {logoutFromDrive} = useDriveAuth()

  useEffect(() => {
    if (spanRef.current) {
        setTitleWidth(spanRef.current.offsetWidth + 8)
    }
  }, [projectTitle]);

  // Change the project title
  const handleTitleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;

      setProjectTitle(newTitle);
      setWarningMessage(
        newTitle.length === CHARACTER_LIMIT
          ? `ATTENTION: Le titre ne doit pas dépasser ${CHARACTER_LIMIT} caractères.`
          : null
      );

  };

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      projectTitleRef.current &&
      projectTitleRef.current.innerText.trim().length >= CHARACTER_LIMIT &&
      !event.ctrlKey &&
      !event.metaKey &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight" ].includes(event.key)
    ) {
      event.preventDefault();
    }

    if(event.key==="Enter"){
      event.preventDefault();
      saveProjectTitleToDB();
      event.currentTarget.blur()
    }
  }, []);

  const handleSave = useCallback(() => {
    if (isEditMode) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 1500);
    }
  }, [isEditMode]);


  const handleToggleEditMode = useCallback(() => {
    toggleEditMode();
  }, [toggleEditMode]);

  
  const getViewerFromDB = async()=> {
    if(viewerId === "null" || !viewerId ){
        navigate("/", {replace : true});
        return;
    }
    const viewerItem = await getViewerItem(viewerId);

    const name = viewerItem?.name;
    if(name) {
      setProjectTitle(name)
    };
  }

  const saveProjectTitleToDB = async () =>{
    if(viewerId === "null" || !viewerId ){
        return;
    }
      await putViewerItem(viewerId,projectTitle);
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
  const redirectHomePage = useCallback(() =>
    navigate('/')
  ,[])
 

  return (
    <motion.div
      className={`toolbar-container toolbar--${isEditMode ? "edit-mode" : "preview-mode"}`}
      animate={{
        backgroundColor: isEditMode ? "#282828" : "#ffffff",
      }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.5,
      }}
      onLoad={getViewerFromDB}
    >
      <AppBar position="static" className="toolbar" 
              style={{ backgroundColor: "transparent" }}
              >
        <MUIToolbar disableGutters className="toolbar__content" >
          <Box className="toolbar__left">
            
            <img src={logo} alt="Picto360 Logo" className="toolbar__logo" onClick={redirectHomePage} />

            <Box className="toolbar__title-container" style={{ minHeight: warningMessage ? "65px" : "55px" }}>
              <Box className="toolbar__title-input-wrapper">
                  {/* Invisible span to measure text */}
                <span
                  ref={spanRef}
                  style={{
                    position: "absolute",
                    visibility: "hidden",
                    whiteSpace: "pre", // preserve spaces
                    fontSize: "16px",
                    fontFamily: "inherit",
                  }}
                >
                  {projectTitle.length>"Untitled".length ? 
                  projectTitle || " "
                  :
                  "Untitled"} {/* add placeholder space for empty input */}
                </span>
                <input type="text" 
                        maxLength={CHARACTER_LIMIT}
                        value={projectTitle}
                        onChange={(e)=>{
                          handleTitleChange(e)
                        }}
                        onBlur={()=>{
                            saveProjectTitleToDB()
                          }
                        }
                        onKeyDown={handleKeyDown}
                        disabled={!isEditMode}
                        className={`toolbar__title-input ${isEditMode ? "toolbar__title-input_editable" : ""}`}
                        placeholder="Untitled"
                        style={{
                          width:`${titleWidth}px`,
                          cursor: isEditMode ? "text" : "default",
                        }}
                        />
                <Typography variant="body2" className="toolbar__title-extension">
                  .picto
                </Typography>
              </Box>
              <AnimatePresence>
                {warningMessage && (
                  <motion.div
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -5, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    style={{ overflow: "hidden" }}
                  >
                    <Box className="toolbar__warning-message">
                      <Typography variant="caption" className="toolbar__warning-text">
                        {warningMessage}
                      </Typography>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>

                 <Tooltip
              title="Exporter"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -7.5],
                      },
                    },
                  ],
                },
              }}
            >
            <IconButton onClick={()=>{setShowExportOptions(true)}} className="toolbar__icon-button">
              <ExportIcon />
            </IconButton>
            </Tooltip>
          </Box>

          <Box className="toolbar__right">
            <Tooltip title={null}>
              <ToggleSwitch checked={isEditMode} onChange={handleToggleEditMode} className="toolbar__toggle-switch" />
            </Tooltip>

            {/* <Tooltip
              title={isEditMode && !isSaved ? "Sauvegarder" : ""}
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -7.5],
                      },
                    },
                  ],
                },
              }}
            >
              <span>
                <IconButton
                  onClick={!isSaved ? handleSave : undefined}
                  className="toolbar__icon-button"
                  disabled={!isEditMode}
                >
                  {isSaved ? (
                    <CheckIcon className="toolbar__check-icon" />
                  ) : (
                    <SaveIcon className="toolbar__save-icon" />
                  )}
                </IconButton>
              </span>
            </Tooltip> */}
            
       

            {/* <Tooltip
              title="Partager"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -7.5],
                      },
                    },
                  ],
                },
              }}
            >
              <IconButton onClick={()=>{ setShowShareOptions(true)}} className="toolbar__icon-button">
                <ShareIcon />
              </IconButton>
            </Tooltip> */}

            {/* <Tooltip
              title="Paramètres"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -7.5],
                      },
                    },
                  ],
                },
              }}
            >
              <IconButton className="toolbar__icon-button">
                <SettingsIcon />
              </IconButton>
            </Tooltip> */}
            {
              driveAuthStatus?.isAuthenticated &&
            <Tooltip
              title="Déconnexion"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -7.5],
                      },
                    },
                  ],
                },
              }}
            >
              <IconButton className="toolbar__icon-button" onClick={async()=>{
                  await logoutFromDrive();
                  // await checkDriveAuth();
                  // window.location.reload()
                }}>
                <LogoutOutlined />
              </IconButton>
            </Tooltip>
            }
          </Box>
        </MUIToolbar>

        {/* Share Options Modal */}
        <SharePopupWindow isOpen={showShareOptions} setIsPopupOpen={setShowShareOptions}/>
        <ExportPopupWindow  isOpen={showExportOptions} 
                            setIsPopupOpen={setShowExportOptions} 
                            viewerId = {viewerId}
                            titleState = {{projectTitle,setProjectTitle: handleTitleChange,saveProjectTitleToDB}}
                            driveAuthStatus= {driveAuthStatus}/>
      </AppBar>
    </motion.div>
  );
};

export default React.memo(Toolbar);
