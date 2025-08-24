"use client";
import {
  CustomVideoElement
} from "./chunk-4YFU3VBZ.js";
import {
  require_react
} from "./chunk-K57FUMGK.js";
import {
  __privateAdd,
  __privateGet,
  __privateSet,
  __publicField,
  __toESM
} from "./chunk-BFCEFRYA.js";

// node_modules/dash-video-element/dist/react.js
var import_react = __toESM(require_react());

// node_modules/dash-video-element/dist/dash-video-element.js
var _apiInit;
var DashVideoElement = class extends CustomVideoElement {
  constructor() {
    super(...arguments);
    __privateAdd(this, _apiInit);
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
    if (!__privateGet(this, _apiInit)) {
      __privateSet(this, _apiInit, true);
      const Dash = await import("./dash.all.min-S7I7UQ2Z.js");
      this.api = Dash.MediaPlayer().create();
      this.api.initialize(this.nativeEl, this.src, this.autoplay);
    } else {
      this.api.attachSource(this.src);
    }
  }
};
_apiInit = new WeakMap();
__publicField(DashVideoElement, "shadowRootOptions", { ...CustomVideoElement.shadowRootOptions });
__publicField(DashVideoElement, "getTemplateHTML", (attrs) => {
  const { src, ...rest } = attrs;
  return CustomVideoElement.getTemplateHTML(rest);
});
if (globalThis.customElements && !globalThis.customElements.get("dash-video")) {
  globalThis.customElements.define("dash-video", DashVideoElement);
}
var dash_video_element_default = DashVideoElement;

// node_modules/dash-video-element/dist/react.js
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
  tagName: "dash-video",
  elementClass: dash_video_element_default
});
export {
  react_default as default
};
/*! Bundled license information:

dash-video-element/dist/react.js:
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
//# sourceMappingURL=react-UUQ3WKXC.js.map
