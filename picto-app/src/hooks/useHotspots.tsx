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
  const adjustVerticalPosition = (element: HTMLElement) => {
    setTimeout(() => {
      element.style.marginTop = `${-(element.offsetHeight + 20)}px`;
    }, 0);
  };

  const handleBlurOrEnter = (span: HTMLSpanElement) => {
    const adjustPositionOnInput = () => adjustVerticalPosition(span);

    const removeEmptyLineBreaks = () => {
      const lines = span.innerHTML.split("<br>");
      const cleanedLines = lines.filter((line) => line.trim() !== "");
      span.innerHTML = cleanedLines.join("<br>");
    };

    span.addEventListener("blur", () => {
      removeEmptyLineBreaks();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const updatedText = span.innerHTML;
      adjustVerticalPosition(span);
      span.removeEventListener("input", adjustPositionOnInput);
    });

    span.addEventListener("keydown", (event) => {
      //stops the editing while allowing line breaks
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        span.blur();
      }
    });

    span.addEventListener("input", adjustPositionOnInput);
  };

  const addTextHotspot = useCallback(
    (
      viewer: { addHotSpot: (arg0: HotSpot) => void },
      coords: any[],
      hotspotText: string
    ) => {
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
          span.innerHTML = hotspotText;
          span.style.width = "auto";
          span.contentEditable = "true"; // Make the text editable
          hotSpotDiv.appendChild(span);

          adjustVerticalPosition(span);

          span.addEventListener("focus", (event) => {
            event.stopPropagation(); // Prevent Pannellum from handling the focus event
          });

          span.addEventListener("keydown", (event) => {
            event.stopPropagation(); // Prevent Pannellum from handling the keydown event
          });

          handleBlurOrEnter(span);
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
          hotSpotDiv.style.position = "absolute";
          hotSpotDiv.style.left = `${coords[1]}px`;
          hotSpotDiv.style.top = `${coords[0]}px`;

          hotSpotDiv.addEventListener("focus", (event) => {
            event.stopPropagation();
          });

          hotSpotDiv.addEventListener("keydown", (event) => {
            event.stopPropagation();
          });

          hotSpotDiv.addEventListener("blur", () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const updatedText = hotSpotDiv.innerHTML;
            adjustVerticalPosition(hotSpotDiv);
          });

          adjustVerticalPosition(hotSpotDiv); // TODO: rework the initial position of the label
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
      hyperlinkText: string
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
          span.innerHTML = `<a href="${url}" target="_blank">${hyperlinkText}</a>`;
          span.style.width = "auto";
          span.contentEditable = "true";
          hotSpotDiv.appendChild(span);

          adjustVerticalPosition(span);

          span.addEventListener("focus", (event) => {
            event.stopPropagation();
          });

          span.addEventListener("keydown", (event) => {
            event.stopPropagation();
          });

          handleBlurOrEnter(span);
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

          adjustVerticalPosition(span);

          span.addEventListener("focus", (event) => {
            event.stopPropagation();
          });

          span.addEventListener("keydown", (event) => {
            event.stopPropagation();
          });
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
