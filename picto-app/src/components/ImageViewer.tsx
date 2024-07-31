import React, { useRef } from "react";
import { usePannellumViewer } from "../hooks/usePannellumViewer";
import "./css/ImageViewer.css";
import ContextMenu from "./ContextMenu";
import { PiTargetBold } from "react-icons/pi";

interface PannellumViewerProps {
  width: string;
  height: string;
  imageSrc: string;
}

const ImageViewer: React.FC<PannellumViewerProps> = ({
  width,
  height,
  imageSrc,
}) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const {
    contextMenuVisible,
    contextMenuPosition,
    handleContextMenuClick,
    targetIconPosition,
    hideContextMenu,
  } = usePannellumViewer(viewerRef, imageSrc);

  return (
    <>
      <div
        ref={viewerRef}
        className="viewer-container"
        style={{ width, height }}
      ></div>
      {contextMenuVisible && (
        <ContextMenu
          visible={contextMenuVisible}
          x={contextMenuPosition.x}
          y={contextMenuPosition.y}
          onMenuItemClick={handleContextMenuClick}
          onClose={hideContextMenu}
        />
      )}
      {targetIconPosition && (
        <div
          style={{
            top: targetIconPosition.y,
            left: targetIconPosition.x,
          }}
          className="target-icon"
        >
          <PiTargetBold />
        </div>
      )}
    </>
  );
};

export default ImageViewer;
