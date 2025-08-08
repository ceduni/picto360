import React, { useEffect } from "react";

interface VideoTooltipProps {
  src: string;
}

export const VideoTooltip: React.FC<VideoTooltipProps> = ({ src }) => {
  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");

  return isYouTube ? (
    <iframe
      className="hotspot-manager__video"
      src={`https://www.youtube.com/embed/${extractYouTubeId(src)}?enablejsapi=1`}
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  ) : (
    <video
      className="hotspot-manager__video"
      src={src}
      controls
      autoPlay
      muted
    />
  );
};

// Helper to extract ID from various YouTube links
function extractYouTubeId(url: string) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]+)/
  );
  return match ? match[1] : "";
}
