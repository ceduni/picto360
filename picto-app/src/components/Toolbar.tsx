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
import logo from "/images/logo_picto360.png";
import CustomSwitch from "./ui/CustomSwitch";

interface ToolbarProps {
  imageSrc: string | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ imageSrc }) => {
  const [isSliderEnabled, setIsSliderEnabled] = useState(true);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [projectTitle, setProjectTitle] = useState("Projet#1");
  const [isSaved, setIsSaved] = useState(false);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const [titleWidth, setTitleWidth] = useState(0);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const CHARACTER_LIMIT = 20;

  const handleToggleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsSliderEnabled(event.target.checked);
    },
    []
  );

  const toggleShareOptions = useCallback(() => {
    setShowShareOptions((prev) => !prev);
  }, []);

  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = event.target.value;
      if (newTitle.length <= CHARACTER_LIMIT) {
        setProjectTitle(newTitle);
        setWarningMessage(null);
      } else {
        setWarningMessage(
          `Le titre ne doit pas dépasser ${CHARACTER_LIMIT} caractères.`
        );
      }
    },
    [CHARACTER_LIMIT]
  );

  const adjustTitleWidth = useCallback(() => {
    if (titleRef.current) {
      setTitleWidth(titleRef.current.scrollWidth);
    }
  }, []);

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
    adjustTitleWidth();
  }, [projectTitle, adjustTitleWidth]);

  const iconButtonStyles = {
    color: "#ffffff",
    transition: "color 0.3s ease-in-out",
    "&:hover": {
      color: "#1c73fa",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "30px",
    },
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "none",
        backgroundColor: "#282828",
        padding: "0 1rem",
        height: "55px",
        justifyContent: "center",
      }}
    >
      <MUIToolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        {/* Left Segment: Header */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Picto360 Logo"
            style={{ width: "45px", height: "auto", marginRight: "8px" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: warningMessage ? "center" : "flex-end",
              height: warningMessage ? "auto" : "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", height: "auto" }}>
              <InputBase
                value={projectTitle}
                onChange={handleTitleChange}
                onBlur={adjustTitleWidth}
                type="string"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "white",
                  border: "none",
                  padding: "0px",
                  width: `${titleWidth}px`,
                  transition: "width 0.05s ease-in-out",
                  boxSizing: "content-box",
                  whiteSpace: "nowrap",
                }}
                inputRef={titleRef}
              />
              <Typography
                variant="body2"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "white",
                  marginLeft: "4px",
                }}
              >
                .picto
              </Typography>
            </Box>
            {warningMessage && (
              <Box sx={{ height: "15px", marginTop: "-7.5px" }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "red",
                    fontSize: "0.75rem",
                    fontStyle: "italic",
                  }}
                >
                  {warningMessage}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Right Segment: Toolbar Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Tooltip title={null}>
            <CustomSwitch
              checked={isSliderEnabled}
              onChange={handleToggleChange}
              sx={{ m: 1 }}
            />
          </Tooltip>

          <Tooltip title="Sauvegarder">
            <IconButton onClick={handleSave} sx={iconButtonStyles}>
              {isSaved ? <CheckIcon sx={{ color: "#94d255" }} /> : <SaveIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Exporter">
            <IconButton
              onClick={() => handleExport(imageSrc)}
              sx={iconButtonStyles}
            >
              <ExportIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Partager">
            <IconButton onClick={toggleShareOptions} sx={iconButtonStyles}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Paramètres">
            <IconButton sx={iconButtonStyles}>
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
  );
};

export default React.memo(Toolbar);
