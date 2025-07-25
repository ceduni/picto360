import {
  require_react
} from "./chunk-W3JLIZXR.js";
import {
  __toESM
} from "./chunk-HFZ37CMS.js";

// node_modules/react-player/dist/Preview.js
var import_react = __toESM(require_react(), 1);
var ICON_SIZE = "64px";
var cache = {};
var Preview = ({
  src,
  light,
  oEmbedUrl,
  onClickPreview,
  playIcon,
  previewTabIndex,
  previewAriaLabel
}) => {
  const [image, setImage] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    if (!src || !light || !oEmbedUrl) return;
    fetchImage({ src, light, oEmbedUrl });
  }, [src, light, oEmbedUrl]);
  const fetchImage = async ({
    src: src2,
    light: light2,
    oEmbedUrl: oEmbedUrl2
  }) => {
    if (import_react.default.isValidElement(light2)) {
      return;
    }
    if (typeof light2 === "string") {
      setImage(light2);
      return;
    }
    if (cache[src2]) {
      setImage(cache[src2]);
      return;
    }
    setImage(null);
    const response = await fetch(oEmbedUrl2.replace("{url}", src2));
    const data = await response.json();
    if (data.thumbnail_url) {
      const fetchedImage = data.thumbnail_url.replace("height=100", "height=480").replace("-d_295x166", "-d_640");
      setImage(fetchedImage);
      cache[src2] = fetchedImage;
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      onClickPreview == null ? void 0 : onClickPreview(e);
    }
  };
  const handleClick = (e) => {
    onClickPreview == null ? void 0 : onClickPreview(e);
  };
  const isElement = import_react.default.isValidElement(light);
  const flexCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  const styles = {
    preview: {
      width: "100%",
      height: "100%",
      backgroundImage: image && !isElement ? `url(${image})` : void 0,
      backgroundSize: "cover",
      backgroundPosition: "center",
      cursor: "pointer",
      ...flexCenter
    },
    shadow: {
      background: "radial-gradient(rgb(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 60%)",
      borderRadius: ICON_SIZE,
      width: ICON_SIZE,
      height: ICON_SIZE,
      position: isElement ? "absolute" : void 0,
      ...flexCenter
    },
    playIcon: {
      borderStyle: "solid",
      borderWidth: "16px 0 16px 26px",
      borderColor: "transparent transparent transparent white",
      marginLeft: "7px"
    }
  };
  const defaultPlayIcon = import_react.default.createElement("div", { style: styles.shadow, className: "react-player__shadow" }, import_react.default.createElement("div", { style: styles.playIcon, className: "react-player__play-icon" }));
  return import_react.default.createElement(
    "div",
    {
      style: styles.preview,
      className: "react-player__preview",
      tabIndex: previewTabIndex,
      onClick: handleClick,
      onKeyPress: handleKeyPress,
      ...previewAriaLabel ? { "aria-label": previewAriaLabel } : {}
    },
    isElement ? light : null,
    playIcon || defaultPlayIcon
  );
};
var Preview_default = Preview;
export {
  Preview_default as default
};
//# sourceMappingURL=Preview-BUVGW2TP.js.map
