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

interface ToolbarProps {
  imageSrc: string | null;
  isEditMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ imageSrc, isEditMode, setIsEditMode }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [projectTitle, setProjectTitle] = useState("Projet#1");
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showModeIndicator, setShowModeIndicator] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  const CHARACTER_LIMIT = 20;

  const handleToggleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsEditMode(event.target.checked);
      setShowModeIndicator(true);
      setTimeout(() => setShowModeIndicator(false), 3000);
    },
    [setIsEditMode]
  );

  const toggleShareOptions = useCallback(() => {
    setShowShareOptions((prev) => !prev);
  }, []);

  const handleTitleChange = useCallback(() => {
    if (titleRef.current) {
      let newTitle = titleRef.current.innerText.trim();
      const selection = window.getSelection();
      const anchorOffset = selection?.anchorOffset;

      if (newTitle.length > CHARACTER_LIMIT) {
        newTitle = newTitle.slice(0, CHARACTER_LIMIT);
        setWarningMessage(
          `Le titre ne doit pas dépasser ${CHARACTER_LIMIT} caractères.`
        );
      } else {
        setWarningMessage(null);
      }

      setProjectTitle(newTitle);
      setCursorPosition(Math.min(anchorOffset || 0, CHARACTER_LIMIT));
    }
  }, [CHARACTER_LIMIT]);

  //prevents adding new characters when the limit is reached
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (titleRef.current) {
      const currentLength = titleRef.current.innerText.trim().length;
      if (currentLength >= CHARACTER_LIMIT &&
          !event.ctrlKey &&
          !event.metaKey &&
          event.key !== 'Backspace' &&
          event.key !== 'Delete' &&
          event.key !== 'ArrowLeft' &&
          event.key !== 'ArrowRight') {
        event.preventDefault();
      }
    }
  }, [CHARACTER_LIMIT]);

  //handles Ctrl-C + Ctrl-V events to prevent pasting more than the limit
  const handlePaste = useCallback((event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (titleRef.current && titleRef.current.innerText.length < CHARACTER_LIMIT) {
      const pastedText = event.clipboardData.getData('text/plain');
      const availableSpace = CHARACTER_LIMIT - titleRef.current.innerText.length;
      const textToInsert = pastedText.slice(0, availableSpace);
      document.execCommand('insertText', false, textToInsert); //deprecated -> to replace
      handleTitleChange();
    }
  }, [CHARACTER_LIMIT, handleTitleChange]);
  
  const handleSave = useCallback(() => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1500);
  }, []);

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

      if (data.success) {
        alert("File exported successfully!");
      } else {
        alert("Failed to export file: " + data.error);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unknown error occurred while exporting the file.";
      console.error("Error exporting file:", message);
      alert(
        `An error occurred while exporting the file: ${message}. Please check your internet connection or try again later.`
      );
    }
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.innerText = projectTitle;
      if (cursorPosition !== null) {
        const range = document.createRange();
        const selection = window.getSelection();

        if (titleRef.current.firstChild) {
          range.setStart(titleRef.current.firstChild, Math.min(cursorPosition, projectTitle.length));
          range.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }
    }
  }, [projectTitle, cursorPosition]);

  const titleHoverVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.025, transition: { duration: 0.25} }
  };

  return (
    <motion.div
      className={`toolbar-container ${isEditMode ? 'edit-mode' : 'preview-mode'}`}
      animate={{
        backgroundColor: isEditMode ? "#282828" : "#ffffff",
      }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.5
      }}
    >
      <AppBar position="static" className="toolbar" style={{ backgroundColor: 'transparent' }}>
        <MUIToolbar disableGutters className="toolbar-content">
          <Box className="toolbar-left">
            <img src={logo} alt="Picto360 Logo" className="toolbar-logo" />
            <Box className="toolbar-title-container" style={{ minHeight: warningMessage ? '65px' : '55px' }}>
              <Box className="toolbar-title-input-container">
                <motion.div
                  ref={titleRef}
                  contentEditable={isEditMode}
                  onInput={isEditMode ? handleTitleChange : undefined}
                  onBlur={isEditMode ? handleTitleChange : undefined}
                  onKeyDown={isEditMode ? handleKeyDown : undefined}
                  onPaste={isEditMode ? handlePaste : undefined}
                  onCut={isEditMode ? (e) => e.preventDefault() : undefined}
                  className={`toolbar-title-input ${isEditMode ? 'editable' : ''}`}
                  style={{
                    minWidth: "auto",
                    display: "inline-block",
                    outline: "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    cursor: isEditMode ? 'text' : 'default',
                  }}
                  variants={titleHoverVariants}
                  initial="idle"
                  whileHover={isEditMode ? "hover" : "idle"}
                >
                  {projectTitle}
                </motion.div>
                <Typography variant="body2" className="toolbar-title-extension">
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
                    <Box className="toolbar-warning-message">
                      <Typography variant="caption" className="warning-text">
                        {warningMessage}
                      </Typography>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </Box>

          <Box className="toolbar-right">
            <Tooltip title={null}>
              <ToggleSwitch
                checked={isEditMode}
                onChange={handleToggleChange}
                className="toolbar-toggle-switch"
              />
            </Tooltip>

            <Tooltip title={isEditMode ? "Sauvegarder" : ""}>
              <span>
                <IconButton
                  onClick={handleSave}
                  className="toolbar-icon-button save-icon"
                  disabled={!isEditMode}
                >
                  {isSaved ? <CheckIcon className="icon-saved" /> : <SaveIcon />}
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Exporter">
              <IconButton
                onClick={() => handleExport(imageSrc)}
                className="toolbar-icon-button"
              >
                <ExportIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Partager">
              <IconButton
                onClick={toggleShareOptions}
                className="toolbar-icon-button"
              >
                <ShareIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Paramètres">
              <IconButton className="toolbar-icon-button">
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </MUIToolbar>

        {/* Share Options Modal */}
        <Modal
          open={showShareOptions}
          onClose={toggleShareOptions}
          closeAfterTransition
        >
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
                  <CancelIcon
                    sx={{ color: "#282828", "&:hover": { color: "red" } }}
                  />
                </IconButton>
              </Box>
              <Typography
                variant="h6"
                component="h2"
                sx={{ marginBottom: "1rem" }}
              >
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
