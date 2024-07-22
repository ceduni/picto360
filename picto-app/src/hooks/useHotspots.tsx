import { useCallback } from "react";
import ReactDOMServer from "react-dom/server";
import { AiOutlineLink } from "react-icons/ai";

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
        type: "info",
        text: "Text annotation",
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
          //hotSpotDiv.classList.add("label-tooltip");
          hotSpotDiv.innerHTML = "Label annotation";
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
        /*createTooltipFunc: function (hotSpotDiv: HTMLElement) {
          hotSpotDiv.classList.add("hyperlink-tooltip");


          hotSpotDiv.innerHTML = `${ReactDOMServer.renderToString(
            <AiOutlineLink />
          )} <a href="${url}" target="_blank">${displayText}</a>`;
        },*/
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
          hotSpotDiv.appendChild(span);
          span.style.width = span.scrollWidth - 20 + "px";
          span.style.marginLeft =
            -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + "px";
          span.style.marginTop = -span.scrollHeight - 12 + "px";
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
          const img = document.createElement("img");
          img.src = imageUrl;
          img.style.maxWidth = "200px";
          img.style.maxHeight = "200px";
          hotSpotDiv.appendChild(img);
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
