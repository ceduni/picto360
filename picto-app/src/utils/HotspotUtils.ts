import React, { JSX, useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import { TiInfoLarge } from "react-icons/ti";
import { AiOutlineLink, AiOutlinePicture } from "react-icons/ai";
import { MdOutlineGif, MdOutlineVideoLibrary } from "react-icons/md";
import { HotspotData, HotspotInstance } from "../components/HotspotManager";
import { IoShapesOutline } from "react-icons/io5";
import { BiSolidLabel } from "react-icons/bi";



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
      type?: string
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
            //   if (editable) {
            //     span.contentEditable = "true";
            //     setupEditableContent(span, charLimit);
            //   }
            }
            break;
          case "hyperlink":
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
        // debugLog("HotspotManager - Tooltip adjustments completed", { span });
      };
    };

    
    export const hotspotClickHandler = (event: any, args: HotspotData) =>{
        // onHotspotClick(args);
        console.log("Hotspot clicked:", args);
    }


    export const createHotspotInstance = (
        hotspot: HotspotData,
        clickHandler: (event: MouseEvent, args: HotspotData) => void
    ): HotspotInstance => {
        const icon = getIconForType(hotspot.type);
        const editable = hotspot.type === "text" || hotspot.type === "label";
        const charLimit = hotspot.type === "text" ? 300 : 30;

        return {
        ...hotspot,
        createTooltipFunc: renderTooltipContent(icon, hotspot.content || "", editable, charLimit, hotspot.type),
        clickHandlerFunc: clickHandler,
        clickHandlerArgs: hotspot
        };
    };


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