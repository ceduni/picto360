import { useCallback } from "react";
import ReactDOMServer from "react-dom/server";
import { AiOutlineLink, AiOutlinePicture } from "react-icons/ai";
import { MdOutlineGif } from "react-icons/md";
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

const TEXT_CHAR_LIMIT = 300; // Maximum characters allowed in text hotspot
const LABEL_HYPERLINK_CHAR_LIMIT = 30; // Maximum characters allowed in label and hyperlink

export const useHotspots = () => {
  const adjustVerticalPosition = (element: HTMLElement) => {
    setTimeout(() => {
      element.style.marginTop = `${-(element.offsetHeight + 20)}px`;
    }, 0);
  };

  const adjustWidth = (span: HTMLSpanElement) => {
    setTimeout(() => {
      span.style.width = "auto";
      span.style.width =
        span.scrollWidth > 500 ? "500px" : `${span.scrollWidth}px`; // Cap at 500px or adjust to content width
    }, 0);
  };

  const handleBlurOrEnter = (span: HTMLSpanElement, charLimit: number) => {
    const adjustPositionOnInput = () => {
      adjustVerticalPosition(span);
      adjustWidth(span);
    };

    const removeEmptyLineBreaks = () => {
      const lines = span.innerHTML
        .split("<br>")
        .filter((line) => line.trim() !== "");
      span.innerHTML = lines.join("<br>");
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
  };

  const createTooltipFuncFactory = (
    icon: JSX.Element,
    content: string,
    editable: boolean,
    charLimit: number
  ) => {
    return (hotSpotDiv: HTMLElement) => {
      hotSpotDiv.classList.add("custom-tooltip");
      const iconDiv = document.createElement("div");
      iconDiv.innerHTML = ReactDOMServer.renderToString(icon);
      iconDiv.style.display = "flex";
      iconDiv.style.alignItems = "center";
      iconDiv.style.justifyContent = "center";
      hotSpotDiv.appendChild(iconDiv);

      const span = document.createElement("span");
      span.innerHTML = content;
      if (editable) {
        span.contentEditable = "true";
        handleBlurOrEnter(span, charLimit);
      }
      hotSpotDiv.appendChild(span);

      adjustVerticalPosition(span);
      adjustWidth(span);

      span.addEventListener("focus", (event) => {
        event.stopPropagation(); // Prevent Pannellum from handling the focus event
      });

      span.addEventListener("keydown", (event) => {
        event.stopPropagation(); // Prevent Pannellum from handling the keydown event
      });
    };
  };

  const addTextHotspot = useCallback(
    (
      viewer: { addHotSpot: (arg0: HotSpot) => void },
      coords: any[],
      hotspotText: string
    ) => {
      const hotspot: HotSpot = {
        id: `hotspot-${Date.now()}`,
        pitch: coords[0],
        yaw: coords[1],
        type: "custom",
        cssClass: "custom-hotspot",
        createTooltipFunc: createTooltipFuncFactory(
          <TiInfoLarge />,
          hotspotText,
          true,
          TEXT_CHAR_LIMIT
        ),
      };
      viewer.addHotSpot(hotspot);
    },
    []
  );

  const addLabelHotspot = useCallback(
    (viewer: { addHotSpot: (arg0: HotSpot) => void }, coords: any[]) => {
      const hotspot: HotSpot = {
        id: `hotspot-${Date.now()}`,
        pitch: coords[0],
        yaw: coords[1],
        type: "custom",
        cssClass: "label-tooltip",
        createTooltipFunc: (hotSpotDiv: HTMLElement) => {
          hotSpotDiv.innerHTML = "Label annotation";
          hotSpotDiv.contentEditable = "true";
          hotSpotDiv.style.top = "50px"; // functional offset

          const limitText = () => {
            if (hotSpotDiv.innerText.length > LABEL_HYPERLINK_CHAR_LIMIT) {
              hotSpotDiv.innerText = hotSpotDiv.innerText.slice(
                0,
                LABEL_HYPERLINK_CHAR_LIMIT
              );
              alert(
                `Maximum character limit of ${LABEL_HYPERLINK_CHAR_LIMIT} reached.`
              );
            }
          };

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
            limitText();
          });

          hotSpotDiv.addEventListener("input", limitText);

          adjustVerticalPosition(hotSpotDiv);
        },
      };

      viewer.addHotSpot(hotspot);

      const hotSpotDiv = document.querySelector(
        `.pnlm-hotspot[data-id='${hotspot.id}']`
      ) as HTMLElement;
      if (hotSpotDiv) {
        const rect = hotSpotDiv.getBoundingClientRect();
        const offsetTop = rect.height / 2;
        hotSpotDiv.style.top = `${coords[0] - offsetTop}px`;
        hotSpotDiv.style.left = `${coords[1]}px`;
      }
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
      const hotspot: HotSpot = {
        id: `hotspot-${Date.now()}`,
        pitch: coords[0],
        yaw: coords[1],
        type: "custom",
        cssClass: "custom-hotspot",
        createTooltipFunc: (hotSpotDiv: HTMLElement) => {
          hotSpotDiv.classList.add("custom-tooltip");
          const iconDiv = document.createElement("div");
          iconDiv.innerHTML = ReactDOMServer.renderToString(<AiOutlineLink />);
          iconDiv.style.display = "flex";
          iconDiv.style.alignItems = "center";
          iconDiv.style.justifyContent = "center";
          hotSpotDiv.appendChild(iconDiv);

          const span = document.createElement("span");
          span.innerHTML = `<a href="${url}" target="_blank">${hyperlinkText}</a>`;
          hotSpotDiv.appendChild(span);

          adjustVerticalPosition(span);
          adjustWidth(span);

          const limitText = () => {
            if (span.innerText.length > LABEL_HYPERLINK_CHAR_LIMIT) {
              span.innerText = span.innerText.slice(
                0,
                LABEL_HYPERLINK_CHAR_LIMIT
              );
              alert(
                `Maximum character limit of ${LABEL_HYPERLINK_CHAR_LIMIT} reached.`
              );
            }
          };

          span.addEventListener("input", limitText);
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
      const hotspot: HotSpot = {
        id: `hotspot-${Date.now()}`,
        pitch: coords[0],
        yaw: coords[1],
        type: "custom",
        cssClass: "custom-hotspot",
        createTooltipFunc: (hotSpotDiv: HTMLElement) => {
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
        },
      };
      viewer.addHotSpot(hotspot);
    },
    []
  );

  const addGifHotspot = useCallback(
    (
      viewer: { addHotSpot: (arg0: HotSpot) => void },
      coords: any[],
      gifUrl: string
    ) => {
      const hotspot: HotSpot = {
        id: `hotspot-${Date.now()}`,
        pitch: coords[0],
        yaw: coords[1],
        type: "custom",
        cssClass: "custom-hotspot",
        createTooltipFunc: (hotSpotDiv: HTMLElement) => {
          hotSpotDiv.classList.add("custom-tooltip");
          const icon = document.createElement("div");
          icon.innerHTML = ReactDOMServer.renderToString(<MdOutlineGif />);
          icon.style.display = "flex";
          icon.style.alignItems = "center";
          icon.style.justifyContent = "center";
          hotSpotDiv.appendChild(icon);

          const span = document.createElement("span");
          const img = new Image();
          img.src = gifUrl;
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
    addGifHotspot,
  };
};
