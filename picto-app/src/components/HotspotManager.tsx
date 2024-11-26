import React, { useCallback, useMemo, useRef, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { AiOutlineLink, AiOutlinePicture } from "react-icons/ai";
import { MdOutlineGif, MdOutlineVideoLibrary, MdOutlineQuestionMark } from "react-icons/md";
import { TiInfoLarge } from "react-icons/ti";
import "./css/HotspotManager.css";

interface HotspotManagerProps {
  viewer: unknown;
}

const TEXT_CHAR_LIMIT = 300;
const LABEL_HYPERLINK_CHAR_LIMIT = 30;

const HotspotManager: React.FC<HotspotManagerProps> = ({ viewer }) => {
  const hotspotCounter = useRef(0);
  const debugMode = useRef(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debugLog = useCallback((...args: any[]) => {
    if (debugMode.current) {
      console.log(`HotspotManager - [HotspotManager Debug]`, ...args);
    }
  }, []);

  const adjustElementPosition = useCallback(
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

  const handleContentEditable = useCallback(
    (span: HTMLSpanElement, charLimit: number) => {
      const adjustOnInput = () => adjustElementPosition(span);
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
    [adjustElementPosition]
  );

  const createTooltipContent = useCallback(
    (
      icon: JSX.Element,
      content: string,
      editable: boolean,
      charLimit: number,
      type?: "text" | "label" | "hyperlink" | "image" | "gif" | "video" | "form"
    ) => {
      return (hotSpotDiv: HTMLElement) => {
        debugLog("HotspotManager - Creating tooltip content", { type, icon, content, editable, charLimit });

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
                handleContentEditable(span, charLimit);
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
            img.src = type === "gif" ? getDirectGifUrl(content) : content;
            img.classList.add("hotspot-manager__graphics");
            img.onload = () => adjustElementPosition(span);
            span.appendChild(img);
            break;
          }
          case "video": {
            const iframe = document.createElement("iframe");
            iframe.src = `${content}?enablejsapi=1`;
            iframe.classList.add("hotspot-manager__video");
            iframe.onload = () => adjustElementPosition(span);
            span.appendChild(iframe);
            hotSpotDiv.addEventListener("mouseleave", () =>
              iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo"}', "*")
            );
            break;
          }
        }

        hotSpotDiv.appendChild(span);
        adjustElementPosition(span);
        debugLog("HotspotManager - Tooltip adjustments completed", { span });
      };
    },
    [adjustElementPosition, debugLog]
  );

  const addHotspot = useCallback(
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
      debugLog("HotspotManager - Adding hotspot", { hotspotId, coords, type, content });

      const hotspot = {
        id: hotspotId,
        pitch: coords[0],
        yaw: coords[1],
        type: "custom",
        cssClass: type === "label" ? "hotspot-manager__label" : "hotspot-manager__custom_hotspot",
        createTooltipFunc: createTooltipContent(icon, content, editable, charLimit, type),
        clickHandlerFunc: clickHandler,
      };

      try {
        //TODO: Replace any (if possible)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (viewer as any).addHotSpot(hotspot);
        debugLog("HotspotManager - Hotspot added successfully", hotspotId);
      } catch (error) {
        console.error("HotspotManager - Failed to add hotspot", error);
      }
    },
    [viewer, createTooltipContent, debugLog]
  );

  const hotspotTypes = useMemo(
    () => ({
      text: (coords: [number, number]) =>
        addHotspot(
          coords,
          <TiInfoLarge />,
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id suscipit ligula, non faucibus diam. Donec lacinia placerat mollis. Nam a est et risus finibus condimentum.",
          true,
          TEXT_CHAR_LIMIT,
          "text"
        ),
      label: (coords: [number, number]) =>
        addHotspot(coords, <></>, "Lorem ipsum dolor sit amet.", true, LABEL_HYPERLINK_CHAR_LIMIT, "label"),
      hyperlink: (coords: [number, number], url: string, hyperlinkText: string) =>
        //TODO: compress the URL into a tiny URL on a single line
        addHotspot(
          coords,
          <AiOutlineLink />,
          `<a href="${url}" target="_blank">${hyperlinkText}</a>`,
          false,
          LABEL_HYPERLINK_CHAR_LIMIT,
          "hyperlink"
        ),
      //TODO: add an optional title above/under (choice) the image
      image: (coords: [number, number], imageUrl: string) =>
        addHotspot(coords, <AiOutlinePicture />, imageUrl, false, LABEL_HYPERLINK_CHAR_LIMIT, "image"),
      gif: (coords: [number, number], gifUrl: string) =>
        addHotspot(coords, <MdOutlineGif />, gifUrl, false, LABEL_HYPERLINK_CHAR_LIMIT, "gif"),
      video: (coords: [number, number], videoUrl: string) =>
        addHotspot(coords, <MdOutlineVideoLibrary />, videoUrl, false, LABEL_HYPERLINK_CHAR_LIMIT, "video"),
      form: (coords: [number, number], question: string, options: string[], correctOption: number) => {
        addHotspot(
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
    [addHotspot]
  );

  const extractYouTubeVideoId = useCallback((url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return url.match(regex)?.[1] || null;
  }, []);

  /*Giphy and Tenor compatibility*/
  const getDirectGifUrl = useCallback((url: string): string => {
    try {
      if (url.includes("giphy.com") || url.includes("giphy")) {
        const match = url.match(/media\/([a-zA-Z0-9]+)\/giphy\.gif/);
        const giphyId = match ? match[1] : url.split("-").pop();
        return giphyId ? `https://i.giphy.com/media/${giphyId}/giphy.gif` : url;
      } else if (url.includes("tenor.com")) {
        if (url.includes("/view/") || url.includes("/gif/")) {
          // Extract the numeric ID from "view" or "gif" URLs
          const match = url.match(/-([0-9]+)$/);
          const tenorId = match ? match[1] : null;
          return tenorId ? `https://media.tenor.com/${tenorId}/gif` : url;
        } else if (url.endsWith(".gif")) {
          // Handle direct GIF links
          const tenorId = url.split("/").pop()?.replace(".gif", "");
          return tenorId ? `https://media.tenor.com/${tenorId}/gif` : url;
        }
        return url; // Return original if no valid ID is found
      }
      return url; // Return original URL if it's not recognized
    } catch (error) {
      console.error("HotspotManager - Failed to parse GIF URL:", error);
      return url;
    }
  }, []);

  const handleAddHotspot = useCallback(
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
            hotspotTypes.form(coords, question, options, correctOption);
          } else {
            alert(
              "Erreur: Veuillez fournir une question valide, au moins deux options, et une réponse correcte valide."
            );
          }
          break;
        }
        case "Text":
          hotspotTypes.text(coords);
          break;
        case "Label":
          hotspotTypes.label(coords);
          break;
        case "Hyperlink": {
          const url = prompt("Soumettez le lien URL:") || "https://example.com";
          const text = prompt("Soumettez le texte de l'hyperlien:") || "Hyperlien";
          if (url) hotspotTypes.hyperlink(coords, url, text);
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
          if (file) hotspotTypes.image(coords, URL.createObjectURL(file));
          break;
        }
        case "Gif":
          hotspotTypes.gif(coords, prompt("Saisissez le lien URL du GIF:") || "");
          break;
        case "Video": {
          const videoUrl = prompt("Saisissez le lien URL de la vidéo YouTube:");
          const videoId = videoUrl ? extractYouTubeVideoId(videoUrl) : null;
          if (videoId) {
            hotspotTypes.video(coords, `https://www.youtube.com/embed/${videoId}`);
          } else {
            alert("Erreur: lien URL YouTube invalide.");
          }
          break;
        }
      }
      debugLog("HotspotManager - Hotspot added", { type, coords });
    },
    [hotspotTypes, extractYouTubeVideoId, debugLog]
  );

  useEffect(() => {
    if (viewer) {
      debugLog("HotspotManager - Setting up viewer addHotspot method");
      //TODO: Replace any (if possible)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (viewer as any).addHotspot = handleAddHotspot;
    }
  }, [viewer, handleAddHotspot, debugLog]);

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
