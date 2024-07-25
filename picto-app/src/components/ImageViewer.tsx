import React, { useRef } from "react";
import { usePannellumViewer } from "../hooks/usePannellumViewer";
import "./css/ImageViewer.css";
import ContextMenu from "./ContextMenu";

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
    </>
  );
};

export default ImageViewer;
