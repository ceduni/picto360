import React, { useState, useCallback, useEffect } from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { LayersOutlined, Fullscreen, FullscreenExit, PanToolOutlined, Undo, Redo } from "@mui/icons-material";
import "./css/BottomNavbar.css";

const StyledAppBar = styled(AppBar)(() => ({
  top: "auto",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "var(--bottom-bar-width)",
  minWidth: "min-content",
  maxWidth: "90%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "2em 2em 0 0",
  transition: "height 0.5s, border-radius 0.5s, transform 0.5s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledToolbar = styled(Toolbar)({
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100%",
  padding: 0,
  width: "100%",
});

const StyledIconButton = styled(IconButton)({
  color: "white",
  flex: 1,
  display: "flex",
  alignItems: "center",
  height: "100%",
  margin: 0,
  padding: 0,
  "&:hover": {
    color: "#1f76fd",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "var(--icon-size)",
  },
});

const BottomNavbar: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <StyledAppBar position="fixed" className="bottom-navbar">
      <StyledToolbar className="bottom-navbar__toolbar">
        <StyledIconButton className="bottom-navbar__button">
          <LayersOutlined />
        </StyledIconButton>
        <StyledIconButton className="bottom-navbar__button" onClick={toggleFullscreen}>
          {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
        </StyledIconButton>
        <StyledIconButton className="bottom-navbar__button">
          <PanToolOutlined />
        </StyledIconButton>
        <StyledIconButton className="bottom-navbar__button">
          <Undo />
        </StyledIconButton>
        <StyledIconButton className="bottom-navbar__button">
          <Redo />
        </StyledIconButton>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default React.memo(BottomNavbar);
