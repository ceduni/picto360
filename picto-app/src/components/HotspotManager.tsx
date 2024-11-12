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
      const lines = element.innerHTML.split("<br>").length;
      const offsetY = -(element.offsetHeight + 15 + (lines > 1 ? (lines - 1) * 10 : 0));
      element.style.marginTop = `${offsetY}px`;
      element.style.width = !isMedia && element.scrollWidth > 500 ? "500px" : `${element.scrollWidth}px`;
    });
  }, []);

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
      type?: "text" | "label" | "image" | "gif" | "video" | "form"
    ) => {
      return (hotSpotDiv: HTMLElement) => {
        if (type !== "label") {
          hotSpotDiv.classList.add("hotspot-manager__custom-tooltip");
          const iconDiv = document.createElement("div");
          iconDiv.innerHTML = ReactDOMServer.renderToString(icon);
          hotSpotDiv.appendChild(iconDiv);
        }

        const span = document.createElement("span");
        span.innerHTML = content;

        if (editable) {
          span.contentEditable = "true";
          handleContentEditable(span, charLimit);
        }

        if (type === "image" || type === "gif") {
          const img = new Image();
          img.src = type === "gif" ? getDirectGifUrl(content) : content;
          img.loading = "lazy";
          img.style.maxWidth = "500px";
          img.style.maxHeight = "500px";
          img.onload = () => adjustElementPosition(span, true);
          span.innerHTML = "";
          span.appendChild(img);
        } else if (type === "video") {
          const iframe = document.createElement("iframe");
          iframe.src = `${content}?enablejsapi=1`;
          iframe.width = "640px";
          iframe.height = "360px";
          iframe.loading = "lazy";
          //iframe.style.display = "block";

          // Adjust the tooltip position specifically for the video
          iframe.onload = () => {
            adjustElementPosition(span, true);
            span.style.marginTop = `${parseFloat(span.style.marginTop) - 10}px`; // Adding an extra offset to push it higher
          };

          span.innerHTML = "";
          span.appendChild(iframe);
          hotSpotDiv.addEventListener("mouseleave", () =>
            iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo"}', "*")
          );
        } else {
          adjustElementPosition(span);
        }
        hotSpotDiv.appendChild(span);
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
      type?: "text" | "label" | "image" | "gif" | "video" | "form",
      clickHandler?: () => void
    ) => {
      if (!viewer) return;

      const hotspot = {
        id: `hotspot-${Date.now()}`,
        pitch: coords[0],
        yaw: coords[1],
        type: "custom",
        cssClass: type === "label" ? "hotspot-manager__label-tooltip" : "hotspot-manager__hotspot",
        createTooltipFunc: createTooltipContent(icon, content, editable, charLimit, type),
        clickHandlerFunc: clickHandler,
      };

      //TODO: Remove any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (viewer as any).addHotSpot(hotspot);
    },
    [viewer, createTooltipContent]
  );

  const hotspotTypes = useMemo(
    () => ({
      text: (coords: [number, number]) =>
        addHotspot(coords, <TiInfoLarge />, "Default text content", true, TEXT_CHAR_LIMIT),
      label: (coords: [number, number]) =>
        addHotspot(coords, <></>, "Label annotation", true, LABEL_HYPERLINK_CHAR_LIMIT, "label"),
      hyperlink: (coords: [number, number], url: string, hyperlinkText: string) =>
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
      //TODO: add an optional title above/under (choice) the image
      image: (coords: [number, number], imageUrl: string) =>
        addHotspot(coords, <AiOutlinePicture />, imageUrl, false, LABEL_HYPERLINK_CHAR_LIMIT, "image"),
      gif: (coords: [number, number], gifUrl: string) =>
        addHotspot(coords, <MdOutlineGif />, gifUrl, false, LABEL_HYPERLINK_CHAR_LIMIT, "gif"),
      video: (coords: [number, number], videoUrl: string) =>
        addHotspot(coords, <MdOutlineVideoLibrary />, videoUrl, false, LABEL_HYPERLINK_CHAR_LIMIT, "video"),
      form: (coords: [number, number], question: string, options: string[], correctOption: number) => {
        const icon = <MdOutlineQuestionMark />;
        const content = `${question}<ul>${options
          .map((opt, i) => `<li style="color: ${i === correctOption ? "green" : "red"}">${opt}</li>`)
          .join("")}</ul>`;
        addHotspot(coords, icon, content, false, LABEL_HYPERLINK_CHAR_LIMIT, "form");
      },
    }),
    [addHotspot]
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
    async (type: string, coords: [number, number]) => {
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
          const text = prompt("Soumettez le texte de l'hyperlien:") || "Default hyperlink text";
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
    },
    [hotspotTypes, extractYouTubeVideoId]
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
