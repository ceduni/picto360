"use client";
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

// node_modules/wistia-video-element/dist/react.js
var import_react = __toESM(require_react());

// node_modules/super-media-element/super-media-element.js
var Events = [
  "abort",
  "canplay",
  "canplaythrough",
  "durationchange",
  "emptied",
  "encrypted",
  "ended",
  "error",
  "loadeddata",
  "loadedmetadata",
  "loadstart",
  "pause",
  "play",
  "playing",
  "progress",
  "ratechange",
  "seeked",
  "seeking",
  "stalled",
  "suspend",
  "timeupdate",
  "volumechange",
  "waiting",
  "waitingforkey",
  "resize",
  "enterpictureinpicture",
  "leavepictureinpicture",
  "webkitbeginfullscreen",
  "webkitendfullscreen",
  "webkitpresentationmodechanged"
];
var _a;
var template = (_a = globalThis.document) == null ? void 0 : _a.createElement("template");
if (template) {
  template.innerHTML = /*html*/
  `
    <style>
      :host {
        display: inline-block;
        line-height: 0;
      }

      video,
      audio {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
      }
    </style>
    <slot></slot>
  `;
}
var SuperMediaMixin = (superclass, { tag, is }) => {
  var _a3, _b2, _isDefined, _SuperMedia_static, define_fn, _isInit, _loadComplete, _hasLoaded, _isLoaded, _nativeEl, _standinEl, _SuperMedia_instances, init_fn, upgradeProperty_fn, initStandinEl_fn, initNativeEl_fn, loadSrc_fn, forwardAttribute_fn;
  const nativeElTest = (_a3 = globalThis.document) == null ? void 0 : _a3.createElement(tag, { is });
  const nativeElProps = nativeElTest ? getNativeElProps(nativeElTest) : [];
  return _b2 = class extends superclass {
    constructor() {
      super();
      __privateAdd(this, _SuperMedia_instances);
      __privateAdd(this, _isInit);
      __privateAdd(this, _loadComplete);
      __privateAdd(this, _hasLoaded, false);
      __privateAdd(this, _isLoaded, false);
      __privateAdd(this, _nativeEl);
      __privateAdd(this, _standinEl);
      if (!this.shadowRoot) {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(this.constructor.template.content.cloneNode(true));
      }
      if (this.load !== _b2.prototype.load) {
        this.loadComplete = new PublicPromise();
      }
    }
    static get observedAttributes() {
      var _a4, _b3;
      __privateMethod(_a4 = _b2, _SuperMedia_static, define_fn).call(_a4);
      const natAttrs = ((_b3 = nativeElTest == null ? void 0 : nativeElTest.constructor) == null ? void 0 : _b3.observedAttributes) ?? [];
      return [
        ...natAttrs,
        "autopictureinpicture",
        "disablepictureinpicture",
        "disableremoteplayback",
        "autoplay",
        "controls",
        "controlslist",
        "crossorigin",
        "loop",
        "muted",
        "playsinline",
        "poster",
        "preload",
        "src"
      ];
    }
    get loadComplete() {
      return __privateGet(this, _loadComplete);
    }
    set loadComplete(promise) {
      __privateSet(this, _isLoaded, false);
      __privateSet(this, _loadComplete, promise);
      promise == null ? void 0 : promise.then(() => {
        __privateSet(this, _isLoaded, true);
      });
    }
    get isLoaded() {
      return __privateGet(this, _isLoaded);
    }
    get nativeEl() {
      return __privateGet(this, _nativeEl) ?? this.shadowRoot.querySelector(tag) ?? this.querySelector(tag);
    }
    set nativeEl(val) {
      __privateSet(this, _nativeEl, val);
    }
    get defaultMuted() {
      return this.hasAttribute("muted");
    }
    set defaultMuted(val) {
      this.toggleAttribute("muted", Boolean(val));
    }
    get src() {
      return this.getAttribute("src");
    }
    set src(val) {
      this.setAttribute("src", `${val}`);
    }
    get preload() {
      var _a4;
      return this.getAttribute("preload") ?? ((_a4 = this.nativeEl) == null ? void 0 : _a4.preload);
    }
    set preload(val) {
      this.setAttribute("preload", `${val}`);
    }
    attributeChangedCallback(attrName, oldValue, newValue) {
      __privateMethod(this, _SuperMedia_instances, init_fn).call(this);
      if (attrName === "src" && this.load !== _b2.prototype.load) {
        __privateMethod(this, _SuperMedia_instances, loadSrc_fn).call(this);
      }
      __privateMethod(this, _SuperMedia_instances, forwardAttribute_fn).call(this, attrName, oldValue, newValue);
    }
    connectedCallback() {
      __privateMethod(this, _SuperMedia_instances, init_fn).call(this);
    }
  }, _isDefined = new WeakMap(), _SuperMedia_static = new WeakSet(), define_fn = function() {
    if (__privateGet(this, _isDefined)) return;
    __privateSet(this, _isDefined, true);
    const propsToAttrs = new Set(this.observedAttributes);
    propsToAttrs.delete("muted");
    for (let prop of nativeElProps) {
      if (prop in this.prototype) continue;
      const type = typeof nativeElTest[prop];
      if (type == "function") {
        this.prototype[prop] = function(...args) {
          __privateMethod(this, _SuperMedia_instances, init_fn).call(this);
          const fn = () => {
            if (this.call) return this.call(prop, ...args);
            return this.nativeEl[prop].apply(this.nativeEl, args);
          };
          if (this.loadComplete && !this.isLoaded) {
            return this.loadComplete.then(fn);
          }
          return fn();
        };
      } else {
        let config = {
          get() {
            var _a4, _b3;
            __privateMethod(this, _SuperMedia_instances, init_fn).call(this);
            let attr = prop.toLowerCase();
            if (propsToAttrs.has(attr)) {
              const val = this.getAttribute(attr);
              return val === null ? false : val === "" ? true : val;
            }
            return ((_a4 = this.get) == null ? void 0 : _a4.call(this, prop)) ?? ((_b3 = this.nativeEl) == null ? void 0 : _b3[prop]) ?? __privateGet(this, _standinEl)[prop];
          }
        };
        if (prop !== prop.toUpperCase()) {
          config.set = async function(val) {
            __privateMethod(this, _SuperMedia_instances, init_fn).call(this);
            let attr = prop.toLowerCase();
            if (propsToAttrs.has(attr)) {
              if (val === true || val === false || val == null) {
                this.toggleAttribute(attr, Boolean(val));
              } else {
                this.setAttribute(attr, val);
              }
              return;
            }
            if (this.loadComplete && !this.isLoaded) await this.loadComplete;
            if (this.set) {
              this.set(prop, val);
              return;
            }
            this.nativeEl[prop] = val;
          };
        }
        Object.defineProperty(this.prototype, prop, config);
      }
    }
  }, _isInit = new WeakMap(), _loadComplete = new WeakMap(), _hasLoaded = new WeakMap(), _isLoaded = new WeakMap(), _nativeEl = new WeakMap(), _standinEl = new WeakMap(), _SuperMedia_instances = new WeakSet(), init_fn = async function() {
    var _a4, _b3;
    if (__privateGet(this, _isInit)) return;
    __privateSet(this, _isInit, true);
    __privateMethod(this, _SuperMedia_instances, initStandinEl_fn).call(this);
    __privateMethod(this, _SuperMedia_instances, initNativeEl_fn).call(this);
    for (let prop of nativeElProps)
      __privateMethod(this, _SuperMedia_instances, upgradeProperty_fn).call(this, prop);
    const childMap = /* @__PURE__ */ new Map();
    const slotEl = this.shadowRoot.querySelector("slot:not([name])");
    slotEl == null ? void 0 : slotEl.addEventListener("slotchange", () => {
      const removeNativeChildren = new Map(childMap);
      slotEl.assignedElements().filter((el) => ["track", "source"].includes(el.localName)).forEach(async (el) => {
        var _a5, _b4;
        removeNativeChildren.delete(el);
        let clone = childMap.get(el);
        if (!clone) {
          clone = el.cloneNode();
          childMap.set(el, clone);
        }
        if (this.loadComplete && !this.isLoaded) await this.loadComplete;
        (_b4 = (_a5 = this.nativeEl).append) == null ? void 0 : _b4.call(_a5, clone);
      });
      removeNativeChildren.forEach((el) => el.remove());
    });
    for (let type of this.constructor.Events) {
      (_b3 = (_a4 = this.shadowRoot).addEventListener) == null ? void 0 : _b3.call(_a4, type, (evt) => {
        if (evt.target !== this.nativeEl) return;
        this.dispatchEvent(new CustomEvent(evt.type, { detail: evt.detail }));
      }, true);
    }
  }, upgradeProperty_fn = function(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }, initStandinEl_fn = function() {
    const dummyEl = document.createElement(tag, { is });
    dummyEl.muted = this.hasAttribute("muted");
    for (let { name, value } of this.attributes) {
      dummyEl.setAttribute(name, value);
    }
    __privateSet(this, _standinEl, {});
    for (let name of getNativeElProps(dummyEl)) {
      __privateGet(this, _standinEl)[name] = dummyEl[name];
    }
    dummyEl.removeAttribute("src");
    dummyEl.load();
  }, initNativeEl_fn = async function() {
    if (this.loadComplete && !this.isLoaded) await this.loadComplete;
    if (!this.nativeEl) {
      const nativeEl = document.createElement(tag, { is });
      nativeEl.part = tag;
      this.shadowRoot.append(nativeEl);
    }
    this.nativeEl.muted = this.hasAttribute("muted");
  }, loadSrc_fn = async function() {
    var _a4;
    if (__privateGet(this, _hasLoaded)) this.loadComplete = new PublicPromise();
    __privateSet(this, _hasLoaded, true);
    await Promise.resolve();
    await this.load();
    (_a4 = this.loadComplete) == null ? void 0 : _a4.resolve();
    await this.loadComplete;
  }, forwardAttribute_fn = async function(attrName, oldValue, newValue) {
    var _a4, _b3, _c, _d;
    if (this.loadComplete && !this.isLoaded) await this.loadComplete;
    if (["id", "class", ...this.constructor.skipAttributes].includes(attrName)) {
      return;
    }
    if (newValue === null) {
      (_b3 = (_a4 = this.nativeEl).removeAttribute) == null ? void 0 : _b3.call(_a4, attrName);
    } else {
      (_d = (_c = this.nativeEl).setAttribute) == null ? void 0 : _d.call(_c, attrName, newValue);
    }
  }, __privateAdd(_b2, _SuperMedia_static), __publicField(_b2, "Events", Events), __publicField(_b2, "template", template), __publicField(_b2, "skipAttributes", []), __privateAdd(_b2, _isDefined), _b2;
};
function getNativeElProps(nativeElTest) {
  let nativeElProps = [];
  for (let proto = Object.getPrototypeOf(nativeElTest); proto && proto !== HTMLElement.prototype; proto = Object.getPrototypeOf(proto)) {
    nativeElProps.push(...Object.getOwnPropertyNames(proto));
  }
  return nativeElProps;
}
var PublicPromise = class extends Promise {
  constructor(executor = () => {
  }) {
    let res, rej;
    super((resolve, reject) => {
      executor(resolve, reject);
      res = resolve;
      rej = reject;
    });
    this.resolve = res;
    this.reject = rej;
  }
};
var SuperVideoElement = globalThis.document ? SuperMediaMixin(HTMLElement, { tag: "video" }) : class {
};
var SuperAudioElement = globalThis.document ? SuperMediaMixin(HTMLElement, { tag: "audio" }) : class {
};

// node_modules/wistia-video-element/dist/wistia-video-element.js
var _a2;
var _b;
var templateLightDOM = (_a2 = globalThis.document) == null ? void 0 : _a2.createElement("template");
if (templateLightDOM) {
  templateLightDOM.innerHTML = /*html*/
  `
  <div class="wistia_embed"></div>
  `;
}
var templateShadowDOM = (_b = globalThis.document) == null ? void 0 : _b.createElement("template");
if (templateShadowDOM) {
  templateShadowDOM.innerHTML = /*html*/
  `
  <style>
    :host {
      display: inline-block;
      min-width: 300px;
      min-height: 150px;
      position: relative;
    }
    ::slotted(.wistia_embed) {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  </style>
  <slot></slot>
  `;
}
var WistiaVideoElement = class extends SuperVideoElement {
  get nativeEl() {
    var _a22;
    return ((_a22 = this.api) == null ? void 0 : _a22.elem()) ?? this.querySelector("video");
  }
  async load() {
    var _a22;
    (_a22 = this.querySelector(".wistia_embed")) == null ? void 0 : _a22.remove();
    if (!this.src) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
    const MATCH_SRC = /(?:wistia\.com|wi\.st)\/(?:medias|embed)\/(.*)$/i;
    const id = this.src.match(MATCH_SRC)[1];
    const options = {
      autoPlay: this.autoplay,
      preload: this.preload ?? "metadata",
      playsinline: this.playsInline,
      endVideoBehavior: this.loop && "loop",
      chromeless: !this.controls,
      playButton: this.controls,
      muted: this.defaultMuted
    };
    this.append(templateLightDOM.content.cloneNode(true));
    const div = this.querySelector(".wistia_embed");
    if (!div.id) div.id = uniqueId(id);
    div.classList.add(`wistia_async_${id}`);
    const scriptUrl = "https://fast.wistia.com/assets/external/E-v1.js";
    await loadScript(scriptUrl, "Wistia");
    this.api = await new Promise((onReady) => {
      globalThis._wq.push({
        id: div.id,
        onReady,
        options
      });
    });
  }
  async attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "controls") {
      await this.loadComplete;
      switch (attrName) {
        case "controls":
          this.api.bigPlayButtonEnabled(this.controls);
          this.controls ? this.api.releaseChromeless() : this.api.requestChromeless();
          break;
      }
      return;
    }
    super.attributeChangedCallback(attrName, oldValue, newValue);
  }
  // Override some methods w/ defaults if the video element is not ready yet when called.
  // Some methods require the Wistia API instead of the native video element API.
  get duration() {
    var _a22;
    return (_a22 = this.api) == null ? void 0 : _a22.duration();
  }
  play() {
    this.api.play();
    return new Promise((resolve) => this.addEventListener("playing", resolve));
  }
};
__publicField(WistiaVideoElement, "template", templateShadowDOM);
__publicField(WistiaVideoElement, "skipAttributes", ["src"]);
var loadScriptCache = {};
async function loadScript(src, globalName) {
  if (!globalName) return import(
    /* webpackIgnore: true */
    src
  );
  if (loadScriptCache[src]) return loadScriptCache[src];
  if (self[globalName]) return self[globalName];
  return loadScriptCache[src] = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.defer = true;
    script.src = src;
    script.onload = () => resolve(self[globalName]);
    script.onerror = reject;
    document.head.append(script);
  });
}
var idCounter = 0;
function uniqueId(prefix) {
  const id = ++idCounter;
  return `${prefix}${id}`;
}
if (globalThis.customElements && !globalThis.customElements.get("wistia-video")) {
  globalThis.customElements.define("wistia-video", WistiaVideoElement);
}
var wistia_video_element_default = WistiaVideoElement;

// node_modules/wistia-video-element/dist/react.js
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
    var _a3, _b2;
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
      if (k in elementClass.prototype && !(k in (((_a3 = globalThis.HTMLElement) == null ? void 0 : _a3.prototype) ?? {})) && !((_b2 = elementClass.observedAttributes) == null ? void 0 : _b2.some((attr) => attr === attrName))) {
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
  var _a3;
  node[name] = value;
  if (value == null && name in (((_a3 = globalThis.HTMLElement) == null ? void 0 : _a3.prototype) ?? {})) {
    node.removeAttribute(name);
  }
}
var react_default = createComponent({
  react: import_react.default,
  tagName: "wistia-video",
  elementClass: wistia_video_element_default
});
export {
  react_default as default
};
/*! Bundled license information:

wistia-video-element/dist/react.js:
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
//# sourceMappingURL=react-5CDULC6F.js.map
