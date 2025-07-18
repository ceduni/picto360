"use client";
import {
  Hls,
  MediaTracksMixin
} from "./chunk-QZKXMT46.js";
import {
  CustomVideoElement
} from "./chunk-37E64XV7.js";
import {
  require_react
} from "./chunk-W3JLIZXR.js";
import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __publicField,
  __toESM
} from "./chunk-HFZ37CMS.js";

// node_modules/hls-video-element/dist/react.js
var import_react = __toESM(require_react());

// node_modules/hls-video-element/dist/hls-video-element.js
var HlsVideoMixin = (superclass) => {
  var _a, _airplaySourceEl, _config, _HlsVideo_instances, destroy_fn, _toggleHlsLoad, upgradeProperty_fn;
  return _a = class extends superclass {
    constructor() {
      super();
      __privateAdd(this, _HlsVideo_instances);
      __privateAdd(this, _airplaySourceEl, null);
      __privateAdd(this, _config, null);
      __privateAdd(this, _toggleHlsLoad, () => {
        var _a2, _b, _c;
        if ((_a2 = this.nativeEl) == null ? void 0 : _a2.webkitCurrentPlaybackTargetIsWireless) {
          (_b = this.api) == null ? void 0 : _b.stopLoad();
        } else {
          (_c = this.api) == null ? void 0 : _c.startLoad();
        }
      });
      __privateMethod(this, _HlsVideo_instances, upgradeProperty_fn).call(this, "config");
    }
    get config() {
      return __privateGet(this, _config);
    }
    set config(value) {
      __privateSet(this, _config, value);
    }
    attributeChangedCallback(attrName, oldValue, newValue) {
      if (attrName !== "src") {
        super.attributeChangedCallback(attrName, oldValue, newValue);
      }
      if (attrName === "src" && oldValue != newValue) {
        this.load();
      }
    }
    async load() {
      var _a2, _b;
      const isFirstLoad = !this.api;
      __privateMethod(this, _HlsVideo_instances, destroy_fn).call(this);
      if (!this.src) {
        return;
      }
      if (isFirstLoad && !__privateGet(this, _config)) {
        __privateSet(this, _config, JSON.parse(((_a2 = this.shadowRoot.getElementById("config")) == null ? void 0 : _a2.textContent) || "{}"));
      }
      if (Hls.isSupported()) {
        this.api = new Hls({
          // Mimic the media element with an Infinity duration for live streams.
          liveDurationInfinity: true,
          // Disable auto quality level/fragment loading.
          autoStartLoad: false,
          // Custom configuration for hls.js.
          ...this.config
        });
        await Promise.resolve();
        this.api.loadSource(this.src);
        this.api.attachMedia(this.nativeEl);
        switch (this.nativeEl.preload) {
          case "none": {
            const loadSourceOnPlay = () => this.api.startLoad();
            this.nativeEl.addEventListener("play", loadSourceOnPlay, {
              once: true
            });
            this.api.on(Hls.Events.DESTROYING, () => {
              this.nativeEl.removeEventListener("play", loadSourceOnPlay);
            });
            break;
          }
          case "metadata": {
            const originalLength = this.api.config.maxBufferLength;
            const originalSize = this.api.config.maxBufferSize;
            this.api.config.maxBufferLength = 1;
            this.api.config.maxBufferSize = 1;
            const increaseBufferOnPlay = () => {
              this.api.config.maxBufferLength = originalLength;
              this.api.config.maxBufferSize = originalSize;
            };
            this.nativeEl.addEventListener("play", increaseBufferOnPlay, {
              once: true
            });
            this.api.on(Hls.Events.DESTROYING, () => {
              this.nativeEl.removeEventListener("play", increaseBufferOnPlay);
            });
            this.api.startLoad();
            break;
          }
          default:
            this.api.startLoad();
        }
        if (this.nativeEl.webkitCurrentPlaybackTargetIsWireless) {
          this.api.stopLoad();
        }
        this.nativeEl.addEventListener(
          "webkitcurrentplaybacktargetiswirelesschanged",
          __privateGet(this, _toggleHlsLoad)
        );
        __privateSet(this, _airplaySourceEl, document.createElement("source"));
        __privateGet(this, _airplaySourceEl).setAttribute("type", "application/x-mpegURL");
        __privateGet(this, _airplaySourceEl).setAttribute("src", this.src);
        this.nativeEl.disableRemotePlayback = false;
        this.nativeEl.append(__privateGet(this, _airplaySourceEl));
        const levelIdMap = /* @__PURE__ */ new WeakMap();
        this.api.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          if (this.nativeEl.autoplay && this.nativeEl.paused) {
            this.nativeEl.play().catch((err) => {
              console.warn("Autoplay failed:", err);
            });
          }
          removeAllMediaTracks();
          let videoTrack = this.videoTracks.getTrackById("main");
          if (!videoTrack) {
            videoTrack = this.addVideoTrack("main");
            videoTrack.id = "main";
            videoTrack.selected = true;
          }
          for (const [id, level] of data.levels.entries()) {
            const videoRendition = videoTrack.addRendition(
              level.url[0],
              level.width,
              level.height,
              level.videoCodec,
              level.bitrate
            );
            levelIdMap.set(level, `${id}`);
            videoRendition.id = `${id}`;
          }
          for (let [id, a] of data.audioTracks.entries()) {
            const kind = a.default ? "main" : "alternative";
            const audioTrack = this.addAudioTrack(kind, a.name, a.lang);
            audioTrack.id = `${id}`;
            if (a.default) {
              audioTrack.enabled = true;
            }
          }
        });
        this.audioTracks.addEventListener("change", () => {
          var _a22;
          const audioTrackId = +((_a22 = [...this.audioTracks].find((t) => t.enabled)) == null ? void 0 : _a22.id);
          const availableIds = this.api.audioTracks.map((t) => t.id);
          if (audioTrackId != this.api.audioTrack && availableIds.includes(audioTrackId)) {
            this.api.audioTrack = audioTrackId;
          }
        });
        this.api.on(Hls.Events.LEVELS_UPDATED, (event, data) => {
          const videoTrack = this.videoTracks[this.videoTracks.selectedIndex ?? 0];
          if (!videoTrack) return;
          const levelIds = data.levels.map((l) => levelIdMap.get(l));
          for (const rendition of this.videoRenditions) {
            if (rendition.id && !levelIds.includes(rendition.id)) {
              videoTrack.removeRendition(rendition);
            }
          }
        });
        const switchRendition = (event) => {
          const level = event.target.selectedIndex;
          if (level != this.api.nextLevel) {
            this.api.nextLevel = level;
          }
        };
        (_b = this.videoRenditions) == null ? void 0 : _b.addEventListener("change", switchRendition);
        const removeAllMediaTracks = () => {
          for (const videoTrack of this.videoTracks) {
            this.removeVideoTrack(videoTrack);
          }
          for (const audioTrack of this.audioTracks) {
            this.removeAudioTrack(audioTrack);
          }
        };
        this.api.once(Hls.Events.DESTROYING, removeAllMediaTracks);
        return;
      }
      await Promise.resolve();
      if (this.nativeEl.canPlayType("application/vnd.apple.mpegurl")) {
        this.nativeEl.src = this.src;
      }
    }
  }, _airplaySourceEl = new WeakMap(), _config = new WeakMap(), _HlsVideo_instances = new WeakSet(), destroy_fn = function() {
    var _a2, _b;
    (_a2 = __privateGet(this, _airplaySourceEl)) == null ? void 0 : _a2.remove();
    (_b = this.nativeEl) == null ? void 0 : _b.removeEventListener(
      "webkitcurrentplaybacktargetiswirelesschanged",
      __privateGet(this, _toggleHlsLoad)
    );
    if (this.api) {
      this.api.detachMedia();
      this.api.destroy();
      this.api = null;
    }
  }, _toggleHlsLoad = new WeakMap(), // This is a pattern to update property values that are set before
  // the custom element is upgraded.
  // https://web.dev/custom-elements-best-practices/#make-properties-lazy
  upgradeProperty_fn = function(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }, __publicField(_a, "shadowRootOptions", { ...superclass.shadowRootOptions }), __publicField(_a, "getTemplateHTML", (attrs, props = {}) => {
    const { src, ...rest } = attrs;
    return `
        <script type="application/json" id="config">
          ${JSON.stringify(props.config || {})}
        <\/script>
        ${superclass.getTemplateHTML(rest)}
      `;
  }), _a;
};
var HlsVideoElement = HlsVideoMixin(MediaTracksMixin(CustomVideoElement));
if (globalThis.customElements && !globalThis.customElements.get("hls-video")) {
  globalThis.customElements.define("hls-video", HlsVideoElement);
}
var hls_video_element_default = HlsVideoElement;

// node_modules/hls-video-element/dist/react.js
var reservedReactProps = /* @__PURE__ */ new Set([
  "style",
  "children",
  "ref",
  "key",
  "suppressContentEditableWarning",
  "suppressHydrationWarning",
  "dangerouslySetInnerHTML"
]);
var reactPropToAttrNameMap = {
  className: "class",
  htmlFor: "for"
};
function defaultToAttributeName(propName) {
  return propName.toLowerCase();
}
function defaultToAttributeValue(propValue) {
  if (typeof propValue === "boolean") return propValue ? "" : void 0;
  if (typeof propValue === "function") return void 0;
  if (typeof propValue === "object" && propValue !== null) return void 0;
  return propValue;
}
function createComponent({
  react: React2,
  tagName,
  elementClass,
  events,
  displayName,
  defaultProps,
  toAttributeName = defaultToAttributeName,
  toAttributeValue = defaultToAttributeValue
}) {
  const IS_REACT_19_OR_NEWER = Number.parseInt(React2.version) >= 19;
  const ReactComponent = React2.forwardRef((props, ref) => {
    var _a, _b;
    const elementRef = React2.useRef(null);
    const prevElemPropsRef = React2.useRef(/* @__PURE__ */ new Map());
    const eventProps = {};
    const attrs = {};
    const reactProps = {};
    const elementProps = {};
    for (const [k, v] of Object.entries(props)) {
      if (reservedReactProps.has(k)) {
        reactProps[k] = v;
        continue;
      }
      const attrName = toAttributeName(reactPropToAttrNameMap[k] ?? k);
      if (k in elementClass.prototype && !(k in (((_a = globalThis.HTMLElement) == null ? void 0 : _a.prototype) ?? {})) && !((_b = elementClass.observedAttributes) == null ? void 0 : _b.some((attr) => attr === attrName))) {
        elementProps[k] = v;
        continue;
      }
      if (k.startsWith("on")) {
        eventProps[k] = v;
        continue;
      }
      const attrValue = toAttributeValue(v);
      if (attrName && attrValue != null) {
        attrs[attrName] = String(attrValue);
        if (!IS_REACT_19_OR_NEWER) {
          reactProps[attrName] = attrValue;
        }
      }
      if (attrName && IS_REACT_19_OR_NEWER) {
        const attrValueFromDefault = defaultToAttributeValue(v);
        if (attrValue !== attrValueFromDefault) {
          reactProps[attrName] = attrValue;
        } else {
          reactProps[attrName] = v;
        }
      }
    }
    if (typeof window !== "undefined") {
      for (const propName in eventProps) {
        const callback = eventProps[propName];
        const useCapture = propName.endsWith("Capture");
        const eventName = ((events == null ? void 0 : events[propName]) ?? propName.slice(2).toLowerCase()).slice(
          0,
          useCapture ? -7 : void 0
        );
        React2.useLayoutEffect(() => {
          const eventTarget = elementRef == null ? void 0 : elementRef.current;
          if (!eventTarget || typeof callback !== "function") return;
          eventTarget.addEventListener(eventName, callback, useCapture);
          return () => {
            eventTarget.removeEventListener(eventName, callback, useCapture);
          };
        }, [elementRef == null ? void 0 : elementRef.current, callback]);
      }
      React2.useLayoutEffect(() => {
        if (elementRef.current === null) return;
        const newElemProps = /* @__PURE__ */ new Map();
        for (const key in elementProps) {
          setProperty(elementRef.current, key, elementProps[key]);
          prevElemPropsRef.current.delete(key);
          newElemProps.set(key, elementProps[key]);
        }
        for (const [key, _value] of prevElemPropsRef.current) {
          setProperty(elementRef.current, key, void 0);
        }
        prevElemPropsRef.current = newElemProps;
      });
    }
    if (typeof window === "undefined" && (elementClass == null ? void 0 : elementClass.getTemplateHTML) && (elementClass == null ? void 0 : elementClass.shadowRootOptions)) {
      const { mode, delegatesFocus } = elementClass.shadowRootOptions;
      const templateShadowRoot = React2.createElement("template", {
        shadowrootmode: mode,
        shadowrootdelegatesfocus: delegatesFocus,
        dangerouslySetInnerHTML: {
          __html: elementClass.getTemplateHTML(attrs, props)
        }
      });
      reactProps.children = [templateShadowRoot, reactProps.children];
    }
    return React2.createElement(tagName, {
      ...defaultProps,
      ...reactProps,
      ref: React2.useCallback(
        (node) => {
          elementRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref !== null) {
            ref.current = node;
          }
        },
        [ref]
      )
    });
  });
  ReactComponent.displayName = displayName ?? elementClass.name;
  return ReactComponent;
}
function setProperty(node, name, value) {
  var _a;
  node[name] = value;
  if (value == null && name in (((_a = globalThis.HTMLElement) == null ? void 0 : _a.prototype) ?? {})) {
    node.removeAttribute(name);
  }
}
var react_default = createComponent({
  react: import_react.default,
  tagName: "hls-video",
  elementClass: hls_video_element_default
});
export {
  react_default as default
};
/*! Bundled license information:

hls-video-element/dist/react.js:
  (*! Bundled license information:
  
  ce-la-react/dist/ce-la-react.js:
    (**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *
     * Modified version of `@lit/react` for vanilla custom elements with support for SSR.
     *)
  *)
*/
//# sourceMappingURL=react-CTPHTRKF.js.map
