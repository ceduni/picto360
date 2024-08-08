import { useEffect, useCallback, useState, RefObject, useRef } from "react";
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
  const {
    addTextHotspot,
    addLabelHotspot,
    addHyperlinkHotspot,
    addImageHotspot,
    addGifHotspot,
    addQuestionnaireHotspot,
    addVideoHotspot,
  } = useHotspots();
  const mouseCoordsRef = useRef({ x: 0, y: 0 });
  const contextMenuCoordsRef = useRef<{ pitch: number; yaw: number }>({
    pitch: 0,
    yaw: 0,
  });
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [targetIconPosition, setTargetIconPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const viewerRefCallback = useRef<any>(null); // reference to store the viewer instance

  const handleContextMenuClick = async (type: string) => {
    if (!viewerRefCallback.current) return;

    const viewer = viewerRefCallback.current;
    const { pitch, yaw } = contextMenuCoordsRef.current;
    const coords = [pitch, yaw];
    switch (type) {
      case "Text":
        addTextHotspot(viewer, coords, "Default text content");
        break;
      case "Label":
        addLabelHotspot(viewer, coords);
        break;
      case "Hyperlink":
        addHyperlinkHotspot(
          viewer,
          coords,
          "https://example.com",
          "Default hyperlink text"
        );
        break;
      case "Image":
        // eslint-disable-next-line no-case-declarations
        const imageFile = await new Promise<File | null>((resolve) => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0] || null;
            resolve(file);
          };
          input.click();
        });
        if (imageFile) {
          const imageUrl = URL.createObjectURL(imageFile);
          addImageHotspot(viewer, coords, imageUrl);
        }
        break;
      case "Gif":
        // eslint-disable-next-line no-case-declarations
        const gifUrl = prompt("Enter the URL of the GIF:");
        if (gifUrl) {
          addGifHotspot(viewer, coords, gifUrl);
        }
        break;
      case "Video":
        // eslint-disable-next-line no-case-declarations
        const videoUrl = prompt("Enter the YouTube video URL:");
        if (videoUrl) {
          const videoId = extractYouTubeVideoId(videoUrl);
          if (videoId) {
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            addVideoHotspot(viewer, coords, embedUrl);
          } else {
            alert("Invalid YouTube URL");
          }
        }
        break;

      case "Questionnaire":
        const question = prompt("Entrez la question:");
        const nbOptions = parseInt(prompt("Entrez le nombre d'options (minimum 2):") || "2", 10);
        
        const options: string[] = [];
        for (let i = 0; i < nbOptions; i++) {
          const option = prompt(`Entrez le texte pour le choix ${i + 1}`);
          if (option) {
            options.push(option);
          } else {
            alert("Le texte du choix ne peut pas être vide.");
            return;
          }
        }

        const correctOption = parseInt(prompt("Entrez le numéro de la bonne réponse :") || "1", 10) - 1;
        console.log("Question:", question);
        console.log("Options:", options);
        console.log("Correct Option:", correctOption);
        if (question && options.length >= 1 && correctOption >= 0) {
          addQuestionnaireHotspot(viewer, coords, question, options, correctOption, nbOptions);
        } else {
          alert("erreur");
        }
        break;

      default:
        break;
    }
    setContextMenuVisible(false);
    setTargetIconPosition(null);
  };

  const extractYouTubeVideoId = (url: string) => {
    const regex =
      // eslint-disable-next-line no-useless-escape
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const hideContextMenu = () => {
    setContextMenuVisible(false);
    setTargetIconPosition(null);
  };

  const setupViewer = useCallback(() => {
    if (!viewerRef.current || !imageSrc) return;

    const viewer = window.pannellum.viewer(viewerRef.current, {
      type: "equirectangular",
      panorama: imageSrc,
      autoLoad: true,
      autoRotate: -2,
      showZoomCtrl: true,
      keyboardZoom: false,
      disableKeyboardCtrl: false,
      mouseZoom: true,
      strings: {
        loadingLabel: "Chargement en cours...",
      },
    });

    viewerRefCallback.current = viewer; // Store the viewer instance

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      mouseCoordsRef.current = { x: event.clientX, y: event.clientY };
      setContextMenuPosition({ x: event.clientX, y: event.clientY });
      setContextMenuVisible(true);
      setTargetIconPosition({ x: event.clientX, y: event.clientY });

      const coords = viewer.mouseEventToCoords({
        clientX: event.clientX,
        clientY: event.clientY,
      } as MouseEvent);
      contextMenuCoordsRef.current = { pitch: coords[0], yaw: coords[1] };
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseCoordsRef.current = { x: event.clientX, y: event.clientY };
    };

    viewerRef.current.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      viewerRef.current?.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("mousemove", handleMouseMove);
      viewer.destroy();
    };
  }, [viewerRef, imageSrc]);

  useEffect(() => {
    const cleanup = setupViewer();
    return cleanup;
  }, [setupViewer]);

  return {
    contextMenuVisible,
    contextMenuPosition,
    handleContextMenuClick,
    hideContextMenu,
    targetIconPosition,
  };
};
