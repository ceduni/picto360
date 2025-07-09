import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __publicField
} from "./chunk-HFZ37CMS.js";

// node_modules/custom-media-element/dist/custom-media-element.js
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
var Attributes = [
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
function getAudioTemplateHTML(attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        display: inline-flex;
        line-height: 0;
        flex-direction: column;
        justify-content: end;
      }

      audio {
        width: 100%;
      }
    </style>
    <slot name="media">
      <audio${serializeAttributes(attrs)}></audio>
    </slot>
    <slot></slot>
  `
  );
}
function getVideoTemplateHTML(attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        display: inline-block;
        line-height: 0;
      }

      video {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        object-fit: var(--media-object-fit, contain);
        object-position: var(--media-object-position, 50% 50%);
      }

      video::-webkit-media-text-track-container {
        transform: var(--media-webkit-text-track-transform);
        transition: var(--media-webkit-text-track-transition);
      }
    </style>
    <slot name="media">
      <video${serializeAttributes(attrs)}></video>
    </slot>
    <slot></slot>
  `
  );
}
function CustomMediaMixin(superclass, { tag, is }) {
  var _a, _b, _c, _isDefined, _CustomMedia_static, define_fn, _isInit, _nativeEl, _childMap, _childObserver, _CustomMedia_instances, init_fn, syncMediaChildren_fn, syncMediaChildAttribute_fn, enableDefaultTrack_fn, upgradeProperty_fn, forwardAttribute_fn;
  const nativeElTest = (_b = (_a = globalThis.document) == null ? void 0 : _a.createElement) == null ? void 0 : _b.call(_a, tag, { is });
  const nativeElProps = nativeElTest ? getNativeElProps(nativeElTest) : [];
  return _c = class extends superclass {
    constructor() {
      super(...arguments);
      __privateAdd(this, _CustomMedia_instances);
      // Private fields
      __privateAdd(this, _isInit, false);
      __privateAdd(this, _nativeEl, null);
      __privateAdd(this, _childMap, /* @__PURE__ */ new Map());
      __privateAdd(this, _childObserver);
      __publicField(this, "get");
      __publicField(this, "set");
      __publicField(this, "call");
    }
    static get observedAttributes() {
      var _a2, _b2;
      __privateMethod(_a2 = _c, _CustomMedia_static, define_fn).call(_a2);
      const natAttrs = ((_b2 = nativeElTest == null ? void 0 : nativeElTest.constructor) == null ? void 0 : _b2.observedAttributes) ?? [];
      return [
        ...natAttrs,
        ...Attributes
      ];
    }
    // If the custom element is defined before the custom element's HTML is parsed
    // no attributes will be available in the constructor (construction process).
    // Wait until initializing in the attributeChangedCallback or
    // connectedCallback or accessing any properties.
    get nativeEl() {
      var _a2;
      __privateMethod(this, _CustomMedia_instances, init_fn).call(this);
      return __privateGet(this, _nativeEl) ?? this.querySelector(":scope > [slot=media]") ?? this.querySelector(tag) ?? ((_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector(tag)) ?? null;
    }
    set nativeEl(val) {
      __privateSet(this, _nativeEl, val);
    }
    get defaultMuted() {
      return this.hasAttribute("muted");
    }
    set defaultMuted(val) {
      this.toggleAttribute("muted", val);
    }
    get src() {
      return this.getAttribute("src");
    }
    set src(val) {
      this.setAttribute("src", `${val}`);
    }
    get preload() {
      var _a2;
      return this.getAttribute("preload") ?? ((_a2 = this.nativeEl) == null ? void 0 : _a2.preload);
    }
    set preload(val) {
      this.setAttribute("preload", `${val}`);
    }
    init() {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: "open" });
        const attrs = namedNodeMapToObject(this.attributes);
        if (is) attrs.is = is;
        if (tag) attrs.part = tag;
        this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
      }
      this.nativeEl.muted = this.hasAttribute("muted");
      for (const prop of nativeElProps) {
        __privateMethod(this, _CustomMedia_instances, upgradeProperty_fn).call(this, prop);
      }
      __privateSet(this, _childObserver, new MutationObserver(__privateMethod(this, _CustomMedia_instances, syncMediaChildAttribute_fn).bind(this)));
      this.shadowRoot.addEventListener("slotchange", () => __privateMethod(this, _CustomMedia_instances, syncMediaChildren_fn).call(this));
      __privateMethod(this, _CustomMedia_instances, syncMediaChildren_fn).call(this);
      for (const type of this.constructor.Events) {
        this.shadowRoot.addEventListener(type, this, true);
      }
    }
    handleEvent(event) {
      if (event.target === this.nativeEl) {
        this.dispatchEvent(new CustomEvent(event.type, { detail: event.detail }));
      }
    }
    attributeChangedCallback(attrName, oldValue, newValue) {
      __privateMethod(this, _CustomMedia_instances, init_fn).call(this);
      __privateMethod(this, _CustomMedia_instances, forwardAttribute_fn).call(this, attrName, oldValue, newValue);
    }
    connectedCallback() {
      __privateMethod(this, _CustomMedia_instances, init_fn).call(this);
    }
  }, _isDefined = new WeakMap(), _CustomMedia_static = new WeakSet(), define_fn = function() {
    if (__privateGet(this, _isDefined)) return;
    __privateSet(this, _isDefined, true);
    const propsToAttrs = new Set(this.observedAttributes);
    propsToAttrs.delete("muted");
    for (const prop of nativeElProps) {
      if (prop in this.prototype) continue;
      if (typeof nativeElTest[prop] === "function") {
        this.prototype[prop] = function(...args) {
          __privateMethod(this, _CustomMedia_instances, init_fn).call(this);
          const fn = () => {
            var _a2;
            if (this.call) return this.call(prop, ...args);
            const nativeFn = (_a2 = this.nativeEl) == null ? void 0 : _a2[prop];
            return nativeFn == null ? void 0 : nativeFn.apply(this.nativeEl, args);
          };
          return fn();
        };
      } else {
        const config = {
          get() {
            var _a2, _b2;
            __privateMethod(this, _CustomMedia_instances, init_fn).call(this);
            const attr = prop.toLowerCase();
            if (propsToAttrs.has(attr)) {
              const val = this.getAttribute(attr);
              return val === null ? false : val === "" ? true : val;
            }
            return ((_a2 = this.get) == null ? void 0 : _a2.call(this, prop)) ?? ((_b2 = this.nativeEl) == null ? void 0 : _b2[prop]);
          }
        };
        if (prop !== prop.toUpperCase()) {
          config.set = function(val) {
            __privateMethod(this, _CustomMedia_instances, init_fn).call(this);
            const attr = prop.toLowerCase();
            if (propsToAttrs.has(attr)) {
              if (val === true || val === false || val == null) {
                this.toggleAttribute(attr, Boolean(val));
              } else {
                this.setAttribute(attr, val);
              }
              return;
            }
            if (this.set) {
              this.set(prop, val);
              return;
            }
            if (this.nativeEl) {
              this.nativeEl[prop] = val;
            }
          };
        }
        Object.defineProperty(this.prototype, prop, config);
      }
    }
  }, _isInit = new WeakMap(), _nativeEl = new WeakMap(), _childMap = new WeakMap(), _childObserver = new WeakMap(), _CustomMedia_instances = new WeakSet(), init_fn = function() {
    if (__privateGet(this, _isInit)) return;
    __privateSet(this, _isInit, true);
    this.init();
  }, syncMediaChildren_fn = function() {
    var _a2;
    const removeNativeChildren = new Map(__privateGet(this, _childMap));
    const defaultSlot = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector("slot:not([name])");
    const mediaChildren = defaultSlot == null ? void 0 : defaultSlot.assignedElements({ flatten: true }).filter((el) => ["track", "source"].includes(el.localName));
    mediaChildren.forEach((el) => {
      var _a3, _b2;
      removeNativeChildren.delete(el);
      let clone = __privateGet(this, _childMap).get(el);
      if (!clone) {
        clone = el.cloneNode();
        __privateGet(this, _childMap).set(el, clone);
        (_a3 = __privateGet(this, _childObserver)) == null ? void 0 : _a3.observe(el, { attributes: true });
      }
      (_b2 = this.nativeEl) == null ? void 0 : _b2.append(clone);
      __privateMethod(this, _CustomMedia_instances, enableDefaultTrack_fn).call(this, clone);
    });
    removeNativeChildren.forEach((clone, el) => {
      clone.remove();
      __privateGet(this, _childMap).delete(el);
    });
  }, syncMediaChildAttribute_fn = function(mutations) {
    for (const mutation of mutations) {
      if (mutation.type === "attributes") {
        const { target, attributeName } = mutation;
        const clone = __privateGet(this, _childMap).get(target);
        if (clone && attributeName) {
          clone.setAttribute(attributeName, target.getAttribute(attributeName) ?? "");
          __privateMethod(this, _CustomMedia_instances, enableDefaultTrack_fn).call(this, clone);
        }
      }
    }
  }, enableDefaultTrack_fn = function(trackEl) {
    if (trackEl && trackEl.localName === "track" && trackEl.default && (trackEl.kind === "chapters" || trackEl.kind === "metadata") && trackEl.track.mode === "disabled") {
      trackEl.track.mode = "hidden";
    }
  }, upgradeProperty_fn = function(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }, forwardAttribute_fn = function(attrName, _oldValue, newValue) {
    var _a2, _b2, _c2;
    if (["id", "class"].includes(attrName)) return;
    if (!_c.observedAttributes.includes(attrName) && this.constructor.observedAttributes.includes(attrName)) {
      return;
    }
    if (newValue === null) {
      (_a2 = this.nativeEl) == null ? void 0 : _a2.removeAttribute(attrName);
    } else if (((_b2 = this.nativeEl) == null ? void 0 : _b2.getAttribute(attrName)) !== newValue) {
      (_c2 = this.nativeEl) == null ? void 0 : _c2.setAttribute(attrName, newValue);
    }
  }, __privateAdd(_c, _CustomMedia_static), __publicField(_c, "getTemplateHTML", tag.endsWith("audio") ? getAudioTemplateHTML : getVideoTemplateHTML), __publicField(_c, "shadowRootOptions", { mode: "open" }), __publicField(_c, "Events", Events), __privateAdd(_c, _isDefined, false), _c;
}
function getNativeElProps(nativeElTest) {
  const nativeElProps = [];
  for (let proto = Object.getPrototypeOf(nativeElTest); proto && proto !== HTMLElement.prototype; proto = Object.getPrototypeOf(proto)) {
    const props = Object.getOwnPropertyNames(proto);
    nativeElProps.push(...props);
  }
  return nativeElProps;
}
function serializeAttributes(attrs) {
  let html = "";
  for (const key in attrs) {
    if (!Attributes.includes(key)) continue;
    const value = attrs[key];
    if (value === "") html += ` ${key}`;
    else html += ` ${key}="${value}"`;
  }
  return html;
}
function namedNodeMapToObject(namedNodeMap) {
  const obj = {};
  for (const attr of namedNodeMap) {
    obj[attr.name] = attr.value;
  }
  return obj;
}
var CustomVideoElement = CustomMediaMixin(globalThis.HTMLElement ?? class {
}, {
  tag: "video"
});
var CustomAudioElement = CustomMediaMixin(globalThis.HTMLElement ?? class {
}, {
  tag: "audio"
});

export {
  CustomVideoElement
};
//# sourceMappingURL=chunk-37E64XV7.js.map
