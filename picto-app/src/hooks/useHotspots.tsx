import { useCallback } from "react";
import ReactDOMServer from "react-dom/server";
import { AiOutlineLink, AiOutlinePicture } from "react-icons/ai";
import { TiInfoLarge } from "react-icons/ti";

interface HotSpot {
  pitch: number;
  yaw: number;
  type: string;
  text?: string;
  URL?: string;
  sceneId?: string;
  targetYaw?: number;
  targetPitch?: number;
  cssClass?: string;
  clickHandlerFunc?: (args: any) => void;
  clickHandlerArgs?: any;
  createTooltipFunc?: (hotSpotDiv: HTMLElement, args?: any) => void;
  createTooltipArgs?: any;
  id: string;
}

export const useHotspots = () => {
  const addTextHotspot = useCallback(
    (viewer: { addHotSpot: (arg0: HotSpot) => void }, coords: any[]) => {
      const hotspotId = `hotspot-${Date.now()}`;

      const hotspot: HotSpot = {
        id: hotspotId,
        pitch: coords[0],
        yaw: coords[1],
        type: "custom",
        cssClass: "custom-hotspot",
        createTooltipFunc: function textHotspot(hotSpotDiv) {
          hotSpotDiv.classList.add("custom-tooltip");
          const icon = document.createElement("div");
          icon.innerHTML = ReactDOMServer.renderToString(<TiInfoLarge />);
          icon.style.display = "flex";
          icon.style.alignItems = "center";
          icon.style.justifyContent = "center";
          hotSpotDiv.appendChild(icon);

          const span = document.createElement("span");
          span.innerHTML = "Text annotation";
          span.style.width = "auto";
          hotSpotDiv.appendChild(span);

          // Adjust the vertical position after the span is added to the DOM
          setTimeout(() => {
            span.style.marginTop = `${-(span.offsetHeight + 20)}px`;
          }, 0);
        },
      };
      viewer.addHotSpot(hotspot);
    },
    []
  );

  const addLabelHotspot = useCallback(
    (viewer: { addHotSpot: (arg0: HotSpot) => void }, coords: any[]) => {
      const hotspotId = `hotspot-${Date.now()}`;

      const hotspot: HotSpot = {
        id: hotspotId,
        pitch: coords[0],
        yaw: coords[1],
        type: "custom",
        createTooltipFunc: function (hotSpotDiv: HTMLElement) {
          hotSpotDiv.innerHTML = "Label annotation";
          hotSpotDiv.contentEditable = "true";
          hotSpotDiv.addEventListener("blur", () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const updatedText = hotSpotDiv.innerHTML;
          });
        },
        cssClass: "label-tooltip",
      };

      viewer.addHotSpot(hotspot);
    },
    []
  );

  const addHyperlinkHotspot = useCallback(
    (
      viewer: { addHotSpot: (arg0: HotSpot) => void },
      coords: any[],
      url: string,
      displayText: string
    ) => {
      const hotspotId = `hotspot-${Date.now()}`;

      const hotspot: HotSpot = {
        id: hotspotId,
        pitch: coords[0],
        yaw: coords[1],
        type: "custom",
        cssClass: "custom-hotspot",
        createTooltipFunc: function hyperlinkHotspot(hotSpotDiv) {
          hotSpotDiv.classList.add("custom-tooltip");
          const icon = document.createElement("div");
          icon.innerHTML = ReactDOMServer.renderToString(<AiOutlineLink />);
          icon.style.display = "flex";
          icon.style.alignItems = "center";
          icon.style.justifyContent = "center";
          hotSpotDiv.appendChild(icon);

          const span = document.createElement("span");
          span.innerHTML = `<a href="${url}" target="_blank">${displayText}</a>`;
          span.style.width = "auto";
          hotSpotDiv.appendChild(span);

          setTimeout(() => {
            span.style.marginTop = `${-(span.offsetHeight + 20)}px`;
          }, 0);
        },
      };
      viewer.addHotSpot(hotspot);
    },
    []
  );

  const addImageHotspot = useCallback(
    (
      viewer: { addHotSpot: (arg0: HotSpot) => void },
      coords: any[],
      imageUrl: string
    ) => {
      const hotspotId = `hotspot-${Date.now()}`;

      const hotspot: HotSpot = {
        id: hotspotId,
        pitch: coords[0],
        yaw: coords[1],
        type: "custom",
        cssClass: "custom-hotspot",
        createTooltipFunc: function imageHotspot(hotSpotDiv) {
          hotSpotDiv.classList.add("custom-tooltip");
          const icon = document.createElement("div");
          icon.innerHTML = ReactDOMServer.renderToString(<AiOutlinePicture />);
          icon.style.display = "flex";
          icon.style.alignItems = "center";
          icon.style.justifyContent = "center";
          hotSpotDiv.appendChild(icon);

          const span = document.createElement("span");
          const img = new Image();
          img.src = imageUrl;
          img.style.maxWidth = "500px";
          img.style.maxHeight = "500px";
          img.style.display = "block";
          img.onload = () => {
            const offsetY = -(img.height + 30);
            span.style.marginTop = `${offsetY}px`;
          };
          span.appendChild(img);
          hotSpotDiv.appendChild(span);
        },
      };
      viewer.addHotSpot(hotspot);
    },
    []
  );

  return {
    addTextHotspot,
    addLabelHotspot,
    addHyperlinkHotspot,
    addImageHotspot,
  };
};
