import React, { useCallback, useMemo, useRef, useEffect, JSX } from "react";
import ReactDOMServer from "react-dom/server";
import { AiOutlineLink, AiOutlinePicture } from "react-icons/ai";
import { MdOutlineGif, MdOutlineVideoLibrary, MdOutlineQuestionMark } from "react-icons/md";
import { TiInfoLarge } from "react-icons/ti";
import "./css/HotspotManager.css";
//import { HotspotCreationEvent } from "./types";

interface HotspotManagerProps {
  viewer: unknown;
  viewerElement: HTMLDivElement | null;
}

interface HotspotCreationEvent {
  type: string;
  coords: [number, number];
}

const TEXT_CHAR_LIMIT = 300;
const LABEL_HYPERLINK_CHAR_LIMIT = 30;

const HotspotManager: React.FC<HotspotManagerProps> = ({ viewer, viewerElement }) => {
  const hotspotCounter = useRef(0);
  const debugMode = useRef(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debugLog = useCallback((...args: any[]) => {
    if (debugMode.current) console.log("HotspotManager - [Debug]", ...args);
  }, []);

  const adjustTooltipPosition = useCallback(
    (element: HTMLElement) => {
      debugLog("HotspotManager - Adjusting element position", element);
      requestAnimationFrame(() => {
        // Anchoring the tooltip to the tip at the bottom
        const tooltipHeight = element.offsetHeight;
        element.style.marginTop = `-${tooltipHeight + 15}px`;

        // Horizontal positioning adjustment if element overflows the screen
        const elementRect = element.getBoundingClientRect();
        if (elementRect.right > window.innerWidth) {
          element.style.left = `${window.innerWidth - elementRect.width - 10}px`;
        }

        debugLog("HotspotManager - Adjusted element position", {
          width: element.style.width,
          maxWidth: element.style.maxWidth,
          marginTop: element.style.marginTop,
          left: element.style.left,
        });
      });
    },
    [debugLog]
  );

  const setupEditableContent = useCallback(
    (span: HTMLSpanElement, charLimit: number) => {
      const adjustOnInput = () => adjustTooltipPosition(span);
      const removeEmptyLines = () => {
        span.innerHTML = span.innerHTML
          .split("<br>")
          .filter((line) => line.trim() !== "")
          .join("<br>");
      };
      const enforceCharLimit = () => {
        if (span.innerText.length > charLimit) {
          span.innerText = span.innerText.slice(0, charLimit);
          alert(`Maximum character limit of ${charLimit} reached.`);
        }
      };

      span.addEventListener("blur", () => {
        removeEmptyLines();
        adjustOnInput();
        span.removeEventListener("input", adjustOnInput);
      });
      span.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          span.blur();
        }
      });
      span.addEventListener("input", () => {
        enforceCharLimit();
        adjustOnInput();
      });
      span.addEventListener("focus", (e) => e.stopPropagation());
      span.addEventListener("keydown", (e) => e.stopPropagation());
    },
    [adjustTooltipPosition]
  );

  const renderTooltipContent = useCallback(
    (
      icon: JSX.Element,
      content: string,
      editable: boolean,
      charLimit: number,
      type?: "text" | "label" | "hyperlink" | "image" | "gif" | "video" | "form"
    ) => {
      return (hotSpotDiv: HTMLElement) => {
        debugLog("Generating tooltip content", { type, content, editable, charLimit });

        if (type !== "label") {
          hotSpotDiv.classList.add("hotspot-manager__custom-tooltip");
          const iconDiv = document.createElement("div");
          iconDiv.innerHTML = ReactDOMServer.renderToString(icon);
          hotSpotDiv.appendChild(iconDiv);
        }

        const span = document.createElement("span");
        span.className = "hotspot-manager__content";

        switch (type) {
          case "text":
          case "label":
            {
              const textNode = document.createTextNode(content);
              span.appendChild(textNode);
              span.classList.add("hotspot-manager__content--text");
              if (editable) {
                span.contentEditable = "true";
                setupEditableContent(span, charLimit);
              }
            }
            break;
          case "hyperlink":
          case "form":
            span.innerHTML = content;
            break;
          case "image":
          case "gif": {
            const img = new Image();
            img.src = type === "gif" ? parseGiphyUrlToDirectGif(content) ?? "" : content;
            img.classList.add("hotspot-manager__graphics");
            img.onload = () => adjustTooltipPosition(span);
            span.appendChild(img);
            break;
          }
          case "video": {
            const iframe = document.createElement("iframe");
            iframe.src = `${content}?enablejsapi=1`;
            iframe.classList.add("hotspot-manager__video");
            iframe.onload = () => adjustTooltipPosition(span);
            span.appendChild(iframe);
            hotSpotDiv.addEventListener("mouseleave", () =>
              iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo"}', "*")
            );
            break;
          }
        }

        hotSpotDiv.appendChild(span);
        adjustTooltipPosition(span);
        debugLog("HotspotManager - Tooltip adjustments completed", { span });
      };
    },
    [adjustTooltipPosition, debugLog]
  );

  const addHotspotToViewer = useCallback(
    (
      coords: [number, number],
      icon: JSX.Element,
      content: string,
      editable: boolean,
      charLimit: number,
      type?: "text" | "label" | "hyperlink" | "image" | "gif" | "video" | "form",
      clickHandler?: () => void
    ) => {
      if (!viewer) {
        debugLog("HotspotManager - Viewer not available, cannot add hotspot");
        return;
      }

      const hotspotId = `hotspot-${Date.now()}-${hotspotCounter.current++}`;
      debugLog("HotspotManager - Adding hotspot to viewer...", { hotspotId, coords, type });

      const hotspot = {
        id: hotspotId,
        pitch: coords[0],
        yaw: coords[1],
        type: "custom",
        cssClass: type === "label" ? "hotspot-manager__label" : "hotspot-manager__custom_hotspot",
        createTooltipFunc: renderTooltipContent(icon, content, editable, charLimit, type),
        clickHandlerFunc: clickHandler,
      };

      try {
        //TODO: Replace any (if possible)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (viewer as any).addHotSpot(hotspot);
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
          <TiInfoLarge />,
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id suscipit ligula, non faucibus diam. Donec lacinia placerat mollis. Nam a est et risus finibus condimentum.",
          true,
          TEXT_CHAR_LIMIT,
          "text"
        ),
      label: (coords: [number, number]) =>
        addHotspotToViewer(coords, <></>, "Lorem ipsum dolor sit amet.", true, LABEL_HYPERLINK_CHAR_LIMIT, "label"),
      hyperlink: (coords: [number, number], url: string, hyperlinkText: string) =>
        //TODO: compress the URL into a tiny URL on a single line
        addHotspotToViewer(
          coords,
          <AiOutlineLink />,
          `<a href="${url}" target="_blank">${hyperlinkText}</a>`,
          false,
          LABEL_HYPERLINK_CHAR_LIMIT,
          "hyperlink"
        ),
      //TODO: add an optional title above/under (choice) the image
      image: (coords: [number, number], imageUrl: string) =>
        addHotspotToViewer(coords, <AiOutlinePicture />, imageUrl, false, LABEL_HYPERLINK_CHAR_LIMIT, "image"),
      gif: (coords: [number, number], gifUrl: string) => {
        const directUrl = parseGiphyUrlToDirectGif(gifUrl);
        if (directUrl) {
          addHotspotToViewer(coords, <MdOutlineGif />, directUrl, false, LABEL_HYPERLINK_CHAR_LIMIT, "gif");
        } else {
          console.error("HotspotManager - URL de gif invalide");
        }
      },
      video: (coords: [number, number], videoUrl: string) =>
        addHotspotToViewer(coords, <MdOutlineVideoLibrary />, videoUrl, false, LABEL_HYPERLINK_CHAR_LIMIT, "video"),
      form: (coords: [number, number], question: string, options: string[], correctOption: number) => {
        addHotspotToViewer(
          coords,
          <MdOutlineQuestionMark />,
          `${question}<ul>${options
            .map((opt, i) => `<li style="color: ${i === correctOption ? "green" : "red"}">${opt}</li>`)
            .join("")}</ul>`,
          false,
          LABEL_HYPERLINK_CHAR_LIMIT,
          "form"
        );
      },
    }),
    [addHotspotToViewer]
  );

  const extractYouTubeVideoIdFromUrl = useCallback((url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return url.match(regex)?.[1] || null;
  }, []);

  /*Giphy compatibility exclusively*/
  const parseGiphyUrlToDirectGif = useCallback((url: string): string | null => {
    try {
      const match = url.match(/media\/([a-zA-Z0-9]+)\/giphy\.gif/);
      const giphyId = match ? match[1] : url.split("-").pop();
      return giphyId ? `https://i.giphy.com/media/${giphyId}/giphy.gif` : url;
    } catch (error) {
      console.error("HotspotManager - Failed to parse Giphy URL:", error);
      return null;
    }

    return null;
  }, []);

  const handleHotspotCreation = useCallback(
    async (type: string, coords: [number, number]) => {
      debugLog("HotspotManager - Handling add hotspot", { type, coords });
      switch (type) {
        case "Form": {
          const question = prompt("Saisissez la question:");
          const options = Array.from(
            { length: parseInt(prompt("Saisissez le nombre d'options de réponses (minimum 2):") || "2", 10) },
            (_, i) => prompt(`Option ${i + 1}`) || ""
          );
          const correctOption = parseInt(prompt("Saisissez le numéro de la bonne réponse:") || "1", 10) - 1;
          if (question && options.length >= 2 && correctOption >= 0) {
            hotspotCreators.form(coords, question, options, correctOption);
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
            hotspotCreators.image(coords, URL.createObjectURL(file));
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
          const videoId = videoUrl ? extractYouTubeVideoIdFromUrl(videoUrl) : null;
          if (videoId) {
            hotspotCreators.video(coords, `https://www.youtube.com/embed/${videoId}`);
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

  useEffect(() => {
    if (viewer && viewerElement) {
      debugLog("HotspotManager - Setting up hotspot creation event listener");

      const handleHotspotCreationEvent = (event: Event) => {
        const { type, coords } = (event as CustomEvent<HotspotCreationEvent>).detail;
        handleHotspotCreation(type, coords);
      };

      viewerElement.addEventListener("hotspotCreation", handleHotspotCreationEvent);

      return () => {
        viewerElement.removeEventListener("hotspotCreation", handleHotspotCreationEvent);
      };
    }
  }, [viewer, viewerElement, handleHotspotCreation, debugLog]);

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
