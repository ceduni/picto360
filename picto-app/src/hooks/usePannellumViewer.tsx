import { useEffect, useCallback, RefObject, useRef } from "react";
import { useHotspots } from "./useHotspots";

declare global {
  interface Window {
    pannellum: any;
  }
}

export const usePannellumViewer = (
  viewerRef: RefObject<HTMLDivElement>,
  imageSrc: string
) => {
  const { addTextHotspot, addLabelHotspot, addHyperlinkHotspot, addImageHotspot } = useHotspots();
  const mouseCoordsRef = useRef({ x: 0, y: 0 });

  const setupViewer = useCallback(() => {
    if (!viewerRef.current || !imageSrc) return;

    const viewer = window.pannellum.viewer(viewerRef.current, {
      type: "equirectangular",
      panorama: imageSrc,
      autoLoad: true,
      autoRotate: -2,
      showZoomCtrl: true,
      strings: {
        loadingLabel: "Chargement en cours...",
      },
    });

    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 0) {
        const coords = viewer.mouseEventToCoords(event);
        addTextHotspot(viewer, coords);
      }
    };

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      const coords = viewer.mouseEventToCoords(event);
      addLabelHotspot(viewer, coords);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseCoordsRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.key === "h" || event.key === "H") {
        event.preventDefault();
        const coords = viewer.mouseEventToCoords({
          clientX: mouseCoordsRef.current.x,
          clientY: mouseCoordsRef.current.y,
        } as MouseEvent); // Mock MouseEvent for getting coordinates

        const url = prompt("Enter the URL for the hotspot:");
        if (url) {
          const displayText = prompt("Enter the text to display for the hyperlink:");
          if (displayText) {
            addHyperlinkHotspot(viewer, coords, url, displayText);
          }
        }
      }

      if (event.key === "i" || event.key === "I") {
        event.preventDefault();
        const coords = viewer.mouseEventToCoords({
          clientX: mouseCoordsRef.current.x,
          clientY: mouseCoordsRef.current.y,
        } as MouseEvent); // Mock MouseEvent for getting coordinates

        const imageFile = await selectImageFile();
        if (imageFile) {
          const imageUrl = URL.createObjectURL(imageFile);
          addImageHotspot(viewer, coords, imageUrl);
        }
      }
    };

    const selectImageFile = () => {
      return new Promise<File | null>((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = () => {
          const file = input.files?.[0] || null;
          resolve(file);
        };
        input.click();
      });
    };

    viewer.on("mousedown", handleMouseDown);
    viewerRef.current.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      viewer.off("mousedown", handleMouseDown);
      viewerRef.current?.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      viewer.destroy();
    };
  }, [imageSrc, viewerRef, addTextHotspot, addLabelHotspot, addHyperlinkHotspot, addImageHotspot]);

  useEffect(() => {
    const cleanup = setupViewer();
    return cleanup;
  }, [setupViewer]);

  return {};
};
