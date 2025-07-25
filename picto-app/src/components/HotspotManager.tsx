import React, { useCallback, useMemo, useRef, useEffect} from "react";
import { useHotspotCreation } from "../hooks/useHotspotCreation";
import "./css/HotspotManager.css";
import { createHotspotInstance, extractYouTubeVideoIdFromUrl, parseGiphyUrlToDirectGif, renderTooltipContent } from "@/utils/HotspotUtils";

interface HotspotManagerProps {
  viewer: unknown;
  viewerElement: HTMLDivElement | null;
  onHotspotClick: (hotspot: HotspotData) => void
}

export interface HotspotData {
  id: string;
  pitch: number;
  yaw: number;
  type: string;
  content?: string;
  url_text?: string;
  sceneId?: string;
  cssClass?: string;
  meta?: Record<string, any>; // optional metadata for custom cases
}

export interface HotspotInstance extends HotspotData {
  createTooltipFunc?: (hotSpotDiv: HTMLElement) => void;
  clickHandlerFunc?: (event: MouseEvent, args: HotspotData) => void;
  clickHandlerArgs?: HotspotData;
}
  

const TEXT_CHAR_LIMIT = 300;
const LABEL_HYPERLINK_CHAR_LIMIT = 30;

const HotspotManager: React.FC<HotspotManagerProps> = ({ viewer, viewerElement ,onHotspotClick}) => {
  const debugMode = useRef(true);
  const hotspotCounter = useRef(0); 


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debugLog = useCallback((...args: any[]) => {
    if (debugMode.current) console.log("HotspotManager - [Debug]", ...args);
  }, []);

  const pannellumClickHandler = (event: MouseEvent, args: HotspotData) => {
    onHotspotClick(args);
  };


  const addHotspotToViewer = useCallback(
    (
      coords: [number, number],
      content: string,
      editable: boolean,
      charLimit: number,
      type?: "text" | "label" | "hyperlink" | "image" | "gif" | "video" | "forme" | "scene" | "info",
      url?:string,
      // clickHandler?: (event: any,args: any) => void,
    ) => {
      if (!viewer) {
        debugLog("HotspotManager - Viewer not available, cannot add hotspot");
        return;
      }

      const hotspotId = `hotspot-${Date.now()}-${hotspotCounter.current++}`;
      debugLog("HotspotManager - Adding hotspot to viewer...", { hotspotId, coords, type });

      const baseHotspot: HotspotData = {
        id: hotspotId,
        pitch: coords[0],
        yaw: coords[1],
        url_text:url,
        type: type || "custom",
        cssClass: type === "label" ? "hotspot-manager__label" : "hotspot-manager__custom_hotspot",
        content:content,
      };

      try {
        //TODO: Replace any (if possible)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        
        const hotspotInstance = createHotspotInstance(baseHotspot,pannellumClickHandler);
        (viewer as any).addHotSpot(hotspotInstance);
        debugLog("HotspotManager - Hotspot added successfully", { hotspotId });
      } catch (error) {
        console.error("HotspotManager - Failed to add hotspot", error);
      }
    },
    [viewer, renderTooltipContent, debugLog]
  );

  const hotspotCreators = useMemo(
    () => ({
      text: (coords: [number, number]) =>
        addHotspotToViewer(
          coords,
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id suscipit ligula, non faucibus diam. Donec lacinia placerat mollis. Nam a est et risus finibus condimentum.",
          true,
          TEXT_CHAR_LIMIT,
          "text"
        ),
      label: (coords: [number, number]) =>
        addHotspotToViewer(coords, "Lorem ipsum dolor sit amet.", true, LABEL_HYPERLINK_CHAR_LIMIT, "label"),
      hyperlink: (coords: [number, number], url: string, hyperlinkText: string) =>
        //TODO: compress the URL into a tiny URL on a single line
        addHotspotToViewer(
          coords,
          hyperlinkText,
          true,
          LABEL_HYPERLINK_CHAR_LIMIT,
          "hyperlink",
          url
        ),
      //TODO: add an optional title above/under (choice) the image
      image: (coords: [number, number], imageUrl: string,imageText?:string) =>
        addHotspotToViewer(coords, imageUrl, true , LABEL_HYPERLINK_CHAR_LIMIT, "image",imageText),
      gif: (coords: [number, number], gifUrl: string) => {
        const directUrl = parseGiphyUrlToDirectGif(gifUrl);
        if (directUrl) {
          addHotspotToViewer(coords, directUrl, false, LABEL_HYPERLINK_CHAR_LIMIT, "gif");
        } else {
          console.error("HotspotManager - URL de gif invalide");
        }
      },
      video: (coords: [number, number], videoUrl: string) =>
        addHotspotToViewer(coords, videoUrl, true, LABEL_HYPERLINK_CHAR_LIMIT, "video"),
      forme: (coords: [number, number], question: string, options: string[], correctOption: number) => {
        addHotspotToViewer(
          coords,
          `${question}<ul>${options
            .map((opt, i) => `<li style="color: ${i === correctOption ? "green" : "red"}">${opt}</li>`)
            .join("")}</ul>`,
          false,
          LABEL_HYPERLINK_CHAR_LIMIT,
          "forme"
        );
      },
    }),
    [addHotspotToViewer]
  );


  const handleHotspotEvent = useCallback(
    async (type: string, coords: [number, number]) => {
      debugLog("HotspotManager - Handling hotspot event", { type, coords });
      switch (type) {
        case "Forme": {
          const question = prompt("Saisissez la question:");
          const options = Array.from(
            { length: parseInt(prompt("Saisissez le nombre d'options de réponses (minimum 2):") || "2", 10) },
            (_, i) => prompt(`Option ${i + 1}`) || ""
          );
          const correctOption = parseInt(prompt("Saisissez le numéro de la bonne réponse:") || "1", 10) - 1;
          if (question && options.length >= 2 && correctOption >= 0) {
            hotspotCreators.forme(coords, question, options, correctOption);
            debugLog("HotspotManager - Hotspot added successfully", { type, coords });
          } else {
            alert(
              "Erreur: Veuillez fournir une question valide, au moins deux options, et une réponse correcte valide."
            );
          }
          break;
        }
        case "Text":
          hotspotCreators.text(coords);
          debugLog("HotspotManager - Hotspot added successfully", { type, coords });
          break;
        case "Label":
          hotspotCreators.label(coords);
          debugLog("HotspotManager - Hotspot added successfully", { type, coords });
          break;
        case "Hyperlink": {
          const url = prompt("Soumettez le lien URL:") || "https://example.com";
          const text = prompt("Soumettez le texte de l'hyperlien:") || "Hyperlien";
          if (url) {
            hotspotCreators.hyperlink(coords, url, text);
            debugLog("HotspotManager - Hotspot added successfully", { type, coords });
          }
          break;
        }
        case "Image": {
          const file = await new Promise<File | null>((resolve) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (e) => resolve((e.target as HTMLInputElement).files?.[0] || null);
            input.click();
          });
          if (file) {
            const imageText = prompt("Entrez le texte de l'image") || "";
            hotspotCreators.image(coords, URL.createObjectURL(file), imageText);
            debugLog("HotspotManager - Hotspot added successfully", { type, coords });
          }
          break;
        }
        case "Gif": {
          const gifUrl = prompt("Saisissez le lien URL du GIF Giphy:") || "";
          if (gifUrl.includes("giphy.com") || gifUrl.includes("giphy")) {
            hotspotCreators.gif(coords, gifUrl);
            debugLog("HotspotManager - Hotspot added successfully", { type, coords });
          } else {
            alert("Erreur: Seuls les GIFs de Giphy sont supportés. Veuillez fournir un lien URL Giphy valide.");
          }
          break;
        }
        case "Video": {
          const videoUrl = prompt("Saisissez le lien URL de la vidéo YouTube:");
          // const videoId = videoUrl ? extractYouTubeVideoIdFromUrl(videoUrl) : null;
          if (videoUrl) {
            hotspotCreators.video(coords, videoUrl);
            debugLog("HotspotManager - Hotspot added successfully", { type, coords });
          } else {
            alert("Erreur: lien URL YouTube invalide.");
          }
          break;
        }
      }
    },
    [hotspotCreators, extractYouTubeVideoIdFromUrl, debugLog]
  );

  //  useHotspotCreation(viewerElement, handleHotspotEvent);

  // Debugging tools
  useEffect(() => {
    if (debugMode.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).toggleHotspotDebug = () => {
        debugMode.current = !debugMode.current;
        console.log(`HotspotManager - Hotspot debug mode ${debugMode.current ? "enabled" : "disabled"}`);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).listHotspots = () => {
        if (viewer) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const hotspots = (viewer as any).getHotSpots();
          console.table(hotspots);
        } else {
          console.log("HotspotManager - Viewer not available");
        }
      };
    }
  }, [viewer]);

  return null;
};

export default React.memo(HotspotManager);
