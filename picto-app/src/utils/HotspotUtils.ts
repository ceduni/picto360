import React, { JSX, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import { TiInfoLarge } from "react-icons/ti";
import { AiOutlineLink, AiOutlinePicture } from "react-icons/ai";
import { MdOutlineGif, MdOutlineVideoLibrary } from "react-icons/md";
import { HotspotData, HotspotInstance } from "./Types";
import { IoShapesOutline } from "react-icons/io5";
import { BiSolidLabel } from "react-icons/bi";
import ReactPlayer from "react-player";
import { createRoot } from "react-dom/client";
import { VideoTooltip } from "@/components/ui/VideoTooltip";



export const getIconForType = (type:string):JSX.Element => {
    switch (type) {
      case "text": return React.createElement(TiInfoLarge);
      case "label": return React.createElement (BiSolidLabel);
      case "hyperlink": return React.createElement (AiOutlineLink );
      case "image": return React.createElement (AiOutlinePicture );
      case "gif": return React.createElement (MdOutlineGif );
      case "video": return React.createElement (MdOutlineVideoLibrary) ;
      case "forme": return React.createElement (IoShapesOutline) ;
      default: return React.createElement (TiInfoLarge) ;
    }
  }


const setupEditableContent = (span: HTMLSpanElement, charLimit: number) => {
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
    };

  const adjustTooltipPosition = (element: HTMLElement) => {
    //   debugLog("HotspotManager - Adjusting element position", element);
      requestAnimationFrame(() => {
        // Anchoring the tooltip to the tip at the bottom
        const tooltipHeight = element.offsetHeight;
        element.style.marginTop = `-${tooltipHeight + 15}px`;

        // Horizontal positioning adjustment if element overflows the screen
        const elementRect = element.getBoundingClientRect();
        if (elementRect.right > window.innerWidth) {
          element.style.left = `${window.innerWidth - elementRect.width - 10}px`;
        }

        // debugLog("HotspotManager - Adjusted element position", {
        //   width: element.style.width,
        //   maxWidth: element.style.maxWidth,
        //   marginTop: element.style.marginTop,
        //   left: element.style.left,
        // });
      });
    };

export const renderTooltipContent = (
      icon: JSX.Element,
      content: string,
      editable: boolean,
      charLimit: number,
      type?: string,
      url?:string
    ) => {
      return (hotSpotDiv: HTMLElement) => {
        // debugLog("Generating tooltip content", { type, content, editable, charLimit });

        // if (type !== "label") {
          hotSpotDiv.classList.add("hotspot-manager__custom-tooltip");
          const iconDiv = document.createElement("div");
          iconDiv.innerHTML = ReactDOMServer.renderToString(icon);
          hotSpotDiv.appendChild(iconDiv);

        // }

        const span = document.createElement("span");
        span.className = "hotspot-manager__content";

        switch (type) {
          case "text":
          case "label":
            {
              const textNode = document.createTextNode(content);
              span.appendChild(textNode);
              span.classList.add("hotspot-manager__content--text");
            }
            break;
          case "hyperlink":
            span.innerHTML = `<a href="${url}" target="_blank">${content}</a>`;
            break
          case "forme":
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
            const videoId = content ? extractYouTubeVideoIdFromUrl(content) : null;
            if (!content) {
              alert("Erreur: lien URL YouTube invalide.");
              break;
            }

            const mountPoint = document.createElement("div");

            const root = createRoot(mountPoint);
            root.render(React.createElement(VideoTooltip, { src: content }));
            mountPoint.classList.add("hotspot-manager__video");
            setTimeout(() => adjustTooltipPosition(span), 0);
            span.appendChild(mountPoint);
            
            break;
          }
        }

        hotSpotDiv.appendChild(span);
        adjustTooltipPosition(span);
        // debugLog("HotspotManager - Tooltip adjustments completed", { span });
      };
    };

    export const createHotspotInstance = (
        hotspot: HotspotData,
        clickHandler: (event: MouseEvent, args: HotspotData) => void
    ): HotspotInstance => {
        const icon = getIconForType(hotspot.type);
        const editable = hotspot.type === "text" || hotspot.type === "label";
        const charLimit = hotspot.type === "text" ? 300 : 30;

        return {
          ...hotspot,
          createTooltipFunc: renderTooltipContent(icon, hotspot.content || "", editable, charLimit, hotspot.type,hotspot.url_text),
          clickHandlerFunc: clickHandler,
          clickHandlerArgs: hotspot
        };
    };

    export const deleteHotspotInstance = (viewer:any,hotspot:HotspotData) => {
      if(!viewer){
        return
      }
      (viewer as any).removeHotSpot(hotspot.id);
    }


    /*Giphy compatibility exclusively*/
    export const parseGiphyUrlToDirectGif = (url: string): string | null => {
      try {
          const match = url.match(/media\/([a-zA-Z0-9]+)\/giphy\.gif/);
          const giphyId = match ? match[1] : url.split("-").pop();
          return giphyId ? `https://i.giphy.com/media/${giphyId}/giphy.gif` : url;
      } catch (error) {
          console.error("HotspotManager - Failed to parse Giphy URL:", error);
          return null;
      }
  }

  export const extractYouTubeVideoIdFromUrl = (url: string) => {
      const regex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      return url.match(regex)?.[1] || null;
    };