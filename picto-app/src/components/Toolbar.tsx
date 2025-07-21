import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  AppBar,
  Toolbar as MUIToolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Tooltip,
  Modal,
  Fade,
} from "@mui/material";
import {
  SaveOutlined as SaveIcon,
  Share as ShareIcon,
  Settings as SettingsIcon,
  Cancel as CancelIcon,
  FileUpload as ExportIcon,
  Done as CheckIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/images/logo_picto360.png";
import ToggleSwitch from "./ui/ToggleSwitch";
import "./css/Toolbar.css";
import { useNavigate } from "react-router-dom";

interface ToolbarProps {
  imageSrc: string | null;
  isEditMode: boolean;
  toggleEditMode: () => void;
}

const CHARACTER_LIMIT = 20;

const Toolbar: React.FC<ToolbarProps> = ({ imageSrc, isEditMode, toggleEditMode }) => {
  const [projectTitle, setProjectTitle] = useState("Untitled"); //TODO: manage project uniqueness in DB
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const projectTitleRef = useRef<HTMLDivElement>(null);

  const handleTitleChange = useCallback(() => {
    if (projectTitleRef.current) {
      const newTitle = projectTitleRef.current.innerText.trim().slice(0, CHARACTER_LIMIT);
      const selection = window.getSelection();
      const anchorOffset = selection?.anchorOffset ?? 0;

      setProjectTitle(newTitle);
      setCursorPosition(Math.min(anchorOffset, CHARACTER_LIMIT));
      setWarningMessage(
        newTitle.length === CHARACTER_LIMIT
          ? `ATTENTION: Le titre ne doit pas dépasser ${CHARACTER_LIMIT} caractères.`
          : null
      );
    }
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      projectTitleRef.current &&
      projectTitleRef.current.innerText.trim().length >= CHARACTER_LIMIT &&
      !event.ctrlKey &&
      !event.metaKey &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(event.key)
    ) {
      event.preventDefault();
    }
  }, []);

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (projectTitleRef.current) {
        const pastedText = event.clipboardData.getData("text/plain");
        const availableSpace = CHARACTER_LIMIT - projectTitleRef.current.innerText.length;
        const textToInsert = pastedText.slice(0, availableSpace);
        document.execCommand("insertText", false, textToInsert); //TODO: replace deprecated method
        handleTitleChange();
      }
    },
    [handleTitleChange]
  );

  const handleSave = useCallback(() => {
    if (isEditMode) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 1500);
    }
  }, [isEditMode]);

  const handleExport = useCallback(async (imageSrc: string | null) => {
    if (!imageSrc) {
      alert("No image to export");
      return;
    }

    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append("file", blob, "image_projet_picto360.png");

      const exportResponse = await fetch("http://localhost:3001/export", {
        method: "POST",
        body: formData,
      });

      if (!exportResponse.ok) {
        throw new Error(`Failed to export file: ${exportResponse.statusText}`);
      }

      const data = await exportResponse.json();
      alert(data.success ? "File exported successfully!" : "Failed to export file: " + data.error);
    } catch (error) {
      console.error("Error exporting file:", error);
      alert(`An error occurred while exporting the file. Please check your internet connection or try again later.`);
    }
  }, []);

  const handleToggleEditMode = useCallback(() => {
    toggleEditMode();
  }, [toggleEditMode]);
  const toggleShareOptions = useCallback(() => {
    setShowShareOptions((prev) => !prev);
  }, []);

  useEffect(() => {
    if (projectTitleRef.current) {
      projectTitleRef.current.innerText = projectTitle;
      if (cursorPosition !== null) {
        const range = document.createRange();
        const selection = window.getSelection();
        if (projectTitleRef.current.firstChild) {
          range.setStart(projectTitleRef.current.firstChild, Math.min(cursorPosition, projectTitle.length));
          range.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }
    }
  }, [projectTitle, cursorPosition]);

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

  const titleHoverVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.025, transition: { duration: 0.25 } },
  };

  const navigate = useNavigate();
  const redirectHomePage = useCallback(() =>
    navigate('/'),[])

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
    >
      <AppBar position="static" className="toolbar" style={{ backgroundColor: "transparent" }}>
        <MUIToolbar disableGutters className="toolbar__content">
          <Box className="toolbar__left">
            
            <img src={logo} alt="Picto360 Logo" className="toolbar__logo" onClick={redirectHomePage} />

            <Box className="toolbar__title-container" style={{ minHeight: warningMessage ? "65px" : "55px" }}>
              <Box className="toolbar__title-input-wrapper">
                <motion.div
                  ref={projectTitleRef}
                  contentEditable={isEditMode}
                  onInput={isEditMode ? handleTitleChange : undefined}
                  onBlur={isEditMode ? handleTitleChange : undefined}
                  onKeyDown={isEditMode ? handleKeyDown : undefined}
                  onPaste={isEditMode ? handlePaste : undefined}
                  onCut={isEditMode ? (e) => e.preventDefault() : undefined}
                  className={`toolbar__title-input ${isEditMode ? "toolbar__title-input--editable" : ""}`}
                  style={{
                    minWidth: "auto",
                    display: "inline-block",
                    outline: "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    cursor: isEditMode ? "text" : "default",
                  }}
                  variants={titleHoverVariants}
                  initial="idle"
                  whileHover={isEditMode ? "hover" : "idle"}
                >
                  {projectTitle}
                </motion.div>
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
          </Box>

          <Box className="toolbar__right">
            <Tooltip title={null}>
              <ToggleSwitch checked={isEditMode} onChange={handleToggleEditMode} className="toolbar__toggle-switch" />
            </Tooltip>

            <Tooltip
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
            </Tooltip>
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
              <IconButton onClick={() => handleExport(imageSrc)} className="toolbar__icon-button">
                <ExportIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
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
              <IconButton onClick={toggleShareOptions} className="toolbar__icon-button">
                <ShareIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
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
            </Tooltip>
          </Box>
        </MUIToolbar>

        {/* Share Options Modal */}
        <Modal open={showShareOptions} onClose={toggleShareOptions} closeAfterTransition>
          <Fade in={showShareOptions}>
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
                <IconButton onClick={toggleShareOptions}>
                  <CancelIcon sx={{ color: "#282828", "&:hover": { color: "red" } }} />
                </IconButton>
              </Box>
              <Typography variant="h6" component="h2" sx={{ marginBottom: "1rem" }}>
                Share Project
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <InputBase
                  placeholder="Expiration Date"
                  type="date"
                  sx={{
                    borderBottom: "1px solid gray",
                    paddingBottom: "0.5rem",
                    color: "#000000",
                  }}
                />
                <InputBase
                  placeholder="Access Level"
                  type="text"
                  sx={{
                    borderBottom: "1px solid gray",
                    paddingBottom: "0.5rem",
                    color: "#000000",
                  }}
                />
                <IconButton
                  sx={{
                    alignSelf: "center",
                    padding: "0.5rem 1.5rem",
                    backgroundColor: "primary.main",
                    color: "white",
                    borderRadius: "5px",
                  }}
                >
                  Copy Link
                </IconButton>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </AppBar>
    </motion.div>
  );
};

export default React.memo(Toolbar);
