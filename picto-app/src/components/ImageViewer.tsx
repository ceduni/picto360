import React, { useRef } from "react";
import { usePannellumViewer } from "../hooks/usePannellumViewer";
import "./css/ImageViewer.css";

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
  usePannellumViewer(viewerRef, imageSrc);

  return (
    <>
      <div
        ref={viewerRef}
        className="viewer-container"
        style={{ width, height }}
      ></div>
    </>
  );
};

export default ImageViewer;
