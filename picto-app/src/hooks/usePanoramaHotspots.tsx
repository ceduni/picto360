import { useCallback } from "react";
import ReactDOMServer from "react-dom/server";
import { AiOutlineLink, AiOutlinePicture } from "react-icons/ai";
import {
  MdOutlineGif,
  MdOutlineVideoLibrary,
  MdOutlineQuestionMark,
} from "react-icons/md";
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
  clickHandlerFunc?: (args: never) => void;
  clickHandlerArgs?: never;
  createTooltipFunc?: (hotSpotDiv: HTMLElement, args?: never) => void;
  createTooltipArgs?: never;
  id: string;
}

const TEXT_CHAR_LIMIT = 300; // Maximum characters allowed in text hotspot
const LABEL_HYPERLINK_CHAR_LIMIT = 30; // Maximum characters allowed in label and hyperlink

export const useHotspots = () => {
  const adjustVerticalPosition = (element: HTMLElement) => {
    setTimeout(() => {
      const lines = element.innerHTML.split("<br>");
      const lineCount = lines.length;
      const extraMargin = lineCount > 1 ? (lineCount - 1) * 10 : 0;
      element.style.marginTop = `${-(
        element.offsetHeight +
        20 +
        extraMargin
      )}px`;
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
    charLimit: number,
    annotationType?: "text" | "label" | "image" | "gif" | "video" | "form"
  ) => {
    return (hotSpotDiv: HTMLElement) => {
      if (annotationType !== "label") {
        hotSpotDiv.classList.add("custom-tooltip");
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
        handleBlurOrEnter(span, charLimit);
      }

      if (annotationType === "image" || annotationType === "gif") {
        const img = new Image();
        img.src = content;
        img.loading = "lazy";
        img.style.maxWidth = "500px";
        img.style.maxHeight = "500px";
        img.style.display = "block";
        img.onload = () => {
          const offsetY = -(img.height + 30);
          span.style.marginTop = `${offsetY}px`;
        };
        span.innerHTML = "";
        span.appendChild(img);
      } else if (annotationType === "video") {
        const iframe = document.createElement("iframe");
        iframe.src = `${content}?enablejsapi=1`; // added ?enablejsapi=1 to enable YouTube iframe API
        iframe.width = "640px";
        iframe.height = "360px";
        iframe.loading = "lazy";
        iframe.style.display = "block";
        iframe.onload = () => {
          const offsetY = -(iframe.height + 30);
          span.style.marginTop = `${offsetY}px`;
        };
        span.innerHTML = "";
        span.appendChild(iframe);

        const postMessageToIframe = (message: unknown) => {
          // sends a message to the iframe's content window to control the video
          iframe.contentWindow?.postMessage(JSON.stringify(message), "*");
        };

        const pauseVideo = () => {
          postMessageToIframe({ event: "command", func: "pauseVideo" });
        };

        hotSpotDiv.addEventListener("mouseleave", pauseVideo); // Added event listener to pause video on mouse leave
      } else {
        // default case supporting text and hyperlink hotspots
        span.style.maxWidth = "500px";
      }

      hotSpotDiv.appendChild(span);

      adjustVerticalPosition(span);

      if (
        annotationType !== "image" &&
        annotationType !== "gif" &&
        annotationType !== "video"
      ) {
        adjustWidth(span);
      }

      span.addEventListener("focus", (event) => {
        event.stopPropagation(); // prevent Pannellum from handling the focus event
      });

      span.addEventListener("keydown", (event) => {
        event.stopPropagation(); // prevent Pannellum from handling the keydown event
      });
    };
  };

  const addHotspot = useCallback(
    (
      viewer: { addHotSpot: (arg0: HotSpot) => void },
      coords: never[],
      icon: JSX.Element,
      content: string,
      editable: boolean,
      charLimit: number,
      annotationType?: "text" | "label" | "image" | "gif" | "video" | "form",
      clickHandlerFunc?: () => void
    ) => {
      let cssClassType;
      if (annotationType === "label") {
        cssClassType = "custom-label-tooltip";
      } else {
        cssClassType = "custom-hotspot";
      }
      const hotspot: HotSpot = {
        id: `hotspot-${Date.now()}`,
        pitch: coords[0],
        yaw: coords[1],
        type: "custom",
        cssClass: cssClassType,
        createTooltipFunc: createTooltipFuncFactory(
          icon,
          content,
          editable,
          charLimit,
          annotationType
        ),
        clickHandlerFunc,
      };
      viewer.addHotSpot(hotspot);
    },
    []
  );

  const addTextHotspot = useCallback(
    (
      viewer: { addHotSpot: (arg0: HotSpot) => void },
      coords: never[],
      hotspotText: string
    ) => {
      addHotspot(
        viewer,
        coords,
        <TiInfoLarge />,
        hotspotText,
        true,
        TEXT_CHAR_LIMIT
      );
    },
    [addHotspot]
  );

  const addLabelHotspot = useCallback(
    (viewer: { addHotSpot: (arg0: HotSpot) => void }, coords: never[]) => {
      addHotspot(
        viewer,
        coords,
        <></>,
        "Label annotation",
        true,
        LABEL_HYPERLINK_CHAR_LIMIT,
        "label"
      );
    },
    [addHotspot]
  );

  const addHyperlinkHotspot = useCallback(
    (
      viewer: { addHotSpot: (arg0: HotSpot) => void },
      coords: never[],
      url: string,
      hyperlinkText: string
    ) => {
      const content = `<a href="${url}" target="_blank">${hyperlinkText}</a>`;
      addHotspot(
        viewer,
        coords,
        <AiOutlineLink />,
        content,
        false,
        LABEL_HYPERLINK_CHAR_LIMIT,
        undefined,
        () => {
          window.open(url, "_blank");
        }
      );
    },
    [addHotspot]
  );

  const addImageHotspot = useCallback(
    (
      viewer: { addHotSpot: (arg0: HotSpot) => void },
      coords: never[],
      imageUrl: string
    ) => {
      addHotspot(
        viewer,
        coords,
        <AiOutlinePicture />,
        imageUrl,
        false,
        LABEL_HYPERLINK_CHAR_LIMIT,
        "image"
      );
    },
    [addHotspot]
  );

  const addGifHotspot = useCallback(
    (
      viewer: { addHotSpot: (arg0: HotSpot) => void },
      coords: never[],
      gifUrl: string
    ) => {
      addHotspot(
        viewer,
        coords,
        <MdOutlineGif />,
        gifUrl,
        false,
        LABEL_HYPERLINK_CHAR_LIMIT,
        "gif"
      );
    },
    [addHotspot]
  );

  const addVideoHotspot = useCallback(
    (
      viewer: { addHotSpot: (arg0: HotSpot) => void },
      coords: never[],
      videoUrl: string
    ) => {
      addHotspot(
        viewer,
        coords,
        <MdOutlineVideoLibrary />,
        videoUrl,
        false,
        LABEL_HYPERLINK_CHAR_LIMIT,
        "video"
      );
    },
    [addHotspot]
  );

  const addFormHotspot = useCallback(
    (
      viewer: { addHotSpot: (arg0: HotSpot) => void },
      coords: never[],
      question: string,
      options: string[],
      correctOption: number,
      //nbOptions: number
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
          icon.innerHTML = ReactDOMServer.renderToString(
            <MdOutlineQuestionMark />
          );
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
              if (index === correctOption) {
                optionItem.style.color = "green";
              } else {
                optionItem.style.color = "red";
              }
            });
            optionsList.appendChild(optionItem);
          });
          span.appendChild(questionElement);
          span.appendChild(optionsList);

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
    addVideoHotspot,
    addFormHotspot,
  };
};
