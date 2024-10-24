import React, { useRef, useEffect } from "react";
import { usePanoramaViewer } from "../hooks/usePanoramaViewer";
import "./css/PanoramaViewer.css";
import ContextMenu from "./ContextMenu";
import { PiTargetBold } from "react-icons/pi";

interface PanoramaViewerProps {
  width: string;
  height: string;
  imageSrc: string;
  isEditMode: boolean;
}

const PanoramaViewer: React.FC<PanoramaViewerProps> = ({
  width,
  height,
  imageSrc,
  isEditMode,
}) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const {
    contextMenuVisible,
    contextMenuPosition,
    handleContextMenuClick,
    targetIconPosition,
    hideContextMenu,
  } = usePanoramaViewer(viewerRef, imageSrc);

  useEffect(() => {
    if (!isEditMode) {
      hideContextMenu();
    }
  }, [isEditMode, hideContextMenu]);

  return (
    <>
      <div
        ref={viewerRef}
        className="viewer-container"
        style={{ width, height }}
        onContextMenu={(e) => {
          if (!isEditMode) {
            e.preventDefault();
          }
        }}
      ></div>
      {isEditMode && contextMenuVisible && (
        <ContextMenu
          visible={contextMenuVisible}
          x={contextMenuPosition.x}
          y={contextMenuPosition.y}
          onMenuItemClick={handleContextMenuClick}
          onClose={hideContextMenu}
          isEditMode={isEditMode}
        />
      )}
      {isEditMode && targetIconPosition && (
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

export default React.memo(PanoramaViewer);
