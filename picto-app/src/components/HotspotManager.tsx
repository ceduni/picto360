import React, { useCallback, useMemo } from "react";
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
  const adjustElementPosition = useCallback((element: HTMLElement, isMedia = false) => {
    requestAnimationFrame(() => {
      const lines = element.innerHTML.split("<br>");
      const lineCount = lines.length;
      const extraMargin = lineCount > 1 ? (lineCount - 1) * 10 : 0;
      const offsetY = isMedia ? -(element.offsetHeight + 30) : -(element.offsetHeight + 20 + extraMargin);
      element.style.marginTop = `${offsetY}px`;

      if (!isMedia) {
        element.style.width = element.scrollWidth > 500 ? "500px" : `${element.scrollWidth}px`;
      }
    });
  }, []);

  const handleContentEditable = useCallback(
    (span: HTMLSpanElement, charLimit: number) => {
      const adjustPositionOnInput = () => adjustElementPosition(span);
      const removeEmptyLineBreaks = () => {
        span.innerHTML = span.innerHTML
          .split("<br>")
          .filter((line) => line.trim() !== "")
          .join("<br>");
      };

      const limitText = () => {
        if (span.innerText.length > charLimit) {
          span.innerText = span.innerText.slice(0, charLimit);
          alert(`Maximum character limit of ${charLimit} reached.`);
        }
      };

      // Focus switch on hotspot's tooltip
      span.addEventListener("blur", () => {
        removeEmptyLineBreaks();
        adjustPositionOnInput();
        span.removeEventListener("input", adjustPositionOnInput);
      });

      // Empty line breaks removal
      span.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          span.blur();
        }
      });

      // Character limit
      span.addEventListener("input", () => {
        limitText();
        adjustPositionOnInput();
      });

      span.addEventListener("focus", (event) => event.stopPropagation());
      span.addEventListener("keydown", (event) => event.stopPropagation());
    },
    [adjustElementPosition]
  );

  const createTooltipContent = useCallback(
    (
      icon: JSX.Element,
      content: string,
      editable: boolean,
      charLimit: number,
      annotationType?: "text" | "label" | "image" | "gif" | "video" | "form"
    ) => {
      return (hotSpotDiv: HTMLElement) => {
        if (annotationType !== "label") {
          hotSpotDiv.classList.add("hotspot-manager__custom-tooltip");
          const iconDiv = document.createElement("div");
          iconDiv.innerHTML = ReactDOMServer.renderToString(icon);
          iconDiv.style.display = "flex";
          iconDiv.style.alignItems = "center";
          iconDiv.style.justifyContent = "center";
          hotSpotDiv.appendChild(iconDiv);
        }

        const span = document.createElement("span");
        span.innerHTML = content;

        if (editable) {
          span.contentEditable = "true";
          handleContentEditable(span, charLimit);
        }

        if (annotationType === "image" || annotationType === "gif") {
          const img = new Image();
          img.src = annotationType === "gif" ? getDirectGifUrl(content) : content;
          img.loading = "lazy";
          img.style.maxWidth = "500px";
          img.style.maxHeight = "500px";
          img.style.display = "block";
          img.onload = () => adjustElementPosition(span, true);
          span.innerHTML = "";
          span.appendChild(img);
        } else if (annotationType === "video") {
          const iframe = document.createElement("iframe");
          iframe.src = `${content}?enablejsapi=1`;
          iframe.width = "640px";
          iframe.height = "360px";
          iframe.loading = "lazy";
          iframe.style.display = "block";
          iframe.onload = () => adjustElementPosition(span, true);
          span.innerHTML = "";
          span.appendChild(iframe);

          const pauseVideo = () => {
            iframe.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "pauseVideo" }), "*");
          };

          hotSpotDiv.addEventListener("mouseleave", pauseVideo);
        } else {
          span.style.maxWidth = "500px";
          adjustElementPosition(span);
        }

        hotSpotDiv.appendChild(span);
        //adjustElementPosition(span);
      };
    },
    [adjustElementPosition, handleContentEditable]
  );
  const addHotspot = useCallback(
    (
      coords: [number, number],
      icon: JSX.Element,
      content: string,
      editable: boolean,
      charLimit: number,
      annotationType?: "text" | "label" | "image" | "gif" | "video" | "form",
      clickHandlerFunc?: () => void
    ) => {
      if (!viewer) return;

      const cssClass = annotationType === "label" ? "hotspot-manager__label-tooltip" : "hotspot-manager__hotspot";

      const hotspot = {
        id: `hotspot-${Date.now()}`,
        pitch: coords[0],
        yaw: coords[1],
        type: "custom",
        cssClass,
        createTooltipFunc: createTooltipContent(icon, content, editable, charLimit, annotationType),
        clickHandlerFunc,
      };

      //TODO: Remove any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (viewer as any).addHotSpot(hotspot);
    },
    [viewer, createTooltipContent]
  );

  const hotspotTypes = useMemo(
    () => ({
      text: (coords: [number, number], hotspotText = "Default text content") =>
        addHotspot(coords, <TiInfoLarge />, hotspotText, true, TEXT_CHAR_LIMIT),
      label: (coords: [number, number]) =>
        addHotspot(coords, <></>, "Label annotation", true, LABEL_HYPERLINK_CHAR_LIMIT, "label"),
      hyperlink: (coords: [number, number], url = "https://example.com", hyperlinkText = "Default hyperlink text") =>
        //TODO: compress the URL into a tiny URL on a single line
        addHotspot(
          coords,
          <AiOutlineLink />,
          `<a href="${url}" target="_blank">${hyperlinkText}</a>`,
          false,
          LABEL_HYPERLINK_CHAR_LIMIT,
          undefined,
          () => window.open(url, "_blank")
        ),
      image: (coords: [number, number], imageUrl: string) =>
        addHotspot(coords, <AiOutlinePicture />, imageUrl, false, LABEL_HYPERLINK_CHAR_LIMIT, "image"),
      gif: (coords: [number, number], gifUrl: string) =>
        addHotspot(coords, <MdOutlineGif />, gifUrl, false, LABEL_HYPERLINK_CHAR_LIMIT, "gif"),
      video: (coords: [number, number], videoUrl: string) =>
        addHotspot(coords, <MdOutlineVideoLibrary />, videoUrl, false, LABEL_HYPERLINK_CHAR_LIMIT, "video"),
      form: (coords: [number, number], question: string, options: string[], correctOption: number) => {
        const hotspot = {
          id: `hotspot-${Date.now()}`,
          pitch: coords[0],
          yaw: coords[1],
          type: "custom",
          cssClass: "hotspot-manager__hotspot",
          createTooltipFunc: (hotSpotDiv: HTMLElement) => {
            hotSpotDiv.classList.add("hotspot-manager__custom-tooltip");
            const icon = document.createElement("div");
            icon.innerHTML = ReactDOMServer.renderToString(<MdOutlineQuestionMark />);
            icon.style.display = "flex";
            icon.style.alignItems = "center";
            icon.style.justifyContent = "center";
            hotSpotDiv.appendChild(icon);

            const span = document.createElement("span");
            const questionElement = document.createElement("div");
            questionElement.innerText = question;

            const optionsList = document.createElement("ul");
            optionsList.style.listStyleType = "upper-alpha";
            options.forEach((option, index) => {
              const optionItem = document.createElement("li");
              optionItem.innerText = option;
              optionItem.style.cursor = "pointer";
              optionItem.addEventListener("click", () => {
                optionItem.style.color = index === correctOption ? "green" : "red";
              });
              optionsList.appendChild(optionItem);
            });
            span.appendChild(questionElement);
            span.appendChild(optionsList);

            hotSpotDiv.appendChild(span);
            adjustElementPosition(span);
          },
        };
        //TODO: Remove any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (viewer as any).addHotSpot(hotspot);
      },
    }),
    [addHotspot, adjustElementPosition]
  );
  const extractYouTubeVideoId = useCallback((url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return url.match(regex)?.[1] || null;
  }, []);

  const getDirectGifUrl = useCallback((url: string): string => {
    try {
      if (url.includes("giphy.com") || url.includes("giphy")) {
        const match = url.match(/media\/([a-zA-Z0-9]+)\/giphy\.gif/);
        const giphyId = match ? match[1] : url.split("-").pop();
        return giphyId ? `https://i.giphy.com/media/${giphyId}/giphy.gif` : url;
      } else if (url.includes("imgur.com")) {
        const imgurId = url.split("/").pop()?.split(".")[0];
        return imgurId ? `https://i.imgur.com/${imgurId}.gif` : url;
      } else if (url.includes("reddit.com")) {
        return url.replace("https://preview.redd.it", "https://i.redd.it");
      } else if (url.includes("tumblr.com")) {
        return url.match(/\.(gif|gifv|mp4)$/) ? url.replace(/\.gifv?$/, ".gif") : `${url}.gif`;
      } else if (url.includes("tenor.com")) {
        const tenorId = url.split("-").pop();
        return tenorId ? `https://media.tenor.com/${tenorId}.gif` : url;
      } else if (url.match(/\.(gifv|mp4)$/)) {
        // Convert other .gifv or .mp4 links to .gif
        return url.replace(/\.(gifv|mp4)$/, ".gif");
      }
    } catch (error) {
      console.error("Failed to parse GIF URL:", error);
    }
    return url;
  }, []);

  const handleAddHotspot = useCallback(
    async (annotationType: string, coords: [number, number]) => {
      switch (annotationType) {
        case "Form": {
          const question = prompt("Entrez la question:");
          const nbOptions = parseInt(prompt("Entrez le nombre d'options (minimum 2):") || "2", 10);
          const options = Array.from(
            { length: nbOptions },
            (_, i) => prompt(`Entrez le texte pour le choix ${i + 1}`) || ""
          );
          const correctOption = parseInt(prompt("Entrez le numéro de la bonne réponse :") || "1", 10) - 1;

          if (question && options.length >= 2 && correctOption >= 0 && correctOption < options.length) {
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
        case "Hyperlink":
          hotspotTypes.hyperlink(coords);
          break;
        case "Image": {
          const imageFile = await new Promise<File | null>((resolve) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (e) => resolve((e.target as HTMLInputElement).files?.[0] || null);
            input.click();
          });
          if (imageFile) {
            hotspotTypes.image(coords, URL.createObjectURL(imageFile));
          }
          break;
        }
        case "Gif": {
          const gifUrl = prompt("Enter the URL of the GIF:");
          if (gifUrl) {
            const directGifUrl = getDirectGifUrl(gifUrl);
            hotspotTypes.gif(coords, directGifUrl);
          }
          break;
        }
        case "Video": {
          const videoUrl = prompt("Enter the YouTube video URL:");
          if (videoUrl) {
            const videoId = extractYouTubeVideoId(videoUrl);
            if (videoId) {
              hotspotTypes.video(coords, `https://www.youtube.com/embed/${videoId}`);
            } else {
              alert("Invalid YouTube URL");
            }
          }
          break;
        }
        default:
          break;
      }
    },
    [hotspotTypes, extractYouTubeVideoId, getDirectGifUrl]
  );

  React.useEffect(() => {
    if (viewer) {
      //TODO: Remove any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (viewer as any).addHotspot = handleAddHotspot;
    }
  }, [viewer, handleAddHotspot]);

  return null;
};

export default React.memo(HotspotManager);
