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
  __superGet,
  __toESM
} from "./chunk-HFZ37CMS.js";

// node_modules/@mux/mux-player-react/dist/index.mjs
var import_react = __toESM(require_react(), 1);

// node_modules/mux-embed/dist/mux.mjs
var Yr = Object.create;
var ft = Object.defineProperty;
var Xr = Object.getOwnPropertyDescriptor;
var $r = Object.getOwnPropertyNames;
var Zr = Object.getPrototypeOf;
var ea = Object.prototype.hasOwnProperty;
var pt = function(r12, e2) {
  return function() {
    return r12 && (e2 = r12(r12 = 0)), e2;
  };
};
var B = function(r12, e2) {
  return function() {
    return e2 || r12((e2 = { exports: {} }).exports, e2), e2.exports;
  };
};
var ta = function(r12, e2, t3, i2) {
  if (e2 && typeof e2 == "object" || typeof e2 == "function") for (var a3 = $r(e2), n3 = 0, o4 = a3.length, s3; n3 < o4; n3++) s3 = a3[n3], !ea.call(r12, s3) && s3 !== t3 && ft(r12, s3, { get: (function(u5) {
    return e2[u5];
  }).bind(null, s3), enumerable: !(i2 = Xr(e2, s3)) || i2.enumerable });
  return r12;
};
var V = function(r12, e2, t3) {
  return t3 = r12 != null ? Yr(Zr(r12)) : {}, ta(e2 || !r12 || !r12.__esModule ? ft(t3, "default", { value: r12, enumerable: true }) : t3, r12);
};
var J = B(function(ji, yt3) {
  var xe4;
  typeof window != "undefined" ? xe4 = window : typeof global != "undefined" ? xe4 = global : typeof self != "undefined" ? xe4 = self : xe4 = {};
  yt3.exports = xe4;
});
function U(r12, e2) {
  return e2 != null && typeof Symbol != "undefined" && e2[Symbol.hasInstance] ? !!e2[Symbol.hasInstance](r12) : U(r12, e2);
}
var te = pt(function() {
  te();
});
function Ne(r12) {
  "@swc/helpers - typeof";
  return r12 && typeof Symbol != "undefined" && r12.constructor === Symbol ? "symbol" : typeof r12;
}
var Je = pt(function() {
});
var Ye = B(function(Ts, cr) {
  var lr = Array.prototype.slice;
  cr.exports = Pa;
  function Pa(r12, e2) {
    for (("length" in r12) || (r12 = [r12]), r12 = lr.call(r12); r12.length; ) {
      var t3 = r12.shift(), i2 = e2(t3);
      if (i2) return i2;
      t3.childNodes && t3.childNodes.length && (r12 = lr.call(t3.childNodes).concat(r12));
    }
  }
});
var fr = B(function(Es, _r) {
  te();
  _r.exports = me4;
  function me4(r12, e2) {
    if (!U(this, me4)) return new me4(r12, e2);
    this.data = r12, this.nodeValue = r12, this.length = r12.length, this.ownerDocument = e2 || null;
  }
  me4.prototype.nodeType = 8;
  me4.prototype.nodeName = "#comment";
  me4.prototype.toString = function() {
    return "[object Comment]";
  };
});
var vr = B(function(xs, pr) {
  te();
  pr.exports = ae4;
  function ae4(r12, e2) {
    if (!U(this, ae4)) return new ae4(r12);
    this.data = r12 || "", this.length = this.data.length, this.ownerDocument = e2 || null;
  }
  ae4.prototype.type = "DOMTextNode";
  ae4.prototype.nodeType = 3;
  ae4.prototype.nodeName = "#text";
  ae4.prototype.toString = function() {
    return this.data;
  };
  ae4.prototype.replaceData = function(e2, t3, i2) {
    var a3 = this.data, n3 = a3.substring(0, e2), o4 = a3.substring(e2 + t3, a3.length);
    this.data = n3 + i2 + o4, this.length = this.data.length;
  };
});
var Xe = B(function(Ds, mr) {
  mr.exports = Ia;
  function Ia(r12) {
    var e2 = this, t3 = r12.type;
    r12.target || (r12.target = e2), e2.listeners || (e2.listeners = {});
    var i2 = e2.listeners[t3];
    if (i2) return i2.forEach(function(a3) {
      r12.currentTarget = e2, typeof a3 == "function" ? a3(r12) : a3.handleEvent(r12);
    });
    e2.parentNode && e2.parentNode.dispatchEvent(r12);
  }
});
var $e = B(function(Ss, hr) {
  hr.exports = Na;
  function Na(r12, e2) {
    var t3 = this;
    t3.listeners || (t3.listeners = {}), t3.listeners[r12] || (t3.listeners[r12] = []), t3.listeners[r12].indexOf(e2) === -1 && t3.listeners[r12].push(e2);
  }
});
var Ze = B(function(Rs, yr) {
  yr.exports = La;
  function La(r12, e2) {
    var t3 = this;
    if (t3.listeners && t3.listeners[r12]) {
      var i2 = t3.listeners[r12], a3 = i2.indexOf(e2);
      a3 !== -1 && i2.splice(a3, 1);
    }
  }
});
var wr = B(function(As, Tr) {
  Je();
  Tr.exports = gr;
  var Ca2 = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"];
  function gr(r12) {
    switch (r12.nodeType) {
      case 3:
        return et3(r12.data);
      case 8:
        return "<!--" + r12.data + "-->";
      default:
        return Ma(r12);
    }
  }
  function Ma(r12) {
    var e2 = [], t3 = r12.tagName;
    return r12.namespaceURI === "http://www.w3.org/1999/xhtml" && (t3 = t3.toLowerCase()), e2.push("<" + t3 + Fa(r12) + Ua(r12)), Ca2.indexOf(t3) > -1 ? e2.push(" />") : (e2.push(">"), r12.childNodes.length ? e2.push.apply(e2, r12.childNodes.map(gr)) : r12.textContent || r12.innerText ? e2.push(et3(r12.textContent || r12.innerText)) : r12.innerHTML && e2.push(r12.innerHTML), e2.push("</" + t3 + ">")), e2.join("");
  }
  function Ha(r12, e2) {
    var t3 = Ne(r12[e2]);
    return e2 === "style" && Object.keys(r12.style).length > 0 ? true : r12.hasOwnProperty(e2) && (t3 === "string" || t3 === "boolean" || t3 === "number") && e2 !== "nodeName" && e2 !== "className" && e2 !== "tagName" && e2 !== "textContent" && e2 !== "innerText" && e2 !== "namespaceURI" && e2 !== "innerHTML";
  }
  function Ba(r12) {
    if (typeof r12 == "string") return r12;
    var e2 = "";
    return Object.keys(r12).forEach(function(t3) {
      var i2 = r12[t3];
      t3 = t3.replace(/[A-Z]/g, function(a3) {
        return "-" + a3.toLowerCase();
      }), e2 += t3 + ":" + i2 + ";";
    }), e2;
  }
  function Ua(r12) {
    var e2 = r12.dataset, t3 = [];
    for (var i2 in e2) t3.push({ name: "data-" + i2, value: e2[i2] });
    return t3.length ? br(t3) : "";
  }
  function br(r12) {
    var e2 = [];
    return r12.forEach(function(t3) {
      var i2 = t3.name, a3 = t3.value;
      i2 === "style" && (a3 = Ba(a3)), e2.push(i2 + '="' + Va2(a3) + '"');
    }), e2.length ? " " + e2.join(" ") : "";
  }
  function Fa(r12) {
    var e2 = [];
    for (var t3 in r12) Ha(r12, t3) && e2.push({ name: t3, value: r12[t3] });
    for (var i2 in r12._attributes) for (var a3 in r12._attributes[i2]) {
      var n3 = r12._attributes[i2][a3], o4 = (n3.prefix ? n3.prefix + ":" : "") + a3;
      e2.push({ name: o4, value: n3.value });
    }
    return r12.className && e2.push({ name: "class", value: r12.className }), e2.length ? br(e2) : "";
  }
  function et3(r12) {
    var e2 = "";
    return typeof r12 == "string" ? e2 = r12 : r12 && (e2 = r12.toString()), e2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function Va2(r12) {
    return et3(r12).replace(/"/g, "&quot;");
  }
});
var rt = B(function(Ps, kr) {
  te();
  var tt2 = Ye(), Wa = Xe(), ja = $e(), Ga = Ze(), Ja = wr(), Er = "http://www.w3.org/1999/xhtml";
  kr.exports = I3;
  function I3(r12, e2, t3) {
    if (!U(this, I3)) return new I3(r12);
    var i2 = t3 === void 0 ? Er : t3 || null;
    this.tagName = i2 === Er ? String(r12).toUpperCase() : r12, this.nodeName = this.tagName, this.className = "", this.dataset = {}, this.childNodes = [], this.parentNode = null, this.style = {}, this.ownerDocument = e2 || null, this.namespaceURI = i2, this._attributes = {}, this.tagName === "INPUT" && (this.type = "text");
  }
  I3.prototype.type = "DOMElement";
  I3.prototype.nodeType = 1;
  I3.prototype.appendChild = function(e2) {
    return e2.parentNode && e2.parentNode.removeChild(e2), this.childNodes.push(e2), e2.parentNode = this, e2;
  };
  I3.prototype.replaceChild = function(e2, t3) {
    e2.parentNode && e2.parentNode.removeChild(e2);
    var i2 = this.childNodes.indexOf(t3);
    return t3.parentNode = null, this.childNodes[i2] = e2, e2.parentNode = this, t3;
  };
  I3.prototype.removeChild = function(e2) {
    var t3 = this.childNodes.indexOf(e2);
    return this.childNodes.splice(t3, 1), e2.parentNode = null, e2;
  };
  I3.prototype.insertBefore = function(e2, t3) {
    e2.parentNode && e2.parentNode.removeChild(e2);
    var i2 = t3 == null ? -1 : this.childNodes.indexOf(t3);
    return i2 > -1 ? this.childNodes.splice(i2, 0, e2) : this.childNodes.push(e2), e2.parentNode = this, e2;
  };
  I3.prototype.setAttributeNS = function(e2, t3, i2) {
    var a3 = null, n3 = t3, o4 = t3.indexOf(":");
    if (o4 > -1 && (a3 = t3.substr(0, o4), n3 = t3.substr(o4 + 1)), this.tagName === "INPUT" && t3 === "type") this.type = i2;
    else {
      var s3 = this._attributes[e2] || (this._attributes[e2] = {});
      s3[n3] = { value: i2, prefix: a3 };
    }
  };
  I3.prototype.getAttributeNS = function(e2, t3) {
    var i2 = this._attributes[e2], a3 = i2 && i2[t3] && i2[t3].value;
    return this.tagName === "INPUT" && t3 === "type" ? this.type : typeof a3 != "string" ? null : a3;
  };
  I3.prototype.removeAttributeNS = function(e2, t3) {
    var i2 = this._attributes[e2];
    i2 && delete i2[t3];
  };
  I3.prototype.hasAttributeNS = function(e2, t3) {
    var i2 = this._attributes[e2];
    return !!i2 && t3 in i2;
  };
  I3.prototype.setAttribute = function(e2, t3) {
    return this.setAttributeNS(null, e2, t3);
  };
  I3.prototype.getAttribute = function(e2) {
    return this.getAttributeNS(null, e2);
  };
  I3.prototype.removeAttribute = function(e2) {
    return this.removeAttributeNS(null, e2);
  };
  I3.prototype.hasAttribute = function(e2) {
    return this.hasAttributeNS(null, e2);
  };
  I3.prototype.removeEventListener = Ga;
  I3.prototype.addEventListener = ja;
  I3.prototype.dispatchEvent = Wa;
  I3.prototype.focus = function() {
  };
  I3.prototype.toString = function() {
    return Ja(this);
  };
  I3.prototype.getElementsByClassName = function(e2) {
    var t3 = e2.split(" "), i2 = [];
    return tt2(this, function(a3) {
      if (a3.nodeType === 1) {
        var n3 = a3.className || "", o4 = n3.split(" ");
        t3.every(function(s3) {
          return o4.indexOf(s3) !== -1;
        }) && i2.push(a3);
      }
    }), i2;
  };
  I3.prototype.getElementsByTagName = function(e2) {
    e2 = e2.toLowerCase();
    var t3 = [];
    return tt2(this.childNodes, function(i2) {
      i2.nodeType === 1 && (e2 === "*" || i2.tagName.toLowerCase() === e2) && t3.push(i2);
    }), t3;
  };
  I3.prototype.contains = function(e2) {
    return tt2(this, function(t3) {
      return e2 === t3;
    }) || false;
  };
});
var Dr = B(function(Ns, xr) {
  te();
  var at4 = rt();
  xr.exports = K3;
  function K3(r12) {
    if (!U(this, K3)) return new K3();
    this.childNodes = [], this.parentNode = null, this.ownerDocument = r12 || null;
  }
  K3.prototype.type = "DocumentFragment";
  K3.prototype.nodeType = 11;
  K3.prototype.nodeName = "#document-fragment";
  K3.prototype.appendChild = at4.prototype.appendChild;
  K3.prototype.replaceChild = at4.prototype.replaceChild;
  K3.prototype.removeChild = at4.prototype.removeChild;
  K3.prototype.toString = function() {
    return this.childNodes.map(function(e2) {
      return String(e2);
    }).join("");
  };
});
var Rr = B(function(Ls, Sr) {
  Sr.exports = it3;
  function it3(r12) {
  }
  it3.prototype.initEvent = function(e2, t3, i2) {
    this.type = e2, this.bubbles = t3, this.cancelable = i2;
  };
  it3.prototype.preventDefault = function() {
  };
});
var Ar = B(function(Ms, qr) {
  te();
  var Qa = Ye(), za = fr(), Ka = vr(), Re3 = rt(), Ya = Dr(), Xa = Rr(), $a = Xe(), Za = $e(), ei = Ze();
  qr.exports = Be2;
  function Be2() {
    if (!U(this, Be2)) return new Be2();
    this.head = this.createElement("head"), this.body = this.createElement("body"), this.documentElement = this.createElement("html"), this.documentElement.appendChild(this.head), this.documentElement.appendChild(this.body), this.childNodes = [this.documentElement], this.nodeType = 9;
  }
  var j4 = Be2.prototype;
  j4.createTextNode = function(e2) {
    return new Ka(e2, this);
  };
  j4.createElementNS = function(e2, t3) {
    var i2 = e2 === null ? null : String(e2);
    return new Re3(t3, this, i2);
  };
  j4.createElement = function(e2) {
    return new Re3(e2, this);
  };
  j4.createDocumentFragment = function() {
    return new Ya(this);
  };
  j4.createEvent = function(e2) {
    return new Xa(e2);
  };
  j4.createComment = function(e2) {
    return new za(e2, this);
  };
  j4.getElementById = function(e2) {
    e2 = String(e2);
    var t3 = Qa(this.childNodes, function(i2) {
      if (String(i2.id) === e2) return i2;
    });
    return t3 || null;
  };
  j4.getElementsByClassName = Re3.prototype.getElementsByClassName;
  j4.getElementsByTagName = Re3.prototype.getElementsByTagName;
  j4.contains = Re3.prototype.contains;
  j4.removeEventListener = ei;
  j4.addEventListener = Za;
  j4.dispatchEvent = $a;
});
var Pr = B(function(Hs, Or) {
  var ti = Ar();
  Or.exports = new ti();
});
var nt = B(function(Bs, Nr) {
  var Ir = typeof global != "undefined" ? global : typeof window != "undefined" ? window : {}, ri = Pr(), qe3;
  typeof document != "undefined" ? qe3 = document : (qe3 = Ir["__GLOBAL_DOCUMENT_CACHE@4"], qe3 || (qe3 = Ir["__GLOBAL_DOCUMENT_CACHE@4"] = ri));
  Nr.exports = qe3;
});
function vt(r12) {
  if (Array.isArray(r12)) return r12;
}
function mt(r12, e2) {
  var t3 = r12 == null ? null : typeof Symbol != "undefined" && r12[Symbol.iterator] || r12["@@iterator"];
  if (t3 != null) {
    var i2 = [], a3 = true, n3 = false, o4, s3;
    try {
      for (t3 = t3.call(r12); !(a3 = (o4 = t3.next()).done) && (i2.push(o4.value), !(e2 && i2.length === e2)); a3 = true) ;
    } catch (u5) {
      n3 = true, s3 = u5;
    } finally {
      try {
        !a3 && t3.return != null && t3.return();
      } finally {
        if (n3) throw s3;
      }
    }
    return i2;
  }
}
function ht() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ke(r12, e2) {
  (e2 == null || e2 > r12.length) && (e2 = r12.length);
  for (var t3 = 0, i2 = new Array(e2); t3 < e2; t3++) i2[t3] = r12[t3];
  return i2;
}
function Ae(r12, e2) {
  if (r12) {
    if (typeof r12 == "string") return ke(r12, e2);
    var t3 = Object.prototype.toString.call(r12).slice(8, -1);
    if (t3 === "Object" && r12.constructor && (t3 = r12.constructor.name), t3 === "Map" || t3 === "Set") return Array.from(t3);
    if (t3 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t3)) return ke(r12, e2);
  }
}
function H(r12, e2) {
  return vt(r12) || mt(r12, e2) || Ae(r12, e2) || ht();
}
var be = V(J());
var Ge = V(J());
var gt = V(J());
var ra = { now: function() {
  var r12 = gt.default.performance, e2 = r12 && r12.timing, t3 = e2 && e2.navigationStart, i2 = typeof t3 == "number" && typeof r12.now == "function" ? t3 + r12.now() : Date.now();
  return Math.round(i2);
} };
var A = ra;
var ee = function() {
  var e2, t3, i2;
  if (typeof ((e2 = Ge.default.crypto) === null || e2 === void 0 ? void 0 : e2.getRandomValues) == "function") {
    i2 = new Uint8Array(32), Ge.default.crypto.getRandomValues(i2);
    for (var a3 = 0; a3 < 32; a3++) i2[a3] = i2[a3] % 16;
  } else {
    i2 = [];
    for (var n3 = 0; n3 < 32; n3++) i2[n3] = Math.random() * 16 | 0;
  }
  var o4 = 0;
  t3 = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(p6) {
    var b4 = p6 === "x" ? i2[o4] : i2[o4] & 3 | 8;
    return o4++, b4.toString(16);
  });
  var s3 = A.now(), u5 = s3 == null ? void 0 : s3.toString(16).substring(3);
  return u5 ? t3.substring(0, 28) + u5 : t3;
};
var Oe = function() {
  return ("000000" + (Math.random() * Math.pow(36, 6) << 0).toString(36)).slice(-6);
};
var Q = function(e2) {
  if (e2 && typeof e2.nodeName != "undefined") return e2.muxId || (e2.muxId = Oe()), e2.muxId;
  var t3;
  try {
    t3 = document.querySelector(e2);
  } catch (i2) {
  }
  return t3 && !t3.muxId && (t3.muxId = e2), (t3 == null ? void 0 : t3.muxId) || e2;
};
var se = function(e2) {
  var t3;
  e2 && typeof e2.nodeName != "undefined" ? (t3 = e2, e2 = Q(t3)) : t3 = document.querySelector(e2);
  var i2 = t3 && t3.nodeName ? t3.nodeName.toLowerCase() : "";
  return [t3, e2, i2];
};
function bt(r12) {
  if (Array.isArray(r12)) return ke(r12);
}
function Tt(r12) {
  if (typeof Symbol != "undefined" && r12[Symbol.iterator] != null || r12["@@iterator"] != null) return Array.from(r12);
}
function wt() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function W(r12) {
  return bt(r12) || Tt(r12) || Ae(r12) || wt();
}
var Y = { TRACE: 0, DEBUG: 1, INFO: 2, WARN: 3, ERROR: 4, SILENT: 5 };
var Et = function(r12) {
  var e2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3, t3, i2, a3, n3, o4, s3 = r12 ? [console, r12] : [console], u5 = (t3 = console.trace).bind.apply(t3, W(s3)), p6 = (i2 = console.info).bind.apply(i2, W(s3)), b4 = (a3 = console.debug).bind.apply(a3, W(s3)), k4 = (n3 = console.warn).bind.apply(n3, W(s3)), y5 = (o4 = console.error).bind.apply(o4, W(s3)), c4 = e2;
  return { trace: function() {
    for (var T3 = arguments.length, x7 = new Array(T3), m6 = 0; m6 < T3; m6++) x7[m6] = arguments[m6];
    if (!(c4 > Y.TRACE)) return u5.apply(void 0, W(x7));
  }, debug: function() {
    for (var T3 = arguments.length, x7 = new Array(T3), m6 = 0; m6 < T3; m6++) x7[m6] = arguments[m6];
    if (!(c4 > Y.DEBUG)) return b4.apply(void 0, W(x7));
  }, info: function() {
    for (var T3 = arguments.length, x7 = new Array(T3), m6 = 0; m6 < T3; m6++) x7[m6] = arguments[m6];
    if (!(c4 > Y.INFO)) return p6.apply(void 0, W(x7));
  }, warn: function() {
    for (var T3 = arguments.length, x7 = new Array(T3), m6 = 0; m6 < T3; m6++) x7[m6] = arguments[m6];
    if (!(c4 > Y.WARN)) return k4.apply(void 0, W(x7));
  }, error: function() {
    for (var T3 = arguments.length, x7 = new Array(T3), m6 = 0; m6 < T3; m6++) x7[m6] = arguments[m6];
    if (!(c4 > Y.ERROR)) return y5.apply(void 0, W(x7));
  }, get level() {
    return c4;
  }, set level(v4) {
    v4 !== this.level && (c4 = v4 != null ? v4 : e2);
  } };
};
var q = Et("[mux]");
var Pe = V(J());
function ce() {
  var r12 = Pe.default.doNotTrack || Pe.default.navigator && Pe.default.navigator.doNotTrack;
  return r12 === "1";
}
function g(r12) {
  if (r12 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return r12;
}
te();
function D(r12, e2) {
  if (!U(r12, e2)) throw new TypeError("Cannot call a class as a function");
}
function kt(r12, e2) {
  for (var t3 = 0; t3 < e2.length; t3++) {
    var i2 = e2[t3];
    i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(r12, i2.key, i2);
  }
}
function L(r12, e2, t3) {
  return e2 && kt(r12.prototype, e2), t3 && kt(r12, t3), r12;
}
function l(r12, e2, t3) {
  return e2 in r12 ? Object.defineProperty(r12, e2, { value: t3, enumerable: true, configurable: true, writable: true }) : r12[e2] = t3, r12;
}
function X(r12) {
  return X = Object.setPrototypeOf ? Object.getPrototypeOf : function(t3) {
    return t3.__proto__ || Object.getPrototypeOf(t3);
  }, X(r12);
}
function xt(r12, e2) {
  for (; !Object.prototype.hasOwnProperty.call(r12, e2) && (r12 = X(r12), r12 !== null); ) ;
  return r12;
}
function De(r12, e2, t3) {
  return typeof Reflect != "undefined" && Reflect.get ? De = Reflect.get : De = function(a3, n3, o4) {
    var s3 = xt(a3, n3);
    if (s3) {
      var u5 = Object.getOwnPropertyDescriptor(s3, n3);
      return u5.get ? u5.get.call(o4 || a3) : u5.value;
    }
  }, De(r12, e2, t3 || r12);
}
function Ie(r12, e2) {
  return Ie = Object.setPrototypeOf || function(i2, a3) {
    return i2.__proto__ = a3, i2;
  }, Ie(r12, e2);
}
function Dt(r12, e2) {
  if (typeof e2 != "function" && e2 !== null) throw new TypeError("Super expression must either be null or a function");
  r12.prototype = Object.create(e2 && e2.prototype, { constructor: { value: r12, writable: true, configurable: true } }), e2 && Ie(r12, e2);
}
function St() {
  if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) return false;
  if (typeof Proxy == "function") return true;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), true;
  } catch (r12) {
    return false;
  }
}
Je();
function Rt(r12, e2) {
  return e2 && (Ne(e2) === "object" || typeof e2 == "function") ? e2 : g(r12);
}
function qt(r12) {
  var e2 = St();
  return function() {
    var i2 = X(r12), a3;
    if (e2) {
      var n3 = X(this).constructor;
      a3 = Reflect.construct(i2, arguments, n3);
    } else a3 = i2.apply(this, arguments);
    return Rt(this, a3);
  };
}
var F = function(r12) {
  return re(r12)[0];
};
var re = function(r12) {
  if (typeof r12 != "string" || r12 === "") return ["localhost"];
  var e2 = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/, t3 = r12.match(e2) || [], i2 = t3[4], a3;
  return i2 && (a3 = (i2.match(/[^\.]+\.[^\.]+$/) || [])[0]), [i2, a3];
};
var Le = V(J());
var aa = { exists: function() {
  var r12 = Le.default.performance, e2 = r12 && r12.timing;
  return e2 !== void 0;
}, domContentLoadedEventEnd: function() {
  var r12 = Le.default.performance, e2 = r12 && r12.timing;
  return e2 && e2.domContentLoadedEventEnd;
}, navigationStart: function() {
  var r12 = Le.default.performance, e2 = r12 && r12.timing;
  return e2 && e2.navigationStart;
} };
var _e = aa;
function O(r12, e2, t3) {
  t3 = t3 === void 0 ? 1 : t3, r12[e2] = r12[e2] || 0, r12[e2] += t3;
}
function ue(r12) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var t3 = arguments[e2] != null ? arguments[e2] : {}, i2 = Object.keys(t3);
    typeof Object.getOwnPropertySymbols == "function" && (i2 = i2.concat(Object.getOwnPropertySymbols(t3).filter(function(a3) {
      return Object.getOwnPropertyDescriptor(t3, a3).enumerable;
    }))), i2.forEach(function(a3) {
      l(r12, a3, t3[a3]);
    });
  }
  return r12;
}
function ia(r12, e2) {
  var t3 = Object.keys(r12);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(r12);
    e2 && (i2 = i2.filter(function(a3) {
      return Object.getOwnPropertyDescriptor(r12, a3).enumerable;
    })), t3.push.apply(t3, i2);
  }
  return t3;
}
function fe(r12, e2) {
  return e2 = e2 != null ? e2 : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(r12, Object.getOwnPropertyDescriptors(e2)) : ia(Object(e2)).forEach(function(t3) {
    Object.defineProperty(r12, t3, Object.getOwnPropertyDescriptor(e2, t3));
  }), r12;
}
var na = ["x-cdn", "content-type"];
var At = ["x-request-id", "cf-ray", "x-amz-cf-id", "x-akamai-request-id"];
var oa = na.concat(At);
function pe(r12) {
  r12 = r12 || "";
  var e2 = {}, t3 = r12.trim().split(/[\r\n]+/);
  return t3.forEach(function(i2) {
    if (i2) {
      var a3 = i2.split(": "), n3 = a3.shift();
      n3 && (oa.indexOf(n3.toLowerCase()) >= 0 || n3.toLowerCase().indexOf("x-litix-") === 0) && (e2[n3] = a3.join(": "));
    }
  }), e2;
}
function de(r12) {
  if (r12) {
    var e2 = At.find(function(t3) {
      return r12[t3] !== void 0;
    });
    return e2 ? r12[e2] : void 0;
  }
}
var sa = function(r12) {
  var e2 = {};
  for (var t3 in r12) {
    var i2 = r12[t3], a3 = i2["DATA-ID"].search("io.litix.data.");
    if (a3 !== -1) {
      var n3 = i2["DATA-ID"].replace("io.litix.data.", "");
      e2[n3] = i2.VALUE;
    }
  }
  return e2;
};
var Ce = sa;
var Me = function(r12) {
  if (!r12) return {};
  var e2 = _e.navigationStart(), t3 = r12.loading, i2 = t3 ? t3.start : r12.trequest, a3 = t3 ? t3.first : r12.tfirst, n3 = t3 ? t3.end : r12.tload;
  return { bytesLoaded: r12.total, requestStart: Math.round(e2 + i2), responseStart: Math.round(e2 + a3), responseEnd: Math.round(e2 + n3) };
};
var Se = function(r12) {
  if (!(!r12 || typeof r12.getAllResponseHeaders != "function")) return pe(r12.getAllResponseHeaders());
};
var Ot = function(r12, e2, t3) {
  var i2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a3 = arguments.length > 4 ? arguments[4] : void 0, n3 = r12.log, o4 = r12.utils.secondsToMs, s3 = function(m6) {
    var f6 = parseInt(a3.version), _3;
    return f6 === 1 && m6.programDateTime !== null && (_3 = m6.programDateTime), f6 === 0 && m6.pdt !== null && (_3 = m6.pdt), _3;
  };
  if (!_e.exists()) {
    n3.warn("performance timing not supported. Not tracking HLS.js.");
    return;
  }
  var u5 = function(m6, f6) {
    return r12.emit(e2, m6, f6);
  }, p6 = function(m6, f6) {
    var _3 = f6.levels, d4 = f6.audioTracks, h3 = f6.url, w3 = f6.stats, E4 = f6.networkDetails, S3 = f6.sessionData, N3 = {}, M4 = {};
    _3.forEach(function(G3, oe4) {
      N3[oe4] = { width: G3.width, height: G3.height, bitrate: G3.bitrate, attrs: G3.attrs };
    }), d4.forEach(function(G3, oe4) {
      M4[oe4] = { name: G3.name, language: G3.lang, bitrate: G3.bitrate };
    });
    var P5 = Me(w3), R = P5.bytesLoaded, Z2 = P5.requestStart, Te2 = P5.responseStart, we3 = P5.responseEnd;
    u5("requestcompleted", fe(ue({}, Ce(S3)), { request_event_type: m6, request_bytes_loaded: R, request_start: Z2, request_response_start: Te2, request_response_end: we3, request_type: "manifest", request_hostname: F(h3), request_response_headers: Se(E4), request_rendition_lists: { media: N3, audio: M4, video: {} } }));
  };
  t3.on(a3.Events.MANIFEST_LOADED, p6);
  var b4 = function(m6, f6) {
    var _3 = f6.details, d4 = f6.level, h3 = f6.networkDetails, w3 = f6.stats, E4 = Me(w3), S3 = E4.bytesLoaded, N3 = E4.requestStart, M4 = E4.responseStart, P5 = E4.responseEnd, R = _3.fragments[_3.fragments.length - 1], Z2 = s3(R) + o4(R.duration);
    u5("requestcompleted", { request_event_type: m6, request_bytes_loaded: S3, request_start: N3, request_response_start: M4, request_response_end: P5, request_current_level: d4, request_type: "manifest", request_hostname: F(_3.url), request_response_headers: Se(h3), video_holdback: _3.holdBack && o4(_3.holdBack), video_part_holdback: _3.partHoldBack && o4(_3.partHoldBack), video_part_target_duration: _3.partTarget && o4(_3.partTarget), video_target_duration: _3.targetduration && o4(_3.targetduration), video_source_is_live: _3.live, player_manifest_newest_program_time: isNaN(Z2) ? void 0 : Z2 });
  };
  t3.on(a3.Events.LEVEL_LOADED, b4);
  var k4 = function(m6, f6) {
    var _3 = f6.details, d4 = f6.networkDetails, h3 = f6.stats, w3 = Me(h3), E4 = w3.bytesLoaded, S3 = w3.requestStart, N3 = w3.responseStart, M4 = w3.responseEnd;
    u5("requestcompleted", { request_event_type: m6, request_bytes_loaded: E4, request_start: S3, request_response_start: N3, request_response_end: M4, request_type: "manifest", request_hostname: F(_3.url), request_response_headers: Se(d4) });
  };
  t3.on(a3.Events.AUDIO_TRACK_LOADED, k4);
  var y5 = function(m6, f6) {
    var _3 = f6.stats, d4 = f6.networkDetails, h3 = f6.frag;
    _3 = _3 || h3.stats;
    var w3 = Me(_3), E4 = w3.bytesLoaded, S3 = w3.requestStart, N3 = w3.responseStart, M4 = w3.responseEnd, P5 = d4 ? Se(d4) : void 0, R = { request_event_type: m6, request_bytes_loaded: E4, request_start: S3, request_response_start: N3, request_response_end: M4, request_hostname: d4 ? F(d4.responseURL) : void 0, request_id: P5 ? de(P5) : void 0, request_response_headers: P5, request_media_duration: h3.duration, request_url: d4 == null ? void 0 : d4.responseURL };
    h3.type === "main" ? (R.request_type = "media", R.request_current_level = h3.level, R.request_video_width = (t3.levels[h3.level] || {}).width, R.request_video_height = (t3.levels[h3.level] || {}).height, R.request_labeled_bitrate = (t3.levels[h3.level] || {}).bitrate) : R.request_type = h3.type, u5("requestcompleted", R);
  };
  t3.on(a3.Events.FRAG_LOADED, y5);
  var c4 = function(m6, f6) {
    var _3 = f6.frag, d4 = _3.start, h3 = s3(_3), w3 = { currentFragmentPDT: h3, currentFragmentStart: o4(d4) };
    u5("fragmentchange", w3);
  };
  t3.on(a3.Events.FRAG_CHANGED, c4);
  var v4 = function(m6, f6) {
    var _3 = f6.type, d4 = f6.details, h3 = f6.response, w3 = f6.fatal, E4 = f6.frag, S3 = f6.networkDetails, N3 = (E4 == null ? void 0 : E4.url) || f6.url || "", M4 = S3 ? Se(S3) : void 0;
    if ((d4 === a3.ErrorDetails.MANIFEST_LOAD_ERROR || d4 === a3.ErrorDetails.MANIFEST_LOAD_TIMEOUT || d4 === a3.ErrorDetails.FRAG_LOAD_ERROR || d4 === a3.ErrorDetails.FRAG_LOAD_TIMEOUT || d4 === a3.ErrorDetails.LEVEL_LOAD_ERROR || d4 === a3.ErrorDetails.LEVEL_LOAD_TIMEOUT || d4 === a3.ErrorDetails.AUDIO_TRACK_LOAD_ERROR || d4 === a3.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT || d4 === a3.ErrorDetails.SUBTITLE_LOAD_ERROR || d4 === a3.ErrorDetails.SUBTITLE_LOAD_TIMEOUT || d4 === a3.ErrorDetails.KEY_LOAD_ERROR || d4 === a3.ErrorDetails.KEY_LOAD_TIMEOUT) && u5("requestfailed", { request_error: d4, request_url: N3, request_hostname: F(N3), request_id: M4 ? de(M4) : void 0, request_type: d4 === a3.ErrorDetails.FRAG_LOAD_ERROR || d4 === a3.ErrorDetails.FRAG_LOAD_TIMEOUT ? "media" : d4 === a3.ErrorDetails.AUDIO_TRACK_LOAD_ERROR || d4 === a3.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT ? "audio" : d4 === a3.ErrorDetails.SUBTITLE_LOAD_ERROR || d4 === a3.ErrorDetails.SUBTITLE_LOAD_TIMEOUT ? "subtitle" : d4 === a3.ErrorDetails.KEY_LOAD_ERROR || d4 === a3.ErrorDetails.KEY_LOAD_TIMEOUT ? "encryption" : "manifest", request_error_code: h3 == null ? void 0 : h3.code, request_error_text: h3 == null ? void 0 : h3.text }), w3) {
      var P5, R = "".concat(N3 ? "url: ".concat(N3, "\n") : "") + "".concat(h3 && (h3.code || h3.text) ? "response: ".concat(h3.code, ", ").concat(h3.text, "\n") : "") + "".concat(f6.reason ? "failure reason: ".concat(f6.reason, "\n") : "") + "".concat(f6.level ? "level: ".concat(f6.level, "\n") : "") + "".concat(f6.parent ? "parent stream controller: ".concat(f6.parent, "\n") : "") + "".concat(f6.buffer ? "buffer length: ".concat(f6.buffer, "\n") : "") + "".concat(f6.error ? "error: ".concat(f6.error, "\n") : "") + "".concat(f6.event ? "event: ".concat(f6.event, "\n") : "") + "".concat(f6.err ? "error message: ".concat((P5 = f6.err) === null || P5 === void 0 ? void 0 : P5.message, "\n") : "");
      u5("error", { player_error_code: _3, player_error_message: d4, player_error_context: R });
    }
  };
  t3.on(a3.Events.ERROR, v4);
  var T3 = function(m6, f6) {
    var _3 = f6.frag, d4 = _3 && _3._url || "";
    u5("requestcanceled", { request_event_type: m6, request_url: d4, request_type: "media", request_hostname: F(d4) });
  };
  t3.on(a3.Events.FRAG_LOAD_EMERGENCY_ABORTED, T3);
  var x7 = function(m6, f6) {
    var _3 = f6.level, d4 = t3.levels[_3];
    if (d4 && d4.attrs && d4.attrs.BANDWIDTH) {
      var h3 = d4.attrs.BANDWIDTH, w3, E4 = parseFloat(d4.attrs["FRAME-RATE"]);
      isNaN(E4) || (w3 = E4), h3 ? u5("renditionchange", { video_source_fps: w3, video_source_bitrate: h3, video_source_width: d4.width, video_source_height: d4.height, video_source_rendition_name: d4.name, video_source_codec: d4 == null ? void 0 : d4.videoCodec }) : n3.warn("missing BANDWIDTH from HLS manifest parsed by HLS.js");
    }
  };
  t3.on(a3.Events.LEVEL_SWITCHED, x7), t3._stopMuxMonitor = function() {
    t3.off(a3.Events.MANIFEST_LOADED, p6), t3.off(a3.Events.LEVEL_LOADED, b4), t3.off(a3.Events.AUDIO_TRACK_LOADED, k4), t3.off(a3.Events.FRAG_LOADED, y5), t3.off(a3.Events.FRAG_CHANGED, c4), t3.off(a3.Events.ERROR, v4), t3.off(a3.Events.FRAG_LOAD_EMERGENCY_ABORTED, T3), t3.off(a3.Events.LEVEL_SWITCHED, x7), t3.off(a3.Events.DESTROYING, t3._stopMuxMonitor), delete t3._stopMuxMonitor;
  }, t3.on(a3.Events.DESTROYING, t3._stopMuxMonitor);
};
var Pt = function(r12) {
  r12 && typeof r12._stopMuxMonitor == "function" && r12._stopMuxMonitor();
};
var It = function(r12, e2) {
  if (!r12 || !r12.requestEndDate) return {};
  var t3 = F(r12.url), i2 = r12.url, a3 = r12.bytesLoaded, n3 = new Date(r12.requestStartDate).getTime(), o4 = new Date(r12.firstByteDate).getTime(), s3 = new Date(r12.requestEndDate).getTime(), u5 = isNaN(r12.duration) ? 0 : r12.duration, p6 = typeof e2.getMetricsFor == "function" ? e2.getMetricsFor(r12.mediaType).HttpList : e2.getDashMetrics().getHttpRequests(r12.mediaType), b4;
  p6.length > 0 && (b4 = pe(p6[p6.length - 1]._responseHeaders || ""));
  var k4 = b4 ? de(b4) : void 0;
  return { requestStart: n3, requestResponseStart: o4, requestResponseEnd: s3, requestBytesLoaded: a3, requestResponseHeaders: b4, requestMediaDuration: u5, requestHostname: t3, requestUrl: i2, requestId: k4 };
};
var ua = function(r12, e2) {
  var t3 = e2.getQualityFor(r12), i2 = e2.getCurrentTrackFor(r12).bitrateList;
  return i2 ? { currentLevel: t3, renditionWidth: i2[t3].width || null, renditionHeight: i2[t3].height || null, renditionBitrate: i2[t3].bandwidth } : {};
};
var da = function(r12) {
  var e2;
  return (e2 = r12.match(/.*codecs\*?="(.*)"/)) === null || e2 === void 0 ? void 0 : e2[1];
};
var la = function(e2) {
  try {
    var t3, i2, a3 = (i2 = e2.getVersion) === null || i2 === void 0 || (t3 = i2.call(e2)) === null || t3 === void 0 ? void 0 : t3.split(".").map(function(n3) {
      return parseInt(n3);
    })[0];
    return a3;
  } catch (n3) {
    return false;
  }
};
var Nt = function(r12, e2, t3) {
  var i2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a3 = r12.log;
  if (!t3 || !t3.on) {
    a3.warn("Invalid dash.js player reference. Monitoring blocked.");
    return;
  }
  var n3 = la(t3), o4 = function(_3, d4) {
    return r12.emit(e2, _3, d4);
  }, s3 = function(_3) {
    var d4 = _3.type, h3 = _3.data, w3 = (h3 || {}).url;
    o4("requestcompleted", { request_event_type: d4, request_start: 0, request_response_start: 0, request_response_end: 0, request_bytes_loaded: -1, request_type: "manifest", request_hostname: F(w3), request_url: w3 });
  };
  t3.on("manifestLoaded", s3);
  var u5 = {}, p6 = function(_3) {
    if (typeof _3.getRequests != "function") return null;
    var d4 = _3.getRequests({ state: "executed" });
    return d4.length === 0 ? null : d4[d4.length - 1];
  }, b4 = function(_3) {
    var d4 = _3.type, h3 = _3.fragmentModel, w3 = _3.chunk, E4 = p6(h3);
    k4({ type: d4, request: E4, chunk: w3 });
  }, k4 = function(_3) {
    var d4 = _3.type, h3 = _3.chunk, w3 = _3.request, E4 = (h3 || {}).mediaInfo, S3 = E4 || {}, N3 = S3.type, M4 = S3.bitrateList;
    M4 = M4 || [];
    var P5 = {};
    M4.forEach(function(Ee4, z3) {
      P5[z3] = {}, P5[z3].width = Ee4.width, P5[z3].height = Ee4.height, P5[z3].bitrate = Ee4.bandwidth, P5[z3].attrs = {};
    }), N3 === "video" ? u5.video = P5 : N3 === "audio" ? u5.audio = P5 : u5.media = P5;
    var R = It(w3, t3), Z2 = R.requestStart, Te2 = R.requestResponseStart, we3 = R.requestResponseEnd, G3 = R.requestResponseHeaders, oe4 = R.requestMediaDuration, Ve2 = R.requestHostname, We2 = R.requestUrl, je2 = R.requestId;
    o4("requestcompleted", { request_event_type: d4, request_start: Z2, request_response_start: Te2, request_response_end: we3, request_bytes_loaded: -1, request_type: N3 + "_init", request_response_headers: G3, request_hostname: Ve2, request_id: je2, request_url: We2, request_media_duration: oe4, request_rendition_lists: u5 });
  };
  n3 >= 4 ? t3.on("initFragmentLoaded", k4) : t3.on("initFragmentLoaded", b4);
  var y5 = function(_3) {
    var d4 = _3.type, h3 = _3.fragmentModel, w3 = _3.chunk, E4 = p6(h3);
    c4({ type: d4, request: E4, chunk: w3 });
  }, c4 = function(_3) {
    var d4 = _3.type, h3 = _3.chunk, w3 = _3.request, E4 = h3 || {}, S3 = E4.mediaInfo, N3 = E4.start, M4 = S3 || {}, P5 = M4.type, R = It(w3, t3), Z2 = R.requestStart, Te2 = R.requestResponseStart, we3 = R.requestResponseEnd, G3 = R.requestBytesLoaded, oe4 = R.requestResponseHeaders, Ve2 = R.requestMediaDuration, We2 = R.requestHostname, je2 = R.requestUrl, Ee4 = R.requestId, z3 = ua(P5, t3), Jr = z3.currentLevel, Qr = z3.renditionWidth, zr = z3.renditionHeight, Kr = z3.renditionBitrate;
    o4("requestcompleted", { request_event_type: d4, request_start: Z2, request_response_start: Te2, request_response_end: we3, request_bytes_loaded: G3, request_type: P5, request_response_headers: oe4, request_hostname: We2, request_id: Ee4, request_url: je2, request_media_start_time: N3, request_media_duration: Ve2, request_current_level: Jr, request_labeled_bitrate: Kr, request_video_width: Qr, request_video_height: zr });
  };
  n3 >= 4 ? t3.on("mediaFragmentLoaded", c4) : t3.on("mediaFragmentLoaded", y5);
  var v4 = { video: void 0, audio: void 0, totalBitrate: void 0 }, T3 = function() {
    if (v4.video && typeof v4.video.bitrate == "number") {
      if (!(v4.video.width && v4.video.height)) {
        a3.warn("have bitrate info for video but missing width/height");
        return;
      }
      var _3 = v4.video.bitrate;
      if (v4.audio && typeof v4.audio.bitrate == "number" && (_3 += v4.audio.bitrate), _3 !== v4.totalBitrate) return v4.totalBitrate = _3, { video_source_bitrate: _3, video_source_height: v4.video.height, video_source_width: v4.video.width, video_source_codec: da(v4.video.codec) };
    }
  }, x7 = function(_3, d4, h3) {
    if (typeof _3.newQuality != "number") {
      a3.warn("missing evt.newQuality in qualityChangeRendered event", _3);
      return;
    }
    var w3 = _3.mediaType;
    if (w3 === "audio" || w3 === "video") {
      var E4 = t3.getBitrateInfoListFor(w3).find(function(N3) {
        var M4 = N3.qualityIndex;
        return M4 === _3.newQuality;
      });
      if (!(E4 && typeof E4.bitrate == "number")) {
        a3.warn("missing bitrate info for ".concat(w3));
        return;
      }
      v4[w3] = fe(ue({}, E4), { codec: t3.getCurrentTrackFor(w3).codec });
      var S3 = T3();
      S3 && o4("renditionchange", S3);
    }
  };
  t3.on("qualityChangeRendered", x7);
  var m6 = function(_3) {
    var d4 = _3.request, h3 = _3.mediaType;
    d4 = d4 || {}, o4("requestcanceled", { request_event_type: d4.type + "_" + d4.action, request_url: d4.url, request_type: h3, request_hostname: F(d4.url) });
  };
  t3.on("fragmentLoadingAbandoned", m6);
  var f6 = function(_3) {
    var d4 = _3.error, h3, w3, E4 = (d4 == null || (h3 = d4.data) === null || h3 === void 0 ? void 0 : h3.request) || {}, S3 = (d4 == null || (w3 = d4.data) === null || w3 === void 0 ? void 0 : w3.response) || {};
    (d4 == null ? void 0 : d4.code) === 27 && o4("requestfailed", { request_error: E4.type + "_" + E4.action, request_url: E4.url, request_hostname: F(E4.url), request_type: E4.mediaType, request_error_code: S3.status, request_error_text: S3.statusText });
    var N3 = "".concat(E4 != null && E4.url ? "url: ".concat(E4.url, "\n") : "") + "".concat(S3 != null && S3.status || S3 != null && S3.statusText ? "response: ".concat(S3 == null ? void 0 : S3.status, ", ").concat(S3 == null ? void 0 : S3.statusText, "\n") : "");
    o4("error", { player_error_code: d4 == null ? void 0 : d4.code, player_error_message: d4 == null ? void 0 : d4.message, player_error_context: N3 });
  };
  t3.on("error", f6), t3._stopMuxMonitor = function() {
    t3.off("manifestLoaded", s3), t3.off("initFragmentLoaded", k4), t3.off("mediaFragmentLoaded", c4), t3.off("qualityChangeRendered", x7), t3.off("error", f6), t3.off("fragmentLoadingAbandoned", m6), delete t3._stopMuxMonitor;
  };
};
var Lt = function(r12) {
  r12 && typeof r12._stopMuxMonitor == "function" && r12._stopMuxMonitor();
};
var Ct = 0;
var ca = function() {
  "use strict";
  function r12() {
    D(this, r12), l(this, "_listeners", void 0);
  }
  return L(r12, [{ key: "on", value: function(t3, i2, a3) {
    return i2._eventEmitterGuid = i2._eventEmitterGuid || ++Ct, this._listeners = this._listeners || {}, this._listeners[t3] = this._listeners[t3] || [], a3 && (i2 = i2.bind(a3)), this._listeners[t3].push(i2), i2;
  } }, { key: "off", value: function(t3, i2) {
    var a3 = this._listeners && this._listeners[t3];
    a3 && a3.forEach(function(n3, o4) {
      n3._eventEmitterGuid === i2._eventEmitterGuid && a3.splice(o4, 1);
    });
  } }, { key: "one", value: function(t3, i2, a3) {
    var n3 = this;
    i2._eventEmitterGuid = i2._eventEmitterGuid || ++Ct;
    var o4 = function() {
      n3.off(t3, o4), i2.apply(a3 || this, arguments);
    };
    o4._eventEmitterGuid = i2._eventEmitterGuid, this.on(t3, o4);
  } }, { key: "emit", value: function(t3, i2) {
    var a3 = this;
    if (this._listeners) {
      i2 = i2 || {};
      var n3 = this._listeners["before*"] || [], o4 = this._listeners[t3] || [], s3 = this._listeners["after" + t3] || [], u5 = function(p6, b4) {
        p6 = p6.slice(), p6.forEach(function(k4) {
          k4.call(a3, { type: t3 }, b4);
        });
      };
      u5(n3, i2), u5(o4, i2), u5(s3, i2);
    }
  } }]), r12;
}();
var Mt = ca;
var He = V(J());
var _a = function() {
  "use strict";
  function r12(e2) {
    var t3 = this;
    D(this, r12), l(this, "_playbackHeartbeatInterval", void 0), l(this, "_playheadShouldBeProgressing", void 0), l(this, "pm", void 0), this.pm = e2, this._playbackHeartbeatInterval = null, this._playheadShouldBeProgressing = false, e2.on("playing", function() {
      t3._playheadShouldBeProgressing = true;
    }), e2.on("play", this._startPlaybackHeartbeatInterval.bind(this)), e2.on("playing", this._startPlaybackHeartbeatInterval.bind(this)), e2.on("adbreakstart", this._startPlaybackHeartbeatInterval.bind(this)), e2.on("adplay", this._startPlaybackHeartbeatInterval.bind(this)), e2.on("adplaying", this._startPlaybackHeartbeatInterval.bind(this)), e2.on("devicewake", this._startPlaybackHeartbeatInterval.bind(this)), e2.on("viewstart", this._startPlaybackHeartbeatInterval.bind(this)), e2.on("rebufferstart", this._startPlaybackHeartbeatInterval.bind(this)), e2.on("pause", this._stopPlaybackHeartbeatInterval.bind(this)), e2.on("ended", this._stopPlaybackHeartbeatInterval.bind(this)), e2.on("viewend", this._stopPlaybackHeartbeatInterval.bind(this)), e2.on("error", this._stopPlaybackHeartbeatInterval.bind(this)), e2.on("aderror", this._stopPlaybackHeartbeatInterval.bind(this)), e2.on("adpause", this._stopPlaybackHeartbeatInterval.bind(this)), e2.on("adended", this._stopPlaybackHeartbeatInterval.bind(this)), e2.on("adbreakend", this._stopPlaybackHeartbeatInterval.bind(this)), e2.on("seeked", function() {
      e2.data.player_is_paused ? t3._stopPlaybackHeartbeatInterval() : t3._startPlaybackHeartbeatInterval();
    }), e2.on("timeupdate", function() {
      t3._playbackHeartbeatInterval !== null && e2.emit("playbackheartbeat");
    }), e2.on("devicesleep", function(i2, a3) {
      t3._playbackHeartbeatInterval !== null && (He.default.clearInterval(t3._playbackHeartbeatInterval), e2.emit("playbackheartbeatend", { viewer_time: a3.viewer_time }), t3._playbackHeartbeatInterval = null);
    });
  }
  return L(r12, [{ key: "_startPlaybackHeartbeatInterval", value: function() {
    var t3 = this;
    this._playbackHeartbeatInterval === null && (this.pm.emit("playbackheartbeat"), this._playbackHeartbeatInterval = He.default.setInterval(function() {
      t3.pm.emit("playbackheartbeat");
    }, this.pm.playbackHeartbeatTime));
  } }, { key: "_stopPlaybackHeartbeatInterval", value: function() {
    this._playheadShouldBeProgressing = false, this._playbackHeartbeatInterval !== null && (He.default.clearInterval(this._playbackHeartbeatInterval), this.pm.emit("playbackheartbeatend"), this._playbackHeartbeatInterval = null);
  } }]), r12;
}();
var Ht = _a;
var fa = function r(e2) {
  "use strict";
  var t3 = this;
  D(this, r), l(this, "viewErrored", void 0), e2.on("viewinit", function() {
    t3.viewErrored = false;
  }), e2.on("error", function(i2, a3) {
    try {
      var n3 = e2.errorTranslator({ player_error_code: a3.player_error_code, player_error_message: a3.player_error_message, player_error_context: a3.player_error_context, player_error_severity: a3.player_error_severity, player_error_business_exception: a3.player_error_business_exception });
      n3 && (e2.data.player_error_code = n3.player_error_code || a3.player_error_code, e2.data.player_error_message = n3.player_error_message || a3.player_error_message, e2.data.player_error_context = n3.player_error_context || a3.player_error_context, e2.data.player_error_severity = n3.player_error_severity || a3.player_error_severity, e2.data.player_error_business_exception = n3.player_error_business_exception || a3.player_error_business_exception, t3.viewErrored = true);
    } catch (o4) {
      e2.mux.log.warn("Exception in error translator callback.", o4), t3.viewErrored = true;
    }
  }), e2.on("aftererror", function() {
    var i2, a3, n3, o4, s3;
    (i2 = e2.data) === null || i2 === void 0 || delete i2.player_error_code, (a3 = e2.data) === null || a3 === void 0 || delete a3.player_error_message, (n3 = e2.data) === null || n3 === void 0 || delete n3.player_error_context, (o4 = e2.data) === null || o4 === void 0 || delete o4.player_error_severity, (s3 = e2.data) === null || s3 === void 0 || delete s3.player_error_business_exception;
  });
};
var Bt = fa;
var pa = function() {
  "use strict";
  function r12(e2) {
    D(this, r12), l(this, "_watchTimeTrackerLastCheckedTime", void 0), l(this, "pm", void 0), this.pm = e2, this._watchTimeTrackerLastCheckedTime = null, e2.on("playbackheartbeat", this._updateWatchTime.bind(this)), e2.on("playbackheartbeatend", this._clearWatchTimeState.bind(this));
  }
  return L(r12, [{ key: "_updateWatchTime", value: function(t3, i2) {
    var a3 = i2.viewer_time;
    this._watchTimeTrackerLastCheckedTime === null && (this._watchTimeTrackerLastCheckedTime = a3), O(this.pm.data, "view_watch_time", a3 - this._watchTimeTrackerLastCheckedTime), this._watchTimeTrackerLastCheckedTime = a3;
  } }, { key: "_clearWatchTimeState", value: function(t3, i2) {
    this._updateWatchTime(t3, i2), this._watchTimeTrackerLastCheckedTime = null;
  } }]), r12;
}();
var Ut = pa;
var va = function() {
  "use strict";
  function r12(e2) {
    var t3 = this;
    D(this, r12), l(this, "_playbackTimeTrackerLastPlayheadPosition", void 0), l(this, "_lastTime", void 0), l(this, "_isAdPlaying", void 0), l(this, "_callbackUpdatePlaybackTime", void 0), l(this, "pm", void 0), this.pm = e2, this._playbackTimeTrackerLastPlayheadPosition = -1, this._lastTime = A.now(), this._isAdPlaying = false, this._callbackUpdatePlaybackTime = null;
    var i2 = this._startPlaybackTimeTracking.bind(this);
    e2.on("playing", i2), e2.on("adplaying", i2), e2.on("seeked", i2);
    var a3 = this._stopPlaybackTimeTracking.bind(this);
    e2.on("playbackheartbeatend", a3), e2.on("seeking", a3), e2.on("adplaying", function() {
      t3._isAdPlaying = true;
    }), e2.on("adended", function() {
      t3._isAdPlaying = false;
    }), e2.on("adpause", function() {
      t3._isAdPlaying = false;
    }), e2.on("adbreakstart", function() {
      t3._isAdPlaying = false;
    }), e2.on("adbreakend", function() {
      t3._isAdPlaying = false;
    }), e2.on("adplay", function() {
      t3._isAdPlaying = false;
    }), e2.on("viewinit", function() {
      t3._playbackTimeTrackerLastPlayheadPosition = -1, t3._lastTime = A.now(), t3._isAdPlaying = false, t3._callbackUpdatePlaybackTime = null;
    });
  }
  return L(r12, [{ key: "_startPlaybackTimeTracking", value: function() {
    this._callbackUpdatePlaybackTime === null && (this._callbackUpdatePlaybackTime = this._updatePlaybackTime.bind(this), this._playbackTimeTrackerLastPlayheadPosition = this.pm.data.player_playhead_time, this.pm.on("playbackheartbeat", this._callbackUpdatePlaybackTime));
  } }, { key: "_stopPlaybackTimeTracking", value: function() {
    this._callbackUpdatePlaybackTime && (this._updatePlaybackTime(), this.pm.off("playbackheartbeat", this._callbackUpdatePlaybackTime), this._callbackUpdatePlaybackTime = null, this._playbackTimeTrackerLastPlayheadPosition = -1);
  } }, { key: "_updatePlaybackTime", value: function() {
    var t3 = this.pm.data.player_playhead_time, i2 = A.now(), a3 = -1;
    this._playbackTimeTrackerLastPlayheadPosition >= 0 && t3 > this._playbackTimeTrackerLastPlayheadPosition ? a3 = t3 - this._playbackTimeTrackerLastPlayheadPosition : this._isAdPlaying && (a3 = i2 - this._lastTime), a3 > 0 && a3 <= 1e3 && O(this.pm.data, "view_content_playback_time", a3), this._playbackTimeTrackerLastPlayheadPosition = t3, this._lastTime = i2;
  } }]), r12;
}();
var Ft = va;
var ma = function() {
  "use strict";
  function r12(e2) {
    D(this, r12), l(this, "pm", void 0), this.pm = e2;
    var t3 = this._updatePlayheadTime.bind(this);
    e2.on("playbackheartbeat", t3), e2.on("playbackheartbeatend", t3), e2.on("timeupdate", t3), e2.on("destroy", function() {
      e2.off("timeupdate", t3);
    });
  }
  return L(r12, [{ key: "_updateMaxPlayheadPosition", value: function() {
    this.pm.data.view_max_playhead_position = typeof this.pm.data.view_max_playhead_position == "undefined" ? this.pm.data.player_playhead_time : Math.max(this.pm.data.view_max_playhead_position, this.pm.data.player_playhead_time);
  } }, { key: "_updatePlayheadTime", value: function(t3, i2) {
    var a3 = this, n3 = function() {
      a3.pm.currentFragmentPDT && a3.pm.currentFragmentStart && (a3.pm.data.player_program_time = a3.pm.currentFragmentPDT + a3.pm.data.player_playhead_time - a3.pm.currentFragmentStart);
    };
    if (i2 && i2.player_playhead_time) this.pm.data.player_playhead_time = i2.player_playhead_time, n3(), this._updateMaxPlayheadPosition();
    else if (this.pm.getPlayheadTime) {
      var o4 = this.pm.getPlayheadTime();
      typeof o4 != "undefined" && (this.pm.data.player_playhead_time = o4, n3(), this._updateMaxPlayheadPosition());
    }
  } }]), r12;
}();
var Vt = ma;
var Wt = 5 * 60 * 1e3;
var ha = function r2(e2) {
  "use strict";
  if (D(this, r2), !e2.disableRebufferTracking) {
    var t3, i2 = function(n3, o4) {
      a3(o4), t3 = void 0;
    }, a3 = function(n3) {
      if (t3) {
        var o4 = n3.viewer_time - t3;
        O(e2.data, "view_rebuffer_duration", o4), t3 = n3.viewer_time, e2.data.view_rebuffer_duration > Wt && (e2.emit("viewend"), e2.send("viewend"), e2.mux.log.warn("Ending view after rebuffering for longer than ".concat(Wt, "ms, future events will be ignored unless a programchange or videochange occurs.")));
      }
      e2.data.view_watch_time >= 0 && e2.data.view_rebuffer_count > 0 && (e2.data.view_rebuffer_frequency = e2.data.view_rebuffer_count / e2.data.view_watch_time, e2.data.view_rebuffer_percentage = e2.data.view_rebuffer_duration / e2.data.view_watch_time);
    };
    e2.on("playbackheartbeat", function(n3, o4) {
      return a3(o4);
    }), e2.on("rebufferstart", function(n3, o4) {
      t3 || (O(e2.data, "view_rebuffer_count", 1), t3 = o4.viewer_time, e2.one("rebufferend", i2));
    }), e2.on("viewinit", function() {
      t3 = void 0, e2.off("rebufferend", i2);
    });
  }
};
var jt = ha;
var ya = function() {
  "use strict";
  function r12(e2) {
    var t3 = this;
    D(this, r12), l(this, "_lastCheckedTime", void 0), l(this, "_lastPlayheadTime", void 0), l(this, "_lastPlayheadTimeUpdatedTime", void 0), l(this, "_rebuffering", void 0), l(this, "pm", void 0), this.pm = e2, !(e2.disableRebufferTracking || e2.disablePlayheadRebufferTracking) && (this._lastCheckedTime = null, this._lastPlayheadTime = null, this._lastPlayheadTimeUpdatedTime = null, e2.on("playbackheartbeat", this._checkIfRebuffering.bind(this)), e2.on("playbackheartbeatend", this._cleanupRebufferTracker.bind(this)), e2.on("seeking", function() {
      t3._cleanupRebufferTracker(null, { viewer_time: A.now() });
    }));
  }
  return L(r12, [{ key: "_checkIfRebuffering", value: function(t3, i2) {
    if (this.pm.seekingTracker.isSeeking || this.pm.adTracker.isAdBreak || !this.pm.playbackHeartbeat._playheadShouldBeProgressing) {
      this._cleanupRebufferTracker(t3, i2);
      return;
    }
    if (this._lastCheckedTime === null) {
      this._prepareRebufferTrackerState(i2.viewer_time);
      return;
    }
    if (this._lastPlayheadTime !== this.pm.data.player_playhead_time) {
      this._cleanupRebufferTracker(t3, i2, true);
      return;
    }
    var a3 = i2.viewer_time - this._lastPlayheadTimeUpdatedTime;
    typeof this.pm.sustainedRebufferThreshold == "number" && a3 >= this.pm.sustainedRebufferThreshold && (this._rebuffering || (this._rebuffering = true, this.pm.emit("rebufferstart", { viewer_time: this._lastPlayheadTimeUpdatedTime }))), this._lastCheckedTime = i2.viewer_time;
  } }, { key: "_clearRebufferTrackerState", value: function() {
    this._lastCheckedTime = null, this._lastPlayheadTime = null, this._lastPlayheadTimeUpdatedTime = null;
  } }, { key: "_prepareRebufferTrackerState", value: function(t3) {
    this._lastCheckedTime = t3, this._lastPlayheadTime = this.pm.data.player_playhead_time, this._lastPlayheadTimeUpdatedTime = t3;
  } }, { key: "_cleanupRebufferTracker", value: function(t3, i2) {
    var a3 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    if (this._rebuffering) this._rebuffering = false, this.pm.emit("rebufferend", { viewer_time: i2.viewer_time });
    else {
      if (this._lastCheckedTime === null) return;
      var n3 = this.pm.data.player_playhead_time - this._lastPlayheadTime, o4 = i2.viewer_time - this._lastPlayheadTimeUpdatedTime;
      typeof this.pm.minimumRebufferDuration == "number" && n3 > 0 && o4 - n3 > this.pm.minimumRebufferDuration && (this._lastCheckedTime = null, this.pm.emit("rebufferstart", { viewer_time: this._lastPlayheadTimeUpdatedTime }), this.pm.emit("rebufferend", { viewer_time: this._lastPlayheadTimeUpdatedTime + o4 - n3 }));
    }
    a3 ? this._prepareRebufferTrackerState(i2.viewer_time) : this._clearRebufferTrackerState();
  } }]), r12;
}();
var Gt = ya;
var ga = function() {
  "use strict";
  function r12(e2) {
    var t3 = this;
    D(this, r12), l(this, "NAVIGATION_START", void 0), l(this, "pm", void 0), this.pm = e2, e2.on("viewinit", function() {
      var i2 = e2.data, a3 = i2.view_id;
      if (!i2.view_program_changed) {
        var n3 = function(o4, s3) {
          var u5 = s3.viewer_time;
          o4.type === "playing" && typeof e2.data.view_time_to_first_frame == "undefined" ? t3.calculateTimeToFirstFrame(u5 || A.now(), a3) : o4.type === "adplaying" && (typeof e2.data.view_time_to_first_frame == "undefined" || t3._inPrerollPosition()) && t3.calculateTimeToFirstFrame(u5 || A.now(), a3);
        };
        e2.one("playing", n3), e2.one("adplaying", n3), e2.one("viewend", function() {
          e2.off("playing", n3), e2.off("adplaying", n3);
        });
      }
    });
  }
  return L(r12, [{ key: "_inPrerollPosition", value: function() {
    return typeof this.pm.data.view_content_playback_time == "undefined" || this.pm.data.view_content_playback_time <= 1e3;
  } }, { key: "calculateTimeToFirstFrame", value: function(t3, i2) {
    i2 === this.pm.data.view_id && (this.pm.watchTimeTracker._updateWatchTime(null, { viewer_time: t3 }), this.pm.data.view_time_to_first_frame = this.pm.data.view_watch_time, (this.pm.data.player_autoplay_on || this.pm.data.video_is_autoplay) && this.NAVIGATION_START && (this.pm.data.view_aggregate_startup_time = this.pm.data.view_start + this.pm.data.view_watch_time - this.NAVIGATION_START));
  } }]), r12;
}();
var Jt = ga;
var ba = function r3(e2) {
  "use strict";
  var t3 = this;
  D(this, r3), l(this, "_lastPlayerHeight", void 0), l(this, "_lastPlayerWidth", void 0), l(this, "_lastPlayheadPosition", void 0), l(this, "_lastSourceHeight", void 0), l(this, "_lastSourceWidth", void 0), e2.on("viewinit", function() {
    t3._lastPlayheadPosition = -1;
  });
  var i2 = ["pause", "rebufferstart", "seeking", "error", "adbreakstart", "hb", "renditionchange", "orientationchange", "viewend"], a3 = ["playing", "hb", "renditionchange", "orientationchange"];
  i2.forEach(function(n3) {
    e2.on(n3, function() {
      if (t3._lastPlayheadPosition >= 0 && e2.data.player_playhead_time >= 0 && t3._lastPlayerWidth >= 0 && t3._lastSourceWidth > 0 && t3._lastPlayerHeight >= 0 && t3._lastSourceHeight > 0) {
        var o4 = e2.data.player_playhead_time - t3._lastPlayheadPosition;
        if (o4 < 0) {
          t3._lastPlayheadPosition = -1;
          return;
        }
        var s3 = Math.min(t3._lastPlayerWidth / t3._lastSourceWidth, t3._lastPlayerHeight / t3._lastSourceHeight), u5 = Math.max(0, s3 - 1), p6 = Math.max(0, 1 - s3);
        e2.data.view_max_upscale_percentage = Math.max(e2.data.view_max_upscale_percentage || 0, u5), e2.data.view_max_downscale_percentage = Math.max(e2.data.view_max_downscale_percentage || 0, p6), O(e2.data, "view_total_content_playback_time", o4), O(e2.data, "view_total_upscaling", u5 * o4), O(e2.data, "view_total_downscaling", p6 * o4);
      }
      t3._lastPlayheadPosition = -1;
    });
  }), a3.forEach(function(n3) {
    e2.on(n3, function() {
      t3._lastPlayheadPosition = e2.data.player_playhead_time, t3._lastPlayerWidth = e2.data.player_width, t3._lastPlayerHeight = e2.data.player_height, t3._lastSourceWidth = e2.data.video_source_width, t3._lastSourceHeight = e2.data.video_source_height;
    });
  });
};
var Qt = ba;
var Ta = 2e3;
var wa = function r4(e2) {
  "use strict";
  var t3 = this;
  D(this, r4), l(this, "isSeeking", void 0), this.isSeeking = false;
  var i2 = -1, a3 = function() {
    var n3 = A.now(), o4 = (e2.data.viewer_time || n3) - (i2 || n3);
    O(e2.data, "view_seek_duration", o4), e2.data.view_max_seek_time = Math.max(e2.data.view_max_seek_time || 0, o4), t3.isSeeking = false, i2 = -1;
  };
  e2.on("seeking", function(n3, o4) {
    if (Object.assign(e2.data, o4), t3.isSeeking && o4.viewer_time - i2 <= Ta) {
      i2 = o4.viewer_time;
      return;
    }
    t3.isSeeking && a3(), t3.isSeeking = true, i2 = o4.viewer_time, O(e2.data, "view_seek_count", 1), e2.send("seeking");
  }), e2.on("seeked", function() {
    a3();
  }), e2.on("viewend", function() {
    t3.isSeeking && (a3(), e2.send("seeked")), t3.isSeeking = false, i2 = -1;
  });
};
var zt = wa;
var Kt = function(e2, t3) {
  e2.push(t3), e2.sort(function(i2, a3) {
    return i2.viewer_time - a3.viewer_time;
  });
};
var Ea = ["adbreakstart", "adrequest", "adresponse", "adplay", "adplaying", "adpause", "adended", "adbreakend", "aderror", "adclicked", "adskipped"];
var ka = function() {
  "use strict";
  function r12(e2) {
    var t3 = this;
    D(this, r12), l(this, "_adHasPlayed", void 0), l(this, "_adRequests", void 0), l(this, "_adResponses", void 0), l(this, "_currentAdRequestNumber", void 0), l(this, "_currentAdResponseNumber", void 0), l(this, "_prerollPlayTime", void 0), l(this, "_wouldBeNewAdPlay", void 0), l(this, "isAdBreak", void 0), l(this, "pm", void 0), this.pm = e2, e2.on("viewinit", function() {
      t3.isAdBreak = false, t3._currentAdRequestNumber = 0, t3._currentAdResponseNumber = 0, t3._adRequests = [], t3._adResponses = [], t3._adHasPlayed = false, t3._wouldBeNewAdPlay = true, t3._prerollPlayTime = void 0;
    }), Ea.forEach(function(a3) {
      return e2.on(a3, t3._updateAdData.bind(t3));
    });
    var i2 = function() {
      t3.isAdBreak = false;
    };
    e2.on("adbreakstart", function() {
      t3.isAdBreak = true;
    }), e2.on("play", i2), e2.on("playing", i2), e2.on("viewend", i2), e2.on("adrequest", function(a3, n3) {
      n3 = Object.assign({ ad_request_id: "generatedAdRequestId" + t3._currentAdRequestNumber++ }, n3), Kt(t3._adRequests, n3), O(e2.data, "view_ad_request_count"), t3.inPrerollPosition() && (e2.data.view_preroll_requested = true, t3._adHasPlayed || O(e2.data, "view_preroll_request_count"));
    }), e2.on("adresponse", function(a3, n3) {
      n3 = Object.assign({ ad_request_id: "generatedAdRequestId" + t3._currentAdResponseNumber++ }, n3), Kt(t3._adResponses, n3);
      var o4 = t3.findAdRequest(n3.ad_request_id);
      o4 && O(e2.data, "view_ad_request_time", Math.max(0, n3.viewer_time - o4.viewer_time));
    }), e2.on("adplay", function(a3, n3) {
      t3._adHasPlayed = true, t3._wouldBeNewAdPlay && (t3._wouldBeNewAdPlay = false, O(e2.data, "view_ad_played_count")), t3.inPrerollPosition() && !e2.data.view_preroll_played && (e2.data.view_preroll_played = true, t3._adRequests.length > 0 && (e2.data.view_preroll_request_time = Math.max(0, n3.viewer_time - t3._adRequests[0].viewer_time)), e2.data.view_start && (e2.data.view_startup_preroll_request_time = Math.max(0, n3.viewer_time - e2.data.view_start)), t3._prerollPlayTime = n3.viewer_time);
    }), e2.on("adplaying", function(a3, n3) {
      t3.inPrerollPosition() && typeof e2.data.view_preroll_load_time == "undefined" && typeof t3._prerollPlayTime != "undefined" && (e2.data.view_preroll_load_time = n3.viewer_time - t3._prerollPlayTime, e2.data.view_startup_preroll_load_time = n3.viewer_time - t3._prerollPlayTime);
    }), e2.on("adclicked", function(a3, n3) {
      t3._wouldBeNewAdPlay || O(e2.data, "view_ad_clicked_count");
    }), e2.on("adskipped", function(a3, n3) {
      t3._wouldBeNewAdPlay || O(e2.data, "view_ad_skipped_count");
    }), e2.on("adended", function() {
      t3._wouldBeNewAdPlay = true;
    }), e2.on("aderror", function() {
      t3._wouldBeNewAdPlay = true;
    });
  }
  return L(r12, [{ key: "inPrerollPosition", value: function() {
    return typeof this.pm.data.view_content_playback_time == "undefined" || this.pm.data.view_content_playback_time <= 1e3;
  } }, { key: "findAdRequest", value: function(t3) {
    for (var i2 = 0; i2 < this._adRequests.length; i2++) if (this._adRequests[i2].ad_request_id === t3) return this._adRequests[i2];
  } }, { key: "_updateAdData", value: function(t3, i2) {
    if (this.inPrerollPosition()) {
      if (!this.pm.data.view_preroll_ad_tag_hostname && i2.ad_tag_url) {
        var a3 = H(re(i2.ad_tag_url), 2), n3 = a3[0], o4 = a3[1];
        this.pm.data.view_preroll_ad_tag_domain = o4, this.pm.data.view_preroll_ad_tag_hostname = n3;
      }
      if (!this.pm.data.view_preroll_ad_asset_hostname && i2.ad_asset_url) {
        var s3 = H(re(i2.ad_asset_url), 2), u5 = s3[0], p6 = s3[1];
        this.pm.data.view_preroll_ad_asset_domain = p6, this.pm.data.view_preroll_ad_asset_hostname = u5;
      }
    }
    this.pm.data.ad_asset_url = i2 == null ? void 0 : i2.ad_asset_url, this.pm.data.ad_tag_url = i2 == null ? void 0 : i2.ad_tag_url, this.pm.data.ad_creative_id = i2 == null ? void 0 : i2.ad_creative_id, this.pm.data.ad_id = i2 == null ? void 0 : i2.ad_id, this.pm.data.ad_universal_id = i2 == null ? void 0 : i2.ad_universal_id;
  } }]), r12;
}();
var Yt = ka;
var Qe = V(J());
var xa = function r5(e2) {
  "use strict";
  D(this, r5);
  var t3, i2, a3 = function() {
    e2.disableRebufferTracking || (O(e2.data, "view_waiting_rebuffer_count", 1), t3 = A.now(), i2 = Qe.default.setInterval(function() {
      if (t3) {
        var p6 = A.now();
        O(e2.data, "view_waiting_rebuffer_duration", p6 - t3), t3 = p6;
      }
    }, 250));
  }, n3 = function() {
    e2.disableRebufferTracking || t3 && (O(e2.data, "view_waiting_rebuffer_duration", A.now() - t3), t3 = false, Qe.default.clearInterval(i2));
  }, o4 = false, s3 = function() {
    o4 = true;
  }, u5 = function() {
    o4 = false, n3();
  };
  e2.on("waiting", function() {
    o4 && a3();
  }), e2.on("playing", function() {
    n3(), s3();
  }), e2.on("pause", u5), e2.on("seeking", u5);
};
var Xt = xa;
var Da = function r6(e2) {
  "use strict";
  var t3 = this;
  D(this, r6), l(this, "lastWallClockTime", void 0);
  var i2 = function() {
    t3.lastWallClockTime = A.now(), e2.on("before*", a3);
  }, a3 = function(n3) {
    var o4 = A.now(), s3 = t3.lastWallClockTime;
    t3.lastWallClockTime = o4, o4 - s3 > 3e4 && (e2.emit("devicesleep", { viewer_time: s3 }), Object.assign(e2.data, { viewer_time: s3 }), e2.send("devicesleep"), e2.emit("devicewake", { viewer_time: o4 }), Object.assign(e2.data, { viewer_time: o4 }), e2.send("devicewake"));
  };
  e2.one("playbackheartbeat", i2), e2.on("playbackheartbeatend", function() {
    e2.off("before*", a3), e2.one("playbackheartbeat", i2);
  });
};
var $t = Da;
var Ue = V(J());
var ze = function(r12) {
  return r12();
}(function() {
  var r12 = function() {
    for (var i2 = 0, a3 = {}; i2 < arguments.length; i2++) {
      var n3 = arguments[i2];
      for (var o4 in n3) a3[o4] = n3[o4];
    }
    return a3;
  };
  function e2(t3) {
    function i2(a3, n3, o4) {
      var s3;
      if (typeof document != "undefined") {
        if (arguments.length > 1) {
          if (o4 = r12({ path: "/" }, i2.defaults, o4), typeof o4.expires == "number") {
            var u5 = /* @__PURE__ */ new Date();
            u5.setMilliseconds(u5.getMilliseconds() + o4.expires * 864e5), o4.expires = u5;
          }
          try {
            s3 = JSON.stringify(n3), /^[\{\[]/.test(s3) && (n3 = s3);
          } catch (T3) {
          }
          return t3.write ? n3 = t3.write(n3, a3) : n3 = encodeURIComponent(String(n3)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), a3 = encodeURIComponent(String(a3)), a3 = a3.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), a3 = a3.replace(/[\(\)]/g, escape), document.cookie = [a3, "=", n3, o4.expires ? "; expires=" + o4.expires.toUTCString() : "", o4.path ? "; path=" + o4.path : "", o4.domain ? "; domain=" + o4.domain : "", o4.secure ? "; secure" : ""].join("");
        }
        a3 || (s3 = {});
        for (var p6 = document.cookie ? document.cookie.split("; ") : [], b4 = /(%[0-9A-Z]{2})+/g, k4 = 0; k4 < p6.length; k4++) {
          var y5 = p6[k4].split("="), c4 = y5.slice(1).join("=");
          c4.charAt(0) === '"' && (c4 = c4.slice(1, -1));
          try {
            var v4 = y5[0].replace(b4, decodeURIComponent);
            if (c4 = t3.read ? t3.read(c4, v4) : t3(c4, v4) || c4.replace(b4, decodeURIComponent), this.json) try {
              c4 = JSON.parse(c4);
            } catch (T3) {
            }
            if (a3 === v4) {
              s3 = c4;
              break;
            }
            a3 || (s3[v4] = c4);
          } catch (T3) {
          }
        }
        return s3;
      }
    }
    return i2.set = i2, i2.get = function(a3) {
      return i2.call(i2, a3);
    }, i2.getJSON = function() {
      return i2.apply({ json: true }, [].slice.call(arguments));
    }, i2.defaults = {}, i2.remove = function(a3, n3) {
      i2(a3, "", r12(n3, { expires: -1 }));
    }, i2.withConverter = e2, i2;
  }
  return e2(function() {
  });
});
var Zt = "muxData";
var Sa = function(r12) {
  return Object.entries(r12).map(function(e2) {
    var t3 = H(e2, 2), i2 = t3[0], a3 = t3[1];
    return "".concat(i2, "=").concat(a3);
  }).join("&");
};
var Ra = function(r12) {
  return r12.split("&").reduce(function(e2, t3) {
    var i2 = H(t3.split("="), 2), a3 = i2[0], n3 = i2[1], o4 = +n3, s3 = n3 && o4 == n3 ? o4 : n3;
    return e2[a3] = s3, e2;
  }, {});
};
var er = function() {
  var e2;
  try {
    e2 = Ra(ze.get(Zt) || "");
  } catch (t3) {
    e2 = {};
  }
  return e2;
};
var tr = function(e2) {
  try {
    ze.set(Zt, Sa(e2), { expires: 365 });
  } catch (t3) {
  }
};
var rr = function() {
  var e2 = er();
  return e2.mux_viewer_id = e2.mux_viewer_id || ee(), e2.msn = e2.msn || Math.random(), tr(e2), { mux_viewer_id: e2.mux_viewer_id, mux_sample_number: e2.msn };
};
var ar = function() {
  var e2 = er(), t3 = A.now();
  return e2.session_start && (e2.sst = e2.session_start, delete e2.session_start), e2.session_id && (e2.sid = e2.session_id, delete e2.session_id), e2.session_expires && (e2.sex = e2.session_expires, delete e2.session_expires), (!e2.sex || e2.sex < t3) && (e2.sid = ee(), e2.sst = t3), e2.sex = t3 + 25 * 60 * 1e3, tr(e2), { session_id: e2.sid, session_start: e2.sst, session_expires: e2.sex };
};
function Ke(r12, e2) {
  var t3 = e2.beaconCollectionDomain, i2 = e2.beaconDomain;
  if (t3) return "https://" + t3;
  r12 = r12 || "inferred";
  var a3 = i2 || "litix.io";
  return r12.match(/^[a-z0-9]+$/) ? "https://" + r12 + "." + a3 : "https://img.litix.io/a.gif";
}
var ir = V(J());
var nr = function() {
  var e2;
  switch (or()) {
    case "cellular":
      e2 = "cellular";
      break;
    case "ethernet":
      e2 = "wired";
      break;
    case "wifi":
      e2 = "wifi";
      break;
    case void 0:
      break;
    default:
      e2 = "other";
  }
  return e2;
};
var or = function() {
  var e2 = ir.default.navigator, t3 = e2 && (e2.connection || e2.mozConnection || e2.webkitConnection);
  return t3 && t3.type;
};
nr.getConnectionFromAPI = or;
var sr = nr;
var qa = { a: "env", b: "beacon", c: "custom", d: "ad", e: "event", f: "experiment", i: "internal", m: "mux", n: "response", p: "player", q: "request", r: "retry", s: "session", t: "timestamp", u: "viewer", v: "video", w: "page", x: "view", y: "sub" };
var Aa = dr(qa);
var Oa = { ad: "ad", af: "affiliate", ag: "aggregate", ap: "api", al: "application", ao: "audio", ar: "architecture", as: "asset", au: "autoplay", av: "average", bi: "bitrate", bn: "brand", br: "break", bw: "browser", by: "bytes", bz: "business", ca: "cached", cb: "cancel", cc: "codec", cd: "code", cg: "category", ch: "changed", ci: "client", ck: "clicked", cl: "canceled", cn: "config", co: "count", ce: "counter", cp: "complete", cq: "creator", cr: "creative", cs: "captions", ct: "content", cu: "current", cx: "connection", cz: "context", dg: "downscaling", dm: "domain", dn: "cdn", do: "downscale", dr: "drm", dp: "dropped", du: "duration", dv: "device", dy: "dynamic", eb: "enabled", ec: "encoding", ed: "edge", en: "end", eg: "engine", em: "embed", er: "error", ep: "experiments", es: "errorcode", et: "errortext", ee: "event", ev: "events", ex: "expires", ez: "exception", fa: "failed", fi: "first", fm: "family", ft: "format", fp: "fps", fq: "frequency", fr: "frame", fs: "fullscreen", ha: "has", hb: "holdback", he: "headers", ho: "host", hn: "hostname", ht: "height", id: "id", ii: "init", in: "instance", ip: "ip", is: "is", ke: "key", la: "language", lb: "labeled", le: "level", li: "live", ld: "loaded", lo: "load", ls: "lists", lt: "latency", ma: "max", md: "media", me: "message", mf: "manifest", mi: "mime", ml: "midroll", mm: "min", mn: "manufacturer", mo: "model", mx: "mux", ne: "newest", nm: "name", no: "number", on: "on", or: "origin", os: "os", pa: "paused", pb: "playback", pd: "producer", pe: "percentage", pf: "played", pg: "program", ph: "playhead", pi: "plugin", pl: "preroll", pn: "playing", po: "poster", pp: "pip", pr: "preload", ps: "position", pt: "part", py: "property", px: "pop", pz: "plan", ra: "rate", rd: "requested", re: "rebuffer", rf: "rendition", rg: "range", rm: "remote", ro: "ratio", rp: "response", rq: "request", rs: "requests", sa: "sample", sd: "skipped", se: "session", sh: "shift", sk: "seek", sm: "stream", so: "source", sq: "sequence", sr: "series", ss: "status", st: "start", su: "startup", sv: "server", sw: "software", sy: "severity", ta: "tag", tc: "tech", te: "text", tg: "target", th: "throughput", ti: "time", tl: "total", to: "to", tt: "title", ty: "type", ug: "upscaling", un: "universal", up: "upscale", ur: "url", us: "user", va: "variant", vd: "viewed", vi: "video", ve: "version", vw: "view", vr: "viewer", wd: "width", wa: "watch", wt: "waiting" };
var ur = dr(Oa);
function dr(r12) {
  var e2 = {};
  for (var t3 in r12) r12.hasOwnProperty(t3) && (e2[r12[t3]] = t3);
  return e2;
}
function ve(r12) {
  var e2 = {}, t3 = {};
  return Object.keys(r12).forEach(function(i2) {
    var a3 = false;
    if (r12.hasOwnProperty(i2) && r12[i2] !== void 0) {
      var n3 = i2.split("_"), o4 = n3[0], s3 = Aa[o4];
      s3 || (q.info("Data key word `" + n3[0] + "` not expected in " + i2), s3 = o4 + "_"), n3.splice(1).forEach(function(u5) {
        u5 === "url" && (a3 = true), ur[u5] ? s3 += ur[u5] : Number.isInteger(Number(u5)) ? s3 += u5 : (q.info("Data key word `" + u5 + "` not expected in " + i2), s3 += "_" + u5 + "_");
      }), a3 ? t3[s3] = r12[i2] : e2[s3] = r12[i2];
    }
  }), Object.assign(e2, t3);
}
var ie = V(J());
var Lr = V(nt());
var ai = { maxBeaconSize: 300, maxQueueLength: 3600, baseTimeBetweenBeacons: 1e4, maxPayloadKBSize: 500 };
var ii = 56 * 1024;
var ni = ["hb", "requestcompleted", "requestfailed", "requestcanceled"];
var oi = "https://img.litix.io";
var $ = function(e2) {
  var t3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  this._beaconUrl = e2 || oi, this._eventQueue = [], this._postInFlight = false, this._resendAfterPost = false, this._failureCount = 0, this._sendTimeout = false, this._options = Object.assign({}, ai, t3);
};
$.prototype.queueEvent = function(r12, e2) {
  var t3 = Object.assign({}, e2);
  return this._eventQueue.length <= this._options.maxQueueLength || r12 === "eventrateexceeded" ? (this._eventQueue.push(t3), this._sendTimeout || this._startBeaconSending(), this._eventQueue.length <= this._options.maxQueueLength) : false;
};
$.prototype.flushEvents = function() {
  var r12 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
  if (r12 && this._eventQueue.length === 1) {
    this._eventQueue.pop();
    return;
  }
  this._eventQueue.length && this._sendBeaconQueue(), this._startBeaconSending();
};
$.prototype.destroy = function() {
  var r12 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
  this.destroyed = true, r12 ? this._clearBeaconQueue() : this.flushEvents(), ie.default.clearTimeout(this._sendTimeout);
};
$.prototype._clearBeaconQueue = function() {
  var r12 = this._eventQueue.length > this._options.maxBeaconSize ? this._eventQueue.length - this._options.maxBeaconSize : 0, e2 = this._eventQueue.slice(r12);
  r12 > 0 && Object.assign(e2[e2.length - 1], ve({ mux_view_message: "event queue truncated" }));
  var t3 = this._createPayload(e2);
  Cr(this._beaconUrl, t3, true, function() {
  });
};
$.prototype._sendBeaconQueue = function() {
  var r12 = this;
  if (this._postInFlight) {
    this._resendAfterPost = true;
    return;
  }
  var e2 = this._eventQueue.slice(0, this._options.maxBeaconSize);
  this._eventQueue = this._eventQueue.slice(this._options.maxBeaconSize), this._postInFlight = true;
  var t3 = this._createPayload(e2), i2 = A.now();
  Cr(this._beaconUrl, t3, false, function(a3, n3) {
    n3 ? (r12._eventQueue = e2.concat(r12._eventQueue), r12._failureCount += 1, q.info("Error sending beacon: " + n3)) : r12._failureCount = 0, r12._roundTripTime = A.now() - i2, r12._postInFlight = false, r12._resendAfterPost && (r12._resendAfterPost = false, r12._eventQueue.length > 0 && r12._sendBeaconQueue());
  });
};
$.prototype._getNextBeaconTime = function() {
  if (!this._failureCount) return this._options.baseTimeBetweenBeacons;
  var r12 = Math.pow(2, this._failureCount - 1);
  return r12 = r12 * Math.random(), (1 + r12) * this._options.baseTimeBetweenBeacons;
};
$.prototype._startBeaconSending = function() {
  var r12 = this;
  ie.default.clearTimeout(this._sendTimeout), !this.destroyed && (this._sendTimeout = ie.default.setTimeout(function() {
    r12._eventQueue.length && r12._sendBeaconQueue(), r12._startBeaconSending();
  }, this._getNextBeaconTime()));
};
$.prototype._createPayload = function(r12) {
  var e2 = this, t3 = { transmission_timestamp: Math.round(A.now()) };
  this._roundTripTime && (t3.rtt_ms = Math.round(this._roundTripTime));
  var i2, a3, n3, o4 = function() {
    i2 = JSON.stringify({ metadata: t3, events: a3 || r12 }), n3 = i2.length / 1024;
  }, s3 = function() {
    return n3 <= e2._options.maxPayloadKBSize;
  };
  return o4(), s3() || (q.info("Payload size is too big (" + n3 + " kb). Removing unnecessary events."), a3 = r12.filter(function(u5) {
    return ni.indexOf(u5.e) === -1;
  }), o4()), s3() || (q.info("Payload size still too big (" + n3 + " kb). Cropping fields.."), a3.forEach(function(u5) {
    for (var p6 in u5) {
      var b4 = u5[p6], k4 = 50 * 1024;
      typeof b4 == "string" && b4.length > k4 && (u5[p6] = b4.substring(0, k4));
    }
  }), o4()), i2;
};
var si = typeof Lr.default.exitPictureInPicture == "function" ? function(r12) {
  return r12.length <= ii;
} : function(r12) {
  return false;
};
var Cr = function(r12, e2, t3, i2) {
  if (t3 && navigator && navigator.sendBeacon && navigator.sendBeacon(r12, e2)) {
    i2();
    return;
  }
  if (ie.default.fetch) {
    ie.default.fetch(r12, { method: "POST", body: e2, headers: { "Content-Type": "text/plain" }, keepalive: si(e2) }).then(function(n3) {
      return i2(null, n3.ok ? null : "Error");
    }).catch(function(n3) {
      return i2(null, n3);
    });
    return;
  }
  if (ie.default.XMLHttpRequest) {
    var a3 = new ie.default.XMLHttpRequest();
    a3.onreadystatechange = function() {
      if (a3.readyState === 4) return i2(null, a3.status !== 200 ? "error" : void 0);
    }, a3.open("POST", r12), a3.setRequestHeader("Content-Type", "text/plain"), a3.send(e2);
    return;
  }
  i2();
};
var Mr = $;
var ui = ["env_key", "view_id", "view_sequence_number", "player_sequence_number", "beacon_domain", "player_playhead_time", "viewer_time", "mux_api_version", "event", "video_id", "player_instance_id", "player_error_code", "player_error_message", "player_error_context", "player_error_severity", "player_error_business_exception"];
var di = ["adplay", "adplaying", "adpause", "adfirstquartile", "admidpoint", "adthirdquartile", "adended", "adresponse", "adrequest"];
var li = ["ad_id", "ad_creative_id", "ad_universal_id"];
var ci = ["viewstart", "error", "ended", "viewend"];
var _i = 10 * 60 * 1e3;
var Hr = function() {
  "use strict";
  function r12(e2, t3) {
    var i2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    D(this, r12);
    var a3, n3, o4, s3, u5, p6, b4, k4, y5, c4, v4, T3;
    l(this, "mux", void 0), l(this, "envKey", void 0), l(this, "options", void 0), l(this, "eventQueue", void 0), l(this, "sampleRate", void 0), l(this, "disableCookies", void 0), l(this, "respectDoNotTrack", void 0), l(this, "previousBeaconData", void 0), l(this, "lastEventTime", void 0), l(this, "rateLimited", void 0), l(this, "pageLevelData", void 0), l(this, "viewerData", void 0), this.mux = e2, this.envKey = t3, this.options = i2, this.previousBeaconData = null, this.lastEventTime = 0, this.rateLimited = false, this.eventQueue = new Mr(Ke(this.envKey, this.options));
    var x7;
    this.sampleRate = (x7 = this.options.sampleRate) !== null && x7 !== void 0 ? x7 : 1;
    var m6;
    this.disableCookies = (m6 = this.options.disableCookies) !== null && m6 !== void 0 ? m6 : false;
    var f6;
    this.respectDoNotTrack = (f6 = this.options.respectDoNotTrack) !== null && f6 !== void 0 ? f6 : false, this.previousBeaconData = null, this.lastEventTime = 0, this.rateLimited = false, this.pageLevelData = { mux_api_version: this.mux.API_VERSION, mux_embed: this.mux.NAME, mux_embed_version: this.mux.VERSION, viewer_application_name: (a3 = this.options.platform) === null || a3 === void 0 ? void 0 : a3.name, viewer_application_version: (n3 = this.options.platform) === null || n3 === void 0 ? void 0 : n3.version, viewer_application_engine: (o4 = this.options.platform) === null || o4 === void 0 ? void 0 : o4.layout, viewer_device_name: (s3 = this.options.platform) === null || s3 === void 0 ? void 0 : s3.product, viewer_device_category: "", viewer_device_manufacturer: (u5 = this.options.platform) === null || u5 === void 0 ? void 0 : u5.manufacturer, viewer_os_family: (b4 = this.options.platform) === null || b4 === void 0 || (p6 = b4.os) === null || p6 === void 0 ? void 0 : p6.family, viewer_os_architecture: (y5 = this.options.platform) === null || y5 === void 0 || (k4 = y5.os) === null || k4 === void 0 ? void 0 : k4.architecture, viewer_os_version: (v4 = this.options.platform) === null || v4 === void 0 || (c4 = v4.os) === null || c4 === void 0 ? void 0 : c4.version, viewer_connection_type: sr(), page_url: Ue.default === null || Ue.default === void 0 || (T3 = Ue.default.location) === null || T3 === void 0 ? void 0 : T3.href }, this.viewerData = this.disableCookies ? {} : rr();
  }
  return L(r12, [{ key: "send", value: function(t3, i2) {
    if (!(!t3 || !(i2 != null && i2.view_id))) {
      if (this.respectDoNotTrack && ce()) return q.info("Not sending `" + t3 + "` because Do Not Track is enabled");
      if (!i2 || typeof i2 != "object") return q.error("A data object was expected in send() but was not provided");
      var a3 = this.disableCookies ? {} : ar(), n3 = fe(ue({}, this.pageLevelData, i2, a3, this.viewerData), { event: t3, env_key: this.envKey });
      n3.user_id && (n3.viewer_user_id = n3.user_id, delete n3.user_id);
      var o4, s3 = ((o4 = n3.mux_sample_number) !== null && o4 !== void 0 ? o4 : 0) >= this.sampleRate, u5 = this._deduplicateBeaconData(t3, n3), p6 = ve(u5);
      if (this.lastEventTime = this.mux.utils.now(), s3) return q.info("Not sending event due to sample rate restriction", t3, n3, p6);
      if (this.envKey || q.info("Missing environment key (envKey) - beacons will be dropped if the video source is not a valid mux video URL", t3, n3, p6), !this.rateLimited) {
        if (q.info("Sending event", t3, n3, p6), this.rateLimited = !this.eventQueue.queueEvent(t3, p6), this.mux.WINDOW_UNLOADING && t3 === "viewend") this.eventQueue.destroy(true);
        else if (this.mux.WINDOW_HIDDEN && t3 === "hb" ? this.eventQueue.flushEvents(true) : ci.indexOf(t3) >= 0 && this.eventQueue.flushEvents(), this.rateLimited) return n3.event = "eventrateexceeded", p6 = ve(n3), this.eventQueue.queueEvent(n3.event, p6), q.error("Beaconing disabled due to rate limit.");
      }
    }
  } }, { key: "destroy", value: function() {
    this.eventQueue.destroy(false);
  } }, { key: "_deduplicateBeaconData", value: function(t3, i2) {
    var a3 = this, n3 = {}, o4 = i2.view_id;
    if (o4 === "-1" || t3 === "viewstart" || t3 === "viewend" || !this.previousBeaconData || this.mux.utils.now() - this.lastEventTime >= _i) n3 = ue({}, i2), o4 && (this.previousBeaconData = n3), o4 && t3 === "viewend" && (this.previousBeaconData = null);
    else {
      var s3 = t3.indexOf("request") === 0;
      Object.entries(i2).forEach(function(u5) {
        var p6 = H(u5, 2), b4 = p6[0], k4 = p6[1];
        a3.previousBeaconData && (k4 !== a3.previousBeaconData[b4] || ui.indexOf(b4) > -1 || a3.objectHasChanged(s3, b4, k4, a3.previousBeaconData[b4]) || a3.eventRequiresKey(t3, b4)) && (n3[b4] = k4, a3.previousBeaconData[b4] = k4);
      });
    }
    return n3;
  } }, { key: "objectHasChanged", value: function(t3, i2, a3, n3) {
    return !t3 || i2.indexOf("request_") !== 0 ? false : i2 === "request_response_headers" || typeof a3 != "object" || typeof n3 != "object" ? true : Object.keys(a3 || {}).length !== Object.keys(n3 || {}).length;
  } }, { key: "eventRequiresKey", value: function(t3, i2) {
    return !!(t3 === "renditionchange" && i2.indexOf("video_source_") === 0 || li.includes(i2) && di.includes(t3));
  } }]), r12;
}();
var fi = function r7(e2) {
  "use strict";
  D(this, r7);
  var t3 = 0, i2 = 0, a3 = 0, n3 = 0, o4 = 0, s3 = 0, u5 = 0, p6 = function(y5, c4) {
    var v4 = c4.request_start, T3 = c4.request_response_start, x7 = c4.request_response_end, m6 = c4.request_bytes_loaded;
    n3++;
    var f6, _3;
    if (T3 ? (f6 = T3 - (v4 != null ? v4 : 0), _3 = (x7 != null ? x7 : 0) - T3) : _3 = (x7 != null ? x7 : 0) - (v4 != null ? v4 : 0), _3 > 0 && m6 && m6 > 0) {
      var d4 = m6 / _3 * 8e3;
      o4++, i2 += m6, a3 += _3, e2.data.view_min_request_throughput = Math.min(e2.data.view_min_request_throughput || 1 / 0, d4), e2.data.view_average_request_throughput = i2 / a3 * 8e3, e2.data.view_request_count = n3, f6 > 0 && (t3 += f6, e2.data.view_max_request_latency = Math.max(e2.data.view_max_request_latency || 0, f6), e2.data.view_average_request_latency = t3 / o4);
    }
  }, b4 = function(y5, c4) {
    n3++, s3++, e2.data.view_request_count = n3, e2.data.view_request_failed_count = s3;
  }, k4 = function(y5, c4) {
    n3++, u5++, e2.data.view_request_count = n3, e2.data.view_request_canceled_count = u5;
  };
  e2.on("requestcompleted", p6), e2.on("requestfailed", b4), e2.on("requestcanceled", k4);
};
var Br = fi;
var pi = 60 * 60 * 1e3;
var vi = function r8(e2) {
  "use strict";
  var t3 = this;
  D(this, r8), l(this, "_lastEventTime", void 0), e2.on("before*", function(i2, a3) {
    var n3 = a3.viewer_time, o4 = A.now(), s3 = t3._lastEventTime;
    if (t3._lastEventTime = o4, s3 && o4 - s3 > pi) {
      var u5 = Object.keys(e2.data).reduce(function(b4, k4) {
        return k4.indexOf("video_") === 0 ? Object.assign(b4, l({}, k4, e2.data[k4])) : b4;
      }, {});
      e2.mux.log.info("Received event after at least an hour inactivity, creating a new view");
      var p6 = e2.playbackHeartbeat._playheadShouldBeProgressing;
      e2._resetView(Object.assign({ viewer_time: n3 }, u5)), e2.playbackHeartbeat._playheadShouldBeProgressing = p6, e2.playbackHeartbeat._playheadShouldBeProgressing && i2.type !== "play" && i2.type !== "adbreakstart" && (e2.emit("play", { viewer_time: n3 }), i2.type !== "playing" && e2.emit("playing", { viewer_time: n3 }));
    }
  });
};
var Ur = vi;
var mi = ["viewstart", "ended", "loadstart", "pause", "play", "playing", "ratechange", "waiting", "adplay", "adpause", "adended", "aderror", "adplaying", "adrequest", "adresponse", "adbreakstart", "adbreakend", "adfirstquartile", "admidpoint", "adthirdquartile", "rebufferstart", "rebufferend", "seeked", "error", "hb", "requestcompleted", "requestfailed", "requestcanceled", "renditionchange"];
var hi = /* @__PURE__ */ new Set(["requestcompleted", "requestfailed", "requestcanceled"]);
var yi = function(r12) {
  "use strict";
  Dt(t3, r12);
  var e2 = qt(t3);
  function t3(i2, a3, n3) {
    D(this, t3);
    var o4;
    o4 = e2.call(this), l(g(o4), "DOM_CONTENT_LOADED_EVENT_END", void 0), l(g(o4), "NAVIGATION_START", void 0), l(g(o4), "_destroyed", void 0), l(g(o4), "_heartBeatTimeout", void 0), l(g(o4), "adTracker", void 0), l(g(o4), "dashjs", void 0), l(g(o4), "data", void 0), l(g(o4), "disablePlayheadRebufferTracking", void 0), l(g(o4), "disableRebufferTracking", void 0), l(g(o4), "errorTracker", void 0), l(g(o4), "errorTranslator", void 0), l(g(o4), "emitTranslator", void 0), l(g(o4), "getAdData", void 0), l(g(o4), "getPlayheadTime", void 0), l(g(o4), "getStateData", void 0), l(g(o4), "stateDataTranslator", void 0), l(g(o4), "hlsjs", void 0), l(g(o4), "id", void 0), l(g(o4), "longResumeTracker", void 0), l(g(o4), "minimumRebufferDuration", void 0), l(g(o4), "mux", void 0), l(g(o4), "playbackEventDispatcher", void 0), l(g(o4), "playbackHeartbeat", void 0), l(g(o4), "playbackHeartbeatTime", void 0), l(g(o4), "playheadTime", void 0), l(g(o4), "seekingTracker", void 0), l(g(o4), "sustainedRebufferThreshold", void 0), l(g(o4), "watchTimeTracker", void 0), l(g(o4), "currentFragmentPDT", void 0), l(g(o4), "currentFragmentStart", void 0), o4.DOM_CONTENT_LOADED_EVENT_END = _e.domContentLoadedEventEnd(), o4.NAVIGATION_START = _e.navigationStart();
    var s3 = { debug: false, minimumRebufferDuration: 250, sustainedRebufferThreshold: 1e3, playbackHeartbeatTime: 25, beaconDomain: "litix.io", sampleRate: 1, disableCookies: false, respectDoNotTrack: false, disableRebufferTracking: false, disablePlayheadRebufferTracking: false, errorTranslator: function(y5) {
      return y5;
    }, emitTranslator: function() {
      for (var y5 = arguments.length, c4 = new Array(y5), v4 = 0; v4 < y5; v4++) c4[v4] = arguments[v4];
      return c4;
    }, stateDataTranslator: function(y5) {
      return y5;
    } };
    o4.mux = i2, o4.id = a3, n3 != null && n3.beaconDomain && o4.mux.log.warn("The `beaconDomain` setting has been deprecated in favor of `beaconCollectionDomain`. Please change your integration to use `beaconCollectionDomain` instead of `beaconDomain`."), n3 = Object.assign(s3, n3), n3.data = n3.data || {}, n3.data.property_key && (n3.data.env_key = n3.data.property_key, delete n3.data.property_key), q.level = n3.debug ? Y.DEBUG : Y.WARN, o4.getPlayheadTime = n3.getPlayheadTime, o4.getStateData = n3.getStateData || function() {
      return {};
    }, o4.getAdData = n3.getAdData || function() {
    }, o4.minimumRebufferDuration = n3.minimumRebufferDuration, o4.sustainedRebufferThreshold = n3.sustainedRebufferThreshold, o4.playbackHeartbeatTime = n3.playbackHeartbeatTime, o4.disableRebufferTracking = n3.disableRebufferTracking, o4.disableRebufferTracking && o4.mux.log.warn("Disabling rebuffer tracking. This should only be used in specific circumstances as a last resort when your player is known to unreliably track rebuffering."), o4.disablePlayheadRebufferTracking = n3.disablePlayheadRebufferTracking, o4.errorTranslator = n3.errorTranslator, o4.emitTranslator = n3.emitTranslator, o4.stateDataTranslator = n3.stateDataTranslator, o4.playbackEventDispatcher = new Hr(i2, n3.data.env_key, n3), o4.data = { player_instance_id: ee(), mux_sample_rate: n3.sampleRate, beacon_domain: n3.beaconCollectionDomain || n3.beaconDomain }, o4.data.view_sequence_number = 1, o4.data.player_sequence_number = 1;
    var u5 = (function() {
      typeof this.data.view_start == "undefined" && (this.data.view_start = this.mux.utils.now(), this.emit("viewstart"));
    }).bind(g(o4));
    if (o4.on("viewinit", function(y5, c4) {
      this._resetVideoData(), this._resetViewData(), this._resetErrorData(), this._updateStateData(), Object.assign(this.data, c4), this._initializeViewData(), this.one("play", u5), this.one("adbreakstart", u5);
    }), o4.on("videochange", function(y5, c4) {
      this._resetView(c4);
    }), o4.on("programchange", function(y5, c4) {
      this.data.player_is_paused && this.mux.log.warn("The `programchange` event is intended to be used when the content changes mid playback without the video source changing, however the video is not currently playing. If the video source is changing please use the videochange event otherwise you will lose startup time information."), this._resetView(Object.assign(c4, { view_program_changed: true })), u5(), this.emit("play"), this.emit("playing");
    }), o4.on("fragmentchange", function(y5, c4) {
      this.currentFragmentPDT = c4.currentFragmentPDT, this.currentFragmentStart = c4.currentFragmentStart;
    }), o4.on("destroy", o4.destroy), typeof window != "undefined" && typeof window.addEventListener == "function" && typeof window.removeEventListener == "function") {
      var p6 = function() {
        var y5 = typeof o4.data.view_start != "undefined";
        o4.mux.WINDOW_HIDDEN = document.visibilityState === "hidden", y5 && o4.mux.WINDOW_HIDDEN && (o4.data.player_is_paused || o4.emit("hb"));
      };
      window.addEventListener("visibilitychange", p6, false);
      var b4 = function(y5) {
        y5.persisted || o4.destroy();
      };
      window.addEventListener("pagehide", b4, false), o4.on("destroy", function() {
        window.removeEventListener("visibilitychange", p6), window.removeEventListener("pagehide", b4);
      });
    }
    o4.on("playerready", function(y5, c4) {
      Object.assign(this.data, c4);
    }), mi.forEach(function(y5) {
      o4.on(y5, function(c4, v4) {
        y5.indexOf("ad") !== 0 && this._updateStateData(), Object.assign(this.data, v4), this._sanitizeData();
      }), o4.on("after" + y5, function() {
        (y5 !== "error" || this.errorTracker.viewErrored) && this.send(y5);
      });
    }), o4.on("viewend", function(y5, c4) {
      Object.assign(o4.data, c4);
    });
    var k4 = function(c4) {
      var v4 = this.mux.utils.now();
      this.data.player_init_time && (this.data.player_startup_time = v4 - this.data.player_init_time), !this.mux.PLAYER_TRACKED && this.NAVIGATION_START && (this.mux.PLAYER_TRACKED = true, (this.data.player_init_time || this.DOM_CONTENT_LOADED_EVENT_END) && (this.data.page_load_time = Math.min(this.data.player_init_time || 1 / 0, this.DOM_CONTENT_LOADED_EVENT_END || 1 / 0) - this.NAVIGATION_START)), this.send("playerready"), delete this.data.player_startup_time, delete this.data.page_load_time;
    };
    return o4.one("playerready", k4), o4.longResumeTracker = new Ur(g(o4)), o4.errorTracker = new Bt(g(o4)), new $t(g(o4)), o4.seekingTracker = new zt(g(o4)), o4.playheadTime = new Vt(g(o4)), o4.playbackHeartbeat = new Ht(g(o4)), new Qt(g(o4)), o4.watchTimeTracker = new Ut(g(o4)), new Ft(g(o4)), o4.adTracker = new Yt(g(o4)), new Gt(g(o4)), new jt(g(o4)), new Jt(g(o4)), new Xt(g(o4)), new Br(g(o4)), n3.hlsjs && o4.addHLSJS(n3), n3.dashjs && o4.addDashJS(n3), o4.emit("viewinit", n3.data), o4;
  }
  return L(t3, [{ key: "emit", value: function(a3, n3) {
    var o4, s3 = Object.assign({ viewer_time: this.mux.utils.now() }, n3), u5 = [a3, s3];
    if (this.emitTranslator) try {
      u5 = this.emitTranslator(a3, s3);
    } catch (p6) {
      this.mux.log.warn("Exception in emit translator callback.", p6);
    }
    u5 != null && u5.length && (o4 = De(X(t3.prototype), "emit", this)).call.apply(o4, [this].concat(W(u5)));
  } }, { key: "destroy", value: function() {
    this._destroyed || (this._destroyed = true, typeof this.data.view_start != "undefined" && (this.emit("viewend"), this.send("viewend")), this.playbackEventDispatcher.destroy(), this.removeHLSJS(), this.removeDashJS(), window.clearTimeout(this._heartBeatTimeout));
  } }, { key: "send", value: function(a3) {
    if (this.data.view_id) {
      var n3 = Object.assign({}, this.data), o4 = ["player_program_time", "player_manifest_newest_program_time", "player_live_edge_program_time", "player_program_time", "video_holdback", "video_part_holdback", "video_target_duration", "video_part_target_duration"];
      if (n3.video_source_is_live === void 0 && (n3.player_source_duration === 1 / 0 || n3.video_source_duration === 1 / 0 ? n3.video_source_is_live = true : (n3.player_source_duration > 0 || n3.video_source_duration > 0) && (n3.video_source_is_live = false)), n3.video_source_is_live || o4.forEach(function(b4) {
        n3[b4] = void 0;
      }), n3.video_source_url = n3.video_source_url || n3.player_source_url, n3.video_source_url) {
        var s3 = H(re(n3.video_source_url), 2), u5 = s3[0], p6 = s3[1];
        n3.video_source_domain = p6, n3.video_source_hostname = u5;
      }
      delete n3.ad_request_id, this.playbackEventDispatcher.send(a3, n3), this.data.view_sequence_number++, this.data.player_sequence_number++, hi.has(a3) || this._restartHeartBeat(), a3 === "viewend" && delete this.data.view_id;
    }
  } }, { key: "_resetView", value: function(a3) {
    this.emit("viewend"), this.send("viewend"), this.emit("viewinit", a3);
  } }, { key: "_updateStateData", value: function() {
    var a3 = this.getStateData();
    if (typeof this.stateDataTranslator == "function") try {
      a3 = this.stateDataTranslator(a3);
    } catch (n3) {
      this.mux.log.warn("Exception in stateDataTranslator translator callback.", n3);
    }
    Object.assign(this.data, a3), this.playheadTime._updatePlayheadTime(), this._sanitizeData();
  } }, { key: "_sanitizeData", value: function() {
    var a3 = this, n3 = ["player_width", "player_height", "video_source_width", "video_source_height", "player_playhead_time", "video_source_bitrate"];
    n3.forEach(function(s3) {
      var u5 = parseInt(a3.data[s3], 10);
      a3.data[s3] = isNaN(u5) ? void 0 : u5;
    });
    var o4 = ["player_source_url", "video_source_url"];
    o4.forEach(function(s3) {
      if (a3.data[s3]) {
        var u5 = a3.data[s3].toLowerCase();
        (u5.indexOf("data:") === 0 || u5.indexOf("blob:") === 0) && (a3.data[s3] = "MSE style URL");
      }
    });
  } }, { key: "_resetVideoData", value: function() {
    var a3 = this;
    Object.keys(this.data).forEach(function(n3) {
      n3.indexOf("video_") === 0 && delete a3.data[n3];
    });
  } }, { key: "_resetViewData", value: function() {
    var a3 = this;
    Object.keys(this.data).forEach(function(n3) {
      n3.indexOf("view_") === 0 && delete a3.data[n3];
    }), this.data.view_sequence_number = 1;
  } }, { key: "_resetErrorData", value: function() {
    delete this.data.player_error_code, delete this.data.player_error_message, delete this.data.player_error_context, delete this.data.player_error_severity, delete this.data.player_error_business_exception;
  } }, { key: "_initializeViewData", value: function() {
    var a3 = this, n3 = this.data.view_id = ee(), o4 = function() {
      n3 === a3.data.view_id && O(a3.data, "player_view_count", 1);
    };
    this.data.player_is_paused ? this.one("play", o4) : o4();
  } }, { key: "_restartHeartBeat", value: function() {
    var a3 = this;
    window.clearTimeout(this._heartBeatTimeout), this._heartBeatTimeout = window.setTimeout(function() {
      a3.data.player_is_paused || a3.emit("hb");
    }, 1e4);
  } }, { key: "addHLSJS", value: function(a3) {
    if (!a3.hlsjs) {
      this.mux.log.warn("You must pass a valid hlsjs instance in order to track it.");
      return;
    }
    if (this.hlsjs) {
      this.mux.log.warn("An instance of HLS.js is already being monitored for this player.");
      return;
    }
    this.hlsjs = a3.hlsjs, Ot(this.mux, this.id, a3.hlsjs, {}, a3.Hls || window.Hls);
  } }, { key: "removeHLSJS", value: function() {
    this.hlsjs && (Pt(this.hlsjs), this.hlsjs = void 0);
  } }, { key: "addDashJS", value: function(a3) {
    if (!a3.dashjs) {
      this.mux.log.warn("You must pass a valid dashjs instance in order to track it.");
      return;
    }
    if (this.dashjs) {
      this.mux.log.warn("An instance of Dash.js is already being monitored for this player.");
      return;
    }
    this.dashjs = a3.dashjs, Nt(this.mux, this.id, a3.dashjs);
  } }, { key: "removeDashJS", value: function() {
    this.dashjs && (Lt(this.dashjs), this.dashjs = void 0);
  } }]), t3;
}(Mt);
var Fr = yi;
var he = V(nt());
function ot() {
  return he.default && !!(he.default.fullscreenElement || he.default.webkitFullscreenElement || he.default.mozFullScreenElement || he.default.msFullscreenElement);
}
var gi = ["loadstart", "pause", "play", "playing", "seeking", "seeked", "timeupdate", "ratechange", "stalled", "waiting", "error", "ended"];
var bi = { 1: "MEDIA_ERR_ABORTED", 2: "MEDIA_ERR_NETWORK", 3: "MEDIA_ERR_DECODE", 4: "MEDIA_ERR_SRC_NOT_SUPPORTED" };
function st(r12, e2, t3) {
  var i2 = H(se(e2), 3), a3 = i2[0], n3 = i2[1], o4 = i2[2], s3 = r12.log, u5 = r12.utils.getComputedStyle, p6 = r12.utils.secondsToMs, b4 = { automaticErrorTracking: true };
  if (a3) {
    if (o4 !== "video" && o4 !== "audio") return s3.error("The element of `" + n3 + "` was not a media element.");
  } else return s3.error("No element was found with the `" + n3 + "` query selector.");
  a3.mux && (a3.mux.destroy(), delete a3.mux, s3.warn("Already monitoring this video element, replacing existing event listeners"));
  var k4 = { getPlayheadTime: function() {
    return p6(a3.currentTime);
  }, getStateData: function() {
    var v4, T3, x7, m6 = ((v4 = (T3 = this).getPlayheadTime) === null || v4 === void 0 ? void 0 : v4.call(T3)) || p6(a3.currentTime), f6 = this.hlsjs && this.hlsjs.url, _3 = this.dashjs && typeof this.dashjs.getSource == "function" && this.dashjs.getSource(), d4 = { player_is_paused: a3.paused, player_width: parseInt(u5(a3, "width")), player_height: parseInt(u5(a3, "height")), player_autoplay_on: a3.autoplay, player_preload_on: a3.preload, player_language_code: a3.lang, player_is_fullscreen: ot(), video_poster_url: a3.poster, video_source_url: f6 || _3 || a3.currentSrc, video_source_duration: p6(a3.duration), video_source_height: a3.videoHeight, video_source_width: a3.videoWidth, view_dropped_frame_count: a3 == null || (x7 = a3.getVideoPlaybackQuality) === null || x7 === void 0 ? void 0 : x7.call(a3).droppedVideoFrames };
    if (a3.getStartDate && m6 > 0) {
      var h3 = a3.getStartDate();
      if (h3 && typeof h3.getTime == "function" && h3.getTime()) {
        var w3 = h3.getTime();
        if (d4.player_program_time = w3 + m6, a3.seekable.length > 0) {
          var E4 = w3 + a3.seekable.end(a3.seekable.length - 1);
          d4.player_live_edge_program_time = E4;
        }
      }
    }
    return d4;
  } };
  t3 = Object.assign(b4, t3, k4), t3.data = Object.assign({ player_software: "HTML5 Video Element", player_mux_plugin_name: "VideoElementMonitor", player_mux_plugin_version: r12.VERSION }, t3.data), a3.mux = a3.mux || {}, a3.mux.deleted = false, a3.mux.emit = function(c4, v4) {
    r12.emit(n3, c4, v4);
  }, a3.mux.updateData = function(c4) {
    a3.mux.emit("hb", c4);
  };
  var y5 = function() {
    s3.error("The monitor for this video element has already been destroyed.");
  };
  a3.mux.destroy = function() {
    Object.keys(a3.mux.listeners).forEach(function(c4) {
      a3.removeEventListener(c4, a3.mux.listeners[c4], false);
    }), delete a3.mux.listeners, a3.mux.destroy = y5, a3.mux.swapElement = y5, a3.mux.emit = y5, a3.mux.addHLSJS = y5, a3.mux.addDashJS = y5, a3.mux.removeHLSJS = y5, a3.mux.removeDashJS = y5, a3.mux.updateData = y5, a3.mux.setEmitTranslator = y5, a3.mux.setStateDataTranslator = y5, a3.mux.setGetPlayheadTime = y5, a3.mux.deleted = true, r12.emit(n3, "destroy");
  }, a3.mux.swapElement = function(c4) {
    var v4 = H(se(c4), 3), T3 = v4[0], x7 = v4[1], m6 = v4[2];
    if (T3) {
      if (m6 !== "video" && m6 !== "audio") return r12.log.error("The element of `" + x7 + "` was not a media element.");
    } else return r12.log.error("No element was found with the `" + x7 + "` query selector.");
    T3.muxId = a3.muxId, delete a3.muxId, T3.mux = T3.mux || {}, T3.mux.listeners = Object.assign({}, a3.mux.listeners), delete a3.mux.listeners, Object.keys(T3.mux.listeners).forEach(function(f6) {
      a3.removeEventListener(f6, T3.mux.listeners[f6], false), T3.addEventListener(f6, T3.mux.listeners[f6], false);
    }), T3.mux.swapElement = a3.mux.swapElement, T3.mux.destroy = a3.mux.destroy, delete a3.mux, a3 = T3;
  }, a3.mux.addHLSJS = function(c4) {
    r12.addHLSJS(n3, c4);
  }, a3.mux.addDashJS = function(c4) {
    r12.addDashJS(n3, c4);
  }, a3.mux.removeHLSJS = function() {
    r12.removeHLSJS(n3);
  }, a3.mux.removeDashJS = function() {
    r12.removeDashJS(n3);
  }, a3.mux.setEmitTranslator = function(c4) {
    r12.setEmitTranslator(n3, c4);
  }, a3.mux.setStateDataTranslator = function(c4) {
    r12.setStateDataTranslator(n3, c4);
  }, a3.mux.setGetPlayheadTime = function(c4) {
    c4 || (c4 = t3.getPlayheadTime), r12.setGetPlayheadTime(n3, c4);
  }, r12.init(n3, t3), r12.emit(n3, "playerready"), a3.paused || (r12.emit(n3, "play"), a3.readyState > 2 && r12.emit(n3, "playing")), a3.mux.listeners = {}, gi.forEach(function(c4) {
    c4 === "error" && !t3.automaticErrorTracking || (a3.mux.listeners[c4] = function() {
      var v4 = {};
      if (c4 === "error") {
        if (!a3.error || a3.error.code === 1) return;
        v4.player_error_code = a3.error.code, v4.player_error_message = bi[a3.error.code] || a3.error.message;
      }
      r12.emit(n3, c4, v4);
    }, a3.addEventListener(c4, a3.mux.listeners[c4], false));
  });
}
function ut(r12, e2, t3, i2) {
  var a3 = i2;
  if (r12 && typeof r12[e2] == "function") try {
    a3 = r12[e2].apply(r12, t3);
  } catch (n3) {
    q.info("safeCall error", n3);
  }
  return a3;
}
var ge = V(J());
var ye;
ge.default && ge.default.WeakMap && (ye = /* @__PURE__ */ new WeakMap());
function dt(r12, e2) {
  if (!r12 || !e2 || !ge.default || typeof ge.default.getComputedStyle != "function") return "";
  var t3;
  return ye && ye.has(r12) && (t3 = ye.get(r12)), t3 || (t3 = ge.default.getComputedStyle(r12, null), ye && ye.set(r12, t3)), t3.getPropertyValue(e2);
}
function lt(r12) {
  return Math.floor(r12 * 1e3);
}
var le = { TARGET_DURATION: "#EXT-X-TARGETDURATION", PART_INF: "#EXT-X-PART-INF", SERVER_CONTROL: "#EXT-X-SERVER-CONTROL", INF: "#EXTINF", PROGRAM_DATE_TIME: "#EXT-X-PROGRAM-DATE-TIME", VERSION: "#EXT-X-VERSION", SESSION_DATA: "#EXT-X-SESSION-DATA" };
var Fe = function(e2) {
  return this.buffer = "", this.manifest = { segments: [], serverControl: {}, sessionData: {} }, this.currentUri = {}, this.process(e2), this.manifest;
};
Fe.prototype.process = function(r12) {
  var e2;
  for (this.buffer += r12, e2 = this.buffer.indexOf("\n"); e2 > -1; e2 = this.buffer.indexOf("\n")) this.processLine(this.buffer.substring(0, e2)), this.buffer = this.buffer.substring(e2 + 1);
};
Fe.prototype.processLine = function(r12) {
  var e2 = r12.indexOf(":"), t3 = ki(r12, e2), i2 = t3[0], a3 = t3.length === 2 ? _t(t3[1]) : void 0;
  if (i2[0] !== "#") this.currentUri.uri = i2, this.manifest.segments.push(this.currentUri), this.manifest.targetDuration && !("duration" in this.currentUri) && (this.currentUri.duration = this.manifest.targetDuration), this.currentUri = {};
  else switch (i2) {
    case le.TARGET_DURATION: {
      if (!isFinite(a3) || a3 < 0) return;
      this.manifest.targetDuration = a3, this.setHoldBack();
      break;
    }
    case le.PART_INF: {
      ct(this.manifest, t3), this.manifest.partInf.partTarget && (this.manifest.partTargetDuration = this.manifest.partInf.partTarget), this.setHoldBack();
      break;
    }
    case le.SERVER_CONTROL: {
      ct(this.manifest, t3), this.setHoldBack();
      break;
    }
    case le.INF: {
      a3 === 0 ? this.currentUri.duration = 0.01 : a3 > 0 && (this.currentUri.duration = a3);
      break;
    }
    case le.PROGRAM_DATE_TIME: {
      var n3 = a3, o4 = new Date(n3);
      this.manifest.dateTimeString || (this.manifest.dateTimeString = n3, this.manifest.dateTimeObject = o4), this.currentUri.dateTimeString = n3, this.currentUri.dateTimeObject = o4;
      break;
    }
    case le.VERSION: {
      ct(this.manifest, t3);
      break;
    }
    case le.SESSION_DATA: {
      var s3 = xi(t3[1]), u5 = Ce(s3);
      Object.assign(this.manifest.sessionData, u5);
    }
  }
};
Fe.prototype.setHoldBack = function() {
  var r12 = this.manifest, e2 = r12.serverControl, t3 = r12.targetDuration, i2 = r12.partTargetDuration;
  if (e2) {
    var a3 = "holdBack", n3 = "partHoldBack", o4 = t3 && t3 * 3, s3 = i2 && i2 * 2;
    t3 && !e2.hasOwnProperty(a3) && (e2[a3] = o4), o4 && e2[a3] < o4 && (e2[a3] = o4), i2 && !e2.hasOwnProperty(n3) && (e2[n3] = i2 * 3), i2 && e2[n3] < s3 && (e2[n3] = s3);
  }
};
var ct = function(r12, e2) {
  var t3 = Vr(e2[0].replace("#EXT-X-", "")), i2;
  Ei(e2[1]) ? (i2 = {}, i2 = Object.assign(wi(e2[1]), i2)) : i2 = _t(e2[1]), r12[t3] = i2;
};
var Vr = function(r12) {
  return r12.toLowerCase().replace(/-(\w)/g, function(e2) {
    return e2[1].toUpperCase();
  });
};
var _t = function(r12) {
  if (r12.toLowerCase() === "yes" || r12.toLowerCase() === "no") return r12.toLowerCase() === "yes";
  var e2 = r12.indexOf(":") !== -1 ? r12 : parseFloat(r12);
  return isNaN(e2) ? r12 : e2;
};
var Ti = function(r12) {
  var e2 = {}, t3 = r12.split("=");
  if (t3.length > 1) {
    var i2 = Vr(t3[0]);
    e2[i2] = _t(t3[1]);
  }
  return e2;
};
var wi = function(r12) {
  for (var e2 = r12.split(","), t3 = {}, i2 = 0; e2.length > i2; i2++) {
    var a3 = e2[i2], n3 = Ti(a3);
    t3 = Object.assign(n3, t3);
  }
  return t3;
};
var Ei = function(r12) {
  return r12.indexOf("=") > -1;
};
var ki = function(r12, e2) {
  return e2 === -1 ? [r12] : [r12.substring(0, e2), r12.substring(e2 + 1)];
};
var xi = function(r12) {
  var e2 = {};
  if (r12) {
    var t3 = r12.search(","), i2 = r12.slice(0, t3), a3 = r12.slice(t3 + 1), n3 = [i2, a3];
    return n3.forEach(function(o4, s3) {
      for (var u5 = o4.replace(/['"]+/g, "").split("="), p6 = 0; p6 < u5.length; p6++) u5[p6] === "DATA-ID" && (e2["DATA-ID"] = u5[1 - p6]), u5[p6] === "VALUE" && (e2.VALUE = u5[1 - p6]);
    }), { data: e2 };
  }
};
var Wr = Fe;
var Di = { safeCall: ut, safeIncrement: O, getComputedStyle: dt, secondsToMs: lt, assign: Object.assign, headersStringToObject: pe, cdnHeadersToRequestId: de, extractHostnameAndDomain: re, extractHostname: F, manifestParser: Wr, generateShortID: Oe, generateUUID: ee, now: A.now, findMediaElement: se };
var jr = Di;
var Si = { PLAYER_READY: "playerready", VIEW_INIT: "viewinit", VIDEO_CHANGE: "videochange", PLAY: "play", PAUSE: "pause", PLAYING: "playing", TIME_UPDATE: "timeupdate", SEEKING: "seeking", SEEKED: "seeked", REBUFFER_START: "rebufferstart", REBUFFER_END: "rebufferend", ERROR: "error", ENDED: "ended", RENDITION_CHANGE: "renditionchange", ORIENTATION_CHANGE: "orientationchange", AD_REQUEST: "adrequest", AD_RESPONSE: "adresponse", AD_BREAK_START: "adbreakstart", AD_PLAY: "adplay", AD_PLAYING: "adplaying", AD_PAUSE: "adpause", AD_FIRST_QUARTILE: "adfirstquartile", AD_MID_POINT: "admidpoint", AD_THIRD_QUARTILE: "adthirdquartile", AD_ENDED: "adended", AD_BREAK_END: "adbreakend", AD_ERROR: "aderror", REQUEST_COMPLETED: "requestcompleted", REQUEST_FAILED: "requestfailed", REQUEST_CANCELLED: "requestcanceled", HEARTBEAT: "hb", DESTROY: "destroy" };
var Gr = Si;
var Ri = "mux-embed";
var qi = "5.9.0";
var Ai = "2.1";
var C = {};
var ne = function(e2) {
  var t3 = arguments;
  typeof e2 == "string" ? ne.hasOwnProperty(e2) ? be.default.setTimeout(function() {
    t3 = Array.prototype.splice.call(t3, 1), ne[e2].apply(null, t3);
  }, 0) : q.warn("`" + e2 + "` is an unknown task") : typeof e2 == "function" ? be.default.setTimeout(function() {
    e2(ne);
  }, 0) : q.warn("`" + e2 + "` is invalid.");
};
var Oi = { loaded: A.now(), NAME: Ri, VERSION: qi, API_VERSION: Ai, PLAYER_TRACKED: false, monitor: function(e2, t3) {
  return st(ne, e2, t3);
}, destroyMonitor: function(e2) {
  var t3 = H(se(e2), 1), i2 = t3[0];
  i2 && i2.mux && typeof i2.mux.destroy == "function" ? i2.mux.destroy() : q.error("A video element monitor for `" + e2 + "` has not been initialized via `mux.monitor`.");
}, addHLSJS: function(e2, t3) {
  var i2 = Q(e2);
  C[i2] ? C[i2].addHLSJS(t3) : q.error("A monitor for `" + i2 + "` has not been initialized.");
}, addDashJS: function(e2, t3) {
  var i2 = Q(e2);
  C[i2] ? C[i2].addDashJS(t3) : q.error("A monitor for `" + i2 + "` has not been initialized.");
}, removeHLSJS: function(e2) {
  var t3 = Q(e2);
  C[t3] ? C[t3].removeHLSJS() : q.error("A monitor for `" + t3 + "` has not been initialized.");
}, removeDashJS: function(e2) {
  var t3 = Q(e2);
  C[t3] ? C[t3].removeDashJS() : q.error("A monitor for `" + t3 + "` has not been initialized.");
}, init: function(e2, t3) {
  ce() && t3 && t3.respectDoNotTrack && q.info("The browser's Do Not Track flag is enabled - Mux beaconing is disabled.");
  var i2 = Q(e2);
  C[i2] = new Fr(ne, i2, t3);
}, emit: function(e2, t3, i2) {
  var a3 = Q(e2);
  C[a3] ? (C[a3].emit(t3, i2), t3 === "destroy" && delete C[a3]) : q.error("A monitor for `" + a3 + "` has not been initialized.");
}, updateData: function(e2, t3) {
  var i2 = Q(e2);
  C[i2] ? C[i2].emit("hb", t3) : q.error("A monitor for `" + i2 + "` has not been initialized.");
}, setEmitTranslator: function(e2, t3) {
  var i2 = Q(e2);
  C[i2] ? C[i2].emitTranslator = t3 : q.error("A monitor for `" + i2 + "` has not been initialized.");
}, setStateDataTranslator: function(e2, t3) {
  var i2 = Q(e2);
  C[i2] ? C[i2].stateDataTranslator = t3 : q.error("A monitor for `" + i2 + "` has not been initialized.");
}, setGetPlayheadTime: function(e2, t3) {
  var i2 = Q(e2);
  C[i2] ? C[i2].getPlayheadTime = t3 : q.error("A monitor for `" + i2 + "` has not been initialized.");
}, checkDoNotTrack: ce, log: q, utils: jr, events: Gr, WINDOW_HIDDEN: false, WINDOW_UNLOADING: false };
Object.assign(ne, Oi);
typeof be.default != "undefined" && typeof be.default.addEventListener == "function" && be.default.addEventListener("pagehide", function(r12) {
  r12.persisted || (ne.WINDOW_UNLOADING = true);
}, false);
var Ed = ne;

// node_modules/@mux/playback-core/dist/index.mjs
var g2 = Hls;
var C2 = { VIDEO: "video", THUMBNAIL: "thumbnail", STORYBOARD: "storyboard", DRM: "drm" };
var D2 = { NOT_AN_ERROR: 0, NETWORK_OFFLINE: 2000002, NETWORK_UNKNOWN_ERROR: 2e6, NETWORK_NO_STATUS: 2000001, NETWORK_INVALID_URL: 24e5, NETWORK_NOT_FOUND: 2404e3, NETWORK_NOT_READY: 2412e3, NETWORK_GENERIC_SERVER_FAIL: 25e5, NETWORK_TOKEN_MISSING: 2403201, NETWORK_TOKEN_MALFORMED: 2412202, NETWORK_TOKEN_EXPIRED: 2403210, NETWORK_TOKEN_AUD_MISSING: 2403221, NETWORK_TOKEN_AUD_MISMATCH: 2403222, NETWORK_TOKEN_SUB_MISMATCH: 2403232, ENCRYPTED_ERROR: 5e6, ENCRYPTED_UNSUPPORTED_KEY_SYSTEM: 5000001, ENCRYPTED_GENERATE_REQUEST_FAILED: 5000002, ENCRYPTED_UPDATE_LICENSE_FAILED: 5000003, ENCRYPTED_UPDATE_SERVER_CERT_FAILED: 5000004, ENCRYPTED_CDM_ERROR: 5000005, ENCRYPTED_OUTPUT_RESTRICTED: 5000006, ENCRYPTED_MISSING_TOKEN: 5000002 };
var V2 = (e2) => e2 === C2.VIDEO ? "playback" : e2;
var L2 = class L3 extends Error {
  constructor(t3, r12 = L3.MEDIA_ERR_CUSTOM, n3, o4) {
    var a3;
    super(t3), this.name = "MediaError", this.code = r12, this.context = o4, this.fatal = n3 != null ? n3 : r12 >= L3.MEDIA_ERR_NETWORK && r12 <= L3.MEDIA_ERR_ENCRYPTED, this.message || (this.message = (a3 = L3.defaultMessages[this.code]) != null ? a3 : "");
  }
};
L2.MEDIA_ERR_ABORTED = 1, L2.MEDIA_ERR_NETWORK = 2, L2.MEDIA_ERR_DECODE = 3, L2.MEDIA_ERR_SRC_NOT_SUPPORTED = 4, L2.MEDIA_ERR_ENCRYPTED = 5, L2.MEDIA_ERR_CUSTOM = 100, L2.defaultMessages = { 1: "You aborted the media playback", 2: "A network error caused the media download to fail.", 3: "A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.", 4: "An unsupported error occurred. The server or network failed, or your browser does not support this format.", 5: "The media is encrypted and there are no keys to decrypt it." };
var f = L2;
var et = (e2) => e2 == null;
var O2 = (e2, t3) => et(t3) ? false : e2 in t3;
var K = { ANY: "any", MUTED: "muted" };
var _ = { ON_DEMAND: "on-demand", LIVE: "live", UNKNOWN: "unknown" };
var X2 = { MSE: "mse", NATIVE: "native" };
var S = { HEADER: "header", QUERY: "query", NONE: "none" };
var jt2 = Object.values(S);
var A2 = { M3U8: "application/vnd.apple.mpegurl", MP4: "video/mp4" };
var W2 = { HLS: A2.M3U8 };
var Jt2 = Object.keys(W2);
var qt2 = [...Object.values(A2), "hls", "HLS"];
var Gt2 = { upTo720p: "720p", upTo1080p: "1080p", upTo1440p: "1440p", upTo2160p: "2160p" };
var Xt2 = { noLessThan480p: "480p", noLessThan540p: "540p", noLessThan720p: "720p", noLessThan1080p: "1080p", noLessThan1440p: "1440p", noLessThan2160p: "2160p" };
var zt2 = { DESCENDING: "desc" };
var tt = "en";
var Y2 = { code: tt };
var v = (e2, t3, r12, n3, o4 = e2) => {
  o4.addEventListener(t3, r12, n3), e2.addEventListener("teardown", () => {
    o4.removeEventListener(t3, r12);
  }, { once: true });
};
function fe2(e2, t3, r12) {
  t3 && r12 > t3 && (r12 = t3);
  for (let n3 = 0; n3 < e2.length; n3++) if (e2.start(n3) <= r12 && e2.end(n3) >= r12) return true;
  return false;
}
var F2 = (e2) => {
  let t3 = e2.indexOf("?");
  if (t3 < 0) return [e2];
  let r12 = e2.slice(0, t3), n3 = e2.slice(t3);
  return [r12, n3];
};
var U2 = (e2) => {
  let { type: t3 } = e2;
  if (t3) {
    let r12 = t3.toUpperCase();
    return O2(r12, W2) ? W2[r12] : t3;
  }
  return rt2(e2);
};
var Q2 = (e2) => e2 === "VOD" ? _.ON_DEMAND : _.LIVE;
var Z = (e2) => e2 === "EVENT" ? Number.POSITIVE_INFINITY : e2 === "VOD" ? Number.NaN : 0;
var rt2 = (e2) => {
  let { src: t3 } = e2;
  if (!t3) return "";
  let r12 = "";
  try {
    r12 = new URL(t3).pathname;
  } catch {
    console.error("invalid url");
  }
  let n3 = r12.lastIndexOf(".");
  if (n3 < 0) return ot2(e2) ? A2.M3U8 : "";
  let a3 = r12.slice(n3 + 1).toUpperCase();
  return O2(a3, A2) ? A2[a3] : "";
};
var nt2 = "mux.com";
var ot2 = ({ src: e2, customDomain: t3 = nt2 }) => {
  let r12;
  try {
    r12 = new URL(`${e2}`);
  } catch {
    return false;
  }
  let n3 = r12.protocol === "https:", o4 = r12.hostname === `stream.${t3}`.toLowerCase(), a3 = r12.pathname.split("/"), i2 = a3.length === 2, c4 = !(a3 != null && a3[1].includes("."));
  return n3 && o4 && i2 && c4;
};
var ee2 = (e2) => {
  let t3 = (e2 != null ? e2 : "").split(".")[1];
  if (t3) try {
    let r12 = t3.replace(/-/g, "+").replace(/_/g, "/"), n3 = decodeURIComponent(atob(r12).split("").map(function(o4) {
      return "%" + ("00" + o4.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
    return JSON.parse(n3);
  } catch {
    return;
  }
};
var Te = ({ exp: e2 }, t3 = Date.now()) => !e2 || e2 * 1e3 < t3;
var ye2 = ({ sub: e2 }, t3) => e2 !== t3;
var me = ({ aud: e2 }, t3) => !e2;
var Ee = ({ aud: e2 }, t3) => e2 !== t3;
var ge2 = "en";
function x(e2, t3 = true) {
  var o4, a3;
  let r12 = t3 && (a3 = (o4 = Y2) == null ? void 0 : o4[e2]) != null ? a3 : e2, n3 = t3 ? Y2.code : ge2;
  return new z(r12, n3);
}
var z = class {
  constructor(t3, r12 = ((n3) => (n3 = Y2) != null ? n3 : ge2)()) {
    this.message = t3, this.locale = r12;
  }
  format(t3) {
    return this.message.replace(/\{(\w+)\}/g, (r12, n3) => {
      var o4;
      return (o4 = t3[n3]) != null ? o4 : "";
    });
  }
  toString() {
    return this.message;
  }
};
var at = Object.values(K);
var Me2 = (e2) => typeof e2 == "boolean" || typeof e2 == "string" && at.includes(e2);
var xe = (e2, t3, r12) => {
  let { autoplay: n3 } = e2, o4 = false, a3 = false, i2 = Me2(n3) ? n3 : !!n3, c4 = () => {
    o4 || v(t3, "playing", () => {
      o4 = true;
    }, { once: true });
  };
  if (c4(), v(t3, "loadstart", () => {
    o4 = false, c4(), te2(t3, i2);
  }, { once: true }), v(t3, "loadstart", () => {
    r12 || (e2.streamType && e2.streamType !== _.UNKNOWN ? a3 = e2.streamType === _.LIVE : a3 = !Number.isFinite(t3.duration)), te2(t3, i2);
  }, { once: true }), r12 && r12.once(g2.Events.LEVEL_LOADED, (u5, s3) => {
    var p6;
    e2.streamType && e2.streamType !== _.UNKNOWN ? a3 = e2.streamType === _.LIVE : a3 = (p6 = s3.details.live) != null ? p6 : false;
  }), !i2) {
    let u5 = () => {
      !a3 || Number.isFinite(e2.startTime) || (r12 != null && r12.liveSyncPosition ? t3.currentTime = r12.liveSyncPosition : Number.isFinite(t3.seekable.end(0)) && (t3.currentTime = t3.seekable.end(0)));
    };
    r12 && v(t3, "play", () => {
      t3.preload === "metadata" ? r12.once(g2.Events.LEVEL_UPDATED, u5) : u5();
    }, { once: true });
  }
  return (u5) => {
    o4 || (i2 = Me2(u5) ? u5 : !!u5, te2(t3, i2));
  };
};
var te2 = (e2, t3) => {
  if (!t3) return;
  let r12 = e2.muted, n3 = () => e2.muted = r12;
  switch (t3) {
    case K.ANY:
      e2.play().catch(() => {
        e2.muted = true, e2.play().catch(n3);
      });
      break;
    case K.MUTED:
      e2.muted = true, e2.play().catch(n3);
      break;
    default:
      e2.play().catch(() => {
      });
      break;
  }
};
var Re = ({ preload: e2, src: t3 }, r12, n3) => {
  let o4 = (p6) => {
    p6 != null && ["", "none", "metadata", "auto"].includes(p6) ? r12.setAttribute("preload", p6) : r12.removeAttribute("preload");
  };
  if (!n3) return o4(e2), o4;
  let a3 = false, i2 = false, c4 = n3.config.maxBufferLength, d4 = n3.config.maxBufferSize, u5 = (p6) => {
    o4(p6);
    let l4 = p6 != null ? p6 : r12.preload;
    i2 || l4 === "none" || (l4 === "metadata" ? (n3.config.maxBufferLength = 1, n3.config.maxBufferSize = 1) : (n3.config.maxBufferLength = c4, n3.config.maxBufferSize = d4), s3());
  }, s3 = () => {
    !a3 && t3 && (a3 = true, n3.loadSource(t3));
  };
  return v(r12, "play", () => {
    i2 = true, n3.config.maxBufferLength = c4, n3.config.maxBufferSize = d4, s3();
  }, { once: true }), u5(e2), u5;
};
function De2(e2, t3) {
  var c4;
  if (!("videoTracks" in e2)) return;
  let r12 = /* @__PURE__ */ new WeakMap();
  t3.on(g2.Events.MANIFEST_PARSED, function(d4, u5) {
    i2();
    let s3 = e2.addVideoTrack("main");
    s3.selected = true;
    for (let [p6, l4] of u5.levels.entries()) {
      let T3 = s3.addRendition(l4.url[0], l4.width, l4.height, l4.videoCodec, l4.bitrate);
      r12.set(l4, `${p6}`), T3.id = `${p6}`;
    }
  }), t3.on(g2.Events.AUDIO_TRACKS_UPDATED, function(d4, u5) {
    a3();
    for (let s3 of u5.audioTracks) {
      let p6 = s3.default ? "main" : "alternative", l4 = e2.addAudioTrack(p6, s3.name, s3.lang);
      l4.id = `${s3.id}`, s3.default && (l4.enabled = true);
    }
  }), e2.audioTracks.addEventListener("change", () => {
    var s3;
    let d4 = +((s3 = [...e2.audioTracks].find((p6) => p6.enabled)) == null ? void 0 : s3.id), u5 = t3.audioTracks.map((p6) => p6.id);
    d4 != t3.audioTrack && u5.includes(d4) && (t3.audioTrack = d4);
  }), t3.on(g2.Events.LEVELS_UPDATED, function(d4, u5) {
    var l4;
    let s3 = e2.videoTracks[(l4 = e2.videoTracks.selectedIndex) != null ? l4 : 0];
    if (!s3) return;
    let p6 = u5.levels.map((T3) => r12.get(T3));
    for (let T3 of e2.videoRenditions) T3.id && !p6.includes(T3.id) && s3.removeRendition(T3);
  });
  let n3 = (d4) => {
    let u5 = d4.target.selectedIndex;
    u5 != t3.nextLevel && (t3.nextLevel = u5);
  };
  (c4 = e2.videoRenditions) == null || c4.addEventListener("change", n3);
  let o4 = () => {
    for (let d4 of e2.videoTracks) e2.removeVideoTrack(d4);
  }, a3 = () => {
    for (let d4 of e2.audioTracks) e2.removeAudioTrack(d4);
  }, i2 = () => {
    o4(), a3();
  };
  t3.once(g2.Events.DESTROYING, i2);
}
var re2 = (e2) => "time" in e2 ? e2.time : e2.startTime;
function be2(e2, t3) {
  t3.on(g2.Events.NON_NATIVE_TEXT_TRACKS_FOUND, (o4, { tracks: a3 }) => {
    a3.forEach((i2) => {
      var s3, p6;
      let c4 = (s3 = i2.subtitleTrack) != null ? s3 : i2.closedCaptions, d4 = t3.subtitleTracks.findIndex(({ lang: l4, name: T3, type: m6 }) => l4 == (c4 == null ? void 0 : c4.lang) && T3 === i2.label && m6.toLowerCase() === i2.kind), u5 = ((p6 = i2._id) != null ? p6 : i2.default) ? "default" : `${i2.kind}${d4}`;
      ne2(e2, i2.kind, i2.label, c4 == null ? void 0 : c4.lang, u5, i2.default);
    });
  });
  let r12 = () => {
    if (!t3.subtitleTracks.length) return;
    let o4 = Array.from(e2.textTracks).find((c4) => c4.id && c4.mode === "showing" && ["subtitles", "captions"].includes(c4.kind));
    if (!o4) return;
    let a3 = t3.subtitleTracks[t3.subtitleTrack], i2 = a3 ? a3.default ? "default" : `${t3.subtitleTracks[t3.subtitleTrack].type.toLowerCase()}${t3.subtitleTrack}` : void 0;
    if (t3.subtitleTrack < 0 || (o4 == null ? void 0 : o4.id) !== i2) {
      let c4 = t3.subtitleTracks.findIndex(({ lang: d4, name: u5, type: s3, default: p6 }) => o4.id === "default" && p6 || d4 == o4.language && u5 === o4.label && s3.toLowerCase() === o4.kind);
      t3.subtitleTrack = c4;
    }
    (o4 == null ? void 0 : o4.id) === i2 && o4.cues && Array.from(o4.cues).forEach((c4) => {
      o4.addCue(c4);
    });
  };
  e2.textTracks.addEventListener("change", r12), t3.on(g2.Events.CUES_PARSED, (o4, { track: a3, cues: i2 }) => {
    let c4 = e2.textTracks.getTrackById(a3);
    if (!c4) return;
    let d4 = c4.mode === "disabled";
    d4 && (c4.mode = "hidden"), i2.forEach((u5) => {
      var s3;
      (s3 = c4.cues) != null && s3.getCueById(u5.id) || c4.addCue(u5);
    }), d4 && (c4.mode = "disabled");
  }), t3.once(g2.Events.DESTROYING, () => {
    e2.textTracks.removeEventListener("change", r12), e2.querySelectorAll("track[data-removeondestroy]").forEach((a3) => {
      a3.remove();
    });
  });
  let n3 = () => {
    Array.from(e2.textTracks).forEach((o4) => {
      var a3, i2;
      if (!["subtitles", "caption"].includes(o4.kind) && (o4.label === "thumbnails" || o4.kind === "chapters")) {
        if (!((a3 = o4.cues) != null && a3.length)) {
          let c4 = "track";
          o4.kind && (c4 += `[kind="${o4.kind}"]`), o4.label && (c4 += `[label="${o4.label}"]`);
          let d4 = e2.querySelector(c4), u5 = (i2 = d4 == null ? void 0 : d4.getAttribute("src")) != null ? i2 : "";
          d4 == null || d4.removeAttribute("src"), setTimeout(() => {
            d4 == null || d4.setAttribute("src", u5);
          }, 0);
        }
        o4.mode !== "hidden" && (o4.mode = "hidden");
      }
    });
  };
  t3.once(g2.Events.MANIFEST_LOADED, n3), t3.once(g2.Events.MEDIA_ATTACHED, n3);
}
function ne2(e2, t3, r12, n3, o4, a3) {
  let i2 = document.createElement("track");
  return i2.kind = t3, i2.label = r12, n3 && (i2.srclang = n3), o4 && (i2.id = o4), a3 && (i2.default = true), i2.track.mode = ["subtitles", "captions"].includes(t3) ? "disabled" : "hidden", i2.setAttribute("data-removeondestroy", ""), e2.append(i2), i2.track;
}
function st2(e2, t3) {
  let r12 = Array.prototype.find.call(e2.querySelectorAll("track"), (n3) => n3.track === t3);
  r12 == null || r12.remove();
}
function w(e2, t3, r12) {
  var n3;
  return (n3 = Array.from(e2.querySelectorAll("track")).find((o4) => o4.track.label === t3 && o4.track.kind === r12)) == null ? void 0 : n3.track;
}
async function Ce2(e2, t3, r12, n3) {
  let o4 = w(e2, r12, n3);
  return o4 || (o4 = ne2(e2, n3, r12), o4.mode = "hidden", await new Promise((a3) => setTimeout(() => a3(void 0), 0))), o4.mode !== "hidden" && (o4.mode = "hidden"), [...t3].sort((a3, i2) => re2(i2) - re2(a3)).forEach((a3) => {
    var d4, u5;
    let i2 = a3.value, c4 = re2(a3);
    if ("endTime" in a3 && a3.endTime != null) o4 == null || o4.addCue(new VTTCue(c4, a3.endTime, n3 === "chapters" ? i2 : JSON.stringify(i2 != null ? i2 : null)));
    else {
      let s3 = Array.prototype.findIndex.call(o4 == null ? void 0 : o4.cues, (m6) => m6.startTime >= c4), p6 = (d4 = o4 == null ? void 0 : o4.cues) == null ? void 0 : d4[s3], l4 = p6 ? p6.startTime : Number.isFinite(e2.duration) ? e2.duration : Number.MAX_SAFE_INTEGER, T3 = (u5 = o4 == null ? void 0 : o4.cues) == null ? void 0 : u5[s3 - 1];
      T3 && (T3.endTime = c4), o4 == null || o4.addCue(new VTTCue(c4, l4, n3 === "chapters" ? i2 : JSON.stringify(i2 != null ? i2 : null)));
    }
  }), e2.textTracks.dispatchEvent(new Event("change", { bubbles: true, composed: true })), o4;
}
var oe = "cuepoints";
var ve2 = Object.freeze({ label: oe });
async function Pe2(e2, t3, r12 = ve2) {
  return Ce2(e2, t3, r12.label, "metadata");
}
var $2 = (e2) => ({ time: e2.startTime, value: JSON.parse(e2.text) });
function it(e2, t3 = { label: oe }) {
  let r12 = w(e2, t3.label, "metadata");
  return r12 != null && r12.cues ? Array.from(r12.cues, (n3) => $2(n3)) : [];
}
function _e2(e2, t3 = { label: oe }) {
  var a3, i2;
  let r12 = w(e2, t3.label, "metadata");
  if (!((a3 = r12 == null ? void 0 : r12.activeCues) != null && a3.length)) return;
  if (r12.activeCues.length === 1) return $2(r12.activeCues[0]);
  let { currentTime: n3 } = e2, o4 = Array.prototype.find.call((i2 = r12.activeCues) != null ? i2 : [], ({ startTime: c4, endTime: d4 }) => c4 <= n3 && d4 > n3);
  return $2(o4 || r12.activeCues[0]);
}
async function ke2(e2, t3 = ve2) {
  return new Promise((r12) => {
    v(e2, "loadstart", async () => {
      let n3 = await Pe2(e2, [], t3);
      v(e2, "cuechange", () => {
        let o4 = _e2(e2);
        if (o4) {
          let a3 = new CustomEvent("cuepointchange", { composed: true, bubbles: true, detail: o4 });
          e2.dispatchEvent(a3);
        }
      }, {}, n3), r12(n3);
    });
  });
}
var ae = "chapters";
var he2 = Object.freeze({ label: ae });
var B2 = (e2) => ({ startTime: e2.startTime, endTime: e2.endTime, value: e2.text });
async function Le2(e2, t3, r12 = he2) {
  return Ce2(e2, t3, r12.label, "chapters");
}
function ct2(e2, t3 = { label: ae }) {
  var n3;
  let r12 = w(e2, t3.label, "chapters");
  return (n3 = r12 == null ? void 0 : r12.cues) != null && n3.length ? Array.from(r12.cues, (o4) => B2(o4)) : [];
}
function Ne2(e2, t3 = { label: ae }) {
  var a3, i2;
  let r12 = w(e2, t3.label, "chapters");
  if (!((a3 = r12 == null ? void 0 : r12.activeCues) != null && a3.length)) return;
  if (r12.activeCues.length === 1) return B2(r12.activeCues[0]);
  let { currentTime: n3 } = e2, o4 = Array.prototype.find.call((i2 = r12.activeCues) != null ? i2 : [], ({ startTime: c4, endTime: d4 }) => c4 <= n3 && d4 > n3);
  return B2(o4 || r12.activeCues[0]);
}
async function Ae2(e2, t3 = he2) {
  return new Promise((r12) => {
    v(e2, "loadstart", async () => {
      let n3 = await Le2(e2, [], t3);
      v(e2, "cuechange", () => {
        let o4 = Ne2(e2);
        if (o4) {
          let a3 = new CustomEvent("chapterchange", { composed: true, bubbles: true, detail: o4 });
          e2.dispatchEvent(a3);
        }
      }, {}, n3), r12(n3);
    });
  });
}
function ut2(e2, t3) {
  if (t3) {
    let r12 = t3.playingDate;
    if (r12 != null) return new Date(r12.getTime() - e2.currentTime * 1e3);
  }
  return typeof e2.getStartDate == "function" ? e2.getStartDate() : /* @__PURE__ */ new Date(NaN);
}
function dt2(e2, t3) {
  if (t3 && t3.playingDate) return t3.playingDate;
  if (typeof e2.getStartDate == "function") {
    let r12 = e2.getStartDate();
    return new Date(r12.getTime() + e2.currentTime * 1e3);
  }
  return /* @__PURE__ */ new Date(NaN);
}
var se2 = { VIDEO: "v", THUMBNAIL: "t", STORYBOARD: "s", DRM: "d" };
var lt2 = (e2) => {
  if (e2 === C2.VIDEO) return se2.VIDEO;
  if (e2 === C2.DRM) return se2.DRM;
};
var pt2 = (e2, t3) => {
  var o4, a3;
  let r12 = V2(e2), n3 = `${r12}Token`;
  return (o4 = t3.tokens) != null && o4[r12] ? (a3 = t3.tokens) == null ? void 0 : a3[r12] : O2(n3, t3) ? t3[n3] : void 0;
};
var H2 = (e2, t3, r12, n3, o4 = false, a3 = !((i2) => (i2 = globalThis.navigator) == null ? void 0 : i2.onLine)()) => {
  var M4, h3;
  if (a3) {
    let E4 = x("Your device appears to be offline", o4), b4 = void 0, y5 = f.MEDIA_ERR_NETWORK, k4 = new f(E4, y5, false, b4);
    return k4.errorCategory = t3, k4.muxCode = D2.NETWORK_OFFLINE, k4.data = e2, k4;
  }
  let c4 = "status" in e2 ? e2.status : e2.code, d4 = Date.now(), u5 = f.MEDIA_ERR_NETWORK;
  if (c4 === 200) return;
  let s3 = V2(t3), p6 = pt2(t3, r12), l4 = lt2(t3), [T3] = F2((M4 = r12.playbackId) != null ? M4 : "");
  if (!c4 || !T3) return;
  let m6 = ee2(p6);
  if (p6 && !m6) {
    let E4 = x("The {tokenNamePrefix}-token provided is invalid or malformed.", o4).format({ tokenNamePrefix: s3 }), b4 = x("Compact JWT string: {token}", o4).format({ token: p6 }), y5 = new f(E4, u5, true, b4);
    return y5.errorCategory = t3, y5.muxCode = D2.NETWORK_TOKEN_MALFORMED, y5.data = e2, y5;
  }
  if (c4 >= 500) {
    let E4 = new f("", u5, n3 != null ? n3 : true);
    return E4.errorCategory = t3, E4.muxCode = D2.NETWORK_UNKNOWN_ERROR, E4;
  }
  if (c4 === 403) if (m6) {
    if (Te(m6, d4)) {
      let E4 = { timeStyle: "medium", dateStyle: "medium" }, b4 = x("The video’s secured {tokenNamePrefix}-token has expired.", o4).format({ tokenNamePrefix: s3 }), y5 = x("Expired at: {expiredDate}. Current time: {currentDate}.", o4).format({ expiredDate: new Intl.DateTimeFormat("en", E4).format((h3 = m6.exp) != null ? h3 : 0 * 1e3), currentDate: new Intl.DateTimeFormat("en", E4).format(d4) }), k4 = new f(b4, u5, true, y5);
      return k4.errorCategory = t3, k4.muxCode = D2.NETWORK_TOKEN_EXPIRED, k4.data = e2, k4;
    }
    if (ye2(m6, T3)) {
      let E4 = x("The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.", o4).format({ tokenNamePrefix: s3 }), b4 = x("Specified playback ID: {playbackId} and the playback ID encoded in the {tokenNamePrefix}-token: {tokenPlaybackId}", o4).format({ tokenNamePrefix: s3, playbackId: T3, tokenPlaybackId: m6.sub }), y5 = new f(E4, u5, true, b4);
      return y5.errorCategory = t3, y5.muxCode = D2.NETWORK_TOKEN_SUB_MISMATCH, y5.data = e2, y5;
    }
    if (me(m6, l4)) {
      let E4 = x("The {tokenNamePrefix}-token is formatted with incorrect information.", o4).format({ tokenNamePrefix: s3 }), b4 = x("The {tokenNamePrefix}-token has no aud value. aud value should be {expectedAud}.", o4).format({ tokenNamePrefix: s3, expectedAud: l4 }), y5 = new f(E4, u5, true, b4);
      return y5.errorCategory = t3, y5.muxCode = D2.NETWORK_TOKEN_AUD_MISSING, y5.data = e2, y5;
    }
    if (Ee(m6, l4)) {
      let E4 = x("The {tokenNamePrefix}-token is formatted with incorrect information.", o4).format({ tokenNamePrefix: s3 }), b4 = x("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.", o4).format({ tokenNamePrefix: s3, expectedAud: l4, aud: m6.aud }), y5 = new f(E4, u5, true, b4);
      return y5.errorCategory = t3, y5.muxCode = D2.NETWORK_TOKEN_AUD_MISMATCH, y5.data = e2, y5;
    }
  } else {
    let E4 = x("Authorization error trying to access this {category} URL. If this is a signed URL, you might need to provide a {tokenNamePrefix}-token.", o4).format({ tokenNamePrefix: s3, category: t3 }), b4 = x("Specified playback ID: {playbackId}", o4).format({ playbackId: T3 }), y5 = new f(E4, u5, n3 != null ? n3 : true, b4);
    return y5.errorCategory = t3, y5.muxCode = D2.NETWORK_TOKEN_MISSING, y5.data = e2, y5;
  }
  if (c4 === 412) {
    let E4 = x("This playback-id may belong to a live stream that is not currently active or an asset that is not ready.", o4), b4 = x("Specified playback ID: {playbackId}", o4).format({ playbackId: T3 }), y5 = new f(E4, u5, n3 != null ? n3 : true, b4);
    return y5.errorCategory = t3, y5.muxCode = D2.NETWORK_NOT_READY, y5.streamType = r12.streamType === _.LIVE ? "live" : r12.streamType === _.ON_DEMAND ? "on-demand" : "unknown", y5.data = e2, y5;
  }
  if (c4 === 404) {
    let E4 = x("This URL or playback-id does not exist. You may have used an Asset ID or an ID from a different resource.", o4), b4 = x("Specified playback ID: {playbackId}", o4).format({ playbackId: T3 }), y5 = new f(E4, u5, n3 != null ? n3 : true, b4);
    return y5.errorCategory = t3, y5.muxCode = D2.NETWORK_NOT_FOUND, y5.data = e2, y5;
  }
  if (c4 === 400) {
    let E4 = x("The URL or playback-id was invalid. You may have used an invalid value as a playback-id."), b4 = x("Specified playback ID: {playbackId}", o4).format({ playbackId: T3 }), y5 = new f(E4, u5, n3 != null ? n3 : true, b4);
    return y5.errorCategory = t3, y5.muxCode = D2.NETWORK_INVALID_URL, y5.data = e2, y5;
  }
  let R = new f("", u5, n3 != null ? n3 : true);
  return R.errorCategory = t3, R.muxCode = D2.NETWORK_UNKNOWN_ERROR, R.data = e2, R;
};
var Ie2 = g2.DefaultConfig.capLevelController;
var j = class j2 extends Ie2 {
  constructor(t3) {
    super(t3);
  }
  get levels() {
    var t3;
    return (t3 = this.hls.levels) != null ? t3 : [];
  }
  getValidLevels(t3) {
    return this.levels.filter((r12, n3) => this.isLevelAllowed(r12) && n3 <= t3);
  }
  getMaxLevel(t3) {
    let r12 = super.getMaxLevel(t3), n3 = this.getValidLevels(t3);
    if (!n3[r12]) return r12;
    let o4 = Math.min(n3[r12].width, n3[r12].height), a3 = j2.minMaxResolution;
    return o4 >= a3 ? r12 : Ie2.getMaxLevelByMediaSize(n3, a3 * (16 / 9), a3);
  }
};
j.minMaxResolution = 720;
var ie2 = j;
var Se2 = ie2;
var J2 = { FAIRPLAY: "fairplay", PLAYREADY: "playready", WIDEVINE: "widevine" };
var ft2 = (e2) => {
  if (e2.includes("fps")) return J2.FAIRPLAY;
  if (e2.includes("playready")) return J2.PLAYREADY;
  if (e2.includes("widevine")) return J2.WIDEVINE;
};
var Tt2 = (e2) => {
  let t3 = e2.split(`
`).find((r12, n3, o4) => n3 && o4[n3 - 1].startsWith("#EXT-X-STREAM-INF"));
  return fetch(t3).then((r12) => r12.status !== 200 ? Promise.reject(r12) : r12.text());
};
var yt = (e2) => {
  let t3 = e2.split(`
`).filter((n3) => n3.startsWith("#EXT-X-SESSION-DATA"));
  if (!t3.length) return {};
  let r12 = {};
  for (let n3 of t3) {
    let o4 = Et2(n3), a3 = o4["DATA-ID"];
    a3 && (r12[a3] = { ...o4 });
  }
  return { sessionData: r12 };
};
var mt2 = /([A-Z0-9-]+)="?(.*?)"?(?:,|$)/g;
function Et2(e2) {
  let t3 = [...e2.matchAll(mt2)];
  return Object.fromEntries(t3.map(([, r12, n3]) => [r12, n3]));
}
var gt2 = (e2) => {
  var c4, d4, u5;
  let t3 = e2.split(`
`), n3 = (d4 = ((c4 = t3.find((s3) => s3.startsWith("#EXT-X-PLAYLIST-TYPE"))) != null ? c4 : "").split(":")[1]) == null ? void 0 : d4.trim(), o4 = Q2(n3), a3 = Z(n3), i2;
  if (o4 === _.LIVE) {
    let s3 = t3.find((l4) => l4.startsWith("#EXT-X-PART-INF"));
    if (!!s3) i2 = +s3.split(":")[1].split("=")[1] * 2;
    else {
      let l4 = t3.find((R) => R.startsWith("#EXT-X-TARGETDURATION")), T3 = (u5 = l4 == null ? void 0 : l4.split(":")) == null ? void 0 : u5[1];
      i2 = +(T3 != null ? T3 : 6) * 3;
    }
  }
  return { streamType: o4, targetLiveWindow: a3, liveEdgeStartOffset: i2 };
};
var Mt2 = async (e2, t3) => {
  if (t3 === A2.MP4) return { streamType: _.ON_DEMAND, targetLiveWindow: Number.NaN, liveEdgeStartOffset: void 0, sessionData: void 0 };
  if (t3 === A2.M3U8) {
    let r12 = await fetch(e2);
    if (!r12.ok) return Promise.reject(r12);
    let n3 = await r12.text(), o4 = await Tt2(n3);
    return { ...yt(n3), ...gt2(o4) };
  }
  return console.error(`Media type ${t3} is an unrecognized or unsupported type for src ${e2}.`), { streamType: void 0, targetLiveWindow: void 0, liveEdgeStartOffset: void 0, sessionData: void 0 };
};
var xt2 = async (e2, t3, r12 = U2({ src: e2 })) => {
  var d4, u5, s3, p6;
  let { streamType: n3, targetLiveWindow: o4, liveEdgeStartOffset: a3, sessionData: i2 } = await Mt2(e2, r12), c4 = i2 == null ? void 0 : i2["com.apple.hls.chapters"];
  (c4 != null && c4.URI || c4 != null && c4.VALUE.toLocaleLowerCase().startsWith("http")) && de2((d4 = c4.URI) != null ? d4 : c4.VALUE, t3), ((u5 = P.get(t3)) != null ? u5 : {}).liveEdgeStartOffset = a3, ((s3 = P.get(t3)) != null ? s3 : {}).targetLiveWindow = o4, t3.dispatchEvent(new CustomEvent("targetlivewindowchange", { composed: true, bubbles: true })), ((p6 = P.get(t3)) != null ? p6 : {}).streamType = n3, t3.dispatchEvent(new CustomEvent("streamtypechange", { composed: true, bubbles: true }));
};
var de2 = async (e2, t3) => {
  var r12, n3;
  try {
    let o4 = await fetch(e2);
    if (!o4.ok) throw new Error(`Failed to fetch Mux metadata: ${o4.status} ${o4.statusText}`);
    let a3 = await o4.json(), i2 = {};
    if (!((r12 = a3 == null ? void 0 : a3[0]) != null && r12.metadata)) return;
    for (let d4 of a3[0].metadata) d4.key && d4.value && (i2[d4.key] = d4.value);
    ((n3 = P.get(t3)) != null ? n3 : {}).metadata = i2;
    let c4 = new CustomEvent("muxmetadata");
    t3.dispatchEvent(c4);
  } catch (o4) {
    console.error(o4);
  }
};
var Rt2 = (e2) => {
  var i2;
  let t3 = e2.type, r12 = Q2(t3), n3 = Z(t3), o4, a3 = !!((i2 = e2.partList) != null && i2.length);
  return r12 === _.LIVE && (o4 = a3 ? e2.partTarget * 2 : e2.targetduration * 3), { streamType: r12, targetLiveWindow: n3, liveEdgeStartOffset: o4, lowLatency: a3 };
};
var Dt2 = (e2, t3, r12) => {
  var c4, d4, u5, s3, p6, l4, T3, m6;
  let { streamType: n3, targetLiveWindow: o4, liveEdgeStartOffset: a3, lowLatency: i2 } = Rt2(e2);
  if (n3 === _.LIVE) {
    i2 ? (r12.config.backBufferLength = (c4 = r12.userConfig.backBufferLength) != null ? c4 : 4, r12.config.maxFragLookUpTolerance = (d4 = r12.userConfig.maxFragLookUpTolerance) != null ? d4 : 1e-3, r12.config.abrBandWidthUpFactor = (u5 = r12.userConfig.abrBandWidthUpFactor) != null ? u5 : r12.config.abrBandWidthFactor) : r12.config.backBufferLength = (s3 = r12.userConfig.backBufferLength) != null ? s3 : 8;
    let R = Object.freeze({ get length() {
      return t3.seekable.length;
    }, start(M4) {
      return t3.seekable.start(M4);
    }, end(M4) {
      var h3;
      return M4 > this.length || M4 < 0 || Number.isFinite(t3.duration) ? t3.seekable.end(M4) : (h3 = r12.liveSyncPosition) != null ? h3 : t3.seekable.end(M4);
    } });
    ((p6 = P.get(t3)) != null ? p6 : {}).seekable = R;
  }
  ((l4 = P.get(t3)) != null ? l4 : {}).liveEdgeStartOffset = a3, ((T3 = P.get(t3)) != null ? T3 : {}).targetLiveWindow = o4, t3.dispatchEvent(new CustomEvent("targetlivewindowchange", { composed: true, bubbles: true })), ((m6 = P.get(t3)) != null ? m6 : {}).streamType = n3, t3.dispatchEvent(new CustomEvent("streamtypechange", { composed: true, bubbles: true }));
};
var Oe2;
var Ue2;
var bt2 = (Ue2 = (Oe2 = globalThis == null ? void 0 : globalThis.navigator) == null ? void 0 : Oe2.userAgent) != null ? Ue2 : "";
var He2;
var Ve;
var Ke2;
var Ct2 = (Ke2 = (Ve = (He2 = globalThis == null ? void 0 : globalThis.navigator) == null ? void 0 : He2.userAgentData) == null ? void 0 : Ve.platform) != null ? Ke2 : "";
var vt2 = bt2.toLowerCase().includes("android") || ["x11", "android"].some((e2) => Ct2.toLowerCase().includes(e2));
var P = /* @__PURE__ */ new WeakMap();
var I = "mux.com";
var We;
var Ye2;
var Fe2 = (Ye2 = (We = g2).isSupported) == null ? void 0 : Ye2.call(We);
var Pt2 = vt2;
var Wr2 = () => Ed.utils.now();
var _t2 = Ed.utils.generateUUID;
var Yr2 = ({ playbackId: e2, customDomain: t3 = I, maxResolution: r12, minResolution: n3, renditionOrder: o4, programStartTime: a3, programEndTime: i2, assetStartTime: c4, assetEndTime: d4, playbackToken: u5, tokens: { playback: s3 = u5 } = {}, extraSourceParams: p6 = {} } = {}) => {
  if (!e2) return;
  let [l4, T3 = ""] = F2(e2), m6 = new URL(`https://stream.${t3}/${l4}.m3u8${T3}`);
  return s3 || m6.searchParams.has("token") ? (m6.searchParams.forEach((R, M4) => {
    M4 != "token" && m6.searchParams.delete(M4);
  }), s3 && m6.searchParams.set("token", s3)) : (r12 && m6.searchParams.set("max_resolution", r12), n3 && (m6.searchParams.set("min_resolution", n3), r12 && +r12.slice(0, -1) < +n3.slice(0, -1) && console.error("minResolution must be <= maxResolution", "minResolution", n3, "maxResolution", r12)), o4 && m6.searchParams.set("rendition_order", o4), a3 && m6.searchParams.set("program_start_time", `${a3}`), i2 && m6.searchParams.set("program_end_time", `${i2}`), c4 && m6.searchParams.set("asset_start_time", `${c4}`), d4 && m6.searchParams.set("asset_end_time", `${d4}`), Object.entries(p6).forEach(([R, M4]) => {
    M4 != null && m6.searchParams.set(R, M4);
  })), m6.toString();
};
var G = (e2) => {
  if (!e2) return;
  let [t3] = e2.split("?");
  return t3 || void 0;
};
var $e2 = (e2) => {
  if (!e2 || !e2.startsWith("https://stream.")) return;
  let [t3] = new URL(e2).pathname.slice(1).split(/\.m3u8|\//);
  return t3 || void 0;
};
var kt2 = (e2) => {
  var t3, r12, n3;
  return (t3 = e2 == null ? void 0 : e2.metadata) != null && t3.video_id ? e2.metadata.video_id : Xe2(e2) && (n3 = (r12 = G(e2.playbackId)) != null ? r12 : $e2(e2.src)) != null ? n3 : e2.src;
};
var ht2 = (e2) => {
  var t3;
  return (t3 = P.get(e2)) == null ? void 0 : t3.error;
};
var Fr2 = (e2) => {
  var t3;
  return (t3 = P.get(e2)) == null ? void 0 : t3.metadata;
};
var we = (e2) => {
  var t3, r12;
  return (r12 = (t3 = P.get(e2)) == null ? void 0 : t3.streamType) != null ? r12 : _.UNKNOWN;
};
var $r2 = (e2) => {
  var t3, r12;
  return (r12 = (t3 = P.get(e2)) == null ? void 0 : t3.targetLiveWindow) != null ? r12 : Number.NaN;
};
var Be = (e2) => {
  var t3, r12;
  return (r12 = (t3 = P.get(e2)) == null ? void 0 : t3.seekable) != null ? r12 : e2.seekable;
};
var Br2 = (e2) => {
  var n3;
  let t3 = (n3 = P.get(e2)) == null ? void 0 : n3.liveEdgeStartOffset;
  if (typeof t3 != "number") return Number.NaN;
  let r12 = Be(e2);
  return r12.length ? r12.end(r12.length - 1) - t3 : Number.NaN;
};
var le2 = 0.034;
var Lt2 = (e2, t3, r12 = le2) => Math.abs(e2 - t3) <= r12;
var je = (e2, t3, r12 = le2) => e2 > t3 || Lt2(e2, t3, r12);
var Nt2 = (e2, t3 = le2) => e2.paused && je(e2.currentTime, e2.duration, t3);
var Je2 = (e2, t3) => {
  var u5, s3, p6;
  if (!t3 || !e2.buffered.length) return;
  if (e2.readyState > 2) return false;
  let r12 = t3.currentLevel >= 0 ? (s3 = (u5 = t3.levels) == null ? void 0 : u5[t3.currentLevel]) == null ? void 0 : s3.details : (p6 = t3.levels.find((l4) => !!l4.details)) == null ? void 0 : p6.details;
  if (!r12 || r12.live) return;
  let { fragments: n3 } = r12;
  if (!(n3 != null && n3.length)) return;
  if (e2.currentTime < e2.duration - (r12.targetduration + 0.5)) return false;
  let o4 = n3[n3.length - 1];
  if (e2.currentTime <= o4.start) return false;
  let a3 = o4.start + o4.duration / 2, i2 = e2.buffered.start(e2.buffered.length - 1), c4 = e2.buffered.end(e2.buffered.length - 1);
  return a3 > i2 && a3 < c4;
};
var At2 = (e2, t3) => e2.ended || e2.loop ? e2.ended : t3 && Je2(e2, t3) ? true : Nt2(e2);
var jr2 = (e2, t3, r12) => {
  It2(t3, r12, e2);
  let { metadata: n3 = {} } = e2, { view_session_id: o4 = _t2() } = n3, a3 = kt2(e2);
  n3.view_session_id = o4, n3.video_id = a3, e2.metadata = n3;
  let i2 = (s3) => {
    var p6;
    (p6 = t3.mux) == null || p6.emit("hb", { view_drm_type: s3 });
  };
  e2.drmTypeCb = i2, P.set(t3, { retryCount: 0 });
  let c4 = St2(e2, t3), d4 = Re(e2, t3, c4);
  e2 != null && e2.muxDataKeepSession && (t3 != null && t3.mux) && !t3.mux.deleted ? c4 && t3.mux.addHLSJS({ hlsjs: c4, Hls: c4 ? g2 : void 0 }) : Kt2(e2, t3, c4), Wt2(e2, t3, c4), ke2(t3), Ae2(t3);
  let u5 = xe(e2, t3, c4);
  return { engine: c4, setAutoplay: u5, setPreload: d4 };
};
var It2 = (e2, t3, r12) => {
  let n3 = t3 == null ? void 0 : t3.engine;
  e2 != null && e2.mux && !e2.mux.deleted && (r12 != null && r12.muxDataKeepSession ? n3 && e2.mux.removeHLSJS() : (e2.mux.destroy(), delete e2.mux)), n3 && (n3.detachMedia(), n3.destroy()), e2 && (e2.hasAttribute("src") && (e2.removeAttribute("src"), e2.load()), e2.removeEventListener("error", Qe2), e2.removeEventListener("error", ce2), e2.removeEventListener("durationchange", ze2), P.delete(e2), e2.dispatchEvent(new Event("teardown")));
};
function qe(e2, t3) {
  var u5;
  let r12 = U2(e2);
  if (!(r12 === A2.M3U8)) return true;
  let o4 = !r12 || ((u5 = t3.canPlayType(r12)) != null ? u5 : true), { preferPlayback: a3 } = e2, i2 = a3 === X2.MSE, c4 = a3 === X2.NATIVE;
  return o4 && (c4 || !(Fe2 && (i2 || Pt2)));
}
var St2 = (e2, t3) => {
  let { debug: r12, streamType: n3, startTime: o4 = -1, metadata: a3, preferCmcd: i2, _hlsConfig: c4 = {} } = e2, u5 = U2(e2) === A2.M3U8, s3 = qe(e2, t3);
  if (u5 && !s3 && Fe2) {
    let p6 = { backBufferLength: 30, renderTextTracksNatively: false, liveDurationInfinity: true, capLevelToPlayerSize: true, capLevelOnFPSDrop: true }, l4 = wt2(n3), T3 = Ot2(e2), m6 = [S.QUERY, S.HEADER].includes(i2) ? { useHeaders: i2 === S.HEADER, sessionId: a3 == null ? void 0 : a3.view_session_id, contentId: a3 == null ? void 0 : a3.video_id } : void 0, R = new g2({ debug: r12, startPosition: o4, cmcd: m6, xhrSetup: (M4, h3) => {
      var y5, k4;
      if (i2 && i2 !== S.QUERY) return;
      let E4 = new URL(h3);
      if (!E4.searchParams.has("CMCD")) return;
      let b4 = ((k4 = (y5 = E4.searchParams.get("CMCD")) == null ? void 0 : y5.split(",")) != null ? k4 : []).filter((pe3) => pe3.startsWith("sid") || pe3.startsWith("cid")).join(",");
      E4.searchParams.set("CMCD", b4), M4.open("GET", E4);
    }, capLevelController: Se2, ...p6, ...l4, ...T3, ...c4 });
    return R.on(g2.Events.MANIFEST_PARSED, async function(M4, h3) {
      var b4, y5;
      let E4 = (b4 = h3.sessionData) == null ? void 0 : b4["com.apple.hls.chapters"];
      (E4 != null && E4.URI || E4 != null && E4.VALUE.toLocaleLowerCase().startsWith("http")) && de2((y5 = E4 == null ? void 0 : E4.URI) != null ? y5 : E4 == null ? void 0 : E4.VALUE, t3);
    }), R;
  }
};
var wt2 = (e2) => e2 === _.LIVE ? { backBufferLength: 8 } : {};
var Ot2 = (e2) => {
  let { tokens: { drm: t3 } = {}, playbackId: r12, drmTypeCb: n3 } = e2, o4 = G(r12);
  return !t3 || !o4 ? {} : { emeEnabled: true, drmSystems: { "com.apple.fps": { licenseUrl: q2(e2, "fairplay"), serverCertificateUrl: Ge2(e2, "fairplay") }, "com.widevine.alpha": { licenseUrl: q2(e2, "widevine") }, "com.microsoft.playready": { licenseUrl: q2(e2, "playready") } }, requestMediaKeySystemAccessFunc: (a3, i2) => (a3 === "com.widevine.alpha" && (i2 = [...i2.map((c4) => {
    var u5;
    let d4 = (u5 = c4.videoCapabilities) == null ? void 0 : u5.map((s3) => ({ ...s3, robustness: "HW_SECURE_ALL" }));
    return { ...c4, videoCapabilities: d4 };
  }), ...i2]), navigator.requestMediaKeySystemAccess(a3, i2).then((c4) => {
    let d4 = ft2(a3);
    return n3 == null || n3(d4), c4;
  })) };
};
var Ut2 = async (e2) => {
  let t3 = await fetch(e2);
  return t3.status !== 200 ? Promise.reject(t3) : await t3.arrayBuffer();
};
var Ht2 = async (e2, t3) => {
  let r12 = await fetch(t3, { method: "POST", headers: { "Content-type": "application/octet-stream" }, body: e2 });
  if (r12.status !== 200) return Promise.reject(r12);
  let n3 = await r12.arrayBuffer();
  return new Uint8Array(n3);
};
var Vt2 = (e2, t3) => {
  v(t3, "encrypted", async (n3) => {
    try {
      let o4 = n3.initDataType;
      if (o4 !== "skd") {
        console.error(`Received unexpected initialization data type "${o4}"`);
        return;
      }
      if (!t3.mediaKeys) {
        let u5 = await navigator.requestMediaKeySystemAccess("com.apple.fps", [{ initDataTypes: [o4], videoCapabilities: [{ contentType: "application/vnd.apple.mpegurl", robustness: "" }], distinctiveIdentifier: "not-allowed", persistentState: "not-allowed", sessionTypes: ["temporary"] }]).then((p6) => {
          var l4;
          return (l4 = e2.drmTypeCb) == null || l4.call(e2, J2.FAIRPLAY), p6;
        }).catch(() => {
          let p6 = x("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser."), l4 = new f(p6, f.MEDIA_ERR_ENCRYPTED, true);
          l4.errorCategory = C2.DRM, l4.muxCode = D2.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM, N(t3, l4);
        });
        if (!u5) return;
        let s3 = await u5.createMediaKeys();
        try {
          let p6 = await Ut2(Ge2(e2, "fairplay")).catch((l4) => {
            if (l4 instanceof Response) {
              let T3 = H2(l4, C2.DRM, e2);
              return console.error("mediaError", T3 == null ? void 0 : T3.message, T3 == null ? void 0 : T3.context), T3 ? Promise.reject(T3) : Promise.reject(new Error("Unexpected error in app cert request"));
            }
            return Promise.reject(l4);
          });
          await s3.setServerCertificate(p6).catch(() => {
            let l4 = x("Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate."), T3 = new f(l4, f.MEDIA_ERR_ENCRYPTED, true);
            return T3.errorCategory = C2.DRM, T3.muxCode = D2.ENCRYPTED_UPDATE_SERVER_CERT_FAILED, Promise.reject(T3);
          });
        } catch (p6) {
          N(t3, p6);
          return;
        }
        await t3.setMediaKeys(s3);
      }
      let a3 = n3.initData;
      if (a3 == null) {
        console.error(`Could not start encrypted playback due to missing initData in ${n3.type} event`);
        return;
      }
      let i2 = t3.mediaKeys.createSession();
      i2.addEventListener("keystatuseschange", () => {
        i2.keyStatuses.forEach((u5) => {
          let s3;
          if (u5 === "internal-error") {
            let p6 = x("The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser.");
            s3 = new f(p6, f.MEDIA_ERR_ENCRYPTED, true), s3.errorCategory = C2.DRM, s3.muxCode = D2.ENCRYPTED_CDM_ERROR;
          } else if (u5 === "output-restricted" || u5 === "output-downscaled") {
            let p6 = x("DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen.");
            s3 = new f(p6, f.MEDIA_ERR_ENCRYPTED, false), s3.errorCategory = C2.DRM, s3.muxCode = D2.ENCRYPTED_OUTPUT_RESTRICTED;
          }
          s3 && N(t3, s3);
        });
      });
      let c4 = await Promise.all([i2.generateRequest(o4, a3).catch(() => {
        let u5 = x("Failed to generate a DRM license request. This may be an issue with the player or your protected content."), s3 = new f(u5, f.MEDIA_ERR_ENCRYPTED, true);
        s3.errorCategory = C2.DRM, s3.muxCode = D2.ENCRYPTED_GENERATE_REQUEST_FAILED, N(t3, s3);
      }), new Promise((u5) => {
        i2.addEventListener("message", (s3) => {
          u5(s3.message);
        }, { once: true });
      })]).then(([, u5]) => u5), d4 = await Ht2(c4, q2(e2, "fairplay")).catch((u5) => {
        if (u5 instanceof Response) {
          let s3 = H2(u5, C2.DRM, e2);
          return console.error("mediaError", s3 == null ? void 0 : s3.message, s3 == null ? void 0 : s3.context), s3 ? Promise.reject(s3) : Promise.reject(new Error("Unexpected error in license key request"));
        }
        return Promise.reject(u5);
      });
      await i2.update(d4).catch(() => {
        let u5 = x("Failed to update DRM license. This may be an issue with the player or your protected content."), s3 = new f(u5, f.MEDIA_ERR_ENCRYPTED, true);
        return s3.errorCategory = C2.DRM, s3.muxCode = D2.ENCRYPTED_UPDATE_LICENSE_FAILED, Promise.reject(s3);
      });
    } catch (o4) {
      N(t3, o4);
      return;
    }
  });
};
var q2 = ({ playbackId: e2, tokens: { drm: t3 } = {}, customDomain: r12 = I }, n3) => {
  let o4 = G(e2);
  return `https://license.${r12.toLocaleLowerCase().endsWith(I) ? r12 : I}/license/${n3}/${o4}?token=${t3}`;
};
var Ge2 = ({ playbackId: e2, tokens: { drm: t3 } = {}, customDomain: r12 = I }, n3) => {
  let o4 = G(e2);
  return `https://license.${r12.toLocaleLowerCase().endsWith(I) ? r12 : I}/appcert/${n3}/${o4}?token=${t3}`;
};
var Xe2 = ({ playbackId: e2, src: t3, customDomain: r12 }) => {
  if (e2) return true;
  if (typeof t3 != "string") return false;
  let n3 = window == null ? void 0 : window.location.href, o4 = new URL(t3, n3).hostname.toLocaleLowerCase();
  return o4.includes(I) || !!r12 && o4.includes(r12.toLocaleLowerCase());
};
var Kt2 = (e2, t3, r12) => {
  var d4;
  let { envKey: n3, disableTracking: o4, muxDataSDK: a3 = Ed, muxDataSDKOptions: i2 = {} } = e2, c4 = Xe2(e2);
  if (!o4 && (n3 || c4)) {
    let { playerInitTime: u5, playerSoftwareName: s3, playerSoftwareVersion: p6, beaconCollectionDomain: l4, debug: T3, disableCookies: m6 } = e2, R = { ...e2.metadata, video_title: ((d4 = e2 == null ? void 0 : e2.metadata) == null ? void 0 : d4.video_title) || void 0 }, M4 = (h3) => typeof h3.player_error_code == "string" ? false : typeof e2.errorTranslator == "function" ? e2.errorTranslator(h3) : h3;
    a3.monitor(t3, { debug: T3, beaconCollectionDomain: l4, hlsjs: r12, Hls: r12 ? g2 : void 0, automaticErrorTracking: false, errorTranslator: M4, disableCookies: m6, ...i2, data: { ...n3 ? { env_key: n3 } : {}, player_software_name: s3, player_software: s3, player_software_version: p6, player_init_time: u5, ...R } });
  }
};
var Wt2 = (e2, t3, r12) => {
  var s3, p6;
  let n3 = qe(e2, t3), { src: o4, customDomain: a3 = I } = e2, i2 = () => {
    t3.ended || !At2(t3, r12) || (Je2(t3, r12) ? t3.currentTime = t3.buffered.end(t3.buffered.length - 1) : t3.dispatchEvent(new Event("ended")));
  }, c4, d4, u5 = () => {
    let l4 = Be(t3), T3, m6;
    l4.length > 0 && (T3 = l4.start(0), m6 = l4.end(0)), (d4 !== m6 || c4 !== T3) && t3.dispatchEvent(new CustomEvent("seekablechange", { composed: true })), c4 = T3, d4 = m6;
  };
  if (v(t3, "durationchange", u5), t3 && n3) {
    let l4 = U2(e2);
    if (typeof o4 == "string") {
      if (o4.endsWith(".mp4") && o4.includes(a3)) {
        let R = $e2(o4), M4 = new URL(`https://stream.${a3}/${R}/metadata.json`);
        de2(M4.toString(), t3);
      }
      let T3 = () => {
        if (we(t3) !== _.LIVE || Number.isFinite(t3.duration)) return;
        let R = setInterval(u5, 1e3);
        t3.addEventListener("teardown", () => {
          clearInterval(R);
        }, { once: true }), v(t3, "durationchange", () => {
          Number.isFinite(t3.duration) && clearInterval(R);
        });
      }, m6 = async () => xt2(o4, t3, l4).then(T3).catch((R) => {
        if (R instanceof Response) {
          let M4 = H2(R, C2.VIDEO, e2);
          if (M4) {
            N(t3, M4);
            return;
          }
        } else R instanceof Error;
      });
      if (t3.preload === "none") {
        let R = () => {
          m6(), t3.removeEventListener("loadedmetadata", M4);
        }, M4 = () => {
          m6(), t3.removeEventListener("play", R);
        };
        v(t3, "play", R, { once: true }), v(t3, "loadedmetadata", M4, { once: true });
      } else m6();
      (s3 = e2.tokens) != null && s3.drm ? Vt2(e2, t3) : v(t3, "encrypted", () => {
        let R = x("Attempting to play DRM-protected content without providing a DRM token."), M4 = new f(R, f.MEDIA_ERR_ENCRYPTED, true);
        M4.errorCategory = C2.DRM, M4.muxCode = D2.ENCRYPTED_MISSING_TOKEN, N(t3, M4);
      }, { once: true }), t3.setAttribute("src", o4), e2.startTime && (((p6 = P.get(t3)) != null ? p6 : {}).startTime = e2.startTime, t3.addEventListener("durationchange", ze2, { once: true }));
    } else t3.removeAttribute("src");
    t3.addEventListener("error", Qe2), t3.addEventListener("error", ce2), t3.addEventListener("emptied", () => {
      t3.querySelectorAll("track[data-removeondestroy]").forEach((m6) => {
        m6.remove();
      });
    }, { once: true }), v(t3, "pause", i2), v(t3, "seeked", i2), v(t3, "play", () => {
      t3.ended || je(t3.currentTime, t3.duration) && (t3.currentTime = t3.seekable.length ? t3.seekable.start(0) : 0);
    });
  } else r12 && o4 ? (r12.once(g2.Events.LEVEL_LOADED, (l4, T3) => {
    Dt2(T3.details, t3, r12), u5(), we(t3) === _.LIVE && !Number.isFinite(t3.duration) && (r12.on(g2.Events.LEVEL_UPDATED, u5), v(t3, "durationchange", () => {
      Number.isFinite(t3.duration) && r12.off(g2.Events.LEVELS_UPDATED, u5);
    }));
  }), r12.on(g2.Events.ERROR, (l4, T3) => {
    var R, M4;
    let m6 = Yt2(T3, e2);
    if (m6.muxCode === D2.NETWORK_NOT_READY) {
      let E4 = (R = P.get(t3)) != null ? R : {}, b4 = (M4 = E4.retryCount) != null ? M4 : 0;
      if (b4 < 6) {
        let y5 = b4 === 0 ? 5e3 : 6e4, k4 = new f(`Retrying in ${y5 / 1e3} seconds...`, m6.code, m6.fatal);
        Object.assign(k4, m6), N(t3, k4), setTimeout(() => {
          E4.retryCount = b4 + 1, T3.details === "manifestLoadError" && T3.url && r12.loadSource(T3.url);
        }, y5);
        return;
      } else {
        E4.retryCount = 0;
        let y5 = new f('Try again later or <a href="#" onclick="window.location.reload(); return false;" style="color: #4a90e2;">click here to retry</a>', m6.code, m6.fatal);
        Object.assign(y5, m6), N(t3, y5);
        return;
      }
    }
    N(t3, m6);
  }), r12.on(g2.Events.MANIFEST_LOADED, () => {
    let l4 = P.get(t3);
    l4 && l4.error && (l4.error = null, l4.retryCount = 0, t3.dispatchEvent(new Event("emptied")), t3.dispatchEvent(new Event("loadstart")));
  }), t3.addEventListener("error", ce2), v(t3, "waiting", i2), De2(e2, r12), be2(t3, r12), r12.attachMedia(t3)) : console.error("It looks like the video you're trying to play will not work on this system! If possible, try upgrading to the newest versions of your browser or software.");
};
function ze2(e2) {
  var n3;
  let t3 = e2.target, r12 = (n3 = P.get(t3)) == null ? void 0 : n3.startTime;
  if (r12 && fe2(t3.seekable, t3.duration, r12)) {
    let o4 = t3.preload === "auto";
    o4 && (t3.preload = "none"), t3.currentTime = r12, o4 && (t3.preload = "auto");
  }
}
async function Qe2(e2) {
  if (!e2.isTrusted) return;
  e2.stopImmediatePropagation();
  let t3 = e2.target;
  if (!(t3 != null && t3.error)) return;
  let { message: r12, code: n3 } = t3.error, o4 = new f(r12, n3);
  if (t3.src && n3 === f.MEDIA_ERR_SRC_NOT_SUPPORTED && t3.readyState === HTMLMediaElement.HAVE_NOTHING) {
    setTimeout(() => {
      var i2;
      let a3 = (i2 = ht2(t3)) != null ? i2 : t3.error;
      (a3 == null ? void 0 : a3.code) === f.MEDIA_ERR_SRC_NOT_SUPPORTED && N(t3, o4);
    }, 500);
    return;
  }
  if (t3.src && (n3 !== f.MEDIA_ERR_DECODE || n3 !== void 0)) try {
    let { status: a3 } = await fetch(t3.src);
    o4.data = { response: { code: a3 } };
  } catch {
  }
  N(t3, o4);
}
function N(e2, t3) {
  var r12;
  t3.fatal && (((r12 = P.get(e2)) != null ? r12 : {}).error = t3, e2.dispatchEvent(new CustomEvent("error", { detail: t3 })));
}
function ce2(e2) {
  var n3, o4;
  if (!(e2 instanceof CustomEvent) || !(e2.detail instanceof f)) return;
  let t3 = e2.target, r12 = e2.detail;
  !r12 || !r12.fatal || (((n3 = P.get(t3)) != null ? n3 : {}).error = r12, (o4 = t3.mux) == null || o4.emit("error", { player_error_code: r12.code, player_error_message: r12.message, player_error_context: r12.context }));
}
var Yt2 = (e2, t3) => {
  var c4, d4, u5;
  console.error("getErrorFromHlsErrorData()", e2);
  let r12 = { [g2.ErrorTypes.NETWORK_ERROR]: f.MEDIA_ERR_NETWORK, [g2.ErrorTypes.MEDIA_ERROR]: f.MEDIA_ERR_DECODE, [g2.ErrorTypes.KEY_SYSTEM_ERROR]: f.MEDIA_ERR_ENCRYPTED }, n3 = (s3) => [g2.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED, g2.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED].includes(s3.details) ? f.MEDIA_ERR_NETWORK : r12[s3.type], o4 = (s3) => {
    if (s3.type === g2.ErrorTypes.KEY_SYSTEM_ERROR) return C2.DRM;
    if (s3.type === g2.ErrorTypes.NETWORK_ERROR) return C2.VIDEO;
  }, a3, i2 = n3(e2);
  if (i2 === f.MEDIA_ERR_NETWORK && e2.response) {
    let s3 = (c4 = o4(e2)) != null ? c4 : C2.VIDEO;
    a3 = (d4 = H2(e2.response, s3, t3, e2.fatal)) != null ? d4 : new f("", i2, e2.fatal);
  } else if (i2 === f.MEDIA_ERR_ENCRYPTED) if (e2.details === g2.ErrorDetails.KEY_SYSTEM_NO_CONFIGURED_LICENSE) {
    let s3 = x("Attempting to play DRM-protected content without providing a DRM token.");
    a3 = new f(s3, f.MEDIA_ERR_ENCRYPTED, e2.fatal), a3.errorCategory = C2.DRM, a3.muxCode = D2.ENCRYPTED_MISSING_TOKEN;
  } else if (e2.details === g2.ErrorDetails.KEY_SYSTEM_NO_ACCESS) {
    let s3 = x("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser.");
    a3 = new f(s3, f.MEDIA_ERR_ENCRYPTED, e2.fatal), a3.errorCategory = C2.DRM, a3.muxCode = D2.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM;
  } else if (e2.details === g2.ErrorDetails.KEY_SYSTEM_NO_SESSION) {
    let s3 = x("Failed to generate a DRM license request. This may be an issue with the player or your protected content.");
    a3 = new f(s3, f.MEDIA_ERR_ENCRYPTED, true), a3.errorCategory = C2.DRM, a3.muxCode = D2.ENCRYPTED_GENERATE_REQUEST_FAILED;
  } else if (e2.details === g2.ErrorDetails.KEY_SYSTEM_SESSION_UPDATE_FAILED) {
    let s3 = x("Failed to update DRM license. This may be an issue with the player or your protected content.");
    a3 = new f(s3, f.MEDIA_ERR_ENCRYPTED, e2.fatal), a3.errorCategory = C2.DRM, a3.muxCode = D2.ENCRYPTED_UPDATE_LICENSE_FAILED;
  } else if (e2.details === g2.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED) {
    let s3 = x("Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate.");
    a3 = new f(s3, f.MEDIA_ERR_ENCRYPTED, e2.fatal), a3.errorCategory = C2.DRM, a3.muxCode = D2.ENCRYPTED_UPDATE_SERVER_CERT_FAILED;
  } else if (e2.details === g2.ErrorDetails.KEY_SYSTEM_STATUS_INTERNAL_ERROR) {
    let s3 = x("The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser.");
    a3 = new f(s3, f.MEDIA_ERR_ENCRYPTED, e2.fatal), a3.errorCategory = C2.DRM, a3.muxCode = D2.ENCRYPTED_CDM_ERROR;
  } else if (e2.details === g2.ErrorDetails.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED) {
    let s3 = x("DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen.");
    a3 = new f(s3, f.MEDIA_ERR_ENCRYPTED, false), a3.errorCategory = C2.DRM, a3.muxCode = D2.ENCRYPTED_OUTPUT_RESTRICTED;
  } else a3 = new f(e2.error.message, f.MEDIA_ERR_ENCRYPTED, e2.fatal), a3.errorCategory = C2.DRM, a3.muxCode = D2.ENCRYPTED_ERROR;
  else a3 = new f("", i2, e2.fatal);
  return a3.context || (a3.context = `${e2.url ? `url: ${e2.url}
` : ""}${e2.response && (e2.response.code || e2.response.text) ? `response: ${e2.response.code}, ${e2.response.text}
` : ""}${e2.reason ? `failure reason: ${e2.reason}
` : ""}${e2.level ? `level: ${e2.level}
` : ""}${e2.parent ? `parent stream controller: ${e2.parent}
` : ""}${e2.buffer ? `buffer length: ${e2.buffer}
` : ""}${e2.error ? `error: ${e2.error}
` : ""}${e2.event ? `event: ${e2.event}
` : ""}${e2.err ? `error message: ${(u5 = e2.err) == null ? void 0 : u5.message}
` : ""}`), a3.data = e2, a3;
};

// node_modules/@mux/mux-video/dist/base.mjs
var C3 = (s3) => {
  throw TypeError(s3);
};
var S2 = (s3, a3, t3) => a3.has(s3) || C3("Cannot " + t3);
var n = (s3, a3, t3) => (S2(s3, a3, "read from private field"), t3 ? t3.call(s3) : a3.get(s3));
var u = (s3, a3, t3) => a3.has(s3) ? C3("Cannot add the same private member more than once") : a3 instanceof WeakSet ? a3.add(s3) : a3.set(s3, t3);
var o = (s3, a3, t3, i2) => (S2(s3, a3, "write to private field"), i2 ? i2.call(s3, t3) : a3.set(s3, t3), t3);
var M = (s3, a3, t3) => (S2(s3, a3, "access private method"), t3);
var Y3 = () => {
  try {
    return "0.26.1";
  } catch {
  }
  return "UNKNOWN";
};
var B3 = Y3();
var P2 = () => B3;
var k = `
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" part="logo" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" viewBox="0 0 1600 500"><g fill="#fff"><path d="M994.287 93.486c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m0-93.486c-34.509 0-62.484 27.976-62.484 62.486v187.511c0 68.943-56.09 125.033-125.032 125.033s-125.03-56.09-125.03-125.033V62.486C681.741 27.976 653.765 0 619.256 0s-62.484 27.976-62.484 62.486v187.511C556.772 387.85 668.921 500 806.771 500c137.851 0 250.001-112.15 250.001-250.003V62.486c0-34.51-27.976-62.486-62.485-62.486M1537.51 468.511c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m-275.883-218.509-143.33 143.329c-24.402 24.402-24.402 63.966 0 88.368 24.402 24.402 63.967 24.402 88.369 0l143.33-143.329 143.328 143.329c24.402 24.4 63.967 24.402 88.369 0 24.403-24.402 24.403-63.966.001-88.368l-143.33-143.329.001-.004 143.329-143.329c24.402-24.402 24.402-63.965 0-88.367s-63.967-24.402-88.369 0L1349.996 161.63 1206.667 18.302c-24.402-24.401-63.967-24.402-88.369 0s-24.402 63.965 0 88.367l143.329 143.329v.004ZM437.511 468.521c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31M461.426 4.759C438.078-4.913 411.2.432 393.33 18.303L249.999 161.632 106.669 18.303C88.798.432 61.922-4.913 38.573 4.759 15.224 14.43-.001 37.214-.001 62.488v375.026c0 34.51 27.977 62.486 62.487 62.486 34.51 0 62.486-27.976 62.486-62.486V213.341l80.843 80.844c24.404 24.402 63.965 24.402 88.369 0l80.843-80.844v224.173c0 34.51 27.976 62.486 62.486 62.486s62.486-27.976 62.486-62.486V62.488c0-25.274-15.224-48.058-38.573-57.729" style="fill-rule:nonzero"/></g></svg>`;
var e = { BEACON_COLLECTION_DOMAIN: "beacon-collection-domain", CUSTOM_DOMAIN: "custom-domain", DEBUG: "debug", DISABLE_TRACKING: "disable-tracking", DISABLE_COOKIES: "disable-cookies", DRM_TOKEN: "drm-token", PLAYBACK_TOKEN: "playback-token", ENV_KEY: "env-key", MAX_RESOLUTION: "max-resolution", MIN_RESOLUTION: "min-resolution", RENDITION_ORDER: "rendition-order", PROGRAM_START_TIME: "program-start-time", PROGRAM_END_TIME: "program-end-time", ASSET_START_TIME: "asset-start-time", ASSET_END_TIME: "asset-end-time", METADATA_URL: "metadata-url", PLAYBACK_ID: "playback-id", PLAYER_SOFTWARE_NAME: "player-software-name", PLAYER_SOFTWARE_VERSION: "player-software-version", PLAYER_INIT_TIME: "player-init-time", PREFER_CMCD: "prefer-cmcd", PREFER_PLAYBACK: "prefer-playback", START_TIME: "start-time", STREAM_TYPE: "stream-type", TARGET_LIVE_WINDOW: "target-live-window", LIVE_EDGE_OFFSET: "live-edge-offset", TYPE: "type", LOGO: "logo" };
var at2 = Object.values(e);
var v2 = P2();
var x2 = "mux-video";
var l2;
var f2;
var c;
var A3;
var b;
var T;
var p;
var _2;
var O3;
var g3;
var m;
var y;
var K2 = class extends CustomVideoElement {
  constructor() {
    super();
    u(this, m);
    u(this, l2);
    u(this, f2);
    u(this, c);
    u(this, A3, {});
    u(this, b, {});
    u(this, T);
    u(this, p);
    u(this, _2);
    u(this, O3);
    u(this, g3, "");
    o(this, c, Wr2()), this.nativeEl.addEventListener("muxmetadata", (t3) => {
      var d4;
      let i2 = Fr2(this.nativeEl), r12 = (d4 = this.metadata) != null ? d4 : {};
      this.metadata = { ...i2, ...r12 }, (i2 == null ? void 0 : i2["com.mux.video.branding"]) === "mux-free-plan" && (o(this, g3, "default"), this.updateLogo());
    });
  }
  static get NAME() {
    return x2;
  }
  static get VERSION() {
    return v2;
  }
  static get observedAttributes() {
    var t3;
    return [...at2, ...(t3 = CustomVideoElement.observedAttributes) != null ? t3 : []];
  }
  static getLogoHTML(t3) {
    return !t3 || t3 === "false" ? "" : t3 === "default" ? k : `<img part="logo" src="${t3}" />`;
  }
  static getTemplateHTML(t3 = {}) {
    var i2;
    return `
      ${CustomVideoElement.getTemplateHTML(t3)}
      <style>
        :host {
          position: relative;
        }
        slot[name="logo"] {
          display: flex;
          justify-content: end;
          position: absolute;
          top: 1rem;
          right: 1rem;
          opacity: 0;
          transition: opacity 0.25s ease-in-out;
          z-index: 1;
        }
        slot[name="logo"]:has([part="logo"]) {
          opacity: 1;
        }
        slot[name="logo"] [part="logo"] {
          width: 5rem;
          pointer-events: none;
          user-select: none;
        }
      </style>
      <slot name="logo">
        ${this.getLogoHTML((i2 = t3[e.LOGO]) != null ? i2 : "")}
      </slot>
    `;
  }
  get preferCmcd() {
    var t3;
    return (t3 = this.getAttribute(e.PREFER_CMCD)) != null ? t3 : void 0;
  }
  set preferCmcd(t3) {
    t3 !== this.preferCmcd && (t3 ? jt2.includes(t3) ? this.setAttribute(e.PREFER_CMCD, t3) : console.warn(`Invalid value for preferCmcd. Must be one of ${jt2.join()}`) : this.removeAttribute(e.PREFER_CMCD));
  }
  get playerInitTime() {
    return this.hasAttribute(e.PLAYER_INIT_TIME) ? +this.getAttribute(e.PLAYER_INIT_TIME) : n(this, c);
  }
  set playerInitTime(t3) {
    t3 != this.playerInitTime && (t3 == null ? this.removeAttribute(e.PLAYER_INIT_TIME) : this.setAttribute(e.PLAYER_INIT_TIME, `${+t3}`));
  }
  get playerSoftwareName() {
    var t3;
    return (t3 = n(this, _2)) != null ? t3 : x2;
  }
  set playerSoftwareName(t3) {
    o(this, _2, t3);
  }
  get playerSoftwareVersion() {
    var t3;
    return (t3 = n(this, p)) != null ? t3 : v2;
  }
  set playerSoftwareVersion(t3) {
    o(this, p, t3);
  }
  get _hls() {
    var t3;
    return (t3 = n(this, l2)) == null ? void 0 : t3.engine;
  }
  get mux() {
    var t3;
    return (t3 = this.nativeEl) == null ? void 0 : t3.mux;
  }
  get error() {
    var t3;
    return (t3 = ht2(this.nativeEl)) != null ? t3 : null;
  }
  get errorTranslator() {
    return n(this, O3);
  }
  set errorTranslator(t3) {
    o(this, O3, t3);
  }
  get src() {
    return this.getAttribute("src");
  }
  set src(t3) {
    t3 !== this.src && (t3 == null ? this.removeAttribute("src") : this.setAttribute("src", t3));
  }
  get type() {
    var t3;
    return (t3 = this.getAttribute(e.TYPE)) != null ? t3 : void 0;
  }
  set type(t3) {
    t3 !== this.type && (t3 ? this.setAttribute(e.TYPE, t3) : this.removeAttribute(e.TYPE));
  }
  get preload() {
    let t3 = this.getAttribute("preload");
    return t3 === "" ? "auto" : ["none", "metadata", "auto"].includes(t3) ? t3 : super.preload;
  }
  set preload(t3) {
    t3 != this.getAttribute("preload") && (["", "none", "metadata", "auto"].includes(t3) ? this.setAttribute("preload", t3) : this.removeAttribute("preload"));
  }
  get debug() {
    return this.getAttribute(e.DEBUG) != null;
  }
  set debug(t3) {
    t3 !== this.debug && (t3 ? this.setAttribute(e.DEBUG, "") : this.removeAttribute(e.DEBUG));
  }
  get disableTracking() {
    return this.hasAttribute(e.DISABLE_TRACKING);
  }
  set disableTracking(t3) {
    t3 !== this.disableTracking && this.toggleAttribute(e.DISABLE_TRACKING, !!t3);
  }
  get disableCookies() {
    return this.hasAttribute(e.DISABLE_COOKIES);
  }
  set disableCookies(t3) {
    t3 !== this.disableCookies && (t3 ? this.setAttribute(e.DISABLE_COOKIES, "") : this.removeAttribute(e.DISABLE_COOKIES));
  }
  get startTime() {
    let t3 = this.getAttribute(e.START_TIME);
    if (t3 == null) return;
    let i2 = +t3;
    return Number.isNaN(i2) ? void 0 : i2;
  }
  set startTime(t3) {
    t3 !== this.startTime && (t3 == null ? this.removeAttribute(e.START_TIME) : this.setAttribute(e.START_TIME, `${t3}`));
  }
  get playbackId() {
    var t3;
    return this.hasAttribute(e.PLAYBACK_ID) ? this.getAttribute(e.PLAYBACK_ID) : (t3 = $e2(this.src)) != null ? t3 : void 0;
  }
  set playbackId(t3) {
    t3 !== this.playbackId && (t3 ? this.setAttribute(e.PLAYBACK_ID, t3) : this.removeAttribute(e.PLAYBACK_ID));
  }
  get maxResolution() {
    var t3;
    return (t3 = this.getAttribute(e.MAX_RESOLUTION)) != null ? t3 : void 0;
  }
  set maxResolution(t3) {
    t3 !== this.maxResolution && (t3 ? this.setAttribute(e.MAX_RESOLUTION, t3) : this.removeAttribute(e.MAX_RESOLUTION));
  }
  get minResolution() {
    var t3;
    return (t3 = this.getAttribute(e.MIN_RESOLUTION)) != null ? t3 : void 0;
  }
  set minResolution(t3) {
    t3 !== this.minResolution && (t3 ? this.setAttribute(e.MIN_RESOLUTION, t3) : this.removeAttribute(e.MIN_RESOLUTION));
  }
  get renditionOrder() {
    var t3;
    return (t3 = this.getAttribute(e.RENDITION_ORDER)) != null ? t3 : void 0;
  }
  set renditionOrder(t3) {
    t3 !== this.renditionOrder && (t3 ? this.setAttribute(e.RENDITION_ORDER, t3) : this.removeAttribute(e.RENDITION_ORDER));
  }
  get programStartTime() {
    let t3 = this.getAttribute(e.PROGRAM_START_TIME);
    if (t3 == null) return;
    let i2 = +t3;
    return Number.isNaN(i2) ? void 0 : i2;
  }
  set programStartTime(t3) {
    t3 == null ? this.removeAttribute(e.PROGRAM_START_TIME) : this.setAttribute(e.PROGRAM_START_TIME, `${t3}`);
  }
  get programEndTime() {
    let t3 = this.getAttribute(e.PROGRAM_END_TIME);
    if (t3 == null) return;
    let i2 = +t3;
    return Number.isNaN(i2) ? void 0 : i2;
  }
  set programEndTime(t3) {
    t3 == null ? this.removeAttribute(e.PROGRAM_END_TIME) : this.setAttribute(e.PROGRAM_END_TIME, `${t3}`);
  }
  get assetStartTime() {
    let t3 = this.getAttribute(e.ASSET_START_TIME);
    if (t3 == null) return;
    let i2 = +t3;
    return Number.isNaN(i2) ? void 0 : i2;
  }
  set assetStartTime(t3) {
    t3 == null ? this.removeAttribute(e.ASSET_START_TIME) : this.setAttribute(e.ASSET_START_TIME, `${t3}`);
  }
  get assetEndTime() {
    let t3 = this.getAttribute(e.ASSET_END_TIME);
    if (t3 == null) return;
    let i2 = +t3;
    return Number.isNaN(i2) ? void 0 : i2;
  }
  set assetEndTime(t3) {
    t3 == null ? this.removeAttribute(e.ASSET_END_TIME) : this.setAttribute(e.ASSET_END_TIME, `${t3}`);
  }
  get customDomain() {
    var t3;
    return (t3 = this.getAttribute(e.CUSTOM_DOMAIN)) != null ? t3 : void 0;
  }
  set customDomain(t3) {
    t3 !== this.customDomain && (t3 ? this.setAttribute(e.CUSTOM_DOMAIN, t3) : this.removeAttribute(e.CUSTOM_DOMAIN));
  }
  get drmToken() {
    var t3;
    return (t3 = this.getAttribute(e.DRM_TOKEN)) != null ? t3 : void 0;
  }
  set drmToken(t3) {
    t3 !== this.drmToken && (t3 ? this.setAttribute(e.DRM_TOKEN, t3) : this.removeAttribute(e.DRM_TOKEN));
  }
  get playbackToken() {
    var t3, i2, r12, d4;
    if (this.hasAttribute(e.PLAYBACK_TOKEN)) return (t3 = this.getAttribute(e.PLAYBACK_TOKEN)) != null ? t3 : void 0;
    if (this.hasAttribute(e.PLAYBACK_ID)) {
      let [, E4] = F2((i2 = this.playbackId) != null ? i2 : "");
      return (r12 = new URLSearchParams(E4).get("token")) != null ? r12 : void 0;
    }
    if (this.src) return (d4 = new URLSearchParams(this.src).get("token")) != null ? d4 : void 0;
  }
  set playbackToken(t3) {
    t3 !== this.playbackToken && (t3 ? this.setAttribute(e.PLAYBACK_TOKEN, t3) : this.removeAttribute(e.PLAYBACK_TOKEN));
  }
  get tokens() {
    let t3 = this.getAttribute(e.PLAYBACK_TOKEN), i2 = this.getAttribute(e.DRM_TOKEN);
    return { ...n(this, b), ...t3 != null ? { playback: t3 } : {}, ...i2 != null ? { drm: i2 } : {} };
  }
  set tokens(t3) {
    o(this, b, t3 != null ? t3 : {});
  }
  get ended() {
    return At2(this.nativeEl, this._hls);
  }
  get envKey() {
    var t3;
    return (t3 = this.getAttribute(e.ENV_KEY)) != null ? t3 : void 0;
  }
  set envKey(t3) {
    t3 !== this.envKey && (t3 ? this.setAttribute(e.ENV_KEY, t3) : this.removeAttribute(e.ENV_KEY));
  }
  get beaconCollectionDomain() {
    var t3;
    return (t3 = this.getAttribute(e.BEACON_COLLECTION_DOMAIN)) != null ? t3 : void 0;
  }
  set beaconCollectionDomain(t3) {
    t3 !== this.beaconCollectionDomain && (t3 ? this.setAttribute(e.BEACON_COLLECTION_DOMAIN, t3) : this.removeAttribute(e.BEACON_COLLECTION_DOMAIN));
  }
  get streamType() {
    var t3;
    return (t3 = this.getAttribute(e.STREAM_TYPE)) != null ? t3 : we(this.nativeEl);
  }
  set streamType(t3) {
    t3 !== this.streamType && (t3 ? this.setAttribute(e.STREAM_TYPE, t3) : this.removeAttribute(e.STREAM_TYPE));
  }
  get targetLiveWindow() {
    return this.hasAttribute(e.TARGET_LIVE_WINDOW) ? +this.getAttribute(e.TARGET_LIVE_WINDOW) : $r2(this.nativeEl);
  }
  set targetLiveWindow(t3) {
    t3 != this.targetLiveWindow && (t3 == null ? this.removeAttribute(e.TARGET_LIVE_WINDOW) : this.setAttribute(e.TARGET_LIVE_WINDOW, `${+t3}`));
  }
  get liveEdgeStart() {
    var t3, i2;
    if (this.hasAttribute(e.LIVE_EDGE_OFFSET)) {
      let { liveEdgeOffset: r12 } = this, d4 = (t3 = this.nativeEl.seekable.end(0)) != null ? t3 : 0, E4 = (i2 = this.nativeEl.seekable.start(0)) != null ? i2 : 0;
      return Math.max(E4, d4 - r12);
    }
    return Br2(this.nativeEl);
  }
  get liveEdgeOffset() {
    if (this.hasAttribute(e.LIVE_EDGE_OFFSET)) return +this.getAttribute(e.LIVE_EDGE_OFFSET);
  }
  set liveEdgeOffset(t3) {
    t3 != this.liveEdgeOffset && (t3 == null ? this.removeAttribute(e.LIVE_EDGE_OFFSET) : this.setAttribute(e.LIVE_EDGE_OFFSET, `${+t3}`));
  }
  get seekable() {
    return Be(this.nativeEl);
  }
  async addCuePoints(t3) {
    return Pe2(this.nativeEl, t3);
  }
  get activeCuePoint() {
    return _e2(this.nativeEl);
  }
  get cuePoints() {
    return it(this.nativeEl);
  }
  async addChapters(t3) {
    return Le2(this.nativeEl, t3);
  }
  get activeChapter() {
    return Ne2(this.nativeEl);
  }
  get chapters() {
    return ct2(this.nativeEl);
  }
  getStartDate() {
    return ut2(this.nativeEl, this._hls);
  }
  get currentPdt() {
    return dt2(this.nativeEl, this._hls);
  }
  get preferPlayback() {
    let t3 = this.getAttribute(e.PREFER_PLAYBACK);
    if (t3 === X2.MSE || t3 === X2.NATIVE) return t3;
  }
  set preferPlayback(t3) {
    t3 !== this.preferPlayback && (t3 === X2.MSE || t3 === X2.NATIVE ? this.setAttribute(e.PREFER_PLAYBACK, t3) : this.removeAttribute(e.PREFER_PLAYBACK));
  }
  get metadata() {
    return { ...this.getAttributeNames().filter((i2) => i2.startsWith("metadata-") && ![e.METADATA_URL].includes(i2)).reduce((i2, r12) => {
      let d4 = this.getAttribute(r12);
      return d4 != null && (i2[r12.replace(/^metadata-/, "").replace(/-/g, "_")] = d4), i2;
    }, {}), ...n(this, A3) };
  }
  set metadata(t3) {
    o(this, A3, t3 != null ? t3 : {}), this.mux && this.mux.emit("hb", n(this, A3));
  }
  get _hlsConfig() {
    return n(this, T);
  }
  set _hlsConfig(t3) {
    o(this, T, t3);
  }
  get logo() {
    var t3;
    return (t3 = this.getAttribute(e.LOGO)) != null ? t3 : n(this, g3);
  }
  set logo(t3) {
    t3 ? this.setAttribute(e.LOGO, t3) : this.removeAttribute(e.LOGO);
  }
  load() {
    o(this, l2, jr2(this, this.nativeEl, n(this, l2)));
  }
  unload() {
    It2(this.nativeEl, n(this, l2), this), o(this, l2, void 0);
  }
  attributeChangedCallback(t3, i2, r12) {
    var E4, L4;
    switch (CustomVideoElement.observedAttributes.includes(t3) && !["src", "autoplay", "preload"].includes(t3) && super.attributeChangedCallback(t3, i2, r12), t3) {
      case e.PLAYER_SOFTWARE_NAME:
        this.playerSoftwareName = r12 != null ? r12 : void 0;
        break;
      case e.PLAYER_SOFTWARE_VERSION:
        this.playerSoftwareVersion = r12 != null ? r12 : void 0;
        break;
      case "src": {
        let h3 = !!i2, N3 = !!r12;
        !h3 && N3 ? M(this, m, y).call(this) : h3 && !N3 ? this.unload() : h3 && N3 && (this.unload(), M(this, m, y).call(this));
        break;
      }
      case "autoplay":
        if (r12 === i2) break;
        (E4 = n(this, l2)) == null || E4.setAutoplay(this.autoplay);
        break;
      case "preload":
        if (r12 === i2) break;
        (L4 = n(this, l2)) == null || L4.setPreload(r12);
        break;
      case e.PLAYBACK_ID:
        this.src = Yr2(this);
        break;
      case e.DEBUG: {
        let h3 = this.debug;
        this.mux && console.info("Cannot toggle debug mode of mux data after initialization. Make sure you set all metadata to override before setting the src."), this._hls && (this._hls.config.debug = h3);
        break;
      }
      case e.METADATA_URL:
        r12 && fetch(r12).then((h3) => h3.json()).then((h3) => this.metadata = h3).catch(() => console.error(`Unable to load or parse metadata JSON from metadata-url ${r12}!`));
        break;
      case e.STREAM_TYPE:
        (r12 == null || r12 !== i2) && this.dispatchEvent(new CustomEvent("streamtypechange", { composed: true, bubbles: true }));
        break;
      case e.TARGET_LIVE_WINDOW:
        (r12 == null || r12 !== i2) && this.dispatchEvent(new CustomEvent("targetlivewindowchange", { composed: true, bubbles: true, detail: this.targetLiveWindow }));
        break;
      case e.LOGO:
        (r12 == null || r12 !== i2) && this.updateLogo();
        break;
    }
  }
  updateLogo() {
    if (!this.shadowRoot) return;
    let t3 = this.shadowRoot.querySelector('slot[name="logo"]');
    if (!t3) return;
    let i2 = this.constructor.getLogoHTML(n(this, g3) || this.logo);
    t3.innerHTML = i2;
  }
  connectedCallback() {
    var t3;
    (t3 = super.connectedCallback) == null || t3.call(this), this.nativeEl && this.src && !n(this, l2) && M(this, m, y).call(this);
  }
  disconnectedCallback() {
    this.unload();
  }
  handleEvent(t3) {
    t3.target === this.nativeEl && this.dispatchEvent(new CustomEvent(t3.type, { composed: true, detail: t3.detail }));
  }
};
l2 = /* @__PURE__ */ new WeakMap(), f2 = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), A3 = /* @__PURE__ */ new WeakMap(), b = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakMap(), p = /* @__PURE__ */ new WeakMap(), _2 = /* @__PURE__ */ new WeakMap(), O3 = /* @__PURE__ */ new WeakMap(), g3 = /* @__PURE__ */ new WeakMap(), m = /* @__PURE__ */ new WeakSet(), y = async function() {
  n(this, f2) || (await o(this, f2, Promise.resolve()), o(this, f2, null), this.load());
};

// node_modules/castable-video/castable-utils.js
var privateProps = /* @__PURE__ */ new WeakMap();
var InvalidStateError = class extends Error {
};
var NotSupportedError = class extends Error {
};
var HLS_RESPONSE_HEADERS = ["application/x-mpegURL", "application/vnd.apple.mpegurl", "audio/mpegurl"];
var IterableWeakSet = globalThis.WeakRef ? class extends Set {
  add(el) {
    super.add(new WeakRef(el));
  }
  forEach(fn) {
    super.forEach((ref) => {
      const value = ref.deref();
      if (value) fn(value);
    });
  }
} : Set;
function onCastApiAvailable(callback) {
  var _a4, _b, _c;
  if (!((_b = (_a4 = globalThis.chrome) == null ? void 0 : _a4.cast) == null ? void 0 : _b.isAvailable)) {
    globalThis.__onGCastApiAvailable = () => {
      customElements.whenDefined("google-cast-button").then(callback);
    };
  } else if (!((_c = globalThis.cast) == null ? void 0 : _c.framework)) {
    customElements.whenDefined("google-cast-button").then(callback);
  } else {
    callback();
  }
}
function requiresCastFramework() {
  return globalThis.chrome;
}
function loadCastFramework() {
  var _a4;
  const sdkUrl = "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";
  if (((_a4 = globalThis.chrome) == null ? void 0 : _a4.cast) || document.querySelector(`script[src="${sdkUrl}"]`)) return;
  const script = document.createElement("script");
  script.src = sdkUrl;
  document.head.append(script);
}
function castContext() {
  var _a4, _b;
  return (_b = (_a4 = globalThis.cast) == null ? void 0 : _a4.framework) == null ? void 0 : _b.CastContext.getInstance();
}
function currentSession() {
  var _a4;
  return (_a4 = castContext()) == null ? void 0 : _a4.getCurrentSession();
}
function currentMedia() {
  var _a4;
  return (_a4 = currentSession()) == null ? void 0 : _a4.getSessionObj().media[0];
}
function editTracksInfo(request2) {
  return new Promise((resolve, reject) => {
    currentMedia().editTracksInfo(request2, resolve, reject);
  });
}
function getMediaStatus(request2) {
  return new Promise((resolve, reject) => {
    currentMedia().getStatus(request2, resolve, reject);
  });
}
function setCastOptions(options) {
  return castContext().setOptions({
    ...getDefaultCastOptions(),
    ...options
  });
}
function getDefaultCastOptions() {
  return {
    // Set the receiver application ID to your own (created in the
    // Google Cast Developer Console), or optionally
    // use the chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
    receiverApplicationId: "CC1AD845",
    // Auto join policy can be one of the following three:
    // ORIGIN_SCOPED - Auto connect from same appId and page origin
    // TAB_AND_ORIGIN_SCOPED - Auto connect from same appId, page origin, and tab
    // PAGE_SCOPED - No auto connect
    autoJoinPolicy: "origin_scoped",
    // The following flag enables Cast Connect(requires Chrome 87 or higher)
    // https://developers.googleblog.com/2020/08/introducing-cast-connect-android-tv.html
    androidReceiverCompatible: false,
    language: "en-US",
    resumeSavedSession: true
  };
}
function getFormat(segment) {
  if (!segment) return void 0;
  const regex = /\.([a-zA-Z0-9]+)(?:\?.*)?$/;
  const match = segment.match(regex);
  return match ? match[1] : null;
}
function parsePlaylistUrls(playlistContent) {
  const lines = playlistContent.split("\n");
  const urls = [];
  for (let i2 = 0; i2 < lines.length; i2++) {
    const line = lines[i2].trim();
    if (line.startsWith("#EXT-X-STREAM-INF")) {
      const nextLine = lines[i2 + 1] ? lines[i2 + 1].trim() : "";
      if (nextLine && !nextLine.startsWith("#")) {
        urls.push(nextLine);
      }
    }
  }
  return urls;
}
function parseSegment(playlistContent) {
  const lines = playlistContent.split("\n");
  const url = lines.find((line) => !line.trim().startsWith("#") && line.trim() !== "");
  return url;
}
async function isHls(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("Content-Type");
    return HLS_RESPONSE_HEADERS.some((header) => contentType === header);
  } catch (err) {
    console.error("Error while trying to get the Content-Type of the manifest", err);
    return false;
  }
}
async function getPlaylistSegmentFormat(url) {
  try {
    const mainManifestContent = await (await fetch(url)).text();
    let availableChunksContent = mainManifestContent;
    const playlists = parsePlaylistUrls(mainManifestContent);
    if (playlists.length > 0) {
      const chosenPlaylistUrl = new URL(playlists[0], url).toString();
      availableChunksContent = await (await fetch(chosenPlaylistUrl)).text();
    }
    const segment = parseSegment(availableChunksContent);
    const format = getFormat(segment);
    return format;
  } catch (err) {
    console.error("Error while trying to parse the manifest playlist", err);
    return void 0;
  }
}

// node_modules/castable-video/castable-remote-playback.js
var remoteInstances = new IterableWeakSet();
var castElementRef = /* @__PURE__ */ new WeakSet();
var cf;
onCastApiAvailable(() => {
  var _a4, _b, _c, _d;
  if (!((_b = (_a4 = globalThis.chrome) == null ? void 0 : _a4.cast) == null ? void 0 : _b.isAvailable)) {
    console.debug("chrome.cast.isAvailable", (_d = (_c = globalThis.chrome) == null ? void 0 : _c.cast) == null ? void 0 : _d.isAvailable);
    return;
  }
  if (!cf) {
    cf = cast.framework;
    castContext().addEventListener(cf.CastContextEventType.CAST_STATE_CHANGED, (e2) => {
      remoteInstances.forEach((r12) => {
        var _a5, _b2;
        return (_b2 = (_a5 = privateProps.get(r12)).onCastStateChanged) == null ? void 0 : _b2.call(_a5, e2);
      });
    });
    castContext().addEventListener(cf.CastContextEventType.SESSION_STATE_CHANGED, (e2) => {
      remoteInstances.forEach((r12) => {
        var _a5, _b2;
        return (_b2 = (_a5 = privateProps.get(r12)).onSessionStateChanged) == null ? void 0 : _b2.call(_a5, e2);
      });
    });
    remoteInstances.forEach((r12) => {
      var _a5, _b2;
      return (_b2 = (_a5 = privateProps.get(r12)).init) == null ? void 0 : _b2.call(_a5);
    });
  }
});
var remotePlaybackCallbackIdCount = 0;
var _media, _isInit, _remotePlayer, _remoteListeners, _state, _available, _callbacks, _callbackIds, _RemotePlayback_instances, castPlayer_get, disconnect_fn, hasDevicesAvailable_fn, onCastStateChanged_fn, onSessionStateChanged_fn, init_fn, onRemoteMediaLoaded_fn, updateRemoteTextTrack_fn;
var RemotePlayback = class extends EventTarget {
  constructor(media) {
    super();
    __privateAdd(this, _RemotePlayback_instances);
    __privateAdd(this, _media);
    __privateAdd(this, _isInit);
    __privateAdd(this, _remotePlayer);
    __privateAdd(this, _remoteListeners);
    __privateAdd(this, _state, "disconnected");
    __privateAdd(this, _available, false);
    __privateAdd(this, _callbacks, /* @__PURE__ */ new Set());
    __privateAdd(this, _callbackIds, /* @__PURE__ */ new WeakMap());
    __privateSet(this, _media, media);
    remoteInstances.add(this);
    privateProps.set(this, {
      init: () => __privateMethod(this, _RemotePlayback_instances, init_fn).call(this),
      onCastStateChanged: () => __privateMethod(this, _RemotePlayback_instances, onCastStateChanged_fn).call(this),
      onSessionStateChanged: () => __privateMethod(this, _RemotePlayback_instances, onSessionStateChanged_fn).call(this),
      getCastPlayer: () => __privateGet(this, _RemotePlayback_instances, castPlayer_get)
    });
    __privateMethod(this, _RemotePlayback_instances, init_fn).call(this);
  }
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/RemotePlayback/state
   * @return {'disconnected'|'connecting'|'connected'}
   */
  get state() {
    return __privateGet(this, _state);
  }
  async watchAvailability(callback) {
    if (__privateGet(this, _media).disableRemotePlayback) {
      throw new InvalidStateError("disableRemotePlayback attribute is present.");
    }
    __privateGet(this, _callbackIds).set(callback, ++remotePlaybackCallbackIdCount);
    __privateGet(this, _callbacks).add(callback);
    queueMicrotask(() => callback(__privateMethod(this, _RemotePlayback_instances, hasDevicesAvailable_fn).call(this)));
    return remotePlaybackCallbackIdCount;
  }
  async cancelWatchAvailability(callback) {
    if (__privateGet(this, _media).disableRemotePlayback) {
      throw new InvalidStateError("disableRemotePlayback attribute is present.");
    }
    if (callback) {
      __privateGet(this, _callbacks).delete(callback);
    } else {
      __privateGet(this, _callbacks).clear();
    }
  }
  async prompt() {
    var _a4, _b, _c, _d;
    if (__privateGet(this, _media).disableRemotePlayback) {
      throw new InvalidStateError("disableRemotePlayback attribute is present.");
    }
    if (!((_b = (_a4 = globalThis.chrome) == null ? void 0 : _a4.cast) == null ? void 0 : _b.isAvailable)) {
      throw new NotSupportedError("The RemotePlayback API is disabled on this platform.");
    }
    const willDisconnect = castElementRef.has(__privateGet(this, _media));
    castElementRef.add(__privateGet(this, _media));
    setCastOptions(__privateGet(this, _media).castOptions);
    Object.entries(__privateGet(this, _remoteListeners)).forEach(([event, listener]) => {
      __privateGet(this, _remotePlayer).controller.addEventListener(event, listener);
    });
    try {
      await castContext().requestSession();
    } catch (err) {
      if (!willDisconnect) {
        castElementRef.delete(__privateGet(this, _media));
      }
      if (err === "cancel") {
        return;
      }
      throw new Error(err);
    }
    (_d = (_c = privateProps.get(__privateGet(this, _media))) == null ? void 0 : _c.loadOnPrompt) == null ? void 0 : _d.call(_c);
  }
};
_media = new WeakMap();
_isInit = new WeakMap();
_remotePlayer = new WeakMap();
_remoteListeners = new WeakMap();
_state = new WeakMap();
_available = new WeakMap();
_callbacks = new WeakMap();
_callbackIds = new WeakMap();
_RemotePlayback_instances = new WeakSet();
castPlayer_get = function() {
  if (castElementRef.has(__privateGet(this, _media))) return __privateGet(this, _remotePlayer);
  return void 0;
};
disconnect_fn = function() {
  if (!castElementRef.has(__privateGet(this, _media))) return;
  Object.entries(__privateGet(this, _remoteListeners)).forEach(([event, listener]) => {
    __privateGet(this, _remotePlayer).controller.removeEventListener(event, listener);
  });
  castElementRef.delete(__privateGet(this, _media));
  __privateGet(this, _media).muted = __privateGet(this, _remotePlayer).isMuted;
  __privateGet(this, _media).currentTime = __privateGet(this, _remotePlayer).savedPlayerState.currentTime;
  if (__privateGet(this, _remotePlayer).savedPlayerState.isPaused === false) {
    __privateGet(this, _media).play();
  }
};
hasDevicesAvailable_fn = function() {
  var _a4;
  const castState = (_a4 = castContext()) == null ? void 0 : _a4.getCastState();
  return castState && castState !== "NO_DEVICES_AVAILABLE";
};
onCastStateChanged_fn = function() {
  const castState = castContext().getCastState();
  if (castElementRef.has(__privateGet(this, _media))) {
    if (castState === "CONNECTING") {
      __privateSet(this, _state, "connecting");
      this.dispatchEvent(new Event("connecting"));
    }
  }
  if (!__privateGet(this, _available) && (castState == null ? void 0 : castState.includes("CONNECT"))) {
    __privateSet(this, _available, true);
    for (let callback of __privateGet(this, _callbacks)) callback(true);
  } else if (__privateGet(this, _available) && (!castState || castState === "NO_DEVICES_AVAILABLE")) {
    __privateSet(this, _available, false);
    for (let callback of __privateGet(this, _callbacks)) callback(false);
  }
};
onSessionStateChanged_fn = async function() {
  var _a4;
  const { SESSION_RESUMED } = cf.SessionState;
  if (castContext().getSessionState() === SESSION_RESUMED) {
    if (__privateGet(this, _media).castSrc === ((_a4 = currentMedia()) == null ? void 0 : _a4.media.contentId)) {
      castElementRef.add(__privateGet(this, _media));
      Object.entries(__privateGet(this, _remoteListeners)).forEach(([event, listener]) => {
        __privateGet(this, _remotePlayer).controller.addEventListener(event, listener);
      });
      try {
        await getMediaStatus(new chrome.cast.media.GetStatusRequest());
      } catch (error) {
        console.error(error);
      }
      __privateGet(this, _remoteListeners)[cf.RemotePlayerEventType.IS_PAUSED_CHANGED]();
      __privateGet(this, _remoteListeners)[cf.RemotePlayerEventType.PLAYER_STATE_CHANGED]();
    }
  }
};
init_fn = function() {
  if (!cf || __privateGet(this, _isInit)) return;
  __privateSet(this, _isInit, true);
  setCastOptions(__privateGet(this, _media).castOptions);
  __privateGet(this, _media).textTracks.addEventListener("change", () => __privateMethod(this, _RemotePlayback_instances, updateRemoteTextTrack_fn).call(this));
  __privateMethod(this, _RemotePlayback_instances, onCastStateChanged_fn).call(this);
  __privateSet(this, _remotePlayer, new cf.RemotePlayer());
  new cf.RemotePlayerController(__privateGet(this, _remotePlayer));
  __privateSet(this, _remoteListeners, {
    [cf.RemotePlayerEventType.IS_CONNECTED_CHANGED]: ({ value }) => {
      if (value === true) {
        __privateSet(this, _state, "connected");
        this.dispatchEvent(new Event("connect"));
      } else {
        __privateMethod(this, _RemotePlayback_instances, disconnect_fn).call(this);
        __privateSet(this, _state, "disconnected");
        this.dispatchEvent(new Event("disconnect"));
      }
    },
    [cf.RemotePlayerEventType.DURATION_CHANGED]: () => {
      __privateGet(this, _media).dispatchEvent(new Event("durationchange"));
    },
    [cf.RemotePlayerEventType.VOLUME_LEVEL_CHANGED]: () => {
      __privateGet(this, _media).dispatchEvent(new Event("volumechange"));
    },
    [cf.RemotePlayerEventType.IS_MUTED_CHANGED]: () => {
      __privateGet(this, _media).dispatchEvent(new Event("volumechange"));
    },
    [cf.RemotePlayerEventType.CURRENT_TIME_CHANGED]: () => {
      var _a4;
      if (!((_a4 = __privateGet(this, _RemotePlayback_instances, castPlayer_get)) == null ? void 0 : _a4.isMediaLoaded)) return;
      __privateGet(this, _media).dispatchEvent(new Event("timeupdate"));
    },
    [cf.RemotePlayerEventType.VIDEO_INFO_CHANGED]: () => {
      __privateGet(this, _media).dispatchEvent(new Event("resize"));
    },
    [cf.RemotePlayerEventType.IS_PAUSED_CHANGED]: () => {
      __privateGet(this, _media).dispatchEvent(new Event(this.paused ? "pause" : "play"));
    },
    [cf.RemotePlayerEventType.PLAYER_STATE_CHANGED]: () => {
      var _a4, _b;
      if (((_a4 = __privateGet(this, _RemotePlayback_instances, castPlayer_get)) == null ? void 0 : _a4.playerState) === chrome.cast.media.PlayerState.PAUSED) {
        return;
      }
      __privateGet(this, _media).dispatchEvent(
        new Event(
          {
            [chrome.cast.media.PlayerState.PLAYING]: "playing",
            [chrome.cast.media.PlayerState.BUFFERING]: "waiting",
            [chrome.cast.media.PlayerState.IDLE]: "emptied"
          }[(_b = __privateGet(this, _RemotePlayback_instances, castPlayer_get)) == null ? void 0 : _b.playerState]
        )
      );
    },
    [cf.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED]: async () => {
      var _a4;
      if (!((_a4 = __privateGet(this, _RemotePlayback_instances, castPlayer_get)) == null ? void 0 : _a4.isMediaLoaded)) return;
      await Promise.resolve();
      __privateMethod(this, _RemotePlayback_instances, onRemoteMediaLoaded_fn).call(this);
    }
  });
};
onRemoteMediaLoaded_fn = function() {
  __privateMethod(this, _RemotePlayback_instances, updateRemoteTextTrack_fn).call(this);
};
updateRemoteTextTrack_fn = async function() {
  var _a4, _b, _c;
  if (!__privateGet(this, _RemotePlayback_instances, castPlayer_get)) return;
  const remoteTracks = ((_a4 = __privateGet(this, _remotePlayer).mediaInfo) == null ? void 0 : _a4.tracks) ?? [];
  const remoteSubtitles = remoteTracks.filter(
    ({ type }) => type === chrome.cast.media.TrackType.TEXT
  );
  const localSubtitles = [...__privateGet(this, _media).textTracks].filter(
    ({ kind }) => kind === "subtitles" || kind === "captions"
  );
  const subtitles = remoteSubtitles.map(({ language, name, trackId }) => {
    const { mode } = localSubtitles.find(
      (local) => local.language === language && local.label === name
    ) ?? {};
    if (mode) return { mode, trackId };
    return false;
  }).filter(Boolean);
  const hiddenSubtitles = subtitles.filter(
    ({ mode }) => mode !== "showing"
  );
  const hiddenTrackIds = hiddenSubtitles.map(({ trackId }) => trackId);
  const showingSubtitle = subtitles.find(({ mode }) => mode === "showing");
  const activeTrackIds = ((_c = (_b = currentSession()) == null ? void 0 : _b.getSessionObj().media[0]) == null ? void 0 : _c.activeTrackIds) ?? [];
  let requestTrackIds = activeTrackIds;
  if (activeTrackIds.length) {
    requestTrackIds = requestTrackIds.filter(
      (id) => !hiddenTrackIds.includes(id)
    );
  }
  if (showingSubtitle == null ? void 0 : showingSubtitle.trackId) {
    requestTrackIds = [...requestTrackIds, showingSubtitle.trackId];
  }
  requestTrackIds = [...new Set(requestTrackIds)];
  const arrayEquals = (a3, b4) => a3.length === b4.length && a3.every((a4) => b4.includes(a4));
  if (!arrayEquals(activeTrackIds, requestTrackIds)) {
    try {
      const request2 = new chrome.cast.media.EditTracksInfoRequest(
        requestTrackIds
      );
      await editTracksInfo(request2);
    } catch (error) {
      console.error(error);
    }
  }
};

// node_modules/castable-video/castable-mixin.js
var CastableMediaMixin = (superclass) => {
  var _a4, _localState, _castOptions, _castCustomData, _remote, _CastableMedia_instances, castPlayer_get2, loadOnPrompt_fn;
  return _a4 = class extends superclass {
    constructor() {
      super(...arguments);
      __privateAdd(this, _CastableMedia_instances);
      __privateAdd(this, _localState, { paused: false });
      __privateAdd(this, _castOptions, getDefaultCastOptions());
      __privateAdd(this, _castCustomData);
      __privateAdd(this, _remote);
    }
    get remote() {
      if (__privateGet(this, _remote)) return __privateGet(this, _remote);
      if (requiresCastFramework()) {
        if (!this.disableRemotePlayback) {
          loadCastFramework();
        }
        privateProps.set(this, {
          loadOnPrompt: () => __privateMethod(this, _CastableMedia_instances, loadOnPrompt_fn).call(this)
        });
        return __privateSet(this, _remote, new RemotePlayback(this));
      }
      return super.remote;
    }
    attributeChangedCallback(attrName, oldValue, newValue) {
      super.attributeChangedCallback(attrName, oldValue, newValue);
      if (attrName === "cast-receiver" && newValue) {
        __privateGet(this, _castOptions).receiverApplicationId = newValue;
        return;
      }
      if (!__privateGet(this, _CastableMedia_instances, castPlayer_get2)) return;
      switch (attrName) {
        case "cast-stream-type":
        case "cast-src":
          this.load();
          break;
      }
    }
    async load() {
      var _a5;
      if (!__privateGet(this, _CastableMedia_instances, castPlayer_get2)) return super.load();
      const mediaInfo = new chrome.cast.media.MediaInfo(this.castSrc, this.castContentType);
      mediaInfo.customData = this.castCustomData;
      const subtitles = [...this.querySelectorAll("track")].filter(
        ({ kind, src }) => src && (kind === "subtitles" || kind === "captions")
      );
      const activeTrackIds = [];
      let textTrackIdCount = 0;
      if (subtitles.length) {
        mediaInfo.tracks = subtitles.map((trackEl) => {
          const trackId = ++textTrackIdCount;
          if (activeTrackIds.length === 0 && trackEl.track.mode === "showing") {
            activeTrackIds.push(trackId);
          }
          const track = new chrome.cast.media.Track(
            trackId,
            chrome.cast.media.TrackType.TEXT
          );
          track.trackContentId = trackEl.src;
          track.trackContentType = "text/vtt";
          track.subtype = trackEl.kind === "captions" ? chrome.cast.media.TextTrackType.CAPTIONS : chrome.cast.media.TextTrackType.SUBTITLES;
          track.name = trackEl.label;
          track.language = trackEl.srclang;
          return track;
        });
      }
      if (this.castStreamType === "live") {
        mediaInfo.streamType = chrome.cast.media.StreamType.LIVE;
      } else {
        mediaInfo.streamType = chrome.cast.media.StreamType.BUFFERED;
      }
      mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
      mediaInfo.metadata.title = this.title;
      mediaInfo.metadata.images = [{ url: this.poster }];
      if (isHls(this.castSrc)) {
        const segmentFormat = await getPlaylistSegmentFormat(this.castSrc);
        const isFragmentedMP4 = (segmentFormat == null ? void 0 : segmentFormat.includes("m4s")) || (segmentFormat == null ? void 0 : segmentFormat.includes("mp4"));
        if (isFragmentedMP4) {
          mediaInfo.hlsSegmentFormat = chrome.cast.media.HlsSegmentFormat.FMP4;
          mediaInfo.hlsVideoSegmentFormat = chrome.cast.media.HlsVideoSegmentFormat.FMP4;
        }
      }
      const request2 = new chrome.cast.media.LoadRequest(mediaInfo);
      request2.currentTime = super.currentTime ?? 0;
      request2.autoplay = !__privateGet(this, _localState).paused;
      request2.activeTrackIds = activeTrackIds;
      await ((_a5 = currentSession()) == null ? void 0 : _a5.loadMedia(request2));
      this.dispatchEvent(new Event("volumechange"));
    }
    play() {
      var _a5;
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2)) {
        if (__privateGet(this, _CastableMedia_instances, castPlayer_get2).isPaused) {
          (_a5 = __privateGet(this, _CastableMedia_instances, castPlayer_get2).controller) == null ? void 0 : _a5.playOrPause();
        }
        return;
      }
      return super.play();
    }
    pause() {
      var _a5;
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2)) {
        if (!__privateGet(this, _CastableMedia_instances, castPlayer_get2).isPaused) {
          (_a5 = __privateGet(this, _CastableMedia_instances, castPlayer_get2).controller) == null ? void 0 : _a5.playOrPause();
        }
        return;
      }
      super.pause();
    }
    /**
     * @see https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastOptions
     * @readonly
     *
     * @typedef {Object} CastOptions
     * @property {string} [receiverApplicationId='CC1AD845'] - The app id of the cast receiver.
     * @property {string} [autoJoinPolicy='origin_scoped'] - The auto join policy.
     * @property {string} [language='en-US'] - The language to use for the cast receiver.
     * @property {boolean} [androidReceiverCompatible=false] - Whether to use the Cast Connect.
     * @property {boolean} [resumeSavedSession=true] - Whether to resume the last session.
     *
     * @return {CastOptions}
     */
    get castOptions() {
      return __privateGet(this, _castOptions);
    }
    get castReceiver() {
      return this.getAttribute("cast-receiver") ?? void 0;
    }
    set castReceiver(val) {
      if (this.castReceiver == val) return;
      this.setAttribute("cast-receiver", `${val}`);
    }
    // Allow the cast source url to be different than <video src>, could be a blob.
    get castSrc() {
      var _a5;
      return this.getAttribute("cast-src") ?? ((_a5 = this.querySelector("source")) == null ? void 0 : _a5.src) ?? this.currentSrc;
    }
    set castSrc(val) {
      if (this.castSrc == val) return;
      this.setAttribute("cast-src", `${val}`);
    }
    get castContentType() {
      return this.getAttribute("cast-content-type") ?? void 0;
    }
    set castContentType(val) {
      this.setAttribute("cast-content-type", `${val}`);
    }
    get castStreamType() {
      return this.getAttribute("cast-stream-type") ?? this.streamType ?? void 0;
    }
    set castStreamType(val) {
      this.setAttribute("cast-stream-type", `${val}`);
    }
    get castCustomData() {
      return __privateGet(this, _castCustomData);
    }
    set castCustomData(val) {
      const valType = typeof val;
      if (!["object", "undefined"].includes(valType)) {
        console.error(`castCustomData must be nullish or an object but value was of type ${valType}`);
        return;
      }
      __privateSet(this, _castCustomData, val);
    }
    get readyState() {
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2)) {
        switch (__privateGet(this, _CastableMedia_instances, castPlayer_get2).playerState) {
          case chrome.cast.media.PlayerState.IDLE:
            return 0;
          case chrome.cast.media.PlayerState.BUFFERING:
            return 2;
          default:
            return 3;
        }
      }
      return super.readyState;
    }
    get paused() {
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2)) return __privateGet(this, _CastableMedia_instances, castPlayer_get2).isPaused;
      return super.paused;
    }
    get muted() {
      var _a5;
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2)) return (_a5 = __privateGet(this, _CastableMedia_instances, castPlayer_get2)) == null ? void 0 : _a5.isMuted;
      return super.muted;
    }
    set muted(val) {
      var _a5;
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2)) {
        if (val && !__privateGet(this, _CastableMedia_instances, castPlayer_get2).isMuted || !val && __privateGet(this, _CastableMedia_instances, castPlayer_get2).isMuted) {
          (_a5 = __privateGet(this, _CastableMedia_instances, castPlayer_get2).controller) == null ? void 0 : _a5.muteOrUnmute();
        }
        return;
      }
      super.muted = val;
    }
    get volume() {
      var _a5;
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2)) return ((_a5 = __privateGet(this, _CastableMedia_instances, castPlayer_get2)) == null ? void 0 : _a5.volumeLevel) ?? 1;
      return super.volume;
    }
    set volume(val) {
      var _a5;
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2)) {
        __privateGet(this, _CastableMedia_instances, castPlayer_get2).volumeLevel = +val;
        (_a5 = __privateGet(this, _CastableMedia_instances, castPlayer_get2).controller) == null ? void 0 : _a5.setVolumeLevel();
        return;
      }
      super.volume = val;
    }
    get duration() {
      var _a5, _b;
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2) && ((_a5 = __privateGet(this, _CastableMedia_instances, castPlayer_get2)) == null ? void 0 : _a5.isMediaLoaded)) {
        return ((_b = __privateGet(this, _CastableMedia_instances, castPlayer_get2)) == null ? void 0 : _b.duration) ?? NaN;
      }
      return super.duration;
    }
    get currentTime() {
      var _a5, _b;
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2) && ((_a5 = __privateGet(this, _CastableMedia_instances, castPlayer_get2)) == null ? void 0 : _a5.isMediaLoaded)) {
        return ((_b = __privateGet(this, _CastableMedia_instances, castPlayer_get2)) == null ? void 0 : _b.currentTime) ?? 0;
      }
      return super.currentTime;
    }
    set currentTime(val) {
      var _a5;
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2)) {
        __privateGet(this, _CastableMedia_instances, castPlayer_get2).currentTime = val;
        (_a5 = __privateGet(this, _CastableMedia_instances, castPlayer_get2).controller) == null ? void 0 : _a5.seek();
        return;
      }
      super.currentTime = val;
    }
  }, _localState = new WeakMap(), _castOptions = new WeakMap(), _castCustomData = new WeakMap(), _remote = new WeakMap(), _CastableMedia_instances = new WeakSet(), castPlayer_get2 = function() {
    var _a5, _b;
    return (_b = (_a5 = privateProps.get(this.remote)) == null ? void 0 : _a5.getCastPlayer) == null ? void 0 : _b.call(_a5);
  }, loadOnPrompt_fn = async function() {
    __privateGet(this, _localState).paused = __superGet(_a4.prototype, this, "paused");
    __superGet(_a4.prototype, this, "pause").call(this);
    this.muted = __superGet(_a4.prototype, this, "muted");
    try {
      await this.load();
    } catch (err) {
      console.error(err);
    }
  }, __publicField(_a4, "observedAttributes", [
    ...superclass.observedAttributes ?? [],
    "cast-src",
    "cast-content-type",
    "cast-stream-type",
    "cast-receiver"
  ]), _a4;
};

// node_modules/@mux/mux-video/dist/index.mjs
var f3 = (e2) => {
  throw TypeError(e2);
};
var g4 = (e2, o4, t3) => o4.has(e2) || f3("Cannot " + t3);
var u2 = (e2, o4, t3) => (g4(e2, o4, "read from private field"), t3 ? t3.call(e2) : o4.get(e2));
var m2 = (e2, o4, t3) => o4.has(e2) ? f3("Cannot add the same private member more than once") : o4 instanceof WeakSet ? o4.add(e2) : o4.set(e2, t3);
var d = (e2, o4, t3, l4) => (g4(e2, o4, "write to private field"), l4 ? l4.call(e2, t3) : o4.set(e2, t3), t3);
var s = class {
  addEventListener() {
  }
  removeEventListener() {
  }
  dispatchEvent(o4) {
    return true;
  }
};
if (typeof DocumentFragment == "undefined") {
  class e2 extends s {
  }
  globalThis.DocumentFragment = e2;
}
var n2 = class extends s {
};
var p2 = class extends s {
};
var x3 = { get(e2) {
}, define(e2, o4, t3) {
}, getName(e2) {
  return null;
}, upgrade(e2) {
}, whenDefined(e2) {
  return Promise.resolve(n2);
} };
var a;
var h = class {
  constructor(o4, t3 = {}) {
    m2(this, a);
    d(this, a, t3 == null ? void 0 : t3.detail);
  }
  get detail() {
    return u2(this, a);
  }
  initCustomEvent() {
  }
};
a = /* @__PURE__ */ new WeakMap();
function C4(e2, o4) {
  return new n2();
}
var y2 = { document: { createElement: C4 }, DocumentFragment, customElements: x3, CustomEvent: h, EventTarget: s, HTMLElement: n2, HTMLVideoElement: p2 };
var b2 = typeof window == "undefined" || typeof globalThis.customElements == "undefined";
var c2 = b2 ? y2 : globalThis;
var k2 = b2 ? y2.document : globalThis.document;
var r9;
var i = class extends CastableMediaMixin(MediaTracksMixin(K2)) {
  constructor() {
    super(...arguments);
    m2(this, r9);
  }
  get autoplay() {
    let t3 = this.getAttribute("autoplay");
    return t3 === null ? false : t3 === "" ? true : t3;
  }
  set autoplay(t3) {
    let l4 = this.autoplay;
    t3 !== l4 && (t3 ? this.setAttribute("autoplay", typeof t3 == "string" ? t3 : "") : this.removeAttribute("autoplay"));
  }
  get muxCastCustomData() {
    return { mux: { playbackId: this.playbackId, minResolution: this.minResolution, maxResolution: this.maxResolution, renditionOrder: this.renditionOrder, customDomain: this.customDomain, tokens: { drm: this.drmToken }, envKey: this.envKey, metadata: this.metadata, disableCookies: this.disableCookies, disableTracking: this.disableTracking, beaconCollectionDomain: this.beaconCollectionDomain, startTime: this.startTime, preferCmcd: this.preferCmcd } };
  }
  get castCustomData() {
    var t3;
    return (t3 = u2(this, r9)) != null ? t3 : this.muxCastCustomData;
  }
  set castCustomData(t3) {
    d(this, r9, t3);
  }
};
r9 = /* @__PURE__ */ new WeakMap();
c2.customElements.get("mux-video") || (c2.customElements.define("mux-video", i), c2.MuxVideoElement = i);

// node_modules/media-chrome/dist/constants.js
var MediaUIEvents = {
  MEDIA_PLAY_REQUEST: "mediaplayrequest",
  MEDIA_PAUSE_REQUEST: "mediapauserequest",
  MEDIA_MUTE_REQUEST: "mediamuterequest",
  MEDIA_UNMUTE_REQUEST: "mediaunmuterequest",
  MEDIA_VOLUME_REQUEST: "mediavolumerequest",
  MEDIA_SEEK_REQUEST: "mediaseekrequest",
  MEDIA_AIRPLAY_REQUEST: "mediaairplayrequest",
  MEDIA_ENTER_FULLSCREEN_REQUEST: "mediaenterfullscreenrequest",
  MEDIA_EXIT_FULLSCREEN_REQUEST: "mediaexitfullscreenrequest",
  MEDIA_PREVIEW_REQUEST: "mediapreviewrequest",
  MEDIA_ENTER_PIP_REQUEST: "mediaenterpiprequest",
  MEDIA_EXIT_PIP_REQUEST: "mediaexitpiprequest",
  MEDIA_ENTER_CAST_REQUEST: "mediaentercastrequest",
  MEDIA_EXIT_CAST_REQUEST: "mediaexitcastrequest",
  MEDIA_SHOW_TEXT_TRACKS_REQUEST: "mediashowtexttracksrequest",
  MEDIA_HIDE_TEXT_TRACKS_REQUEST: "mediahidetexttracksrequest",
  MEDIA_SHOW_SUBTITLES_REQUEST: "mediashowsubtitlesrequest",
  MEDIA_DISABLE_SUBTITLES_REQUEST: "mediadisablesubtitlesrequest",
  MEDIA_TOGGLE_SUBTITLES_REQUEST: "mediatogglesubtitlesrequest",
  MEDIA_PLAYBACK_RATE_REQUEST: "mediaplaybackraterequest",
  MEDIA_RENDITION_REQUEST: "mediarenditionrequest",
  MEDIA_AUDIO_TRACK_REQUEST: "mediaaudiotrackrequest",
  MEDIA_SEEK_TO_LIVE_REQUEST: "mediaseektoliverequest",
  REGISTER_MEDIA_STATE_RECEIVER: "registermediastatereceiver",
  UNREGISTER_MEDIA_STATE_RECEIVER: "unregistermediastatereceiver"
};
var MediaStateReceiverAttributes = {
  MEDIA_CHROME_ATTRIBUTES: "mediachromeattributes",
  MEDIA_CONTROLLER: "mediacontroller"
};
var MediaUIProps = {
  MEDIA_AIRPLAY_UNAVAILABLE: "mediaAirplayUnavailable",
  MEDIA_AUDIO_TRACK_ENABLED: "mediaAudioTrackEnabled",
  MEDIA_AUDIO_TRACK_LIST: "mediaAudioTrackList",
  MEDIA_AUDIO_TRACK_UNAVAILABLE: "mediaAudioTrackUnavailable",
  MEDIA_BUFFERED: "mediaBuffered",
  MEDIA_CAST_UNAVAILABLE: "mediaCastUnavailable",
  MEDIA_CHAPTERS_CUES: "mediaChaptersCues",
  MEDIA_CURRENT_TIME: "mediaCurrentTime",
  MEDIA_DURATION: "mediaDuration",
  MEDIA_ENDED: "mediaEnded",
  MEDIA_ERROR: "mediaError",
  MEDIA_ERROR_CODE: "mediaErrorCode",
  MEDIA_ERROR_MESSAGE: "mediaErrorMessage",
  MEDIA_FULLSCREEN_UNAVAILABLE: "mediaFullscreenUnavailable",
  MEDIA_HAS_PLAYED: "mediaHasPlayed",
  MEDIA_HEIGHT: "mediaHeight",
  MEDIA_IS_AIRPLAYING: "mediaIsAirplaying",
  MEDIA_IS_CASTING: "mediaIsCasting",
  MEDIA_IS_FULLSCREEN: "mediaIsFullscreen",
  MEDIA_IS_PIP: "mediaIsPip",
  MEDIA_LOADING: "mediaLoading",
  MEDIA_MUTED: "mediaMuted",
  MEDIA_PAUSED: "mediaPaused",
  MEDIA_PIP_UNAVAILABLE: "mediaPipUnavailable",
  MEDIA_PLAYBACK_RATE: "mediaPlaybackRate",
  MEDIA_PREVIEW_CHAPTER: "mediaPreviewChapter",
  MEDIA_PREVIEW_COORDS: "mediaPreviewCoords",
  MEDIA_PREVIEW_IMAGE: "mediaPreviewImage",
  MEDIA_PREVIEW_TIME: "mediaPreviewTime",
  MEDIA_RENDITION_LIST: "mediaRenditionList",
  MEDIA_RENDITION_SELECTED: "mediaRenditionSelected",
  MEDIA_RENDITION_UNAVAILABLE: "mediaRenditionUnavailable",
  MEDIA_SEEKABLE: "mediaSeekable",
  MEDIA_STREAM_TYPE: "mediaStreamType",
  MEDIA_SUBTITLES_LIST: "mediaSubtitlesList",
  MEDIA_SUBTITLES_SHOWING: "mediaSubtitlesShowing",
  MEDIA_TARGET_LIVE_WINDOW: "mediaTargetLiveWindow",
  MEDIA_TIME_IS_LIVE: "mediaTimeIsLive",
  MEDIA_VOLUME: "mediaVolume",
  MEDIA_VOLUME_LEVEL: "mediaVolumeLevel",
  MEDIA_VOLUME_UNAVAILABLE: "mediaVolumeUnavailable",
  MEDIA_WIDTH: "mediaWidth"
};
var MediaUIPropsEntries = Object.entries(
  MediaUIProps
);
var MediaUIAttributes = MediaUIPropsEntries.reduce(
  (dictObj, [key, propName]) => {
    dictObj[key] = propName.toLowerCase();
    return dictObj;
  },
  {}
);
var AdditionalStateChangeEvents = {
  USER_INACTIVE_CHANGE: "userinactivechange",
  BREAKPOINTS_CHANGE: "breakpointchange",
  BREAKPOINTS_COMPUTED: "breakpointscomputed"
};
var MediaStateChangeEvents = MediaUIPropsEntries.reduce(
  (dictObj, [key, propName]) => {
    dictObj[key] = propName.toLowerCase();
    return dictObj;
  },
  { ...AdditionalStateChangeEvents }
);
var StateChangeEventToAttributeMap = Object.entries(
  MediaStateChangeEvents
).reduce(
  (mapObj, [key, eventType]) => {
    const attrName = MediaUIAttributes[key];
    if (attrName) {
      mapObj[eventType] = attrName;
    }
    return mapObj;
  },
  { userinactivechange: "userinactive" }
);
var AttributeToStateChangeEventMap = Object.entries(
  MediaUIAttributes
).reduce(
  (mapObj, [key, attrName]) => {
    const evtType = MediaStateChangeEvents[key];
    if (evtType) {
      mapObj[attrName] = evtType;
    }
    return mapObj;
  },
  { userinactive: "userinactivechange" }
);
var TextTrackKinds = {
  SUBTITLES: "subtitles",
  CAPTIONS: "captions",
  DESCRIPTIONS: "descriptions",
  CHAPTERS: "chapters",
  METADATA: "metadata"
};
var TextTrackModes = {
  DISABLED: "disabled",
  HIDDEN: "hidden",
  SHOWING: "showing"
};
var PointerTypes = {
  MOUSE: "mouse",
  PEN: "pen",
  TOUCH: "touch"
};
var AvailabilityStates = {
  UNAVAILABLE: "unavailable",
  UNSUPPORTED: "unsupported"
};
var StreamTypes = {
  LIVE: "live",
  ON_DEMAND: "on-demand",
  UNKNOWN: "unknown"
};
var WebkitPresentationModes = {
  INLINE: "inline",
  FULLSCREEN: "fullscreen",
  PICTURE_IN_PICTURE: "picture-in-picture"
};

// node_modules/media-chrome/dist/utils/utils.js
function stringifyRenditionList(renditions) {
  return renditions == null ? void 0 : renditions.map(stringifyRendition).join(" ");
}
function parseRenditionList(renditions) {
  return renditions == null ? void 0 : renditions.split(/\s+/).map(parseRendition);
}
function stringifyRendition(rendition) {
  if (rendition) {
    const { id, width, height } = rendition;
    return [id, width, height].filter((a3) => a3 != null).join(":");
  }
}
function parseRendition(rendition) {
  if (rendition) {
    const [id, width, height] = rendition.split(":");
    return { id, width: +width, height: +height };
  }
}
function stringifyAudioTrackList(audioTracks) {
  return audioTracks == null ? void 0 : audioTracks.map(stringifyAudioTrack).join(" ");
}
function parseAudioTrackList(audioTracks) {
  return audioTracks == null ? void 0 : audioTracks.split(/\s+/).map(parseAudioTrack);
}
function stringifyAudioTrack(audioTrack) {
  if (audioTrack) {
    const { id, kind, language, label } = audioTrack;
    return [id, kind, language, label].filter((a3) => a3 != null).join(":");
  }
}
function parseAudioTrack(audioTrack) {
  if (audioTrack) {
    const [id, kind, language, label] = audioTrack.split(":");
    return {
      id,
      kind,
      language,
      label
    };
  }
}
function camelCase(name) {
  return name.replace(/[-_]([a-z])/g, ($0, $1) => $1.toUpperCase());
}
function isValidNumber(x7) {
  return typeof x7 === "number" && !Number.isNaN(x7) && Number.isFinite(x7);
}
function isNumericString(str) {
  if (typeof str != "string")
    return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}
var delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// node_modules/media-chrome/dist/utils/time.js
var UnitLabels = [
  {
    singular: "hour",
    plural: "hours"
  },
  {
    singular: "minute",
    plural: "minutes"
  },
  {
    singular: "second",
    plural: "seconds"
  }
];
var toTimeUnitPhrase = (timeUnitValue, unitIndex) => {
  const unitLabel = timeUnitValue === 1 ? UnitLabels[unitIndex].singular : UnitLabels[unitIndex].plural;
  return `${timeUnitValue} ${unitLabel}`;
};
var formatAsTimePhrase = (seconds) => {
  if (!isValidNumber(seconds))
    return "";
  const positiveSeconds = Math.abs(seconds);
  const negative = positiveSeconds !== seconds;
  const secondsDateTime = new Date(0, 0, 0, 0, 0, positiveSeconds, 0);
  const timeParts = [
    secondsDateTime.getHours(),
    secondsDateTime.getMinutes(),
    secondsDateTime.getSeconds()
  ];
  const timeString = timeParts.map(
    (timeUnitValue, index) => timeUnitValue && toTimeUnitPhrase(timeUnitValue, index)
  ).filter((x7) => x7).join(", ");
  const negativeSuffix = negative ? " remaining" : "";
  return `${timeString}${negativeSuffix}`;
};
function formatTime(seconds, guide) {
  let negative = false;
  if (seconds < 0) {
    negative = true;
    seconds = 0 - seconds;
  }
  seconds = seconds < 0 ? 0 : seconds;
  let s3 = Math.floor(seconds % 60);
  let m6 = Math.floor(seconds / 60 % 60);
  let h3 = Math.floor(seconds / 3600);
  const gm = Math.floor(guide / 60 % 60);
  const gh = Math.floor(guide / 3600);
  if (isNaN(seconds) || seconds === Infinity) {
    h3 = m6 = s3 = "0";
  }
  h3 = h3 > 0 || gh > 0 ? h3 + ":" : "";
  m6 = ((h3 || gm >= 10) && m6 < 10 ? "0" + m6 : m6) + ":";
  s3 = s3 < 10 ? "0" + s3 : s3;
  return (negative ? "-" : "") + h3 + m6 + s3;
}
var emptyTimeRanges = Object.freeze({
  length: 0,
  start(index) {
    const unsignedIdx = index >>> 0;
    if (unsignedIdx >= this.length) {
      throw new DOMException(
        `Failed to execute 'start' on 'TimeRanges': The index provided (${unsignedIdx}) is greater than or equal to the maximum bound (${this.length}).`
      );
    }
    return 0;
  },
  end(index) {
    const unsignedIdx = index >>> 0;
    if (unsignedIdx >= this.length) {
      throw new DOMException(
        `Failed to execute 'end' on 'TimeRanges': The index provided (${unsignedIdx}) is greater than or equal to the maximum bound (${this.length}).`
      );
    }
    return 0;
  }
});

// node_modules/media-chrome/dist/lang/en.js
var En = {
  "Start airplay": "Start airplay",
  "Stop airplay": "Stop airplay",
  Audio: "Audio",
  Captions: "Captions",
  "Enable captions": "Enable captions",
  "Disable captions": "Disable captions",
  "Start casting": "Start casting",
  "Stop casting": "Stop casting",
  "Enter fullscreen mode": "Enter fullscreen mode",
  "Exit fullscreen mode": "Exit fullscreen mode",
  Mute: "Mute",
  Unmute: "Unmute",
  "Enter picture in picture mode": "Enter picture in picture mode",
  "Exit picture in picture mode": "Exit picture in picture mode",
  Play: "Play",
  Pause: "Pause",
  "Playback rate": "Playback rate",
  "Playback rate {playbackRate}": "Playback rate {playbackRate}",
  Quality: "Quality",
  "Seek backward": "Seek backward",
  "Seek forward": "Seek forward",
  Settings: "Settings",
  Auto: "Auto",
  "audio player": "audio player",
  "video player": "video player",
  volume: "volume",
  seek: "seek",
  "closed captions": "closed captions",
  "current playback rate": "current playback rate",
  "playback time": "playback time",
  "media loading": "media loading",
  settings: "settings",
  "audio tracks": "audio tracks",
  quality: "quality",
  play: "play",
  pause: "pause",
  mute: "mute",
  unmute: "unmute",
  live: "live",
  Off: "Off",
  "start airplay": "start airplay",
  "stop airplay": "stop airplay",
  "start casting": "start casting",
  "stop casting": "stop casting",
  "enter fullscreen mode": "enter fullscreen mode",
  "exit fullscreen mode": "exit fullscreen mode",
  "enter picture in picture mode": "enter picture in picture mode",
  "exit picture in picture mode": "exit picture in picture mode",
  "seek to live": "seek to live",
  "playing live": "playing live",
  "seek back {seekOffset} seconds": "seek back {seekOffset} seconds",
  "seek forward {seekOffset} seconds": "seek forward {seekOffset} seconds",
  "Network Error": "Network Error",
  "Decode Error": "Decode Error",
  "Source Not Supported": "Source Not Supported",
  "Encryption Error": "Encryption Error",
  "A network error caused the media download to fail.": "A network error caused the media download to fail.",
  "A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.": "A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.",
  "An unsupported error occurred. The server or network failed, or your browser does not support this format.": "An unsupported error occurred. The server or network failed, or your browser does not support this format.",
  "The media is encrypted and there are no keys to decrypt it.": "The media is encrypted and there are no keys to decrypt it."
};

// node_modules/media-chrome/dist/utils/i18n.js
var _a2;
var translations = {
  en: En
};
var currentLang = ((_a2 = globalThis.navigator) == null ? void 0 : _a2.language) || "en";
var setLanguage = (langCode) => {
  currentLang = langCode;
};
var resolveTranslation = (key) => {
  var _a22, _b, _c;
  const [base] = currentLang.split("-");
  return ((_a22 = translations[currentLang]) == null ? void 0 : _a22[key]) || ((_b = translations[base]) == null ? void 0 : _b[key]) || ((_c = translations.en) == null ? void 0 : _c[key]) || key;
};
var t = (key, vars = {}) => resolveTranslation(key).replace(
  /\{(\w+)\}/g,
  (_3, v4) => v4 in vars ? String(vars[v4]) : `{${v4}}`
);

// node_modules/media-chrome/dist/utils/server-safe-globals.js
var EventTarget2 = class {
  addEventListener() {
  }
  removeEventListener() {
  }
  dispatchEvent() {
    return true;
  }
};
var Node = class extends EventTarget2 {
};
var Element2 = class extends Node {
  constructor() {
    super(...arguments);
    this.role = null;
  }
};
var ResizeObserver = class {
  observe() {
  }
  unobserve() {
  }
  disconnect() {
  }
};
var documentShim = {
  createElement: function() {
    return new globalThisShim.HTMLElement();
  },
  createElementNS: function() {
    return new globalThisShim.HTMLElement();
  },
  addEventListener() {
  },
  removeEventListener() {
  },
  dispatchEvent(_event) {
    return false;
  }
};
var globalThisShim = {
  ResizeObserver,
  document: documentShim,
  Node,
  Element: Element2,
  HTMLElement: class HTMLElement extends Element2 {
    constructor() {
      super(...arguments);
      this.innerHTML = "";
    }
    get content() {
      return new globalThisShim.DocumentFragment();
    }
  },
  DocumentFragment: class DocumentFragment2 extends EventTarget2 {
  },
  customElements: {
    get: function() {
    },
    define: function() {
    },
    whenDefined: function() {
    }
  },
  localStorage: {
    getItem(_key) {
      return null;
    },
    setItem(_key, _value2) {
    },
    removeItem(_key) {
    }
  },
  CustomEvent: function CustomEvent2() {
  },
  getComputedStyle: function() {
  },
  navigator: {
    languages: [],
    get userAgent() {
      return "";
    }
  },
  matchMedia(media) {
    return {
      matches: false,
      media
    };
  },
  DOMParser: class DOMParser {
    parseFromString(string, _contentType) {
      return {
        body: {
          textContent: string
        }
      };
    }
  }
};
var isServer = typeof window === "undefined" || typeof window.customElements === "undefined";
var isShimmed = Object.keys(globalThisShim).every((key) => key in globalThis);
var GlobalThis = isServer && !isShimmed ? globalThisShim : globalThis;
var Document2 = isServer && !isShimmed ? documentShim : globalThis.document;

// node_modules/media-chrome/dist/utils/resize-observer.js
var callbacksMap = /* @__PURE__ */ new WeakMap();
var getCallbacks = (element) => {
  let callbacks = callbacksMap.get(element);
  if (!callbacks)
    callbacksMap.set(element, callbacks = /* @__PURE__ */ new Set());
  return callbacks;
};
var observer = new GlobalThis.ResizeObserver(
  (entries) => {
    for (const entry of entries) {
      for (const callback of getCallbacks(entry.target)) {
        callback(entry);
      }
    }
  }
);
function observeResize(element, callback) {
  getCallbacks(element).add(callback);
  observer.observe(element);
}
function unobserveResize(element, callback) {
  const callbacks = getCallbacks(element);
  callbacks.delete(callback);
  if (!callbacks.size) {
    observer.unobserve(element);
  }
}

// node_modules/media-chrome/dist/utils/element-utils.js
function namedNodeMapToObject(namedNodeMap) {
  const obj = {};
  for (const attr of namedNodeMap) {
    obj[attr.name] = attr.value;
  }
  return obj;
}
function getMediaController(host) {
  var _a4;
  return (_a4 = getAttributeMediaController(host)) != null ? _a4 : closestComposedNode(host, "media-controller");
}
function getAttributeMediaController(host) {
  var _a4;
  const { MEDIA_CONTROLLER } = MediaStateReceiverAttributes;
  const mediaControllerId = host.getAttribute(MEDIA_CONTROLLER);
  if (mediaControllerId) {
    return (_a4 = getDocumentOrShadowRoot(host)) == null ? void 0 : _a4.getElementById(
      mediaControllerId
    );
  }
}
var updateIconText = (svg, value, selector = ".value") => {
  const node = svg.querySelector(selector);
  if (!node)
    return;
  node.textContent = value;
};
var getAllSlotted = (el, name) => {
  const slotSelector = `slot[name="${name}"]`;
  const slot = el.shadowRoot.querySelector(slotSelector);
  if (!slot)
    return [];
  return slot.children;
};
var getSlotted = (el, name) => getAllSlotted(el, name)[0];
var containsComposedNode = (rootNode, childNode) => {
  if (!rootNode || !childNode)
    return false;
  if (rootNode == null ? void 0 : rootNode.contains(childNode))
    return true;
  return containsComposedNode(
    rootNode,
    childNode.getRootNode().host
  );
};
var closestComposedNode = (childNode, selector) => {
  if (!childNode)
    return null;
  const closest = childNode.closest(selector);
  if (closest)
    return closest;
  return closestComposedNode(
    childNode.getRootNode().host,
    selector
  );
};
function getActiveElement(root = document) {
  var _a4;
  const activeEl = root == null ? void 0 : root.activeElement;
  if (!activeEl)
    return null;
  return (_a4 = getActiveElement(activeEl.shadowRoot)) != null ? _a4 : activeEl;
}
function getDocumentOrShadowRoot(node) {
  var _a4;
  const rootNode = (_a4 = node == null ? void 0 : node.getRootNode) == null ? void 0 : _a4.call(node);
  if (rootNode instanceof ShadowRoot || rootNode instanceof Document) {
    return rootNode;
  }
  return null;
}
function isElementVisible(element, { depth = 3, checkOpacity = true, checkVisibilityCSS = true } = {}) {
  if (element.checkVisibility) {
    return element.checkVisibility({
      checkOpacity,
      checkVisibilityCSS
    });
  }
  let el = element;
  while (el && depth > 0) {
    const style = getComputedStyle(el);
    if (checkOpacity && style.opacity === "0" || checkVisibilityCSS && style.visibility === "hidden" || style.display === "none") {
      return false;
    }
    el = el.parentElement;
    depth--;
  }
  return true;
}
function getPointProgressOnLine(x7, y5, p1, p22) {
  const dx = p22.x - p1.x;
  const dy = p22.y - p1.y;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0)
    return 0;
  const projection = ((x7 - p1.x) * dx + (y5 - p1.y) * dy) / lengthSquared;
  return Math.max(0, Math.min(1, projection));
}
function getOrInsertCSSRule(styleParent, selectorText) {
  const cssRule = getCSSRule(styleParent, (st3) => st3 === selectorText);
  if (cssRule)
    return cssRule;
  return insertCSSRule(styleParent, selectorText);
}
function getCSSRule(styleParent, predicate) {
  var _a4, _b;
  let style;
  for (style of (_a4 = styleParent.querySelectorAll("style:not([media])")) != null ? _a4 : []) {
    let cssRules;
    try {
      cssRules = (_b = style.sheet) == null ? void 0 : _b.cssRules;
    } catch {
      continue;
    }
    for (const rule of cssRules != null ? cssRules : []) {
      if (predicate(rule.selectorText))
        return rule;
    }
  }
}
function insertCSSRule(styleParent, selectorText) {
  var _a4, _b;
  const styles = (_a4 = styleParent.querySelectorAll("style:not([media])")) != null ? _a4 : [];
  const style = styles == null ? void 0 : styles[styles.length - 1];
  if (!(style == null ? void 0 : style.sheet)) {
    console.warn(
      "Media Chrome: No style sheet found on style tag of",
      styleParent
    );
    return {
      // @ts-ignore
      style: {
        setProperty: () => {
        },
        removeProperty: () => "",
        getPropertyValue: () => ""
      }
    };
  }
  style == null ? void 0 : style.sheet.insertRule(`${selectorText}{}`, style.sheet.cssRules.length);
  return (
    /** @type {CSSStyleRule} */
    (_b = style.sheet.cssRules) == null ? void 0 : _b[style.sheet.cssRules.length - 1]
  );
}
function getNumericAttr(el, attrName, defaultValue = Number.NaN) {
  const attrVal = el.getAttribute(attrName);
  return attrVal != null ? +attrVal : defaultValue;
}
function setNumericAttr(el, attrName, value) {
  const nextNumericValue = +value;
  if (value == null || Number.isNaN(nextNumericValue)) {
    if (el.hasAttribute(attrName)) {
      el.removeAttribute(attrName);
    }
    return;
  }
  if (getNumericAttr(el, attrName, void 0) === nextNumericValue)
    return;
  el.setAttribute(attrName, `${nextNumericValue}`);
}
function getBooleanAttr(el, attrName) {
  return el.hasAttribute(attrName);
}
function setBooleanAttr(el, attrName, value) {
  if (value == null) {
    if (el.hasAttribute(attrName)) {
      el.removeAttribute(attrName);
    }
    return;
  }
  if (getBooleanAttr(el, attrName) == value)
    return;
  el.toggleAttribute(attrName, value);
}
function getStringAttr(el, attrName, defaultValue = null) {
  var _a4;
  return (_a4 = el.getAttribute(attrName)) != null ? _a4 : defaultValue;
}
function setStringAttr(el, attrName, value) {
  if (value == null) {
    if (el.hasAttribute(attrName)) {
      el.removeAttribute(attrName);
    }
    return;
  }
  const nextValue = `${value}`;
  if (getStringAttr(el, attrName, void 0) === nextValue)
    return;
  el.setAttribute(attrName, nextValue);
}

// node_modules/media-chrome/dist/media-gesture-receiver.js
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _mediaController;
function getTemplateHTML(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `
  );
}
var MediaGestureReceiver = class extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd2(this, _mediaController, void 0);
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    }
  }
  // NOTE: Currently "baking in" actions + attrs until we come up with
  // a more robust architecture (CJP)
  static get observedAttributes() {
    return [
      MediaStateReceiverAttributes.MEDIA_CONTROLLER,
      MediaUIAttributes.MEDIA_PAUSED
    ];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a4, _b, _c, _d, _e4;
    if (attrName === MediaStateReceiverAttributes.MEDIA_CONTROLLER) {
      if (oldValue) {
        (_b = (_a4 = __privateGet2(this, _mediaController)) == null ? void 0 : _a4.unassociateElement) == null ? void 0 : _b.call(_a4, this);
        __privateSet2(this, _mediaController, null);
      }
      if (newValue && this.isConnected) {
        __privateSet2(this, _mediaController, (_c = this.getRootNode()) == null ? void 0 : _c.getElementById(newValue));
        (_e4 = (_d = __privateGet2(this, _mediaController)) == null ? void 0 : _d.associateElement) == null ? void 0 : _e4.call(_d, this);
      }
    }
  }
  connectedCallback() {
    var _a4, _b, _c, _d;
    this.tabIndex = -1;
    this.setAttribute("aria-hidden", "true");
    __privateSet2(this, _mediaController, getMediaControllerEl(this));
    if (this.getAttribute(MediaStateReceiverAttributes.MEDIA_CONTROLLER)) {
      (_b = (_a4 = __privateGet2(this, _mediaController)) == null ? void 0 : _a4.associateElement) == null ? void 0 : _b.call(_a4, this);
    }
    (_c = __privateGet2(this, _mediaController)) == null ? void 0 : _c.addEventListener("pointerdown", this);
    (_d = __privateGet2(this, _mediaController)) == null ? void 0 : _d.addEventListener("click", this);
  }
  disconnectedCallback() {
    var _a4, _b, _c, _d;
    if (this.getAttribute(MediaStateReceiverAttributes.MEDIA_CONTROLLER)) {
      (_b = (_a4 = __privateGet2(this, _mediaController)) == null ? void 0 : _a4.unassociateElement) == null ? void 0 : _b.call(_a4, this);
    }
    (_c = __privateGet2(this, _mediaController)) == null ? void 0 : _c.removeEventListener("pointerdown", this);
    (_d = __privateGet2(this, _mediaController)) == null ? void 0 : _d.removeEventListener("click", this);
    __privateSet2(this, _mediaController, null);
  }
  handleEvent(event) {
    var _a4;
    const composedTarget = (_a4 = event.composedPath()) == null ? void 0 : _a4[0];
    const allowList = ["video", "media-controller"];
    if (!allowList.includes(composedTarget == null ? void 0 : composedTarget.localName))
      return;
    if (event.type === "pointerdown") {
      this._pointerType = event.pointerType;
    } else if (event.type === "click") {
      const { clientX, clientY } = event;
      const { left, top, width, height } = this.getBoundingClientRect();
      const x7 = clientX - left;
      const y5 = clientY - top;
      if (x7 < 0 || y5 < 0 || x7 > width || y5 > height || // In case this element has no dimensions (or display: none) return.
      width === 0 && height === 0) {
        return;
      }
      const { pointerType = this._pointerType } = event;
      this._pointerType = void 0;
      if (pointerType === PointerTypes.TOUCH) {
        this.handleTap(event);
        return;
      } else if (pointerType === PointerTypes.MOUSE) {
        this.handleMouseClick(event);
        return;
      }
    }
  }
  /**
   * @type {boolean} Is the media paused
   */
  get mediaPaused() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED);
  }
  set mediaPaused(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED, value);
  }
  // NOTE: Currently "baking in" actions + attrs until we come up with
  // a more robust architecture (CJP)
  /**
   * @abstract
   * @argument {Event} e
   */
  handleTap(e2) {
  }
  // eslint-disable-line
  // eslint-disable-next-line
  handleMouseClick(e2) {
    const eventName = this.mediaPaused ? MediaUIEvents.MEDIA_PLAY_REQUEST : MediaUIEvents.MEDIA_PAUSE_REQUEST;
    this.dispatchEvent(
      new GlobalThis.CustomEvent(eventName, { composed: true, bubbles: true })
    );
  }
};
_mediaController = /* @__PURE__ */ new WeakMap();
MediaGestureReceiver.shadowRootOptions = { mode: "open" };
MediaGestureReceiver.getTemplateHTML = getTemplateHTML;
function getMediaControllerEl(controlEl) {
  var _a4;
  const mediaControllerId = controlEl.getAttribute(
    MediaStateReceiverAttributes.MEDIA_CONTROLLER
  );
  if (mediaControllerId) {
    return (_a4 = controlEl.getRootNode()) == null ? void 0 : _a4.getElementById(mediaControllerId);
  }
  return closestComposedNode(controlEl, "media-controller");
}
if (!GlobalThis.customElements.get("media-gesture-receiver")) {
  GlobalThis.customElements.define(
    "media-gesture-receiver",
    MediaGestureReceiver
  );
}
var media_gesture_receiver_default = MediaGestureReceiver;

// node_modules/media-chrome/dist/media-container.js
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet3 = (obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd3 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet3 = (obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod2 = (obj, member, method) => {
  __accessCheck2(obj, member, "access private method");
  return method;
};
var _pointerDownTimeStamp;
var _currentMedia;
var _inactiveTimeout;
var _autohide;
var _mutationObserver;
var _handleMutation;
var handleMutation_fn;
var _isResizePending;
var _handleResize;
var _handlePointerMove;
var handlePointerMove_fn;
var _handlePointerUp;
var handlePointerUp_fn;
var _setInactive;
var setInactive_fn;
var _setActive;
var setActive_fn;
var _scheduleInactive;
var scheduleInactive_fn;
var Attributes = {
  AUDIO: "audio",
  AUTOHIDE: "autohide",
  BREAKPOINTS: "breakpoints",
  GESTURES_DISABLED: "gesturesdisabled",
  KEYBOARD_CONTROL: "keyboardcontrol",
  NO_AUTOHIDE: "noautohide",
  USER_INACTIVE: "userinactive",
  AUTOHIDE_OVER_CONTROLS: "autohideovercontrols"
};
function getTemplateHTML2(_attrs) {
  return (
    /*html*/
    `
    <style>
      ${/*
    * outline on media is turned off because it is allowed to get focus to faciliate hotkeys.
    * However, on keyboard interactions, the focus outline is shown,
    * which is particularly noticeable when going fullscreen via hotkeys.
    */
    ""}
      :host([${MediaUIAttributes.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
        outline: none;
      }

      :host {
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        line-height: 0;
        background-color: var(--media-background-color, #000);
      }

      :host(:not([${Attributes.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-flow: column nowrap;
        align-items: start;
        pointer-events: none;
        background: none;
      }

      slot[name=media] {
        display: var(--media-slot-display, contents);
      }

      ${/*
    * when in audio mode, hide the slotted media element by default
    */
    ""}
      :host([${Attributes.AUDIO}]) slot[name=media] {
        display: var(--media-slot-display, none);
      }

      ${/*
    * when in audio mode, hide the gesture-layer which causes media-controller to be taller than the control bar
    */
    ""}
      :host([${Attributes.AUDIO}]) [part~=layer][part~=gesture-layer] {
        height: 0;
        display: block;
      }

      ${/*
    * if gestures are disabled, don't accept pointer-events
    */
    ""}
      :host(:not([${Attributes.AUDIO}])[${Attributes.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
          :host(:not([${Attributes.AUDIO}])[${Attributes.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
        display: none;
      }

      ${/*
    * any slotted element that isn't a poster or media slot should be pointer-events auto
    * we'll want to add here any slotted elements that shouldn't get pointer-events by default when slotted
    */
    ""}
      ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
        pointer-events: auto;
      }

      :host(:not([${Attributes.AUDIO}])) *[part~=layer][part~=centered-layer] {
        align-items: center;
        justify-content: center;
      }

      :host(:not([${Attributes.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
      :host(:not([${Attributes.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
        align-self: stretch;
        flex-grow: 1;
      }

      slot[name=middle-chrome] {
        display: inline;
        flex-grow: 1;
        pointer-events: none;
        background: none;
      }

      ${/* Position the media and poster elements to fill the container */
    ""}
      ::slotted([slot=media]),
      ::slotted([slot=poster]) {
        width: 100%;
        height: 100%;
      }

      ${/* Video specific styles */
    ""}
      :host(:not([${Attributes.AUDIO}])) .spacer {
        flex-grow: 1;
      }

      ${/* Safari needs this to actually make the element fill the window */
    ""}
      :host(:-webkit-full-screen) {
        ${/* Needs to use !important otherwise easy to break */
    ""}
        width: 100% !important;
        height: 100% !important;
      }

      ${/* Only add these if auto hide is not disabled */
    ""}
      ::slotted(:not([slot=media]):not([slot=poster]):not([${Attributes.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
        opacity: 1;
        transition: var(--media-control-transition-in, opacity 0.25s);
      }

      ${/* Hide controls when inactive, not paused, not audio and auto hide not disabled */
    ""}
      :host([${Attributes.USER_INACTIVE}]:not([${MediaUIAttributes.MEDIA_PAUSED}]):not([${MediaUIAttributes.MEDIA_IS_AIRPLAYING}]):not([${MediaUIAttributes.MEDIA_IS_CASTING}]):not([${Attributes.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${Attributes.NO_AUTOHIDE}]):not([role=dialog])) {
        opacity: 0;
        transition: var(--media-control-transition-out, opacity 1s);
      }

      :host([${Attributes.USER_INACTIVE}]:not([${Attributes.NO_AUTOHIDE}]):not([${MediaUIAttributes.MEDIA_PAUSED}]):not([${MediaUIAttributes.MEDIA_IS_CASTING}]):not([${Attributes.AUDIO}])) ::slotted([slot=media]) {
        cursor: none;
      }

      :host([${Attributes.USER_INACTIVE}][${Attributes.AUTOHIDE_OVER_CONTROLS}]:not([${Attributes.NO_AUTOHIDE}]):not([${MediaUIAttributes.MEDIA_PAUSED}]):not([${MediaUIAttributes.MEDIA_IS_CASTING}]):not([${Attributes.AUDIO}])) * {
        --media-cursor: none;
        cursor: none;
      }


      ::slotted(media-control-bar)  {
        align-self: stretch;
      }

      ${/* ::slotted([slot=poster]) doesn't work for slot fallback content so hide parent slot instead */
    ""}
      :host(:not([${Attributes.AUDIO}])[${MediaUIAttributes.MEDIA_HAS_PLAYED}]) slot[name=poster] {
        display: none;
      }

      ::slotted([role=dialog]) {
        width: 100%;
        height: 100%;
        align-self: center;
      }

      ::slotted([role=menu]) {
        align-self: end;
      }
    </style>

    <slot name="media" part="layer media-layer"></slot>
    <slot name="poster" part="layer poster-layer"></slot>
    <slot name="gestures-chrome" part="layer gesture-layer">
      <media-gesture-receiver slot="gestures-chrome">
        <template shadowrootmode="${media_gesture_receiver_default.shadowRootOptions.mode}">
          ${media_gesture_receiver_default.getTemplateHTML({})}
        </template>
      </media-gesture-receiver>
    </slot>
    <span part="layer vertical-layer">
      <slot name="top-chrome" part="top chrome"></slot>
      <slot name="middle-chrome" part="middle chrome"></slot>
      <slot name="centered-chrome" part="layer centered-layer center centered chrome"></slot>
      ${/* default, effectively "bottom-chrome" */
    ""}
      <slot part="bottom chrome"></slot>
    </span>
    <slot name="dialog" part="layer dialog-layer"></slot>
  `
  );
}
var MEDIA_UI_ATTRIBUTE_NAMES = Object.values(MediaUIAttributes);
var defaultBreakpoints = "sm:384 md:576 lg:768 xl:960";
function resizeCallback(entry) {
  setBreakpoints(entry.target, entry.contentRect.width);
}
function setBreakpoints(container, width) {
  var _a4;
  if (!container.isConnected)
    return;
  const breakpoints = (_a4 = container.getAttribute(Attributes.BREAKPOINTS)) != null ? _a4 : defaultBreakpoints;
  const ranges = createBreakpointMap(breakpoints);
  const activeBreakpoints = getBreakpoints(ranges, width);
  let changed = false;
  Object.keys(ranges).forEach((name) => {
    if (activeBreakpoints.includes(name)) {
      if (!container.hasAttribute(`breakpoint${name}`)) {
        container.setAttribute(`breakpoint${name}`, "");
        changed = true;
      }
      return;
    }
    if (container.hasAttribute(`breakpoint${name}`)) {
      container.removeAttribute(`breakpoint${name}`);
      changed = true;
    }
  });
  if (changed) {
    const evt = new CustomEvent(MediaStateChangeEvents.BREAKPOINTS_CHANGE, {
      detail: activeBreakpoints
    });
    container.dispatchEvent(evt);
  }
  if (!container.breakpointsComputed) {
    container.breakpointsComputed = true;
    container.dispatchEvent(
      new CustomEvent(MediaStateChangeEvents.BREAKPOINTS_COMPUTED, {
        bubbles: true,
        composed: true
      })
    );
  }
}
function createBreakpointMap(breakpoints) {
  const pairs = breakpoints.split(/\s+/);
  return Object.fromEntries(pairs.map((pair) => pair.split(":")));
}
function getBreakpoints(breakpoints, width) {
  return Object.keys(breakpoints).filter((name) => {
    return width >= parseInt(breakpoints[name]);
  });
}
var MediaContainer = class extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd3(this, _handleMutation);
    __privateAdd3(this, _handlePointerMove);
    __privateAdd3(this, _handlePointerUp);
    __privateAdd3(this, _setInactive);
    __privateAdd3(this, _setActive);
    __privateAdd3(this, _scheduleInactive);
    __privateAdd3(this, _pointerDownTimeStamp, 0);
    __privateAdd3(this, _currentMedia, null);
    __privateAdd3(this, _inactiveTimeout, null);
    __privateAdd3(this, _autohide, void 0);
    this.breakpointsComputed = false;
    __privateAdd3(this, _mutationObserver, new MutationObserver(__privateMethod2(this, _handleMutation, handleMutation_fn).bind(this)));
    __privateAdd3(this, _isResizePending, false);
    __privateAdd3(this, _handleResize, (entry) => {
      if (__privateGet3(this, _isResizePending))
        return;
      setTimeout(() => {
        resizeCallback(entry);
        __privateSet3(this, _isResizePending, false);
      }, 0);
      __privateSet3(this, _isResizePending, true);
    });
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      const html = this.constructor.getTemplateHTML(attrs);
      this.shadowRoot.setHTMLUnsafe ? this.shadowRoot.setHTMLUnsafe(html) : this.shadowRoot.innerHTML = html;
    }
    const chainedSlot = this.querySelector(
      ":scope > slot[slot=media]"
    );
    if (chainedSlot) {
      chainedSlot.addEventListener("slotchange", () => {
        const slotEls = chainedSlot.assignedElements({ flatten: true });
        if (!slotEls.length) {
          if (__privateGet3(this, _currentMedia)) {
            this.mediaUnsetCallback(__privateGet3(this, _currentMedia));
          }
          return;
        }
        this.handleMediaUpdated(this.media);
      });
    }
  }
  static get observedAttributes() {
    return [Attributes.AUTOHIDE, Attributes.GESTURES_DISABLED].concat(MEDIA_UI_ATTRIBUTE_NAMES).filter(
      (name) => ![
        MediaUIAttributes.MEDIA_RENDITION_LIST,
        MediaUIAttributes.MEDIA_AUDIO_TRACK_LIST,
        MediaUIAttributes.MEDIA_CHAPTERS_CUES,
        MediaUIAttributes.MEDIA_WIDTH,
        MediaUIAttributes.MEDIA_HEIGHT,
        MediaUIAttributes.MEDIA_ERROR,
        MediaUIAttributes.MEDIA_ERROR_MESSAGE
      ].includes(name)
    );
  }
  // Could share this code with media-chrome-html-element instead
  attributeChangedCallback(attrName, _oldValue, newValue) {
    if (attrName.toLowerCase() == Attributes.AUTOHIDE) {
      this.autohide = newValue;
    }
  }
  // First direct child with slot=media, or null
  get media() {
    let media = this.querySelector(":scope > [slot=media]");
    if ((media == null ? void 0 : media.nodeName) == "SLOT")
      media = media.assignedElements({ flatten: true })[0];
    return media;
  }
  async handleMediaUpdated(media) {
    if (!media)
      return;
    __privateSet3(this, _currentMedia, media);
    if (media.localName.includes("-")) {
      await GlobalThis.customElements.whenDefined(media.localName);
    }
    this.mediaSetCallback(media);
  }
  connectedCallback() {
    var _a4;
    __privateGet3(this, _mutationObserver).observe(this, { childList: true, subtree: true });
    observeResize(this, __privateGet3(this, _handleResize));
    const isAudioChrome = this.getAttribute(Attributes.AUDIO) != null;
    const label = isAudioChrome ? t("audio player") : t("video player");
    this.setAttribute("role", "region");
    this.setAttribute("aria-label", label);
    this.handleMediaUpdated(this.media);
    this.setAttribute(Attributes.USER_INACTIVE, "");
    setBreakpoints(this, this.getBoundingClientRect().width);
    this.addEventListener("pointerdown", this);
    this.addEventListener("pointermove", this);
    this.addEventListener("pointerup", this);
    this.addEventListener("mouseleave", this);
    this.addEventListener("keyup", this);
    (_a4 = GlobalThis.window) == null ? void 0 : _a4.addEventListener("mouseup", this);
  }
  disconnectedCallback() {
    var _a4;
    __privateGet3(this, _mutationObserver).disconnect();
    unobserveResize(this, __privateGet3(this, _handleResize));
    if (this.media) {
      this.mediaUnsetCallback(this.media);
    }
    (_a4 = GlobalThis.window) == null ? void 0 : _a4.removeEventListener("mouseup", this);
  }
  /**
   * @abstract
   */
  mediaSetCallback(_media2) {
  }
  mediaUnsetCallback(_media2) {
    __privateSet3(this, _currentMedia, null);
  }
  handleEvent(event) {
    switch (event.type) {
      case "pointerdown":
        __privateSet3(this, _pointerDownTimeStamp, event.timeStamp);
        break;
      case "pointermove":
        __privateMethod2(this, _handlePointerMove, handlePointerMove_fn).call(this, event);
        break;
      case "pointerup":
        __privateMethod2(this, _handlePointerUp, handlePointerUp_fn).call(this, event);
        break;
      case "mouseleave":
        __privateMethod2(this, _setInactive, setInactive_fn).call(this);
        break;
      case "mouseup":
        this.removeAttribute(Attributes.KEYBOARD_CONTROL);
        break;
      case "keyup":
        __privateMethod2(this, _scheduleInactive, scheduleInactive_fn).call(this);
        this.setAttribute(Attributes.KEYBOARD_CONTROL, "");
        break;
    }
  }
  set autohide(seconds) {
    const parsedSeconds = Number(seconds);
    __privateSet3(this, _autohide, isNaN(parsedSeconds) ? 0 : parsedSeconds);
  }
  get autohide() {
    return (__privateGet3(this, _autohide) === void 0 ? 2 : __privateGet3(this, _autohide)).toString();
  }
  get breakpoints() {
    return getStringAttr(this, Attributes.BREAKPOINTS);
  }
  set breakpoints(value) {
    setStringAttr(this, Attributes.BREAKPOINTS, value);
  }
  get audio() {
    return getBooleanAttr(this, Attributes.AUDIO);
  }
  set audio(value) {
    setBooleanAttr(this, Attributes.AUDIO, value);
  }
  get gesturesDisabled() {
    return getBooleanAttr(this, Attributes.GESTURES_DISABLED);
  }
  set gesturesDisabled(value) {
    setBooleanAttr(this, Attributes.GESTURES_DISABLED, value);
  }
  get keyboardControl() {
    return getBooleanAttr(this, Attributes.KEYBOARD_CONTROL);
  }
  set keyboardControl(value) {
    setBooleanAttr(this, Attributes.KEYBOARD_CONTROL, value);
  }
  get noAutohide() {
    return getBooleanAttr(this, Attributes.NO_AUTOHIDE);
  }
  set noAutohide(value) {
    setBooleanAttr(this, Attributes.NO_AUTOHIDE, value);
  }
  get autohideOverControls() {
    return getBooleanAttr(this, Attributes.AUTOHIDE_OVER_CONTROLS);
  }
  set autohideOverControls(value) {
    setBooleanAttr(this, Attributes.AUTOHIDE_OVER_CONTROLS, value);
  }
  get userInteractive() {
    return getBooleanAttr(this, Attributes.USER_INACTIVE);
  }
  set userInteractive(value) {
    setBooleanAttr(this, Attributes.USER_INACTIVE, value);
  }
};
_pointerDownTimeStamp = /* @__PURE__ */ new WeakMap();
_currentMedia = /* @__PURE__ */ new WeakMap();
_inactiveTimeout = /* @__PURE__ */ new WeakMap();
_autohide = /* @__PURE__ */ new WeakMap();
_mutationObserver = /* @__PURE__ */ new WeakMap();
_handleMutation = /* @__PURE__ */ new WeakSet();
handleMutation_fn = function(mutationsList) {
  const media = this.media;
  for (const mutation of mutationsList) {
    if (mutation.type !== "childList")
      continue;
    const removedNodes = mutation.removedNodes;
    for (const node of removedNodes) {
      if (node.slot != "media" || mutation.target != this)
        continue;
      let previousSibling = mutation.previousSibling && mutation.previousSibling.previousElementSibling;
      if (!previousSibling || !media) {
        this.mediaUnsetCallback(node);
      } else {
        let wasFirst = previousSibling.slot !== "media";
        while ((previousSibling = previousSibling.previousSibling) !== null) {
          if (previousSibling.slot == "media")
            wasFirst = false;
        }
        if (wasFirst)
          this.mediaUnsetCallback(node);
      }
    }
    if (media) {
      for (const node of mutation.addedNodes) {
        if (node === media)
          this.handleMediaUpdated(media);
      }
    }
  }
};
_isResizePending = /* @__PURE__ */ new WeakMap();
_handleResize = /* @__PURE__ */ new WeakMap();
_handlePointerMove = /* @__PURE__ */ new WeakSet();
handlePointerMove_fn = function(event) {
  if (event.pointerType !== "mouse") {
    const MAX_TAP_DURATION = 250;
    if (event.timeStamp - __privateGet3(this, _pointerDownTimeStamp) < MAX_TAP_DURATION)
      return;
  }
  __privateMethod2(this, _setActive, setActive_fn).call(this);
  clearTimeout(__privateGet3(this, _inactiveTimeout));
  const autohideOverControls = this.hasAttribute(
    Attributes.AUTOHIDE_OVER_CONTROLS
  );
  if ([this, this.media].includes(event.target) || autohideOverControls) {
    __privateMethod2(this, _scheduleInactive, scheduleInactive_fn).call(this);
  }
};
_handlePointerUp = /* @__PURE__ */ new WeakSet();
handlePointerUp_fn = function(event) {
  if (event.pointerType === "touch") {
    const controlsVisible = !this.hasAttribute(Attributes.USER_INACTIVE);
    if ([this, this.media].includes(event.target) && controlsVisible) {
      __privateMethod2(this, _setInactive, setInactive_fn).call(this);
    } else {
      __privateMethod2(this, _scheduleInactive, scheduleInactive_fn).call(this);
    }
  } else if (event.composedPath().some(
    (el) => ["media-play-button", "media-fullscreen-button"].includes(
      el == null ? void 0 : el.localName
    )
  )) {
    __privateMethod2(this, _scheduleInactive, scheduleInactive_fn).call(this);
  }
};
_setInactive = /* @__PURE__ */ new WeakSet();
setInactive_fn = function() {
  if (__privateGet3(this, _autohide) < 0)
    return;
  if (this.hasAttribute(Attributes.USER_INACTIVE))
    return;
  this.setAttribute(Attributes.USER_INACTIVE, "");
  const evt = new GlobalThis.CustomEvent(
    MediaStateChangeEvents.USER_INACTIVE_CHANGE,
    { composed: true, bubbles: true, detail: true }
  );
  this.dispatchEvent(evt);
};
_setActive = /* @__PURE__ */ new WeakSet();
setActive_fn = function() {
  if (!this.hasAttribute(Attributes.USER_INACTIVE))
    return;
  this.removeAttribute(Attributes.USER_INACTIVE);
  const evt = new GlobalThis.CustomEvent(
    MediaStateChangeEvents.USER_INACTIVE_CHANGE,
    { composed: true, bubbles: true, detail: false }
  );
  this.dispatchEvent(evt);
};
_scheduleInactive = /* @__PURE__ */ new WeakSet();
scheduleInactive_fn = function() {
  __privateMethod2(this, _setActive, setActive_fn).call(this);
  clearTimeout(__privateGet3(this, _inactiveTimeout));
  const autohide = parseInt(this.autohide);
  if (autohide < 0)
    return;
  __privateSet3(this, _inactiveTimeout, setTimeout(() => {
    __privateMethod2(this, _setInactive, setInactive_fn).call(this);
  }, autohide * 1e3));
};
MediaContainer.shadowRootOptions = { mode: "open" };
MediaContainer.getTemplateHTML = getTemplateHTML2;
if (!GlobalThis.customElements.get("media-container")) {
  GlobalThis.customElements.define("media-container", MediaContainer);
}

// node_modules/media-chrome/dist/utils/attribute-token-list.js
var __accessCheck3 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet4 = (obj, member, getter) => {
  __accessCheck3(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd4 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet4 = (obj, member, value, setter) => {
  __accessCheck3(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _el;
var _attr;
var _defaultSet;
var _tokenSet;
var _tokens;
var tokens_get;
var AttributeTokenList = class {
  constructor(el, attr, { defaultValue } = { defaultValue: void 0 }) {
    __privateAdd4(this, _tokens);
    __privateAdd4(this, _el, void 0);
    __privateAdd4(this, _attr, void 0);
    __privateAdd4(this, _defaultSet, void 0);
    __privateAdd4(this, _tokenSet, /* @__PURE__ */ new Set());
    __privateSet4(this, _el, el);
    __privateSet4(this, _attr, attr);
    __privateSet4(this, _defaultSet, new Set(defaultValue));
  }
  [Symbol.iterator]() {
    return __privateGet4(this, _tokens, tokens_get).values();
  }
  get length() {
    return __privateGet4(this, _tokens, tokens_get).size;
  }
  get value() {
    var _a4;
    return (_a4 = [...__privateGet4(this, _tokens, tokens_get)].join(" ")) != null ? _a4 : "";
  }
  set value(val) {
    var _a4;
    if (val === this.value)
      return;
    __privateSet4(this, _tokenSet, /* @__PURE__ */ new Set());
    this.add(...(_a4 = val == null ? void 0 : val.split(" ")) != null ? _a4 : []);
  }
  toString() {
    return this.value;
  }
  item(index) {
    return [...__privateGet4(this, _tokens, tokens_get)][index];
  }
  values() {
    return __privateGet4(this, _tokens, tokens_get).values();
  }
  forEach(callback, thisArg) {
    __privateGet4(this, _tokens, tokens_get).forEach(callback, thisArg);
  }
  add(...tokens) {
    var _a4, _b;
    tokens.forEach((t3) => __privateGet4(this, _tokenSet).add(t3));
    if (this.value === "" && !((_a4 = __privateGet4(this, _el)) == null ? void 0 : _a4.hasAttribute(`${__privateGet4(this, _attr)}`))) {
      return;
    }
    (_b = __privateGet4(this, _el)) == null ? void 0 : _b.setAttribute(`${__privateGet4(this, _attr)}`, `${this.value}`);
  }
  remove(...tokens) {
    var _a4;
    tokens.forEach((t3) => __privateGet4(this, _tokenSet).delete(t3));
    (_a4 = __privateGet4(this, _el)) == null ? void 0 : _a4.setAttribute(`${__privateGet4(this, _attr)}`, `${this.value}`);
  }
  contains(token) {
    return __privateGet4(this, _tokens, tokens_get).has(token);
  }
  toggle(token, force) {
    if (typeof force !== "undefined") {
      if (force) {
        this.add(token);
        return true;
      } else {
        this.remove(token);
        return false;
      }
    }
    if (this.contains(token)) {
      this.remove(token);
      return false;
    }
    this.add(token);
    return true;
  }
  replace(oldToken, newToken) {
    this.remove(oldToken);
    this.add(newToken);
    return oldToken === newToken;
  }
};
_el = /* @__PURE__ */ new WeakMap();
_attr = /* @__PURE__ */ new WeakMap();
_defaultSet = /* @__PURE__ */ new WeakMap();
_tokenSet = /* @__PURE__ */ new WeakMap();
_tokens = /* @__PURE__ */ new WeakSet();
tokens_get = function() {
  return __privateGet4(this, _tokenSet).size ? __privateGet4(this, _tokenSet) : __privateGet4(this, _defaultSet);
};

// node_modules/media-chrome/dist/utils/captions.js
var splitTextTracksStr = (textTracksStr = "") => textTracksStr.split(/\s+/);
var parseTextTrackStr = (textTrackStr = "") => {
  const [kind, language, encodedLabel] = textTrackStr.split(":");
  const label = encodedLabel ? decodeURIComponent(encodedLabel) : void 0;
  return {
    kind: kind === "cc" ? TextTrackKinds.CAPTIONS : TextTrackKinds.SUBTITLES,
    language,
    label
  };
};
var parseTextTracksStr = (textTracksStr = "", textTrackLikeObj = {}) => {
  return splitTextTracksStr(textTracksStr).map((textTrackStr) => {
    const textTrackObj = parseTextTrackStr(textTrackStr);
    return {
      ...textTrackLikeObj,
      ...textTrackObj
    };
  });
};
var parseTracks = (trackOrTracks) => {
  if (!trackOrTracks)
    return [];
  if (Array.isArray(trackOrTracks)) {
    return trackOrTracks.map((trackObjOrStr) => {
      if (typeof trackObjOrStr === "string") {
        return parseTextTrackStr(trackObjOrStr);
      }
      return trackObjOrStr;
    });
  }
  if (typeof trackOrTracks === "string") {
    return parseTextTracksStr(trackOrTracks);
  }
  return [trackOrTracks];
};
var formatTextTrackObj = ({ kind, label, language } = { kind: "subtitles" }) => {
  if (!label)
    return language;
  return `${kind === "captions" ? "cc" : "sb"}:${language}:${encodeURIComponent(
    label
  )}`;
};
var stringifyTextTrackList = (textTracks = []) => {
  return Array.prototype.map.call(textTracks, formatTextTrackObj).join(" ");
};
var isMatchingPropOf = (key, value) => (obj) => obj[key] === value;
var textTrackObjAsPred = (filterObj) => {
  const preds = Object.entries(filterObj).map(([key, value]) => {
    return isMatchingPropOf(key, value);
  });
  return (textTrack) => preds.every((pred) => pred(textTrack));
};
var updateTracksModeTo = (mode, tracks = [], tracksToUpdate = []) => {
  const preds = parseTracks(tracksToUpdate).map(textTrackObjAsPred);
  const isTrackToUpdate = (textTrack) => {
    return preds.some((pred) => pred(textTrack));
  };
  Array.from(tracks).filter(isTrackToUpdate).forEach((textTrack) => {
    textTrack.mode = mode;
  });
};
var getTextTracksList = (media, filterPredOrObj = () => true) => {
  if (!(media == null ? void 0 : media.textTracks))
    return [];
  const filterPred = typeof filterPredOrObj === "function" ? filterPredOrObj : textTrackObjAsPred(filterPredOrObj);
  return Array.from(media.textTracks).filter(filterPred);
};
var areSubsOn = (el) => {
  var _a4;
  const showingSubtitles = !!((_a4 = el.mediaSubtitlesShowing) == null ? void 0 : _a4.length) || el.hasAttribute(MediaUIAttributes.MEDIA_SUBTITLES_SHOWING);
  return showingSubtitles;
};

// node_modules/media-chrome/dist/utils/fullscreen-api.js
var enterFullscreen = (stateOwners) => {
  var _a4;
  const { media, fullscreenElement } = stateOwners;
  try {
    const enterFullscreenKey = fullscreenElement && "requestFullscreen" in fullscreenElement ? "requestFullscreen" : fullscreenElement && "webkitRequestFullScreen" in fullscreenElement ? "webkitRequestFullScreen" : void 0;
    if (enterFullscreenKey) {
      const maybePromise = (_a4 = fullscreenElement[enterFullscreenKey]) == null ? void 0 : _a4.call(fullscreenElement);
      if (maybePromise instanceof Promise) {
        return maybePromise.catch(() => {
        });
      }
    } else if (media == null ? void 0 : media.webkitEnterFullscreen) {
      media.webkitEnterFullscreen();
    } else if (media == null ? void 0 : media.requestFullscreen) {
      media.requestFullscreen();
    }
  } catch (e2) {
    console.error(e2);
  }
};
var exitFullscreenKey = "exitFullscreen" in Document2 ? "exitFullscreen" : "webkitExitFullscreen" in Document2 ? "webkitExitFullscreen" : "webkitCancelFullScreen" in Document2 ? "webkitCancelFullScreen" : void 0;
var exitFullscreen = (stateOwners) => {
  var _a4;
  const { documentElement } = stateOwners;
  if (exitFullscreenKey) {
    const maybePromise = (_a4 = documentElement == null ? void 0 : documentElement[exitFullscreenKey]) == null ? void 0 : _a4.call(documentElement);
    if (maybePromise instanceof Promise) {
      return maybePromise.catch(() => {
      });
    }
  }
};
var fullscreenElementKey = "fullscreenElement" in Document2 ? "fullscreenElement" : "webkitFullscreenElement" in Document2 ? "webkitFullscreenElement" : void 0;
var getFullscreenElement = (stateOwners) => {
  const { documentElement, media } = stateOwners;
  const docFullscreenElement = documentElement == null ? void 0 : documentElement[fullscreenElementKey];
  if (!docFullscreenElement && "webkitDisplayingFullscreen" in media && "webkitPresentationMode" in media && media.webkitDisplayingFullscreen && media.webkitPresentationMode === WebkitPresentationModes.FULLSCREEN) {
    return media;
  }
  return docFullscreenElement;
};
var isFullscreen = (stateOwners) => {
  var _a4;
  const { media, documentElement, fullscreenElement = media } = stateOwners;
  if (!media || !documentElement)
    return false;
  const currentFullscreenElement = getFullscreenElement(stateOwners);
  if (!currentFullscreenElement)
    return false;
  if (currentFullscreenElement === fullscreenElement || currentFullscreenElement === media) {
    return true;
  }
  if (currentFullscreenElement.localName.includes("-")) {
    let currentRoot = currentFullscreenElement.shadowRoot;
    if (!(fullscreenElementKey in currentRoot)) {
      return containsComposedNode(
        currentFullscreenElement,
        /** @TODO clean up type assumptions (e.g. Node) (CJP) */
        // @ts-ignore
        fullscreenElement
      );
    }
    while (currentRoot == null ? void 0 : currentRoot[fullscreenElementKey]) {
      if (currentRoot[fullscreenElementKey] === fullscreenElement)
        return true;
      currentRoot = (_a4 = currentRoot[fullscreenElementKey]) == null ? void 0 : _a4.shadowRoot;
    }
  }
  return false;
};
var fullscreenEnabledKey = "fullscreenEnabled" in Document2 ? "fullscreenEnabled" : "webkitFullscreenEnabled" in Document2 ? "webkitFullscreenEnabled" : void 0;
var isFullscreenEnabled = (stateOwners) => {
  const { documentElement, media } = stateOwners;
  return !!(documentElement == null ? void 0 : documentElement[fullscreenEnabledKey]) || media && "webkitSupportsFullscreen" in media;
};

// node_modules/media-chrome/dist/utils/platform-tests.js
var testMediaEl;
var getTestMediaEl = () => {
  var _a4, _b;
  if (testMediaEl)
    return testMediaEl;
  testMediaEl = (_b = (_a4 = Document2) == null ? void 0 : _a4.createElement) == null ? void 0 : _b.call(_a4, "video");
  return testMediaEl;
};
var hasVolumeSupportAsync = async (mediaEl = getTestMediaEl()) => {
  if (!mediaEl)
    return false;
  const prevVolume = mediaEl.volume;
  mediaEl.volume = prevVolume / 2 + 0.1;
  const abortController = new AbortController();
  const volumeSupported2 = await Promise.race([
    dispatchedVolumeChange(mediaEl, abortController.signal),
    volumeChanged(mediaEl, prevVolume)
  ]);
  abortController.abort();
  return volumeSupported2;
};
var dispatchedVolumeChange = (mediaEl, signal) => {
  return new Promise((resolve) => {
    mediaEl.addEventListener("volumechange", () => resolve(true), { signal });
  });
};
var volumeChanged = async (mediaEl, prevVolume) => {
  for (let i2 = 0; i2 < 10; i2++) {
    if (mediaEl.volume === prevVolume)
      return false;
    await delay(10);
  }
  return mediaEl.volume !== prevVolume;
};
var isSafari = /.*Version\/.*Safari\/.*/.test(
  GlobalThis.navigator.userAgent
);
var hasPipSupport = (mediaEl = getTestMediaEl()) => {
  if (GlobalThis.matchMedia("(display-mode: standalone)").matches && isSafari)
    return false;
  return typeof (mediaEl == null ? void 0 : mediaEl.requestPictureInPicture) === "function";
};
var hasFullscreenSupport = (mediaEl = getTestMediaEl()) => {
  return isFullscreenEnabled({ documentElement: Document2, media: mediaEl });
};
var fullscreenSupported = hasFullscreenSupport();
var pipSupported = hasPipSupport();
var airplaySupported = !!GlobalThis.WebKitPlaybackTargetAvailabilityEvent;
var castSupported = !!GlobalThis.chrome;

// node_modules/media-chrome/dist/media-store/util.js
var getSubtitleTracks = (stateOwners) => {
  return getTextTracksList(stateOwners.media, (textTrack) => {
    return [TextTrackKinds.SUBTITLES, TextTrackKinds.CAPTIONS].includes(
      textTrack.kind
    );
  }).sort((a3, b4) => a3.kind >= b4.kind ? 1 : -1);
};
var getShowingSubtitleTracks = (stateOwners) => {
  return getTextTracksList(stateOwners.media, (textTrack) => {
    return textTrack.mode === TextTrackModes.SHOWING && [TextTrackKinds.SUBTITLES, TextTrackKinds.CAPTIONS].includes(
      textTrack.kind
    );
  });
};
var toggleSubtitleTracks = (stateOwners, force) => {
  const tracks = getSubtitleTracks(stateOwners);
  const showingSubitleTracks = getShowingSubtitleTracks(stateOwners);
  const subtitlesShowing = !!showingSubitleTracks.length;
  if (!tracks.length)
    return;
  if (force === false || subtitlesShowing && force !== true) {
    updateTracksModeTo(TextTrackModes.DISABLED, tracks, showingSubitleTracks);
  } else if (force === true || !subtitlesShowing && force !== false) {
    let subTrack = tracks[0];
    const { options } = stateOwners;
    if (!(options == null ? void 0 : options.noSubtitlesLangPref)) {
      const subtitlesPref = globalThis.localStorage.getItem(
        "media-chrome-pref-subtitles-lang"
      );
      const userLangPrefs = subtitlesPref ? [subtitlesPref, ...globalThis.navigator.languages] : globalThis.navigator.languages;
      const preferredAvailableSubs = tracks.filter((textTrack) => {
        return userLangPrefs.some(
          (lang) => textTrack.language.toLowerCase().startsWith(lang.split("-")[0])
        );
      }).sort((textTrackA, textTrackB) => {
        const idxA = userLangPrefs.findIndex(
          (lang) => textTrackA.language.toLowerCase().startsWith(lang.split("-")[0])
        );
        const idxB = userLangPrefs.findIndex(
          (lang) => textTrackB.language.toLowerCase().startsWith(lang.split("-")[0])
        );
        return idxA - idxB;
      });
      if (preferredAvailableSubs[0]) {
        subTrack = preferredAvailableSubs[0];
      }
    }
    const { language, label, kind } = subTrack;
    updateTracksModeTo(TextTrackModes.DISABLED, tracks, showingSubitleTracks);
    updateTracksModeTo(TextTrackModes.SHOWING, tracks, [
      { language, label, kind }
    ]);
  }
};
var areValuesEq = (x7, y5) => {
  if (x7 === y5)
    return true;
  if (x7 == null || y5 == null)
    return false;
  if (typeof x7 !== typeof y5)
    return false;
  if (typeof x7 === "number" && Number.isNaN(x7) && Number.isNaN(y5))
    return true;
  if (typeof x7 !== "object")
    return false;
  if (Array.isArray(x7))
    return areArraysEq(x7, y5);
  return Object.entries(x7).every(
    // NOTE: Checking key in y to disambiguate between between missing keys and keys whose value are undefined (CJP)
    ([key, value]) => key in y5 && areValuesEq(value, y5[key])
  );
};
var areArraysEq = (xs, ys) => {
  const xIsArray = Array.isArray(xs);
  const yIsArray = Array.isArray(ys);
  if (xIsArray !== yIsArray)
    return false;
  if (!(xIsArray || yIsArray))
    return true;
  if (xs.length !== ys.length)
    return false;
  return xs.every((x7, i2) => areValuesEq(x7, ys[i2]));
};

// node_modules/media-chrome/dist/media-store/state-mediator.js
var StreamTypeValues = Object.values(StreamTypes);
var volumeSupported;
var volumeSupportPromise = hasVolumeSupportAsync().then((supported) => {
  volumeSupported = supported;
  return volumeSupported;
});
var prepareStateOwners = async (...stateOwners) => {
  await Promise.all(
    stateOwners.filter((x7) => x7).map(async (stateOwner) => {
      if (!("localName" in stateOwner && stateOwner instanceof GlobalThis.HTMLElement)) {
        return;
      }
      const name = stateOwner.localName;
      if (!name.includes("-"))
        return;
      const classDef = GlobalThis.customElements.get(name);
      if (classDef && stateOwner instanceof classDef)
        return;
      await GlobalThis.customElements.whenDefined(name);
      GlobalThis.customElements.upgrade(stateOwner);
    })
  );
};
var domParser = new GlobalThis.DOMParser();
var parseHtmlToText = (text) => text ? domParser.parseFromString(text, "text/html").body.textContent || text : text;
var stateMediator = {
  mediaError: {
    get(stateOwners, event) {
      const { media } = stateOwners;
      if ((event == null ? void 0 : event.type) === "playing")
        return;
      return media == null ? void 0 : media.error;
    },
    mediaEvents: ["emptied", "error", "playing"]
  },
  mediaErrorCode: {
    get(stateOwners, event) {
      var _a4;
      const { media } = stateOwners;
      if ((event == null ? void 0 : event.type) === "playing")
        return;
      return (_a4 = media == null ? void 0 : media.error) == null ? void 0 : _a4.code;
    },
    mediaEvents: ["emptied", "error", "playing"]
  },
  mediaErrorMessage: {
    get(stateOwners, event) {
      var _a4, _b;
      const { media } = stateOwners;
      if ((event == null ? void 0 : event.type) === "playing")
        return;
      return (_b = (_a4 = media == null ? void 0 : media.error) == null ? void 0 : _a4.message) != null ? _b : "";
    },
    mediaEvents: ["emptied", "error", "playing"]
  },
  mediaWidth: {
    get(stateOwners) {
      var _a4;
      const { media } = stateOwners;
      return (_a4 = media == null ? void 0 : media.videoWidth) != null ? _a4 : 0;
    },
    mediaEvents: ["resize"]
  },
  mediaHeight: {
    get(stateOwners) {
      var _a4;
      const { media } = stateOwners;
      return (_a4 = media == null ? void 0 : media.videoHeight) != null ? _a4 : 0;
    },
    mediaEvents: ["resize"]
  },
  mediaPaused: {
    get(stateOwners) {
      var _a4;
      const { media } = stateOwners;
      return (_a4 = media == null ? void 0 : media.paused) != null ? _a4 : true;
    },
    set(value, stateOwners) {
      var _a4;
      const { media } = stateOwners;
      if (!media)
        return;
      if (value) {
        media.pause();
      } else {
        (_a4 = media.play()) == null ? void 0 : _a4.catch(() => {
        });
      }
    },
    mediaEvents: ["play", "playing", "pause", "emptied"]
  },
  mediaHasPlayed: {
    // We want to let the user know that the media started playing at any point (`media-has-played`).
    // Since these propagators are all called when boostrapping state, let's verify this is
    // a real playing event by checking that 1) there's media and 2) it isn't currently paused.
    get(stateOwners, event) {
      const { media } = stateOwners;
      if (!media)
        return false;
      if (!event)
        return !media.paused;
      return event.type === "playing";
    },
    mediaEvents: ["playing", "emptied"]
  },
  mediaEnded: {
    get(stateOwners) {
      var _a4;
      const { media } = stateOwners;
      return (_a4 = media == null ? void 0 : media.ended) != null ? _a4 : false;
    },
    mediaEvents: ["seeked", "ended", "emptied"]
  },
  mediaPlaybackRate: {
    get(stateOwners) {
      var _a4;
      const { media } = stateOwners;
      return (_a4 = media == null ? void 0 : media.playbackRate) != null ? _a4 : 1;
    },
    set(value, stateOwners) {
      const { media } = stateOwners;
      if (!media)
        return;
      if (!Number.isFinite(+value))
        return;
      media.playbackRate = +value;
    },
    mediaEvents: ["ratechange", "loadstart"]
  },
  mediaMuted: {
    get(stateOwners) {
      var _a4;
      const { media } = stateOwners;
      return (_a4 = media == null ? void 0 : media.muted) != null ? _a4 : false;
    },
    set(value, stateOwners) {
      const { media } = stateOwners;
      if (!media)
        return;
      try {
        GlobalThis.localStorage.setItem(
          "media-chrome-pref-muted",
          value ? "true" : "false"
        );
      } catch (e2) {
        console.debug("Error setting muted pref", e2);
      }
      media.muted = value;
    },
    mediaEvents: ["volumechange"],
    stateOwnersUpdateHandlers: [
      (handler, stateOwners) => {
        const {
          options: { noMutedPref }
        } = stateOwners;
        const { media } = stateOwners;
        if (!media || media.muted || noMutedPref)
          return;
        try {
          const mutedPref = GlobalThis.localStorage.getItem("media-chrome-pref-muted") === "true";
          stateMediator.mediaMuted.set(mutedPref, stateOwners);
          handler(mutedPref);
        } catch (e2) {
          console.debug("Error getting muted pref", e2);
        }
      }
    ]
  },
  mediaVolume: {
    get(stateOwners) {
      var _a4;
      const { media } = stateOwners;
      return (_a4 = media == null ? void 0 : media.volume) != null ? _a4 : 1;
    },
    set(value, stateOwners) {
      const { media } = stateOwners;
      if (!media)
        return;
      try {
        if (value == null) {
          GlobalThis.localStorage.removeItem("media-chrome-pref-volume");
        } else {
          GlobalThis.localStorage.setItem(
            "media-chrome-pref-volume",
            value.toString()
          );
        }
      } catch (e2) {
        console.debug("Error setting volume pref", e2);
      }
      if (!Number.isFinite(+value))
        return;
      media.volume = +value;
    },
    mediaEvents: ["volumechange"],
    stateOwnersUpdateHandlers: [
      (handler, stateOwners) => {
        const {
          options: { noVolumePref }
        } = stateOwners;
        if (noVolumePref)
          return;
        try {
          const { media } = stateOwners;
          if (!media)
            return;
          const volumePref = GlobalThis.localStorage.getItem(
            "media-chrome-pref-volume"
          );
          if (volumePref == null)
            return;
          stateMediator.mediaVolume.set(+volumePref, stateOwners);
          handler(+volumePref);
        } catch (e2) {
          console.debug("Error getting volume pref", e2);
        }
      }
    ]
  },
  // NOTE: Keeping this roughly equivalent to prior impl to reduce number of changes,
  // however we may want to model "derived" state differently from "primary" state
  // (in this case, derived === mediaVolumeLevel, primary === mediaMuted, mediaVolume) (CJP)
  mediaVolumeLevel: {
    get(stateOwners) {
      const { media } = stateOwners;
      if (typeof (media == null ? void 0 : media.volume) == "undefined")
        return "high";
      if (media.muted || media.volume === 0)
        return "off";
      if (media.volume < 0.5)
        return "low";
      if (media.volume < 0.75)
        return "medium";
      return "high";
    },
    mediaEvents: ["volumechange"]
  },
  mediaCurrentTime: {
    get(stateOwners) {
      var _a4;
      const { media } = stateOwners;
      return (_a4 = media == null ? void 0 : media.currentTime) != null ? _a4 : 0;
    },
    set(value, stateOwners) {
      const { media } = stateOwners;
      if (!media || !isValidNumber(value))
        return;
      media.currentTime = value;
    },
    mediaEvents: ["timeupdate", "loadedmetadata"]
  },
  mediaDuration: {
    get(stateOwners) {
      const { media, options: { defaultDuration } = {} } = stateOwners;
      if (defaultDuration && (!media || !media.duration || Number.isNaN(media.duration) || !Number.isFinite(media.duration))) {
        return defaultDuration;
      }
      return Number.isFinite(media == null ? void 0 : media.duration) ? media.duration : Number.NaN;
    },
    mediaEvents: ["durationchange", "loadedmetadata", "emptied"]
  },
  mediaLoading: {
    get(stateOwners) {
      const { media } = stateOwners;
      return (media == null ? void 0 : media.readyState) < 3;
    },
    mediaEvents: ["waiting", "playing", "emptied"]
  },
  mediaSeekable: {
    get(stateOwners) {
      var _a4;
      const { media } = stateOwners;
      if (!((_a4 = media == null ? void 0 : media.seekable) == null ? void 0 : _a4.length))
        return void 0;
      const start = media.seekable.start(0);
      const end = media.seekable.end(media.seekable.length - 1);
      if (!start && !end)
        return void 0;
      return [Number(start.toFixed(3)), Number(end.toFixed(3))];
    },
    mediaEvents: ["loadedmetadata", "emptied", "progress", "seekablechange"]
  },
  mediaBuffered: {
    get(stateOwners) {
      var _a4;
      const { media } = stateOwners;
      const timeRanges = (_a4 = media == null ? void 0 : media.buffered) != null ? _a4 : [];
      return Array.from(timeRanges).map((_3, i2) => [
        Number(timeRanges.start(i2).toFixed(3)),
        Number(timeRanges.end(i2).toFixed(3))
      ]);
    },
    mediaEvents: ["progress", "emptied"]
  },
  mediaStreamType: {
    get(stateOwners) {
      const { media, options: { defaultStreamType } = {} } = stateOwners;
      const usedDefaultStreamType = [
        StreamTypes.LIVE,
        StreamTypes.ON_DEMAND
      ].includes(defaultStreamType) ? defaultStreamType : void 0;
      if (!media)
        return usedDefaultStreamType;
      const { streamType } = media;
      if (StreamTypeValues.includes(streamType)) {
        if (streamType === StreamTypes.UNKNOWN) {
          return usedDefaultStreamType;
        }
        return streamType;
      }
      const duration = media.duration;
      if (duration === Infinity) {
        return StreamTypes.LIVE;
      } else if (Number.isFinite(duration)) {
        return StreamTypes.ON_DEMAND;
      }
      return usedDefaultStreamType;
    },
    mediaEvents: [
      "emptied",
      "durationchange",
      "loadedmetadata",
      "streamtypechange"
    ]
  },
  mediaTargetLiveWindow: {
    get(stateOwners) {
      const { media } = stateOwners;
      if (!media)
        return Number.NaN;
      const { targetLiveWindow } = media;
      const streamType = stateMediator.mediaStreamType.get(stateOwners);
      if ((targetLiveWindow == null || Number.isNaN(targetLiveWindow)) && streamType === StreamTypes.LIVE) {
        return 0;
      }
      return targetLiveWindow;
    },
    mediaEvents: [
      "emptied",
      "durationchange",
      "loadedmetadata",
      "streamtypechange",
      "targetlivewindowchange"
    ]
  },
  mediaTimeIsLive: {
    get(stateOwners) {
      const {
        media,
        // Default to 10 seconds
        options: { liveEdgeOffset = 10 } = {}
      } = stateOwners;
      if (!media)
        return false;
      if (typeof media.liveEdgeStart === "number") {
        if (Number.isNaN(media.liveEdgeStart))
          return false;
        return media.currentTime >= media.liveEdgeStart;
      }
      const live = stateMediator.mediaStreamType.get(stateOwners) === StreamTypes.LIVE;
      if (!live)
        return false;
      const seekable = media.seekable;
      if (!seekable)
        return true;
      if (!seekable.length)
        return false;
      const liveEdgeStart = seekable.end(seekable.length - 1) - liveEdgeOffset;
      return media.currentTime >= liveEdgeStart;
    },
    mediaEvents: ["playing", "timeupdate", "progress", "waiting", "emptied"]
  },
  // Text Tracks modeling
  mediaSubtitlesList: {
    get(stateOwners) {
      return getSubtitleTracks(stateOwners).map(
        ({ kind, label, language }) => ({ kind, label, language })
      );
    },
    mediaEvents: ["loadstart"],
    textTracksEvents: ["addtrack", "removetrack"]
  },
  mediaSubtitlesShowing: {
    get(stateOwners) {
      return getShowingSubtitleTracks(stateOwners).map(
        ({ kind, label, language }) => ({ kind, label, language })
      );
    },
    mediaEvents: ["loadstart"],
    textTracksEvents: ["addtrack", "removetrack", "change"],
    stateOwnersUpdateHandlers: [
      (_handler, stateOwners) => {
        var _a4, _b;
        const { media, options } = stateOwners;
        if (!media)
          return;
        const updateDefaultSubtitlesCallback = (event) => {
          var _a22;
          if (!options.defaultSubtitles)
            return;
          const nonSubsEvent = event && ![TextTrackKinds.CAPTIONS, TextTrackKinds.SUBTITLES].includes(
            // @ts-ignore
            (_a22 = event == null ? void 0 : event.track) == null ? void 0 : _a22.kind
          );
          if (nonSubsEvent)
            return;
          toggleSubtitleTracks(stateOwners, true);
        };
        media.addEventListener(
          "loadstart",
          updateDefaultSubtitlesCallback
        );
        (_a4 = media.textTracks) == null ? void 0 : _a4.addEventListener(
          "addtrack",
          updateDefaultSubtitlesCallback
        );
        (_b = media.textTracks) == null ? void 0 : _b.addEventListener(
          "removetrack",
          updateDefaultSubtitlesCallback
        );
        return () => {
          var _a22, _b2;
          media.removeEventListener(
            "loadstart",
            updateDefaultSubtitlesCallback
          );
          (_a22 = media.textTracks) == null ? void 0 : _a22.removeEventListener(
            "addtrack",
            updateDefaultSubtitlesCallback
          );
          (_b2 = media.textTracks) == null ? void 0 : _b2.removeEventListener(
            "removetrack",
            updateDefaultSubtitlesCallback
          );
        };
      }
    ]
  },
  mediaChaptersCues: {
    get(stateOwners) {
      var _a4;
      const { media } = stateOwners;
      if (!media)
        return [];
      const [chaptersTrack] = getTextTracksList(media, {
        kind: TextTrackKinds.CHAPTERS
      });
      return Array.from((_a4 = chaptersTrack == null ? void 0 : chaptersTrack.cues) != null ? _a4 : []).map(
        ({ text, startTime, endTime }) => ({
          text: parseHtmlToText(text),
          startTime,
          endTime
        })
      );
    },
    mediaEvents: ["loadstart", "loadedmetadata"],
    textTracksEvents: ["addtrack", "removetrack", "change"],
    stateOwnersUpdateHandlers: [
      (handler, stateOwners) => {
        var _a4;
        const { media } = stateOwners;
        if (!media)
          return;
        const chaptersTrack = media.querySelector(
          'track[kind="chapters"][default][src]'
        );
        const shadowChaptersTrack = (_a4 = media.shadowRoot) == null ? void 0 : _a4.querySelector(
          ':is(video,audio) > track[kind="chapters"][default][src]'
        );
        chaptersTrack == null ? void 0 : chaptersTrack.addEventListener("load", handler);
        shadowChaptersTrack == null ? void 0 : shadowChaptersTrack.addEventListener("load", handler);
        return () => {
          chaptersTrack == null ? void 0 : chaptersTrack.removeEventListener("load", handler);
          shadowChaptersTrack == null ? void 0 : shadowChaptersTrack.removeEventListener("load", handler);
        };
      }
    ]
  },
  // Modeling state tied to root node
  mediaIsPip: {
    get(stateOwners) {
      var _a4, _b;
      const { media, documentElement } = stateOwners;
      if (!media || !documentElement)
        return false;
      if (!documentElement.pictureInPictureElement)
        return false;
      if (documentElement.pictureInPictureElement === media)
        return true;
      if (documentElement.pictureInPictureElement instanceof HTMLMediaElement) {
        if (!((_a4 = media.localName) == null ? void 0 : _a4.includes("-")))
          return false;
        return containsComposedNode(
          media,
          documentElement.pictureInPictureElement
        );
      }
      if (documentElement.pictureInPictureElement.localName.includes("-")) {
        let currentRoot = documentElement.pictureInPictureElement.shadowRoot;
        while (currentRoot == null ? void 0 : currentRoot.pictureInPictureElement) {
          if (currentRoot.pictureInPictureElement === media)
            return true;
          currentRoot = (_b = currentRoot.pictureInPictureElement) == null ? void 0 : _b.shadowRoot;
        }
      }
      return false;
    },
    set(value, stateOwners) {
      const { media } = stateOwners;
      if (!media)
        return;
      if (value) {
        if (!Document2.pictureInPictureEnabled) {
          console.warn("MediaChrome: Picture-in-picture is not enabled");
          return;
        }
        if (!media.requestPictureInPicture) {
          console.warn(
            "MediaChrome: The current media does not support picture-in-picture"
          );
          return;
        }
        const warnNotReady = () => {
          console.warn(
            "MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0."
          );
        };
        media.requestPictureInPicture().catch((err) => {
          if (err.code === 11) {
            if (!media.src) {
              console.warn(
                "MediaChrome: The media is not ready for picture-in-picture. It must have a src set."
              );
              return;
            }
            if (media.readyState === 0 && media.preload === "none") {
              const cleanup = () => {
                media.removeEventListener("loadedmetadata", tryPip);
                media.preload = "none";
              };
              const tryPip = () => {
                media.requestPictureInPicture().catch(warnNotReady);
                cleanup();
              };
              media.addEventListener("loadedmetadata", tryPip);
              media.preload = "metadata";
              setTimeout(() => {
                if (media.readyState === 0)
                  warnNotReady();
                cleanup();
              }, 1e3);
            } else {
              throw err;
            }
          } else {
            throw err;
          }
        });
      } else if (Document2.pictureInPictureElement) {
        Document2.exitPictureInPicture();
      }
    },
    mediaEvents: ["enterpictureinpicture", "leavepictureinpicture"]
  },
  mediaRenditionList: {
    get(stateOwners) {
      var _a4;
      const { media } = stateOwners;
      return [...(_a4 = media == null ? void 0 : media.videoRenditions) != null ? _a4 : []].map((videoRendition) => ({
        ...videoRendition
      }));
    },
    mediaEvents: ["emptied", "loadstart"],
    videoRenditionsEvents: ["addrendition", "removerendition"]
  },
  /** @TODO Model this as a derived value? (CJP) */
  mediaRenditionSelected: {
    get(stateOwners) {
      var _a4, _b, _c;
      const { media } = stateOwners;
      return (_c = (_b = media == null ? void 0 : media.videoRenditions) == null ? void 0 : _b[(_a4 = media.videoRenditions) == null ? void 0 : _a4.selectedIndex]) == null ? void 0 : _c.id;
    },
    set(value, stateOwners) {
      const { media } = stateOwners;
      if (!(media == null ? void 0 : media.videoRenditions)) {
        console.warn(
          "MediaController: Rendition selection not supported by this media."
        );
        return;
      }
      const renditionId = value;
      const index = Array.prototype.findIndex.call(
        media.videoRenditions,
        (r12) => r12.id == renditionId
      );
      if (media.videoRenditions.selectedIndex != index) {
        media.videoRenditions.selectedIndex = index;
      }
    },
    mediaEvents: ["emptied"],
    videoRenditionsEvents: ["addrendition", "removerendition", "change"]
  },
  mediaAudioTrackList: {
    get(stateOwners) {
      var _a4;
      const { media } = stateOwners;
      return [...(_a4 = media == null ? void 0 : media.audioTracks) != null ? _a4 : []];
    },
    mediaEvents: ["emptied", "loadstart"],
    audioTracksEvents: ["addtrack", "removetrack"]
  },
  mediaAudioTrackEnabled: {
    get(stateOwners) {
      var _a4, _b;
      const { media } = stateOwners;
      return (_b = [...(_a4 = media == null ? void 0 : media.audioTracks) != null ? _a4 : []].find(
        (audioTrack) => audioTrack.enabled
      )) == null ? void 0 : _b.id;
    },
    set(value, stateOwners) {
      const { media } = stateOwners;
      if (!(media == null ? void 0 : media.audioTracks)) {
        console.warn(
          "MediaChrome: Audio track selection not supported by this media."
        );
        return;
      }
      const audioTrackId = value;
      for (const track of media.audioTracks) {
        track.enabled = audioTrackId == track.id;
      }
    },
    mediaEvents: ["emptied"],
    audioTracksEvents: ["addtrack", "removetrack", "change"]
  },
  mediaIsFullscreen: {
    get(stateOwners) {
      return isFullscreen(stateOwners);
    },
    set(value, stateOwners) {
      if (!value) {
        exitFullscreen(stateOwners);
      } else {
        enterFullscreen(stateOwners);
      }
    },
    // older Safari version may require webkit-specific events
    rootEvents: ["fullscreenchange", "webkitfullscreenchange"],
    // iOS requires webkit-specific events on the video.
    mediaEvents: [
      "webkitbeginfullscreen",
      "webkitendfullscreen",
      "webkitpresentationmodechanged"
    ]
  },
  mediaIsCasting: {
    // Note this relies on a customized castable-video element.
    get(stateOwners) {
      var _a4;
      const { media } = stateOwners;
      if (!(media == null ? void 0 : media.remote) || ((_a4 = media.remote) == null ? void 0 : _a4.state) === "disconnected")
        return false;
      return !!media.remote.state;
    },
    set(value, stateOwners) {
      var _a4, _b;
      const { media } = stateOwners;
      if (!media)
        return;
      if (value && ((_a4 = media.remote) == null ? void 0 : _a4.state) !== "disconnected")
        return;
      if (!value && ((_b = media.remote) == null ? void 0 : _b.state) !== "connected")
        return;
      if (typeof media.remote.prompt !== "function") {
        console.warn(
          "MediaChrome: Casting is not supported in this environment"
        );
        return;
      }
      media.remote.prompt().catch(() => {
      });
    },
    remoteEvents: ["connect", "connecting", "disconnect"]
  },
  // NOTE: Newly added state for tracking airplaying
  mediaIsAirplaying: {
    // NOTE: Cannot know if airplaying since Safari doesn't fully support HTMLMediaElement::remote yet (e.g. remote::state) (CJP)
    get() {
      return false;
    },
    set(_value2, stateOwners) {
      const { media } = stateOwners;
      if (!media)
        return;
      if (!(media.webkitShowPlaybackTargetPicker && GlobalThis.WebKitPlaybackTargetAvailabilityEvent)) {
        console.error(
          "MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment"
        );
        return;
      }
      media.webkitShowPlaybackTargetPicker();
    },
    mediaEvents: ["webkitcurrentplaybacktargetiswirelesschanged"]
  },
  mediaFullscreenUnavailable: {
    get(stateOwners) {
      const { media } = stateOwners;
      if (!fullscreenSupported || !hasFullscreenSupport(media))
        return AvailabilityStates.UNSUPPORTED;
      return void 0;
    }
  },
  mediaPipUnavailable: {
    get(stateOwners) {
      const { media } = stateOwners;
      if (!pipSupported || !hasPipSupport(media))
        return AvailabilityStates.UNSUPPORTED;
    }
  },
  mediaVolumeUnavailable: {
    get(stateOwners) {
      const { media } = stateOwners;
      if (volumeSupported === false || (media == null ? void 0 : media.volume) == void 0) {
        return AvailabilityStates.UNSUPPORTED;
      }
      return void 0;
    },
    // NOTE: Slightly different impl here. Added generic support for
    // "stateOwnersUpdateHandlers" since the original impl had to hack around
    // race conditions. (CJP)
    stateOwnersUpdateHandlers: [
      (handler) => {
        if (volumeSupported == null) {
          volumeSupportPromise.then(
            (supported) => handler(supported ? void 0 : AvailabilityStates.UNSUPPORTED)
          );
        }
      }
    ]
  },
  mediaCastUnavailable: {
    // @ts-ignore
    get(stateOwners, { availability = "not-available" } = {}) {
      var _a4;
      const { media } = stateOwners;
      if (!castSupported || !((_a4 = media == null ? void 0 : media.remote) == null ? void 0 : _a4.state)) {
        return AvailabilityStates.UNSUPPORTED;
      }
      if (availability == null || availability === "available")
        return void 0;
      return AvailabilityStates.UNAVAILABLE;
    },
    stateOwnersUpdateHandlers: [
      (handler, stateOwners) => {
        var _a4;
        const { media } = stateOwners;
        if (!media)
          return;
        const remotePlaybackDisabled = media.disableRemotePlayback || media.hasAttribute("disableremoteplayback");
        if (!remotePlaybackDisabled) {
          (_a4 = media == null ? void 0 : media.remote) == null ? void 0 : _a4.watchAvailability((availabilityBool) => {
            const availability = availabilityBool ? "available" : "not-available";
            handler({ availability });
          }).catch((error) => {
            if (error.name === "NotSupportedError") {
              handler({ availability: null });
            } else {
              handler({ availability: "not-available" });
            }
          });
        }
        return () => {
          var _a22;
          (_a22 = media == null ? void 0 : media.remote) == null ? void 0 : _a22.cancelWatchAvailability().catch(() => {
          });
        };
      }
    ]
  },
  mediaAirplayUnavailable: {
    get(_stateOwners, event) {
      if (!airplaySupported)
        return AvailabilityStates.UNSUPPORTED;
      if ((event == null ? void 0 : event.availability) === "not-available") {
        return AvailabilityStates.UNAVAILABLE;
      }
      return void 0;
    },
    // NOTE: Keeping this event, as it's still the documented way of monitoring
    // for AirPlay availability from Apple.
    // See: https://developer.apple.com/documentation/webkitjs/adding_an_airplay_button_to_your_safari_media_controls#2940021 (CJP)
    mediaEvents: ["webkitplaybacktargetavailabilitychanged"],
    stateOwnersUpdateHandlers: [
      (handler, stateOwners) => {
        var _a4;
        const { media } = stateOwners;
        if (!media)
          return;
        const remotePlaybackDisabled = media.disableRemotePlayback || media.hasAttribute("disableremoteplayback");
        if (!remotePlaybackDisabled) {
          (_a4 = media == null ? void 0 : media.remote) == null ? void 0 : _a4.watchAvailability((availabilityBool) => {
            const availability = availabilityBool ? "available" : "not-available";
            handler({ availability });
          }).catch((error) => {
            if (error.name === "NotSupportedError") {
              handler({ availability: null });
            } else {
              handler({ availability: "not-available" });
            }
          });
        }
        return () => {
          var _a22;
          (_a22 = media == null ? void 0 : media.remote) == null ? void 0 : _a22.cancelWatchAvailability().catch(() => {
          });
        };
      }
    ]
  },
  mediaRenditionUnavailable: {
    get(stateOwners) {
      var _a4;
      const { media } = stateOwners;
      if (!(media == null ? void 0 : media.videoRenditions)) {
        return AvailabilityStates.UNSUPPORTED;
      }
      if (!((_a4 = media.videoRenditions) == null ? void 0 : _a4.length)) {
        return AvailabilityStates.UNAVAILABLE;
      }
      return void 0;
    },
    mediaEvents: ["emptied", "loadstart"],
    videoRenditionsEvents: ["addrendition", "removerendition"]
  },
  mediaAudioTrackUnavailable: {
    get(stateOwners) {
      var _a4, _b;
      const { media } = stateOwners;
      if (!(media == null ? void 0 : media.audioTracks)) {
        return AvailabilityStates.UNSUPPORTED;
      }
      if (((_b = (_a4 = media.audioTracks) == null ? void 0 : _a4.length) != null ? _b : 0) <= 1) {
        return AvailabilityStates.UNAVAILABLE;
      }
      return void 0;
    },
    mediaEvents: ["emptied", "loadstart"],
    audioTracksEvents: ["addtrack", "removetrack"]
  }
};

// node_modules/media-chrome/dist/media-store/request-map.js
var requestMap = {
  /**
   * @TODO Consider adding state to `StateMediator` for e.g. `mediaThumbnailCues` and use that for derived state here (CJP)
   */
  [MediaUIEvents.MEDIA_PREVIEW_REQUEST](stateMediator2, stateOwners, { detail }) {
    var _a4, _b, _c;
    const { media } = stateOwners;
    const mediaPreviewTime = detail != null ? detail : void 0;
    let mediaPreviewImage = void 0;
    let mediaPreviewCoords = void 0;
    if (media && mediaPreviewTime != null) {
      const [track] = getTextTracksList(media, {
        kind: TextTrackKinds.METADATA,
        label: "thumbnails"
      });
      const cue = Array.prototype.find.call((_a4 = track == null ? void 0 : track.cues) != null ? _a4 : [], (c4, i2, cs) => {
        if (i2 === 0)
          return c4.endTime > mediaPreviewTime;
        if (i2 === cs.length - 1)
          return c4.startTime <= mediaPreviewTime;
        return c4.startTime <= mediaPreviewTime && c4.endTime > mediaPreviewTime;
      });
      if (cue) {
        const base = !/'^(?:[a-z]+:)?\/\//i.test(cue.text) ? (_b = media == null ? void 0 : media.querySelector(
          'track[label="thumbnails"]'
        )) == null ? void 0 : _b.src : void 0;
        const url = new URL(cue.text, base);
        const previewCoordsStr = new URLSearchParams(url.hash).get("#xywh");
        mediaPreviewCoords = previewCoordsStr.split(",").map((numStr) => +numStr);
        mediaPreviewImage = url.href;
      }
    }
    const mediaDuration = stateMediator2.mediaDuration.get(stateOwners);
    const mediaChaptersCues = stateMediator2.mediaChaptersCues.get(stateOwners);
    let mediaPreviewChapter = (_c = mediaChaptersCues.find((c4, i2, cs) => {
      if (i2 === cs.length - 1 && mediaDuration === c4.endTime) {
        return c4.startTime <= mediaPreviewTime && c4.endTime >= mediaPreviewTime;
      }
      return c4.startTime <= mediaPreviewTime && c4.endTime > mediaPreviewTime;
    })) == null ? void 0 : _c.text;
    if (detail != null && mediaPreviewChapter == null) {
      mediaPreviewChapter = "";
    }
    return {
      mediaPreviewTime,
      mediaPreviewImage,
      mediaPreviewCoords,
      mediaPreviewChapter
    };
  },
  [MediaUIEvents.MEDIA_PAUSE_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaPaused";
    const value = true;
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_PLAY_REQUEST](stateMediator2, stateOwners) {
    var _a4, _b, _c, _d;
    const key = "mediaPaused";
    const value = false;
    const isLive = stateMediator2.mediaStreamType.get(stateOwners) === StreamTypes.LIVE;
    const canAutoSeekToLive = !((_a4 = stateOwners.options) == null ? void 0 : _a4.noAutoSeekToLive);
    const isDVR = stateMediator2.mediaTargetLiveWindow.get(stateOwners) > 0;
    if (isLive && canAutoSeekToLive && !isDVR) {
      const seekableEnd = (_b = stateMediator2.mediaSeekable.get(stateOwners)) == null ? void 0 : _b[1];
      if (seekableEnd) {
        const seekToLiveOffset = (_d = (_c = stateOwners.options) == null ? void 0 : _c.seekToLiveOffset) != null ? _d : 0;
        const liveEdgeTime = seekableEnd - seekToLiveOffset;
        stateMediator2.mediaCurrentTime.set(liveEdgeTime, stateOwners);
      }
    }
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_PLAYBACK_RATE_REQUEST](stateMediator2, stateOwners, { detail }) {
    const key = "mediaPlaybackRate";
    const value = detail;
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_MUTE_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaMuted";
    const value = true;
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_UNMUTE_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaMuted";
    const value = false;
    if (!stateMediator2.mediaVolume.get(stateOwners)) {
      stateMediator2.mediaVolume.set(0.25, stateOwners);
    }
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_VOLUME_REQUEST](stateMediator2, stateOwners, { detail }) {
    const key = "mediaVolume";
    const value = detail;
    if (value && stateMediator2.mediaMuted.get(stateOwners)) {
      stateMediator2.mediaMuted.set(false, stateOwners);
    }
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_SEEK_REQUEST](stateMediator2, stateOwners, { detail }) {
    const key = "mediaCurrentTime";
    const value = detail;
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_SEEK_TO_LIVE_REQUEST](stateMediator2, stateOwners) {
    var _a4, _b, _c;
    const key = "mediaCurrentTime";
    const seekableEnd = (_a4 = stateMediator2.mediaSeekable.get(stateOwners)) == null ? void 0 : _a4[1];
    if (Number.isNaN(Number(seekableEnd)))
      return;
    const seekToLiveOffset = (_c = (_b = stateOwners.options) == null ? void 0 : _b.seekToLiveOffset) != null ? _c : 0;
    const value = seekableEnd - seekToLiveOffset;
    stateMediator2[key].set(value, stateOwners);
  },
  // Text Tracks state change requests
  [MediaUIEvents.MEDIA_SHOW_SUBTITLES_REQUEST](_stateMediator, stateOwners, { detail }) {
    var _a4;
    const { options } = stateOwners;
    const tracks = getSubtitleTracks(stateOwners);
    const tracksToUpdate = parseTracks(detail);
    const preferredLanguage = (_a4 = tracksToUpdate[0]) == null ? void 0 : _a4.language;
    if (preferredLanguage && !options.noSubtitlesLangPref) {
      GlobalThis.localStorage.setItem(
        "media-chrome-pref-subtitles-lang",
        preferredLanguage
      );
    }
    updateTracksModeTo(TextTrackModes.SHOWING, tracks, tracksToUpdate);
  },
  [MediaUIEvents.MEDIA_DISABLE_SUBTITLES_REQUEST](_stateMediator, stateOwners, { detail }) {
    const tracks = getSubtitleTracks(stateOwners);
    const tracksToUpdate = detail != null ? detail : [];
    updateTracksModeTo(TextTrackModes.DISABLED, tracks, tracksToUpdate);
  },
  [MediaUIEvents.MEDIA_TOGGLE_SUBTITLES_REQUEST](_stateMediator, stateOwners, { detail }) {
    toggleSubtitleTracks(stateOwners, detail);
  },
  // Renditions/Tracks state change requests
  [MediaUIEvents.MEDIA_RENDITION_REQUEST](stateMediator2, stateOwners, { detail }) {
    const key = "mediaRenditionSelected";
    const value = detail;
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_AUDIO_TRACK_REQUEST](stateMediator2, stateOwners, { detail }) {
    const key = "mediaAudioTrackEnabled";
    const value = detail;
    stateMediator2[key].set(value, stateOwners);
  },
  // State change requests dependent on root node
  [MediaUIEvents.MEDIA_ENTER_PIP_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaIsPip";
    const value = true;
    if (stateMediator2.mediaIsFullscreen.get(stateOwners)) {
      stateMediator2.mediaIsFullscreen.set(false, stateOwners);
    }
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_EXIT_PIP_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaIsPip";
    const value = false;
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_ENTER_FULLSCREEN_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaIsFullscreen";
    const value = true;
    if (stateMediator2.mediaIsPip.get(stateOwners)) {
      stateMediator2.mediaIsPip.set(false, stateOwners);
    }
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_EXIT_FULLSCREEN_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaIsFullscreen";
    const value = false;
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_ENTER_CAST_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaIsCasting";
    const value = true;
    if (stateMediator2.mediaIsFullscreen.get(stateOwners)) {
      stateMediator2.mediaIsFullscreen.set(false, stateOwners);
    }
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_EXIT_CAST_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaIsCasting";
    const value = false;
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_AIRPLAY_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaIsAirplaying";
    const value = true;
    stateMediator2[key].set(value, stateOwners);
  }
};

// node_modules/media-chrome/dist/media-store/media-store.js
var createMediaStore = ({
  media,
  fullscreenElement,
  documentElement,
  stateMediator: stateMediator2 = stateMediator,
  requestMap: requestMap2 = requestMap,
  options = {},
  monitorStateOwnersOnlyWithSubscriptions = true
}) => {
  const callbacks = [];
  const stateOwners = {
    // Spreading options here since folks should not rely on holding onto references
    // for any app-level logic wrt options.
    options: { ...options }
  };
  let state = Object.freeze({
    mediaPreviewTime: void 0,
    mediaPreviewImage: void 0,
    mediaPreviewCoords: void 0,
    mediaPreviewChapter: void 0
  });
  const updateState = (nextStateDelta) => {
    if (nextStateDelta == void 0)
      return;
    if (areValuesEq(nextStateDelta, state)) {
      return;
    }
    state = Object.freeze({
      ...state,
      ...nextStateDelta
    });
    callbacks.forEach((cb) => cb(state));
  };
  const updateStateFromFacade = () => {
    const nextState = Object.entries(stateMediator2).reduce(
      (nextState2, [stateName, { get }]) => {
        nextState2[stateName] = get(stateOwners);
        return nextState2;
      },
      {}
    );
    updateState(nextState);
  };
  const stateUpdateHandlers = {};
  let nextStateOwners = void 0;
  const updateStateOwners = async (nextStateOwnersDelta, nextSubscriberCount) => {
    var _a4, _b, _c, _d, _e4, _f, _g, _h, _i2, _j, _k, _l, _m, _n, _o, _p;
    const pendingUpdate = !!nextStateOwners;
    nextStateOwners = {
      ...stateOwners,
      ...nextStateOwners != null ? nextStateOwners : {},
      ...nextStateOwnersDelta
    };
    if (pendingUpdate)
      return;
    await prepareStateOwners(...Object.values(nextStateOwnersDelta));
    const shouldTeardownFromSubscriberCount = callbacks.length > 0 && nextSubscriberCount === 0 && monitorStateOwnersOnlyWithSubscriptions;
    const mediaChanged = stateOwners.media !== nextStateOwners.media;
    const textTracksChanged = ((_a4 = stateOwners.media) == null ? void 0 : _a4.textTracks) !== ((_b = nextStateOwners.media) == null ? void 0 : _b.textTracks);
    const videoRenditionsChanged = ((_c = stateOwners.media) == null ? void 0 : _c.videoRenditions) !== ((_d = nextStateOwners.media) == null ? void 0 : _d.videoRenditions);
    const audioTracksChanged = ((_e4 = stateOwners.media) == null ? void 0 : _e4.audioTracks) !== ((_f = nextStateOwners.media) == null ? void 0 : _f.audioTracks);
    const remoteChanged = ((_g = stateOwners.media) == null ? void 0 : _g.remote) !== ((_h = nextStateOwners.media) == null ? void 0 : _h.remote);
    const rootNodeChanged = stateOwners.documentElement !== nextStateOwners.documentElement;
    const teardownMedia = !!stateOwners.media && (mediaChanged || shouldTeardownFromSubscriberCount);
    const teardownTextTracks = !!((_i2 = stateOwners.media) == null ? void 0 : _i2.textTracks) && (textTracksChanged || shouldTeardownFromSubscriberCount);
    const teardownVideoRenditions = !!((_j = stateOwners.media) == null ? void 0 : _j.videoRenditions) && (videoRenditionsChanged || shouldTeardownFromSubscriberCount);
    const teardownAudioTracks = !!((_k = stateOwners.media) == null ? void 0 : _k.audioTracks) && (audioTracksChanged || shouldTeardownFromSubscriberCount);
    const teardownRemote = !!((_l = stateOwners.media) == null ? void 0 : _l.remote) && (remoteChanged || shouldTeardownFromSubscriberCount);
    const teardownRootNode = !!stateOwners.documentElement && (rootNodeChanged || shouldTeardownFromSubscriberCount);
    const teardownSomething = teardownMedia || teardownTextTracks || teardownVideoRenditions || teardownAudioTracks || teardownRemote || teardownRootNode;
    const shouldSetupFromSubscriberCount = callbacks.length === 0 && nextSubscriberCount === 1 && monitorStateOwnersOnlyWithSubscriptions;
    const setupMedia = !!nextStateOwners.media && (mediaChanged || shouldSetupFromSubscriberCount);
    const setupTextTracks = !!((_m = nextStateOwners.media) == null ? void 0 : _m.textTracks) && (textTracksChanged || shouldSetupFromSubscriberCount);
    const setupVideoRenditions = !!((_n = nextStateOwners.media) == null ? void 0 : _n.videoRenditions) && (videoRenditionsChanged || shouldSetupFromSubscriberCount);
    const setupAudioTracks = !!((_o = nextStateOwners.media) == null ? void 0 : _o.audioTracks) && (audioTracksChanged || shouldSetupFromSubscriberCount);
    const setupRemote = !!((_p = nextStateOwners.media) == null ? void 0 : _p.remote) && (remoteChanged || shouldSetupFromSubscriberCount);
    const setupRootNode = !!nextStateOwners.documentElement && (rootNodeChanged || shouldSetupFromSubscriberCount);
    const setupSomething = setupMedia || setupTextTracks || setupVideoRenditions || setupAudioTracks || setupRemote || setupRootNode;
    const somethingToDo = teardownSomething || setupSomething;
    if (!somethingToDo) {
      Object.entries(nextStateOwners).forEach(
        ([stateOwnerName, stateOwner]) => {
          stateOwners[stateOwnerName] = stateOwner;
        }
      );
      updateStateFromFacade();
      nextStateOwners = void 0;
      return;
    }
    Object.entries(stateMediator2).forEach(
      ([
        stateName,
        {
          get,
          mediaEvents = [],
          textTracksEvents = [],
          videoRenditionsEvents = [],
          audioTracksEvents = [],
          remoteEvents = [],
          rootEvents = [],
          stateOwnersUpdateHandlers = []
        }
      ]) => {
        if (!stateUpdateHandlers[stateName]) {
          stateUpdateHandlers[stateName] = {};
        }
        const handler = (event) => {
          const nextValue = get(stateOwners, event);
          updateState({ [stateName]: nextValue });
        };
        let prevHandler;
        prevHandler = stateUpdateHandlers[stateName].mediaEvents;
        mediaEvents.forEach((eventType) => {
          if (prevHandler && teardownMedia) {
            stateOwners.media.removeEventListener(eventType, prevHandler);
            stateUpdateHandlers[stateName].mediaEvents = void 0;
          }
          if (setupMedia) {
            nextStateOwners.media.addEventListener(eventType, handler);
            stateUpdateHandlers[stateName].mediaEvents = handler;
          }
        });
        prevHandler = stateUpdateHandlers[stateName].textTracksEvents;
        textTracksEvents.forEach((eventType) => {
          var _a22, _b2;
          if (prevHandler && teardownTextTracks) {
            (_a22 = stateOwners.media.textTracks) == null ? void 0 : _a22.removeEventListener(
              eventType,
              prevHandler
            );
            stateUpdateHandlers[stateName].textTracksEvents = void 0;
          }
          if (setupTextTracks) {
            (_b2 = nextStateOwners.media.textTracks) == null ? void 0 : _b2.addEventListener(
              eventType,
              handler
            );
            stateUpdateHandlers[stateName].textTracksEvents = handler;
          }
        });
        prevHandler = stateUpdateHandlers[stateName].videoRenditionsEvents;
        videoRenditionsEvents.forEach((eventType) => {
          var _a22, _b2;
          if (prevHandler && teardownVideoRenditions) {
            (_a22 = stateOwners.media.videoRenditions) == null ? void 0 : _a22.removeEventListener(
              eventType,
              prevHandler
            );
            stateUpdateHandlers[stateName].videoRenditionsEvents = void 0;
          }
          if (setupVideoRenditions) {
            (_b2 = nextStateOwners.media.videoRenditions) == null ? void 0 : _b2.addEventListener(
              eventType,
              handler
            );
            stateUpdateHandlers[stateName].videoRenditionsEvents = handler;
          }
        });
        prevHandler = stateUpdateHandlers[stateName].audioTracksEvents;
        audioTracksEvents.forEach((eventType) => {
          var _a22, _b2;
          if (prevHandler && teardownAudioTracks) {
            (_a22 = stateOwners.media.audioTracks) == null ? void 0 : _a22.removeEventListener(
              eventType,
              prevHandler
            );
            stateUpdateHandlers[stateName].audioTracksEvents = void 0;
          }
          if (setupAudioTracks) {
            (_b2 = nextStateOwners.media.audioTracks) == null ? void 0 : _b2.addEventListener(
              eventType,
              handler
            );
            stateUpdateHandlers[stateName].audioTracksEvents = handler;
          }
        });
        prevHandler = stateUpdateHandlers[stateName].remoteEvents;
        remoteEvents.forEach((eventType) => {
          var _a22, _b2;
          if (prevHandler && teardownRemote) {
            (_a22 = stateOwners.media.remote) == null ? void 0 : _a22.removeEventListener(
              eventType,
              prevHandler
            );
            stateUpdateHandlers[stateName].remoteEvents = void 0;
          }
          if (setupRemote) {
            (_b2 = nextStateOwners.media.remote) == null ? void 0 : _b2.addEventListener(eventType, handler);
            stateUpdateHandlers[stateName].remoteEvents = handler;
          }
        });
        prevHandler = stateUpdateHandlers[stateName].rootEvents;
        rootEvents.forEach((eventType) => {
          if (prevHandler && teardownRootNode) {
            stateOwners.documentElement.removeEventListener(
              eventType,
              prevHandler
            );
            stateUpdateHandlers[stateName].rootEvents = void 0;
          }
          if (setupRootNode) {
            nextStateOwners.documentElement.addEventListener(
              eventType,
              handler
            );
            stateUpdateHandlers[stateName].rootEvents = handler;
          }
        });
        const prevHandlerTeardown = stateUpdateHandlers[stateName].stateOwnersUpdateHandlers;
        stateOwnersUpdateHandlers.forEach((fn) => {
          if (prevHandlerTeardown && teardownSomething) {
            prevHandlerTeardown();
          }
          if (setupSomething) {
            stateUpdateHandlers[stateName].stateOwnersUpdateHandlers = fn(
              handler,
              nextStateOwners
            );
          }
        });
      }
    );
    Object.entries(nextStateOwners).forEach(([stateOwnerName, stateOwner]) => {
      stateOwners[stateOwnerName] = stateOwner;
    });
    updateStateFromFacade();
    nextStateOwners = void 0;
  };
  updateStateOwners({ media, fullscreenElement, documentElement, options });
  return {
    // note that none of these cases directly interact with the media element, root node, full screen element, etc.
    // note these "actions" could just be the events if we wanted, especially if we normalize on "detail" for
    // any payload-relevant values
    // This is roughly equivalent to our used to be in our state requests dictionary object, though much of the
    // "heavy lifting" is now moved into the facade `set()`
    dispatch(action) {
      const { type, detail } = action;
      if (requestMap2[type] && state.mediaErrorCode == null) {
        updateState(requestMap2[type](stateMediator2, stateOwners, action));
        return;
      }
      if (type === "mediaelementchangerequest") {
        updateStateOwners({ media: detail });
      } else if (type === "fullscreenelementchangerequest") {
        updateStateOwners({ fullscreenElement: detail });
      } else if (type === "documentelementchangerequest") {
        updateStateOwners({ documentElement: detail });
      } else if (type === "optionschangerequest") {
        Object.entries(detail != null ? detail : {}).forEach(([optionName, optionValue]) => {
          stateOwners.options[optionName] = optionValue;
        });
      }
    },
    getState() {
      return state;
    },
    subscribe(callback) {
      updateStateOwners({}, callbacks.length + 1);
      callbacks.push(callback);
      callback(state);
      return () => {
        const idx = callbacks.indexOf(callback);
        if (idx >= 0) {
          updateStateOwners({}, callbacks.length - 1);
          callbacks.splice(idx, 1);
        }
      };
    }
  };
};

// node_modules/media-chrome/dist/media-controller.js
var __accessCheck4 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet5 = (obj, member, getter) => {
  __accessCheck4(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd5 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet5 = (obj, member, value, setter) => {
  __accessCheck4(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod3 = (obj, member, method) => {
  __accessCheck4(obj, member, "access private method");
  return method;
};
var _hotKeys;
var _fullscreenElement;
var _mediaStore;
var _mediaStateCallback;
var _mediaStoreUnsubscribe;
var _mediaStateEventHandler;
var _setupDefaultStore;
var setupDefaultStore_fn;
var _keyUpHandler;
var keyUpHandler_fn;
var _keyDownHandler;
var keyDownHandler_fn;
var ButtonPressedKeys = [
  "ArrowLeft",
  "ArrowRight",
  "Enter",
  " ",
  "f",
  "m",
  "k",
  "c"
];
var DEFAULT_SEEK_OFFSET = 10;
var Attributes2 = {
  DEFAULT_SUBTITLES: "defaultsubtitles",
  DEFAULT_STREAM_TYPE: "defaultstreamtype",
  DEFAULT_DURATION: "defaultduration",
  FULLSCREEN_ELEMENT: "fullscreenelement",
  HOTKEYS: "hotkeys",
  KEYS_USED: "keysused",
  LIVE_EDGE_OFFSET: "liveedgeoffset",
  SEEK_TO_LIVE_OFFSET: "seektoliveoffset",
  NO_AUTO_SEEK_TO_LIVE: "noautoseektolive",
  NO_HOTKEYS: "nohotkeys",
  NO_VOLUME_PREF: "novolumepref",
  NO_SUBTITLES_LANG_PREF: "nosubtitleslangpref",
  NO_DEFAULT_STORE: "nodefaultstore",
  KEYBOARD_FORWARD_SEEK_OFFSET: "keyboardforwardseekoffset",
  KEYBOARD_BACKWARD_SEEK_OFFSET: "keyboardbackwardseekoffset",
  LANG: "lang"
};
var MediaController = class extends MediaContainer {
  constructor() {
    super();
    __privateAdd5(this, _setupDefaultStore);
    __privateAdd5(this, _keyUpHandler);
    __privateAdd5(this, _keyDownHandler);
    this.mediaStateReceivers = [];
    this.associatedElementSubscriptions = /* @__PURE__ */ new Map();
    __privateAdd5(this, _hotKeys, new AttributeTokenList(this, Attributes2.HOTKEYS));
    __privateAdd5(this, _fullscreenElement, void 0);
    __privateAdd5(this, _mediaStore, void 0);
    __privateAdd5(this, _mediaStateCallback, void 0);
    __privateAdd5(this, _mediaStoreUnsubscribe, void 0);
    __privateAdd5(this, _mediaStateEventHandler, (event) => {
      var _a4;
      (_a4 = __privateGet5(this, _mediaStore)) == null ? void 0 : _a4.dispatch(event);
    });
    this.associateElement(this);
    let prevState = {};
    __privateSet5(this, _mediaStateCallback, (nextState) => {
      Object.entries(nextState).forEach(([stateName, stateValue]) => {
        if (stateName in prevState && prevState[stateName] === stateValue)
          return;
        this.propagateMediaState(stateName, stateValue);
        const attrName = stateName.toLowerCase();
        const evt = new GlobalThis.CustomEvent(
          AttributeToStateChangeEventMap[attrName],
          { composed: true, detail: stateValue }
        );
        this.dispatchEvent(evt);
      });
      prevState = nextState;
    });
    this.enableHotkeys();
  }
  static get observedAttributes() {
    return super.observedAttributes.concat(
      Attributes2.NO_HOTKEYS,
      Attributes2.HOTKEYS,
      Attributes2.DEFAULT_STREAM_TYPE,
      Attributes2.DEFAULT_SUBTITLES,
      Attributes2.DEFAULT_DURATION,
      Attributes2.LANG
    );
  }
  get mediaStore() {
    return __privateGet5(this, _mediaStore);
  }
  set mediaStore(value) {
    var _a4, _b;
    if (__privateGet5(this, _mediaStore)) {
      (_a4 = __privateGet5(this, _mediaStoreUnsubscribe)) == null ? void 0 : _a4.call(this);
      __privateSet5(this, _mediaStoreUnsubscribe, void 0);
    }
    __privateSet5(this, _mediaStore, value);
    if (!__privateGet5(this, _mediaStore) && !this.hasAttribute(Attributes2.NO_DEFAULT_STORE)) {
      __privateMethod3(this, _setupDefaultStore, setupDefaultStore_fn).call(this);
      return;
    }
    __privateSet5(this, _mediaStoreUnsubscribe, (_b = __privateGet5(this, _mediaStore)) == null ? void 0 : _b.subscribe(
      __privateGet5(this, _mediaStateCallback)
    ));
  }
  get fullscreenElement() {
    var _a4;
    return (_a4 = __privateGet5(this, _fullscreenElement)) != null ? _a4 : this;
  }
  set fullscreenElement(element) {
    var _a4;
    if (this.hasAttribute(Attributes2.FULLSCREEN_ELEMENT)) {
      this.removeAttribute(Attributes2.FULLSCREEN_ELEMENT);
    }
    __privateSet5(this, _fullscreenElement, element);
    (_a4 = __privateGet5(this, _mediaStore)) == null ? void 0 : _a4.dispatch({
      type: "fullscreenelementchangerequest",
      detail: this.fullscreenElement
    });
  }
  get defaultSubtitles() {
    return getBooleanAttr(this, Attributes2.DEFAULT_SUBTITLES);
  }
  set defaultSubtitles(value) {
    setBooleanAttr(this, Attributes2.DEFAULT_SUBTITLES, value);
  }
  get defaultStreamType() {
    return getStringAttr(this, Attributes2.DEFAULT_STREAM_TYPE);
  }
  set defaultStreamType(value) {
    setStringAttr(this, Attributes2.DEFAULT_STREAM_TYPE, value);
  }
  get defaultDuration() {
    return getNumericAttr(this, Attributes2.DEFAULT_DURATION);
  }
  set defaultDuration(value) {
    setNumericAttr(this, Attributes2.DEFAULT_DURATION, value);
  }
  get noHotkeys() {
    return getBooleanAttr(this, Attributes2.NO_HOTKEYS);
  }
  set noHotkeys(value) {
    setBooleanAttr(this, Attributes2.NO_HOTKEYS, value);
  }
  get keysUsed() {
    return getStringAttr(this, Attributes2.KEYS_USED);
  }
  set keysUsed(value) {
    setStringAttr(this, Attributes2.KEYS_USED, value);
  }
  get liveEdgeOffset() {
    return getNumericAttr(this, Attributes2.LIVE_EDGE_OFFSET);
  }
  set liveEdgeOffset(value) {
    setNumericAttr(this, Attributes2.LIVE_EDGE_OFFSET, value);
  }
  get noAutoSeekToLive() {
    return getBooleanAttr(this, Attributes2.NO_AUTO_SEEK_TO_LIVE);
  }
  set noAutoSeekToLive(value) {
    setBooleanAttr(this, Attributes2.NO_AUTO_SEEK_TO_LIVE, value);
  }
  get noVolumePref() {
    return getBooleanAttr(this, Attributes2.NO_VOLUME_PREF);
  }
  set noVolumePref(value) {
    setBooleanAttr(this, Attributes2.NO_VOLUME_PREF, value);
  }
  get noSubtitlesLangPref() {
    return getBooleanAttr(this, Attributes2.NO_SUBTITLES_LANG_PREF);
  }
  set noSubtitlesLangPref(value) {
    setBooleanAttr(this, Attributes2.NO_SUBTITLES_LANG_PREF, value);
  }
  get noDefaultStore() {
    return getBooleanAttr(this, Attributes2.NO_DEFAULT_STORE);
  }
  set noDefaultStore(value) {
    setBooleanAttr(this, Attributes2.NO_DEFAULT_STORE, value);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a4, _b, _c, _d, _e4, _f, _g, _h;
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === Attributes2.NO_HOTKEYS) {
      if (newValue !== oldValue && newValue === "") {
        if (this.hasAttribute(Attributes2.HOTKEYS)) {
          console.warn(
            "Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."
          );
        }
        this.disableHotkeys();
      } else if (newValue !== oldValue && newValue === null) {
        this.enableHotkeys();
      }
    } else if (attrName === Attributes2.HOTKEYS) {
      __privateGet5(this, _hotKeys).value = newValue;
    } else if (attrName === Attributes2.DEFAULT_SUBTITLES && newValue !== oldValue) {
      (_a4 = __privateGet5(this, _mediaStore)) == null ? void 0 : _a4.dispatch({
        type: "optionschangerequest",
        detail: {
          defaultSubtitles: this.hasAttribute(Attributes2.DEFAULT_SUBTITLES)
        }
      });
    } else if (attrName === Attributes2.DEFAULT_STREAM_TYPE) {
      (_c = __privateGet5(this, _mediaStore)) == null ? void 0 : _c.dispatch({
        type: "optionschangerequest",
        detail: {
          defaultStreamType: (_b = this.getAttribute(Attributes2.DEFAULT_STREAM_TYPE)) != null ? _b : void 0
        }
      });
    } else if (attrName === Attributes2.LIVE_EDGE_OFFSET) {
      (_d = __privateGet5(this, _mediaStore)) == null ? void 0 : _d.dispatch({
        type: "optionschangerequest",
        detail: {
          liveEdgeOffset: this.hasAttribute(Attributes2.LIVE_EDGE_OFFSET) ? +this.getAttribute(Attributes2.LIVE_EDGE_OFFSET) : void 0,
          seekToLiveOffset: !this.hasAttribute(Attributes2.SEEK_TO_LIVE_OFFSET) ? +this.getAttribute(Attributes2.LIVE_EDGE_OFFSET) : void 0
        }
      });
    } else if (attrName === Attributes2.SEEK_TO_LIVE_OFFSET) {
      (_e4 = __privateGet5(this, _mediaStore)) == null ? void 0 : _e4.dispatch({
        type: "optionschangerequest",
        detail: {
          seekToLiveOffset: this.hasAttribute(Attributes2.SEEK_TO_LIVE_OFFSET) ? +this.getAttribute(Attributes2.SEEK_TO_LIVE_OFFSET) : void 0
        }
      });
    } else if (attrName === Attributes2.NO_AUTO_SEEK_TO_LIVE) {
      (_f = __privateGet5(this, _mediaStore)) == null ? void 0 : _f.dispatch({
        type: "optionschangerequest",
        detail: {
          noAutoSeekToLive: this.hasAttribute(Attributes2.NO_AUTO_SEEK_TO_LIVE)
        }
      });
    } else if (attrName === Attributes2.FULLSCREEN_ELEMENT) {
      const el = newValue ? (_g = this.getRootNode()) == null ? void 0 : _g.getElementById(newValue) : void 0;
      __privateSet5(this, _fullscreenElement, el);
      (_h = __privateGet5(this, _mediaStore)) == null ? void 0 : _h.dispatch({
        type: "fullscreenelementchangerequest",
        detail: this.fullscreenElement
      });
    } else if (attrName === Attributes2.LANG && newValue !== oldValue) {
      setLanguage(newValue);
    }
  }
  connectedCallback() {
    var _a4, _b;
    if (!__privateGet5(this, _mediaStore) && !this.hasAttribute(Attributes2.NO_DEFAULT_STORE)) {
      __privateMethod3(this, _setupDefaultStore, setupDefaultStore_fn).call(this);
    }
    (_a4 = __privateGet5(this, _mediaStore)) == null ? void 0 : _a4.dispatch({
      type: "documentelementchangerequest",
      detail: Document2
    });
    super.connectedCallback();
    if (__privateGet5(this, _mediaStore) && !__privateGet5(this, _mediaStoreUnsubscribe)) {
      __privateSet5(this, _mediaStoreUnsubscribe, (_b = __privateGet5(this, _mediaStore)) == null ? void 0 : _b.subscribe(
        __privateGet5(this, _mediaStateCallback)
      ));
    }
    this.enableHotkeys();
  }
  disconnectedCallback() {
    var _a4, _b, _c, _d;
    (_a4 = super.disconnectedCallback) == null ? void 0 : _a4.call(this);
    if (__privateGet5(this, _mediaStore)) {
      (_b = __privateGet5(this, _mediaStore)) == null ? void 0 : _b.dispatch({
        type: "documentelementchangerequest",
        detail: void 0
      });
      (_c = __privateGet5(this, _mediaStore)) == null ? void 0 : _c.dispatch({
        type: MediaUIEvents.MEDIA_TOGGLE_SUBTITLES_REQUEST,
        detail: false
      });
    }
    if (__privateGet5(this, _mediaStoreUnsubscribe)) {
      (_d = __privateGet5(this, _mediaStoreUnsubscribe)) == null ? void 0 : _d.call(this);
      __privateSet5(this, _mediaStoreUnsubscribe, void 0);
    }
  }
  /**
   * @override
   * @param {HTMLMediaElement} media
   */
  mediaSetCallback(media) {
    var _a4;
    super.mediaSetCallback(media);
    (_a4 = __privateGet5(this, _mediaStore)) == null ? void 0 : _a4.dispatch({
      type: "mediaelementchangerequest",
      detail: media
    });
    if (!media.hasAttribute("tabindex")) {
      media.tabIndex = -1;
    }
  }
  /**
   * @override
   * @param {HTMLMediaElement} media
   */
  mediaUnsetCallback(media) {
    var _a4;
    super.mediaUnsetCallback(media);
    (_a4 = __privateGet5(this, _mediaStore)) == null ? void 0 : _a4.dispatch({
      type: "mediaelementchangerequest",
      detail: void 0
    });
  }
  propagateMediaState(stateName, state) {
    propagateMediaState(this.mediaStateReceivers, stateName, state);
  }
  associateElement(element) {
    if (!element)
      return;
    const { associatedElementSubscriptions } = this;
    if (associatedElementSubscriptions.has(element))
      return;
    const registerMediaStateReceiver = this.registerMediaStateReceiver.bind(this);
    const unregisterMediaStateReceiver = this.unregisterMediaStateReceiver.bind(this);
    const unsubscribe = monitorForMediaStateReceivers(
      element,
      registerMediaStateReceiver,
      unregisterMediaStateReceiver
    );
    Object.values(MediaUIEvents).forEach((eventName) => {
      element.addEventListener(eventName, __privateGet5(this, _mediaStateEventHandler));
    });
    associatedElementSubscriptions.set(element, unsubscribe);
  }
  unassociateElement(element) {
    if (!element)
      return;
    const { associatedElementSubscriptions } = this;
    if (!associatedElementSubscriptions.has(element))
      return;
    const unsubscribe = associatedElementSubscriptions.get(element);
    unsubscribe();
    associatedElementSubscriptions.delete(element);
    Object.values(MediaUIEvents).forEach((eventName) => {
      element.removeEventListener(eventName, __privateGet5(this, _mediaStateEventHandler));
    });
  }
  registerMediaStateReceiver(el) {
    if (!el)
      return;
    const els = this.mediaStateReceivers;
    const index = els.indexOf(el);
    if (index > -1)
      return;
    els.push(el);
    if (__privateGet5(this, _mediaStore)) {
      Object.entries(__privateGet5(this, _mediaStore).getState()).forEach(
        ([stateName, stateValue]) => {
          propagateMediaState([el], stateName, stateValue);
        }
      );
    }
  }
  unregisterMediaStateReceiver(el) {
    const els = this.mediaStateReceivers;
    const index = els.indexOf(el);
    if (index < 0)
      return;
    els.splice(index, 1);
  }
  enableHotkeys() {
    this.addEventListener("keydown", __privateMethod3(this, _keyDownHandler, keyDownHandler_fn));
  }
  disableHotkeys() {
    this.removeEventListener("keydown", __privateMethod3(this, _keyDownHandler, keyDownHandler_fn));
    this.removeEventListener("keyup", __privateMethod3(this, _keyUpHandler, keyUpHandler_fn));
  }
  get hotkeys() {
    return getStringAttr(this, Attributes2.HOTKEYS);
  }
  set hotkeys(value) {
    setStringAttr(this, Attributes2.HOTKEYS, value);
  }
  keyboardShortcutHandler(e2) {
    var _a4, _b, _c, _d, _e4;
    const target = e2.target;
    const keysUsed = ((_c = (_b = (_a4 = target.getAttribute(Attributes2.KEYS_USED)) == null ? void 0 : _a4.split(" ")) != null ? _b : target == null ? void 0 : target.keysUsed) != null ? _c : []).map((key) => key === "Space" ? " " : key).filter(Boolean);
    if (keysUsed.includes(e2.key)) {
      return;
    }
    let eventName, detail, evt;
    if (__privateGet5(this, _hotKeys).contains(`no${e2.key.toLowerCase()}`))
      return;
    if (e2.key === " " && __privateGet5(this, _hotKeys).contains(`nospace`))
      return;
    switch (e2.key) {
      case " ":
      case "k":
        eventName = __privateGet5(this, _mediaStore).getState().mediaPaused ? MediaUIEvents.MEDIA_PLAY_REQUEST : MediaUIEvents.MEDIA_PAUSE_REQUEST;
        this.dispatchEvent(
          new GlobalThis.CustomEvent(eventName, {
            composed: true,
            bubbles: true
          })
        );
        break;
      case "m":
        eventName = this.mediaStore.getState().mediaVolumeLevel === "off" ? MediaUIEvents.MEDIA_UNMUTE_REQUEST : MediaUIEvents.MEDIA_MUTE_REQUEST;
        this.dispatchEvent(
          new GlobalThis.CustomEvent(eventName, {
            composed: true,
            bubbles: true
          })
        );
        break;
      case "f":
        eventName = this.mediaStore.getState().mediaIsFullscreen ? MediaUIEvents.MEDIA_EXIT_FULLSCREEN_REQUEST : MediaUIEvents.MEDIA_ENTER_FULLSCREEN_REQUEST;
        this.dispatchEvent(
          new GlobalThis.CustomEvent(eventName, {
            composed: true,
            bubbles: true
          })
        );
        break;
      case "c":
        this.dispatchEvent(
          new GlobalThis.CustomEvent(
            MediaUIEvents.MEDIA_TOGGLE_SUBTITLES_REQUEST,
            { composed: true, bubbles: true }
          )
        );
        break;
      case "ArrowLeft": {
        const offsetValue = this.hasAttribute(
          Attributes2.KEYBOARD_BACKWARD_SEEK_OFFSET
        ) ? +this.getAttribute(Attributes2.KEYBOARD_BACKWARD_SEEK_OFFSET) : DEFAULT_SEEK_OFFSET;
        detail = Math.max(
          ((_d = this.mediaStore.getState().mediaCurrentTime) != null ? _d : 0) - offsetValue,
          0
        );
        evt = new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_SEEK_REQUEST, {
          composed: true,
          bubbles: true,
          detail
        });
        this.dispatchEvent(evt);
        break;
      }
      case "ArrowRight": {
        const offsetValue = this.hasAttribute(
          Attributes2.KEYBOARD_FORWARD_SEEK_OFFSET
        ) ? +this.getAttribute(Attributes2.KEYBOARD_FORWARD_SEEK_OFFSET) : DEFAULT_SEEK_OFFSET;
        detail = Math.max(
          ((_e4 = this.mediaStore.getState().mediaCurrentTime) != null ? _e4 : 0) + offsetValue,
          0
        );
        evt = new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_SEEK_REQUEST, {
          composed: true,
          bubbles: true,
          detail
        });
        this.dispatchEvent(evt);
        break;
      }
      default:
        break;
    }
  }
};
_hotKeys = /* @__PURE__ */ new WeakMap();
_fullscreenElement = /* @__PURE__ */ new WeakMap();
_mediaStore = /* @__PURE__ */ new WeakMap();
_mediaStateCallback = /* @__PURE__ */ new WeakMap();
_mediaStoreUnsubscribe = /* @__PURE__ */ new WeakMap();
_mediaStateEventHandler = /* @__PURE__ */ new WeakMap();
_setupDefaultStore = /* @__PURE__ */ new WeakSet();
setupDefaultStore_fn = function() {
  var _a4;
  this.mediaStore = createMediaStore({
    media: this.media,
    fullscreenElement: this.fullscreenElement,
    options: {
      defaultSubtitles: this.hasAttribute(Attributes2.DEFAULT_SUBTITLES),
      defaultDuration: this.hasAttribute(Attributes2.DEFAULT_DURATION) ? +this.getAttribute(Attributes2.DEFAULT_DURATION) : void 0,
      defaultStreamType: (
        /** @type {import('./media-store/state-mediator.js').StreamTypeValue} */
        (_a4 = this.getAttribute(
          Attributes2.DEFAULT_STREAM_TYPE
        )) != null ? _a4 : void 0
      ),
      liveEdgeOffset: this.hasAttribute(Attributes2.LIVE_EDGE_OFFSET) ? +this.getAttribute(Attributes2.LIVE_EDGE_OFFSET) : void 0,
      seekToLiveOffset: this.hasAttribute(Attributes2.SEEK_TO_LIVE_OFFSET) ? +this.getAttribute(Attributes2.SEEK_TO_LIVE_OFFSET) : this.hasAttribute(Attributes2.LIVE_EDGE_OFFSET) ? +this.getAttribute(Attributes2.LIVE_EDGE_OFFSET) : void 0,
      noAutoSeekToLive: this.hasAttribute(Attributes2.NO_AUTO_SEEK_TO_LIVE),
      // NOTE: This wasn't updated if it was changed later. Should it be? (CJP)
      noVolumePref: this.hasAttribute(Attributes2.NO_VOLUME_PREF),
      noSubtitlesLangPref: this.hasAttribute(
        Attributes2.NO_SUBTITLES_LANG_PREF
      )
    }
  });
};
_keyUpHandler = /* @__PURE__ */ new WeakSet();
keyUpHandler_fn = function(e2) {
  const { key } = e2;
  if (!ButtonPressedKeys.includes(key)) {
    this.removeEventListener("keyup", __privateMethod3(this, _keyUpHandler, keyUpHandler_fn));
    return;
  }
  this.keyboardShortcutHandler(e2);
};
_keyDownHandler = /* @__PURE__ */ new WeakSet();
keyDownHandler_fn = function(e2) {
  const { metaKey, altKey, key } = e2;
  if (metaKey || altKey || !ButtonPressedKeys.includes(key)) {
    this.removeEventListener("keyup", __privateMethod3(this, _keyUpHandler, keyUpHandler_fn));
    return;
  }
  if ([" ", "ArrowLeft", "ArrowRight"].includes(key) && !(__privateGet5(this, _hotKeys).contains(`no${key.toLowerCase()}`) || key === " " && __privateGet5(this, _hotKeys).contains("nospace"))) {
    e2.preventDefault();
  }
  this.addEventListener("keyup", __privateMethod3(this, _keyUpHandler, keyUpHandler_fn), { once: true });
};
var MEDIA_UI_ATTRIBUTE_NAMES2 = Object.values(MediaUIAttributes);
var MEDIA_UI_PROP_NAMES = Object.values(MediaUIProps);
var getMediaUIAttributesFrom = (child) => {
  var _a4, _b, _c, _d;
  let { observedAttributes: observedAttributes2 } = child.constructor;
  if (!observedAttributes2 && ((_a4 = child.nodeName) == null ? void 0 : _a4.includes("-"))) {
    GlobalThis.customElements.upgrade(child);
    ({ observedAttributes: observedAttributes2 } = child.constructor);
  }
  const mediaChromeAttributesList = (_d = (_c = (_b = child == null ? void 0 : child.getAttribute) == null ? void 0 : _b.call(child, MediaStateReceiverAttributes.MEDIA_CHROME_ATTRIBUTES)) == null ? void 0 : _c.split) == null ? void 0 : _d.call(_c, /\s+/);
  if (!Array.isArray(observedAttributes2 || mediaChromeAttributesList))
    return [];
  return (observedAttributes2 || mediaChromeAttributesList).filter(
    (attrName) => MEDIA_UI_ATTRIBUTE_NAMES2.includes(attrName)
  );
};
var hasMediaUIProps = (mediaStateReceiverCandidate) => {
  var _a4, _b;
  if (((_a4 = mediaStateReceiverCandidate.nodeName) == null ? void 0 : _a4.includes("-")) && !!GlobalThis.customElements.get(
    (_b = mediaStateReceiverCandidate.nodeName) == null ? void 0 : _b.toLowerCase()
  ) && !(mediaStateReceiverCandidate instanceof GlobalThis.customElements.get(
    mediaStateReceiverCandidate.nodeName.toLowerCase()
  ))) {
    GlobalThis.customElements.upgrade(mediaStateReceiverCandidate);
  }
  return MEDIA_UI_PROP_NAMES.some(
    (propName) => propName in mediaStateReceiverCandidate
  );
};
var isMediaStateReceiver = (child) => {
  return hasMediaUIProps(child) || !!getMediaUIAttributesFrom(child).length;
};
var serializeTuple = (tuple) => {
  var _a4;
  return (_a4 = tuple == null ? void 0 : tuple.join) == null ? void 0 : _a4.call(tuple, ":");
};
var CustomAttrSerializer = {
  [MediaUIAttributes.MEDIA_SUBTITLES_LIST]: stringifyTextTrackList,
  [MediaUIAttributes.MEDIA_SUBTITLES_SHOWING]: stringifyTextTrackList,
  [MediaUIAttributes.MEDIA_SEEKABLE]: serializeTuple,
  [MediaUIAttributes.MEDIA_BUFFERED]: (tuples) => tuples == null ? void 0 : tuples.map(serializeTuple).join(" "),
  [MediaUIAttributes.MEDIA_PREVIEW_COORDS]: (coords) => coords == null ? void 0 : coords.join(" "),
  [MediaUIAttributes.MEDIA_RENDITION_LIST]: stringifyRenditionList,
  [MediaUIAttributes.MEDIA_AUDIO_TRACK_LIST]: stringifyAudioTrackList
};
var setAttr = async (child, attrName, attrValue) => {
  var _a4, _b;
  if (!child.isConnected) {
    await delay(0);
  }
  if (typeof attrValue === "boolean" || attrValue == null) {
    return setBooleanAttr(child, attrName, attrValue);
  }
  if (typeof attrValue === "number") {
    return setNumericAttr(child, attrName, attrValue);
  }
  if (typeof attrValue === "string") {
    return setStringAttr(child, attrName, attrValue);
  }
  if (Array.isArray(attrValue) && !attrValue.length) {
    return child.removeAttribute(attrName);
  }
  const val = (_b = (_a4 = CustomAttrSerializer[attrName]) == null ? void 0 : _a4.call(CustomAttrSerializer, attrValue)) != null ? _b : attrValue;
  return child.setAttribute(attrName, val);
};
var isMediaSlotElementDescendant = (el) => {
  var _a4;
  return !!((_a4 = el.closest) == null ? void 0 : _a4.call(el, '*[slot="media"]'));
};
var traverseForMediaStateReceivers = (rootNode, mediaStateReceiverCallback) => {
  if (isMediaSlotElementDescendant(rootNode)) {
    return;
  }
  const traverseForMediaStateReceiversSync = (rootNode2, mediaStateReceiverCallback2) => {
    var _a4, _b;
    if (isMediaStateReceiver(rootNode2)) {
      mediaStateReceiverCallback2(rootNode2);
    }
    const { children = [] } = rootNode2 != null ? rootNode2 : {};
    const shadowChildren = (_b = (_a4 = rootNode2 == null ? void 0 : rootNode2.shadowRoot) == null ? void 0 : _a4.children) != null ? _b : [];
    const allChildren = [...children, ...shadowChildren];
    allChildren.forEach(
      (child) => traverseForMediaStateReceivers(
        child,
        mediaStateReceiverCallback2
      )
    );
  };
  const name = rootNode == null ? void 0 : rootNode.nodeName.toLowerCase();
  if (name.includes("-") && !isMediaStateReceiver(rootNode)) {
    GlobalThis.customElements.whenDefined(name).then(() => {
      traverseForMediaStateReceiversSync(rootNode, mediaStateReceiverCallback);
    });
    return;
  }
  traverseForMediaStateReceiversSync(rootNode, mediaStateReceiverCallback);
};
var propagateMediaState = (els, stateName, val) => {
  els.forEach((el) => {
    if (stateName in el) {
      el[stateName] = val;
      return;
    }
    const relevantAttrs = getMediaUIAttributesFrom(el);
    const attrName = stateName.toLowerCase();
    if (!relevantAttrs.includes(attrName))
      return;
    setAttr(el, attrName, val);
  });
};
var monitorForMediaStateReceivers = (rootNode, registerMediaStateReceiver, unregisterMediaStateReceiver) => {
  traverseForMediaStateReceivers(rootNode, registerMediaStateReceiver);
  const registerMediaStateReceiverHandler = (evt) => {
    var _a4;
    const el = (_a4 = evt == null ? void 0 : evt.composedPath()[0]) != null ? _a4 : evt.target;
    registerMediaStateReceiver(el);
  };
  const unregisterMediaStateReceiverHandler = (evt) => {
    var _a4;
    const el = (_a4 = evt == null ? void 0 : evt.composedPath()[0]) != null ? _a4 : evt.target;
    unregisterMediaStateReceiver(el);
  };
  rootNode.addEventListener(
    MediaUIEvents.REGISTER_MEDIA_STATE_RECEIVER,
    registerMediaStateReceiverHandler
  );
  rootNode.addEventListener(
    MediaUIEvents.UNREGISTER_MEDIA_STATE_RECEIVER,
    unregisterMediaStateReceiverHandler
  );
  const mutationCallback = (mutationsList) => {
    mutationsList.forEach((mutationRecord) => {
      const {
        addedNodes = [],
        removedNodes = [],
        type,
        target,
        attributeName
      } = mutationRecord;
      if (type === "childList") {
        Array.prototype.forEach.call(
          addedNodes,
          (node) => traverseForMediaStateReceivers(
            node,
            registerMediaStateReceiver
          )
        );
        Array.prototype.forEach.call(
          removedNodes,
          (node) => traverseForMediaStateReceivers(
            node,
            unregisterMediaStateReceiver
          )
        );
      } else if (type === "attributes" && attributeName === MediaStateReceiverAttributes.MEDIA_CHROME_ATTRIBUTES) {
        if (isMediaStateReceiver(target)) {
          registerMediaStateReceiver(target);
        } else {
          unregisterMediaStateReceiver(target);
        }
      }
    });
  };
  let prevSlotted = [];
  const slotChangeHandler = (event) => {
    const slotEl = event.target;
    if (slotEl.name === "media")
      return;
    prevSlotted.forEach(
      (node) => traverseForMediaStateReceivers(node, unregisterMediaStateReceiver)
    );
    prevSlotted = [
      ...slotEl.assignedElements({ flatten: true })
    ];
    prevSlotted.forEach(
      (node) => traverseForMediaStateReceivers(node, registerMediaStateReceiver)
    );
  };
  rootNode.addEventListener("slotchange", slotChangeHandler);
  const observer2 = new MutationObserver(mutationCallback);
  observer2.observe(rootNode, {
    childList: true,
    attributes: true,
    subtree: true
  });
  const unsubscribe = () => {
    traverseForMediaStateReceivers(rootNode, unregisterMediaStateReceiver);
    rootNode.removeEventListener("slotchange", slotChangeHandler);
    observer2.disconnect();
    rootNode.removeEventListener(
      MediaUIEvents.REGISTER_MEDIA_STATE_RECEIVER,
      registerMediaStateReceiverHandler
    );
    rootNode.removeEventListener(
      MediaUIEvents.UNREGISTER_MEDIA_STATE_RECEIVER,
      unregisterMediaStateReceiverHandler
    );
  };
  return unsubscribe;
};
if (!GlobalThis.customElements.get("media-controller")) {
  GlobalThis.customElements.define("media-controller", MediaController);
}
var media_controller_default = MediaController;

// node_modules/media-chrome/dist/media-tooltip.js
var Attributes3 = {
  PLACEMENT: "placement",
  BOUNDS: "bounds"
};
function getTemplateHTML3(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        --_tooltip-background-color: var(--media-tooltip-background-color, var(--media-secondary-color, rgba(20, 20, 30, .7)));
        --_tooltip-background: var(--media-tooltip-background, var(--_tooltip-background-color));
        --_tooltip-arrow-half-width: calc(var(--media-tooltip-arrow-width, 12px) / 2);
        --_tooltip-arrow-height: var(--media-tooltip-arrow-height, 5px);
        --_tooltip-arrow-background: var(--media-tooltip-arrow-color, var(--_tooltip-background-color));
        position: relative;
        pointer-events: none;
        display: var(--media-tooltip-display, inline-flex);
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        z-index: var(--media-tooltip-z-index, 1);
        background: var(--_tooltip-background);
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        font: var(--media-font,
          var(--media-font-weight, 400)
          var(--media-font-size, 13px) /
          var(--media-text-content-height, var(--media-control-height, 18px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        padding: var(--media-tooltip-padding, .35em .7em);
        border: var(--media-tooltip-border, none);
        border-radius: var(--media-tooltip-border-radius, 5px);
        filter: var(--media-tooltip-filter, drop-shadow(0 0 4px rgba(0, 0, 0, .2)));
        white-space: var(--media-tooltip-white-space, nowrap);
      }

      :host([hidden]) {
        display: none;
      }

      img, svg {
        display: inline-block;
      }

      #arrow {
        position: absolute;
        width: 0px;
        height: 0px;
        border-style: solid;
        display: var(--media-tooltip-arrow-display, block);
      }

      :host(:not([placement])),
      :host([placement="top"]) {
        position: absolute;
        bottom: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host(:not([placement])) #arrow,
      :host([placement="top"]) #arrow {
        top: 100%;
        left: 50%;
        border-width: var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width);
        border-color: var(--_tooltip-arrow-background) transparent transparent transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="right"]) {
        position: absolute;
        left: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="right"]) #arrow {
        top: 50%;
        right: 100%;
        border-width: var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0;
        border-color: transparent var(--_tooltip-arrow-background) transparent transparent;
        transform: translate(0, -50%);
      }

      :host([placement="bottom"]) {
        position: absolute;
        top: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host([placement="bottom"]) #arrow {
        bottom: 100%;
        left: 50%;
        border-width: 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width);
        border-color: transparent transparent var(--_tooltip-arrow-background) transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="left"]) {
        position: absolute;
        right: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="left"]) #arrow {
        top: 50%;
        left: 100%;
        border-width: var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height);
        border-color: transparent transparent transparent var(--_tooltip-arrow-background);
        transform: translate(0, -50%);
      }
      
      :host([placement="none"]) #arrow {
        display: none;
      }
    </style>
    <slot></slot>
    <div id="arrow"></div>
  `
  );
}
var MediaTooltip = class extends GlobalThis.HTMLElement {
  constructor() {
    super();
    this.updateXOffset = () => {
      var _a4;
      if (!isElementVisible(this, { checkOpacity: false, checkVisibilityCSS: false }))
        return;
      const placement = this.placement;
      if (placement === "left" || placement === "right") {
        this.style.removeProperty("--media-tooltip-offset-x");
        return;
      }
      const tooltipStyle = getComputedStyle(this);
      const containingEl = (_a4 = closestComposedNode(this, "#" + this.bounds)) != null ? _a4 : getMediaController(this);
      if (!containingEl)
        return;
      const { x: containerX, width: containerWidth } = containingEl.getBoundingClientRect();
      const { x: tooltipX, width: tooltipWidth } = this.getBoundingClientRect();
      const tooltipRight = tooltipX + tooltipWidth;
      const containerRight = containerX + containerWidth;
      const offsetXVal = tooltipStyle.getPropertyValue(
        "--media-tooltip-offset-x"
      );
      const currOffsetX = offsetXVal ? parseFloat(offsetXVal.replace("px", "")) : 0;
      const marginVal = tooltipStyle.getPropertyValue(
        "--media-tooltip-container-margin"
      );
      const currMargin = marginVal ? parseFloat(marginVal.replace("px", "")) : 0;
      const leftDiff = tooltipX - containerX + currOffsetX - currMargin;
      const rightDiff = tooltipRight - containerRight + currOffsetX + currMargin;
      if (leftDiff < 0) {
        this.style.setProperty("--media-tooltip-offset-x", `${leftDiff}px`);
        return;
      }
      if (rightDiff > 0) {
        this.style.setProperty("--media-tooltip-offset-x", `${rightDiff}px`);
        return;
      }
      this.style.removeProperty("--media-tooltip-offset-x");
    };
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    }
    this.arrowEl = this.shadowRoot.querySelector("#arrow");
    if (Object.prototype.hasOwnProperty.call(this, "placement")) {
      const placement = this.placement;
      delete this.placement;
      this.placement = placement;
    }
  }
  static get observedAttributes() {
    return [Attributes3.PLACEMENT, Attributes3.BOUNDS];
  }
  /**
   * Get or set tooltip placement
   */
  get placement() {
    return getStringAttr(this, Attributes3.PLACEMENT);
  }
  set placement(value) {
    setStringAttr(this, Attributes3.PLACEMENT, value);
  }
  /**
   * Get or set tooltip container ID selector that will constrain the tooltips
   * horizontal position.
   */
  get bounds() {
    return getStringAttr(this, Attributes3.BOUNDS);
  }
  set bounds(value) {
    setStringAttr(this, Attributes3.BOUNDS, value);
  }
};
MediaTooltip.shadowRootOptions = { mode: "open" };
MediaTooltip.getTemplateHTML = getTemplateHTML3;
if (!GlobalThis.customElements.get("media-tooltip")) {
  GlobalThis.customElements.define("media-tooltip", MediaTooltip);
}
var media_tooltip_default = MediaTooltip;

// node_modules/media-chrome/dist/media-chrome-button.js
var __accessCheck5 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet6 = (obj, member, getter) => {
  __accessCheck5(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd6 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet6 = (obj, member, value, setter) => {
  __accessCheck5(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod4 = (obj, member, method) => {
  __accessCheck5(obj, member, "access private method");
  return method;
};
var _mediaController2;
var _clickListener;
var _positionTooltip;
var _keyupListener;
var _keydownListener;
var _setupTooltip;
var setupTooltip_fn;
var Attributes4 = {
  TOOLTIP_PLACEMENT: "tooltipplacement",
  DISABLED: "disabled",
  NO_TOOLTIP: "notooltip"
};
function getTemplateHTML4(_attrs, _props = {}) {
  return (
    /*html*/
    `
    <style>
      :host {
        position: relative;
        font: var(--media-font,
          var(--media-font-weight, bold)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        padding: var(--media-button-padding, var(--media-control-padding, 10px));
        justify-content: var(--media-button-justify-content, center);
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        transition: background .15s linear;
        pointer-events: auto;
        cursor: var(--media-cursor, pointer);
        -webkit-tap-highlight-color: transparent;
      }

      ${/*
      Only show outline when keyboard focusing.
      https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo
    */
    ""}
      :host(:focus-visible) {
        box-shadow: inset 0 0 0 2px rgb(27 127 204 / .9);
        outline: 0;
      }
      ${/*
    * hide default focus ring, particularly when using mouse
    */
    ""}
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgba(50 50 70 / .7));
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-button-icon-width);
        height: var(--media-button-icon-height, var(--media-control-height, 24px));
        transform: var(--media-button-icon-transform);
        transition: var(--media-button-icon-transition);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
      }

      media-tooltip {
        ${/** Make sure unpositioned tooltip doesn't cause page overflow (scroll). */
    ""}
        max-width: 0;
        overflow-x: clip;
        opacity: 0;
        transition: opacity .3s, max-width 0s 9s;
      }

      :host(:hover) media-tooltip,
      :host(:focus-visible) media-tooltip {
        max-width: 100vw;
        opacity: 1;
        transition: opacity .3s;
      }

      :host([notooltip]) slot[name="tooltip"] {
        display: none;
      }
    </style>

    ${this.getSlotTemplateHTML(_attrs, _props)}

    <slot name="tooltip">
      <media-tooltip part="tooltip" aria-hidden="true">
        <template shadowrootmode="${media_tooltip_default.shadowRootOptions.mode}">
          ${media_tooltip_default.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(_attrs)}
        </slot>
      </media-tooltip>
    </slot>
  `
  );
}
function getSlotTemplateHTML(_attrs, _props) {
  return (
    /*html*/
    `
    <slot></slot>
  `
  );
}
function getTooltipContentHTML() {
  return "";
}
var MediaChromeButton = class extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd6(this, _setupTooltip);
    __privateAdd6(this, _mediaController2, void 0);
    this.preventClick = false;
    this.tooltipEl = null;
    __privateAdd6(this, _clickListener, (e2) => {
      if (!this.preventClick) {
        this.handleClick(e2);
      }
      setTimeout(__privateGet6(this, _positionTooltip), 0);
    });
    __privateAdd6(this, _positionTooltip, () => {
      var _a4, _b;
      (_b = (_a4 = this.tooltipEl) == null ? void 0 : _a4.updateXOffset) == null ? void 0 : _b.call(_a4);
    });
    __privateAdd6(this, _keyupListener, (e2) => {
      const { key } = e2;
      if (!this.keysUsed.includes(key)) {
        this.removeEventListener("keyup", __privateGet6(this, _keyupListener));
        return;
      }
      if (!this.preventClick) {
        this.handleClick(e2);
      }
    });
    __privateAdd6(this, _keydownListener, (e2) => {
      const { metaKey, altKey, key } = e2;
      if (metaKey || altKey || !this.keysUsed.includes(key)) {
        this.removeEventListener("keyup", __privateGet6(this, _keyupListener));
        return;
      }
      this.addEventListener("keyup", __privateGet6(this, _keyupListener), { once: true });
    });
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      const html = this.constructor.getTemplateHTML(attrs);
      this.shadowRoot.setHTMLUnsafe ? this.shadowRoot.setHTMLUnsafe(html) : this.shadowRoot.innerHTML = html;
    }
    this.tooltipEl = this.shadowRoot.querySelector("media-tooltip");
  }
  static get observedAttributes() {
    return [
      "disabled",
      Attributes4.TOOLTIP_PLACEMENT,
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    ];
  }
  enable() {
    this.addEventListener("click", __privateGet6(this, _clickListener));
    this.addEventListener("keydown", __privateGet6(this, _keydownListener));
    this.tabIndex = 0;
  }
  disable() {
    this.removeEventListener("click", __privateGet6(this, _clickListener));
    this.removeEventListener("keydown", __privateGet6(this, _keydownListener));
    this.removeEventListener("keyup", __privateGet6(this, _keyupListener));
    this.tabIndex = -1;
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a4, _b, _c, _d, _e4;
    if (attrName === MediaStateReceiverAttributes.MEDIA_CONTROLLER) {
      if (oldValue) {
        (_b = (_a4 = __privateGet6(this, _mediaController2)) == null ? void 0 : _a4.unassociateElement) == null ? void 0 : _b.call(_a4, this);
        __privateSet6(this, _mediaController2, null);
      }
      if (newValue && this.isConnected) {
        __privateSet6(this, _mediaController2, (_c = this.getRootNode()) == null ? void 0 : _c.getElementById(newValue));
        (_e4 = (_d = __privateGet6(this, _mediaController2)) == null ? void 0 : _d.associateElement) == null ? void 0 : _e4.call(_d, this);
      }
    } else if (attrName === "disabled" && newValue !== oldValue) {
      if (newValue == null) {
        this.enable();
      } else {
        this.disable();
      }
    } else if (attrName === Attributes4.TOOLTIP_PLACEMENT && this.tooltipEl && newValue !== oldValue) {
      this.tooltipEl.placement = newValue;
    }
    __privateGet6(this, _positionTooltip).call(this);
  }
  connectedCallback() {
    var _a4, _b, _c;
    const { style } = getOrInsertCSSRule(this.shadowRoot, ":host");
    style.setProperty(
      "display",
      `var(--media-control-display, var(--${this.localName}-display, inline-flex))`
    );
    if (!this.hasAttribute("disabled")) {
      this.enable();
    } else {
      this.disable();
    }
    this.setAttribute("role", "button");
    const mediaControllerId = this.getAttribute(
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    );
    if (mediaControllerId) {
      __privateSet6(
        this,
        _mediaController2,
        // @ts-ignore
        (_a4 = this.getRootNode()) == null ? void 0 : _a4.getElementById(mediaControllerId)
      );
      (_c = (_b = __privateGet6(this, _mediaController2)) == null ? void 0 : _b.associateElement) == null ? void 0 : _c.call(_b, this);
    }
    GlobalThis.customElements.whenDefined("media-tooltip").then(() => __privateMethod4(this, _setupTooltip, setupTooltip_fn).call(this));
  }
  disconnectedCallback() {
    var _a4, _b;
    this.disable();
    (_b = (_a4 = __privateGet6(this, _mediaController2)) == null ? void 0 : _a4.unassociateElement) == null ? void 0 : _b.call(_a4, this);
    __privateSet6(this, _mediaController2, null);
    this.removeEventListener("mouseenter", __privateGet6(this, _positionTooltip));
    this.removeEventListener("focus", __privateGet6(this, _positionTooltip));
    this.removeEventListener("click", __privateGet6(this, _clickListener));
  }
  get keysUsed() {
    return ["Enter", " "];
  }
  /**
   * Get or set tooltip placement
   */
  get tooltipPlacement() {
    return getStringAttr(this, Attributes4.TOOLTIP_PLACEMENT);
  }
  set tooltipPlacement(value) {
    setStringAttr(this, Attributes4.TOOLTIP_PLACEMENT, value);
  }
  get mediaController() {
    return getStringAttr(this, MediaStateReceiverAttributes.MEDIA_CONTROLLER);
  }
  set mediaController(value) {
    setStringAttr(this, MediaStateReceiverAttributes.MEDIA_CONTROLLER, value);
  }
  get disabled() {
    return getBooleanAttr(this, Attributes4.DISABLED);
  }
  set disabled(value) {
    setBooleanAttr(this, Attributes4.DISABLED, value);
  }
  get noTooltip() {
    return getBooleanAttr(this, Attributes4.NO_TOOLTIP);
  }
  set noTooltip(value) {
    setBooleanAttr(this, Attributes4.NO_TOOLTIP, value);
  }
  /**
   * @abstract
   * @argument {Event} e
   */
  handleClick(e2) {
  }
  // eslint-disable-line
};
_mediaController2 = /* @__PURE__ */ new WeakMap();
_clickListener = /* @__PURE__ */ new WeakMap();
_positionTooltip = /* @__PURE__ */ new WeakMap();
_keyupListener = /* @__PURE__ */ new WeakMap();
_keydownListener = /* @__PURE__ */ new WeakMap();
_setupTooltip = /* @__PURE__ */ new WeakSet();
setupTooltip_fn = function() {
  this.addEventListener("mouseenter", __privateGet6(this, _positionTooltip));
  this.addEventListener("focus", __privateGet6(this, _positionTooltip));
  this.addEventListener("click", __privateGet6(this, _clickListener));
  const initialPlacement = this.tooltipPlacement;
  if (initialPlacement && this.tooltipEl) {
    this.tooltipEl.placement = initialPlacement;
  }
};
MediaChromeButton.shadowRootOptions = { mode: "open" };
MediaChromeButton.getTemplateHTML = getTemplateHTML4;
MediaChromeButton.getSlotTemplateHTML = getSlotTemplateHTML;
MediaChromeButton.getTooltipContentHTML = getTooltipContentHTML;
if (!GlobalThis.customElements.get("media-chrome-button")) {
  GlobalThis.customElements.define("media-chrome-button", MediaChromeButton);
}

// node_modules/media-chrome/dist/media-airplay-button.js
var airplayIcon = `<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`;
function getSlotTemplateHTML2(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host([${MediaUIAttributes.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      ${/* Double negative, but safer if display doesn't equal 'block' */
    ""}
      :host(:not([${MediaUIAttributes.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${MediaUIAttributes.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
      :host(:not([${MediaUIAttributes.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${airplayIcon}</slot>
      <slot name="exit">${airplayIcon}</slot>
    </slot>
  `
  );
}
function getTooltipContentHTML2() {
  return (
    /*html*/
    `
    <slot name="tooltip-enter">${t("start airplay")}</slot>
    <slot name="tooltip-exit">${t("stop airplay")}</slot>
  `
  );
}
var updateAriaLabel = (el) => {
  const label = el.mediaIsAirplaying ? t("stop airplay") : t("start airplay");
  el.setAttribute("aria-label", label);
};
var MediaAirplayButton = class extends MediaChromeButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_IS_AIRPLAYING,
      MediaUIAttributes.MEDIA_AIRPLAY_UNAVAILABLE
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    updateAriaLabel(this);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_IS_AIRPLAYING) {
      updateAriaLabel(this);
    }
  }
  /**
   * Are we currently airplaying
   */
  get mediaIsAirplaying() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_IS_AIRPLAYING);
  }
  set mediaIsAirplaying(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_IS_AIRPLAYING, value);
  }
  /**
   * Airplay unavailability state
   */
  get mediaAirplayUnavailable() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_AIRPLAY_UNAVAILABLE);
  }
  set mediaAirplayUnavailable(value) {
    setStringAttr(this, MediaUIAttributes.MEDIA_AIRPLAY_UNAVAILABLE, value);
  }
  handleClick() {
    const evt = new GlobalThis.CustomEvent(
      MediaUIEvents.MEDIA_AIRPLAY_REQUEST,
      {
        composed: true,
        bubbles: true
      }
    );
    this.dispatchEvent(evt);
  }
};
MediaAirplayButton.getSlotTemplateHTML = getSlotTemplateHTML2;
MediaAirplayButton.getTooltipContentHTML = getTooltipContentHTML2;
if (!GlobalThis.customElements.get("media-airplay-button")) {
  GlobalThis.customElements.define("media-airplay-button", MediaAirplayButton);
}

// node_modules/media-chrome/dist/media-captions-button.js
var ccIconOn = `<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`;
var ccIconOff = `<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;
function getSlotTemplateHTML3(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host([aria-checked="true"]) slot[name=off] {
        display: none !important;
      }

      ${/* Double negative, but safer if display doesn't equal 'block' */
    ""}
      :host(:not([aria-checked="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-checked="true"]) slot[name=tooltip-enable],
      :host(:not([aria-checked="true"])) slot[name=tooltip-disable] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${ccIconOn}</slot>
      <slot name="off">${ccIconOff}</slot>
    </slot>
  `
  );
}
function getTooltipContentHTML3() {
  return (
    /*html*/
    `
    <slot name="tooltip-enable">${t("Enable captions")}</slot>
    <slot name="tooltip-disable">${t("Disable captions")}</slot>
  `
  );
}
var updateAriaChecked = (el) => {
  el.setAttribute("aria-checked", areSubsOn(el).toString());
};
var MediaCaptionsButton = class extends MediaChromeButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_SUBTITLES_LIST,
      MediaUIAttributes.MEDIA_SUBTITLES_SHOWING
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "switch");
    this.setAttribute("aria-label", t("closed captions"));
    updateAriaChecked(this);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_SUBTITLES_SHOWING) {
      updateAriaChecked(this);
    }
  }
  /**
   * An array of TextTrack-like objects.
   * Objects must have the properties: kind, language, and label.
   */
  get mediaSubtitlesList() {
    return getSubtitlesListAttr(this, MediaUIAttributes.MEDIA_SUBTITLES_LIST);
  }
  set mediaSubtitlesList(list) {
    setSubtitlesListAttr(this, MediaUIAttributes.MEDIA_SUBTITLES_LIST, list);
  }
  /**
   * An array of TextTrack-like objects.
   * Objects must have the properties: kind, language, and label.
   */
  get mediaSubtitlesShowing() {
    return getSubtitlesListAttr(
      this,
      MediaUIAttributes.MEDIA_SUBTITLES_SHOWING
    );
  }
  set mediaSubtitlesShowing(list) {
    setSubtitlesListAttr(this, MediaUIAttributes.MEDIA_SUBTITLES_SHOWING, list);
  }
  handleClick() {
    this.dispatchEvent(
      new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_TOGGLE_SUBTITLES_REQUEST, {
        composed: true,
        bubbles: true
      })
    );
  }
};
MediaCaptionsButton.getSlotTemplateHTML = getSlotTemplateHTML3;
MediaCaptionsButton.getTooltipContentHTML = getTooltipContentHTML3;
var getSubtitlesListAttr = (el, attrName) => {
  const attrVal = el.getAttribute(attrName);
  return attrVal ? parseTextTracksStr(attrVal) : [];
};
var setSubtitlesListAttr = (el, attrName, list) => {
  if (!(list == null ? void 0 : list.length)) {
    el.removeAttribute(attrName);
    return;
  }
  const newValStr = stringifyTextTrackList(list);
  const oldVal = el.getAttribute(attrName);
  if (oldVal === newValStr)
    return;
  el.setAttribute(attrName, newValStr);
};
if (!GlobalThis.customElements.get("media-captions-button")) {
  GlobalThis.customElements.define(
    "media-captions-button",
    MediaCaptionsButton
  );
}

// node_modules/media-chrome/dist/media-cast-button.js
var enterIcon = `<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>`;
var exitIcon = `<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>`;
function getSlotTemplateHTML4(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host([${MediaUIAttributes.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      ${/* Double negative, but safer if display doesn't equal 'block' */
    ""}
      :host(:not([${MediaUIAttributes.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${MediaUIAttributes.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
      :host(:not([${MediaUIAttributes.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${enterIcon}</slot>
      <slot name="exit">${exitIcon}</slot>
    </slot>
  `
  );
}
function getTooltipContentHTML4() {
  return (
    /*html*/
    `
    <slot name="tooltip-enter">${t("Start casting")}</slot>
    <slot name="tooltip-exit">${t("Stop casting")}</slot>
  `
  );
}
var updateAriaLabel2 = (el) => {
  const label = el.mediaIsCasting ? t("stop casting") : t("start casting");
  el.setAttribute("aria-label", label);
};
var MediaCastButton = class extends MediaChromeButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_IS_CASTING,
      MediaUIAttributes.MEDIA_CAST_UNAVAILABLE
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    updateAriaLabel2(this);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_IS_CASTING) {
      updateAriaLabel2(this);
    }
  }
  /**
   * @type {boolean} Are we currently casting
   */
  get mediaIsCasting() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_IS_CASTING);
  }
  set mediaIsCasting(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_IS_CASTING, value);
  }
  /**
   * @type {string | undefined} Cast unavailability state
   */
  get mediaCastUnavailable() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_CAST_UNAVAILABLE);
  }
  set mediaCastUnavailable(value) {
    setStringAttr(this, MediaUIAttributes.MEDIA_CAST_UNAVAILABLE, value);
  }
  handleClick() {
    const eventName = this.mediaIsCasting ? MediaUIEvents.MEDIA_EXIT_CAST_REQUEST : MediaUIEvents.MEDIA_ENTER_CAST_REQUEST;
    this.dispatchEvent(
      new GlobalThis.CustomEvent(eventName, { composed: true, bubbles: true })
    );
  }
};
MediaCastButton.getSlotTemplateHTML = getSlotTemplateHTML4;
MediaCastButton.getTooltipContentHTML = getTooltipContentHTML4;
if (!GlobalThis.customElements.get("media-cast-button")) {
  GlobalThis.customElements.define("media-cast-button", MediaCastButton);
}

// node_modules/media-chrome/dist/media-chrome-dialog.js
var __accessCheck6 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet7 = (obj, member, getter) => {
  __accessCheck6(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd7 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet7 = (obj, member, value, setter) => {
  __accessCheck6(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod5 = (obj, member, method) => {
  __accessCheck6(obj, member, "access private method");
  return method;
};
var _isInit2;
var _previouslyFocused;
var _invokerElement;
var _init;
var init_fn2;
var _handleOpen;
var handleOpen_fn;
var _handleClosed;
var handleClosed_fn;
var _handleInvoke;
var handleInvoke_fn;
var _handleFocusOut;
var handleFocusOut_fn;
var _handleKeyDown;
var handleKeyDown_fn;
function getTemplateHTML5(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        display: var(--media-dialog-display, inline-flex);
        justify-content: center;
        align-items: center;
        ${/** The hide transition is defined below after a short delay. */
    ""}
        transition-behavior: allow-discrete;
        visibility: hidden;
        opacity: 0;
        transform: translateY(2px) scale(.99);
        pointer-events: none;
      }

      :host([open]) {
        transition: display .2s, visibility 0s, opacity .2s ease-out, transform .15s ease-out;
        visibility: visible;
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      #content {
        display: flex;
        position: relative;
        box-sizing: border-box;
        width: min(320px, 100%);
        word-wrap: break-word;
        max-height: 100%;
        overflow: auto;
        text-align: center;
        line-height: 1.4;
      }
    </style>
    ${this.getSlotTemplateHTML(_attrs)}
  `
  );
}
function getSlotTemplateHTML5(_attrs) {
  return (
    /*html*/
    `
    <slot id="content"></slot>
  `
  );
}
var Attributes5 = {
  OPEN: "open",
  ANCHOR: "anchor"
};
var MediaChromeDialog = class extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd7(this, _init);
    __privateAdd7(this, _handleOpen);
    __privateAdd7(this, _handleClosed);
    __privateAdd7(this, _handleInvoke);
    __privateAdd7(this, _handleFocusOut);
    __privateAdd7(this, _handleKeyDown);
    __privateAdd7(this, _isInit2, false);
    __privateAdd7(this, _previouslyFocused, null);
    __privateAdd7(this, _invokerElement, null);
    this.addEventListener("invoke", this);
    this.addEventListener("focusout", this);
    this.addEventListener("keydown", this);
  }
  static get observedAttributes() {
    return [Attributes5.OPEN, Attributes5.ANCHOR];
  }
  get open() {
    return getBooleanAttr(this, Attributes5.OPEN);
  }
  set open(value) {
    setBooleanAttr(this, Attributes5.OPEN, value);
  }
  handleEvent(event) {
    switch (event.type) {
      case "invoke":
        __privateMethod5(this, _handleInvoke, handleInvoke_fn).call(this, event);
        break;
      case "focusout":
        __privateMethod5(this, _handleFocusOut, handleFocusOut_fn).call(this, event);
        break;
      case "keydown":
        __privateMethod5(this, _handleKeyDown, handleKeyDown_fn).call(this, event);
        break;
    }
  }
  connectedCallback() {
    __privateMethod5(this, _init, init_fn2).call(this);
    if (!this.role) {
      this.role = "dialog";
    }
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    __privateMethod5(this, _init, init_fn2).call(this);
    if (attrName === Attributes5.OPEN && newValue !== oldValue) {
      if (this.open) {
        __privateMethod5(this, _handleOpen, handleOpen_fn).call(this);
      } else {
        __privateMethod5(this, _handleClosed, handleClosed_fn).call(this);
      }
    }
  }
  focus() {
    __privateSet7(this, _previouslyFocused, getActiveElement());
    const focusCancelled = !this.dispatchEvent(new Event("focus", { composed: true, cancelable: true }));
    const focusInCancelled = !this.dispatchEvent(new Event("focusin", { composed: true, bubbles: true, cancelable: true }));
    if (focusCancelled || focusInCancelled)
      return;
    const focusable = this.querySelector(
      '[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]'
    );
    focusable == null ? void 0 : focusable.focus();
  }
  get keysUsed() {
    return ["Escape", "Tab"];
  }
};
_isInit2 = /* @__PURE__ */ new WeakMap();
_previouslyFocused = /* @__PURE__ */ new WeakMap();
_invokerElement = /* @__PURE__ */ new WeakMap();
_init = /* @__PURE__ */ new WeakSet();
init_fn2 = function() {
  if (__privateGet7(this, _isInit2))
    return;
  __privateSet7(this, _isInit2, true);
  if (!this.shadowRoot) {
    this.attachShadow(this.constructor.shadowRootOptions);
    const attrs = namedNodeMapToObject(this.attributes);
    this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    queueMicrotask(() => {
      const { style } = getOrInsertCSSRule(this.shadowRoot, ":host");
      style.setProperty(
        "transition",
        `display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in`
      );
    });
  }
};
_handleOpen = /* @__PURE__ */ new WeakSet();
handleOpen_fn = function() {
  var _a4;
  (_a4 = __privateGet7(this, _invokerElement)) == null ? void 0 : _a4.setAttribute("aria-expanded", "true");
  this.dispatchEvent(new Event("open", { composed: true, bubbles: true }));
  this.addEventListener("transitionend", () => this.focus(), { once: true });
};
_handleClosed = /* @__PURE__ */ new WeakSet();
handleClosed_fn = function() {
  var _a4;
  (_a4 = __privateGet7(this, _invokerElement)) == null ? void 0 : _a4.setAttribute("aria-expanded", "false");
  this.dispatchEvent(new Event("close", { composed: true, bubbles: true }));
};
_handleInvoke = /* @__PURE__ */ new WeakSet();
handleInvoke_fn = function(event) {
  __privateSet7(this, _invokerElement, event.relatedTarget);
  if (!containsComposedNode(this, event.relatedTarget)) {
    this.open = !this.open;
  }
};
_handleFocusOut = /* @__PURE__ */ new WeakSet();
handleFocusOut_fn = function(event) {
  var _a4;
  if (!containsComposedNode(this, event.relatedTarget)) {
    (_a4 = __privateGet7(this, _previouslyFocused)) == null ? void 0 : _a4.focus();
    if (__privateGet7(this, _invokerElement) && __privateGet7(this, _invokerElement) !== event.relatedTarget && this.open) {
      this.open = false;
    }
  }
};
_handleKeyDown = /* @__PURE__ */ new WeakSet();
handleKeyDown_fn = function(event) {
  var _a4, _b, _c, _d, _e4;
  const { key, ctrlKey, altKey, metaKey } = event;
  if (ctrlKey || altKey || metaKey) {
    return;
  }
  if (!this.keysUsed.includes(key)) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  if (key === "Tab") {
    if (event.shiftKey) {
      (_b = (_a4 = this.previousElementSibling) == null ? void 0 : _a4.focus) == null ? void 0 : _b.call(_a4);
    } else {
      (_d = (_c = this.nextElementSibling) == null ? void 0 : _c.focus) == null ? void 0 : _d.call(_c);
    }
    this.blur();
  } else if (key === "Escape") {
    (_e4 = __privateGet7(this, _previouslyFocused)) == null ? void 0 : _e4.focus();
    this.open = false;
  }
};
MediaChromeDialog.shadowRootOptions = { mode: "open" };
MediaChromeDialog.getTemplateHTML = getTemplateHTML5;
MediaChromeDialog.getSlotTemplateHTML = getSlotTemplateHTML5;
if (!GlobalThis.customElements.get("media-chrome-dialog")) {
  GlobalThis.customElements.define("media-chrome-dialog", MediaChromeDialog);
}

// node_modules/media-chrome/dist/media-chrome-range.js
var __accessCheck7 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet8 = (obj, member, getter) => {
  __accessCheck7(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd8 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet8 = (obj, member, value, setter) => {
  __accessCheck7(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod6 = (obj, member, method) => {
  __accessCheck7(obj, member, "access private method");
  return method;
};
var _mediaController3;
var _isInputTarget;
var _startpoint;
var _endpoint;
var _cssRules;
var _segments;
var _onFocusIn;
var _onFocusOut;
var _updateComputedStyles;
var _updateActiveSegment;
var updateActiveSegment_fn;
var _enableUserEvents;
var enableUserEvents_fn;
var _disableUserEvents;
var disableUserEvents_fn;
var _handlePointerDown;
var handlePointerDown_fn;
var _handlePointerEnter;
var handlePointerEnter_fn;
var _handlePointerUp2;
var handlePointerUp_fn2;
var _handlePointerLeave;
var handlePointerLeave_fn;
var _handlePointerMove2;
var handlePointerMove_fn2;
function getTemplateHTML6(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        --_focus-box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        --_media-range-padding: var(--media-range-padding, var(--media-control-padding, 10px));

        box-shadow: var(--_focus-visible-box-shadow, none);
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        height: calc(var(--media-control-height, 24px) + 2 * var(--_media-range-padding));
        display: inline-flex;
        align-items: center;
        ${/* Don't horizontal align w/ justify-content! #container can go negative on the x-axis w/ small width. */
    ""}
        vertical-align: middle;
        box-sizing: border-box;
        position: relative;
        width: 100px;
        transition: background .15s linear;
        cursor: var(--media-cursor, pointer);
        pointer-events: auto;
        touch-action: none; ${/* Prevent scrolling when dragging on mobile. */
    ""}
      }

      ${/* Reset before `outline` on track could be set by a CSS var */
    ""}
      input[type=range]:focus {
        outline: 0;
      }
      input[type=range]:focus::-webkit-slider-runnable-track {
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgb(50 50 70 / .7));
      }

      #leftgap {
        padding-left: var(--media-range-padding-left, var(--_media-range-padding));
      }

      #rightgap {
        padding-right: var(--media-range-padding-right, var(--_media-range-padding));
      }

      #startpoint,
      #endpoint {
        position: absolute;
      }

      #endpoint {
        right: 0;
      }

      #container {
        ${/* Not using the CSS `padding` prop makes it easier for slide open volume ranges so the width can be zero. */
    ""}
        width: var(--media-range-track-width, 100%);
        transform: translate(var(--media-range-track-translate-x, 0px), var(--media-range-track-translate-y, 0px));
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        min-width: 40px;
      }

      #range {
        ${/* The input range acts as a hover and hit zone for input events. */
    ""}
        display: var(--media-time-range-hover-display, block);
        bottom: var(--media-time-range-hover-bottom, -7px);
        height: var(--media-time-range-hover-height, max(100% + 7px, 25px));
        width: 100%;
        position: absolute;
        cursor: var(--media-cursor, pointer);

        -webkit-appearance: none; ${/* Hides the slider so that custom slider can be made */
    ""}
        -webkit-tap-highlight-color: transparent;
        background: transparent; ${/* Otherwise white in Chrome */
    ""}
        margin: 0;
        z-index: 1;
      }

      @media (hover: hover) {
        #range {
          bottom: var(--media-time-range-hover-bottom, -5px);
          height: var(--media-time-range-hover-height, max(100% + 5px, 20px));
        }
      }

      ${/* Special styling for WebKit/Blink */
    ""}
      ${/* Make thumb width/height small so it has no effect on range click position. */
    ""}
      #range::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: transparent;
        width: .1px;
        height: .1px;
      }

      ${/* The thumb is not positioned relative to the track in Firefox */
    ""}
      #range::-moz-range-thumb {
        background: transparent;
        border: transparent;
        width: .1px;
        height: .1px;
      }

      #appearance {
        height: var(--media-range-track-height, 4px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        position: absolute;
        ${/* Required for Safari to stop glitching track height on hover */
    ""}
        will-change: transform;
      }

      #track {
        background: var(--media-range-track-background, rgb(255 255 255 / .2));
        border-radius: var(--media-range-track-border-radius, 1px);
        border: var(--media-range-track-border, none);
        outline: var(--media-range-track-outline);
        outline-offset: var(--media-range-track-outline-offset);
        backdrop-filter: var(--media-range-track-backdrop-filter);
        -webkit-backdrop-filter: var(--media-range-track-backdrop-filter);
        box-shadow: var(--media-range-track-box-shadow, none);
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      #progress,
      #pointer {
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #progress {
        background: var(--media-range-bar-color, var(--media-primary-color, rgb(238 238 238)));
        transition: var(--media-range-track-transition);
      }

      #pointer {
        background: var(--media-range-track-pointer-background);
        border-right: var(--media-range-track-pointer-border-right);
        transition: visibility .25s, opacity .25s;
        visibility: hidden;
        opacity: 0;
      }

      @media (hover: hover) {
        :host(:hover) #pointer {
          transition: visibility .5s, opacity .5s;
          visibility: visible;
          opacity: 1;
        }
      }

      #thumb,
      ::slotted([slot=thumb]) {
        width: var(--media-range-thumb-width, 10px);
        height: var(--media-range-thumb-height, 10px);
        transition: var(--media-range-thumb-transition);
        transform: var(--media-range-thumb-transform, none);
        opacity: var(--media-range-thumb-opacity, 1);
        translate: -50%;
        position: absolute;
        left: 0;
        cursor: var(--media-cursor, pointer);
      }

      #thumb {
        border-radius: var(--media-range-thumb-border-radius, 10px);
        background: var(--media-range-thumb-background, var(--media-primary-color, rgb(238 238 238)));
        box-shadow: var(--media-range-thumb-box-shadow, 1px 1px 1px transparent);
        border: var(--media-range-thumb-border, none);
      }

      :host([disabled]) #thumb {
        background-color: #777;
      }

      .segments #appearance {
        height: var(--media-range-segment-hover-height, 7px);
      }

      #track {
        clip-path: url(#segments-clipping);
      }

      #segments {
        --segments-gap: var(--media-range-segments-gap, 2px);
        position: absolute;
        width: 100%;
        height: 100%;
      }

      #segments-clipping {
        transform: translateX(calc(var(--segments-gap) / 2));
      }

      #segments-clipping:empty {
        display: none;
      }

      #segments-clipping rect {
        height: var(--media-range-track-height, 4px);
        y: calc((var(--media-range-segment-hover-height, 7px) - var(--media-range-track-height, 4px)) / 2);
        transition: var(--media-range-segment-transition, transform .1s ease-in-out);
        transform: var(--media-range-segment-transform, scaleY(1));
        transform-origin: center;
      }
    </style>
    <div id="leftgap"></div>
    <div id="container">
      <div id="startpoint"></div>
      <div id="endpoint"></div>
      <div id="appearance">
        <div id="track" part="track">
          <div id="pointer"></div>
          <div id="progress" part="progress"></div>
        </div>
        <slot name="thumb">
          <div id="thumb" part="thumb"></div>
        </slot>
        <svg id="segments"><clipPath id="segments-clipping"></clipPath></svg>
      </div>
      <input id="range" type="range" min="0" max="1" step="any" value="0">
    </div>
    <div id="rightgap"></div>
  `
  );
}
var MediaChromeRange = class extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd8(this, _updateActiveSegment);
    __privateAdd8(this, _enableUserEvents);
    __privateAdd8(this, _disableUserEvents);
    __privateAdd8(this, _handlePointerDown);
    __privateAdd8(this, _handlePointerEnter);
    __privateAdd8(this, _handlePointerUp2);
    __privateAdd8(this, _handlePointerLeave);
    __privateAdd8(this, _handlePointerMove2);
    __privateAdd8(this, _mediaController3, void 0);
    __privateAdd8(this, _isInputTarget, void 0);
    __privateAdd8(this, _startpoint, void 0);
    __privateAdd8(this, _endpoint, void 0);
    __privateAdd8(this, _cssRules, {});
    __privateAdd8(this, _segments, []);
    __privateAdd8(this, _onFocusIn, () => {
      if (this.range.matches(":focus-visible")) {
        const { style } = getOrInsertCSSRule(this.shadowRoot, ":host");
        style.setProperty(
          "--_focus-visible-box-shadow",
          "var(--_focus-box-shadow)"
        );
      }
    });
    __privateAdd8(this, _onFocusOut, () => {
      const { style } = getOrInsertCSSRule(this.shadowRoot, ":host");
      style.removeProperty("--_focus-visible-box-shadow");
    });
    __privateAdd8(this, _updateComputedStyles, () => {
      const clipping = this.shadowRoot.querySelector("#segments-clipping");
      if (clipping)
        clipping.parentNode.append(clipping);
    });
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      const html = this.constructor.getTemplateHTML(attrs);
      this.shadowRoot.setHTMLUnsafe ? this.shadowRoot.setHTMLUnsafe(html) : this.shadowRoot.innerHTML = html;
    }
    this.container = this.shadowRoot.querySelector("#container");
    __privateSet8(this, _startpoint, this.shadowRoot.querySelector("#startpoint"));
    __privateSet8(this, _endpoint, this.shadowRoot.querySelector("#endpoint"));
    this.range = this.shadowRoot.querySelector("#range");
    this.appearance = this.shadowRoot.querySelector("#appearance");
  }
  static get observedAttributes() {
    return [
      "disabled",
      "aria-disabled",
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    ];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a4, _b, _c, _d, _e4;
    if (attrName === MediaStateReceiverAttributes.MEDIA_CONTROLLER) {
      if (oldValue) {
        (_b = (_a4 = __privateGet8(this, _mediaController3)) == null ? void 0 : _a4.unassociateElement) == null ? void 0 : _b.call(_a4, this);
        __privateSet8(this, _mediaController3, null);
      }
      if (newValue && this.isConnected) {
        __privateSet8(this, _mediaController3, (_c = this.getRootNode()) == null ? void 0 : _c.getElementById(newValue));
        (_e4 = (_d = __privateGet8(this, _mediaController3)) == null ? void 0 : _d.associateElement) == null ? void 0 : _e4.call(_d, this);
      }
    } else if (attrName === "disabled" || attrName === "aria-disabled" && oldValue !== newValue) {
      if (newValue == null) {
        this.range.removeAttribute(attrName);
        __privateMethod6(this, _enableUserEvents, enableUserEvents_fn).call(this);
      } else {
        this.range.setAttribute(attrName, newValue);
        __privateMethod6(this, _disableUserEvents, disableUserEvents_fn).call(this);
      }
    }
  }
  connectedCallback() {
    var _a4, _b, _c;
    const { style } = getOrInsertCSSRule(this.shadowRoot, ":host");
    style.setProperty(
      "display",
      `var(--media-control-display, var(--${this.localName}-display, inline-flex))`
    );
    __privateGet8(this, _cssRules).pointer = getOrInsertCSSRule(this.shadowRoot, "#pointer");
    __privateGet8(this, _cssRules).progress = getOrInsertCSSRule(this.shadowRoot, "#progress");
    __privateGet8(this, _cssRules).thumb = getOrInsertCSSRule(
      this.shadowRoot,
      '#thumb, ::slotted([slot="thumb"])'
    );
    __privateGet8(this, _cssRules).activeSegment = getOrInsertCSSRule(
      this.shadowRoot,
      "#segments-clipping rect:nth-child(0)"
    );
    const mediaControllerId = this.getAttribute(
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    );
    if (mediaControllerId) {
      __privateSet8(this, _mediaController3, (_a4 = this.getRootNode()) == null ? void 0 : _a4.getElementById(
        mediaControllerId
      ));
      (_c = (_b = __privateGet8(this, _mediaController3)) == null ? void 0 : _b.associateElement) == null ? void 0 : _c.call(_b, this);
    }
    this.updateBar();
    this.shadowRoot.addEventListener("focusin", __privateGet8(this, _onFocusIn));
    this.shadowRoot.addEventListener("focusout", __privateGet8(this, _onFocusOut));
    __privateMethod6(this, _enableUserEvents, enableUserEvents_fn).call(this);
    observeResize(this.container, __privateGet8(this, _updateComputedStyles));
  }
  disconnectedCallback() {
    var _a4, _b;
    __privateMethod6(this, _disableUserEvents, disableUserEvents_fn).call(this);
    (_b = (_a4 = __privateGet8(this, _mediaController3)) == null ? void 0 : _a4.unassociateElement) == null ? void 0 : _b.call(_a4, this);
    __privateSet8(this, _mediaController3, null);
    this.shadowRoot.removeEventListener("focusin", __privateGet8(this, _onFocusIn));
    this.shadowRoot.removeEventListener("focusout", __privateGet8(this, _onFocusOut));
    unobserveResize(this.container, __privateGet8(this, _updateComputedStyles));
  }
  updatePointerBar(evt) {
    var _a4;
    (_a4 = __privateGet8(this, _cssRules).pointer) == null ? void 0 : _a4.style.setProperty(
      "width",
      `${this.getPointerRatio(evt) * 100}%`
    );
  }
  updateBar() {
    var _a4, _b;
    const rangePercent = this.range.valueAsNumber * 100;
    (_a4 = __privateGet8(this, _cssRules).progress) == null ? void 0 : _a4.style.setProperty("width", `${rangePercent}%`);
    (_b = __privateGet8(this, _cssRules).thumb) == null ? void 0 : _b.style.setProperty("left", `${rangePercent}%`);
  }
  updateSegments(segments) {
    const clipping = this.shadowRoot.querySelector("#segments-clipping");
    clipping.textContent = "";
    this.container.classList.toggle("segments", !!(segments == null ? void 0 : segments.length));
    if (!(segments == null ? void 0 : segments.length))
      return;
    const normalized = [
      .../* @__PURE__ */ new Set([
        +this.range.min,
        ...segments.flatMap((s3) => [s3.start, s3.end]),
        +this.range.max
      ])
    ];
    __privateSet8(this, _segments, [...normalized]);
    const lastMarker = normalized.pop();
    for (const [i2, marker] of normalized.entries()) {
      const [isFirst, isLast] = [i2 === 0, i2 === normalized.length - 1];
      const x7 = isFirst ? "calc(var(--segments-gap) / -1)" : `${marker * 100}%`;
      const x22 = isLast ? lastMarker : normalized[i2 + 1];
      const width = `calc(${(x22 - marker) * 100}%${isFirst || isLast ? "" : ` - var(--segments-gap)`})`;
      const segmentEl = Document2.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      const cssRule = getOrInsertCSSRule(
        this.shadowRoot,
        `#segments-clipping rect:nth-child(${i2 + 1})`
      );
      cssRule.style.setProperty("x", x7);
      cssRule.style.setProperty("width", width);
      clipping.append(segmentEl);
    }
  }
  getPointerRatio(evt) {
    return getPointProgressOnLine(
      evt.clientX,
      evt.clientY,
      __privateGet8(this, _startpoint).getBoundingClientRect(),
      __privateGet8(this, _endpoint).getBoundingClientRect()
    );
  }
  get dragging() {
    return this.hasAttribute("dragging");
  }
  handleEvent(evt) {
    switch (evt.type) {
      case "pointermove":
        __privateMethod6(this, _handlePointerMove2, handlePointerMove_fn2).call(this, evt);
        break;
      case "input":
        this.updateBar();
        break;
      case "pointerenter":
        __privateMethod6(this, _handlePointerEnter, handlePointerEnter_fn).call(this, evt);
        break;
      case "pointerdown":
        __privateMethod6(this, _handlePointerDown, handlePointerDown_fn).call(this, evt);
        break;
      case "pointerup":
        __privateMethod6(this, _handlePointerUp2, handlePointerUp_fn2).call(this);
        break;
      case "pointerleave":
        __privateMethod6(this, _handlePointerLeave, handlePointerLeave_fn).call(this);
        break;
    }
  }
  get keysUsed() {
    return ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
  }
};
_mediaController3 = /* @__PURE__ */ new WeakMap();
_isInputTarget = /* @__PURE__ */ new WeakMap();
_startpoint = /* @__PURE__ */ new WeakMap();
_endpoint = /* @__PURE__ */ new WeakMap();
_cssRules = /* @__PURE__ */ new WeakMap();
_segments = /* @__PURE__ */ new WeakMap();
_onFocusIn = /* @__PURE__ */ new WeakMap();
_onFocusOut = /* @__PURE__ */ new WeakMap();
_updateComputedStyles = /* @__PURE__ */ new WeakMap();
_updateActiveSegment = /* @__PURE__ */ new WeakSet();
updateActiveSegment_fn = function(evt) {
  const rule = __privateGet8(this, _cssRules).activeSegment;
  if (!rule)
    return;
  const pointerRatio = this.getPointerRatio(evt);
  const segmentIndex = __privateGet8(this, _segments).findIndex((start, i2, arr) => {
    const end = arr[i2 + 1];
    return end != null && pointerRatio >= start && pointerRatio <= end;
  });
  const selectorText = `#segments-clipping rect:nth-child(${segmentIndex + 1})`;
  if (rule.selectorText != selectorText || !rule.style.transform) {
    rule.selectorText = selectorText;
    rule.style.setProperty(
      "transform",
      "var(--media-range-segment-hover-transform, scaleY(2))"
    );
  }
};
_enableUserEvents = /* @__PURE__ */ new WeakSet();
enableUserEvents_fn = function() {
  if (this.hasAttribute("disabled"))
    return;
  this.addEventListener("input", this);
  this.addEventListener("pointerdown", this);
  this.addEventListener("pointerenter", this);
};
_disableUserEvents = /* @__PURE__ */ new WeakSet();
disableUserEvents_fn = function() {
  var _a4, _b;
  this.removeEventListener("input", this);
  this.removeEventListener("pointerdown", this);
  this.removeEventListener("pointerenter", this);
  (_a4 = GlobalThis.window) == null ? void 0 : _a4.removeEventListener("pointerup", this);
  (_b = GlobalThis.window) == null ? void 0 : _b.removeEventListener("pointermove", this);
};
_handlePointerDown = /* @__PURE__ */ new WeakSet();
handlePointerDown_fn = function(evt) {
  var _a4;
  __privateSet8(this, _isInputTarget, evt.composedPath().includes(this.range));
  (_a4 = GlobalThis.window) == null ? void 0 : _a4.addEventListener("pointerup", this);
};
_handlePointerEnter = /* @__PURE__ */ new WeakSet();
handlePointerEnter_fn = function(evt) {
  var _a4;
  if (evt.pointerType !== "mouse")
    __privateMethod6(this, _handlePointerDown, handlePointerDown_fn).call(this, evt);
  this.addEventListener("pointerleave", this);
  (_a4 = GlobalThis.window) == null ? void 0 : _a4.addEventListener("pointermove", this);
};
_handlePointerUp2 = /* @__PURE__ */ new WeakSet();
handlePointerUp_fn2 = function() {
  var _a4;
  (_a4 = GlobalThis.window) == null ? void 0 : _a4.removeEventListener("pointerup", this);
  this.toggleAttribute("dragging", false);
  this.range.disabled = this.hasAttribute("disabled");
};
_handlePointerLeave = /* @__PURE__ */ new WeakSet();
handlePointerLeave_fn = function() {
  var _a4, _b;
  this.removeEventListener("pointerleave", this);
  (_a4 = GlobalThis.window) == null ? void 0 : _a4.removeEventListener("pointermove", this);
  this.toggleAttribute("dragging", false);
  this.range.disabled = this.hasAttribute("disabled");
  (_b = __privateGet8(this, _cssRules).activeSegment) == null ? void 0 : _b.style.removeProperty("transform");
};
_handlePointerMove2 = /* @__PURE__ */ new WeakSet();
handlePointerMove_fn2 = function(evt) {
  this.toggleAttribute(
    "dragging",
    evt.buttons === 1 || evt.pointerType !== "mouse"
  );
  this.updatePointerBar(evt);
  __privateMethod6(this, _updateActiveSegment, updateActiveSegment_fn).call(this, evt);
  if (this.dragging && (evt.pointerType !== "mouse" || !__privateGet8(this, _isInputTarget))) {
    this.range.disabled = true;
    this.range.valueAsNumber = this.getPointerRatio(evt);
    this.range.dispatchEvent(
      new Event("input", { bubbles: true, composed: true })
    );
  }
};
MediaChromeRange.shadowRootOptions = { mode: "open" };
MediaChromeRange.getTemplateHTML = getTemplateHTML6;
if (!GlobalThis.customElements.get("media-chrome-range")) {
  GlobalThis.customElements.define("media-chrome-range", MediaChromeRange);
}

// node_modules/media-chrome/dist/media-control-bar.js
var __accessCheck8 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet9 = (obj, member, getter) => {
  __accessCheck8(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd9 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet9 = (obj, member, value, setter) => {
  __accessCheck8(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _mediaController4;
function getTemplateHTML7(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        ${/* Need position to display above video for some reason */
    ""}
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-control-bar-display, inline-flex));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --media-loading-indicator-icon-height: 44px;
      }

      ::slotted(media-time-range),
      ::slotted(media-volume-range) {
        min-height: 100%;
      }

      ::slotted(media-time-range),
      ::slotted(media-clip-selector) {
        flex-grow: 1;
      }

      ::slotted([role="menu"]) {
        position: absolute;
      }
    </style>

    <slot></slot>
  `
  );
}
var MediaControlBar = class extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd9(this, _mediaController4, void 0);
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    }
  }
  static get observedAttributes() {
    return [MediaStateReceiverAttributes.MEDIA_CONTROLLER];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a4, _b, _c, _d, _e4;
    if (attrName === MediaStateReceiverAttributes.MEDIA_CONTROLLER) {
      if (oldValue) {
        (_b = (_a4 = __privateGet9(this, _mediaController4)) == null ? void 0 : _a4.unassociateElement) == null ? void 0 : _b.call(_a4, this);
        __privateSet9(this, _mediaController4, null);
      }
      if (newValue && this.isConnected) {
        __privateSet9(this, _mediaController4, (_c = this.getRootNode()) == null ? void 0 : _c.getElementById(newValue));
        (_e4 = (_d = __privateGet9(this, _mediaController4)) == null ? void 0 : _d.associateElement) == null ? void 0 : _e4.call(_d, this);
      }
    }
  }
  connectedCallback() {
    var _a4, _b, _c;
    const mediaControllerId = this.getAttribute(
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    );
    if (mediaControllerId) {
      __privateSet9(this, _mediaController4, (_a4 = this.getRootNode()) == null ? void 0 : _a4.getElementById(
        mediaControllerId
      ));
      (_c = (_b = __privateGet9(this, _mediaController4)) == null ? void 0 : _b.associateElement) == null ? void 0 : _c.call(_b, this);
    }
  }
  disconnectedCallback() {
    var _a4, _b;
    (_b = (_a4 = __privateGet9(this, _mediaController4)) == null ? void 0 : _a4.unassociateElement) == null ? void 0 : _b.call(_a4, this);
    __privateSet9(this, _mediaController4, null);
  }
};
_mediaController4 = /* @__PURE__ */ new WeakMap();
MediaControlBar.shadowRootOptions = { mode: "open" };
MediaControlBar.getTemplateHTML = getTemplateHTML7;
if (!GlobalThis.customElements.get("media-control-bar")) {
  GlobalThis.customElements.define("media-control-bar", MediaControlBar);
}

// node_modules/media-chrome/dist/media-text-display.js
var __accessCheck9 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet10 = (obj, member, getter) => {
  __accessCheck9(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd10 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet10 = (obj, member, value, setter) => {
  __accessCheck9(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _mediaController5;
function getTemplateHTML8(_attrs, _props = {}) {
  return (
    /*html*/
    `
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-text-background, var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7))));
        padding: var(--media-control-padding, 10px);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        pointer-events: auto;
      }

      ${/*
      Only show outline when keyboard focusing.
      https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo
    */
    ""}
      :host(:focus-visible) {
        box-shadow: inset 0 0 0 2px rgb(27 127 204 / .9);
        outline: 0;
      }

      ${/*
    * hide default focus ring, particularly when using mouse
    */
    ""}
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }
    </style>

    ${this.getSlotTemplateHTML(_attrs, _props)}
  `
  );
}
function getSlotTemplateHTML6(_attrs, _props) {
  return (
    /*html*/
    `
    <slot></slot>
  `
  );
}
var MediaTextDisplay = class extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd10(this, _mediaController5, void 0);
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    }
  }
  static get observedAttributes() {
    return [MediaStateReceiverAttributes.MEDIA_CONTROLLER];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a4, _b, _c, _d, _e4;
    if (attrName === MediaStateReceiverAttributes.MEDIA_CONTROLLER) {
      if (oldValue) {
        (_b = (_a4 = __privateGet10(this, _mediaController5)) == null ? void 0 : _a4.unassociateElement) == null ? void 0 : _b.call(_a4, this);
        __privateSet10(this, _mediaController5, null);
      }
      if (newValue && this.isConnected) {
        __privateSet10(this, _mediaController5, (_c = this.getRootNode()) == null ? void 0 : _c.getElementById(newValue));
        (_e4 = (_d = __privateGet10(this, _mediaController5)) == null ? void 0 : _d.associateElement) == null ? void 0 : _e4.call(_d, this);
      }
    }
  }
  connectedCallback() {
    var _a4, _b, _c;
    const { style } = getOrInsertCSSRule(this.shadowRoot, ":host");
    style.setProperty(
      "display",
      `var(--media-control-display, var(--${this.localName}-display, inline-flex))`
    );
    const mediaControllerId = this.getAttribute(
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    );
    if (mediaControllerId) {
      __privateSet10(this, _mediaController5, (_a4 = this.getRootNode()) == null ? void 0 : _a4.getElementById(
        mediaControllerId
      ));
      (_c = (_b = __privateGet10(this, _mediaController5)) == null ? void 0 : _b.associateElement) == null ? void 0 : _c.call(_b, this);
    }
  }
  disconnectedCallback() {
    var _a4, _b;
    (_b = (_a4 = __privateGet10(this, _mediaController5)) == null ? void 0 : _a4.unassociateElement) == null ? void 0 : _b.call(_a4, this);
    __privateSet10(this, _mediaController5, null);
  }
};
_mediaController5 = /* @__PURE__ */ new WeakMap();
MediaTextDisplay.shadowRootOptions = { mode: "open" };
MediaTextDisplay.getTemplateHTML = getTemplateHTML8;
MediaTextDisplay.getSlotTemplateHTML = getSlotTemplateHTML6;
if (!GlobalThis.customElements.get("media-text-display")) {
  GlobalThis.customElements.define("media-text-display", MediaTextDisplay);
}

// node_modules/media-chrome/dist/media-duration-display.js
var __accessCheck10 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet11 = (obj, member, getter) => {
  __accessCheck10(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd11 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet11 = (obj, member, value, setter) => {
  __accessCheck10(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _slot;
function getSlotTemplateHTML7(_attrs, props) {
  return (
    /*html*/
    `
    <slot>${formatTime(props.mediaDuration)}</slot>
  `
  );
}
var MediaDurationDisplay = class extends MediaTextDisplay {
  constructor() {
    var _a4;
    super();
    __privateAdd11(this, _slot, void 0);
    __privateSet11(this, _slot, this.shadowRoot.querySelector("slot"));
    __privateGet11(this, _slot).textContent = formatTime((_a4 = this.mediaDuration) != null ? _a4 : 0);
  }
  static get observedAttributes() {
    return [...super.observedAttributes, MediaUIAttributes.MEDIA_DURATION];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === MediaUIAttributes.MEDIA_DURATION) {
      __privateGet11(this, _slot).textContent = formatTime(+newValue);
    }
    super.attributeChangedCallback(attrName, oldValue, newValue);
  }
  /**
   * @type {number | undefined} In seconds
   */
  get mediaDuration() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_DURATION);
  }
  set mediaDuration(time) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_DURATION, time);
  }
};
_slot = /* @__PURE__ */ new WeakMap();
MediaDurationDisplay.getSlotTemplateHTML = getSlotTemplateHTML7;
if (!GlobalThis.customElements.get("media-duration-display")) {
  GlobalThis.customElements.define(
    "media-duration-display",
    MediaDurationDisplay
  );
}

// node_modules/media-chrome/dist/labels/labels.js
var defaultErrorTitles = {
  2: t("Network Error"),
  3: t("Decode Error"),
  4: t("Source Not Supported"),
  5: t("Encryption Error")
};
var defaultErrorMessages = {
  2: t("A network error caused the media download to fail."),
  3: t(
    "A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."
  ),
  4: t(
    "An unsupported error occurred. The server or network failed, or your browser does not support this format."
  ),
  5: t("The media is encrypted and there are no keys to decrypt it.")
};
var formatError = (error) => {
  var _a4, _b;
  if (error.code === 1)
    return null;
  return {
    title: (_a4 = defaultErrorTitles[error.code]) != null ? _a4 : `Error ${error.code}`,
    message: (_b = defaultErrorMessages[error.code]) != null ? _b : error.message
  };
};

// node_modules/media-chrome/dist/media-error-dialog.js
var __accessCheck11 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet12 = (obj, member, getter) => {
  __accessCheck11(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd12 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet12 = (obj, member, value, setter) => {
  __accessCheck11(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _mediaError;
function getSlotTemplateHTML8(attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        background: rgb(20 20 30 / .8);
      }

      #content {
        display: block;
        padding: 1.2em 1.5em;
      }

      h3,
      p {
        margin-block: 0 .3em;
      }
    </style>
    <slot name="error-${attrs.mediaerrorcode}" id="content">
      ${formatErrorMessage({ code: +attrs.mediaerrorcode, message: attrs.mediaerrormessage })}
    </slot>
  `
  );
}
function shouldOpenErrorDialog(error) {
  return error.code && formatError(error) !== null;
}
function formatErrorMessage(error) {
  var _a4;
  const { title, message } = (_a4 = formatError(error)) != null ? _a4 : {};
  let html = "";
  if (title)
    html += `<slot name="error-${error.code}-title"><h3>${title}</h3></slot>`;
  if (message)
    html += `<slot name="error-${error.code}-message"><p>${message}</p></slot>`;
  return html;
}
var observedAttributes = [
  MediaUIAttributes.MEDIA_ERROR_CODE,
  MediaUIAttributes.MEDIA_ERROR_MESSAGE
];
var MediaErrorDialog = class extends MediaChromeDialog {
  constructor() {
    super(...arguments);
    __privateAdd12(this, _mediaError, null);
  }
  static get observedAttributes() {
    return [...super.observedAttributes, ...observedAttributes];
  }
  formatErrorMessage(error) {
    return this.constructor.formatErrorMessage(error);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a4;
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (!observedAttributes.includes(attrName))
      return;
    const mediaError = (_a4 = this.mediaError) != null ? _a4 : {
      code: this.mediaErrorCode,
      message: this.mediaErrorMessage
    };
    this.open = shouldOpenErrorDialog(mediaError);
    if (this.open) {
      this.shadowRoot.querySelector("slot").name = `error-${this.mediaErrorCode}`;
      this.shadowRoot.querySelector("#content").innerHTML = this.formatErrorMessage(mediaError);
    }
  }
  get mediaError() {
    return __privateGet12(this, _mediaError);
  }
  set mediaError(value) {
    __privateSet12(this, _mediaError, value);
  }
  get mediaErrorCode() {
    return getNumericAttr(this, "mediaerrorcode");
  }
  set mediaErrorCode(value) {
    setNumericAttr(this, "mediaerrorcode", value);
  }
  get mediaErrorMessage() {
    return getStringAttr(this, "mediaerrormessage");
  }
  set mediaErrorMessage(value) {
    setStringAttr(this, "mediaerrormessage", value);
  }
};
_mediaError = /* @__PURE__ */ new WeakMap();
MediaErrorDialog.getSlotTemplateHTML = getSlotTemplateHTML8;
MediaErrorDialog.formatErrorMessage = formatErrorMessage;
if (!GlobalThis.customElements.get("media-error-dialog")) {
  GlobalThis.customElements.define("media-error-dialog", MediaErrorDialog);
}
var media_error_dialog_default = MediaErrorDialog;

// node_modules/media-chrome/dist/media-fullscreen-button.js
var enterFullscreenIcon = `<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`;
var exitFullscreenIcon = `<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`;
function getSlotTemplateHTML9(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host([${MediaUIAttributes.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      ${/* Double negative, but safer if display doesn't equal 'block' */
    ""}
      :host(:not([${MediaUIAttributes.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${MediaUIAttributes.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
      :host(:not([${MediaUIAttributes.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${enterFullscreenIcon}</slot>
      <slot name="exit">${exitFullscreenIcon}</slot>
    </slot>
  `
  );
}
function getTooltipContentHTML5() {
  return (
    /*html*/
    `
    <slot name="tooltip-enter">${t("Enter fullscreen mode")}</slot>
    <slot name="tooltip-exit">${t("Exit fullscreen mode")}</slot>
  `
  );
}
var updateAriaLabel3 = (el) => {
  const label = el.mediaIsFullscreen ? t("exit fullscreen mode") : t("enter fullscreen mode");
  el.setAttribute("aria-label", label);
};
var MediaFullscreenButton = class extends MediaChromeButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_IS_FULLSCREEN,
      MediaUIAttributes.MEDIA_FULLSCREEN_UNAVAILABLE
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    updateAriaLabel3(this);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_IS_FULLSCREEN) {
      updateAriaLabel3(this);
    }
  }
  /**
   * @type {string | undefined} Fullscreen unavailability state
   */
  get mediaFullscreenUnavailable() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_FULLSCREEN_UNAVAILABLE);
  }
  set mediaFullscreenUnavailable(value) {
    setStringAttr(this, MediaUIAttributes.MEDIA_FULLSCREEN_UNAVAILABLE, value);
  }
  /**
   * @type {boolean} Whether fullscreen is available
   */
  get mediaIsFullscreen() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_IS_FULLSCREEN);
  }
  set mediaIsFullscreen(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_IS_FULLSCREEN, value);
  }
  handleClick() {
    const eventName = this.mediaIsFullscreen ? MediaUIEvents.MEDIA_EXIT_FULLSCREEN_REQUEST : MediaUIEvents.MEDIA_ENTER_FULLSCREEN_REQUEST;
    this.dispatchEvent(
      new GlobalThis.CustomEvent(eventName, { composed: true, bubbles: true })
    );
  }
};
MediaFullscreenButton.getSlotTemplateHTML = getSlotTemplateHTML9;
MediaFullscreenButton.getTooltipContentHTML = getTooltipContentHTML5;
if (!GlobalThis.customElements.get("media-fullscreen-button")) {
  GlobalThis.customElements.define(
    "media-fullscreen-button",
    MediaFullscreenButton
  );
}

// node_modules/media-chrome/dist/media-live-button.js
var { MEDIA_TIME_IS_LIVE, MEDIA_PAUSED } = MediaUIAttributes;
var { MEDIA_SEEK_TO_LIVE_REQUEST, MEDIA_PLAY_REQUEST } = MediaUIEvents;
var indicatorSVG = '<svg viewBox="0 0 6 12"><circle cx="3" cy="6" r="2"></circle></svg>';
function getSlotTemplateHTML10(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        ${/* Override styles for icon-only buttons */
    ""}
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${MEDIA_TIME_IS_LIVE}]:not([${MEDIA_PAUSED}])) slot[name=indicator] > *,
      :host([${MEDIA_TIME_IS_LIVE}]:not([${MEDIA_PAUSED}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${MEDIA_TIME_IS_LIVE}]:not([${MEDIA_PAUSED}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator">${indicatorSVG}</slot>
    ${/*
      A new line between spacer and text creates inconsistent spacing
      between slotted items and default slots.
    */
    ""}
    <slot name="spacer">&nbsp;</slot><slot name="text">${t("live")}</slot>
  `
  );
}
var updateAriaAttributes = (el) => {
  const isPausedOrNotLive = el.mediaPaused || !el.mediaTimeIsLive;
  const label = isPausedOrNotLive ? t("seek to live") : t("playing live");
  el.setAttribute("aria-label", label);
  isPausedOrNotLive ? el.removeAttribute("aria-disabled") : el.setAttribute("aria-disabled", "true");
};
var MediaLiveButton = class extends MediaChromeButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MEDIA_TIME_IS_LIVE,
      MEDIA_PAUSED
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    updateAriaAttributes(this);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    updateAriaAttributes(this);
  }
  /**
   * @type {boolean} Is the media paused
   */
  get mediaPaused() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED);
  }
  set mediaPaused(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED, value);
  }
  /**
   * @type {boolean} Is the media playback currently live
   */
  get mediaTimeIsLive() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_TIME_IS_LIVE);
  }
  set mediaTimeIsLive(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_TIME_IS_LIVE, value);
  }
  handleClick() {
    if (!this.mediaPaused && this.mediaTimeIsLive)
      return;
    this.dispatchEvent(
      new GlobalThis.CustomEvent(MEDIA_SEEK_TO_LIVE_REQUEST, {
        composed: true,
        bubbles: true
      })
    );
    if (this.hasAttribute(MEDIA_PAUSED)) {
      this.dispatchEvent(
        new GlobalThis.CustomEvent(MEDIA_PLAY_REQUEST, {
          composed: true,
          bubbles: true
        })
      );
    }
  }
};
MediaLiveButton.getSlotTemplateHTML = getSlotTemplateHTML10;
if (!GlobalThis.customElements.get("media-live-button")) {
  GlobalThis.customElements.define("media-live-button", MediaLiveButton);
}

// node_modules/media-chrome/dist/media-loading-indicator.js
var __accessCheck12 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet13 = (obj, member, getter) => {
  __accessCheck12(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd13 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet13 = (obj, member, value, setter) => {
  __accessCheck12(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _mediaController6;
var _delay;
var Attributes6 = {
  LOADING_DELAY: "loadingdelay",
  NO_AUTOHIDE: "noautohide"
};
var DEFAULT_LOADING_DELAY = 500;
var loadingIndicatorIcon = `
<svg aria-hidden="true" viewBox="0 0 100 100">
  <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
    <animateTransform
       attributeName="transform"
       attributeType="XML"
       type="rotate"
       dur="1s"
       from="0 50 50"
       to="360 50 50"
       repeatCount="indefinite" />
  </path>
</svg>
`;
function getTemplateHTML9(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${DEFAULT_LOADING_DELAY}ms);
      }

      #status {
        color: rgba(0,0,0,0);
        width: 0px;
        height: 0px;
      }

      :host slot[name=icon] > *,
      :host ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 0);
        transition: opacity 0.15s;
      }

      :host([${MediaUIAttributes.MEDIA_LOADING}]:not([${MediaUIAttributes.MEDIA_PAUSED}])) slot[name=icon] > *,
      :host([${MediaUIAttributes.MEDIA_LOADING}]:not([${MediaUIAttributes.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 1);
        transition: opacity 0.15s var(--_loading-indicator-delay);
      }

      :host #status {
        visibility: var(--media-loading-indicator-opacity, hidden);
        transition: visibility 0.15s;
      }

      :host([${MediaUIAttributes.MEDIA_LOADING}]:not([${MediaUIAttributes.MEDIA_PAUSED}])) #status {
        visibility: var(--media-loading-indicator-opacity, visible);
        transition: visibility 0.15s var(--_loading-indicator-delay);
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-loading-indicator-icon-width);
        height: var(--media-loading-indicator-icon-height, 100px);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
      }
    </style>

    <slot name="icon">${loadingIndicatorIcon}</slot>
    <div id="status" role="status" aria-live="polite">${t("media loading")}</div>
  `
  );
}
var MediaLoadingIndicator = class extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd13(this, _mediaController6, void 0);
    __privateAdd13(this, _delay, DEFAULT_LOADING_DELAY);
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    }
  }
  static get observedAttributes() {
    return [
      MediaStateReceiverAttributes.MEDIA_CONTROLLER,
      MediaUIAttributes.MEDIA_PAUSED,
      MediaUIAttributes.MEDIA_LOADING,
      Attributes6.LOADING_DELAY
    ];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a4, _b, _c, _d, _e4;
    if (attrName === Attributes6.LOADING_DELAY && oldValue !== newValue) {
      this.loadingDelay = Number(newValue);
    } else if (attrName === MediaStateReceiverAttributes.MEDIA_CONTROLLER) {
      if (oldValue) {
        (_b = (_a4 = __privateGet13(this, _mediaController6)) == null ? void 0 : _a4.unassociateElement) == null ? void 0 : _b.call(_a4, this);
        __privateSet13(this, _mediaController6, null);
      }
      if (newValue && this.isConnected) {
        __privateSet13(this, _mediaController6, (_c = this.getRootNode()) == null ? void 0 : _c.getElementById(newValue));
        (_e4 = (_d = __privateGet13(this, _mediaController6)) == null ? void 0 : _d.associateElement) == null ? void 0 : _e4.call(_d, this);
      }
    }
  }
  connectedCallback() {
    var _a4, _b, _c;
    const mediaControllerId = this.getAttribute(
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    );
    if (mediaControllerId) {
      __privateSet13(this, _mediaController6, (_a4 = this.getRootNode()) == null ? void 0 : _a4.getElementById(
        mediaControllerId
      ));
      (_c = (_b = __privateGet13(this, _mediaController6)) == null ? void 0 : _b.associateElement) == null ? void 0 : _c.call(_b, this);
    }
  }
  disconnectedCallback() {
    var _a4, _b;
    (_b = (_a4 = __privateGet13(this, _mediaController6)) == null ? void 0 : _a4.unassociateElement) == null ? void 0 : _b.call(_a4, this);
    __privateSet13(this, _mediaController6, null);
  }
  /**
   * Delay in ms
   */
  get loadingDelay() {
    return __privateGet13(this, _delay);
  }
  set loadingDelay(delay2) {
    __privateSet13(this, _delay, delay2);
    const { style } = getOrInsertCSSRule(this.shadowRoot, ":host");
    style.setProperty(
      "--_loading-indicator-delay",
      `var(--media-loading-indicator-transition-delay, ${delay2}ms)`
    );
  }
  /**
   * Is the media paused
   */
  get mediaPaused() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED);
  }
  set mediaPaused(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED, value);
  }
  /**
   * Is the media loading
   */
  get mediaLoading() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_LOADING);
  }
  set mediaLoading(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_LOADING, value);
  }
  get mediaController() {
    return getStringAttr(this, MediaStateReceiverAttributes.MEDIA_CONTROLLER);
  }
  set mediaController(value) {
    setStringAttr(this, MediaStateReceiverAttributes.MEDIA_CONTROLLER, value);
  }
  get noAutohide() {
    return getBooleanAttr(this, Attributes6.NO_AUTOHIDE);
  }
  set noAutohide(value) {
    setBooleanAttr(this, Attributes6.NO_AUTOHIDE, value);
  }
};
_mediaController6 = /* @__PURE__ */ new WeakMap();
_delay = /* @__PURE__ */ new WeakMap();
MediaLoadingIndicator.shadowRootOptions = { mode: "open" };
MediaLoadingIndicator.getTemplateHTML = getTemplateHTML9;
if (!GlobalThis.customElements.get("media-loading-indicator")) {
  GlobalThis.customElements.define(
    "media-loading-indicator",
    MediaLoadingIndicator
  );
}

// node_modules/media-chrome/dist/media-mute-button.js
var offIcon = `<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`;
var lowIcon = `<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`;
var highIcon = `<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`;
function getSlotTemplateHTML11(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host(:not([${MediaUIAttributes.MEDIA_VOLUME_LEVEL}])) slot[name=icon] slot:not([name=high]),
      :host([${MediaUIAttributes.MEDIA_VOLUME_LEVEL}=high]) slot[name=icon] slot:not([name=high]) {
        display: none !important;
      }

      :host([${MediaUIAttributes.MEDIA_VOLUME_LEVEL}=off]) slot[name=icon] slot:not([name=off]) {
        display: none !important;
      }

      :host([${MediaUIAttributes.MEDIA_VOLUME_LEVEL}=low]) slot[name=icon] slot:not([name=low]) {
        display: none !important;
      }

      :host([${MediaUIAttributes.MEDIA_VOLUME_LEVEL}=medium]) slot[name=icon] slot:not([name=medium]) {
        display: none !important;
      }

      :host(:not([${MediaUIAttributes.MEDIA_VOLUME_LEVEL}=off])) slot[name=tooltip-unmute],
      :host([${MediaUIAttributes.MEDIA_VOLUME_LEVEL}=off]) slot[name=tooltip-mute] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="off">${offIcon}</slot>
      <slot name="low">${lowIcon}</slot>
      <slot name="medium">${lowIcon}</slot>
      <slot name="high">${highIcon}</slot>
    </slot>
  `
  );
}
function getTooltipContentHTML6() {
  return (
    /*html*/
    `
    <slot name="tooltip-mute">${t("Mute")}</slot>
    <slot name="tooltip-unmute">${t("Unmute")}</slot>
  `
  );
}
var updateAriaLabel4 = (el) => {
  const muted = el.mediaVolumeLevel === "off";
  const label = muted ? t("unmute") : t("mute");
  el.setAttribute("aria-label", label);
};
var MediaMuteButton = class extends MediaChromeButton {
  static get observedAttributes() {
    return [...super.observedAttributes, MediaUIAttributes.MEDIA_VOLUME_LEVEL];
  }
  connectedCallback() {
    super.connectedCallback();
    updateAriaLabel4(this);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_VOLUME_LEVEL) {
      updateAriaLabel4(this);
    }
  }
  /**
   * @type {string | undefined}
   */
  get mediaVolumeLevel() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_VOLUME_LEVEL);
  }
  set mediaVolumeLevel(value) {
    setStringAttr(this, MediaUIAttributes.MEDIA_VOLUME_LEVEL, value);
  }
  handleClick() {
    const eventName = this.mediaVolumeLevel === "off" ? MediaUIEvents.MEDIA_UNMUTE_REQUEST : MediaUIEvents.MEDIA_MUTE_REQUEST;
    this.dispatchEvent(
      new GlobalThis.CustomEvent(eventName, { composed: true, bubbles: true })
    );
  }
};
MediaMuteButton.getSlotTemplateHTML = getSlotTemplateHTML11;
MediaMuteButton.getTooltipContentHTML = getTooltipContentHTML6;
if (!GlobalThis.customElements.get("media-mute-button")) {
  GlobalThis.customElements.define("media-mute-button", MediaMuteButton);
}

// node_modules/media-chrome/dist/media-pip-button.js
var pipIcon = `<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`;
function getSlotTemplateHTML12(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host([${MediaUIAttributes.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      :host(:not([${MediaUIAttributes.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${MediaUIAttributes.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
      :host(:not([${MediaUIAttributes.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${pipIcon}</slot>
      <slot name="exit">${pipIcon}</slot>
    </slot>
  `
  );
}
function getTooltipContentHTML7() {
  return (
    /*html*/
    `
    <slot name="tooltip-enter">${t("Enter picture in picture mode")}</slot>
    <slot name="tooltip-exit">${t("Exit picture in picture mode")}</slot>
  `
  );
}
var updateAriaLabel5 = (el) => {
  const label = el.mediaIsPip ? t("exit picture in picture mode") : t("enter picture in picture mode");
  el.setAttribute("aria-label", label);
};
var MediaPipButton = class extends MediaChromeButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_IS_PIP,
      MediaUIAttributes.MEDIA_PIP_UNAVAILABLE
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    updateAriaLabel5(this);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_IS_PIP) {
      updateAriaLabel5(this);
    }
  }
  /**
   * @type {string | undefined} Pip unavailability state
   */
  get mediaPipUnavailable() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_PIP_UNAVAILABLE);
  }
  set mediaPipUnavailable(value) {
    setStringAttr(this, MediaUIAttributes.MEDIA_PIP_UNAVAILABLE, value);
  }
  /**
   * @type {boolean} Is the media currently playing picture-in-picture
   */
  get mediaIsPip() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_IS_PIP);
  }
  set mediaIsPip(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_IS_PIP, value);
  }
  handleClick() {
    const eventName = this.mediaIsPip ? MediaUIEvents.MEDIA_EXIT_PIP_REQUEST : MediaUIEvents.MEDIA_ENTER_PIP_REQUEST;
    this.dispatchEvent(
      new GlobalThis.CustomEvent(eventName, { composed: true, bubbles: true })
    );
  }
};
MediaPipButton.getSlotTemplateHTML = getSlotTemplateHTML12;
MediaPipButton.getTooltipContentHTML = getTooltipContentHTML7;
if (!GlobalThis.customElements.get("media-pip-button")) {
  GlobalThis.customElements.define("media-pip-button", MediaPipButton);
}

// node_modules/media-chrome/dist/media-playback-rate-button.js
var __accessCheck13 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet14 = (obj, member, getter) => {
  __accessCheck13(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd14 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var _rates;
var Attributes7 = {
  RATES: "rates"
};
var DEFAULT_RATES = [1, 1.2, 1.5, 1.7, 2];
var DEFAULT_RATE = 1;
function getSlotTemplateHTML13(attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${attrs["mediaplaybackrate"] || DEFAULT_RATE}x</slot>
  `
  );
}
function getTooltipContentHTML8() {
  return t("Playback rate");
}
var MediaPlaybackRateButton = class extends MediaChromeButton {
  constructor() {
    var _a4;
    super();
    __privateAdd14(this, _rates, new AttributeTokenList(this, Attributes7.RATES, {
      defaultValue: DEFAULT_RATES
    }));
    this.container = this.shadowRoot.querySelector('slot[name="icon"]');
    this.container.innerHTML = `${(_a4 = this.mediaPlaybackRate) != null ? _a4 : DEFAULT_RATE}x`;
  }
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_PLAYBACK_RATE,
      Attributes7.RATES
    ];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === Attributes7.RATES) {
      __privateGet14(this, _rates).value = newValue;
    }
    if (attrName === MediaUIAttributes.MEDIA_PLAYBACK_RATE) {
      const newPlaybackRate = newValue ? +newValue : Number.NaN;
      const playbackRate = !Number.isNaN(newPlaybackRate) ? newPlaybackRate : DEFAULT_RATE;
      this.container.innerHTML = `${playbackRate}x`;
      this.setAttribute(
        "aria-label",
        t("Playback rate {playbackRate}", { playbackRate })
      );
    }
  }
  /**
   * Get the playback rates for the button.
   */
  get rates() {
    return __privateGet14(this, _rates);
  }
  /**
   * Set the playback rates for the button.
   * For React 19+ compatibility, accept a string of space-separated rates.
   */
  set rates(value) {
    if (!value) {
      __privateGet14(this, _rates).value = "";
    } else if (Array.isArray(value)) {
      __privateGet14(this, _rates).value = value.join(" ");
    } else if (typeof value === "string") {
      __privateGet14(this, _rates).value = value;
    }
  }
  /**
   * @type {number} The current playback rate
   */
  get mediaPlaybackRate() {
    return getNumericAttr(
      this,
      MediaUIAttributes.MEDIA_PLAYBACK_RATE,
      DEFAULT_RATE
    );
  }
  set mediaPlaybackRate(value) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_PLAYBACK_RATE, value);
  }
  handleClick() {
    var _a4, _b;
    const availableRates = Array.from(__privateGet14(this, _rates).values(), (str) => +str).sort(
      (a3, b4) => a3 - b4
    );
    const detail = (_b = (_a4 = availableRates.find((r12) => r12 > this.mediaPlaybackRate)) != null ? _a4 : availableRates[0]) != null ? _b : DEFAULT_RATE;
    const evt = new GlobalThis.CustomEvent(
      MediaUIEvents.MEDIA_PLAYBACK_RATE_REQUEST,
      { composed: true, bubbles: true, detail }
    );
    this.dispatchEvent(evt);
  }
};
_rates = /* @__PURE__ */ new WeakMap();
MediaPlaybackRateButton.getSlotTemplateHTML = getSlotTemplateHTML13;
MediaPlaybackRateButton.getTooltipContentHTML = getTooltipContentHTML8;
if (!GlobalThis.customElements.get("media-playback-rate-button")) {
  GlobalThis.customElements.define(
    "media-playback-rate-button",
    MediaPlaybackRateButton
  );
}

// node_modules/media-chrome/dist/media-play-button.js
var playIcon = `<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`;
var pauseIcon = `<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`;
function getSlotTemplateHTML14(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host([${MediaUIAttributes.MEDIA_PAUSED}]) slot[name=pause],
      :host(:not([${MediaUIAttributes.MEDIA_PAUSED}])) slot[name=play] {
        display: none !important;
      }

      :host([${MediaUIAttributes.MEDIA_PAUSED}]) slot[name=tooltip-pause],
      :host(:not([${MediaUIAttributes.MEDIA_PAUSED}])) slot[name=tooltip-play] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="play">${playIcon}</slot>
      <slot name="pause">${pauseIcon}</slot>
    </slot>
  `
  );
}
function getTooltipContentHTML9() {
  return (
    /*html*/
    `
    <slot name="tooltip-play">${t("Play")}</slot>
    <slot name="tooltip-pause">${t("Pause")}</slot>
  `
  );
}
var updateAriaLabel6 = (el) => {
  const label = el.mediaPaused ? t("play") : t("pause");
  el.setAttribute("aria-label", label);
};
var MediaPlayButton = class extends MediaChromeButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_PAUSED,
      MediaUIAttributes.MEDIA_ENDED
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    updateAriaLabel6(this);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_PAUSED) {
      updateAriaLabel6(this);
    }
  }
  /**
   * Is the media paused
   */
  get mediaPaused() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED);
  }
  set mediaPaused(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED, value);
  }
  handleClick() {
    const eventName = this.mediaPaused ? MediaUIEvents.MEDIA_PLAY_REQUEST : MediaUIEvents.MEDIA_PAUSE_REQUEST;
    this.dispatchEvent(
      new GlobalThis.CustomEvent(eventName, { composed: true, bubbles: true })
    );
  }
};
MediaPlayButton.getSlotTemplateHTML = getSlotTemplateHTML14;
MediaPlayButton.getTooltipContentHTML = getTooltipContentHTML9;
if (!GlobalThis.customElements.get("media-play-button")) {
  GlobalThis.customElements.define("media-play-button", MediaPlayButton);
}

// node_modules/media-chrome/dist/media-poster-image.js
var Attributes8 = {
  PLACEHOLDER_SRC: "placeholdersrc",
  SRC: "src"
};
function getTemplateHTML10(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        pointer-events: none;
        display: var(--media-poster-image-display, inline-block);
        box-sizing: border-box;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        background-repeat: no-repeat;
        background-position: var(--media-poster-image-background-position, var(--media-object-position, center));
        background-size: var(--media-poster-image-background-size, var(--media-object-fit, contain));
        object-fit: var(--media-object-fit, contain);
        object-position: var(--media-object-position, center);
      }
    </style>

    <img part="poster img" aria-hidden="true" id="image"/>
  `
  );
}
var unsetBackgroundImage = (el) => {
  el.style.removeProperty("background-image");
};
var setBackgroundImage = (el, image) => {
  el.style["background-image"] = `url('${image}')`;
};
var MediaPosterImage = class extends GlobalThis.HTMLElement {
  static get observedAttributes() {
    return [Attributes8.PLACEHOLDER_SRC, Attributes8.SRC];
  }
  constructor() {
    super();
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    }
    this.image = this.shadowRoot.querySelector("#image");
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === Attributes8.SRC) {
      if (newValue == null) {
        this.image.removeAttribute(Attributes8.SRC);
      } else {
        this.image.setAttribute(Attributes8.SRC, newValue);
      }
    }
    if (attrName === Attributes8.PLACEHOLDER_SRC) {
      if (newValue == null) {
        unsetBackgroundImage(this.image);
      } else {
        setBackgroundImage(this.image, newValue);
      }
    }
  }
  /**
   *
   */
  get placeholderSrc() {
    return getStringAttr(this, Attributes8.PLACEHOLDER_SRC);
  }
  set placeholderSrc(value) {
    setStringAttr(this, Attributes8.SRC, value);
  }
  /**
   *
   */
  get src() {
    return getStringAttr(this, Attributes8.SRC);
  }
  set src(value) {
    setStringAttr(this, Attributes8.SRC, value);
  }
};
MediaPosterImage.shadowRootOptions = { mode: "open" };
MediaPosterImage.getTemplateHTML = getTemplateHTML10;
if (!GlobalThis.customElements.get("media-poster-image")) {
  GlobalThis.customElements.define("media-poster-image", MediaPosterImage);
}

// node_modules/media-chrome/dist/media-preview-chapter-display.js
var __accessCheck14 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet15 = (obj, member, getter) => {
  __accessCheck14(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd15 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet14 = (obj, member, value, setter) => {
  __accessCheck14(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _slot2;
var MediaPreviewChapterDisplay = class extends MediaTextDisplay {
  constructor() {
    super();
    __privateAdd15(this, _slot2, void 0);
    __privateSet14(this, _slot2, this.shadowRoot.querySelector("slot"));
  }
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_PREVIEW_CHAPTER
    ];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_PREVIEW_CHAPTER) {
      if (newValue !== oldValue && newValue != null) {
        __privateGet15(this, _slot2).textContent = newValue;
        if (newValue !== "") {
          this.setAttribute("aria-valuetext", `chapter: ${newValue}`);
        } else {
          this.removeAttribute("aria-valuetext");
        }
      }
    }
  }
  /**
   * @type {string | undefined} Timeline preview chapter
   */
  get mediaPreviewChapter() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_PREVIEW_CHAPTER);
  }
  set mediaPreviewChapter(value) {
    setStringAttr(this, MediaUIAttributes.MEDIA_PREVIEW_CHAPTER, value);
  }
};
_slot2 = /* @__PURE__ */ new WeakMap();
if (!GlobalThis.customElements.get("media-preview-chapter-display")) {
  GlobalThis.customElements.define(
    "media-preview-chapter-display",
    MediaPreviewChapterDisplay
  );
}

// node_modules/media-chrome/dist/media-preview-thumbnail.js
var __accessCheck15 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet16 = (obj, member, getter) => {
  __accessCheck15(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd16 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet15 = (obj, member, value, setter) => {
  __accessCheck15(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _mediaController7;
function getTemplateHTML11(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-preview-thumbnail-display, inline-block));
        overflow: hidden;
      }

      img {
        display: none;
        position: relative;
      }
    </style>
    <img crossorigin loading="eager" decoding="async">
  `
  );
}
var MediaPreviewThumbnail = class extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd16(this, _mediaController7, void 0);
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    }
  }
  static get observedAttributes() {
    return [
      MediaStateReceiverAttributes.MEDIA_CONTROLLER,
      MediaUIAttributes.MEDIA_PREVIEW_IMAGE,
      MediaUIAttributes.MEDIA_PREVIEW_COORDS
    ];
  }
  connectedCallback() {
    var _a4, _b, _c;
    const mediaControllerId = this.getAttribute(
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    );
    if (mediaControllerId) {
      __privateSet15(
        this,
        _mediaController7,
        // @ts-ignore
        (_a4 = this.getRootNode()) == null ? void 0 : _a4.getElementById(mediaControllerId)
      );
      (_c = (_b = __privateGet16(this, _mediaController7)) == null ? void 0 : _b.associateElement) == null ? void 0 : _c.call(_b, this);
    }
  }
  disconnectedCallback() {
    var _a4, _b;
    (_b = (_a4 = __privateGet16(this, _mediaController7)) == null ? void 0 : _a4.unassociateElement) == null ? void 0 : _b.call(_a4, this);
    __privateSet15(this, _mediaController7, null);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a4, _b, _c, _d, _e4;
    if ([
      MediaUIAttributes.MEDIA_PREVIEW_IMAGE,
      MediaUIAttributes.MEDIA_PREVIEW_COORDS
    ].includes(attrName)) {
      this.update();
    }
    if (attrName === MediaStateReceiverAttributes.MEDIA_CONTROLLER) {
      if (oldValue) {
        (_b = (_a4 = __privateGet16(this, _mediaController7)) == null ? void 0 : _a4.unassociateElement) == null ? void 0 : _b.call(_a4, this);
        __privateSet15(this, _mediaController7, null);
      }
      if (newValue && this.isConnected) {
        __privateSet15(this, _mediaController7, (_c = this.getRootNode()) == null ? void 0 : _c.getElementById(newValue));
        (_e4 = (_d = __privateGet16(this, _mediaController7)) == null ? void 0 : _d.associateElement) == null ? void 0 : _e4.call(_d, this);
      }
    }
  }
  /**
   * @type {string | undefined} The url of the preview image
   */
  get mediaPreviewImage() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_PREVIEW_IMAGE);
  }
  set mediaPreviewImage(value) {
    setStringAttr(this, MediaUIAttributes.MEDIA_PREVIEW_IMAGE, value);
  }
  /**
   * @type {Array<number> | undefined} Fixed length array [x, y, width, height] or undefined
   */
  get mediaPreviewCoords() {
    const attrVal = this.getAttribute(MediaUIAttributes.MEDIA_PREVIEW_COORDS);
    if (!attrVal)
      return void 0;
    return attrVal.split(/\s+/).map((coord) => +coord);
  }
  set mediaPreviewCoords(value) {
    if (!value) {
      this.removeAttribute(MediaUIAttributes.MEDIA_PREVIEW_COORDS);
      return;
    }
    this.setAttribute(MediaUIAttributes.MEDIA_PREVIEW_COORDS, value.join(" "));
  }
  update() {
    const coords = this.mediaPreviewCoords;
    const previewImage = this.mediaPreviewImage;
    if (!(coords && previewImage))
      return;
    const [x7, y5, w3, h3] = coords;
    const src = previewImage.split("#")[0];
    const computedStyle = getComputedStyle(this);
    const { maxWidth, maxHeight, minWidth, minHeight } = computedStyle;
    const maxRatio = Math.min(parseInt(maxWidth) / w3, parseInt(maxHeight) / h3);
    const minRatio = Math.max(parseInt(minWidth) / w3, parseInt(minHeight) / h3);
    const isScalingDown = maxRatio < 1;
    const scale = isScalingDown ? maxRatio : minRatio > 1 ? minRatio : 1;
    const { style } = getOrInsertCSSRule(this.shadowRoot, ":host");
    const imgStyle = getOrInsertCSSRule(this.shadowRoot, "img").style;
    const img = this.shadowRoot.querySelector("img");
    const extremum = isScalingDown ? "min" : "max";
    style.setProperty(`${extremum}-width`, "initial", "important");
    style.setProperty(`${extremum}-height`, "initial", "important");
    style.width = `${w3 * scale}px`;
    style.height = `${h3 * scale}px`;
    const resize = () => {
      imgStyle.width = `${this.imgWidth * scale}px`;
      imgStyle.height = `${this.imgHeight * scale}px`;
      imgStyle.display = "block";
    };
    if (img.src !== src) {
      img.onload = () => {
        this.imgWidth = img.naturalWidth;
        this.imgHeight = img.naturalHeight;
        resize();
      };
      img.src = src;
      resize();
    }
    resize();
    imgStyle.transform = `translate(-${x7 * scale}px, -${y5 * scale}px)`;
  }
};
_mediaController7 = /* @__PURE__ */ new WeakMap();
MediaPreviewThumbnail.shadowRootOptions = { mode: "open" };
MediaPreviewThumbnail.getTemplateHTML = getTemplateHTML11;
if (!GlobalThis.customElements.get("media-preview-thumbnail")) {
  GlobalThis.customElements.define(
    "media-preview-thumbnail",
    MediaPreviewThumbnail
  );
}
var media_preview_thumbnail_default = MediaPreviewThumbnail;

// node_modules/media-chrome/dist/media-preview-time-display.js
var __accessCheck16 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet17 = (obj, member, getter) => {
  __accessCheck16(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd17 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet16 = (obj, member, value, setter) => {
  __accessCheck16(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _slot3;
var MediaPreviewTimeDisplay = class extends MediaTextDisplay {
  constructor() {
    super();
    __privateAdd17(this, _slot3, void 0);
    __privateSet16(this, _slot3, this.shadowRoot.querySelector("slot"));
    __privateGet17(this, _slot3).textContent = formatTime(0);
  }
  static get observedAttributes() {
    return [...super.observedAttributes, MediaUIAttributes.MEDIA_PREVIEW_TIME];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_PREVIEW_TIME && newValue != null) {
      __privateGet17(this, _slot3).textContent = formatTime(parseFloat(newValue));
    }
  }
  /**
   * Timeline preview time
   */
  get mediaPreviewTime() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_PREVIEW_TIME);
  }
  set mediaPreviewTime(value) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_PREVIEW_TIME, value);
  }
};
_slot3 = /* @__PURE__ */ new WeakMap();
if (!GlobalThis.customElements.get("media-preview-time-display")) {
  GlobalThis.customElements.define(
    "media-preview-time-display",
    MediaPreviewTimeDisplay
  );
}

// node_modules/media-chrome/dist/media-seek-backward-button.js
var Attributes9 = {
  SEEK_OFFSET: "seekoffset"
};
var DEFAULT_SEEK_OFFSET2 = 30;
var backwardIcon = (seekOffset) => `
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${seekOffset}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`;
function getSlotTemplateHTML15(_attrs, props) {
  return (
    /*html*/
    `
    <slot name="icon">${backwardIcon(props.seekOffset)}</slot>
  `
  );
}
function getTooltipContentHTML10() {
  return t("Seek backward");
}
var DEFAULT_TIME = 0;
var MediaSeekBackwardButton = class extends MediaChromeButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_CURRENT_TIME,
      Attributes9.SEEK_OFFSET
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    this.seekOffset = getNumericAttr(
      this,
      Attributes9.SEEK_OFFSET,
      DEFAULT_SEEK_OFFSET2
    );
  }
  attributeChangedCallback(attrName, _oldValue, newValue) {
    super.attributeChangedCallback(attrName, _oldValue, newValue);
    if (attrName === Attributes9.SEEK_OFFSET) {
      this.seekOffset = getNumericAttr(
        this,
        Attributes9.SEEK_OFFSET,
        DEFAULT_SEEK_OFFSET2
      );
    }
  }
  // Own props
  /**
   * Seek amount in seconds
   */
  get seekOffset() {
    return getNumericAttr(this, Attributes9.SEEK_OFFSET, DEFAULT_SEEK_OFFSET2);
  }
  set seekOffset(value) {
    setNumericAttr(this, Attributes9.SEEK_OFFSET, value);
    this.setAttribute(
      "aria-label",
      t("seek back {seekOffset} seconds", { seekOffset: this.seekOffset })
    );
    updateIconText(getSlotted(this, "icon"), this.seekOffset);
  }
  // Props derived from Media UI Attributes
  /**
   * The current time in seconds
   */
  get mediaCurrentTime() {
    return getNumericAttr(
      this,
      MediaUIAttributes.MEDIA_CURRENT_TIME,
      DEFAULT_TIME
    );
  }
  set mediaCurrentTime(time) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_CURRENT_TIME, time);
  }
  handleClick() {
    const detail = Math.max(this.mediaCurrentTime - this.seekOffset, 0);
    const evt = new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_SEEK_REQUEST, {
      composed: true,
      bubbles: true,
      detail
    });
    this.dispatchEvent(evt);
  }
};
MediaSeekBackwardButton.getSlotTemplateHTML = getSlotTemplateHTML15;
MediaSeekBackwardButton.getTooltipContentHTML = getTooltipContentHTML10;
if (!GlobalThis.customElements.get("media-seek-backward-button")) {
  GlobalThis.customElements.define(
    "media-seek-backward-button",
    MediaSeekBackwardButton
  );
}

// node_modules/media-chrome/dist/media-seek-forward-button.js
var Attributes10 = {
  SEEK_OFFSET: "seekoffset"
};
var DEFAULT_SEEK_OFFSET3 = 30;
var forwardIcon = (seekOffset) => `
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${seekOffset}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`;
function getSlotTemplateHTML16(_attrs, props) {
  return (
    /*html*/
    `
    <slot name="icon">${forwardIcon(props.seekOffset)}</slot>
  `
  );
}
function getTooltipContentHTML11() {
  return t("Seek forward");
}
var DEFAULT_TIME2 = 0;
var MediaSeekForwardButton = class extends MediaChromeButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_CURRENT_TIME,
      Attributes10.SEEK_OFFSET
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    this.seekOffset = getNumericAttr(
      this,
      Attributes10.SEEK_OFFSET,
      DEFAULT_SEEK_OFFSET3
    );
  }
  attributeChangedCallback(attrName, _oldValue, newValue) {
    super.attributeChangedCallback(attrName, _oldValue, newValue);
    if (attrName === Attributes10.SEEK_OFFSET) {
      this.seekOffset = getNumericAttr(
        this,
        Attributes10.SEEK_OFFSET,
        DEFAULT_SEEK_OFFSET3
      );
    }
  }
  // Own props
  /**
   * Seek amount in seconds
   */
  get seekOffset() {
    return getNumericAttr(this, Attributes10.SEEK_OFFSET, DEFAULT_SEEK_OFFSET3);
  }
  set seekOffset(value) {
    setNumericAttr(this, Attributes10.SEEK_OFFSET, value);
    this.setAttribute(
      "aria-label",
      t("seek forward {seekOffset} seconds", { seekOffset: this.seekOffset })
    );
    updateIconText(getSlotted(this, "icon"), this.seekOffset);
  }
  // Props derived from Media UI Attributes
  /**
   * The current time in seconds
   */
  get mediaCurrentTime() {
    return getNumericAttr(
      this,
      MediaUIAttributes.MEDIA_CURRENT_TIME,
      DEFAULT_TIME2
    );
  }
  set mediaCurrentTime(time) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_CURRENT_TIME, time);
  }
  handleClick() {
    const detail = this.mediaCurrentTime + this.seekOffset;
    const evt = new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_SEEK_REQUEST, {
      composed: true,
      bubbles: true,
      detail
    });
    this.dispatchEvent(evt);
  }
};
MediaSeekForwardButton.getSlotTemplateHTML = getSlotTemplateHTML16;
MediaSeekForwardButton.getTooltipContentHTML = getTooltipContentHTML11;
if (!GlobalThis.customElements.get("media-seek-forward-button")) {
  GlobalThis.customElements.define(
    "media-seek-forward-button",
    MediaSeekForwardButton
  );
}

// node_modules/media-chrome/dist/media-time-display.js
var __accessCheck17 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet18 = (obj, member, getter) => {
  __accessCheck17(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd18 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet17 = (obj, member, value, setter) => {
  __accessCheck17(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _slot4;
var Attributes11 = {
  REMAINING: "remaining",
  SHOW_DURATION: "showduration",
  NO_TOGGLE: "notoggle"
};
var CombinedAttributes = [
  ...Object.values(Attributes11),
  MediaUIAttributes.MEDIA_CURRENT_TIME,
  MediaUIAttributes.MEDIA_DURATION,
  MediaUIAttributes.MEDIA_SEEKABLE
];
var ButtonPressedKeys2 = ["Enter", " "];
var DEFAULT_TIMES_SEP = "&nbsp;/&nbsp;";
var formatTimesLabel = (el, { timesSep = DEFAULT_TIMES_SEP } = {}) => {
  var _a4, _b;
  const currentTime = (_a4 = el.mediaCurrentTime) != null ? _a4 : 0;
  const [, seekableEnd] = (_b = el.mediaSeekable) != null ? _b : [];
  let endTime = 0;
  if (Number.isFinite(el.mediaDuration)) {
    endTime = el.mediaDuration;
  } else if (Number.isFinite(seekableEnd)) {
    endTime = seekableEnd;
  }
  const timeLabel = el.remaining ? formatTime(0 - (endTime - currentTime)) : formatTime(currentTime);
  if (!el.showDuration)
    return timeLabel;
  return `${timeLabel}${timesSep}${formatTime(endTime)}`;
};
var DEFAULT_MISSING_TIME_PHRASE = "video not loaded, unknown time.";
var updateAriaValueText = (el) => {
  var _a4;
  const currentTime = el.mediaCurrentTime;
  const [, seekableEnd] = (_a4 = el.mediaSeekable) != null ? _a4 : [];
  let endTime = null;
  if (Number.isFinite(el.mediaDuration)) {
    endTime = el.mediaDuration;
  } else if (Number.isFinite(seekableEnd)) {
    endTime = seekableEnd;
  }
  if (currentTime == null || endTime === null) {
    el.setAttribute("aria-valuetext", DEFAULT_MISSING_TIME_PHRASE);
    return;
  }
  const currentTimePhrase = el.remaining ? formatAsTimePhrase(0 - (endTime - currentTime)) : formatAsTimePhrase(currentTime);
  if (!el.showDuration) {
    el.setAttribute("aria-valuetext", currentTimePhrase);
    return;
  }
  const totalTimePhrase = formatAsTimePhrase(endTime);
  const fullPhrase = `${currentTimePhrase} of ${totalTimePhrase}`;
  el.setAttribute("aria-valuetext", fullPhrase);
};
function getSlotTemplateHTML17(_attrs, props) {
  return (
    /*html*/
    `
    <slot>${formatTimesLabel(props)}</slot>
  `
  );
}
var MediaTimeDisplay = class extends MediaTextDisplay {
  constructor() {
    super();
    __privateAdd18(this, _slot4, void 0);
    __privateSet17(this, _slot4, this.shadowRoot.querySelector("slot"));
    __privateGet18(this, _slot4).innerHTML = `${formatTimesLabel(this)}`;
  }
  static get observedAttributes() {
    return [...super.observedAttributes, ...CombinedAttributes, "disabled"];
  }
  connectedCallback() {
    const { style } = getOrInsertCSSRule(
      this.shadowRoot,
      ":host(:hover:not([notoggle]))"
    );
    style.setProperty("cursor", "var(--media-cursor, pointer)");
    style.setProperty(
      "background",
      "var(--media-control-hover-background, rgba(50 50 70 / .7))"
    );
    if (!this.hasAttribute("disabled")) {
      this.enable();
    }
    this.setAttribute("role", "progressbar");
    this.setAttribute("aria-label", t("playback time"));
    const keyUpHandler = (evt) => {
      const { key } = evt;
      if (!ButtonPressedKeys2.includes(key)) {
        this.removeEventListener("keyup", keyUpHandler);
        return;
      }
      this.toggleTimeDisplay();
    };
    this.addEventListener("keydown", (evt) => {
      const { metaKey, altKey, key } = evt;
      if (metaKey || altKey || !ButtonPressedKeys2.includes(key)) {
        this.removeEventListener("keyup", keyUpHandler);
        return;
      }
      this.addEventListener("keyup", keyUpHandler);
    });
    this.addEventListener("click", this.toggleTimeDisplay);
    super.connectedCallback();
  }
  toggleTimeDisplay() {
    if (this.noToggle) {
      return;
    }
    if (this.hasAttribute("remaining")) {
      this.removeAttribute("remaining");
    } else {
      this.setAttribute("remaining", "");
    }
  }
  disconnectedCallback() {
    this.disable();
    super.disconnectedCallback();
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (CombinedAttributes.includes(attrName)) {
      this.update();
    } else if (attrName === "disabled" && newValue !== oldValue) {
      if (newValue == null) {
        this.enable();
      } else {
        this.disable();
      }
    }
    super.attributeChangedCallback(attrName, oldValue, newValue);
  }
  enable() {
    this.tabIndex = 0;
  }
  disable() {
    this.tabIndex = -1;
  }
  // Own props
  /**
   * Whether to show the remaining time
   */
  get remaining() {
    return getBooleanAttr(this, Attributes11.REMAINING);
  }
  set remaining(show) {
    setBooleanAttr(this, Attributes11.REMAINING, show);
  }
  /**
   * Whether to show the duration
   */
  get showDuration() {
    return getBooleanAttr(this, Attributes11.SHOW_DURATION);
  }
  set showDuration(show) {
    setBooleanAttr(this, Attributes11.SHOW_DURATION, show);
  }
  /**
   * Disable the default behavior that toggles between current and remaining time
   */
  get noToggle() {
    return getBooleanAttr(this, Attributes11.NO_TOGGLE);
  }
  set noToggle(noToggle) {
    setBooleanAttr(this, Attributes11.NO_TOGGLE, noToggle);
  }
  // Props derived from media UI attributes
  /**
   * Get the duration
   */
  get mediaDuration() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_DURATION);
  }
  set mediaDuration(time) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_DURATION, time);
  }
  /**
   * The current time in seconds
   */
  get mediaCurrentTime() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_CURRENT_TIME);
  }
  set mediaCurrentTime(time) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_CURRENT_TIME, time);
  }
  /**
   * Range of values that can be seeked to.
   * An array of two numbers [start, end]
   */
  get mediaSeekable() {
    const seekable = this.getAttribute(MediaUIAttributes.MEDIA_SEEKABLE);
    if (!seekable)
      return void 0;
    return seekable.split(":").map((time) => +time);
  }
  set mediaSeekable(range) {
    if (range == null) {
      this.removeAttribute(MediaUIAttributes.MEDIA_SEEKABLE);
      return;
    }
    this.setAttribute(MediaUIAttributes.MEDIA_SEEKABLE, range.join(":"));
  }
  update() {
    const timesLabel = formatTimesLabel(this);
    updateAriaValueText(this);
    if (timesLabel !== __privateGet18(this, _slot4).innerHTML) {
      __privateGet18(this, _slot4).innerHTML = timesLabel;
    }
  }
};
_slot4 = /* @__PURE__ */ new WeakMap();
MediaTimeDisplay.getSlotTemplateHTML = getSlotTemplateHTML17;
if (!GlobalThis.customElements.get("media-time-display")) {
  GlobalThis.customElements.define("media-time-display", MediaTimeDisplay);
}

// node_modules/media-chrome/dist/utils/range-animation.js
var __accessCheck18 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet19 = (obj, member, getter) => {
  __accessCheck18(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd19 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet18 = (obj, member, value, setter) => {
  __accessCheck18(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet18(obj, member, value, setter);
  },
  get _() {
    return __privateGet19(obj, member, getter);
  }
});
var _range;
var _startTime;
var _previousTime;
var _deltaTime;
var _frameCount;
var _updateTimestamp;
var _updateStartValue;
var _lastRangeIncrease;
var _id;
var _animate;
var RangeAnimation = class {
  constructor(range, callback, fps) {
    __privateAdd19(this, _range, void 0);
    __privateAdd19(this, _startTime, void 0);
    __privateAdd19(this, _previousTime, void 0);
    __privateAdd19(this, _deltaTime, void 0);
    __privateAdd19(this, _frameCount, void 0);
    __privateAdd19(this, _updateTimestamp, void 0);
    __privateAdd19(this, _updateStartValue, void 0);
    __privateAdd19(this, _lastRangeIncrease, void 0);
    __privateAdd19(this, _id, 0);
    __privateAdd19(this, _animate, (now = performance.now()) => {
      __privateSet18(this, _id, requestAnimationFrame(__privateGet19(this, _animate)));
      __privateSet18(this, _deltaTime, performance.now() - __privateGet19(this, _previousTime));
      const fpsInterval = 1e3 / this.fps;
      if (__privateGet19(this, _deltaTime) > fpsInterval) {
        __privateSet18(this, _previousTime, now - __privateGet19(this, _deltaTime) % fpsInterval);
        const fps2 = 1e3 / ((now - __privateGet19(this, _startTime)) / ++__privateWrapper(this, _frameCount)._);
        const delta = (now - __privateGet19(this, _updateTimestamp)) / 1e3 / this.duration;
        let value = __privateGet19(this, _updateStartValue) + delta * this.playbackRate;
        const increase = value - __privateGet19(this, _range).valueAsNumber;
        if (increase > 0) {
          __privateSet18(this, _lastRangeIncrease, this.playbackRate / this.duration / fps2);
        } else {
          __privateSet18(this, _lastRangeIncrease, 0.995 * __privateGet19(this, _lastRangeIncrease));
          value = __privateGet19(this, _range).valueAsNumber + __privateGet19(this, _lastRangeIncrease);
        }
        this.callback(value);
      }
    });
    __privateSet18(this, _range, range);
    this.callback = callback;
    this.fps = fps;
  }
  start() {
    if (__privateGet19(this, _id) !== 0)
      return;
    __privateSet18(this, _previousTime, performance.now());
    __privateSet18(this, _startTime, __privateGet19(this, _previousTime));
    __privateSet18(this, _frameCount, 0);
    __privateGet19(this, _animate).call(this);
  }
  stop() {
    if (__privateGet19(this, _id) === 0)
      return;
    cancelAnimationFrame(__privateGet19(this, _id));
    __privateSet18(this, _id, 0);
  }
  update({ start, duration, playbackRate }) {
    const increase = start - __privateGet19(this, _range).valueAsNumber;
    const durationDelta = Math.abs(duration - this.duration);
    if (increase > 0 || increase < -0.03 || durationDelta >= 0.5) {
      this.callback(start);
    }
    __privateSet18(this, _updateStartValue, start);
    __privateSet18(this, _updateTimestamp, performance.now());
    this.duration = duration;
    this.playbackRate = playbackRate;
  }
};
_range = /* @__PURE__ */ new WeakMap();
_startTime = /* @__PURE__ */ new WeakMap();
_previousTime = /* @__PURE__ */ new WeakMap();
_deltaTime = /* @__PURE__ */ new WeakMap();
_frameCount = /* @__PURE__ */ new WeakMap();
_updateTimestamp = /* @__PURE__ */ new WeakMap();
_updateStartValue = /* @__PURE__ */ new WeakMap();
_lastRangeIncrease = /* @__PURE__ */ new WeakMap();
_id = /* @__PURE__ */ new WeakMap();
_animate = /* @__PURE__ */ new WeakMap();

// node_modules/media-chrome/dist/media-time-range.js
var __accessCheck19 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet20 = (obj, member, getter) => {
  __accessCheck19(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd20 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet19 = (obj, member, value, setter) => {
  __accessCheck19(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod7 = (obj, member, method) => {
  __accessCheck19(obj, member, "access private method");
  return method;
};
var _rootNode;
var _animation;
var _boxes;
var _previewTime;
var _previewBox;
var _currentBox;
var _boxPaddingLeft;
var _boxPaddingRight;
var _mediaChaptersCues;
var _toggleRangeAnimation;
var toggleRangeAnimation_fn;
var _shouldRangeAnimate;
var shouldRangeAnimate_fn;
var _updateRange;
var _getElementRects;
var getElementRects_fn;
var _getBoxPosition;
var getBoxPosition_fn;
var _getBoxShiftPosition;
var getBoxShiftPosition_fn;
var _handlePointerMove3;
var handlePointerMove_fn3;
var _previewRequest;
var previewRequest_fn;
var _seekRequest;
var seekRequest_fn;
var DEFAULT_MISSING_TIME_PHRASE2 = "video not loaded, unknown time.";
var updateAriaValueText2 = (el) => {
  const range = el.range;
  const currentTimePhrase = formatAsTimePhrase(+calcTimeFromRangeValue(el));
  const totalTimePhrase = formatAsTimePhrase(+el.mediaSeekableEnd);
  const fullPhrase = !(currentTimePhrase && totalTimePhrase) ? DEFAULT_MISSING_TIME_PHRASE2 : `${currentTimePhrase} of ${totalTimePhrase}`;
  range.setAttribute("aria-valuetext", fullPhrase);
};
function getTemplateHTML12(_attrs) {
  return (
    /*html*/
    `
    ${MediaChromeRange.getTemplateHTML(_attrs)}
    <style>
      :host {
        --media-box-border-radius: 4px;
        --media-box-padding-left: 10px;
        --media-box-padding-right: 10px;
        --media-preview-border-radius: var(--media-box-border-radius);
        --media-box-arrow-offset: var(--media-box-border-radius);
        --_control-background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        --_preview-background: var(--media-preview-background, var(--_control-background));

        ${/* 1% rail width trick was off in Safari, contain: layout seems to
    prevent the horizontal overflow as well. */
    ""}
        contain: layout;
      }

      #buffered {
        background: var(--media-time-range-buffered-color, rgb(255 255 255 / .4));
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #preview-rail,
      #current-rail {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 100%;
        pointer-events: none;
        will-change: transform;
      }

      [part~="box"] {
        width: min-content;
        ${/* absolute position is needed here so the box doesn't overflow the bounds */
    ""}
        position: absolute;
        bottom: 100%;
        flex-direction: column;
        align-items: center;
        transform: translateX(-50%);
      }

      [part~="current-box"] {
        display: var(--media-current-box-display, var(--media-box-display, flex));
        margin: var(--media-current-box-margin, var(--media-box-margin, 0 0 5px));
        visibility: hidden;
      }

      [part~="preview-box"] {
        display: var(--media-preview-box-display, var(--media-box-display, flex));
        margin: var(--media-preview-box-margin, var(--media-box-margin, 0 0 5px));
        transition-property: var(--media-preview-transition-property, visibility, opacity);
        transition-duration: var(--media-preview-transition-duration-out, .25s);
        transition-delay: var(--media-preview-transition-delay-out, 0s);
        visibility: hidden;
        opacity: 0;
      }

      :host(:is([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}], [${MediaUIAttributes.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
        transition-duration: var(--media-preview-transition-duration-in, .5s);
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
        opacity: 1;
      }

      @media (hover: hover) {
        :host(:is([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}], [${MediaUIAttributes.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
          transition-duration: var(--media-preview-transition-duration-in, .5s);
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
          opacity: 1;
        }
      }

      media-preview-thumbnail,
      ::slotted(media-preview-thumbnail) {
        visibility: hidden;
        ${/* delay changing these CSS props until the preview box transition is ended */
    ""}
        transition: visibility 0s .25s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-thumbnail-background, var(--_preview-background));
        box-shadow: var(--media-preview-thumbnail-box-shadow, 0 0 4px rgb(0 0 0 / .2));
        max-width: var(--media-preview-thumbnail-max-width, 180px);
        max-height: var(--media-preview-thumbnail-max-height, 160px);
        min-width: var(--media-preview-thumbnail-min-width, 120px);
        min-height: var(--media-preview-thumbnail-min-height, 80px);
        border: var(--media-preview-thumbnail-border);
        border-radius: var(--media-preview-thumbnail-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius) 0 0);
      }

      :host([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
      :host([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      @media (hover: hover) {
        :host([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
        :host([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
        }

        :host([${MediaUIAttributes.MEDIA_PREVIEW_TIME}]:hover) {
          --media-time-range-hover-display: block;
        }
      }

      media-preview-chapter-display,
      ::slotted(media-preview-chapter-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        visibility: hidden;
        ${/* delay changing these CSS props until the preview box transition is ended */
    ""}
        transition: min-width 0s, border-radius 0s, margin 0s, padding 0s, visibility 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-chapter-background, var(--_preview-background));
        border-radius: var(--media-preview-chapter-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-chapter-padding, 3.5px 9px);
        margin: var(--media-preview-chapter-margin, 0 0 5px);
        text-shadow: var(--media-preview-chapter-text-shadow, 0 0 4px rgb(0 0 0 / .75));
      }

      :host([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
      :host([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-chapter-border-radius, 0);
        padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
        margin: var(--media-preview-chapter-margin, 0);
        min-width: 100%;
      }

      media-preview-chapter-display[${MediaUIAttributes.MEDIA_PREVIEW_CHAPTER}],
      ::slotted(media-preview-chapter-display[${MediaUIAttributes.MEDIA_PREVIEW_CHAPTER}]) {
        visibility: visible;
      }

      media-preview-chapter-display:not([aria-valuetext]),
      ::slotted(media-preview-chapter-display:not([aria-valuetext])) {
        display: none;
      }

      media-preview-time-display,
      ::slotted(media-preview-time-display),
      media-time-display,
      ::slotted(media-time-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        ${/* delay changing these CSS props until the preview box transition is ended */
    ""}
        transition: min-width 0s, border-radius 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-time-background, var(--_preview-background));
        border-radius: var(--media-preview-time-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-time-padding, 3.5px 9px);
        margin: var(--media-preview-time-margin, 0);
        text-shadow: var(--media-preview-time-text-shadow, 0 0 4px rgb(0 0 0 / .75));
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50%)
        ));
      }

      :host([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
      :host([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-time-border-radius,
          0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
        min-width: 100%;
      }

      :host([${MediaUIAttributes.MEDIA_PREVIEW_TIME}]:hover) {
        --media-time-range-hover-display: block;
      }

      [part~="arrow"],
      ::slotted([part~="arrow"]) {
        display: var(--media-box-arrow-display, inline-block);
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2 + var(--media-box-arrow-offset)),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50% - var(--media-box-arrow-offset))
        ));
        ${/* border-color has to come before border-top-color! */
    ""}
        border-color: transparent;
        border-top-color: var(--media-box-arrow-background, var(--_control-background));
        border-width: var(--media-box-arrow-border-width,
          var(--media-box-arrow-height, 5px) var(--media-box-arrow-width, 6px) 0);
        border-style: solid;
        justify-content: center;
        height: 0;
      }
    </style>
    <div id="preview-rail">
      <slot name="preview" part="box preview-box">
        <media-preview-thumbnail>
          <template shadowrootmode="${media_preview_thumbnail_default.shadowRootOptions.mode}">
            ${media_preview_thumbnail_default.getTemplateHTML({})}
          </template>
        </media-preview-thumbnail>
        <media-preview-chapter-display></media-preview-chapter-display>
        <media-preview-time-display></media-preview-time-display>
        <slot name="preview-arrow"><div part="arrow"></div></slot>
      </slot>
    </div>
    <div id="current-rail">
      <slot name="current" part="box current-box">
        ${/* Example: add the current time w/ arrow to the playhead
    <media-time-display slot="current"></media-time-display>
    <div part="arrow" slot="current"></div> */
    ""}
      </slot>
    </div>
  `
  );
}
var calcRangeValueFromTime = (el, time = el.mediaCurrentTime) => {
  const startTime = Number.isFinite(el.mediaSeekableStart) ? el.mediaSeekableStart : 0;
  const endTime = Number.isFinite(el.mediaDuration) ? el.mediaDuration : el.mediaSeekableEnd;
  if (Number.isNaN(endTime))
    return 0;
  const value = (time - startTime) / (endTime - startTime);
  return Math.max(0, Math.min(value, 1));
};
var calcTimeFromRangeValue = (el, value = el.range.valueAsNumber) => {
  const startTime = Number.isFinite(el.mediaSeekableStart) ? el.mediaSeekableStart : 0;
  const endTime = Number.isFinite(el.mediaDuration) ? el.mediaDuration : el.mediaSeekableEnd;
  if (Number.isNaN(endTime))
    return 0;
  return value * (endTime - startTime) + startTime;
};
var MediaTimeRange = class extends MediaChromeRange {
  constructor() {
    super();
    __privateAdd20(this, _toggleRangeAnimation);
    __privateAdd20(this, _shouldRangeAnimate);
    __privateAdd20(this, _getElementRects);
    __privateAdd20(this, _getBoxPosition);
    __privateAdd20(this, _getBoxShiftPosition);
    __privateAdd20(this, _handlePointerMove3);
    __privateAdd20(this, _previewRequest);
    __privateAdd20(this, _seekRequest);
    __privateAdd20(this, _rootNode, void 0);
    __privateAdd20(this, _animation, void 0);
    __privateAdd20(this, _boxes, void 0);
    __privateAdd20(this, _previewTime, void 0);
    __privateAdd20(this, _previewBox, void 0);
    __privateAdd20(this, _currentBox, void 0);
    __privateAdd20(this, _boxPaddingLeft, void 0);
    __privateAdd20(this, _boxPaddingRight, void 0);
    __privateAdd20(this, _mediaChaptersCues, void 0);
    __privateAdd20(this, _updateRange, (value) => {
      if (this.dragging)
        return;
      if (isValidNumber(value)) {
        this.range.valueAsNumber = value;
      }
      this.updateBar();
    });
    const track = this.shadowRoot.querySelector("#track");
    track.insertAdjacentHTML(
      "afterbegin",
      '<div id="buffered" part="buffered"></div>'
    );
    __privateSet19(this, _boxes, this.shadowRoot.querySelectorAll('[part~="box"]'));
    __privateSet19(this, _previewBox, this.shadowRoot.querySelector('[part~="preview-box"]'));
    __privateSet19(this, _currentBox, this.shadowRoot.querySelector('[part~="current-box"]'));
    const computedStyle = getComputedStyle(this);
    __privateSet19(this, _boxPaddingLeft, parseInt(
      computedStyle.getPropertyValue("--media-box-padding-left")
    ));
    __privateSet19(this, _boxPaddingRight, parseInt(
      computedStyle.getPropertyValue("--media-box-padding-right")
    ));
    __privateSet19(this, _animation, new RangeAnimation(this.range, __privateGet20(this, _updateRange), 60));
  }
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_PAUSED,
      MediaUIAttributes.MEDIA_DURATION,
      MediaUIAttributes.MEDIA_SEEKABLE,
      MediaUIAttributes.MEDIA_CURRENT_TIME,
      MediaUIAttributes.MEDIA_PREVIEW_IMAGE,
      MediaUIAttributes.MEDIA_PREVIEW_TIME,
      MediaUIAttributes.MEDIA_PREVIEW_CHAPTER,
      MediaUIAttributes.MEDIA_BUFFERED,
      MediaUIAttributes.MEDIA_PLAYBACK_RATE,
      MediaUIAttributes.MEDIA_LOADING,
      MediaUIAttributes.MEDIA_ENDED
    ];
  }
  connectedCallback() {
    var _a4;
    super.connectedCallback();
    this.range.setAttribute("aria-label", t("seek"));
    __privateMethod7(this, _toggleRangeAnimation, toggleRangeAnimation_fn).call(this);
    __privateSet19(this, _rootNode, this.getRootNode());
    (_a4 = __privateGet20(this, _rootNode)) == null ? void 0 : _a4.addEventListener("transitionstart", this);
  }
  disconnectedCallback() {
    var _a4;
    super.disconnectedCallback();
    __privateMethod7(this, _toggleRangeAnimation, toggleRangeAnimation_fn).call(this);
    (_a4 = __privateGet20(this, _rootNode)) == null ? void 0 : _a4.removeEventListener("transitionstart", this);
    __privateSet19(this, _rootNode, null);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (oldValue == newValue)
      return;
    if (attrName === MediaUIAttributes.MEDIA_CURRENT_TIME || attrName === MediaUIAttributes.MEDIA_PAUSED || attrName === MediaUIAttributes.MEDIA_ENDED || attrName === MediaUIAttributes.MEDIA_LOADING || attrName === MediaUIAttributes.MEDIA_DURATION || attrName === MediaUIAttributes.MEDIA_SEEKABLE) {
      __privateGet20(this, _animation).update({
        start: calcRangeValueFromTime(this),
        duration: this.mediaSeekableEnd - this.mediaSeekableStart,
        playbackRate: this.mediaPlaybackRate
      });
      __privateMethod7(this, _toggleRangeAnimation, toggleRangeAnimation_fn).call(this);
      updateAriaValueText2(this);
    } else if (attrName === MediaUIAttributes.MEDIA_BUFFERED) {
      this.updateBufferedBar();
    }
    if (attrName === MediaUIAttributes.MEDIA_DURATION || attrName === MediaUIAttributes.MEDIA_SEEKABLE) {
      this.mediaChaptersCues = __privateGet20(this, _mediaChaptersCues);
      this.updateBar();
    }
  }
  get mediaChaptersCues() {
    return __privateGet20(this, _mediaChaptersCues);
  }
  set mediaChaptersCues(value) {
    var _a4;
    __privateSet19(this, _mediaChaptersCues, value);
    this.updateSegments(
      (_a4 = __privateGet20(this, _mediaChaptersCues)) == null ? void 0 : _a4.map((c4) => ({
        start: calcRangeValueFromTime(this, c4.startTime),
        end: calcRangeValueFromTime(this, c4.endTime)
      }))
    );
  }
  /**
   * Is the media paused
   */
  get mediaPaused() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED);
  }
  set mediaPaused(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED, value);
  }
  /**
   * Is the media loading
   */
  get mediaLoading() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_LOADING);
  }
  set mediaLoading(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_LOADING, value);
  }
  /**
   *
   */
  get mediaDuration() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_DURATION);
  }
  set mediaDuration(value) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_DURATION, value);
  }
  /**
   *
   */
  get mediaCurrentTime() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_CURRENT_TIME);
  }
  set mediaCurrentTime(value) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_CURRENT_TIME, value);
  }
  /**
   *
   */
  get mediaPlaybackRate() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_PLAYBACK_RATE, 1);
  }
  set mediaPlaybackRate(value) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_PLAYBACK_RATE, value);
  }
  /**
   * An array of ranges, each range being an array of two numbers.
   * e.g. [[1, 2], [3, 4]]
   */
  get mediaBuffered() {
    const buffered = this.getAttribute(MediaUIAttributes.MEDIA_BUFFERED);
    if (!buffered)
      return [];
    return buffered.split(" ").map((timePair) => timePair.split(":").map((timeStr) => +timeStr));
  }
  set mediaBuffered(list) {
    if (!list) {
      this.removeAttribute(MediaUIAttributes.MEDIA_BUFFERED);
      return;
    }
    const strVal = list.map((tuple) => tuple.join(":")).join(" ");
    this.setAttribute(MediaUIAttributes.MEDIA_BUFFERED, strVal);
  }
  /**
   * Range of values that can be seeked to
   * An array of two numbers [start, end]
   */
  get mediaSeekable() {
    const seekable = this.getAttribute(MediaUIAttributes.MEDIA_SEEKABLE);
    if (!seekable)
      return void 0;
    return seekable.split(":").map((time) => +time);
  }
  set mediaSeekable(range) {
    if (range == null) {
      this.removeAttribute(MediaUIAttributes.MEDIA_SEEKABLE);
      return;
    }
    this.setAttribute(MediaUIAttributes.MEDIA_SEEKABLE, range.join(":"));
  }
  /**
   *
   */
  get mediaSeekableEnd() {
    var _a4;
    const [, end = this.mediaDuration] = (_a4 = this.mediaSeekable) != null ? _a4 : [];
    return end;
  }
  get mediaSeekableStart() {
    var _a4;
    const [start = 0] = (_a4 = this.mediaSeekable) != null ? _a4 : [];
    return start;
  }
  /**
   * The url of the preview image
   */
  get mediaPreviewImage() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_PREVIEW_IMAGE);
  }
  set mediaPreviewImage(value) {
    setStringAttr(this, MediaUIAttributes.MEDIA_PREVIEW_IMAGE, value);
  }
  /**
   *
   */
  get mediaPreviewTime() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_PREVIEW_TIME);
  }
  set mediaPreviewTime(value) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_PREVIEW_TIME, value);
  }
  /**
   *
   */
  get mediaEnded() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_ENDED);
  }
  set mediaEnded(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_ENDED, value);
  }
  /* Add a buffered progress bar */
  updateBar() {
    super.updateBar();
    this.updateBufferedBar();
    this.updateCurrentBox();
  }
  updateBufferedBar() {
    var _a4;
    const buffered = this.mediaBuffered;
    if (!buffered.length) {
      return;
    }
    let relativeBufferedEnd;
    if (!this.mediaEnded) {
      const currentTime = this.mediaCurrentTime;
      const [, bufferedEnd = this.mediaSeekableStart] = (_a4 = buffered.find(
        ([start, end]) => start <= currentTime && currentTime <= end
      )) != null ? _a4 : [];
      relativeBufferedEnd = calcRangeValueFromTime(this, bufferedEnd);
    } else {
      relativeBufferedEnd = 1;
    }
    const { style } = getOrInsertCSSRule(this.shadowRoot, "#buffered");
    style.setProperty("width", `${relativeBufferedEnd * 100}%`);
  }
  updateCurrentBox() {
    const currentSlot = this.shadowRoot.querySelector(
      'slot[name="current"]'
    );
    if (!currentSlot.assignedElements().length)
      return;
    const currentRailRule = getOrInsertCSSRule(
      this.shadowRoot,
      "#current-rail"
    );
    const currentBoxRule = getOrInsertCSSRule(
      this.shadowRoot,
      '[part~="current-box"]'
    );
    const rects = __privateMethod7(this, _getElementRects, getElementRects_fn).call(this, __privateGet20(this, _currentBox));
    const boxPos = __privateMethod7(this, _getBoxPosition, getBoxPosition_fn).call(this, rects, this.range.valueAsNumber);
    const boxShift = __privateMethod7(this, _getBoxShiftPosition, getBoxShiftPosition_fn).call(this, rects, this.range.valueAsNumber);
    currentRailRule.style.transform = `translateX(${boxPos})`;
    currentRailRule.style.setProperty("--_range-width", `${rects.range.width}`);
    currentBoxRule.style.setProperty("--_box-shift", `${boxShift}`);
    currentBoxRule.style.setProperty("--_box-width", `${rects.box.width}px`);
    currentBoxRule.style.setProperty("visibility", "initial");
  }
  handleEvent(evt) {
    super.handleEvent(evt);
    switch (evt.type) {
      case "input":
        __privateMethod7(this, _seekRequest, seekRequest_fn).call(this);
        break;
      case "pointermove":
        __privateMethod7(this, _handlePointerMove3, handlePointerMove_fn3).call(this, evt);
        break;
      case "pointerup":
      case "pointerleave":
        __privateMethod7(this, _previewRequest, previewRequest_fn).call(this, null);
        break;
      case "transitionstart":
        if (containsComposedNode(evt.target, this)) {
          setTimeout(() => __privateMethod7(this, _toggleRangeAnimation, toggleRangeAnimation_fn).call(this), 0);
        }
        break;
    }
  }
};
_rootNode = /* @__PURE__ */ new WeakMap();
_animation = /* @__PURE__ */ new WeakMap();
_boxes = /* @__PURE__ */ new WeakMap();
_previewTime = /* @__PURE__ */ new WeakMap();
_previewBox = /* @__PURE__ */ new WeakMap();
_currentBox = /* @__PURE__ */ new WeakMap();
_boxPaddingLeft = /* @__PURE__ */ new WeakMap();
_boxPaddingRight = /* @__PURE__ */ new WeakMap();
_mediaChaptersCues = /* @__PURE__ */ new WeakMap();
_toggleRangeAnimation = /* @__PURE__ */ new WeakSet();
toggleRangeAnimation_fn = function() {
  if (__privateMethod7(this, _shouldRangeAnimate, shouldRangeAnimate_fn).call(this)) {
    __privateGet20(this, _animation).start();
  } else {
    __privateGet20(this, _animation).stop();
  }
};
_shouldRangeAnimate = /* @__PURE__ */ new WeakSet();
shouldRangeAnimate_fn = function() {
  return this.isConnected && !this.mediaPaused && !this.mediaLoading && !this.mediaEnded && this.mediaSeekableEnd > 0 && isElementVisible(this);
};
_updateRange = /* @__PURE__ */ new WeakMap();
_getElementRects = /* @__PURE__ */ new WeakSet();
getElementRects_fn = function(box) {
  var _a4;
  const bounds = (_a4 = this.getAttribute("bounds") ? closestComposedNode(this, `#${this.getAttribute("bounds")}`) : this.parentElement) != null ? _a4 : this;
  const boundsRect = bounds.getBoundingClientRect();
  const rangeRect = this.range.getBoundingClientRect();
  const width = box.offsetWidth;
  const min = -(rangeRect.left - boundsRect.left - width / 2);
  const max = boundsRect.right - rangeRect.left - width / 2;
  return {
    box: { width, min, max },
    bounds: boundsRect,
    range: rangeRect
  };
};
_getBoxPosition = /* @__PURE__ */ new WeakSet();
getBoxPosition_fn = function(rects, ratio) {
  let position = `${ratio * 100}%`;
  const { width, min, max } = rects.box;
  if (!width)
    return position;
  if (!Number.isNaN(min)) {
    const pad = `var(--media-box-padding-left)`;
    const minPos = `calc(1 / var(--_range-width) * 100 * ${min}% + ${pad})`;
    position = `max(${minPos}, ${position})`;
  }
  if (!Number.isNaN(max)) {
    const pad = `var(--media-box-padding-right)`;
    const maxPos = `calc(1 / var(--_range-width) * 100 * ${max}% - ${pad})`;
    position = `min(${position}, ${maxPos})`;
  }
  return position;
};
_getBoxShiftPosition = /* @__PURE__ */ new WeakSet();
getBoxShiftPosition_fn = function(rects, ratio) {
  const { width, min, max } = rects.box;
  const pointerX = ratio * rects.range.width;
  if (pointerX < min + __privateGet20(this, _boxPaddingLeft)) {
    const offset = rects.range.left - rects.bounds.left - __privateGet20(this, _boxPaddingLeft);
    return `${pointerX - width / 2 + offset}px`;
  }
  if (pointerX > max - __privateGet20(this, _boxPaddingRight)) {
    const offset = rects.bounds.right - rects.range.right - __privateGet20(this, _boxPaddingRight);
    return `${pointerX + width / 2 - offset - rects.range.width}px`;
  }
  return 0;
};
_handlePointerMove3 = /* @__PURE__ */ new WeakSet();
handlePointerMove_fn3 = function(evt) {
  const isOverBoxes = [...__privateGet20(this, _boxes)].some(
    (b4) => evt.composedPath().includes(b4)
  );
  if (!this.dragging && (isOverBoxes || !evt.composedPath().includes(this))) {
    __privateMethod7(this, _previewRequest, previewRequest_fn).call(this, null);
    return;
  }
  const duration = this.mediaSeekableEnd;
  if (!duration)
    return;
  const previewRailRule = getOrInsertCSSRule(
    this.shadowRoot,
    "#preview-rail"
  );
  const previewBoxRule = getOrInsertCSSRule(
    this.shadowRoot,
    '[part~="preview-box"]'
  );
  const rects = __privateMethod7(this, _getElementRects, getElementRects_fn).call(this, __privateGet20(this, _previewBox));
  let pointerRatio = (evt.clientX - rects.range.left) / rects.range.width;
  pointerRatio = Math.max(0, Math.min(1, pointerRatio));
  const boxPos = __privateMethod7(this, _getBoxPosition, getBoxPosition_fn).call(this, rects, pointerRatio);
  const boxShift = __privateMethod7(this, _getBoxShiftPosition, getBoxShiftPosition_fn).call(this, rects, pointerRatio);
  previewRailRule.style.transform = `translateX(${boxPos})`;
  previewRailRule.style.setProperty("--_range-width", `${rects.range.width}`);
  previewBoxRule.style.setProperty("--_box-shift", `${boxShift}`);
  previewBoxRule.style.setProperty("--_box-width", `${rects.box.width}px`);
  const diff = Math.round(__privateGet20(this, _previewTime)) - Math.round(pointerRatio * duration);
  if (Math.abs(diff) < 1 && pointerRatio > 0.01 && pointerRatio < 0.99)
    return;
  __privateSet19(this, _previewTime, pointerRatio * duration);
  __privateMethod7(this, _previewRequest, previewRequest_fn).call(this, __privateGet20(this, _previewTime));
};
_previewRequest = /* @__PURE__ */ new WeakSet();
previewRequest_fn = function(detail) {
  this.dispatchEvent(
    new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_PREVIEW_REQUEST, {
      composed: true,
      bubbles: true,
      detail
    })
  );
};
_seekRequest = /* @__PURE__ */ new WeakSet();
seekRequest_fn = function() {
  __privateGet20(this, _animation).stop();
  const detail = calcTimeFromRangeValue(this);
  this.dispatchEvent(
    new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_SEEK_REQUEST, {
      composed: true,
      bubbles: true,
      detail
    })
  );
};
MediaTimeRange.shadowRootOptions = { mode: "open" };
MediaTimeRange.getTemplateHTML = getTemplateHTML12;
if (!GlobalThis.customElements.get("media-time-range")) {
  GlobalThis.customElements.define("media-time-range", MediaTimeRange);
}

// node_modules/media-chrome/dist/media-volume-range.js
var DEFAULT_VOLUME = 1;
var toVolume = (el) => {
  if (el.mediaMuted)
    return 0;
  return el.mediaVolume;
};
var formatAsPercentString = (value) => `${Math.round(value * 100)}%`;
var MediaVolumeRange = class extends MediaChromeRange {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_VOLUME,
      MediaUIAttributes.MEDIA_MUTED,
      MediaUIAttributes.MEDIA_VOLUME_UNAVAILABLE
    ];
  }
  constructor() {
    super();
    this.range.addEventListener("input", () => {
      const detail = this.range.value;
      const evt = new GlobalThis.CustomEvent(
        MediaUIEvents.MEDIA_VOLUME_REQUEST,
        {
          composed: true,
          bubbles: true,
          detail
        }
      );
      this.dispatchEvent(evt);
    });
  }
  connectedCallback() {
    super.connectedCallback();
    this.range.setAttribute("aria-label", t("volume"));
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_VOLUME || attrName === MediaUIAttributes.MEDIA_MUTED) {
      this.range.valueAsNumber = toVolume(this);
      this.range.setAttribute(
        "aria-valuetext",
        formatAsPercentString(this.range.valueAsNumber)
      );
      this.updateBar();
    }
  }
  /**
   *
   */
  get mediaVolume() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_VOLUME, DEFAULT_VOLUME);
  }
  set mediaVolume(value) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_VOLUME, value);
  }
  /**
   * Is the media currently muted
   */
  get mediaMuted() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_MUTED);
  }
  set mediaMuted(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_MUTED, value);
  }
  /**
   * The volume unavailability state
   */
  get mediaVolumeUnavailable() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_VOLUME_UNAVAILABLE);
  }
  set mediaVolumeUnavailable(value) {
    setStringAttr(this, MediaUIAttributes.MEDIA_VOLUME_UNAVAILABLE, value);
  }
};
if (!GlobalThis.customElements.get("media-volume-range")) {
  GlobalThis.customElements.define("media-volume-range", MediaVolumeRange);
}

// node_modules/media-chrome/dist/utils/template-parts.js
var __accessCheck20 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet21 = (obj, member, getter) => {
  __accessCheck20(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd21 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet20 = (obj, member, value, setter) => {
  __accessCheck20(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _parts;
var _processor;
var _items;
var _value;
var _element;
var _attributeName;
var _namespaceURI;
var _list;
var list_get;
var _parentNode;
var _nodes;
var ELEMENT = 1;
var STRING = 0;
var PART = 1;
var defaultProcessor = {
  processCallback(instance, parts, state) {
    if (!state)
      return;
    for (const [expression, part] of parts) {
      if (expression in state) {
        const value = state[expression];
        if (typeof value === "boolean" && part instanceof AttrPart && typeof part.element[part.attributeName] === "boolean") {
          part.booleanValue = value;
        } else if (typeof value === "function" && part instanceof AttrPart) {
          part.element[part.attributeName] = value;
        } else {
          part.value = value;
        }
      }
    }
  }
};
var TemplateInstance = class extends GlobalThis.DocumentFragment {
  constructor(template, state, processor2 = defaultProcessor) {
    var _a4;
    super();
    __privateAdd21(this, _parts, void 0);
    __privateAdd21(this, _processor, void 0);
    this.append(template.content.cloneNode(true));
    __privateSet20(this, _parts, parse(this));
    __privateSet20(this, _processor, processor2);
    (_a4 = processor2.createCallback) == null ? void 0 : _a4.call(processor2, this, __privateGet21(this, _parts), state);
    processor2.processCallback(this, __privateGet21(this, _parts), state);
  }
  update(state) {
    __privateGet21(this, _processor).processCallback(this, __privateGet21(this, _parts), state);
  }
};
_parts = /* @__PURE__ */ new WeakMap();
_processor = /* @__PURE__ */ new WeakMap();
var parse = (element, parts = []) => {
  let type, value;
  for (const attr of element.attributes || []) {
    if (attr.value.includes("{{")) {
      const list = new AttrPartList();
      for ([type, value] of tokenize(attr.value)) {
        if (!type)
          list.append(value);
        else {
          const part = new AttrPart(element, attr.name, attr.namespaceURI);
          list.append(part);
          parts.push([value, part]);
        }
      }
      attr.value = list.toString();
    }
  }
  for (const node of element.childNodes) {
    if (node.nodeType === ELEMENT && !(node instanceof HTMLTemplateElement)) {
      parse(node, parts);
    } else {
      const data = node.data;
      if (node.nodeType === ELEMENT || data.includes("{{")) {
        const items = [];
        if (data) {
          for ([type, value] of tokenize(data))
            if (!type)
              items.push(new Text(value));
            else {
              const part = new ChildNodePart(element);
              items.push(part);
              parts.push([value, part]);
            }
        } else if (node instanceof HTMLTemplateElement) {
          const part = new InnerTemplatePart(element, node);
          items.push(part);
          parts.push([part.expression, part]);
        }
        node.replaceWith(
          ...items.flatMap((part) => part.replacementNodes || [part])
        );
      }
    }
  }
  return parts;
};
var mem = {};
var tokenize = (text) => {
  let value = "", open = 0, tokens = mem[text], i2 = 0, c4;
  if (tokens)
    return tokens;
  else
    tokens = [];
  for (; c4 = text[i2]; i2++) {
    if (c4 === "{" && text[i2 + 1] === "{" && text[i2 - 1] !== "\\" && text[i2 + 2] && ++open == 1) {
      if (value)
        tokens.push([STRING, value]);
      value = "";
      i2++;
    } else if (c4 === "}" && text[i2 + 1] === "}" && text[i2 - 1] !== "\\" && !--open) {
      tokens.push([PART, value.trim()]);
      value = "";
      i2++;
    } else
      value += c4 || "";
  }
  if (value)
    tokens.push([STRING, (open > 0 ? "{{" : "") + value]);
  return mem[text] = tokens;
};
var FRAGMENT = 11;
var Part = class {
  get value() {
    return "";
  }
  set value(val) {
  }
  toString() {
    return this.value;
  }
};
var attrPartToList = /* @__PURE__ */ new WeakMap();
var AttrPartList = class {
  constructor() {
    __privateAdd21(this, _items, []);
  }
  [Symbol.iterator]() {
    return __privateGet21(this, _items).values();
  }
  get length() {
    return __privateGet21(this, _items).length;
  }
  item(index) {
    return __privateGet21(this, _items)[index];
  }
  append(...items) {
    for (const item of items) {
      if (item instanceof AttrPart) {
        attrPartToList.set(item, this);
      }
      __privateGet21(this, _items).push(item);
    }
  }
  toString() {
    return __privateGet21(this, _items).join("");
  }
};
_items = /* @__PURE__ */ new WeakMap();
var AttrPart = class extends Part {
  constructor(element, attributeName, namespaceURI) {
    super();
    __privateAdd21(this, _list);
    __privateAdd21(this, _value, "");
    __privateAdd21(this, _element, void 0);
    __privateAdd21(this, _attributeName, void 0);
    __privateAdd21(this, _namespaceURI, void 0);
    __privateSet20(this, _element, element);
    __privateSet20(this, _attributeName, attributeName);
    __privateSet20(this, _namespaceURI, namespaceURI);
  }
  get attributeName() {
    return __privateGet21(this, _attributeName);
  }
  get attributeNamespace() {
    return __privateGet21(this, _namespaceURI);
  }
  get element() {
    return __privateGet21(this, _element);
  }
  get value() {
    return __privateGet21(this, _value);
  }
  set value(newValue) {
    if (__privateGet21(this, _value) === newValue)
      return;
    __privateSet20(this, _value, newValue);
    if (!__privateGet21(this, _list, list_get) || __privateGet21(this, _list, list_get).length === 1) {
      if (newValue == null) {
        __privateGet21(this, _element).removeAttributeNS(
          __privateGet21(this, _namespaceURI),
          __privateGet21(this, _attributeName)
        );
      } else {
        __privateGet21(this, _element).setAttributeNS(
          __privateGet21(this, _namespaceURI),
          __privateGet21(this, _attributeName),
          newValue
        );
      }
    } else {
      __privateGet21(this, _element).setAttributeNS(
        __privateGet21(this, _namespaceURI),
        __privateGet21(this, _attributeName),
        __privateGet21(this, _list, list_get).toString()
      );
    }
  }
  get booleanValue() {
    return __privateGet21(this, _element).hasAttributeNS(
      __privateGet21(this, _namespaceURI),
      __privateGet21(this, _attributeName)
    );
  }
  set booleanValue(value) {
    if (!__privateGet21(this, _list, list_get) || __privateGet21(this, _list, list_get).length === 1)
      this.value = value ? "" : null;
    else
      throw new DOMException("Value is not fully templatized");
  }
};
_value = /* @__PURE__ */ new WeakMap();
_element = /* @__PURE__ */ new WeakMap();
_attributeName = /* @__PURE__ */ new WeakMap();
_namespaceURI = /* @__PURE__ */ new WeakMap();
_list = /* @__PURE__ */ new WeakSet();
list_get = function() {
  return attrPartToList.get(this);
};
var ChildNodePart = class extends Part {
  constructor(parentNode, nodes) {
    super();
    __privateAdd21(this, _parentNode, void 0);
    __privateAdd21(this, _nodes, void 0);
    __privateSet20(this, _parentNode, parentNode);
    __privateSet20(this, _nodes, nodes ? [...nodes] : [new Text()]);
  }
  get replacementNodes() {
    return __privateGet21(this, _nodes);
  }
  get parentNode() {
    return __privateGet21(this, _parentNode);
  }
  get nextSibling() {
    return __privateGet21(this, _nodes)[__privateGet21(this, _nodes).length - 1].nextSibling;
  }
  get previousSibling() {
    return __privateGet21(this, _nodes)[0].previousSibling;
  }
  // FIXME: not sure why do we need string serialization here? Just because parent class has type DOMString?
  get value() {
    return __privateGet21(this, _nodes).map((node) => node.textContent).join("");
  }
  set value(newValue) {
    this.replace(newValue);
  }
  replace(...nodes) {
    const normalisedNodes = nodes.flat().flatMap(
      (node) => node == null ? [new Text()] : node.forEach ? [...node] : node.nodeType === FRAGMENT ? [...node.childNodes] : node.nodeType ? [node] : [new Text(node)]
    );
    if (!normalisedNodes.length)
      normalisedNodes.push(new Text());
    __privateSet20(this, _nodes, swapdom(
      __privateGet21(this, _nodes)[0].parentNode,
      __privateGet21(this, _nodes),
      normalisedNodes,
      this.nextSibling
    ));
  }
};
_parentNode = /* @__PURE__ */ new WeakMap();
_nodes = /* @__PURE__ */ new WeakMap();
var InnerTemplatePart = class extends ChildNodePart {
  constructor(parentNode, template) {
    const directive = template.getAttribute("directive") || template.getAttribute("type");
    let expression = template.getAttribute("expression") || template.getAttribute(directive) || "";
    if (expression.startsWith("{{"))
      expression = expression.trim().slice(2, -2).trim();
    super(parentNode);
    this.expression = expression;
    this.template = template;
    this.directive = directive;
  }
};
function swapdom(parent, a3, b4, end = null) {
  let i2 = 0, cur, next, bi2, n3 = b4.length, m6 = a3.length;
  while (i2 < n3 && i2 < m6 && a3[i2] == b4[i2])
    i2++;
  while (i2 < n3 && i2 < m6 && b4[n3 - 1] == a3[m6 - 1])
    end = b4[--m6, --n3];
  if (i2 == m6)
    while (i2 < n3)
      parent.insertBefore(b4[i2++], end);
  if (i2 == n3)
    while (i2 < m6)
      parent.removeChild(a3[i2++]);
  else {
    cur = a3[i2];
    while (i2 < n3) {
      bi2 = b4[i2++], next = cur ? cur.nextSibling : end;
      if (cur == bi2)
        cur = next;
      else if (i2 < n3 && b4[i2] == next)
        parent.replaceChild(bi2, cur), cur = next;
      else
        parent.insertBefore(bi2, cur);
    }
    while (cur != end)
      next = cur.nextSibling, parent.removeChild(cur), cur = next;
  }
  return b4;
}

// node_modules/media-chrome/dist/utils/template-processor.js
var pipeModifiers = {
  string: (value) => String(value)
};
var PartialTemplate = class {
  constructor(template) {
    this.template = template;
    this.state = void 0;
  }
};
var templates = /* @__PURE__ */ new WeakMap();
var templateInstances = /* @__PURE__ */ new WeakMap();
var Directives = {
  partial: (part, state) => {
    state[part.expression] = new PartialTemplate(part.template);
  },
  if: (part, state) => {
    var _a4;
    if (evaluateExpression(part.expression, state)) {
      if (templates.get(part) !== part.template) {
        templates.set(part, part.template);
        const tpl = new TemplateInstance(part.template, state, processor);
        part.replace(tpl);
        templateInstances.set(part, tpl);
      } else {
        (_a4 = templateInstances.get(part)) == null ? void 0 : _a4.update(state);
      }
    } else {
      part.replace("");
      templates.delete(part);
      templateInstances.delete(part);
    }
  }
};
var DirectiveNames = Object.keys(Directives);
var processor = {
  processCallback(instance, parts, state) {
    var _a4, _b;
    if (!state)
      return;
    for (const [expression, part] of parts) {
      if (part instanceof InnerTemplatePart) {
        if (!part.directive) {
          const directive = DirectiveNames.find(
            (n3) => part.template.hasAttribute(n3)
          );
          if (directive) {
            part.directive = directive;
            part.expression = part.template.getAttribute(directive);
          }
        }
        (_a4 = Directives[part.directive]) == null ? void 0 : _a4.call(Directives, part, state);
        continue;
      }
      let value = evaluateExpression(expression, state);
      if (value instanceof PartialTemplate) {
        if (templates.get(part) !== value.template) {
          templates.set(part, value.template);
          value = new TemplateInstance(value.template, value.state, processor);
          part.value = value;
          templateInstances.set(part, value);
        } else {
          (_b = templateInstances.get(part)) == null ? void 0 : _b.update(value.state);
        }
        continue;
      }
      if (value) {
        if (part instanceof AttrPart) {
          if (part.attributeName.startsWith("aria-")) {
            value = String(value);
          }
        }
        if (part instanceof AttrPart) {
          if (typeof value === "boolean") {
            part.booleanValue = value;
          } else if (typeof value === "function") {
            part.element[part.attributeName] = value;
          } else {
            part.value = value;
          }
        } else {
          part.value = value;
          templates.delete(part);
          templateInstances.delete(part);
        }
      } else {
        if (part instanceof AttrPart) {
          part.value = void 0;
        } else {
          part.value = void 0;
          templates.delete(part);
          templateInstances.delete(part);
        }
      }
    }
  }
};
var operators = {
  "!": (a3) => !a3,
  "!!": (a3) => !!a3,
  "==": (a3, b4) => a3 == b4,
  "!=": (a3, b4) => a3 != b4,
  ">": (a3, b4) => a3 > b4,
  ">=": (a3, b4) => a3 >= b4,
  "<": (a3, b4) => a3 < b4,
  "<=": (a3, b4) => a3 <= b4,
  "??": (a3, b4) => a3 != null ? a3 : b4,
  "|": (a3, b4) => {
    var _a4;
    return (_a4 = pipeModifiers[b4]) == null ? void 0 : _a4.call(pipeModifiers, a3);
  }
};
function tokenizeExpression(expr) {
  return tokenize2(expr, {
    boolean: /true|false/,
    number: /-?\d+\.?\d*/,
    string: /(["'])((?:\\.|[^\\])*?)\1/,
    operator: /[!=><][=!]?|\?\?|\|/,
    ws: /\s+/,
    param: /[$a-z_][$\w]*/i
  }).filter(({ type }) => type !== "ws");
}
function evaluateExpression(expr, state = {}) {
  var _a4, _b, _c, _d, _e4, _f, _g;
  const tokens = tokenizeExpression(expr);
  if (tokens.length === 0 || tokens.some(({ type }) => !type)) {
    return invalidExpression(expr);
  }
  if (((_a4 = tokens[0]) == null ? void 0 : _a4.token) === ">") {
    const partial = state[(_b = tokens[1]) == null ? void 0 : _b.token];
    if (!partial) {
      return invalidExpression(expr);
    }
    const partialState = { ...state };
    partial.state = partialState;
    const args = tokens.slice(2);
    for (let i2 = 0; i2 < args.length; i2 += 3) {
      const name = (_c = args[i2]) == null ? void 0 : _c.token;
      const operator = (_d = args[i2 + 1]) == null ? void 0 : _d.token;
      const value = (_e4 = args[i2 + 2]) == null ? void 0 : _e4.token;
      if (name && operator === "=") {
        partialState[name] = getParamValue(value, state);
      }
    }
    return partial;
  }
  if (tokens.length === 1) {
    if (!isValidParam(tokens[0])) {
      return invalidExpression(expr);
    }
    return getParamValue(tokens[0].token, state);
  }
  if (tokens.length === 2) {
    const operator = (_f = tokens[0]) == null ? void 0 : _f.token;
    const run = operators[operator];
    if (!run || !isValidParam(tokens[1])) {
      return invalidExpression(expr);
    }
    const a3 = getParamValue(tokens[1].token, state);
    return run(a3);
  }
  if (tokens.length === 3) {
    const operator = (_g = tokens[1]) == null ? void 0 : _g.token;
    const run = operators[operator];
    if (!run || !isValidParam(tokens[0]) || !isValidParam(tokens[2])) {
      return invalidExpression(expr);
    }
    const a3 = getParamValue(tokens[0].token, state);
    if (operator === "|") {
      return run(a3, tokens[2].token);
    }
    const b4 = getParamValue(tokens[2].token, state);
    return run(a3, b4);
  }
}
function invalidExpression(expr) {
  console.warn(`Warning: invalid expression \`${expr}\``);
  return false;
}
function isValidParam({ type }) {
  return ["number", "boolean", "string", "param"].includes(type);
}
function getParamValue(raw, state) {
  const firstChar = raw[0];
  const lastChar = raw.slice(-1);
  if (raw === "true" || raw === "false") {
    return raw === "true";
  }
  if (firstChar === lastChar && [`'`, `"`].includes(firstChar)) {
    return raw.slice(1, -1);
  }
  if (isNumericString(raw)) {
    return parseFloat(raw);
  }
  return state[raw];
}
function tokenize2(str, parsers) {
  let len, match, token;
  const tokens = [];
  while (str) {
    token = null;
    len = str.length;
    for (const key in parsers) {
      match = parsers[key].exec(str);
      if (match && match.index < len) {
        token = {
          token: match[0],
          type: key,
          matches: match.slice(1)
        };
        len = match.index;
      }
    }
    if (len) {
      tokens.push({
        token: str.substr(0, len),
        type: void 0
      });
    }
    if (token) {
      tokens.push(token);
    }
    str = str.substr(len + (token ? token.token.length : 0));
  }
  return tokens;
}

// node_modules/media-chrome/dist/media-theme-element.js
var __accessCheck21 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet22 = (obj, member, getter) => {
  __accessCheck21(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd22 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet21 = (obj, member, value, setter) => {
  __accessCheck21(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod8 = (obj, member, method) => {
  __accessCheck21(obj, member, "access private method");
  return method;
};
var _template;
var _prevTemplate;
var _prevTemplateId;
var _upgradeProperty;
var upgradeProperty_fn;
var _updateTemplate;
var updateTemplate_fn;
var observedMediaAttributes = {
  mediatargetlivewindow: "targetlivewindow",
  mediastreamtype: "streamtype"
};
var prependTemplate = Document2.createElement("template");
prependTemplate.innerHTML = /*html*/
`
  <style>
    :host {
      display: inline-block;
      line-height: 0;
    }

    media-controller {
      width: 100%;
      height: 100%;
    }

    media-captions-button:not([mediasubtitleslist]),
    media-captions-menu:not([mediasubtitleslist]),
    media-captions-menu-button:not([mediasubtitleslist]),
    media-audio-track-menu[mediaaudiotrackunavailable],
    media-audio-track-menu-button[mediaaudiotrackunavailable],
    media-rendition-menu[mediarenditionunavailable],
    media-rendition-menu-button[mediarenditionunavailable],
    media-volume-range[mediavolumeunavailable],
    media-airplay-button[mediaairplayunavailable],
    media-fullscreen-button[mediafullscreenunavailable],
    media-cast-button[mediacastunavailable],
    media-pip-button[mediapipunavailable] {
      display: none;
    }
  </style>
`;
var MediaThemeElement = class extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd22(this, _upgradeProperty);
    __privateAdd22(this, _updateTemplate);
    __privateAdd22(this, _template, void 0);
    __privateAdd22(this, _prevTemplate, void 0);
    __privateAdd22(this, _prevTemplateId, void 0);
    if (this.shadowRoot) {
      this.renderRoot = this.shadowRoot;
    } else {
      this.renderRoot = this.attachShadow({ mode: "open" });
      this.createRenderer();
    }
    const observer2 = new MutationObserver((mutationList) => {
      var _a4;
      if (this.mediaController && !((_a4 = this.mediaController) == null ? void 0 : _a4.breakpointsComputed))
        return;
      if (mutationList.some((mutation) => {
        const target = mutation.target;
        if (target === this)
          return true;
        if (target.localName !== "media-controller")
          return false;
        if (observedMediaAttributes[mutation.attributeName])
          return true;
        if (mutation.attributeName.startsWith("breakpoint"))
          return true;
        return false;
      })) {
        this.render();
      }
    });
    observer2.observe(this, { attributes: true });
    observer2.observe(this.renderRoot, {
      attributes: true,
      subtree: true
    });
    this.addEventListener(
      MediaStateChangeEvents.BREAKPOINTS_COMPUTED,
      this.render
    );
    __privateMethod8(this, _upgradeProperty, upgradeProperty_fn).call(this, "template");
  }
  /** @type {HTMLElement & { breakpointsComputed?: boolean }} */
  get mediaController() {
    return this.renderRoot.querySelector("media-controller");
  }
  get template() {
    var _a4;
    return (_a4 = __privateGet22(this, _template)) != null ? _a4 : this.constructor.template;
  }
  set template(element) {
    __privateSet21(this, _prevTemplateId, null);
    __privateSet21(this, _template, element);
    this.createRenderer();
  }
  get props() {
    var _a4, _b, _c;
    const observedAttributes2 = [
      ...Array.from((_b = (_a4 = this.mediaController) == null ? void 0 : _a4.attributes) != null ? _b : []).filter(
        ({ name }) => {
          return observedMediaAttributes[name] || name.startsWith("breakpoint");
        }
      ),
      ...Array.from(this.attributes)
    ];
    const props = {};
    for (const attr of observedAttributes2) {
      const name = (_c = observedMediaAttributes[attr.name]) != null ? _c : camelCase(attr.name);
      let { value } = attr;
      if (value != null) {
        if (isNumericString(value)) {
          value = parseFloat(value);
        }
        props[name] = value === "" ? true : value;
      } else {
        props[name] = false;
      }
    }
    return props;
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "template" && oldValue != newValue) {
      __privateMethod8(this, _updateTemplate, updateTemplate_fn).call(this);
    }
  }
  connectedCallback() {
    __privateMethod8(this, _updateTemplate, updateTemplate_fn).call(this);
  }
  createRenderer() {
    if (this.template && this.template !== __privateGet22(this, _prevTemplate)) {
      __privateSet21(this, _prevTemplate, this.template);
      this.renderer = new TemplateInstance(
        this.template,
        this.props,
        // @ts-ignore
        this.constructor.processor
      );
      this.renderRoot.textContent = "";
      this.renderRoot.append(
        prependTemplate.content.cloneNode(true),
        this.renderer
      );
    }
  }
  render() {
    var _a4;
    (_a4 = this.renderer) == null ? void 0 : _a4.update(this.props);
  }
};
_template = /* @__PURE__ */ new WeakMap();
_prevTemplate = /* @__PURE__ */ new WeakMap();
_prevTemplateId = /* @__PURE__ */ new WeakMap();
_upgradeProperty = /* @__PURE__ */ new WeakSet();
upgradeProperty_fn = function(prop) {
  if (Object.prototype.hasOwnProperty.call(this, prop)) {
    const value = this[prop];
    delete this[prop];
    this[prop] = value;
  }
};
_updateTemplate = /* @__PURE__ */ new WeakSet();
updateTemplate_fn = function() {
  var _a4;
  const templateId = this.getAttribute("template");
  if (!templateId || templateId === __privateGet22(this, _prevTemplateId))
    return;
  const rootNode = this.getRootNode();
  const template = (_a4 = rootNode == null ? void 0 : rootNode.getElementById) == null ? void 0 : _a4.call(rootNode, templateId);
  if (template) {
    __privateSet21(this, _prevTemplateId, templateId);
    __privateSet21(this, _template, template);
    this.createRenderer();
    return;
  }
  if (isValidUrl(templateId)) {
    __privateSet21(this, _prevTemplateId, templateId);
    request(templateId).then((data) => {
      const template2 = Document2.createElement("template");
      template2.innerHTML = data;
      __privateSet21(this, _template, template2);
      this.createRenderer();
    }).catch(console.error);
  }
};
MediaThemeElement.observedAttributes = ["template"];
MediaThemeElement.processor = processor;
function isValidUrl(url) {
  if (!/^(\/|\.\/|https?:\/\/)/.test(url))
    return false;
  const base = /^https?:\/\//.test(url) ? void 0 : location.origin;
  try {
    new URL(url, base);
  } catch (e2) {
    return false;
  }
  return true;
}
async function request(resource) {
  const response = await fetch(resource);
  if (response.status !== 200) {
    throw new Error(
      `Failed to load resource: the server responded with a status of ${response.status}`
    );
  }
  return response.text();
}
if (!GlobalThis.customElements.get("media-theme")) {
  GlobalThis.customElements.define("media-theme", MediaThemeElement);
}

// node_modules/media-chrome/dist/utils/anchor-utils.js
function computePosition({
  anchor,
  floating,
  placement
}) {
  const rects = getElementRects({ anchor, floating });
  const { x: x7, y: y5 } = computeCoordsFromPlacement(rects, placement);
  return { x: x7, y: y5 };
}
function getElementRects({
  anchor,
  floating
}) {
  return {
    anchor: getRectRelativeToOffsetParent(anchor, floating.offsetParent),
    floating: {
      x: 0,
      y: 0,
      width: floating.offsetWidth,
      height: floating.offsetHeight
    }
  };
}
function getRectRelativeToOffsetParent(element, offsetParent) {
  var _a4;
  const rect = element.getBoundingClientRect();
  const offsetRect = (_a4 = offsetParent == null ? void 0 : offsetParent.getBoundingClientRect()) != null ? _a4 : { x: 0, y: 0 };
  return {
    x: rect.x - offsetRect.x,
    y: rect.y - offsetRect.y,
    width: rect.width,
    height: rect.height
  };
}
function computeCoordsFromPlacement({ anchor, floating }, placement) {
  const alignmentAxis = getSideAxis(placement) === "x" ? "y" : "x";
  const alignLength = alignmentAxis === "y" ? "height" : "width";
  const side = getSide(placement);
  const commonX = anchor.x + anchor.width / 2 - floating.width / 2;
  const commonY = anchor.y + anchor.height / 2 - floating.height / 2;
  const commonAlign = anchor[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = { x: commonX, y: anchor.y - floating.height };
      break;
    case "bottom":
      coords = { x: commonX, y: anchor.y + anchor.height };
      break;
    case "right":
      coords = { x: anchor.x + anchor.width, y: commonY };
      break;
    case "left":
      coords = { x: anchor.x - floating.width, y: commonY };
      break;
    default:
      coords = { x: anchor.x, y: anchor.y };
  }
  switch (placement.split("-")[1]) {
    case "start":
      coords[alignmentAxis] -= commonAlign;
      break;
    case "end":
      coords[alignmentAxis] += commonAlign;
      break;
  }
  return coords;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}

// node_modules/media-chrome/dist/utils/events.js
var InvokeEvent = class extends Event {
  /**
   * @param init - The event options.
   */
  constructor({ action = "auto", relatedTarget, ...options }) {
    super("invoke", options);
    this.action = action;
    this.relatedTarget = relatedTarget;
  }
};
var ToggleEvent = class extends Event {
  /**
   * @param init - The event options.
   */
  constructor({ newState, oldState, ...options }) {
    super("toggle", options);
    this.newState = newState;
    this.oldState = oldState;
  }
};

// node_modules/media-chrome/dist/menu/media-chrome-menu.js
var __accessCheck22 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet23 = (obj, member, getter) => {
  __accessCheck22(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd23 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet22 = (obj, member, value, setter) => {
  __accessCheck22(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod9 = (obj, member, method) => {
  __accessCheck22(obj, member, "access private method");
  return method;
};
var _mediaController8;
var _previouslyFocused2;
var _invokerElement2;
var _previousItems;
var _mutationObserver2;
var _isPopover;
var _cssRule;
var _handleSlotChange;
var handleSlotChange_fn;
var _handleMenuItems;
var _updateLayoutStyle;
var updateLayoutStyle_fn;
var _handleInvoke2;
var handleInvoke_fn2;
var _handleOpen2;
var handleOpen_fn2;
var _handleClosed2;
var handleClosed_fn2;
var _handleBoundsResize;
var _handleMenuResize;
var _positionMenu;
var positionMenu_fn;
var _resizeMenu;
var resizeMenu_fn;
var _handleClick;
var handleClick_fn;
var _backButtonElement;
var backButtonElement_get;
var _handleToggle;
var handleToggle_fn;
var _checkSubmenuHasExpanded;
var checkSubmenuHasExpanded_fn;
var _handleFocusOut2;
var handleFocusOut_fn2;
var _handleKeyDown2;
var handleKeyDown_fn2;
var _getItem;
var getItem_fn;
var _getTabItem;
var getTabItem_fn;
var _setTabItem;
var setTabItem_fn;
var _selectItem;
var selectItem_fn;
function createMenuItem({
  type,
  text,
  value,
  checked
}) {
  const item = Document2.createElement(
    "media-chrome-menu-item"
  );
  item.type = type != null ? type : "";
  item.part.add("menu-item");
  if (type)
    item.part.add(type);
  item.value = value;
  item.checked = checked;
  const label = Document2.createElement("span");
  label.textContent = text;
  item.append(label);
  return item;
}
function createIndicator(el, name) {
  let customIndicator = el.querySelector(`:scope > [slot="${name}"]`);
  if ((customIndicator == null ? void 0 : customIndicator.nodeName) == "SLOT")
    customIndicator = customIndicator.assignedElements({ flatten: true })[0];
  if (customIndicator) {
    customIndicator = customIndicator.cloneNode(true);
    return customIndicator;
  }
  const fallbackIndicator = el.shadowRoot.querySelector(
    `[name="${name}"] > svg`
  );
  if (fallbackIndicator) {
    return fallbackIndicator.cloneNode(true);
  }
  return "";
}
function getTemplateHTML13(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --_menu-bg: rgb(20 20 30 / .8);
        background: var(--media-menu-background, var(--media-control-background, var(--media-secondary-color, var(--_menu-bg))));
        border-radius: var(--media-menu-border-radius);
        border: var(--media-menu-border, none);
        display: var(--media-menu-display, inline-flex);
        transition: var(--media-menu-transition-in,
          visibility 0s,
          opacity .2s ease-out,
          transform .15s ease-out,
          left .2s ease-in-out,
          min-width .2s ease-in-out,
          min-height .2s ease-in-out
        ) !important;
        ${/* ^^Prevent transition override by media-container */
    ""}
        visibility: var(--media-menu-visibility, visible);
        opacity: var(--media-menu-opacity, 1);
        max-height: var(--media-menu-max-height, var(--_menu-max-height, 300px));
        transform: var(--media-menu-transform-in, translateY(0) scale(1));
        flex-direction: column;
        ${/* Prevent overflowing a flex container */
    ""}
        min-height: 0;
        position: relative;
        bottom: var(--_menu-bottom);
        box-sizing: border-box;
      } 

      @-moz-document url-prefix() {
        :host{
          --_menu-bg: rgb(20 20 30);
        }
      }

      :host([hidden]) {
        transition: var(--media-menu-transition-out,
          visibility .15s ease-in,
          opacity .15s ease-in,
          transform .15s ease-in
        ) !important;
        visibility: var(--media-menu-hidden-visibility, hidden);
        opacity: var(--media-menu-hidden-opacity, 0);
        max-height: var(--media-menu-hidden-max-height,
          var(--media-menu-max-height, var(--_menu-max-height, 300px)));
        transform: var(--media-menu-transform-out, translateY(2px) scale(.99));
        pointer-events: none;
      }

      :host([slot="submenu"]) {
        background: none;
        width: 100%;
        min-height: 100%;
        position: absolute;
        bottom: 0;
        right: -100%;
      }

      #container {
        display: flex;
        flex-direction: column;
        min-height: 0;
        transition: transform .2s ease-out;
        transform: translate(0, 0);
      }

      #container.has-expanded {
        transition: transform .2s ease-in;
        transform: translate(-100%, 0);
      }

      button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        outline: inherit;
        display: inline-flex;
        align-items: center;
      }

      slot[name="header"][hidden] {
        display: none;
      }

      slot[name="header"] > *,
      slot[name="header"]::slotted(*) {
        padding: .4em .7em;
        border-bottom: 1px solid rgb(255 255 255 / .25);
        cursor: var(--media-cursor, default);
      }

      slot[name="header"] > button[part~="back"],
      slot[name="header"]::slotted(button[part~="back"]) {
        cursor: var(--media-cursor, pointer);
      }

      svg[part~="back"] {
        height: var(--media-menu-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
        margin-right: .5ch;
      }

      slot:not([name]) {
        gap: var(--media-menu-gap);
        flex-direction: var(--media-menu-flex-direction, column);
        overflow: var(--media-menu-overflow, hidden auto);
        display: flex;
        min-height: 0;
      }

      :host([role="menu"]) slot:not([name]) {
        padding-block: .4em;
      }

      slot:not([name])::slotted([role="menu"]) {
        background: none;
      }

      media-chrome-menu-item > span {
        margin-right: .5ch;
        max-width: var(--media-menu-item-max-width);
        text-overflow: ellipsis;
        overflow: hidden;
      }
    </style>
    <style id="layout-row" media="width:0">

      slot[name="header"] > *,
      slot[name="header"]::slotted(*) {
        padding: .4em .5em;
      }

      slot:not([name]) {
        gap: var(--media-menu-gap, .25em);
        flex-direction: var(--media-menu-flex-direction, row);
        padding-inline: .5em;
      }

      media-chrome-menu-item {
        padding: .3em .5em;
      }

      media-chrome-menu-item[aria-checked="true"] {
        background: var(--media-menu-item-checked-background, rgb(255 255 255 / .2));
      }

      ${/* In row layout hide the checked indicator completely. */
    ""}
      media-chrome-menu-item::part(checked-indicator) {
        display: var(--media-menu-item-checked-indicator-display, none);
      }
    </style>
    <div id="container">
      <slot name="header" hidden>
        <button part="back button" aria-label="Back to previous menu">
          <slot name="back-icon">
            <svg aria-hidden="true" viewBox="0 0 20 24" part="back indicator">
              <path d="m11.88 17.585.742-.669-4.2-4.665 4.2-4.666-.743-.669-4.803 5.335 4.803 5.334Z"/>
            </svg>
          </slot>
          <slot name="title"></slot>
        </button>
      </slot>
      <slot></slot>
    </div>
    <slot name="checked-indicator" hidden></slot>
  `
  );
}
var Attributes12 = {
  STYLE: "style",
  HIDDEN: "hidden",
  DISABLED: "disabled",
  ANCHOR: "anchor"
};
var MediaChromeMenu = class extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd23(this, _handleSlotChange);
    __privateAdd23(this, _updateLayoutStyle);
    __privateAdd23(this, _handleInvoke2);
    __privateAdd23(this, _handleOpen2);
    __privateAdd23(this, _handleClosed2);
    __privateAdd23(this, _positionMenu);
    __privateAdd23(this, _resizeMenu);
    __privateAdd23(this, _handleClick);
    __privateAdd23(this, _backButtonElement);
    __privateAdd23(this, _handleToggle);
    __privateAdd23(this, _checkSubmenuHasExpanded);
    __privateAdd23(this, _handleFocusOut2);
    __privateAdd23(this, _handleKeyDown2);
    __privateAdd23(this, _getItem);
    __privateAdd23(this, _getTabItem);
    __privateAdd23(this, _setTabItem);
    __privateAdd23(this, _selectItem);
    __privateAdd23(this, _mediaController8, null);
    __privateAdd23(this, _previouslyFocused2, null);
    __privateAdd23(this, _invokerElement2, null);
    __privateAdd23(this, _previousItems, /* @__PURE__ */ new Set());
    __privateAdd23(this, _mutationObserver2, void 0);
    __privateAdd23(this, _isPopover, false);
    __privateAdd23(this, _cssRule, null);
    __privateAdd23(this, _handleMenuItems, () => {
      const previousItems = __privateGet23(this, _previousItems);
      const currentItems = new Set(this.items);
      for (const item of previousItems) {
        if (!currentItems.has(item)) {
          this.dispatchEvent(new CustomEvent("removemenuitem", { detail: item }));
        }
      }
      for (const item of currentItems) {
        if (!previousItems.has(item)) {
          this.dispatchEvent(new CustomEvent("addmenuitem", { detail: item }));
        }
      }
      __privateSet22(this, _previousItems, currentItems);
    });
    __privateAdd23(this, _handleBoundsResize, () => {
      __privateMethod9(this, _positionMenu, positionMenu_fn).call(this);
      __privateMethod9(this, _resizeMenu, resizeMenu_fn).call(this, false);
    });
    __privateAdd23(this, _handleMenuResize, () => {
      __privateMethod9(this, _positionMenu, positionMenu_fn).call(this);
    });
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    }
    this.container = this.shadowRoot.querySelector("#container");
    this.defaultSlot = this.shadowRoot.querySelector(
      "slot:not([name])"
    );
    this.shadowRoot.addEventListener("slotchange", this);
    __privateSet22(this, _mutationObserver2, new MutationObserver(__privateGet23(this, _handleMenuItems)));
    __privateGet23(this, _mutationObserver2).observe(this.defaultSlot, { childList: true });
  }
  static get observedAttributes() {
    return [
      Attributes12.DISABLED,
      Attributes12.HIDDEN,
      Attributes12.STYLE,
      Attributes12.ANCHOR,
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    ];
  }
  static formatMenuItemText(text, _data) {
    return text;
  }
  enable() {
    this.addEventListener("click", this);
    this.addEventListener("focusout", this);
    this.addEventListener("keydown", this);
    this.addEventListener("invoke", this);
    this.addEventListener("toggle", this);
  }
  disable() {
    this.removeEventListener("click", this);
    this.removeEventListener("focusout", this);
    this.removeEventListener("keyup", this);
    this.removeEventListener("invoke", this);
    this.removeEventListener("toggle", this);
  }
  handleEvent(event) {
    switch (event.type) {
      case "slotchange":
        __privateMethod9(this, _handleSlotChange, handleSlotChange_fn).call(this, event);
        break;
      case "invoke":
        __privateMethod9(this, _handleInvoke2, handleInvoke_fn2).call(this, event);
        break;
      case "click":
        __privateMethod9(this, _handleClick, handleClick_fn).call(this, event);
        break;
      case "toggle":
        __privateMethod9(this, _handleToggle, handleToggle_fn).call(this, event);
        break;
      case "focusout":
        __privateMethod9(this, _handleFocusOut2, handleFocusOut_fn2).call(this, event);
        break;
      case "keydown":
        __privateMethod9(this, _handleKeyDown2, handleKeyDown_fn2).call(this, event);
        break;
    }
  }
  connectedCallback() {
    var _a4, _b;
    __privateSet22(this, _cssRule, insertCSSRule(this.shadowRoot, ":host"));
    __privateMethod9(this, _updateLayoutStyle, updateLayoutStyle_fn).call(this);
    if (!this.hasAttribute("disabled")) {
      this.enable();
    }
    if (!this.role) {
      this.role = "menu";
    }
    __privateSet22(this, _mediaController8, getAttributeMediaController(this));
    (_b = (_a4 = __privateGet23(this, _mediaController8)) == null ? void 0 : _a4.associateElement) == null ? void 0 : _b.call(_a4, this);
    if (!this.hidden) {
      observeResize(getBoundsElement(this), __privateGet23(this, _handleBoundsResize));
      observeResize(this, __privateGet23(this, _handleMenuResize));
    }
  }
  disconnectedCallback() {
    var _a4, _b;
    unobserveResize(getBoundsElement(this), __privateGet23(this, _handleBoundsResize));
    unobserveResize(this, __privateGet23(this, _handleMenuResize));
    this.disable();
    (_b = (_a4 = __privateGet23(this, _mediaController8)) == null ? void 0 : _a4.unassociateElement) == null ? void 0 : _b.call(_a4, this);
    __privateSet22(this, _mediaController8, null);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a4, _b, _c, _d;
    if (attrName === Attributes12.HIDDEN && newValue !== oldValue) {
      if (!__privateGet23(this, _isPopover))
        __privateSet22(this, _isPopover, true);
      if (this.hidden) {
        __privateMethod9(this, _handleClosed2, handleClosed_fn2).call(this);
      } else {
        __privateMethod9(this, _handleOpen2, handleOpen_fn2).call(this);
      }
      this.dispatchEvent(
        new ToggleEvent({
          oldState: this.hidden ? "open" : "closed",
          newState: this.hidden ? "closed" : "open",
          bubbles: true
        })
      );
    } else if (attrName === MediaStateReceiverAttributes.MEDIA_CONTROLLER) {
      if (oldValue) {
        (_b = (_a4 = __privateGet23(this, _mediaController8)) == null ? void 0 : _a4.unassociateElement) == null ? void 0 : _b.call(_a4, this);
        __privateSet22(this, _mediaController8, null);
      }
      if (newValue && this.isConnected) {
        __privateSet22(this, _mediaController8, getAttributeMediaController(this));
        (_d = (_c = __privateGet23(this, _mediaController8)) == null ? void 0 : _c.associateElement) == null ? void 0 : _d.call(_c, this);
      }
    } else if (attrName === Attributes12.DISABLED && newValue !== oldValue) {
      if (newValue == null) {
        this.enable();
      } else {
        this.disable();
      }
    } else if (attrName === Attributes12.STYLE && newValue !== oldValue) {
      __privateMethod9(this, _updateLayoutStyle, updateLayoutStyle_fn).call(this);
    }
  }
  formatMenuItemText(text, data) {
    return this.constructor.formatMenuItemText(
      text,
      data
    );
  }
  get anchor() {
    return this.getAttribute("anchor");
  }
  set anchor(value) {
    this.setAttribute("anchor", `${value}`);
  }
  /**
   * Returns the anchor element when it is a floating menu.
   */
  get anchorElement() {
    var _a4;
    if (this.anchor) {
      return (_a4 = getDocumentOrShadowRoot(this)) == null ? void 0 : _a4.querySelector(
        `#${this.anchor}`
      );
    }
    return null;
  }
  /**
   * Returns the menu items.
   */
  get items() {
    return this.defaultSlot.assignedElements({ flatten: true }).filter(isMenuItem);
  }
  get radioGroupItems() {
    return this.items.filter((item) => item.role === "menuitemradio");
  }
  get checkedItems() {
    return this.items.filter((item) => item.checked);
  }
  get value() {
    var _a4, _b;
    return (_b = (_a4 = this.checkedItems[0]) == null ? void 0 : _a4.value) != null ? _b : "";
  }
  set value(newValue) {
    const item = this.items.find((item2) => item2.value === newValue);
    if (!item)
      return;
    __privateMethod9(this, _selectItem, selectItem_fn).call(this, item);
  }
  focus() {
    __privateSet22(this, _previouslyFocused2, getActiveElement());
    if (this.items.length) {
      __privateMethod9(this, _setTabItem, setTabItem_fn).call(this, this.items[0]);
      this.items[0].focus();
      return;
    }
    const focusable = this.querySelector(
      '[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]'
    );
    focusable == null ? void 0 : focusable.focus();
  }
  handleSelect(event) {
    var _a4;
    const item = __privateMethod9(this, _getItem, getItem_fn).call(this, event);
    if (!item)
      return;
    __privateMethod9(this, _selectItem, selectItem_fn).call(this, item, item.type === "checkbox");
    if (__privateGet23(this, _invokerElement2) && !this.hidden) {
      (_a4 = __privateGet23(this, _previouslyFocused2)) == null ? void 0 : _a4.focus();
      this.hidden = true;
    }
  }
  get keysUsed() {
    return [
      "Enter",
      "Escape",
      "Tab",
      " ",
      "ArrowDown",
      "ArrowUp",
      "Home",
      "End"
    ];
  }
  handleMove(event) {
    var _a4, _b;
    const { key } = event;
    const items = this.items;
    const currentItem = (_b = (_a4 = __privateMethod9(this, _getItem, getItem_fn).call(this, event)) != null ? _a4 : __privateMethod9(this, _getTabItem, getTabItem_fn).call(this)) != null ? _b : items[0];
    const currentIndex = items.indexOf(currentItem);
    let index = Math.max(0, currentIndex);
    if (key === "ArrowDown") {
      index++;
    } else if (key === "ArrowUp") {
      index--;
    } else if (event.key === "Home") {
      index = 0;
    } else if (event.key === "End") {
      index = items.length - 1;
    }
    if (index < 0) {
      index = items.length - 1;
    }
    if (index > items.length - 1) {
      index = 0;
    }
    __privateMethod9(this, _setTabItem, setTabItem_fn).call(this, items[index]);
    items[index].focus();
  }
};
_mediaController8 = /* @__PURE__ */ new WeakMap();
_previouslyFocused2 = /* @__PURE__ */ new WeakMap();
_invokerElement2 = /* @__PURE__ */ new WeakMap();
_previousItems = /* @__PURE__ */ new WeakMap();
_mutationObserver2 = /* @__PURE__ */ new WeakMap();
_isPopover = /* @__PURE__ */ new WeakMap();
_cssRule = /* @__PURE__ */ new WeakMap();
_handleSlotChange = /* @__PURE__ */ new WeakSet();
handleSlotChange_fn = function(event) {
  const slot = event.target;
  for (const node of slot.assignedNodes({ flatten: true })) {
    if (node.nodeType === 3 && node.textContent.trim() === "") {
      node.remove();
    }
  }
  if (["header", "title"].includes(slot.name)) {
    const header = this.shadowRoot.querySelector(
      'slot[name="header"]'
    );
    header.hidden = slot.assignedNodes().length === 0;
  }
  if (!slot.name) {
    __privateGet23(this, _handleMenuItems).call(this);
  }
};
_handleMenuItems = /* @__PURE__ */ new WeakMap();
_updateLayoutStyle = /* @__PURE__ */ new WeakSet();
updateLayoutStyle_fn = function() {
  var _a4;
  const layoutRowStyle = this.shadowRoot.querySelector("#layout-row");
  const menuLayout = (_a4 = getComputedStyle(this).getPropertyValue("--media-menu-layout")) == null ? void 0 : _a4.trim();
  layoutRowStyle.setAttribute("media", menuLayout === "row" ? "" : "width:0");
};
_handleInvoke2 = /* @__PURE__ */ new WeakSet();
handleInvoke_fn2 = function(event) {
  __privateSet22(this, _invokerElement2, event.relatedTarget);
  if (!containsComposedNode(this, event.relatedTarget)) {
    this.hidden = !this.hidden;
  }
};
_handleOpen2 = /* @__PURE__ */ new WeakSet();
handleOpen_fn2 = function() {
  var _a4;
  (_a4 = __privateGet23(this, _invokerElement2)) == null ? void 0 : _a4.setAttribute("aria-expanded", "true");
  this.addEventListener("transitionend", () => this.focus(), { once: true });
  observeResize(getBoundsElement(this), __privateGet23(this, _handleBoundsResize));
  observeResize(this, __privateGet23(this, _handleMenuResize));
};
_handleClosed2 = /* @__PURE__ */ new WeakSet();
handleClosed_fn2 = function() {
  var _a4;
  (_a4 = __privateGet23(this, _invokerElement2)) == null ? void 0 : _a4.setAttribute("aria-expanded", "false");
  unobserveResize(getBoundsElement(this), __privateGet23(this, _handleBoundsResize));
  unobserveResize(this, __privateGet23(this, _handleMenuResize));
};
_handleBoundsResize = /* @__PURE__ */ new WeakMap();
_handleMenuResize = /* @__PURE__ */ new WeakMap();
_positionMenu = /* @__PURE__ */ new WeakSet();
positionMenu_fn = function(menuWidth) {
  if (this.hasAttribute("mediacontroller") && !this.anchor)
    return;
  if (this.hidden || !this.anchorElement)
    return;
  const { x: x7, y: y5 } = computePosition({
    anchor: this.anchorElement,
    floating: this,
    placement: "top-start"
  });
  menuWidth != null ? menuWidth : menuWidth = this.offsetWidth;
  const bounds = getBoundsElement(this);
  const boundsRect = bounds.getBoundingClientRect();
  const right = boundsRect.width - x7 - menuWidth;
  const bottom = boundsRect.height - y5 - this.offsetHeight;
  const { style } = __privateGet23(this, _cssRule);
  style.setProperty("position", "absolute");
  style.setProperty("right", `${Math.max(0, right)}px`);
  style.setProperty("--_menu-bottom", `${bottom}px`);
  const computedStyle = getComputedStyle(this);
  const isBottomCalc = style.getPropertyValue("--_menu-bottom") === computedStyle.bottom;
  const realBottom = isBottomCalc ? bottom : parseFloat(computedStyle.bottom);
  const maxHeight = boundsRect.height - realBottom - parseFloat(computedStyle.marginBottom);
  this.style.setProperty("--_menu-max-height", `${maxHeight}px`);
};
_resizeMenu = /* @__PURE__ */ new WeakSet();
resizeMenu_fn = function(animate) {
  const expandedMenuItem = this.querySelector(
    '[role="menuitem"][aria-haspopup][aria-expanded="true"]'
  );
  const expandedSubmenu = expandedMenuItem == null ? void 0 : expandedMenuItem.querySelector(
    '[role="menu"]'
  );
  const { style } = __privateGet23(this, _cssRule);
  if (!animate) {
    style.setProperty("--media-menu-transition-in", "none");
  }
  if (expandedSubmenu) {
    const height = expandedSubmenu.offsetHeight;
    const width = Math.max(
      expandedSubmenu.offsetWidth,
      expandedMenuItem.offsetWidth
    );
    this.style.setProperty("min-width", `${width}px`);
    this.style.setProperty("min-height", `${height}px`);
    __privateMethod9(this, _positionMenu, positionMenu_fn).call(this, width);
  } else {
    this.style.removeProperty("min-width");
    this.style.removeProperty("min-height");
    __privateMethod9(this, _positionMenu, positionMenu_fn).call(this);
  }
  style.removeProperty("--media-menu-transition-in");
};
_handleClick = /* @__PURE__ */ new WeakSet();
handleClick_fn = function(event) {
  var _a4;
  event.stopPropagation();
  if (event.composedPath().includes(__privateGet23(this, _backButtonElement, backButtonElement_get))) {
    (_a4 = __privateGet23(this, _previouslyFocused2)) == null ? void 0 : _a4.focus();
    this.hidden = true;
    return;
  }
  const item = __privateMethod9(this, _getItem, getItem_fn).call(this, event);
  if (!item || item.hasAttribute("disabled"))
    return;
  __privateMethod9(this, _setTabItem, setTabItem_fn).call(this, item);
  this.handleSelect(event);
};
_backButtonElement = /* @__PURE__ */ new WeakSet();
backButtonElement_get = function() {
  var _a4;
  const headerSlot = this.shadowRoot.querySelector(
    'slot[name="header"]'
  );
  return (_a4 = headerSlot.assignedElements({ flatten: true })) == null ? void 0 : _a4.find((el) => el.matches('button[part~="back"]'));
};
_handleToggle = /* @__PURE__ */ new WeakSet();
handleToggle_fn = function(event) {
  if (event.target === this)
    return;
  __privateMethod9(this, _checkSubmenuHasExpanded, checkSubmenuHasExpanded_fn).call(this);
  const menuItemsWithSubmenu = Array.from(
    this.querySelectorAll('[role="menuitem"][aria-haspopup]')
  );
  for (const item of menuItemsWithSubmenu) {
    if (item.invokeTargetElement == event.target)
      continue;
    if (event.newState == "open" && item.getAttribute("aria-expanded") == "true" && !item.invokeTargetElement.hidden) {
      item.invokeTargetElement.dispatchEvent(
        new InvokeEvent({ relatedTarget: item })
      );
    }
  }
  for (const item of menuItemsWithSubmenu) {
    item.setAttribute("aria-expanded", `${!item.submenuElement.hidden}`);
  }
  __privateMethod9(this, _resizeMenu, resizeMenu_fn).call(this, true);
};
_checkSubmenuHasExpanded = /* @__PURE__ */ new WeakSet();
checkSubmenuHasExpanded_fn = function() {
  const selector = '[role="menuitem"] > [role="menu"]:not([hidden])';
  const expandedMenuItem = this.querySelector(selector);
  this.container.classList.toggle("has-expanded", !!expandedMenuItem);
};
_handleFocusOut2 = /* @__PURE__ */ new WeakSet();
handleFocusOut_fn2 = function(event) {
  var _a4;
  if (!containsComposedNode(this, event.relatedTarget)) {
    if (__privateGet23(this, _isPopover)) {
      (_a4 = __privateGet23(this, _previouslyFocused2)) == null ? void 0 : _a4.focus();
    }
    if (__privateGet23(this, _invokerElement2) && __privateGet23(this, _invokerElement2) !== event.relatedTarget && !this.hidden) {
      this.hidden = true;
    }
  }
};
_handleKeyDown2 = /* @__PURE__ */ new WeakSet();
handleKeyDown_fn2 = function(event) {
  var _a4, _b, _c, _d, _e4;
  const { key, ctrlKey, altKey, metaKey } = event;
  if (ctrlKey || altKey || metaKey) {
    return;
  }
  if (!this.keysUsed.includes(key)) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  if (key === "Tab") {
    if (__privateGet23(this, _isPopover)) {
      this.hidden = true;
      return;
    }
    if (event.shiftKey) {
      (_b = (_a4 = this.previousElementSibling) == null ? void 0 : _a4.focus) == null ? void 0 : _b.call(_a4);
    } else {
      (_d = (_c = this.nextElementSibling) == null ? void 0 : _c.focus) == null ? void 0 : _d.call(_c);
    }
    this.blur();
  } else if (key === "Escape") {
    (_e4 = __privateGet23(this, _previouslyFocused2)) == null ? void 0 : _e4.focus();
    if (__privateGet23(this, _isPopover)) {
      this.hidden = true;
    }
  } else if (key === "Enter" || key === " ") {
    this.handleSelect(event);
  } else {
    this.handleMove(event);
  }
};
_getItem = /* @__PURE__ */ new WeakSet();
getItem_fn = function(event) {
  return event.composedPath().find((el) => {
    return ["menuitemradio", "menuitemcheckbox"].includes(
      el.role
    );
  });
};
_getTabItem = /* @__PURE__ */ new WeakSet();
getTabItem_fn = function() {
  return this.items.find((item) => item.tabIndex === 0);
};
_setTabItem = /* @__PURE__ */ new WeakSet();
setTabItem_fn = function(tabItem) {
  for (const item of this.items) {
    item.tabIndex = item === tabItem ? 0 : -1;
  }
};
_selectItem = /* @__PURE__ */ new WeakSet();
selectItem_fn = function(item, toggle) {
  const oldCheckedItems = [...this.checkedItems];
  if (item.type === "radio") {
    this.radioGroupItems.forEach((el) => el.checked = false);
  }
  if (toggle) {
    item.checked = !item.checked;
  } else {
    item.checked = true;
  }
  if (this.checkedItems.some((opt, i2) => opt != oldCheckedItems[i2])) {
    this.dispatchEvent(
      new Event("change", { bubbles: true, composed: true })
    );
  }
};
MediaChromeMenu.shadowRootOptions = { mode: "open" };
MediaChromeMenu.getTemplateHTML = getTemplateHTML13;
function isMenuItem(element) {
  return ["menuitem", "menuitemradio", "menuitemcheckbox"].includes(
    element == null ? void 0 : element.role
  );
}
function getBoundsElement(host) {
  var _a4;
  return (_a4 = host.getAttribute("bounds") ? closestComposedNode(host, `#${host.getAttribute("bounds")}`) : getMediaController(host) || host.parentElement) != null ? _a4 : host;
}
if (!GlobalThis.customElements.get("media-chrome-menu")) {
  GlobalThis.customElements.define("media-chrome-menu", MediaChromeMenu);
}

// node_modules/media-chrome/dist/menu/media-chrome-menu-item.js
var __accessCheck23 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet24 = (obj, member, getter) => {
  __accessCheck23(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd24 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet23 = (obj, member, value, setter) => {
  __accessCheck23(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod10 = (obj, member, method) => {
  __accessCheck23(obj, member, "access private method");
  return method;
};
var _dirty;
var _ownerElement;
var _handleSlotChange2;
var handleSlotChange_fn2;
var _submenuConnected;
var submenuConnected_fn;
var _submenuDisconnected;
var submenuDisconnected_fn;
var _handleMenuItem;
var _handleKeyUp;
var handleKeyUp_fn;
var _handleKeyDown3;
var handleKeyDown_fn3;
var _reset;
var reset_fn;
function getTemplateHTML14(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        transition: var(--media-menu-item-transition,
          background .15s linear,
          opacity .2s ease-in-out
        );
        outline: var(--media-menu-item-outline, 0);
        outline-offset: var(--media-menu-item-outline-offset, -1px);
        cursor: var(--media-cursor, pointer);
        display: flex;
        align-items: center;
        align-self: stretch;
        justify-self: stretch;
        white-space: nowrap;
        white-space-collapse: collapse;
        text-wrap: nowrap;
        padding: .4em .8em .4em 1em;
      }

      :host(:focus-visible) {
        box-shadow: var(--media-menu-item-focus-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: var(--media-menu-item-hover-outline, 0);
        outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
      }

      :host(:hover) {
        cursor: var(--media-cursor, pointer);
        background: var(--media-menu-item-hover-background, rgb(92 92 102 / .5));
        outline: var(--media-menu-item-hover-outline);
        outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
      }

      :host([aria-checked="true"]) {
        background: var(--media-menu-item-checked-background);
      }

      :host([hidden]) {
        display: none;
      }

      :host([disabled]) {
        pointer-events: none;
        color: rgba(255, 255, 255, .3);
      }

      slot:not([name]) {
        width: 100%;
      }

      slot:not([name="submenu"]) {
        display: inline-flex;
        align-items: center;
        transition: inherit;
        opacity: var(--media-menu-item-opacity, 1);
      }

      slot[name="description"] {
        justify-content: end;
      }

      slot[name="description"] > span {
        display: inline-block;
        margin-inline: 1em .2em;
        max-width: var(--media-menu-item-description-max-width, 100px);
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: .8em;
        font-weight: 400;
        text-align: right;
        position: relative;
        top: .04em;
      }

      slot[name="checked-indicator"] {
        display: none;
      }

      :host(:is([role="menuitemradio"],[role="menuitemcheckbox"])) slot[name="checked-indicator"] {
        display: var(--media-menu-item-checked-indicator-display, inline-block);
      }

      ${/* For all slotted icons in prefix and suffix. */
    ""}
      svg, img, ::slotted(svg), ::slotted(img) {
        height: var(--media-menu-item-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
      }

      ${/* Only for indicator icons like checked-indicator or captions-indicator. */
    ""}
      [part~="indicator"],
      ::slotted([part~="indicator"]) {
        fill: var(--media-menu-item-indicator-fill,
          var(--media-icon-color, var(--media-primary-color, rgb(238 238 238))));
        height: var(--media-menu-item-indicator-height, 1.25em);
        margin-right: .5ch;
      }

      [part~="checked-indicator"] {
        visibility: hidden;
      }

      :host([aria-checked="true"]) [part~="checked-indicator"] {
        visibility: visible;
      }
    </style>
    <slot name="checked-indicator">
      <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
        <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
      </svg>
    </slot>
    <slot name="prefix"></slot>
    <slot></slot>
    <slot name="description"></slot>
    <slot name="suffix">
      ${this.getSuffixSlotInnerHTML(_attrs)}
    </slot>
    <slot name="submenu"></slot>
  `
  );
}
function getSuffixSlotInnerHTML(_attrs) {
  return "";
}
var Attributes13 = {
  TYPE: "type",
  VALUE: "value",
  CHECKED: "checked",
  DISABLED: "disabled"
};
var MediaChromeMenuItem = class extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd24(this, _handleSlotChange2);
    __privateAdd24(this, _submenuConnected);
    __privateAdd24(this, _submenuDisconnected);
    __privateAdd24(this, _handleKeyUp);
    __privateAdd24(this, _handleKeyDown3);
    __privateAdd24(this, _reset);
    __privateAdd24(this, _dirty, false);
    __privateAdd24(this, _ownerElement, void 0);
    __privateAdd24(this, _handleMenuItem, () => {
      var _a4, _b;
      this.setAttribute("submenusize", `${this.submenuElement.items.length}`);
      const descriptionSlot = this.shadowRoot.querySelector(
        'slot[name="description"]'
      );
      const checkedItem = (_a4 = this.submenuElement.checkedItems) == null ? void 0 : _a4[0];
      const description = (_b = checkedItem == null ? void 0 : checkedItem.dataset.description) != null ? _b : checkedItem == null ? void 0 : checkedItem.text;
      const span = Document2.createElement("span");
      span.textContent = description != null ? description : "";
      descriptionSlot.replaceChildren(span);
    });
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    }
    this.shadowRoot.addEventListener("slotchange", this);
  }
  static get observedAttributes() {
    return [
      Attributes13.TYPE,
      Attributes13.DISABLED,
      Attributes13.CHECKED,
      Attributes13.VALUE
    ];
  }
  enable() {
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", "-1");
    }
    if (isCheckable(this) && !this.hasAttribute("aria-checked")) {
      this.setAttribute("aria-checked", "false");
    }
    this.addEventListener("click", this);
    this.addEventListener("keydown", this);
  }
  disable() {
    this.removeAttribute("tabindex");
    this.removeEventListener("click", this);
    this.removeEventListener("keydown", this);
    this.removeEventListener("keyup", this);
  }
  handleEvent(event) {
    switch (event.type) {
      case "slotchange":
        __privateMethod10(this, _handleSlotChange2, handleSlotChange_fn2).call(this, event);
        break;
      case "click":
        this.handleClick(event);
        break;
      case "keydown":
        __privateMethod10(this, _handleKeyDown3, handleKeyDown_fn3).call(this, event);
        break;
      case "keyup":
        __privateMethod10(this, _handleKeyUp, handleKeyUp_fn).call(this, event);
        break;
    }
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === Attributes13.CHECKED && isCheckable(this) && !__privateGet24(this, _dirty)) {
      this.setAttribute("aria-checked", newValue != null ? "true" : "false");
    } else if (attrName === Attributes13.TYPE && newValue !== oldValue) {
      this.role = "menuitem" + newValue;
    } else if (attrName === Attributes13.DISABLED && newValue !== oldValue) {
      if (newValue == null) {
        this.enable();
      } else {
        this.disable();
      }
    }
  }
  connectedCallback() {
    if (!this.hasAttribute(Attributes13.DISABLED)) {
      this.enable();
    }
    this.role = "menuitem" + this.type;
    __privateSet23(this, _ownerElement, closestMenuItemsContainer(this, this.parentNode));
    __privateMethod10(this, _reset, reset_fn).call(this);
  }
  disconnectedCallback() {
    this.disable();
    __privateMethod10(this, _reset, reset_fn).call(this);
    __privateSet23(this, _ownerElement, null);
  }
  get invokeTarget() {
    return this.getAttribute("invoketarget");
  }
  set invokeTarget(value) {
    this.setAttribute("invoketarget", `${value}`);
  }
  /**
   * Returns the element with the id specified by the `invoketarget` attribute
   * or the slotted submenu element.
   */
  get invokeTargetElement() {
    var _a4;
    if (this.invokeTarget) {
      return (_a4 = getDocumentOrShadowRoot(this)) == null ? void 0 : _a4.querySelector(
        `#${this.invokeTarget}`
      );
    }
    return this.submenuElement;
  }
  /**
   * Returns the slotted submenu element.
   */
  get submenuElement() {
    const submenuSlot = this.shadowRoot.querySelector(
      'slot[name="submenu"]'
    );
    return submenuSlot.assignedElements({
      flatten: true
    })[0];
  }
  get type() {
    var _a4;
    return (_a4 = this.getAttribute(Attributes13.TYPE)) != null ? _a4 : "";
  }
  set type(val) {
    this.setAttribute(Attributes13.TYPE, `${val}`);
  }
  get value() {
    var _a4;
    return (_a4 = this.getAttribute(Attributes13.VALUE)) != null ? _a4 : this.text;
  }
  set value(val) {
    this.setAttribute(Attributes13.VALUE, val);
  }
  get text() {
    var _a4;
    return ((_a4 = this.textContent) != null ? _a4 : "").trim();
  }
  get checked() {
    if (!isCheckable(this))
      return void 0;
    return this.getAttribute("aria-checked") === "true";
  }
  set checked(value) {
    if (!isCheckable(this))
      return;
    __privateSet23(this, _dirty, true);
    this.setAttribute("aria-checked", value ? "true" : "false");
    if (value) {
      this.part.add("checked");
    } else {
      this.part.remove("checked");
    }
  }
  handleClick(event) {
    if (isCheckable(this))
      return;
    if (this.invokeTargetElement && containsComposedNode(this, event.target)) {
      this.invokeTargetElement.dispatchEvent(
        new InvokeEvent({ relatedTarget: this })
      );
    }
  }
  get keysUsed() {
    return ["Enter", " "];
  }
};
_dirty = /* @__PURE__ */ new WeakMap();
_ownerElement = /* @__PURE__ */ new WeakMap();
_handleSlotChange2 = /* @__PURE__ */ new WeakSet();
handleSlotChange_fn2 = function(event) {
  const slot = event.target;
  const isDefaultSlot = !(slot == null ? void 0 : slot.name);
  if (isDefaultSlot) {
    for (const node of slot.assignedNodes({ flatten: true })) {
      if (node instanceof Text && node.textContent.trim() === "") {
        node.remove();
      }
    }
  }
  if (slot.name === "submenu") {
    if (this.submenuElement) {
      __privateMethod10(this, _submenuConnected, submenuConnected_fn).call(this);
    } else {
      __privateMethod10(this, _submenuDisconnected, submenuDisconnected_fn).call(this);
    }
  }
};
_submenuConnected = /* @__PURE__ */ new WeakSet();
submenuConnected_fn = async function() {
  this.setAttribute("aria-haspopup", "menu");
  this.setAttribute("aria-expanded", `${!this.submenuElement.hidden}`);
  this.submenuElement.addEventListener("change", __privateGet24(this, _handleMenuItem));
  this.submenuElement.addEventListener("addmenuitem", __privateGet24(this, _handleMenuItem));
  this.submenuElement.addEventListener(
    "removemenuitem",
    __privateGet24(this, _handleMenuItem)
  );
  __privateGet24(this, _handleMenuItem).call(this);
};
_submenuDisconnected = /* @__PURE__ */ new WeakSet();
submenuDisconnected_fn = function() {
  this.removeAttribute("aria-haspopup");
  this.removeAttribute("aria-expanded");
  this.submenuElement.removeEventListener("change", __privateGet24(this, _handleMenuItem));
  this.submenuElement.removeEventListener(
    "addmenuitem",
    __privateGet24(this, _handleMenuItem)
  );
  this.submenuElement.removeEventListener(
    "removemenuitem",
    __privateGet24(this, _handleMenuItem)
  );
  __privateGet24(this, _handleMenuItem).call(this);
};
_handleMenuItem = /* @__PURE__ */ new WeakMap();
_handleKeyUp = /* @__PURE__ */ new WeakSet();
handleKeyUp_fn = function(event) {
  const { key } = event;
  if (!this.keysUsed.includes(key)) {
    this.removeEventListener("keyup", __privateMethod10(this, _handleKeyUp, handleKeyUp_fn));
    return;
  }
  this.handleClick(event);
};
_handleKeyDown3 = /* @__PURE__ */ new WeakSet();
handleKeyDown_fn3 = function(event) {
  const { metaKey, altKey, key } = event;
  if (metaKey || altKey || !this.keysUsed.includes(key)) {
    this.removeEventListener("keyup", __privateMethod10(this, _handleKeyUp, handleKeyUp_fn));
    return;
  }
  this.addEventListener("keyup", __privateMethod10(this, _handleKeyUp, handleKeyUp_fn), { once: true });
};
_reset = /* @__PURE__ */ new WeakSet();
reset_fn = function() {
  var _a4;
  const items = (_a4 = __privateGet24(this, _ownerElement)) == null ? void 0 : _a4.radioGroupItems;
  if (!items)
    return;
  let checkedItem = items.filter((item) => item.getAttribute("aria-checked") === "true").pop();
  if (!checkedItem)
    checkedItem = items[0];
  for (const item of items) {
    item.setAttribute("aria-checked", "false");
  }
  checkedItem == null ? void 0 : checkedItem.setAttribute("aria-checked", "true");
};
MediaChromeMenuItem.shadowRootOptions = { mode: "open" };
MediaChromeMenuItem.getTemplateHTML = getTemplateHTML14;
MediaChromeMenuItem.getSuffixSlotInnerHTML = getSuffixSlotInnerHTML;
function isCheckable(item) {
  return item.type === "radio" || item.type === "checkbox";
}
function closestMenuItemsContainer(childNode, parentNode) {
  if (!childNode)
    return null;
  const { host } = childNode.getRootNode();
  if (!parentNode && host)
    return closestMenuItemsContainer(childNode, host);
  if (parentNode == null ? void 0 : parentNode.items)
    return parentNode;
  return closestMenuItemsContainer(parentNode, parentNode == null ? void 0 : parentNode.parentNode);
}
if (!GlobalThis.customElements.get("media-chrome-menu-item")) {
  GlobalThis.customElements.define(
    "media-chrome-menu-item",
    MediaChromeMenuItem
  );
}

// node_modules/media-chrome/dist/menu/media-settings-menu.js
function getTemplateHTML15(_attrs) {
  return (
    /*html*/
    `
    ${MediaChromeMenu.getTemplateHTML(_attrs)}
    <style>
      :host {
        --_menu-bg: rgb(20 20 30 / .8);
        background: var(--media-settings-menu-background,
            var(--media-menu-background,
              var(--media-control-background,
                var(--media-secondary-color, var(--_menu-bg)))));
        min-width: var(--media-settings-menu-min-width, 170px);
        border-radius: 2px 2px 0 0;
        overflow: hidden;
      }

      @-moz-document url-prefix() {
        :host{
          --_menu-bg: rgb(20 20 30);
        }
      }

      :host([role="menu"]) {
        ${/* Bottom fix setting menu items for animation when the height expands. */
    ""}
        justify-content: end;
      }

      slot:not([name]) {
        justify-content: var(--media-settings-menu-justify-content);
        flex-direction: var(--media-settings-menu-flex-direction, column);
        overflow: visible;
      }

      #container.has-expanded {
        --media-settings-menu-item-opacity: 0;
      }
    </style>
  `
  );
}
var MediaSettingsMenu = class extends MediaChromeMenu {
  /**
   * Returns the anchor element when it is a floating menu.
   */
  get anchorElement() {
    if (this.anchor !== "auto")
      return super.anchorElement;
    return getMediaController(this).querySelector(
      "media-settings-menu-button"
    );
  }
};
MediaSettingsMenu.getTemplateHTML = getTemplateHTML15;
if (!GlobalThis.customElements.get("media-settings-menu")) {
  GlobalThis.customElements.define("media-settings-menu", MediaSettingsMenu);
}

// node_modules/media-chrome/dist/menu/media-settings-menu-item.js
function getTemplateHTML16(_attrs) {
  return (
    /*html*/
    `
    ${MediaChromeMenuItem.getTemplateHTML.call(this, _attrs)}
    <style>
      slot:not([name="submenu"]) {
        opacity: var(--media-settings-menu-item-opacity, var(--media-menu-item-opacity));
      }

      :host([aria-expanded="true"]:hover) {
        background: transparent;
      }
    </style>
  `
  );
}
function getSuffixSlotInnerHTML2(_attrs) {
  return (
    /*html*/
    `
    <svg aria-hidden="true" viewBox="0 0 20 24">
      <path d="m8.12 17.585-.742-.669 4.2-4.665-4.2-4.666.743-.669 4.803 5.335-4.803 5.334Z"/>
    </svg>
  `
  );
}
var MediaSettingsMenuItem = class extends MediaChromeMenuItem {
};
MediaSettingsMenuItem.shadowRootOptions = { mode: "open" };
MediaSettingsMenuItem.getTemplateHTML = getTemplateHTML16;
MediaSettingsMenuItem.getSuffixSlotInnerHTML = getSuffixSlotInnerHTML2;
if (!GlobalThis.customElements.get("media-settings-menu-item")) {
  GlobalThis.customElements.define(
    "media-settings-menu-item",
    MediaSettingsMenuItem
  );
}

// node_modules/media-chrome/dist/menu/media-chrome-menu-button.js
var MediaChromeMenuButton = class extends MediaChromeButton {
  connectedCallback() {
    super.connectedCallback();
    if (this.invokeTargetElement) {
      this.setAttribute("aria-haspopup", "menu");
    }
  }
  get invokeTarget() {
    return this.getAttribute("invoketarget");
  }
  set invokeTarget(value) {
    this.setAttribute("invoketarget", `${value}`);
  }
  /**
   * Returns the element with the id specified by the `invoketarget` attribute.
   * @return {HTMLElement | null}
   */
  get invokeTargetElement() {
    var _a4;
    if (this.invokeTarget) {
      return (_a4 = getDocumentOrShadowRoot(this)) == null ? void 0 : _a4.querySelector(
        `#${this.invokeTarget}`
      );
    }
    return null;
  }
  handleClick() {
    var _a4;
    (_a4 = this.invokeTargetElement) == null ? void 0 : _a4.dispatchEvent(
      new InvokeEvent({ relatedTarget: this })
    );
  }
};
if (!GlobalThis.customElements.get("media-chrome-menu-button")) {
  GlobalThis.customElements.define(
    "media-chrome-menu-button",
    MediaChromeMenuButton
  );
}

// node_modules/media-chrome/dist/menu/media-settings-menu-button.js
function getSlotTemplateHTML18() {
  return (
    /*html*/
    `
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M4.5 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
      </svg>
    </slot>
  `
  );
}
function getTooltipContentHTML12() {
  return t("Settings");
}
var MediaSettingsMenuButton = class extends MediaChromeMenuButton {
  static get observedAttributes() {
    return [...super.observedAttributes, "target"];
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("aria-label", t("settings"));
  }
  /**
   * Returns the element with the id specified by the `invoketarget` attribute.
   * @return {HTMLElement | null}
   */
  get invokeTargetElement() {
    if (this.invokeTarget != void 0)
      return super.invokeTargetElement;
    return getMediaController(this).querySelector("media-settings-menu");
  }
};
MediaSettingsMenuButton.getSlotTemplateHTML = getSlotTemplateHTML18;
MediaSettingsMenuButton.getTooltipContentHTML = getTooltipContentHTML12;
if (!GlobalThis.customElements.get("media-settings-menu-button")) {
  GlobalThis.customElements.define(
    "media-settings-menu-button",
    MediaSettingsMenuButton
  );
}

// node_modules/media-chrome/dist/menu/media-audio-track-menu.js
var __accessCheck24 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet25 = (obj, member, getter) => {
  __accessCheck24(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd25 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet24 = (obj, member, value, setter) => {
  __accessCheck24(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod11 = (obj, member, method) => {
  __accessCheck24(obj, member, "access private method");
  return method;
};
var _audioTrackList;
var _prevState;
var _render;
var render_fn;
var _onChange;
var onChange_fn;
var MediaAudioTrackMenu = class extends MediaChromeMenu {
  constructor() {
    super(...arguments);
    __privateAdd25(this, _render);
    __privateAdd25(this, _onChange);
    __privateAdd25(this, _audioTrackList, []);
    __privateAdd25(this, _prevState, void 0);
  }
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_AUDIO_TRACK_LIST,
      MediaUIAttributes.MEDIA_AUDIO_TRACK_ENABLED,
      MediaUIAttributes.MEDIA_AUDIO_TRACK_UNAVAILABLE
    ];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_AUDIO_TRACK_ENABLED && oldValue !== newValue) {
      this.value = newValue;
    } else if (attrName === MediaUIAttributes.MEDIA_AUDIO_TRACK_LIST && oldValue !== newValue) {
      __privateSet24(this, _audioTrackList, parseAudioTrackList(newValue != null ? newValue : ""));
      __privateMethod11(this, _render, render_fn).call(this);
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("change", __privateMethod11(this, _onChange, onChange_fn));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("change", __privateMethod11(this, _onChange, onChange_fn));
  }
  /**
   * Returns the anchor element when it is a floating menu.
   */
  get anchorElement() {
    var _a4;
    if (this.anchor !== "auto")
      return super.anchorElement;
    return (_a4 = getMediaController(this)) == null ? void 0 : _a4.querySelector(
      "media-audio-track-menu-button"
    );
  }
  get mediaAudioTrackList() {
    return __privateGet25(this, _audioTrackList);
  }
  set mediaAudioTrackList(list) {
    __privateSet24(this, _audioTrackList, list);
    __privateMethod11(this, _render, render_fn).call(this);
  }
  /**
   * Get enabled audio track id.
   */
  get mediaAudioTrackEnabled() {
    var _a4;
    return (_a4 = getStringAttr(this, MediaUIAttributes.MEDIA_AUDIO_TRACK_ENABLED)) != null ? _a4 : "";
  }
  set mediaAudioTrackEnabled(id) {
    setStringAttr(this, MediaUIAttributes.MEDIA_AUDIO_TRACK_ENABLED, id);
  }
};
_audioTrackList = /* @__PURE__ */ new WeakMap();
_prevState = /* @__PURE__ */ new WeakMap();
_render = /* @__PURE__ */ new WeakSet();
render_fn = function() {
  if (__privateGet25(this, _prevState) === JSON.stringify(this.mediaAudioTrackList))
    return;
  __privateSet24(this, _prevState, JSON.stringify(this.mediaAudioTrackList));
  const audioTrackList = this.mediaAudioTrackList;
  this.defaultSlot.textContent = "";
  for (const audioTrack of audioTrackList) {
    const text = this.formatMenuItemText(audioTrack.label, audioTrack);
    const item = createMenuItem({
      type: "radio",
      text,
      value: `${audioTrack.id}`,
      checked: audioTrack.enabled
    });
    item.prepend(createIndicator(this, "checked-indicator"));
    this.defaultSlot.append(item);
  }
};
_onChange = /* @__PURE__ */ new WeakSet();
onChange_fn = function() {
  if (this.value == null)
    return;
  const event = new GlobalThis.CustomEvent(
    MediaUIEvents.MEDIA_AUDIO_TRACK_REQUEST,
    {
      composed: true,
      bubbles: true,
      detail: this.value
    }
  );
  this.dispatchEvent(event);
};
if (!GlobalThis.customElements.get("media-audio-track-menu")) {
  GlobalThis.customElements.define(
    "media-audio-track-menu",
    MediaAudioTrackMenu
  );
}

// node_modules/media-chrome/dist/menu/media-audio-track-menu-button.js
var audioTrackIcon = (
  /*html*/
  `<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M11 17H9.5V7H11v10Zm-3-3H6.5v-4H8v4Zm6-5h-1.5v6H14V9Zm3 7h-1.5V8H17v8Z"/>
  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"/>
</svg>`
);
function getSlotTemplateHTML19() {
  return (
    /*html*/
    `
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${audioTrackIcon}</slot>
  `
  );
}
function getTooltipContentHTML13() {
  return t("Audio");
}
var MediaAudioTrackMenuButton = class extends MediaChromeMenuButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_AUDIO_TRACK_ENABLED,
      MediaUIAttributes.MEDIA_AUDIO_TRACK_UNAVAILABLE
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("aria-label", t("Audio"));
  }
  /**
   * Returns the element with the id specified by the `invoketarget` attribute.
   * @return {HTMLElement | null}
   */
  get invokeTargetElement() {
    var _a4;
    if (this.invokeTarget != void 0)
      return super.invokeTargetElement;
    return (_a4 = getMediaController(this)) == null ? void 0 : _a4.querySelector("media-audio-track-menu");
  }
  /**
   * Get enabled audio track id.
   * @return {string}
   */
  get mediaAudioTrackEnabled() {
    var _a4;
    return (_a4 = getStringAttr(this, MediaUIAttributes.MEDIA_AUDIO_TRACK_ENABLED)) != null ? _a4 : "";
  }
  set mediaAudioTrackEnabled(id) {
    setStringAttr(this, MediaUIAttributes.MEDIA_AUDIO_TRACK_ENABLED, id);
  }
};
MediaAudioTrackMenuButton.getSlotTemplateHTML = getSlotTemplateHTML19;
MediaAudioTrackMenuButton.getTooltipContentHTML = getTooltipContentHTML13;
if (!GlobalThis.customElements.get("media-audio-track-menu-button")) {
  GlobalThis.customElements.define(
    "media-audio-track-menu-button",
    MediaAudioTrackMenuButton
  );
}

// node_modules/media-chrome/dist/menu/media-captions-menu.js
var __accessCheck25 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet26 = (obj, member, getter) => {
  __accessCheck25(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd26 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet25 = (obj, member, value, setter) => {
  __accessCheck25(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod12 = (obj, member, method) => {
  __accessCheck25(obj, member, "access private method");
  return method;
};
var _prevState2;
var _render2;
var render_fn2;
var _onChange2;
var onChange_fn2;
var ccIcon = (
  /*html*/
  `
  <svg aria-hidden="true" viewBox="0 0 26 24" part="captions-indicator indicator">
    <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
  </svg>`
);
function getTemplateHTML17(_attrs) {
  return (
    /*html*/
    `
    ${MediaChromeMenu.getTemplateHTML(_attrs)}
    <slot name="captions-indicator" hidden>${ccIcon}</slot>
  `
  );
}
var MediaCaptionsMenu = class extends MediaChromeMenu {
  constructor() {
    super(...arguments);
    __privateAdd26(this, _render2);
    __privateAdd26(this, _onChange2);
    __privateAdd26(this, _prevState2, void 0);
  }
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_SUBTITLES_LIST,
      MediaUIAttributes.MEDIA_SUBTITLES_SHOWING
    ];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_SUBTITLES_LIST && oldValue !== newValue) {
      __privateMethod12(this, _render2, render_fn2).call(this);
    } else if (attrName === MediaUIAttributes.MEDIA_SUBTITLES_SHOWING && oldValue !== newValue) {
      this.value = newValue;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("change", __privateMethod12(this, _onChange2, onChange_fn2));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("change", __privateMethod12(this, _onChange2, onChange_fn2));
  }
  /**
   * Returns the anchor element when it is a floating menu.
   */
  get anchorElement() {
    if (this.anchor !== "auto")
      return super.anchorElement;
    return getMediaController(this).querySelector("media-captions-menu-button");
  }
  /**
   * @type {Array<object>} An array of TextTrack-like objects.
   * Objects must have the properties: kind, language, and label.
   */
  get mediaSubtitlesList() {
    return getSubtitlesListAttr2(this, MediaUIAttributes.MEDIA_SUBTITLES_LIST);
  }
  set mediaSubtitlesList(list) {
    setSubtitlesListAttr2(this, MediaUIAttributes.MEDIA_SUBTITLES_LIST, list);
  }
  /**
   * An array of TextTrack-like objects.
   * Objects must have the properties: kind, language, and label.
   */
  get mediaSubtitlesShowing() {
    return getSubtitlesListAttr2(
      this,
      MediaUIAttributes.MEDIA_SUBTITLES_SHOWING
    );
  }
  set mediaSubtitlesShowing(list) {
    setSubtitlesListAttr2(this, MediaUIAttributes.MEDIA_SUBTITLES_SHOWING, list);
  }
};
_prevState2 = /* @__PURE__ */ new WeakMap();
_render2 = /* @__PURE__ */ new WeakSet();
render_fn2 = function() {
  var _a4;
  if (__privateGet26(this, _prevState2) === JSON.stringify(this.mediaSubtitlesList))
    return;
  __privateSet25(this, _prevState2, JSON.stringify(this.mediaSubtitlesList));
  this.defaultSlot.textContent = "";
  const isOff = !this.value;
  const item = createMenuItem({
    type: "radio",
    text: this.formatMenuItemText(t("Off")),
    value: "off",
    checked: isOff
  });
  item.prepend(createIndicator(this, "checked-indicator"));
  this.defaultSlot.append(item);
  const subtitlesList = this.mediaSubtitlesList;
  for (const subs of subtitlesList) {
    const item2 = createMenuItem({
      type: "radio",
      text: this.formatMenuItemText(subs.label, subs),
      value: formatTextTrackObj(subs),
      checked: this.value == formatTextTrackObj(subs)
    });
    item2.prepend(createIndicator(this, "checked-indicator"));
    const type = (_a4 = subs.kind) != null ? _a4 : "subs";
    if (type === "captions") {
      item2.append(createIndicator(this, "captions-indicator"));
    }
    this.defaultSlot.append(item2);
  }
};
_onChange2 = /* @__PURE__ */ new WeakSet();
onChange_fn2 = function() {
  const showingSubs = this.mediaSubtitlesShowing;
  const showingSubsStr = this.getAttribute(
    MediaUIAttributes.MEDIA_SUBTITLES_SHOWING
  );
  const localStateChange = this.value !== showingSubsStr;
  if ((showingSubs == null ? void 0 : showingSubs.length) && localStateChange) {
    this.dispatchEvent(
      new GlobalThis.CustomEvent(
        MediaUIEvents.MEDIA_DISABLE_SUBTITLES_REQUEST,
        {
          composed: true,
          bubbles: true,
          detail: showingSubs
        }
      )
    );
  }
  if (!this.value || !localStateChange)
    return;
  const event = new GlobalThis.CustomEvent(
    MediaUIEvents.MEDIA_SHOW_SUBTITLES_REQUEST,
    {
      composed: true,
      bubbles: true,
      detail: this.value
    }
  );
  this.dispatchEvent(event);
};
MediaCaptionsMenu.getTemplateHTML = getTemplateHTML17;
var getSubtitlesListAttr2 = (el, attrName) => {
  const attrVal = el.getAttribute(attrName);
  return attrVal ? parseTextTracksStr(attrVal) : [];
};
var setSubtitlesListAttr2 = (el, attrName, list) => {
  if (!(list == null ? void 0 : list.length)) {
    el.removeAttribute(attrName);
    return;
  }
  const newValStr = stringifyTextTrackList(list);
  const oldVal = el.getAttribute(attrName);
  if (oldVal === newValStr)
    return;
  el.setAttribute(attrName, newValStr);
};
if (!GlobalThis.customElements.get("media-captions-menu")) {
  GlobalThis.customElements.define("media-captions-menu", MediaCaptionsMenu);
}

// node_modules/media-chrome/dist/menu/media-captions-menu-button.js
var ccIconOn2 = `<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`;
var ccIconOff2 = `<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;
function getSlotTemplateHTML20() {
  return (
    /*html*/
    `
    <style>
      :host([aria-checked="true"]) slot[name=off] {
        display: none !important;
      }

      ${/* Double negative, but safer if display doesn't equal 'block' */
    ""}
      :host(:not([aria-checked="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${ccIconOn2}</slot>
      <slot name="off">${ccIconOff2}</slot>
    </slot>
  `
  );
}
function getTooltipContentHTML14() {
  return t("Captions");
}
var updateAriaChecked2 = (el) => {
  el.setAttribute("aria-checked", areSubsOn(el).toString());
};
var MediaCaptionsMenuButton = class extends MediaChromeMenuButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_SUBTITLES_LIST,
      MediaUIAttributes.MEDIA_SUBTITLES_SHOWING
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("aria-label", t("closed captions"));
    updateAriaChecked2(this);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_SUBTITLES_SHOWING) {
      updateAriaChecked2(this);
    }
  }
  /**
   * Returns the element with the id specified by the `invoketarget` attribute.
   * @return {HTMLElement | null}
   */
  get invokeTargetElement() {
    var _a4;
    if (this.invokeTarget != void 0)
      return super.invokeTargetElement;
    return (_a4 = getMediaController(this)) == null ? void 0 : _a4.querySelector("media-captions-menu");
  }
  /**
   * An array of TextTrack-like objects.
   * Objects must have the properties: kind, language, and label.
   */
  get mediaSubtitlesList() {
    return getSubtitlesListAttr3(this, MediaUIAttributes.MEDIA_SUBTITLES_LIST);
  }
  set mediaSubtitlesList(list) {
    setSubtitlesListAttr3(this, MediaUIAttributes.MEDIA_SUBTITLES_LIST, list);
  }
  /**
   * An array of TextTrack-like objects.
   * Objects must have the properties: kind, language, and label.
   */
  get mediaSubtitlesShowing() {
    return getSubtitlesListAttr3(
      this,
      MediaUIAttributes.MEDIA_SUBTITLES_SHOWING
    );
  }
  set mediaSubtitlesShowing(list) {
    setSubtitlesListAttr3(this, MediaUIAttributes.MEDIA_SUBTITLES_SHOWING, list);
  }
};
MediaCaptionsMenuButton.getSlotTemplateHTML = getSlotTemplateHTML20;
MediaCaptionsMenuButton.getTooltipContentHTML = getTooltipContentHTML14;
var getSubtitlesListAttr3 = (el, attrName) => {
  const attrVal = el.getAttribute(attrName);
  return attrVal ? parseTextTracksStr(attrVal) : [];
};
var setSubtitlesListAttr3 = (el, attrName, list) => {
  if (!(list == null ? void 0 : list.length)) {
    el.removeAttribute(attrName);
    return;
  }
  const newValStr = stringifyTextTrackList(list);
  const oldVal = el.getAttribute(attrName);
  if (oldVal === newValStr)
    return;
  el.setAttribute(attrName, newValStr);
};
if (!GlobalThis.customElements.get("media-captions-menu-button")) {
  GlobalThis.customElements.define(
    "media-captions-menu-button",
    MediaCaptionsMenuButton
  );
}

// node_modules/media-chrome/dist/menu/media-playback-rate-menu.js
var __accessCheck26 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet27 = (obj, member, getter) => {
  __accessCheck26(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd27 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod13 = (obj, member, method) => {
  __accessCheck26(obj, member, "access private method");
  return method;
};
var _rates2;
var _render3;
var render_fn3;
var _onChange3;
var onChange_fn3;
var Attributes14 = {
  RATES: "rates"
};
var MediaPlaybackRateMenu = class extends MediaChromeMenu {
  constructor() {
    super();
    __privateAdd27(this, _render3);
    __privateAdd27(this, _onChange3);
    __privateAdd27(this, _rates2, new AttributeTokenList(this, Attributes14.RATES, {
      defaultValue: DEFAULT_RATES
    }));
    __privateMethod13(this, _render3, render_fn3).call(this);
  }
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_PLAYBACK_RATE,
      Attributes14.RATES
    ];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_PLAYBACK_RATE && oldValue != newValue) {
      this.value = newValue;
    } else if (attrName === Attributes14.RATES && oldValue != newValue) {
      __privateGet27(this, _rates2).value = newValue;
      __privateMethod13(this, _render3, render_fn3).call(this);
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("change", __privateMethod13(this, _onChange3, onChange_fn3));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("change", __privateMethod13(this, _onChange3, onChange_fn3));
  }
  /**
   * Returns the anchor element when it is a floating menu.
   */
  get anchorElement() {
    if (this.anchor !== "auto")
      return super.anchorElement;
    return getMediaController(this).querySelector(
      "media-playback-rate-menu-button"
    );
  }
  /**
   * Get the playback rates for the button.
   */
  get rates() {
    return __privateGet27(this, _rates2);
  }
  /**
   * Set the playback rates for the button.
   * For React 19+ compatibility, accept a string of space-separated rates.
   */
  set rates(value) {
    if (!value) {
      __privateGet27(this, _rates2).value = "";
    } else if (Array.isArray(value)) {
      __privateGet27(this, _rates2).value = value.join(" ");
    } else if (typeof value === "string") {
      __privateGet27(this, _rates2).value = value;
    }
    __privateMethod13(this, _render3, render_fn3).call(this);
  }
  /**
   * The current playback rate
   */
  get mediaPlaybackRate() {
    return getNumericAttr(
      this,
      MediaUIAttributes.MEDIA_PLAYBACK_RATE,
      DEFAULT_RATE
    );
  }
  set mediaPlaybackRate(value) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_PLAYBACK_RATE, value);
  }
};
_rates2 = /* @__PURE__ */ new WeakMap();
_render3 = /* @__PURE__ */ new WeakSet();
render_fn3 = function() {
  this.defaultSlot.textContent = "";
  for (const rate of __privateGet27(this, _rates2)) {
    const item = createMenuItem({
      type: "radio",
      text: this.formatMenuItemText(`${rate}x`, rate),
      value: rate,
      checked: this.mediaPlaybackRate === Number(rate)
    });
    item.prepend(createIndicator(this, "checked-indicator"));
    this.defaultSlot.append(item);
  }
};
_onChange3 = /* @__PURE__ */ new WeakSet();
onChange_fn3 = function() {
  if (!this.value)
    return;
  const event = new GlobalThis.CustomEvent(
    MediaUIEvents.MEDIA_PLAYBACK_RATE_REQUEST,
    {
      composed: true,
      bubbles: true,
      detail: this.value
    }
  );
  this.dispatchEvent(event);
};
if (!GlobalThis.customElements.get("media-playback-rate-menu")) {
  GlobalThis.customElements.define(
    "media-playback-rate-menu",
    MediaPlaybackRateMenu
  );
}

// node_modules/media-chrome/dist/menu/media-playback-rate-menu-button.js
var DEFAULT_RATE2 = 1;
function getSlotTemplateHTML21(attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
      
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${attrs["mediaplaybackrate"] || DEFAULT_RATE2}x</slot>
  `
  );
}
function getTooltipContentHTML15() {
  return t("Playback rate");
}
var MediaPlaybackRateMenuButton = class extends MediaChromeMenuButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_PLAYBACK_RATE
    ];
  }
  constructor() {
    var _a4;
    super();
    this.container = this.shadowRoot.querySelector('slot[name="icon"]');
    this.container.innerHTML = `${(_a4 = this.mediaPlaybackRate) != null ? _a4 : DEFAULT_RATE2}x`;
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_PLAYBACK_RATE) {
      const newPlaybackRate = newValue ? +newValue : Number.NaN;
      const playbackRate = !Number.isNaN(newPlaybackRate) ? newPlaybackRate : DEFAULT_RATE2;
      this.container.innerHTML = `${playbackRate}x`;
      this.setAttribute(
        "aria-label",
        t("Playback rate {playbackRate}", { playbackRate })
      );
    }
  }
  /**
   * Returns the element with the id specified by the `invoketarget` attribute.
   */
  get invokeTargetElement() {
    if (this.invokeTarget != void 0)
      return super.invokeTargetElement;
    return getMediaController(this).querySelector("media-playback-rate-menu");
  }
  /**
   * The current playback rate
   */
  get mediaPlaybackRate() {
    return getNumericAttr(
      this,
      MediaUIAttributes.MEDIA_PLAYBACK_RATE,
      DEFAULT_RATE2
    );
  }
  set mediaPlaybackRate(value) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_PLAYBACK_RATE, value);
  }
};
MediaPlaybackRateMenuButton.getSlotTemplateHTML = getSlotTemplateHTML21;
MediaPlaybackRateMenuButton.getTooltipContentHTML = getTooltipContentHTML15;
if (!GlobalThis.customElements.get("media-playback-rate-menu-button")) {
  GlobalThis.customElements.define(
    "media-playback-rate-menu-button",
    MediaPlaybackRateMenuButton
  );
}

// node_modules/media-chrome/dist/menu/media-rendition-menu.js
var __accessCheck27 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet28 = (obj, member, getter) => {
  __accessCheck27(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd28 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet26 = (obj, member, value, setter) => {
  __accessCheck27(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod14 = (obj, member, method) => {
  __accessCheck27(obj, member, "access private method");
  return method;
};
var _renditionList;
var _prevState3;
var _render4;
var render_fn4;
var _onChange4;
var onChange_fn4;
var MediaRenditionMenu = class extends MediaChromeMenu {
  constructor() {
    super(...arguments);
    __privateAdd28(this, _render4);
    __privateAdd28(this, _onChange4);
    __privateAdd28(this, _renditionList, []);
    __privateAdd28(this, _prevState3, {});
  }
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_RENDITION_LIST,
      MediaUIAttributes.MEDIA_RENDITION_SELECTED,
      MediaUIAttributes.MEDIA_RENDITION_UNAVAILABLE,
      MediaUIAttributes.MEDIA_HEIGHT
    ];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_RENDITION_SELECTED && oldValue !== newValue) {
      this.value = newValue != null ? newValue : "auto";
      __privateMethod14(this, _render4, render_fn4).call(this);
    } else if (attrName === MediaUIAttributes.MEDIA_RENDITION_LIST && oldValue !== newValue) {
      __privateSet26(this, _renditionList, parseRenditionList(newValue));
      __privateMethod14(this, _render4, render_fn4).call(this);
    } else if (attrName === MediaUIAttributes.MEDIA_HEIGHT && oldValue !== newValue) {
      __privateMethod14(this, _render4, render_fn4).call(this);
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("change", __privateMethod14(this, _onChange4, onChange_fn4));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("change", __privateMethod14(this, _onChange4, onChange_fn4));
  }
  /**
   * Returns the anchor element when it is a floating menu.
   */
  get anchorElement() {
    if (this.anchor !== "auto")
      return super.anchorElement;
    return getMediaController(this).querySelector(
      "media-rendition-menu-button"
    );
  }
  get mediaRenditionList() {
    return __privateGet28(this, _renditionList);
  }
  set mediaRenditionList(list) {
    __privateSet26(this, _renditionList, list);
    __privateMethod14(this, _render4, render_fn4).call(this);
  }
  /**
   * Get selected rendition id.
   */
  get mediaRenditionSelected() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_RENDITION_SELECTED);
  }
  set mediaRenditionSelected(id) {
    setStringAttr(this, MediaUIAttributes.MEDIA_RENDITION_SELECTED, id);
  }
  get mediaHeight() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_HEIGHT);
  }
  set mediaHeight(height) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_HEIGHT, height);
  }
};
_renditionList = /* @__PURE__ */ new WeakMap();
_prevState3 = /* @__PURE__ */ new WeakMap();
_render4 = /* @__PURE__ */ new WeakSet();
render_fn4 = function() {
  if (__privateGet28(this, _prevState3).mediaRenditionList === JSON.stringify(this.mediaRenditionList) && __privateGet28(this, _prevState3).mediaHeight === this.mediaHeight)
    return;
  __privateGet28(this, _prevState3).mediaRenditionList = JSON.stringify(this.mediaRenditionList);
  __privateGet28(this, _prevState3).mediaHeight = this.mediaHeight;
  const renditionList = this.mediaRenditionList.sort(
    (a3, b4) => b4.height - a3.height
  );
  for (const rendition of renditionList) {
    rendition.selected = rendition.id === this.mediaRenditionSelected;
  }
  this.defaultSlot.textContent = "";
  const isAuto = !this.mediaRenditionSelected;
  for (const rendition of renditionList) {
    const text2 = this.formatMenuItemText(
      `${Math.min(rendition.width, rendition.height)}p`,
      rendition
    );
    const item2 = createMenuItem({
      type: "radio",
      text: text2,
      value: `${rendition.id}`,
      checked: rendition.selected && !isAuto
    });
    item2.prepend(createIndicator(this, "checked-indicator"));
    this.defaultSlot.append(item2);
  }
  const text = isAuto ? this.formatMenuItemText(`${t("Auto")} (${this.mediaHeight}p)`) : this.formatMenuItemText(t("Auto"));
  const item = createMenuItem({
    type: "radio",
    text,
    value: "auto",
    checked: isAuto
  });
  const autoDescription = this.mediaHeight > 0 ? `${t("Auto")} (${this.mediaHeight}p)` : t("Auto");
  item.dataset.description = autoDescription;
  item.prepend(createIndicator(this, "checked-indicator"));
  this.defaultSlot.append(item);
};
_onChange4 = /* @__PURE__ */ new WeakSet();
onChange_fn4 = function() {
  if (this.value == null)
    return;
  const event = new GlobalThis.CustomEvent(
    MediaUIEvents.MEDIA_RENDITION_REQUEST,
    {
      composed: true,
      bubbles: true,
      detail: this.value
    }
  );
  this.dispatchEvent(event);
};
if (!GlobalThis.customElements.get("media-rendition-menu")) {
  GlobalThis.customElements.define("media-rendition-menu", MediaRenditionMenu);
}

// node_modules/media-chrome/dist/menu/media-rendition-menu-button.js
var renditionIcon = (
  /*html*/
  `<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M13.5 2.5h2v6h-2v-2h-11v-2h11v-2Zm4 2h4v2h-4v-2Zm-12 4h2v6h-2v-2h-3v-2h3v-2Zm4 2h12v2h-12v-2Zm1 4h2v6h-2v-2h-8v-2h8v-2Zm4 2h7v2h-7v-2Z" />
</svg>`
);
function getSlotTemplateHTML22() {
  return (
    /*html*/
    `
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${renditionIcon}</slot>
  `
  );
}
function getTooltipContentHTML16() {
  return t("Quality");
}
var MediaRenditionMenuButton = class extends MediaChromeMenuButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_RENDITION_SELECTED,
      MediaUIAttributes.MEDIA_RENDITION_UNAVAILABLE,
      MediaUIAttributes.MEDIA_HEIGHT
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("aria-label", t("quality"));
  }
  /**
   * Returns the element with the id specified by the `invoketarget` attribute.
   */
  get invokeTargetElement() {
    if (this.invokeTarget != void 0)
      return super.invokeTargetElement;
    return getMediaController(this).querySelector("media-rendition-menu");
  }
  /**
   * Get selected rendition id.
   */
  get mediaRenditionSelected() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_RENDITION_SELECTED);
  }
  set mediaRenditionSelected(id) {
    setStringAttr(this, MediaUIAttributes.MEDIA_RENDITION_SELECTED, id);
  }
  get mediaHeight() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_HEIGHT);
  }
  set mediaHeight(height) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_HEIGHT, height);
  }
};
MediaRenditionMenuButton.getSlotTemplateHTML = getSlotTemplateHTML22;
MediaRenditionMenuButton.getTooltipContentHTML = getTooltipContentHTML16;
if (!GlobalThis.customElements.get("media-rendition-menu-button")) {
  GlobalThis.customElements.define(
    "media-rendition-menu-button",
    MediaRenditionMenuButton
  );
}

// node_modules/@mux/mux-player/dist/base.mjs
var qe2 = (t3) => {
  throw TypeError(t3);
};
var he3 = (t3, a3, e2) => a3.has(t3) || qe2("Cannot " + e2);
var u3 = (t3, a3, e2) => (he3(t3, a3, "read from private field"), e2 ? e2.call(t3) : a3.get(t3));
var T2 = (t3, a3, e2) => a3.has(t3) ? qe2("Cannot add the same private member more than once") : a3 instanceof WeakSet ? a3.add(t3) : a3.set(t3, e2);
var C5 = (t3, a3, e2, i2) => (he3(t3, a3, "write to private field"), i2 ? i2.call(t3, e2) : a3.set(t3, e2), e2);
var p3 = (t3, a3, e2) => (he3(t3, a3, "access private method"), e2);
var $3 = class {
  addEventListener() {
  }
  removeEventListener() {
  }
  dispatchEvent(a3) {
    return true;
  }
};
if (typeof DocumentFragment == "undefined") {
  class t3 extends $3 {
  }
  globalThis.DocumentFragment = t3;
}
var G2 = class extends $3 {
};
var ge3 = class extends $3 {
};
var Pt3 = { get(t3) {
}, define(t3, a3, e2) {
}, getName(t3) {
  return null;
}, upgrade(t3) {
}, whenDefined(t3) {
  return Promise.resolve(G2);
} };
var j3;
var fe3 = class {
  constructor(a3, e2 = {}) {
    T2(this, j3);
    C5(this, j3, e2 == null ? void 0 : e2.detail);
  }
  get detail() {
    return u3(this, j3);
  }
  initCustomEvent() {
  }
};
j3 = /* @__PURE__ */ new WeakMap();
function Dt3(t3, a3) {
  return new G2();
}
var Qe3 = { document: { createElement: Dt3 }, DocumentFragment, customElements: Pt3, CustomEvent: fe3, EventTarget: $3, HTMLElement: G2, HTMLVideoElement: ge3 };
var Je3 = typeof window == "undefined" || typeof globalThis.customElements == "undefined";
var k3 = Je3 ? Qe3 : globalThis;
var Y4 = Je3 ? Qe3.document : globalThis.document;
function et2(t3) {
  let a3 = "";
  return Object.entries(t3).forEach(([e2, i2]) => {
    i2 != null && (a3 += `${re3(e2)}: ${i2}; `);
  }), a3 ? a3.trim() : void 0;
}
function re3(t3) {
  return t3.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function oe2(t3) {
  return t3.replace(/[-_]([a-z])/g, (a3, e2) => e2.toUpperCase());
}
function y3(t3) {
  if (t3 == null) return;
  let a3 = +t3;
  return Number.isNaN(a3) ? void 0 : a3;
}
function ye3(t3) {
  let a3 = Ut3(t3).toString();
  return a3 ? "?" + a3 : "";
}
function Ut3(t3) {
  let a3 = {};
  for (let e2 in t3) t3[e2] != null && (a3[e2] = t3[e2]);
  return new URLSearchParams(a3);
}
var ve3 = (t3, a3) => !t3 || !a3 ? false : t3.contains(a3) ? true : ve3(t3, a3.getRootNode().host);
var at3 = "mux.com";
var Vt3 = () => {
  try {
    return "3.5.1";
  } catch {
  }
  return "UNKNOWN";
};
var Bt2 = Vt3();
var se3 = () => Bt2;
var it2 = (t3, { token: a3, customDomain: e2 = at3, thumbnailTime: i2, programTime: r12 } = {}) => {
  var l4;
  let n3 = a3 == null ? i2 : void 0, { aud: d4 } = (l4 = ee2(a3)) != null ? l4 : {};
  if (!(a3 && d4 !== "t")) return `https://image.${e2}/${t3}/thumbnail.webp${ye3({ token: a3, time: n3, program_time: r12 })}`;
};
var rt3 = (t3, { token: a3, customDomain: e2 = at3, programStartTime: i2, programEndTime: r12 } = {}) => {
  var d4;
  let { aud: n3 } = (d4 = ee2(a3)) != null ? d4 : {};
  if (!(a3 && n3 !== "s")) return `https://image.${e2}/${t3}/storyboard.vtt${ye3({ token: a3, format: "webp", program_start_time: i2, program_end_time: r12 })}`;
};
var z2 = (t3) => {
  if (t3) {
    if ([_.LIVE, _.ON_DEMAND].includes(t3)) return t3;
    if (t3 != null && t3.includes("live")) return _.LIVE;
  }
};
var Ht3 = { crossorigin: "crossOrigin", playsinline: "playsInline" };
function ot3(t3) {
  var a3;
  return (a3 = Ht3[t3]) != null ? a3 : oe2(t3);
}
var P3;
var D3;
var v3;
var ne3 = class {
  constructor(a3, e2) {
    T2(this, P3);
    T2(this, D3);
    T2(this, v3, []);
    C5(this, P3, a3), C5(this, D3, e2);
  }
  [Symbol.iterator]() {
    return u3(this, v3).values();
  }
  get length() {
    return u3(this, v3).length;
  }
  get value() {
    var a3;
    return (a3 = u3(this, v3).join(" ")) != null ? a3 : "";
  }
  set value(a3) {
    var e2;
    a3 !== this.value && (C5(this, v3, []), this.add(...(e2 = a3 == null ? void 0 : a3.split(" ")) != null ? e2 : []));
  }
  toString() {
    return this.value;
  }
  item(a3) {
    return u3(this, v3)[a3];
  }
  values() {
    return u3(this, v3).values();
  }
  keys() {
    return u3(this, v3).keys();
  }
  forEach(a3) {
    u3(this, v3).forEach(a3);
  }
  add(...a3) {
    var e2, i2;
    a3.forEach((r12) => {
      this.contains(r12) || u3(this, v3).push(r12);
    }), !(this.value === "" && !((e2 = u3(this, P3)) != null && e2.hasAttribute(`${u3(this, D3)}`))) && ((i2 = u3(this, P3)) == null || i2.setAttribute(`${u3(this, D3)}`, `${this.value}`));
  }
  remove(...a3) {
    var e2;
    a3.forEach((i2) => {
      u3(this, v3).splice(u3(this, v3).indexOf(i2), 1);
    }), (e2 = u3(this, P3)) == null || e2.setAttribute(`${u3(this, D3)}`, `${this.value}`);
  }
  contains(a3) {
    return u3(this, v3).includes(a3);
  }
  toggle(a3, e2) {
    return typeof e2 != "undefined" ? e2 ? (this.add(a3), true) : (this.remove(a3), false) : this.contains(a3) ? (this.remove(a3), false) : (this.add(a3), true);
  }
  replace(a3, e2) {
    this.remove(a3), this.add(e2);
  }
};
P3 = /* @__PURE__ */ new WeakMap(), D3 = /* @__PURE__ */ new WeakMap(), v3 = /* @__PURE__ */ new WeakMap();
var nt3 = `[mux-player ${se3()}]`;
function x4(...t3) {
  console.warn(nt3, ...t3);
}
function E(...t3) {
  console.error(nt3, ...t3);
}
function Ee2(t3) {
  var e2;
  let a3 = (e2 = t3.message) != null ? e2 : "";
  t3.context && (a3 += ` ${t3.context}`), t3.file && (a3 += ` ${x("Read more: ")}
https://github.com/muxinc/elements/blob/main/errors/${t3.file}`), x4(a3);
}
var g5 = { AUTOPLAY: "autoplay", CROSSORIGIN: "crossorigin", LOOP: "loop", MUTED: "muted", PLAYSINLINE: "playsinline", PRELOAD: "preload" };
var N2 = { VOLUME: "volume", PLAYBACKRATE: "playbackrate", MUTED: "muted" };
var Va = { ...g5, ...N2 };
var dt3 = Object.freeze({ length: 0, start(t3) {
  let a3 = t3 >>> 0;
  if (a3 >= this.length) throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${a3}) is greater than or equal to the maximum bound (${this.length}).`);
  return 0;
}, end(t3) {
  let a3 = t3 >>> 0;
  if (a3 >= this.length) throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${a3}) is greater than or equal to the maximum bound (${this.length}).`);
  return 0;
} });
var $t2 = Object.values(g5).filter((t3) => g5.PLAYSINLINE !== t3);
var Yt3 = Object.values(N2);
var Ft2 = [...$t2, ...Yt3];
var Ae3 = class extends k3.HTMLElement {
  static get observedAttributes() {
    return Ft2;
  }
  constructor() {
    super();
  }
  attributeChangedCallback(a3, e2, i2) {
    var r12, n3;
    switch (a3) {
      case N2.MUTED: {
        this.media && (this.media.muted = i2 != null, this.media.defaultMuted = i2 != null);
        return;
      }
      case N2.VOLUME: {
        let d4 = (r12 = y3(i2)) != null ? r12 : 1;
        this.media && (this.media.volume = d4);
        return;
      }
      case N2.PLAYBACKRATE: {
        let d4 = (n3 = y3(i2)) != null ? n3 : 1;
        this.media && (this.media.playbackRate = d4, this.media.defaultPlaybackRate = d4);
        return;
      }
    }
  }
  play() {
    var a3, e2;
    return (e2 = (a3 = this.media) == null ? void 0 : a3.play()) != null ? e2 : Promise.reject();
  }
  pause() {
    var a3;
    (a3 = this.media) == null || a3.pause();
  }
  load() {
    var a3;
    (a3 = this.media) == null || a3.load();
  }
  get media() {
    var a3;
    return (a3 = this.shadowRoot) == null ? void 0 : a3.querySelector("mux-video");
  }
  get audioTracks() {
    return this.media.audioTracks;
  }
  get videoTracks() {
    return this.media.videoTracks;
  }
  get audioRenditions() {
    return this.media.audioRenditions;
  }
  get videoRenditions() {
    return this.media.videoRenditions;
  }
  get paused() {
    var a3, e2;
    return (e2 = (a3 = this.media) == null ? void 0 : a3.paused) != null ? e2 : true;
  }
  get duration() {
    var a3, e2;
    return (e2 = (a3 = this.media) == null ? void 0 : a3.duration) != null ? e2 : NaN;
  }
  get ended() {
    var a3, e2;
    return (e2 = (a3 = this.media) == null ? void 0 : a3.ended) != null ? e2 : false;
  }
  get buffered() {
    var a3, e2;
    return (e2 = (a3 = this.media) == null ? void 0 : a3.buffered) != null ? e2 : dt3;
  }
  get seekable() {
    var a3, e2;
    return (e2 = (a3 = this.media) == null ? void 0 : a3.seekable) != null ? e2 : dt3;
  }
  get readyState() {
    var a3, e2;
    return (e2 = (a3 = this.media) == null ? void 0 : a3.readyState) != null ? e2 : 0;
  }
  get videoWidth() {
    var a3, e2;
    return (e2 = (a3 = this.media) == null ? void 0 : a3.videoWidth) != null ? e2 : 0;
  }
  get videoHeight() {
    var a3, e2;
    return (e2 = (a3 = this.media) == null ? void 0 : a3.videoHeight) != null ? e2 : 0;
  }
  get currentSrc() {
    var a3, e2;
    return (e2 = (a3 = this.media) == null ? void 0 : a3.currentSrc) != null ? e2 : "";
  }
  get currentTime() {
    var a3, e2;
    return (e2 = (a3 = this.media) == null ? void 0 : a3.currentTime) != null ? e2 : 0;
  }
  set currentTime(a3) {
    this.media && (this.media.currentTime = Number(a3));
  }
  get volume() {
    var a3, e2;
    return (e2 = (a3 = this.media) == null ? void 0 : a3.volume) != null ? e2 : 1;
  }
  set volume(a3) {
    this.media && (this.media.volume = Number(a3));
  }
  get playbackRate() {
    var a3, e2;
    return (e2 = (a3 = this.media) == null ? void 0 : a3.playbackRate) != null ? e2 : 1;
  }
  set playbackRate(a3) {
    this.media && (this.media.playbackRate = Number(a3));
  }
  get defaultPlaybackRate() {
    var a3;
    return (a3 = y3(this.getAttribute(N2.PLAYBACKRATE))) != null ? a3 : 1;
  }
  set defaultPlaybackRate(a3) {
    a3 != null ? this.setAttribute(N2.PLAYBACKRATE, `${a3}`) : this.removeAttribute(N2.PLAYBACKRATE);
  }
  get crossOrigin() {
    return X3(this, g5.CROSSORIGIN);
  }
  set crossOrigin(a3) {
    this.setAttribute(g5.CROSSORIGIN, `${a3}`);
  }
  get autoplay() {
    return X3(this, g5.AUTOPLAY) != null;
  }
  set autoplay(a3) {
    a3 ? this.setAttribute(g5.AUTOPLAY, typeof a3 == "string" ? a3 : "") : this.removeAttribute(g5.AUTOPLAY);
  }
  get loop() {
    return X3(this, g5.LOOP) != null;
  }
  set loop(a3) {
    a3 ? this.setAttribute(g5.LOOP, "") : this.removeAttribute(g5.LOOP);
  }
  get muted() {
    var a3, e2;
    return (e2 = (a3 = this.media) == null ? void 0 : a3.muted) != null ? e2 : false;
  }
  set muted(a3) {
    this.media && (this.media.muted = !!a3);
  }
  get defaultMuted() {
    return X3(this, g5.MUTED) != null;
  }
  set defaultMuted(a3) {
    a3 ? this.setAttribute(g5.MUTED, "") : this.removeAttribute(g5.MUTED);
  }
  get playsInline() {
    return X3(this, g5.PLAYSINLINE) != null;
  }
  set playsInline(a3) {
    E("playsInline is set to true by default and is not currently supported as a setter.");
  }
  get preload() {
    return this.media ? this.media.preload : this.getAttribute("preload");
  }
  set preload(a3) {
    ["", "none", "metadata", "auto"].includes(a3) ? this.setAttribute(g5.PRELOAD, a3) : this.removeAttribute(g5.PRELOAD);
  }
};
function X3(t3, a3) {
  return t3.media ? t3.media.getAttribute(a3) : t3.getAttribute(a3);
}
var Ce3 = Ae3;
var lt3 = `:host {
  --media-control-display: var(--controls);
  --media-loading-indicator-display: var(--loading-indicator);
  --media-dialog-display: var(--dialog);
  --media-play-button-display: var(--play-button);
  --media-live-button-display: var(--live-button);
  --media-seek-backward-button-display: var(--seek-backward-button);
  --media-seek-forward-button-display: var(--seek-forward-button);
  --media-mute-button-display: var(--mute-button);
  --media-captions-button-display: var(--captions-button);
  --media-captions-menu-button-display: var(--captions-menu-button, var(--media-captions-button-display));
  --media-rendition-menu-button-display: var(--rendition-menu-button);
  --media-audio-track-menu-button-display: var(--audio-track-menu-button);
  --media-airplay-button-display: var(--airplay-button);
  --media-pip-button-display: var(--pip-button);
  --media-fullscreen-button-display: var(--fullscreen-button);
  --media-cast-button-display: var(--cast-button, var(--_cast-button-drm-display));
  --media-playback-rate-button-display: var(--playback-rate-button);
  --media-playback-rate-menu-button-display: var(--playback-rate-menu-button);
  --media-volume-range-display: var(--volume-range);
  --media-time-range-display: var(--time-range);
  --media-time-display-display: var(--time-display);
  --media-duration-display-display: var(--duration-display);
  --media-title-display-display: var(--title-display);

  display: inline-block;
  line-height: 0;
  width: 100%;
}

a {
  color: #fff;
  font-size: 0.9em;
  text-decoration: underline;
}

media-theme {
  display: inline-block;
  line-height: 0;
  width: 100%;
  height: 100%;
  direction: ltr;
}

media-poster-image {
  display: inline-block;
  line-height: 0;
  width: 100%;
  height: 100%;
}

media-poster-image:not([src]):not([placeholdersrc]) {
  display: none;
}

::part(top),
[part~='top'] {
  --media-control-display: var(--controls, var(--top-controls));
  --media-play-button-display: var(--play-button, var(--top-play-button));
  --media-live-button-display: var(--live-button, var(--top-live-button));
  --media-seek-backward-button-display: var(--seek-backward-button, var(--top-seek-backward-button));
  --media-seek-forward-button-display: var(--seek-forward-button, var(--top-seek-forward-button));
  --media-mute-button-display: var(--mute-button, var(--top-mute-button));
  --media-captions-button-display: var(--captions-button, var(--top-captions-button));
  --media-captions-menu-button-display: var(
    --captions-menu-button,
    var(--media-captions-button-display, var(--top-captions-menu-button))
  );
  --media-rendition-menu-button-display: var(--rendition-menu-button, var(--top-rendition-menu-button));
  --media-audio-track-menu-button-display: var(--audio-track-menu-button, var(--top-audio-track-menu-button));
  --media-airplay-button-display: var(--airplay-button, var(--top-airplay-button));
  --media-pip-button-display: var(--pip-button, var(--top-pip-button));
  --media-fullscreen-button-display: var(--fullscreen-button, var(--top-fullscreen-button));
  --media-cast-button-display: var(--cast-button, var(--top-cast-button, var(--_cast-button-drm-display)));
  --media-playback-rate-button-display: var(--playback-rate-button, var(--top-playback-rate-button));
  --media-playback-rate-menu-button-display: var(
    --captions-menu-button,
    var(--media-playback-rate-button-display, var(--top-playback-rate-menu-button))
  );
  --media-volume-range-display: var(--volume-range, var(--top-volume-range));
  --media-time-range-display: var(--time-range, var(--top-time-range));
  --media-time-display-display: var(--time-display, var(--top-time-display));
  --media-duration-display-display: var(--duration-display, var(--top-duration-display));
  --media-title-display-display: var(--title-display, var(--top-title-display));
}

::part(center),
[part~='center'] {
  --media-control-display: var(--controls, var(--center-controls));
  --media-play-button-display: var(--play-button, var(--center-play-button));
  --media-live-button-display: var(--live-button, var(--center-live-button));
  --media-seek-backward-button-display: var(--seek-backward-button, var(--center-seek-backward-button));
  --media-seek-forward-button-display: var(--seek-forward-button, var(--center-seek-forward-button));
  --media-mute-button-display: var(--mute-button, var(--center-mute-button));
  --media-captions-button-display: var(--captions-button, var(--center-captions-button));
  --media-captions-menu-button-display: var(
    --captions-menu-button,
    var(--media-captions-button-display, var(--center-captions-menu-button))
  );
  --media-rendition-menu-button-display: var(--rendition-menu-button, var(--center-rendition-menu-button));
  --media-audio-track-menu-button-display: var(--audio-track-menu-button, var(--center-audio-track-menu-button));
  --media-airplay-button-display: var(--airplay-button, var(--center-airplay-button));
  --media-pip-button-display: var(--pip-button, var(--center-pip-button));
  --media-fullscreen-button-display: var(--fullscreen-button, var(--center-fullscreen-button));
  --media-cast-button-display: var(--cast-button, var(--center-cast-button, var(--_cast-button-drm-display)));
  --media-playback-rate-button-display: var(--playback-rate-button, var(--center-playback-rate-button));
  --media-playback-rate-menu-button-display: var(
    --playback-rate-menu-button,
    var(--media-playback-rate-button-display, var(--center-playback-rate-menu-button))
  );
  --media-volume-range-display: var(--volume-range, var(--center-volume-range));
  --media-time-range-display: var(--time-range, var(--center-time-range));
  --media-time-display-display: var(--time-display, var(--center-time-display));
  --media-duration-display-display: var(--duration-display, var(--center-duration-display));
}

::part(bottom),
[part~='bottom'] {
  --media-control-display: var(--controls, var(--bottom-controls));
  --media-play-button-display: var(--play-button, var(--bottom-play-button));
  --media-live-button-display: var(--live-button, var(--bottom-live-button));
  --media-seek-backward-button-display: var(--seek-backward-button, var(--bottom-seek-backward-button));
  --media-seek-forward-button-display: var(--seek-forward-button, var(--bottom-seek-forward-button));
  --media-mute-button-display: var(--mute-button, var(--bottom-mute-button));
  --media-captions-button-display: var(--captions-button, var(--bottom-captions-button));
  --media-captions-menu-button-display: var(
    --captions-menu-button,
    var(--media-captions-button-display, var(--bottom-captions-menu-button))
  );
  --media-rendition-menu-button-display: var(--rendition-menu-button, var(--bottom-rendition-menu-button));
  --media-audio-track-menu-button-display: var(--audio-track-menu-button, var(--bottom-audio-track-menu-button));
  --media-airplay-button-display: var(--airplay-button, var(--bottom-airplay-button));
  --media-pip-button-display: var(--pip-button, var(--bottom-pip-button));
  --media-fullscreen-button-display: var(--fullscreen-button, var(--bottom-fullscreen-button));
  --media-cast-button-display: var(--cast-button, var(--bottom-cast-button, var(--_cast-button-drm-display)));
  --media-playback-rate-button-display: var(--playback-rate-button, var(--bottom-playback-rate-button));
  --media-playback-rate-menu-button-display: var(
    --playback-rate-menu-button,
    var(--media-playback-rate-button-display, var(--bottom-playback-rate-menu-button))
  );
  --media-volume-range-display: var(--volume-range, var(--bottom-volume-range));
  --media-time-range-display: var(--time-range, var(--bottom-time-range));
  --media-time-display-display: var(--time-display, var(--bottom-time-display));
  --media-duration-display-display: var(--duration-display, var(--bottom-duration-display));
  --media-title-display-display: var(--title-display, var(--bottom-title-display));
}

:host([no-tooltips]) {
  --media-tooltip-display: none;
}
`;
var q3 = /* @__PURE__ */ new WeakMap();
var _e3 = class t2 {
  constructor(a3, e2) {
    this.element = a3;
    this.type = e2;
    this.element.addEventListener(this.type, this);
    let i2 = q3.get(this.element);
    i2 && i2.set(this.type, this);
  }
  set(a3) {
    if (typeof a3 == "function") this.handleEvent = a3.bind(this.element);
    else if (typeof a3 == "object" && typeof a3.handleEvent == "function") this.handleEvent = a3.handleEvent.bind(a3);
    else {
      this.element.removeEventListener(this.type, this);
      let e2 = q3.get(this.element);
      e2 && e2.delete(this.type);
    }
  }
  static for(a3) {
    q3.has(a3.element) || q3.set(a3.element, /* @__PURE__ */ new Map());
    let e2 = a3.attributeName.slice(2), i2 = q3.get(a3.element);
    return i2 && i2.has(e2) ? i2.get(e2) : new t2(a3.element, e2);
  }
};
function Gt3(t3, a3) {
  return t3 instanceof AttrPart && t3.attributeName.startsWith("on") ? (_e3.for(t3).set(a3), t3.element.removeAttributeNS(t3.attributeNamespace, t3.attributeName), true) : false;
}
function jt3(t3, a3) {
  return a3 instanceof de3 && t3 instanceof ChildNodePart ? (a3.renderInto(t3), true) : false;
}
function zt3(t3, a3) {
  return a3 instanceof DocumentFragment && t3 instanceof ChildNodePart ? (a3.childNodes.length && t3.replace(...a3.childNodes), true) : false;
}
function Xt3(t3, a3) {
  if (t3 instanceof AttrPart) {
    let e2 = t3.attributeNamespace, i2 = t3.element.getAttributeNS(e2, t3.attributeName);
    return String(a3) !== i2 && (t3.value = String(a3)), true;
  }
  return t3.value = String(a3), true;
}
function qt3(t3, a3) {
  if (t3 instanceof AttrPart && a3 instanceof Element) {
    let e2 = t3.element;
    return e2[t3.attributeName] !== a3 && (t3.element.removeAttributeNS(t3.attributeNamespace, t3.attributeName), e2[t3.attributeName] = a3), true;
  }
  return false;
}
function Qt2(t3, a3) {
  if (typeof a3 == "boolean" && t3 instanceof AttrPart) {
    let e2 = t3.attributeNamespace, i2 = t3.element.hasAttributeNS(e2, t3.attributeName);
    return a3 !== i2 && (t3.booleanValue = a3), true;
  }
  return false;
}
function Jt3(t3, a3) {
  return a3 === false && t3 instanceof ChildNodePart ? (t3.replace(""), true) : false;
}
function ea2(t3, a3) {
  qt3(t3, a3) || Qt2(t3, a3) || Gt3(t3, a3) || Jt3(t3, a3) || jt3(t3, a3) || zt3(t3, a3) || Xt3(t3, a3);
}
var ke3 = /* @__PURE__ */ new Map();
var ut3 = /* @__PURE__ */ new WeakMap();
var mt3 = /* @__PURE__ */ new WeakMap();
var de3 = class {
  constructor(a3, e2, i2) {
    this.strings = a3;
    this.values = e2;
    this.processor = i2;
    this.stringsKey = this.strings.join("");
  }
  get template() {
    if (ke3.has(this.stringsKey)) return ke3.get(this.stringsKey);
    {
      let a3 = Y4.createElement("template"), e2 = this.strings.length - 1;
      return a3.innerHTML = this.strings.reduce((i2, r12, n3) => i2 + r12 + (n3 < e2 ? `{{ ${n3} }}` : ""), ""), ke3.set(this.stringsKey, a3), a3;
    }
  }
  renderInto(a3) {
    var r12;
    let e2 = this.template;
    if (ut3.get(a3) !== e2) {
      ut3.set(a3, e2);
      let n3 = new TemplateInstance(e2, this.values, this.processor);
      mt3.set(a3, n3), a3 instanceof ChildNodePart ? a3.replace(...n3.children) : a3.appendChild(n3);
      return;
    }
    let i2 = mt3.get(a3);
    (r12 = i2 == null ? void 0 : i2.update) == null || r12.call(i2, this.values);
  }
};
var ta2 = { processCallback(t3, a3, e2) {
  var i2;
  if (e2) {
    for (let [r12, n3] of a3) if (r12 in e2) {
      let d4 = (i2 = e2[r12]) != null ? i2 : "";
      ea2(n3, d4);
    }
  }
} };
function Q3(t3, ...a3) {
  return new de3(t3, a3, ta2);
}
function ct3(t3, a3) {
  t3.renderInto(a3);
}
var ia2 = (t3) => {
  let { tokens: a3 } = t3;
  return a3.drm ? ":host(:not([cast-receiver])) { --_cast-button-drm-display: none; }" : "";
};
var bt3 = (t3) => Q3`
  <style>
    ${ia2(t3)}
    ${lt3}
  </style>
  ${sa2(t3)}
`;
var ra2 = (t3) => {
  let a3 = t3.hotKeys ? `${t3.hotKeys}` : "";
  return z2(t3.streamType) === "live" && (a3 += " noarrowleft noarrowright"), a3;
};
var oa2 = { TOP: "top", CENTER: "center", BOTTOM: "bottom", LAYER: "layer", MEDIA_LAYER: "media-layer", POSTER_LAYER: "poster-layer", VERTICAL_LAYER: "vertical-layer", CENTERED_LAYER: "centered-layer", GESTURE_LAYER: "gesture-layer", CONTROLLER_LAYER: "controller", BUTTON: "button", RANGE: "range", DISPLAY: "display", CONTROL_BAR: "control-bar", MENU_BUTTON: "menu-button", MENU: "menu", OPTION: "option", POSTER: "poster", LIVE: "live", PLAY: "play", PRE_PLAY: "pre-play", SEEK_BACKWARD: "seek-backward", SEEK_FORWARD: "seek-forward", MUTE: "mute", CAPTIONS: "captions", AIRPLAY: "airplay", PIP: "pip", FULLSCREEN: "fullscreen", CAST: "cast", PLAYBACK_RATE: "playback-rate", VOLUME: "volume", TIME: "time", TITLE: "title", AUDIO_TRACK: "audio-track", RENDITION: "rendition" };
var na2 = Object.values(oa2).join(", ");
var sa2 = (t3) => {
  var a3, e2, i2, r12, n3, d4, l4, b4, S3, F3, _3, A4, R, K3, h3, ie4, W3, Z2, Ie3, Pe4, De3, Ue3, Ve2, Be2, He3, Ke3, $e3, Ye3, Fe3, We2, Ze2, Ge3, je2, ze4, Xe3;
  return Q3`
  <media-theme
    template="${t3.themeTemplate || false}"
    defaultstreamtype="${(a3 = t3.defaultStreamType) != null ? a3 : false}"
    hotkeys="${ra2(t3) || false}"
    nohotkeys="${t3.noHotKeys || !t3.hasSrc || false}"
    noautoseektolive="${!!((e2 = t3.streamType) != null && e2.includes(_.LIVE)) && t3.targetLiveWindow !== 0}"
    novolumepref="${t3.novolumepref || false}"
    disabled="${!t3.hasSrc || t3.isDialogOpen}"
    audio="${(i2 = t3.audio) != null ? i2 : false}"
    style="${(r12 = et2({ "--media-primary-color": t3.primaryColor, "--media-secondary-color": t3.secondaryColor, "--media-accent-color": t3.accentColor })) != null ? r12 : false}"
    defaultsubtitles="${!t3.defaultHiddenCaptions}"
    forwardseekoffset="${(n3 = t3.forwardSeekOffset) != null ? n3 : false}"
    backwardseekoffset="${(d4 = t3.backwardSeekOffset) != null ? d4 : false}"
    playbackrates="${(l4 = t3.playbackRates) != null ? l4 : false}"
    defaultshowremainingtime="${(b4 = t3.defaultShowRemainingTime) != null ? b4 : false}"
    defaultduration="${(S3 = t3.defaultDuration) != null ? S3 : false}"
    hideduration="${(F3 = t3.hideDuration) != null ? F3 : false}"
    title="${(_3 = t3.title) != null ? _3 : false}"
    videotitle="${(A4 = t3.videoTitle) != null ? A4 : false}"
    proudlydisplaymuxbadge="${(R = t3.proudlyDisplayMuxBadge) != null ? R : false}"
    exportparts="${na2}"
    onclose="${t3.onCloseErrorDialog}"
    onfocusin="${t3.onFocusInErrorDialog}"
  >
    <mux-video
      slot="media"
      target-live-window="${(K3 = t3.targetLiveWindow) != null ? K3 : false}"
      stream-type="${(h3 = z2(t3.streamType)) != null ? h3 : false}"
      crossorigin="${(ie4 = t3.crossOrigin) != null ? ie4 : ""}"
      playsinline
      autoplay="${(W3 = t3.autoplay) != null ? W3 : false}"
      muted="${(Z2 = t3.muted) != null ? Z2 : false}"
      loop="${(Ie3 = t3.loop) != null ? Ie3 : false}"
      preload="${(Pe4 = t3.preload) != null ? Pe4 : false}"
      debug="${(De3 = t3.debug) != null ? De3 : false}"
      prefer-cmcd="${(Ue3 = t3.preferCmcd) != null ? Ue3 : false}"
      disable-tracking="${(Ve2 = t3.disableTracking) != null ? Ve2 : false}"
      disable-cookies="${(Be2 = t3.disableCookies) != null ? Be2 : false}"
      prefer-playback="${(He3 = t3.preferPlayback) != null ? He3 : false}"
      start-time="${t3.startTime != null ? t3.startTime : false}"
      beacon-collection-domain="${(Ke3 = t3.beaconCollectionDomain) != null ? Ke3 : false}"
      player-init-time="${($e3 = t3.playerInitTime) != null ? $e3 : false}"
      player-software-name="${(Ye3 = t3.playerSoftwareName) != null ? Ye3 : false}"
      player-software-version="${(Fe3 = t3.playerSoftwareVersion) != null ? Fe3 : false}"
      env-key="${(We2 = t3.envKey) != null ? We2 : false}"
      custom-domain="${(Ze2 = t3.customDomain) != null ? Ze2 : false}"
      src="${t3.src ? t3.src : t3.playbackId ? Yr2(t3) : false}"
      cast-src="${t3.src ? t3.src : t3.playbackId ? Yr2(t3) : false}"
      cast-receiver="${(Ge3 = t3.castReceiver) != null ? Ge3 : false}"
      drm-token="${(ze4 = (je2 = t3.tokens) == null ? void 0 : je2.drm) != null ? ze4 : false}"
      exportparts="video"
    >
      ${t3.storyboard ? Q3`<track label="thumbnails" default kind="metadata" src="${t3.storyboard}" />` : Q3``}
      <slot></slot>
    </mux-video>
    <slot name="poster" slot="poster">
      <media-poster-image
        part="poster"
        exportparts="poster, img"
        src="${t3.poster ? t3.poster : false}"
        placeholdersrc="${(Xe3 = t3.placeholder) != null ? Xe3 : false}"
      ></media-poster-image>
    </slot>
  </media-theme>
`;
};
var ft3 = (t3) => t3.charAt(0).toUpperCase() + t3.slice(1);
var da2 = (t3, a3 = false) => {
  var e2, i2;
  if (t3.muxCode) {
    let r12 = ft3((e2 = t3.errorCategory) != null ? e2 : "video"), n3 = V2((i2 = t3.errorCategory) != null ? i2 : C2.VIDEO);
    if (t3.muxCode === D2.NETWORK_OFFLINE) return x("Your device appears to be offline", a3);
    if (t3.muxCode === D2.NETWORK_TOKEN_EXPIRED) return x("{category} URL has expired", a3).format({ category: r12 });
    if ([D2.NETWORK_TOKEN_SUB_MISMATCH, D2.NETWORK_TOKEN_AUD_MISMATCH, D2.NETWORK_TOKEN_AUD_MISSING, D2.NETWORK_TOKEN_MALFORMED].includes(t3.muxCode)) return x("{category} URL is formatted incorrectly", a3).format({ category: r12 });
    if (t3.muxCode === D2.NETWORK_TOKEN_MISSING) return x("Invalid {categoryName} URL", a3).format({ categoryName: n3 });
    if (t3.muxCode === D2.NETWORK_NOT_FOUND) return x("{category} does not exist", a3).format({ category: r12 });
    if (t3.muxCode === D2.NETWORK_NOT_READY) {
      let d4 = t3.streamType === "live" ? "Live stream" : "Video";
      return x("{mediaType} is not currently available", a3).format({ mediaType: d4 });
    }
  }
  if (t3.code) {
    if (t3.code === f.MEDIA_ERR_NETWORK) return x("Network Error", a3);
    if (t3.code === f.MEDIA_ERR_DECODE) return x("Media Error", a3);
    if (t3.code === f.MEDIA_ERR_SRC_NOT_SUPPORTED) return x("Source Not Supported", a3);
  }
  return x("Error", a3);
};
var la2 = (t3, a3 = false) => {
  var e2, i2;
  if (t3.muxCode) {
    let r12 = ft3((e2 = t3.errorCategory) != null ? e2 : "video"), n3 = V2((i2 = t3.errorCategory) != null ? i2 : C2.VIDEO);
    return t3.muxCode === D2.NETWORK_OFFLINE ? x("Check your internet connection and try reloading this video.", a3) : t3.muxCode === D2.NETWORK_TOKEN_EXPIRED ? x("The video’s secured {tokenNamePrefix}-token has expired.", a3).format({ tokenNamePrefix: n3 }) : t3.muxCode === D2.NETWORK_TOKEN_SUB_MISMATCH ? x("The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.", a3).format({ tokenNamePrefix: n3 }) : t3.muxCode === D2.NETWORK_TOKEN_MALFORMED ? x("{category} URL is formatted incorrectly", a3).format({ category: r12 }) : [D2.NETWORK_TOKEN_AUD_MISMATCH, D2.NETWORK_TOKEN_AUD_MISSING].includes(t3.muxCode) ? x("The {tokenNamePrefix}-token is formatted with incorrect information.", a3).format({ tokenNamePrefix: n3 }) : [D2.NETWORK_TOKEN_MISSING, D2.NETWORK_INVALID_URL].includes(t3.muxCode) ? x("The video URL or {tokenNamePrefix}-token are formatted with incorrect or incomplete information.", a3).format({ tokenNamePrefix: n3 }) : t3.muxCode === D2.NETWORK_NOT_FOUND ? "" : t3.message;
  }
  return t3.code && (t3.code === f.MEDIA_ERR_NETWORK || t3.code === f.MEDIA_ERR_DECODE || t3.code === f.MEDIA_ERR_SRC_NOT_SUPPORTED), t3.message;
};
var yt2 = (t3, a3 = false) => {
  let e2 = da2(t3, a3).toString(), i2 = la2(t3, a3).toString();
  return { title: e2, message: i2 };
};
var ua2 = (t3) => {
  if (t3.muxCode) {
    if (t3.muxCode === D2.NETWORK_TOKEN_EXPIRED) return "403-expired-token.md";
    if (t3.muxCode === D2.NETWORK_TOKEN_MALFORMED) return "403-malformatted-token.md";
    if ([D2.NETWORK_TOKEN_AUD_MISMATCH, D2.NETWORK_TOKEN_AUD_MISSING].includes(t3.muxCode)) return "403-incorrect-aud-value.md";
    if (t3.muxCode === D2.NETWORK_TOKEN_SUB_MISMATCH) return "403-playback-id-mismatch.md";
    if (t3.muxCode === D2.NETWORK_TOKEN_MISSING) return "missing-signed-tokens.md";
    if (t3.muxCode === D2.NETWORK_NOT_FOUND) return "404-not-found.md";
    if (t3.muxCode === D2.NETWORK_NOT_READY) return "412-not-playable.md";
  }
  if (t3.code) {
    if (t3.code === f.MEDIA_ERR_NETWORK) return "";
    if (t3.code === f.MEDIA_ERR_DECODE) return "media-decode-error.md";
    if (t3.code === f.MEDIA_ERR_SRC_NOT_SUPPORTED) return "media-src-not-supported.md";
  }
  return "";
};
var Re2 = (t3, a3) => {
  let e2 = ua2(t3);
  return { message: t3.message, context: t3.context, file: e2 };
};
var vt3 = `<template id="media-theme-gerwig">
  <style>
    @keyframes pre-play-hide {
      0% {
        transform: scale(1);
        opacity: 1;
      }

      30% {
        transform: scale(0.7);
      }

      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }

    :host {
      --_primary-color: var(--media-primary-color, #fff);
      --_secondary-color: var(--media-secondary-color, transparent);
      --_accent-color: var(--media-accent-color, #fa50b5);
      --_text-color: var(--media-text-color, #000);

      --media-icon-color: var(--_primary-color);
      --media-control-background: var(--_secondary-color);
      --media-control-hover-background: var(--_accent-color);
      --media-time-buffered-color: rgba(255, 255, 255, 0.4);
      --media-preview-time-text-shadow: none;
      --media-control-height: 14px;
      --media-control-padding: 6px;
      --media-tooltip-container-margin: 6px;
      --media-tooltip-distance: 18px;

      color: var(--_primary-color);
      display: inline-block;
      width: 100%;
      height: 100%;
    }

    :host([audio]) {
      --_secondary-color: var(--media-secondary-color, black);
      --media-preview-time-text-shadow: none;
    }

    :host([audio]) ::slotted([slot='media']) {
      height: 0px;
    }

    :host([audio]) media-loading-indicator {
      display: none;
    }

    :host([audio]) media-controller {
      background: transparent;
    }

    :host([audio]) media-controller::part(vertical-layer) {
      background: transparent;
    }

    :host([audio]) media-control-bar {
      width: 100%;
      background-color: var(--media-control-background);
    }

    /*
     * 0.433s is the transition duration for VTT Regions.
     * Borrowed here, so the captions don't move too fast.
     */
    media-controller {
      --media-webkit-text-track-transform: translateY(0) scale(0.98);
      --media-webkit-text-track-transition: transform 0.433s ease-out 0.3s;
    }
    media-controller:is([mediapaused], :not([userinactive])) {
      --media-webkit-text-track-transform: translateY(-50px) scale(0.98);
      --media-webkit-text-track-transition: transform 0.15s ease;
    }

    /*
     * CSS specific to iOS devices.
     * See: https://stackoverflow.com/questions/30102792/css-media-query-to-target-only-ios-devices/60220757#60220757
     */
    @supports (-webkit-touch-callout: none) {
      /* Disable subtitle adjusting for iOS Safari */
      media-controller[mediaisfullscreen] {
        --media-webkit-text-track-transform: unset;
        --media-webkit-text-track-transition: unset;
      }
    }

    media-time-range {
      --media-box-padding-left: 6px;
      --media-box-padding-right: 6px;
      --media-range-bar-color: var(--_accent-color);
      --media-time-range-buffered-color: var(--_primary-color);
      --media-range-track-color: transparent;
      --media-range-track-background: rgba(255, 255, 255, 0.4);
      --media-range-thumb-background: radial-gradient(
        circle,
        #000 0%,
        #000 25%,
        var(--_accent-color) 25%,
        var(--_accent-color)
      );
      --media-range-thumb-width: 12px;
      --media-range-thumb-height: 12px;
      --media-range-thumb-transform: scale(0);
      --media-range-thumb-transition: transform 0.3s;
      --media-range-thumb-opacity: 1;
      --media-preview-background: var(--_primary-color);
      --media-box-arrow-background: var(--_primary-color);
      --media-preview-thumbnail-border: 5px solid var(--_primary-color);
      --media-preview-border-radius: 5px;
      --media-text-color: var(--_text-color);
      --media-control-hover-background: transparent;
      --media-preview-chapter-text-shadow: none;
      color: var(--_accent-color);
      padding: 0 6px;
    }

    :host([audio]) media-time-range {
      --media-preview-time-padding: 1.5px 6px;
      --media-preview-box-margin: 0 0 -5px;
    }

    media-time-range:hover {
      --media-range-thumb-transform: scale(1);
    }

    media-preview-thumbnail {
      border-bottom-width: 0;
    }

    [part~='menu'] {
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      bottom: 50px;
      padding: 2.5px 10px;
    }

    [part~='menu']::part(indicator) {
      fill: var(--_accent-color);
    }

    [part~='menu']::part(menu-item) {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 6px 10px;
      min-height: 34px;
    }

    [part~='menu']::part(checked) {
      font-weight: 700;
    }

    media-captions-menu,
    media-rendition-menu,
    media-audio-track-menu,
    media-playback-rate-menu {
      position: absolute; /* ensure they don't take up space in DOM on load */
      --media-menu-background: var(--_primary-color);
      --media-menu-item-checked-background: transparent;
      --media-text-color: var(--_text-color);
      --media-menu-item-hover-background: transparent;
      --media-menu-item-hover-outline: var(--_accent-color) solid 1px;
    }

    media-rendition-menu {
      min-width: 140px;
    }

    /* The icon is a circle so make it 16px high instead of 14px for more balance. */
    media-audio-track-menu-button {
      --media-control-padding: 5px;
      --media-control-height: 16px;
    }

    media-playback-rate-menu-button {
      --media-control-padding: 6px 3px;
      min-width: 4.4ch;
    }

    media-playback-rate-menu {
      --media-menu-flex-direction: row;
      --media-menu-item-checked-background: var(--_accent-color);
      --media-menu-item-checked-indicator-display: none;
      margin-right: 6px;
      padding: 0;
      --media-menu-gap: 0.25em;
    }

    media-playback-rate-menu[part~='menu']::part(menu-item) {
      padding: 6px 6px 6px 8px;
    }

    media-playback-rate-menu[part~='menu']::part(checked) {
      color: #fff;
    }

    :host(:not([audio])) media-time-range {
      /* Adding px is required here for calc() */
      --media-range-padding: 0px;
      background: transparent;
      z-index: 10;
      height: 10px;
      bottom: -3px;
      width: 100%;
    }

    media-control-bar :is([role='button'], [role='switch'], button) {
      line-height: 0;
    }

    media-control-bar :is([part*='button'], [part*='range'], [part*='display']) {
      border-radius: 3px;
    }

    .spacer {
      flex-grow: 1;
      background-color: var(--media-control-background, rgba(20, 20, 30, 0.7));
    }

    media-control-bar[slot~='top-chrome'] {
      min-height: 42px;
      pointer-events: none;
    }

    media-control-bar {
      --gradient-steps:
        hsl(0 0% 0% / 0) 0%, hsl(0 0% 0% / 0.013) 8.1%, hsl(0 0% 0% / 0.049) 15.5%, hsl(0 0% 0% / 0.104) 22.5%,
        hsl(0 0% 0% / 0.175) 29%, hsl(0 0% 0% / 0.259) 35.3%, hsl(0 0% 0% / 0.352) 41.2%, hsl(0 0% 0% / 0.45) 47.1%,
        hsl(0 0% 0% / 0.55) 52.9%, hsl(0 0% 0% / 0.648) 58.8%, hsl(0 0% 0% / 0.741) 64.7%, hsl(0 0% 0% / 0.825) 71%,
        hsl(0 0% 0% / 0.896) 77.5%, hsl(0 0% 0% / 0.951) 84.5%, hsl(0 0% 0% / 0.987) 91.9%, hsl(0 0% 0%) 100%;
    }

    :host([title]:not([audio])) media-control-bar[slot='top-chrome']::before {
      content: '';
      position: absolute;
      width: 100%;
      padding-bottom: min(100px, 25%);
      background: linear-gradient(to top, var(--gradient-steps));
      opacity: 0.8;
      pointer-events: none;
    }

    :host(:not([audio])) media-control-bar[part~='bottom']::before {
      content: '';
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      padding-bottom: min(100px, 25%);
      background: linear-gradient(to bottom, var(--gradient-steps));
      opacity: 0.8;
      z-index: 1;
      pointer-events: none;
    }

    media-control-bar[part~='bottom'] > * {
      z-index: 20;
    }

    media-control-bar[part~='bottom'] {
      padding: 6px 6px;
    }

    media-control-bar[slot~='top-chrome'] > * {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      position: relative;
    }

    media-controller::part(vertical-layer) {
      transition: background-color 1s;
    }

    media-controller:is([mediapaused], :not([userinactive]))::part(vertical-layer) {
      background-color: var(--controls-backdrop-color, var(--controls, transparent));
      transition: background-color 0.25s;
    }

    .center-controls {
      --media-button-icon-width: 100%;
      --media-button-icon-height: auto;
      --media-tooltip-display: none;
      pointer-events: none;
      width: 100%;
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 0 2px rgb(0 0 0 / 0.25)) drop-shadow(0 0 6px rgb(0 0 0 / 0.25));
      paint-order: stroke;
      stroke: rgba(102, 102, 102, 1);
      stroke-width: 0.3px;
      text-shadow:
        0 0 2px rgb(0 0 0 / 0.25),
        0 0 6px rgb(0 0 0 / 0.25);
    }

    .center-controls media-play-button {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      --media-control-padding: 0;
      width: 40px;
    }

    [breakpointsm] .center-controls media-play-button {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      transition: background 0.4s;
      padding: 24px;
      --media-control-background: #000;
      --media-control-hover-background: var(--_accent-color);
    }

    .center-controls media-seek-backward-button,
    .center-controls media-seek-forward-button {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      padding: 0;
      margin: 0 20px;
      width: max(33px, min(8%, 40px));
    }

    [breakpointsm]:not([audio]) .center-controls.pre-playback {
      display: grid;
      align-items: initial;
      justify-content: initial;
      height: 100%;
      overflow: hidden;
    }

    [breakpointsm]:not([audio]) .center-controls.pre-playback media-play-button {
      place-self: var(--_pre-playback-place, center);
      grid-area: 1 / 1;
      margin: 16px;
    }

    /* Show and hide controls or pre-playback state */

    [breakpointsm]:is([mediahasplayed], :not([mediapaused])):not([audio])
      .center-controls.pre-playback
      media-play-button {
      /* Using \`forwards\` would lead to a laggy UI after the animation got in the end state */
      animation: 0.3s linear pre-play-hide;
      opacity: 0;
      pointer-events: none;
    }

    .autoplay-unmute {
      --media-control-hover-background: transparent;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 0 2px rgb(0 0 0 / 0.25)) drop-shadow(0 0 6px rgb(0 0 0 / 0.25));
    }

    .autoplay-unmute-btn {
      --media-control-height: 16px;
      border-radius: 8px;
      background: #000;
      color: var(--_primary-color);
      display: flex;
      align-items: center;
      padding: 8px 16px;
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
    }

    .autoplay-unmute-btn:hover {
      background: var(--_accent-color);
    }

    [breakpointsm] .autoplay-unmute-btn {
      --media-control-height: 30px;
      padding: 14px 24px;
      font-size: 26px;
    }

    .autoplay-unmute-btn svg {
      margin: 0 6px 0 0;
    }

    [breakpointsm] .autoplay-unmute-btn svg {
      margin: 0 10px 0 0;
    }

    media-controller:not([audio]):not([mediahasplayed]) *:is(media-control-bar, media-time-range) {
      display: none;
    }

    media-error-dialog:not([mediaerrorcode]) {
      opacity: 0;
    }

    media-loading-indicator {
      --media-loading-icon-width: 100%;
      --media-button-icon-height: auto;
      display: var(--media-control-display, var(--media-loading-indicator-display, flex));
      pointer-events: none;
      position: absolute;
      width: min(15%, 150px);
      flex-flow: row;
      align-items: center;
      justify-content: center;
    }

    /* Intentionally don't target the div for transition but the children
     of the div. Prevents messing with media-chrome's autohide feature. */
    media-loading-indicator + div * {
      transition: opacity 0.15s;
      opacity: 1;
    }

    media-loading-indicator[medialoading]:not([mediapaused]) ~ div > * {
      opacity: 0;
      transition-delay: 400ms;
    }

    media-volume-range {
      width: min(100%, 100px);
      --media-range-padding-left: 10px;
      --media-range-padding-right: 10px;
      --media-range-thumb-width: 12px;
      --media-range-thumb-height: 12px;
      --media-range-thumb-background: radial-gradient(
        circle,
        #000 0%,
        #000 25%,
        var(--_primary-color) 25%,
        var(--_primary-color)
      );
      --media-control-hover-background: none;
    }

    media-time-display {
      white-space: nowrap;
    }

    /* Generic style for explicitly disabled controls */
    media-control-bar[part~='bottom'] [disabled],
    media-control-bar[part~='bottom'] [aria-disabled='true'] {
      opacity: 60%;
      cursor: not-allowed;
    }

    media-text-display {
      --media-font-size: 16px;
      --media-control-padding: 14px;
      font-weight: 500;
    }

    media-play-button.animated *:is(g, path) {
      transition: all 0.3s;
    }

    media-play-button.animated[mediapaused] .pause-icon-pt1 {
      opacity: 0;
    }

    media-play-button.animated[mediapaused] .pause-icon-pt2 {
      transform-origin: center center;
      transform: scaleY(0);
    }

    media-play-button.animated[mediapaused] .play-icon {
      clip-path: inset(0 0 0 0);
    }

    media-play-button.animated:not([mediapaused]) .play-icon {
      clip-path: inset(0 0 0 100%);
    }

    media-seek-forward-button,
    media-seek-backward-button {
      --media-font-weight: 400;
    }

    .mute-icon {
      display: inline-block;
    }

    .mute-icon :is(path, g) {
      transition: opacity 0.5s;
    }

    .muted {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='low'] :is(.volume-medium, .volume-high),
    media-mute-button[mediavolumelevel='medium'] :is(.volume-high) {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='off'] .unmuted {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='off'] .muted {
      opacity: 1;
    }

    /**
     * Our defaults for these buttons are to hide them at small sizes
     * users can override this with CSS
     */
    media-controller:not([breakpointsm]):not([audio]) {
      --bottom-play-button: none;
      --bottom-seek-backward-button: none;
      --bottom-seek-forward-button: none;
      --bottom-time-display: none;
      --bottom-playback-rate-menu-button: none;
      --bottom-pip-button: none;
    }

    [part='mux-badge'] {
      position: absolute;
      bottom: 10px;
      right: 10px;
      z-index: 2;
      opacity: 0.6;
      transition:
        opacity 0.2s ease-in-out,
        bottom 0.2s ease-in-out;
    }

    [part='mux-badge']:hover {
      opacity: 1;
    }

    [part='mux-badge'] a {
      font-size: 14px;
      font-family: var(--_font-family);
      color: var(--_primary-color);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    [part='mux-badge'] .mux-badge-text {
      transition: opacity 0.5s ease-in-out;
      opacity: 0;
    }

    [part='mux-badge'] .mux-badge-logo {
      width: 40px;
      height: auto;
      display: inline-block;
    }

    [part='mux-badge'] .mux-badge-logo svg {
      width: 100%;
      height: 100%;
      fill: white;
    }

    media-controller:not([userinactive]):not([mediahasplayed]) [part='mux-badge'],
    media-controller:not([userinactive]) [part='mux-badge'],
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] {
      transition: bottom 0.1s ease-in-out;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] {
      transition: bottom 0.2s ease-in-out 0.62s;
    }

    media-controller:not([userinactive]) [part='mux-badge'] .mux-badge-text,
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] .mux-badge-text {
      opacity: 1;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] .mux-badge-text {
      opacity: 0;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] {
      bottom: 10px;
    }

    media-controller:not([userinactive]):not([mediahasplayed]) [part='mux-badge'] {
      bottom: 10px;
    }

    media-controller:not([userinactive])[mediahasplayed] [part='mux-badge'],
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] {
      bottom: calc(28px + var(--media-control-height, 0px) + var(--media-control-padding, 0px) * 2);
    }
  </style>

  <template partial="TitleDisplay">
    <template if="videotitle">
      <template if="videotitle != true">
        <media-text-display part="top title display" class="title-display">{{videotitle}}</media-text-display>
      </template>
    </template>
    <template if="!videotitle">
      <template if="title">
        <media-text-display part="top title display" class="title-display">{{title}}</media-text-display>
      </template>
    </template>
  </template>

  <template partial="PlayButton">
    <media-play-button
      part="{{section ?? 'bottom'}} play button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      class="animated"
    >
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="icon">
        <g class="play-icon">
          <path
            d="M15.5987 6.2911L3.45577 0.110898C2.83667 -0.204202 2.06287 0.189698 2.06287 0.819798V13.1802C2.06287 13.8103 2.83667 14.2042 3.45577 13.8891L15.5987 7.7089C16.2178 7.3938 16.2178 6.6061 15.5987 6.2911Z"
          />
        </g>
        <g class="pause-icon">
          <path
            class="pause-icon-pt1"
            d="M5.90709 0H2.96889C2.46857 0 2.06299 0.405585 2.06299 0.9059V13.0941C2.06299 13.5944 2.46857 14 2.96889 14H5.90709C6.4074 14 6.81299 13.5944 6.81299 13.0941V0.9059C6.81299 0.405585 6.4074 0 5.90709 0Z"
          />
          <path
            class="pause-icon-pt2"
            d="M15.1571 0H12.2189C11.7186 0 11.313 0.405585 11.313 0.9059V13.0941C11.313 13.5944 11.7186 14 12.2189 14H15.1571C15.6574 14 16.063 13.5944 16.063 13.0941V0.9059C16.063 0.405585 15.6574 0 15.1571 0Z"
          />
        </g>
      </svg>
    </media-play-button>
  </template>

  <template partial="PrePlayButton">
    <media-play-button
      part="{{section ?? 'center'}} play button pre-play"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="icon" style="transform: translate(3px, 0)">
        <path
          d="M15.5987 6.2911L3.45577 0.110898C2.83667 -0.204202 2.06287 0.189698 2.06287 0.819798V13.1802C2.06287 13.8103 2.83667 14.2042 3.45577 13.8891L15.5987 7.7089C16.2178 7.3938 16.2178 6.6061 15.5987 6.2911Z"
        />
      </svg>
    </media-play-button>
  </template>

  <template partial="SeekBackwardButton">
    <media-seek-backward-button
      seekoffset="{{backwardseekoffset}}"
      part="{{section ?? 'bottom'}} seek-backward button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg viewBox="0 0 22 14" aria-hidden="true" slot="icon">
        <path
          d="M3.65 2.07888L0.0864 6.7279C-0.0288 6.87812 -0.0288 7.12188 0.0864 7.2721L3.65 11.9211C3.7792 12.0896 4 11.9703 4 11.7321V2.26787C4 2.02968 3.7792 1.9104 3.65 2.07888Z"
        />
        <text transform="translate(6 12)" style="font-size: 14px; font-family: 'ArialMT', 'Arial'">
          {{backwardseekoffset}}
        </text>
      </svg>
    </media-seek-backward-button>
  </template>

  <template partial="SeekForwardButton">
    <media-seek-forward-button
      seekoffset="{{forwardseekoffset}}"
      part="{{section ?? 'bottom'}} seek-forward button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg viewBox="0 0 22 14" aria-hidden="true" slot="icon">
        <g>
          <text transform="translate(-1 12)" style="font-size: 14px; font-family: 'ArialMT', 'Arial'">
            {{forwardseekoffset}}
          </text>
          <path
            d="M18.35 11.9211L21.9136 7.2721C22.0288 7.12188 22.0288 6.87812 21.9136 6.7279L18.35 2.07888C18.2208 1.91041 18 2.02968 18 2.26787V11.7321C18 11.9703 18.2208 12.0896 18.35 11.9211Z"
          />
        </g>
      </svg>
    </media-seek-forward-button>
  </template>

  <template partial="MuteButton">
    <media-mute-button part="bottom mute button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" slot="icon" class="mute-icon" aria-hidden="true">
        <g class="unmuted">
          <path
            d="M6.76786 1.21233L3.98606 3.98924H1.19937C0.593146 3.98924 0.101743 4.51375 0.101743 5.1607V6.96412L0 6.99998L0.101743 7.03583V8.83926C0.101743 9.48633 0.593146 10.0108 1.19937 10.0108H3.98606L6.76773 12.7877C7.23561 13.2547 8 12.9007 8 12.2171V1.78301C8 1.09925 7.23574 0.745258 6.76786 1.21233Z"
          />
          <path
            class="volume-low"
            d="M10 3.54781C10.7452 4.55141 11.1393 5.74511 11.1393 6.99991C11.1393 8.25471 10.7453 9.44791 10 10.4515L10.7988 11.0496C11.6734 9.87201 12.1356 8.47161 12.1356 6.99991C12.1356 5.52821 11.6735 4.12731 10.7988 2.94971L10 3.54781Z"
          />
          <path
            class="volume-medium"
            d="M12.3778 2.40086C13.2709 3.76756 13.7428 5.35806 13.7428 7.00026C13.7428 8.64246 13.2709 10.233 12.3778 11.5992L13.2106 12.1484C14.2107 10.6185 14.739 8.83796 14.739 7.00016C14.739 5.16236 14.2107 3.38236 13.2106 1.85156L12.3778 2.40086Z"
          />
          <path
            class="volume-high"
            d="M15.5981 0.75L14.7478 1.2719C15.7937 2.9919 16.3468 4.9723 16.3468 7C16.3468 9.0277 15.7937 11.0082 14.7478 12.7281L15.5981 13.25C16.7398 11.3722 17.343 9.211 17.343 7C17.343 4.789 16.7398 2.6268 15.5981 0.75Z"
          />
        </g>
        <g class="muted">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.39976 4.98924H1.19937C1.19429 4.98924 1.17777 4.98961 1.15296 5.01609C1.1271 5.04369 1.10174 5.09245 1.10174 5.1607V8.83926C1.10174 8.90761 1.12714 8.95641 1.15299 8.984C1.17779 9.01047 1.1943 9.01084 1.19937 9.01084H4.39977L7 11.6066V2.39357L4.39976 4.98924ZM7.47434 1.92006C7.4743 1.9201 7.47439 1.92002 7.47434 1.92006V1.92006ZM6.76773 12.7877L3.98606 10.0108H1.19937C0.593146 10.0108 0.101743 9.48633 0.101743 8.83926V7.03583L0 6.99998L0.101743 6.96412V5.1607C0.101743 4.51375 0.593146 3.98924 1.19937 3.98924H3.98606L6.76786 1.21233C7.23574 0.745258 8 1.09925 8 1.78301V12.2171C8 12.9007 7.23561 13.2547 6.76773 12.7877Z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.2677 9.30323C15.463 9.49849 15.7796 9.49849 15.9749 9.30323C16.1701 9.10796 16.1701 8.79138 15.9749 8.59612L14.2071 6.82841L15.9749 5.06066C16.1702 4.8654 16.1702 4.54882 15.9749 4.35355C15.7796 4.15829 15.4631 4.15829 15.2678 4.35355L13.5 6.1213L11.7322 4.35348C11.537 4.15822 11.2204 4.15822 11.0251 4.35348C10.8298 4.54874 10.8298 4.86532 11.0251 5.06058L12.7929 6.82841L11.0251 8.59619C10.8299 8.79146 10.8299 9.10804 11.0251 9.3033C11.2204 9.49856 11.537 9.49856 11.7323 9.3033L13.5 7.53552L15.2677 9.30323Z"
          />
        </g>
      </svg>
    </media-mute-button>
  </template>

  <template partial="PipButton">
    <media-pip-button part="bottom pip button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="icon">
        <path
          d="M15.9891 0H2.011C0.9004 0 0 0.9003 0 2.0109V11.989C0 13.0996 0.9004 14 2.011 14H15.9891C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.9891 0ZM17 11.9891C17 12.5465 16.5465 13 15.9891 13H2.011C1.4536 13 1.0001 12.5465 1.0001 11.9891V2.0109C1.0001 1.4535 1.4536 0.9999 2.011 0.9999H15.9891C16.5465 0.9999 17 1.4535 17 2.0109V11.9891Z"
        />
        <path
          d="M15.356 5.67822H8.19523C8.03253 5.67822 7.90063 5.81012 7.90063 5.97282V11.3836C7.90063 11.5463 8.03253 11.6782 8.19523 11.6782H15.356C15.5187 11.6782 15.6506 11.5463 15.6506 11.3836V5.97282C15.6506 5.81012 15.5187 5.67822 15.356 5.67822Z"
        />
      </svg>
    </media-pip-button>
  </template>

  <template partial="CaptionsMenu">
    <media-captions-menu-button part="bottom captions button">
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="on">
        <path
          d="M15.989 0H2.011C0.9004 0 0 0.9003 0 2.0109V11.9891C0 13.0997 0.9004 14 2.011 14H15.989C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.989 0ZM4.2292 8.7639C4.5954 9.1902 5.0935 9.4031 5.7233 9.4031C6.1852 9.4031 6.5544 9.301 6.8302 9.0969C7.1061 8.8933 7.2863 8.614 7.3702 8.26H8.4322C8.3062 8.884 8.0093 9.3733 7.5411 9.7273C7.0733 10.0813 6.4703 10.2581 5.732 10.2581C5.108 10.2581 4.5699 10.1219 4.1168 9.8489C3.6637 9.5759 3.3141 9.1946 3.0685 8.7058C2.8224 8.2165 2.6994 7.6511 2.6994 7.009C2.6994 6.3611 2.8224 5.7927 3.0685 5.3034C3.3141 4.8146 3.6637 4.4323 4.1168 4.1559C4.5699 3.88 5.108 3.7418 5.732 3.7418C6.4703 3.7418 7.0733 3.922 7.5411 4.2818C8.0094 4.6422 8.3062 5.1461 8.4322 5.794H7.3702C7.2862 5.4283 7.106 5.1368 6.8302 4.921C6.5544 4.7052 6.1852 4.5968 5.7233 4.5968C5.0934 4.5968 4.5954 4.8116 4.2292 5.2404C3.8635 5.6696 3.6804 6.259 3.6804 7.009C3.6804 7.7531 3.8635 8.3381 4.2292 8.7639ZM11.0974 8.7639C11.4636 9.1902 11.9617 9.4031 12.5915 9.4031C13.0534 9.4031 13.4226 9.301 13.6984 9.0969C13.9743 8.8933 14.1545 8.614 14.2384 8.26H15.3004C15.1744 8.884 14.8775 9.3733 14.4093 9.7273C13.9415 10.0813 13.3385 10.2581 12.6002 10.2581C11.9762 10.2581 11.4381 10.1219 10.985 9.8489C10.5319 9.5759 10.1823 9.1946 9.9367 8.7058C9.6906 8.2165 9.5676 7.6511 9.5676 7.009C9.5676 6.3611 9.6906 5.7927 9.9367 5.3034C10.1823 4.8146 10.5319 4.4323 10.985 4.1559C11.4381 3.88 11.9762 3.7418 12.6002 3.7418C13.3385 3.7418 13.9415 3.922 14.4093 4.2818C14.8776 4.6422 15.1744 5.1461 15.3004 5.794H14.2384C14.1544 5.4283 13.9742 5.1368 13.6984 4.921C13.4226 4.7052 13.0534 4.5968 12.5915 4.5968C11.9616 4.5968 11.4636 4.8116 11.0974 5.2404C10.7317 5.6696 10.5486 6.259 10.5486 7.009C10.5486 7.7531 10.7317 8.3381 11.0974 8.7639Z"
        />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="off">
        <path
          d="M5.73219 10.258C5.10819 10.258 4.57009 10.1218 4.11699 9.8488C3.66389 9.5758 3.31429 9.1945 3.06869 8.7057C2.82259 8.2164 2.69958 7.651 2.69958 7.0089C2.69958 6.361 2.82259 5.7926 3.06869 5.3033C3.31429 4.8145 3.66389 4.4322 4.11699 4.1558C4.57009 3.8799 5.10819 3.7417 5.73219 3.7417C6.47049 3.7417 7.07348 3.9219 7.54128 4.2817C8.00958 4.6421 8.30638 5.146 8.43238 5.7939H7.37039C7.28639 5.4282 7.10618 5.1367 6.83039 4.9209C6.55459 4.7051 6.18538 4.5967 5.72348 4.5967C5.09358 4.5967 4.59559 4.8115 4.22939 5.2403C3.86369 5.6695 3.68058 6.2589 3.68058 7.0089C3.68058 7.753 3.86369 8.338 4.22939 8.7638C4.59559 9.1901 5.09368 9.403 5.72348 9.403C6.18538 9.403 6.55459 9.3009 6.83039 9.0968C7.10629 8.8932 7.28649 8.6139 7.37039 8.2599H8.43238C8.30638 8.8839 8.00948 9.3732 7.54128 9.7272C7.07348 10.0812 6.47049 10.258 5.73219 10.258Z"
        />
        <path
          d="M12.6003 10.258C11.9763 10.258 11.4382 10.1218 10.9851 9.8488C10.532 9.5758 10.1824 9.1945 9.93685 8.7057C9.69075 8.2164 9.56775 7.651 9.56775 7.0089C9.56775 6.361 9.69075 5.7926 9.93685 5.3033C10.1824 4.8145 10.532 4.4322 10.9851 4.1558C11.4382 3.8799 11.9763 3.7417 12.6003 3.7417C13.3386 3.7417 13.9416 3.9219 14.4094 4.2817C14.8777 4.6421 15.1745 5.146 15.3005 5.7939H14.2385C14.1545 5.4282 13.9743 5.1367 13.6985 4.9209C13.4227 4.7051 13.0535 4.5967 12.5916 4.5967C11.9617 4.5967 11.4637 4.8115 11.0975 5.2403C10.7318 5.6695 10.5487 6.2589 10.5487 7.0089C10.5487 7.753 10.7318 8.338 11.0975 8.7638C11.4637 9.1901 11.9618 9.403 12.5916 9.403C13.0535 9.403 13.4227 9.3009 13.6985 9.0968C13.9744 8.8932 14.1546 8.6139 14.2385 8.2599H15.3005C15.1745 8.8839 14.8776 9.3732 14.4094 9.7272C13.9416 10.0812 13.3386 10.258 12.6003 10.258Z"
        />
        <path
          d="M15.9891 1C16.5465 1 17 1.4535 17 2.011V11.9891C17 12.5465 16.5465 13 15.9891 13H2.0109C1.4535 13 1 12.5465 1 11.9891V2.0109C1 1.4535 1.4535 0.9999 2.0109 0.9999L15.9891 1ZM15.9891 0H2.0109C0.9003 0 0 0.9003 0 2.0109V11.9891C0 13.0997 0.9003 14 2.0109 14H15.9891C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.9891 0Z"
        />
      </svg>
    </media-captions-menu-button>
    <media-captions-menu
      hidden
      anchor="auto"
      part="bottom captions menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      exportparts="menu-item"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            display: none;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg></div
    ></media-captions-menu>
  </template>

  <template partial="AirplayButton">
    <media-airplay-button part="bottom airplay button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="icon">
        <path
          d="M16.1383 0H1.8618C0.8335 0 0 0.8335 0 1.8617V10.1382C0 11.1664 0.8335 12 1.8618 12H3.076C3.1204 11.9433 3.1503 11.8785 3.2012 11.826L4.004 11H1.8618C1.3866 11 1 10.6134 1 10.1382V1.8617C1 1.3865 1.3866 0.9999 1.8618 0.9999H16.1383C16.6135 0.9999 17.0001 1.3865 17.0001 1.8617V10.1382C17.0001 10.6134 16.6135 11 16.1383 11H13.9961L14.7989 11.826C14.8499 11.8785 14.8798 11.9432 14.9241 12H16.1383C17.1665 12 18.0001 11.1664 18.0001 10.1382V1.8617C18 0.8335 17.1665 0 16.1383 0Z"
        />
        <path
          d="M9.55061 8.21903C9.39981 8.06383 9.20001 7.98633 9.00011 7.98633C8.80021 7.98633 8.60031 8.06383 8.44951 8.21903L4.09771 12.697C3.62471 13.1838 3.96961 13.9998 4.64831 13.9998H13.3518C14.0304 13.9998 14.3754 13.1838 13.9023 12.697L9.55061 8.21903Z"
        />
      </svg>
    </media-airplay-button>
  </template>

  <template partial="FullscreenButton">
    <media-fullscreen-button part="bottom fullscreen button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="enter">
        <path
          d="M1.00745 4.39539L1.01445 1.98789C1.01605 1.43049 1.47085 0.978289 2.02835 0.979989L6.39375 0.992589L6.39665 -0.007411L2.03125 -0.020011C0.920646 -0.023211 0.0176463 0.874489 0.0144463 1.98509L0.00744629 4.39539H1.00745Z"
        />
        <path
          d="M17.0144 2.03431L17.0076 4.39541H18.0076L18.0144 2.03721C18.0176 0.926712 17.1199 0.0237125 16.0093 0.0205125L11.6439 0.0078125L11.641 1.00781L16.0064 1.02041C16.5638 1.02201 17.016 1.47681 17.0144 2.03431Z"
        />
        <path
          d="M16.9925 9.60498L16.9855 12.0124C16.9839 12.5698 16.5291 13.022 15.9717 13.0204L11.6063 13.0078L11.6034 14.0078L15.9688 14.0204C17.0794 14.0236 17.9823 13.1259 17.9855 12.0153L17.9925 9.60498H16.9925Z"
        />
        <path
          d="M0.985626 11.9661L0.992426 9.60498H-0.0074737L-0.0142737 11.9632C-0.0174737 13.0738 0.880226 13.9767 1.99083 13.98L6.35623 13.9926L6.35913 12.9926L1.99373 12.98C1.43633 12.9784 0.983926 12.5236 0.985626 11.9661Z"
        />
      </svg>
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="exit">
        <path
          d="M5.39655 -0.0200195L5.38955 2.38748C5.38795 2.94488 4.93315 3.39708 4.37565 3.39538L0.0103463 3.38278L0.00744629 4.38278L4.37285 4.39538C5.48345 4.39858 6.38635 3.50088 6.38965 2.39028L6.39665 -0.0200195H5.39655Z"
        />
        <path
          d="M12.6411 2.36891L12.6479 0.0078125H11.6479L11.6411 2.36601C11.6379 3.47651 12.5356 4.37951 13.6462 4.38271L18.0116 4.39531L18.0145 3.39531L13.6491 3.38271C13.0917 3.38111 12.6395 2.92641 12.6411 2.36891Z"
        />
        <path
          d="M12.6034 14.0204L12.6104 11.613C12.612 11.0556 13.0668 10.6034 13.6242 10.605L17.9896 10.6176L17.9925 9.61759L13.6271 9.60499C12.5165 9.60179 11.6136 10.4995 11.6104 11.6101L11.6034 14.0204H12.6034Z"
        />
        <path
          d="M5.359 11.6315L5.3522 13.9926H6.3522L6.359 11.6344C6.3622 10.5238 5.4645 9.62088 4.3539 9.61758L-0.0115043 9.60498L-0.0144043 10.605L4.351 10.6176C4.9084 10.6192 5.3607 11.074 5.359 11.6315Z"
        />
      </svg>
    </media-fullscreen-button>
  </template>

  <template partial="CastButton">
    <media-cast-button part="bottom cast button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="enter">
        <path
          d="M16.0072 0H2.0291C0.9185 0 0.0181 0.9003 0.0181 2.011V5.5009C0.357 5.5016 0.6895 5.5275 1.0181 5.5669V2.011C1.0181 1.4536 1.4716 1 2.029 1H16.0072C16.5646 1 17.0181 1.4536 17.0181 2.011V11.9891C17.0181 12.5465 16.5646 13 16.0072 13H8.4358C8.4746 13.3286 8.4999 13.6611 8.4999 13.9999H16.0071C17.1177 13.9999 18.018 13.0996 18.018 11.989V2.011C18.0181 0.9003 17.1178 0 16.0072 0ZM0 6.4999V7.4999C3.584 7.4999 6.5 10.4159 6.5 13.9999H7.5C7.5 9.8642 4.1357 6.4999 0 6.4999ZM0 8.7499V9.7499C2.3433 9.7499 4.25 11.6566 4.25 13.9999H5.25C5.25 11.1049 2.895 8.7499 0 8.7499ZM0.0181 11V14H3.0181C3.0181 12.3431 1.675 11 0.0181 11Z"
        />
      </svg>
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="exit">
        <path
          d="M15.9891 0H2.01103C0.900434 0 3.35947e-05 0.9003 3.35947e-05 2.011V5.5009C0.338934 5.5016 0.671434 5.5275 1.00003 5.5669V2.011C1.00003 1.4536 1.45353 1 2.01093 1H15.9891C16.5465 1 17 1.4536 17 2.011V11.9891C17 12.5465 16.5465 13 15.9891 13H8.41773C8.45653 13.3286 8.48183 13.6611 8.48183 13.9999H15.989C17.0996 13.9999 17.9999 13.0996 17.9999 11.989V2.011C18 0.9003 17.0997 0 15.9891 0ZM-0.0180664 6.4999V7.4999C3.56593 7.4999 6.48193 10.4159 6.48193 13.9999H7.48193C7.48193 9.8642 4.11763 6.4999 -0.0180664 6.4999ZM-0.0180664 8.7499V9.7499C2.32523 9.7499 4.23193 11.6566 4.23193 13.9999H5.23193C5.23193 11.1049 2.87693 8.7499 -0.0180664 8.7499ZM3.35947e-05 11V14H3.00003C3.00003 12.3431 1.65693 11 3.35947e-05 11Z"
        />
        <path d="M2.15002 5.634C5.18352 6.4207 7.57252 8.8151 8.35282 11.8499H15.8501V2.1499H2.15002V5.634Z" />
      </svg>
    </media-cast-button>
  </template>

  <template partial="LiveButton">
    <media-live-button part="{{section ?? 'top'}} live button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <span slot="text">Live</span>
    </media-live-button>
  </template>

  <template partial="PlaybackRateMenu">
    <media-playback-rate-menu-button part="bottom playback-rate button"></media-playback-rate-menu-button>
    <media-playback-rate-menu
      hidden
      anchor="auto"
      rates="{{playbackrates}}"
      exportparts="menu-item"
      part="bottom playback-rate menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-playback-rate-menu>
  </template>

  <template partial="VolumeRange">
    <media-volume-range
      part="bottom volume range"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-volume-range>
  </template>

  <template partial="TimeDisplay">
    <media-time-display
      remaining="{{defaultshowremainingtime}}"
      showduration="{{!hideduration}}"
      part="bottom time display"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-time-display>
  </template>

  <template partial="TimeRange">
    <media-time-range part="bottom time range" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <media-preview-thumbnail slot="preview"></media-preview-thumbnail>
      <media-preview-chapter-display slot="preview"></media-preview-chapter-display>
      <media-preview-time-display slot="preview"></media-preview-time-display>
      <div slot="preview" part="arrow"></div>
    </media-time-range>
  </template>

  <template partial="AudioTrackMenu">
    <media-audio-track-menu-button part="bottom audio-track button">
      <svg aria-hidden="true" slot="icon" viewBox="0 0 18 16">
        <path d="M9 15A7 7 0 1 1 9 1a7 7 0 0 1 0 14Zm0 1A8 8 0 1 0 9 0a8 8 0 0 0 0 16Z" />
        <path
          d="M5.2 6.3a.5.5 0 0 1 .5.5v2.4a.5.5 0 1 1-1 0V6.8a.5.5 0 0 1 .5-.5Zm2.4-2.4a.5.5 0 0 1 .5.5v7.2a.5.5 0 0 1-1 0V4.4a.5.5 0 0 1 .5-.5ZM10 5.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.4-.8a.5.5 0 0 1 .5.5v5.6a.5.5 0 0 1-1 0V5.2a.5.5 0 0 1 .5-.5Z"
        />
      </svg>
    </media-audio-track-menu-button>
    <media-audio-track-menu
      hidden
      anchor="auto"
      part="bottom audio-track menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      exportparts="menu-item"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            display: none;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </media-audio-track-menu>
  </template>

  <template partial="RenditionMenu">
    <media-rendition-menu-button part="bottom rendition button">
      <svg aria-hidden="true" slot="icon" viewBox="0 0 18 14">
        <path
          d="M2.25 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM9 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6.75 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        />
      </svg>
    </media-rendition-menu-button>
    <media-rendition-menu
      hidden
      anchor="auto"
      part="bottom rendition menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            opacity: 0;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </media-rendition-menu>
  </template>

  <template partial="MuxBadge">
    <div part="mux-badge">
      <a href="https://www.mux.com/player" target="_blank">
        <span class="mux-badge-text">Powered by</span>
        <div class="mux-badge-logo">
          <svg
            viewBox="0 0 1600 500"
            style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 2"
          >
            <g>
              <path
                d="M994.287,93.486c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m0,-93.486c-34.509,-0 -62.484,27.976 -62.484,62.486l0,187.511c0,68.943 -56.09,125.033 -125.032,125.033c-68.942,-0 -125.03,-56.09 -125.03,-125.033l0,-187.511c0,-34.51 -27.976,-62.486 -62.485,-62.486c-34.509,-0 -62.484,27.976 -62.484,62.486l0,187.511c0,137.853 112.149,250.003 249.999,250.003c137.851,-0 250.001,-112.15 250.001,-250.003l0,-187.511c0,-34.51 -27.976,-62.486 -62.485,-62.486"
                style="fill-rule: nonzero"
              ></path>
              <path
                d="M1537.51,468.511c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m-275.883,-218.509l-143.33,143.329c-24.402,24.402 -24.402,63.966 0,88.368c24.402,24.402 63.967,24.402 88.369,-0l143.33,-143.329l143.328,143.329c24.402,24.4 63.967,24.402 88.369,-0c24.403,-24.402 24.403,-63.966 0.001,-88.368l-143.33,-143.329l0.001,-0.004l143.329,-143.329c24.402,-24.402 24.402,-63.965 0,-88.367c-24.402,-24.402 -63.967,-24.402 -88.369,-0l-143.329,143.328l-143.329,-143.328c-24.402,-24.401 -63.967,-24.402 -88.369,-0c-24.402,24.402 -24.402,63.965 0,88.367l143.329,143.329l0,0.004Z"
                style="fill-rule: nonzero"
              ></path>
              <path
                d="M437.511,468.521c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m23.915,-463.762c-23.348,-9.672 -50.226,-4.327 -68.096,13.544l-143.331,143.329l-143.33,-143.329c-17.871,-17.871 -44.747,-23.216 -68.096,-13.544c-23.349,9.671 -38.574,32.455 -38.574,57.729l0,375.026c0,34.51 27.977,62.486 62.487,62.486c34.51,-0 62.486,-27.976 62.486,-62.486l0,-224.173l80.843,80.844c24.404,24.402 63.965,24.402 88.369,-0l80.843,-80.844l0,224.173c0,34.51 27.976,62.486 62.486,62.486c34.51,-0 62.486,-27.976 62.486,-62.486l0,-375.026c0,-25.274 -15.224,-48.058 -38.573,-57.729"
                style="fill-rule: nonzero"
              ></path>
            </g>
          </svg>
        </div>
      </a>
    </div>
  </template>

  <media-controller
    part="controller"
    defaultstreamtype="{{defaultstreamtype ?? 'on-demand'}}"
    breakpoints="sm:470"
    gesturesdisabled="{{disabled}}"
    hotkeys="{{hotkeys}}"
    nohotkeys="{{nohotkeys}}"
    novolumepref="{{novolumepref}}"
    audio="{{audio}}"
    noautoseektolive="{{noautoseektolive}}"
    defaultsubtitles="{{defaultsubtitles}}"
    defaultduration="{{defaultduration ?? false}}"
    keyboardforwardseekoffset="{{forwardseekoffset}}"
    keyboardbackwardseekoffset="{{backwardseekoffset}}"
    exportparts="layer, media-layer, poster-layer, vertical-layer, centered-layer, gesture-layer"
    style="--_pre-playback-place:{{preplaybackplace ?? 'center'}}"
  >
    <slot name="media" slot="media"></slot>
    <slot name="poster" slot="poster"></slot>

    <media-loading-indicator slot="centered-chrome" noautohide></media-loading-indicator>
    <media-error-dialog slot="dialog" noautohide></media-error-dialog>

    <template if="!audio">
      <!-- Pre-playback UI -->
      <!-- same for both on-demand and live -->
      <div slot="centered-chrome" class="center-controls pre-playback">
        <template if="!breakpointsm">{{>PlayButton section="center"}}</template>
        <template if="breakpointsm">{{>PrePlayButton section="center"}}</template>
      </div>

      <!-- Mux Badge -->
      <template if="proudlydisplaymuxbadge"> {{>MuxBadge}} </template>

      <!-- Autoplay centered unmute button -->
      <!--
        todo: figure out how show this with available state variables
        needs to show when:
        - autoplay is enabled
        - playback has been successful
        - audio is muted
        - in place / instead of the pre-plaback play button
        - not to show again after user has interacted with this button
          - OR user has interacted with the mute button in the control bar
      -->
      <!--
        There should be a >MuteButton to the left of the "Unmute" text, but a templating bug
        makes it appear even if commented out in the markup, add it back when code is un-commented
      -->
      <!-- <div slot="centered-chrome" class="autoplay-unmute">
        <div role="button" class="autoplay-unmute-btn">Unmute</div>
      </div> -->

      <template if="streamtype == 'on-demand'">
        <template if="breakpointsm">
          <media-control-bar part="control-bar top" slot="top-chrome">{{>TitleDisplay}} </media-control-bar>
        </template>
        {{>TimeRange}}
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}} {{>SeekBackwardButton}} {{>SeekForwardButton}} {{>TimeDisplay}} {{>MuteButton}}
          {{>VolumeRange}}
          <div class="spacer"></div>
          {{>RenditionMenu}} {{>PlaybackRateMenu}} {{>AudioTrackMenu}} {{>CaptionsMenu}} {{>AirplayButton}}
          {{>CastButton}} {{>PipButton}} {{>FullscreenButton}}
        </media-control-bar>
      </template>

      <template if="streamtype == 'live'">
        <media-control-bar part="control-bar top" slot="top-chrome">
          {{>LiveButton}}
          <template if="breakpointsm"> {{>TitleDisplay}} </template>
        </media-control-bar>
        <template if="targetlivewindow > 0">{{>TimeRange}}</template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}}
          <template if="targetlivewindow > 0">{{>SeekBackwardButton}} {{>SeekForwardButton}}</template>
          {{>MuteButton}} {{>VolumeRange}}
          <div class="spacer"></div>
          {{>RenditionMenu}} {{>AudioTrackMenu}} {{>CaptionsMenu}} {{>AirplayButton}} {{>CastButton}} {{>PipButton}}
          {{>FullscreenButton}}
        </media-control-bar>
      </template>
    </template>

    <template if="audio">
      <template if="streamtype == 'on-demand'">
        <template if="title">
          <media-control-bar part="control-bar top">{{>TitleDisplay}}</media-control-bar>
        </template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}}
          <template if="breakpointsm"> {{>SeekBackwardButton}} {{>SeekForwardButton}} </template>
          {{>MuteButton}}
          <template if="breakpointsm">{{>VolumeRange}}</template>
          {{>TimeDisplay}} {{>TimeRange}}
          <template if="breakpointsm">{{>PlaybackRateMenu}}</template>
          {{>AirplayButton}} {{>CastButton}}
        </media-control-bar>
      </template>

      <template if="streamtype == 'live'">
        <template if="title">
          <media-control-bar part="control-bar top">{{>TitleDisplay}}</media-control-bar>
        </template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}} {{>LiveButton section="bottom"}} {{>MuteButton}}
          <template if="breakpointsm">
            {{>VolumeRange}}
            <template if="targetlivewindow > 0"> {{>SeekBackwardButton}} {{>SeekForwardButton}} </template>
          </template>
          <template if="targetlivewindow > 0"> {{>TimeDisplay}} {{>TimeRange}} </template>
          <template if="!targetlivewindow"><div class="spacer"></div></template>
          {{>AirplayButton}} {{>CastButton}}
        </media-control-bar>
      </template>
    </template>

    <slot></slot>
  </media-controller>
</template>
`;
var xe2 = Y4.createElement("template");
"innerHTML" in xe2 && (xe2.innerHTML = vt3);
var Tt3;
var Et3;
var me2 = class extends MediaThemeElement {
};
me2.template = (Et3 = (Tt3 = xe2.content) == null ? void 0 : Tt3.children) == null ? void 0 : Et3[0];
k3.customElements.get("media-theme-gerwig") || k3.customElements.define("media-theme-gerwig", me2);
var fa2 = "gerwig";
var M2 = { SRC: "src", POSTER: "poster" };
var o2 = { STYLE: "style", DEFAULT_HIDDEN_CAPTIONS: "default-hidden-captions", PRIMARY_COLOR: "primary-color", SECONDARY_COLOR: "secondary-color", ACCENT_COLOR: "accent-color", FORWARD_SEEK_OFFSET: "forward-seek-offset", BACKWARD_SEEK_OFFSET: "backward-seek-offset", PLAYBACK_TOKEN: "playback-token", THUMBNAIL_TOKEN: "thumbnail-token", STORYBOARD_TOKEN: "storyboard-token", DRM_TOKEN: "drm-token", STORYBOARD_SRC: "storyboard-src", THUMBNAIL_TIME: "thumbnail-time", AUDIO: "audio", NOHOTKEYS: "nohotkeys", HOTKEYS: "hotkeys", PLAYBACK_RATES: "playbackrates", DEFAULT_SHOW_REMAINING_TIME: "default-show-remaining-time", DEFAULT_DURATION: "default-duration", TITLE: "title", VIDEO_TITLE: "video-title", PLACEHOLDER: "placeholder", THEME: "theme", DEFAULT_STREAM_TYPE: "default-stream-type", TARGET_LIVE_WINDOW: "target-live-window", EXTRA_SOURCE_PARAMS: "extra-source-params", NO_VOLUME_PREF: "no-volume-pref", CAST_RECEIVER: "cast-receiver", NO_TOOLTIPS: "no-tooltips", PROUDLY_DISPLAY_MUX_BADGE: "proudly-display-mux-badge" };
var Se3 = ["audio", "backwardseekoffset", "defaultduration", "defaultshowremainingtime", "defaultsubtitles", "noautoseektolive", "disabled", "exportparts", "forwardseekoffset", "hideduration", "hotkeys", "nohotkeys", "playbackrates", "defaultstreamtype", "streamtype", "style", "targetlivewindow", "template", "title", "videotitle", "novolumepref", "proudlydisplaymuxbadge"];
function ya2(t3, a3) {
  var i2, r12;
  return { src: !t3.playbackId && t3.src, playbackId: t3.playbackId, hasSrc: !!t3.playbackId || !!t3.src || !!t3.currentSrc, poster: t3.poster, storyboard: t3.storyboard, storyboardSrc: t3.getAttribute(o2.STORYBOARD_SRC), placeholder: t3.getAttribute("placeholder"), themeTemplate: Ta2(t3), thumbnailTime: !t3.tokens.thumbnail && t3.thumbnailTime, autoplay: t3.autoplay, crossOrigin: t3.crossOrigin, loop: t3.loop, noHotKeys: t3.hasAttribute(o2.NOHOTKEYS), hotKeys: t3.getAttribute(o2.HOTKEYS), muted: t3.muted, paused: t3.paused, preload: t3.preload, envKey: t3.envKey, preferCmcd: t3.preferCmcd, debug: t3.debug, disableTracking: t3.disableTracking, disableCookies: t3.disableCookies, tokens: t3.tokens, beaconCollectionDomain: t3.beaconCollectionDomain, maxResolution: t3.maxResolution, minResolution: t3.minResolution, programStartTime: t3.programStartTime, programEndTime: t3.programEndTime, assetStartTime: t3.assetStartTime, assetEndTime: t3.assetEndTime, renditionOrder: t3.renditionOrder, metadata: t3.metadata, playerInitTime: t3.playerInitTime, playerSoftwareName: t3.playerSoftwareName, playerSoftwareVersion: t3.playerSoftwareVersion, startTime: t3.startTime, preferPlayback: t3.preferPlayback, audio: t3.audio, defaultStreamType: t3.defaultStreamType, targetLiveWindow: t3.getAttribute(e.TARGET_LIVE_WINDOW), streamType: z2(t3.getAttribute(e.STREAM_TYPE)), primaryColor: t3.getAttribute(o2.PRIMARY_COLOR), secondaryColor: t3.getAttribute(o2.SECONDARY_COLOR), accentColor: t3.getAttribute(o2.ACCENT_COLOR), forwardSeekOffset: t3.forwardSeekOffset, backwardSeekOffset: t3.backwardSeekOffset, defaultHiddenCaptions: t3.defaultHiddenCaptions, defaultDuration: t3.defaultDuration, defaultShowRemainingTime: t3.defaultShowRemainingTime, hideDuration: Ea2(t3), playbackRates: t3.getAttribute(o2.PLAYBACK_RATES), customDomain: (i2 = t3.getAttribute(e.CUSTOM_DOMAIN)) != null ? i2 : void 0, title: t3.getAttribute(o2.TITLE), videoTitle: (r12 = t3.getAttribute(o2.VIDEO_TITLE)) != null ? r12 : t3.getAttribute(o2.TITLE), novolumepref: t3.hasAttribute(o2.NO_VOLUME_PREF), proudlyDisplayMuxBadge: t3.hasAttribute(o2.PROUDLY_DISPLAY_MUX_BADGE), castReceiver: t3.castReceiver, ...a3, extraSourceParams: t3.extraSourceParams };
}
var va2 = media_error_dialog_default.formatErrorMessage;
media_error_dialog_default.formatErrorMessage = (t3) => {
  var a3, e2;
  if (t3 instanceof f) {
    let i2 = yt2(t3, false);
    return `
      ${i2 != null && i2.title ? `<h3>${i2.title}</h3>` : ""}
      ${i2 != null && i2.message || i2 != null && i2.linkUrl ? `<p>
        ${i2 == null ? void 0 : i2.message}
        ${i2 != null && i2.linkUrl ? `<a
              href="${i2.linkUrl}"
              target="_blank"
              rel="external noopener"
              aria-label="${(a3 = i2.linkText) != null ? a3 : ""} ${x("(opens in a new window)")}"
              >${(e2 = i2.linkText) != null ? e2 : i2.linkUrl}</a
            >` : ""}
      </p>` : ""}
    `;
  }
  return va2(t3);
};
function Ta2(t3) {
  var e2, i2;
  let a3 = t3.theme;
  if (a3) {
    let r12 = (i2 = (e2 = t3.getRootNode()) == null ? void 0 : e2.getElementById) == null ? void 0 : i2.call(e2, a3);
    if (r12 && r12 instanceof HTMLTemplateElement) return r12;
    a3.startsWith("media-theme-") || (a3 = `media-theme-${a3}`);
    let n3 = k3.customElements.get(a3);
    if (n3 != null && n3.template) return n3.template;
  }
}
function Ea2(t3) {
  var e2;
  let a3 = (e2 = t3.mediaController) == null ? void 0 : e2.querySelector("media-time-display");
  return a3 && getComputedStyle(a3).getPropertyValue("--media-duration-display-display").trim() === "none";
}
function _t3(t3) {
  let a3 = t3.videoTitle ? { video_title: t3.videoTitle } : {};
  return t3.getAttributeNames().filter((e2) => e2.startsWith("metadata-")).reduce((e2, i2) => {
    let r12 = t3.getAttribute(i2);
    return r12 !== null && (e2[i2.replace(/^metadata-/, "").replace(/-/g, "_")] = r12), e2;
  }, a3);
}
var Aa2 = Object.values(e);
var Ca = Object.values(M2);
var ka2 = Object.values(o2);
var Rt3 = se3();
var xt3 = "mux-player";
var Ot3 = { isDialogOpen: false };
var _a3 = { redundant_streams: true };
var J3;
var ee3;
var te3;
var I2;
var ae2;
var H3;
var m3;
var w2;
var Mt3;
var we2;
var B4;
var St3;
var Nt3;
var wt3;
var It3;
var Ne3 = class extends Ce3 {
  constructor() {
    super();
    T2(this, m3);
    T2(this, J3);
    T2(this, ee3, false);
    T2(this, te3, {});
    T2(this, I2, true);
    T2(this, ae2, new ne3(this, "hotkeys"));
    T2(this, H3, { ...Ot3, onCloseErrorDialog: (e2) => {
      var r12;
      ((r12 = e2.composedPath()[0]) == null ? void 0 : r12.localName) === "media-error-dialog" && p3(this, m3, we2).call(this, { isDialogOpen: false });
    }, onFocusInErrorDialog: (e2) => {
      var n3;
      if (((n3 = e2.composedPath()[0]) == null ? void 0 : n3.localName) !== "media-error-dialog") return;
      ve3(this, Y4.activeElement) || e2.preventDefault();
    } });
    C5(this, J3, Wr2()), this.attachShadow({ mode: "open" }), p3(this, m3, Mt3).call(this), this.isConnected && p3(this, m3, w2).call(this);
  }
  static get NAME() {
    return xt3;
  }
  static get VERSION() {
    return Rt3;
  }
  static get observedAttributes() {
    var e2;
    return [...(e2 = Ce3.observedAttributes) != null ? e2 : [], ...Ca, ...Aa2, ...ka2];
  }
  get mediaTheme() {
    var e2;
    return (e2 = this.shadowRoot) == null ? void 0 : e2.querySelector("media-theme");
  }
  get mediaController() {
    var e2, i2;
    return (i2 = (e2 = this.mediaTheme) == null ? void 0 : e2.shadowRoot) == null ? void 0 : i2.querySelector("media-controller");
  }
  connectedCallback() {
    let e2 = this.media;
    e2 && (e2.metadata = _t3(this));
  }
  attributeChangedCallback(e2, i2, r12) {
    switch (p3(this, m3, w2).call(this), super.attributeChangedCallback(e2, i2, r12), e2) {
      case o2.HOTKEYS:
        u3(this, ae2).value = r12;
        break;
      case o2.THUMBNAIL_TIME: {
        r12 != null && this.tokens.thumbnail && x4(x("Use of thumbnail-time with thumbnail-token is currently unsupported. Ignore thumbnail-time.").toString());
        break;
      }
      case o2.THUMBNAIL_TOKEN: {
        if (r12) {
          let d4 = ee2(r12);
          if (d4) {
            let { aud: l4 } = d4, b4 = se2.THUMBNAIL;
            l4 !== b4 && x4(x("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({ aud: l4, expectedAud: b4, tokenNamePrefix: "thumbnail" }));
          }
        }
        break;
      }
      case o2.STORYBOARD_TOKEN: {
        if (r12) {
          let d4 = ee2(r12);
          if (d4) {
            let { aud: l4 } = d4, b4 = se2.STORYBOARD;
            l4 !== b4 && x4(x("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({ aud: l4, expectedAud: b4, tokenNamePrefix: "storyboard" }));
          }
        }
        break;
      }
      case o2.DRM_TOKEN: {
        if (r12) {
          let d4 = ee2(r12);
          if (d4) {
            let { aud: l4 } = d4, b4 = se2.DRM;
            l4 !== b4 && x4(x("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({ aud: l4, expectedAud: b4, tokenNamePrefix: "drm" }));
          }
        }
        break;
      }
      case e.PLAYBACK_ID: {
        r12 != null && r12.includes("?token") && E(x("The specificed playback ID {playbackId} contains a token which must be provided via the playback-token attribute.").format({ playbackId: r12 }));
        break;
      }
      case e.STREAM_TYPE:
        r12 && ![_.LIVE, _.ON_DEMAND, _.UNKNOWN].includes(r12) ? ["ll-live", "live:dvr", "ll-live:dvr"].includes(this.streamType) ? this.targetLiveWindow = r12.includes("dvr") ? Number.POSITIVE_INFINITY : 0 : Ee2({ file: "invalid-stream-type.md", message: x("Invalid stream-type value supplied: `{streamType}`. Please provide stream-type as either: `on-demand` or `live`").format({ streamType: this.streamType }) }) : r12 === _.LIVE ? this.getAttribute(o2.TARGET_LIVE_WINDOW) == null && (this.targetLiveWindow = 0) : this.targetLiveWindow = Number.NaN;
    }
    [e.PLAYBACK_ID, M2.SRC, o2.PLAYBACK_TOKEN].includes(e2) && i2 !== r12 && C5(this, H3, { ...u3(this, H3), ...Ot3 }), p3(this, m3, B4).call(this, { [ot3(e2)]: r12 });
  }
  async requestFullscreen(e2) {
    var i2;
    if (!(!this.mediaController || this.mediaController.hasAttribute(MediaUIAttributes.MEDIA_IS_FULLSCREEN))) return (i2 = this.mediaController) == null || i2.dispatchEvent(new k3.CustomEvent(MediaUIEvents.MEDIA_ENTER_FULLSCREEN_REQUEST, { composed: true, bubbles: true })), new Promise((r12, n3) => {
      var d4;
      (d4 = this.mediaController) == null || d4.addEventListener(MediaStateChangeEvents.MEDIA_IS_FULLSCREEN, () => r12(), { once: true });
    });
  }
  async exitFullscreen() {
    var e2;
    if (!(!this.mediaController || !this.mediaController.hasAttribute(MediaUIAttributes.MEDIA_IS_FULLSCREEN))) return (e2 = this.mediaController) == null || e2.dispatchEvent(new k3.CustomEvent(MediaUIEvents.MEDIA_EXIT_FULLSCREEN_REQUEST, { composed: true, bubbles: true })), new Promise((i2, r12) => {
      var n3;
      (n3 = this.mediaController) == null || n3.addEventListener(MediaStateChangeEvents.MEDIA_IS_FULLSCREEN, () => i2(), { once: true });
    });
  }
  get preferCmcd() {
    var e2;
    return (e2 = this.getAttribute(e.PREFER_CMCD)) != null ? e2 : void 0;
  }
  set preferCmcd(e2) {
    e2 !== this.preferCmcd && (e2 ? jt2.includes(e2) ? this.setAttribute(e.PREFER_CMCD, e2) : x4(`Invalid value for preferCmcd. Must be one of ${jt2.join()}`) : this.removeAttribute(e.PREFER_CMCD));
  }
  get hasPlayed() {
    var e2, i2;
    return (i2 = (e2 = this.mediaController) == null ? void 0 : e2.hasAttribute(MediaUIAttributes.MEDIA_HAS_PLAYED)) != null ? i2 : false;
  }
  get inLiveWindow() {
    var e2;
    return (e2 = this.mediaController) == null ? void 0 : e2.hasAttribute(MediaUIAttributes.MEDIA_TIME_IS_LIVE);
  }
  get _hls() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2._hls;
  }
  get mux() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2.mux;
  }
  get theme() {
    var e2;
    return (e2 = this.getAttribute(o2.THEME)) != null ? e2 : fa2;
  }
  set theme(e2) {
    this.setAttribute(o2.THEME, `${e2}`);
  }
  get themeProps() {
    let e2 = this.mediaTheme;
    if (!e2) return;
    let i2 = {};
    for (let r12 of e2.getAttributeNames()) {
      if (Se3.includes(r12)) continue;
      let n3 = e2.getAttribute(r12);
      i2[oe2(r12)] = n3 === "" ? true : n3;
    }
    return i2;
  }
  set themeProps(e2) {
    var r12, n3;
    p3(this, m3, w2).call(this);
    let i2 = { ...this.themeProps, ...e2 };
    for (let d4 in i2) {
      if (Se3.includes(d4)) continue;
      let l4 = e2 == null ? void 0 : e2[d4];
      typeof l4 == "boolean" || l4 == null ? (r12 = this.mediaTheme) == null || r12.toggleAttribute(re3(d4), !!l4) : (n3 = this.mediaTheme) == null || n3.setAttribute(re3(d4), l4);
    }
  }
  get playbackId() {
    var e2;
    return (e2 = this.getAttribute(e.PLAYBACK_ID)) != null ? e2 : void 0;
  }
  set playbackId(e2) {
    e2 ? this.setAttribute(e.PLAYBACK_ID, e2) : this.removeAttribute(e.PLAYBACK_ID);
  }
  get src() {
    var e2, i2;
    return this.playbackId ? (e2 = U3(this, M2.SRC)) != null ? e2 : void 0 : (i2 = this.getAttribute(M2.SRC)) != null ? i2 : void 0;
  }
  set src(e2) {
    e2 ? this.setAttribute(M2.SRC, e2) : this.removeAttribute(M2.SRC);
  }
  get poster() {
    var r12;
    let e2 = this.getAttribute(M2.POSTER);
    if (e2 != null) return e2;
    let { tokens: i2 } = this;
    if (i2.playback && !i2.thumbnail) {
      x4("Missing expected thumbnail token. No poster image will be shown");
      return;
    }
    if (this.playbackId && !this.audio) return it2(this.playbackId, { customDomain: this.customDomain, thumbnailTime: (r12 = this.thumbnailTime) != null ? r12 : this.startTime, programTime: this.programStartTime, token: i2.thumbnail });
  }
  set poster(e2) {
    e2 || e2 === "" ? this.setAttribute(M2.POSTER, e2) : this.removeAttribute(M2.POSTER);
  }
  get storyboardSrc() {
    var e2;
    return (e2 = this.getAttribute(o2.STORYBOARD_SRC)) != null ? e2 : void 0;
  }
  set storyboardSrc(e2) {
    e2 ? this.setAttribute(o2.STORYBOARD_SRC, e2) : this.removeAttribute(o2.STORYBOARD_SRC);
  }
  get storyboard() {
    let { tokens: e2 } = this;
    if (this.storyboardSrc && !e2.storyboard) return this.storyboardSrc;
    if (!(this.audio || !this.playbackId || !this.streamType || [_.LIVE, _.UNKNOWN].includes(this.streamType) || e2.playback && !e2.storyboard)) return rt3(this.playbackId, { customDomain: this.customDomain, token: e2.storyboard, programStartTime: this.programStartTime, programEndTime: this.programEndTime });
  }
  get audio() {
    return this.hasAttribute(o2.AUDIO);
  }
  set audio(e2) {
    if (!e2) {
      this.removeAttribute(o2.AUDIO);
      return;
    }
    this.setAttribute(o2.AUDIO, "");
  }
  get hotkeys() {
    return u3(this, ae2);
  }
  get nohotkeys() {
    return this.hasAttribute(o2.NOHOTKEYS);
  }
  set nohotkeys(e2) {
    if (!e2) {
      this.removeAttribute(o2.NOHOTKEYS);
      return;
    }
    this.setAttribute(o2.NOHOTKEYS, "");
  }
  get thumbnailTime() {
    return y3(this.getAttribute(o2.THUMBNAIL_TIME));
  }
  set thumbnailTime(e2) {
    this.setAttribute(o2.THUMBNAIL_TIME, `${e2}`);
  }
  get videoTitle() {
    var e2, i2;
    return (i2 = (e2 = this.getAttribute(o2.VIDEO_TITLE)) != null ? e2 : this.getAttribute(o2.TITLE)) != null ? i2 : "";
  }
  set videoTitle(e2) {
    e2 !== this.videoTitle && (e2 ? this.setAttribute(o2.VIDEO_TITLE, e2) : this.removeAttribute(o2.VIDEO_TITLE));
  }
  get placeholder() {
    var e2;
    return (e2 = U3(this, o2.PLACEHOLDER)) != null ? e2 : "";
  }
  set placeholder(e2) {
    this.setAttribute(o2.PLACEHOLDER, `${e2}`);
  }
  get primaryColor() {
    var i2, r12;
    let e2 = this.getAttribute(o2.PRIMARY_COLOR);
    if (e2 != null || this.mediaTheme && (e2 = (r12 = (i2 = k3.getComputedStyle(this.mediaTheme)) == null ? void 0 : i2.getPropertyValue("--_primary-color")) == null ? void 0 : r12.trim(), e2)) return e2;
  }
  set primaryColor(e2) {
    this.setAttribute(o2.PRIMARY_COLOR, `${e2}`);
  }
  get secondaryColor() {
    var i2, r12;
    let e2 = this.getAttribute(o2.SECONDARY_COLOR);
    if (e2 != null || this.mediaTheme && (e2 = (r12 = (i2 = k3.getComputedStyle(this.mediaTheme)) == null ? void 0 : i2.getPropertyValue("--_secondary-color")) == null ? void 0 : r12.trim(), e2)) return e2;
  }
  set secondaryColor(e2) {
    this.setAttribute(o2.SECONDARY_COLOR, `${e2}`);
  }
  get accentColor() {
    var i2, r12;
    let e2 = this.getAttribute(o2.ACCENT_COLOR);
    if (e2 != null || this.mediaTheme && (e2 = (r12 = (i2 = k3.getComputedStyle(this.mediaTheme)) == null ? void 0 : i2.getPropertyValue("--_accent-color")) == null ? void 0 : r12.trim(), e2)) return e2;
  }
  set accentColor(e2) {
    this.setAttribute(o2.ACCENT_COLOR, `${e2}`);
  }
  get defaultShowRemainingTime() {
    return this.hasAttribute(o2.DEFAULT_SHOW_REMAINING_TIME);
  }
  set defaultShowRemainingTime(e2) {
    e2 ? this.setAttribute(o2.DEFAULT_SHOW_REMAINING_TIME, "") : this.removeAttribute(o2.DEFAULT_SHOW_REMAINING_TIME);
  }
  get playbackRates() {
    if (this.hasAttribute(o2.PLAYBACK_RATES)) return this.getAttribute(o2.PLAYBACK_RATES).trim().split(/\s*,?\s+/).map((e2) => Number(e2)).filter((e2) => !Number.isNaN(e2)).sort((e2, i2) => e2 - i2);
  }
  set playbackRates(e2) {
    if (!e2) {
      this.removeAttribute(o2.PLAYBACK_RATES);
      return;
    }
    this.setAttribute(o2.PLAYBACK_RATES, e2.join(" "));
  }
  get forwardSeekOffset() {
    var e2;
    return (e2 = y3(this.getAttribute(o2.FORWARD_SEEK_OFFSET))) != null ? e2 : 10;
  }
  set forwardSeekOffset(e2) {
    this.setAttribute(o2.FORWARD_SEEK_OFFSET, `${e2}`);
  }
  get backwardSeekOffset() {
    var e2;
    return (e2 = y3(this.getAttribute(o2.BACKWARD_SEEK_OFFSET))) != null ? e2 : 10;
  }
  set backwardSeekOffset(e2) {
    this.setAttribute(o2.BACKWARD_SEEK_OFFSET, `${e2}`);
  }
  get defaultHiddenCaptions() {
    return this.hasAttribute(o2.DEFAULT_HIDDEN_CAPTIONS);
  }
  set defaultHiddenCaptions(e2) {
    e2 ? this.setAttribute(o2.DEFAULT_HIDDEN_CAPTIONS, "") : this.removeAttribute(o2.DEFAULT_HIDDEN_CAPTIONS);
  }
  get defaultDuration() {
    return y3(this.getAttribute(o2.DEFAULT_DURATION));
  }
  set defaultDuration(e2) {
    e2 == null ? this.removeAttribute(o2.DEFAULT_DURATION) : this.setAttribute(o2.DEFAULT_DURATION, `${e2}`);
  }
  get playerInitTime() {
    return this.hasAttribute(e.PLAYER_INIT_TIME) ? y3(this.getAttribute(e.PLAYER_INIT_TIME)) : u3(this, J3);
  }
  set playerInitTime(e2) {
    e2 != this.playerInitTime && (e2 == null ? this.removeAttribute(e.PLAYER_INIT_TIME) : this.setAttribute(e.PLAYER_INIT_TIME, `${+e2}`));
  }
  get playerSoftwareName() {
    var e2;
    return (e2 = this.getAttribute(e.PLAYER_SOFTWARE_NAME)) != null ? e2 : xt3;
  }
  get playerSoftwareVersion() {
    var e2;
    return (e2 = this.getAttribute(e.PLAYER_SOFTWARE_VERSION)) != null ? e2 : Rt3;
  }
  get beaconCollectionDomain() {
    var e2;
    return (e2 = this.getAttribute(e.BEACON_COLLECTION_DOMAIN)) != null ? e2 : void 0;
  }
  set beaconCollectionDomain(e2) {
    e2 !== this.beaconCollectionDomain && (e2 ? this.setAttribute(e.BEACON_COLLECTION_DOMAIN, e2) : this.removeAttribute(e.BEACON_COLLECTION_DOMAIN));
  }
  get maxResolution() {
    var e2;
    return (e2 = this.getAttribute(e.MAX_RESOLUTION)) != null ? e2 : void 0;
  }
  set maxResolution(e2) {
    e2 !== this.maxResolution && (e2 ? this.setAttribute(e.MAX_RESOLUTION, e2) : this.removeAttribute(e.MAX_RESOLUTION));
  }
  get minResolution() {
    var e2;
    return (e2 = this.getAttribute(e.MIN_RESOLUTION)) != null ? e2 : void 0;
  }
  set minResolution(e2) {
    e2 !== this.minResolution && (e2 ? this.setAttribute(e.MIN_RESOLUTION, e2) : this.removeAttribute(e.MIN_RESOLUTION));
  }
  get renditionOrder() {
    var e2;
    return (e2 = this.getAttribute(e.RENDITION_ORDER)) != null ? e2 : void 0;
  }
  set renditionOrder(e2) {
    e2 !== this.renditionOrder && (e2 ? this.setAttribute(e.RENDITION_ORDER, e2) : this.removeAttribute(e.RENDITION_ORDER));
  }
  get programStartTime() {
    return y3(this.getAttribute(e.PROGRAM_START_TIME));
  }
  set programStartTime(e2) {
    e2 == null ? this.removeAttribute(e.PROGRAM_START_TIME) : this.setAttribute(e.PROGRAM_START_TIME, `${e2}`);
  }
  get programEndTime() {
    return y3(this.getAttribute(e.PROGRAM_END_TIME));
  }
  set programEndTime(e2) {
    e2 == null ? this.removeAttribute(e.PROGRAM_END_TIME) : this.setAttribute(e.PROGRAM_END_TIME, `${e2}`);
  }
  get assetStartTime() {
    return y3(this.getAttribute(e.ASSET_START_TIME));
  }
  set assetStartTime(e2) {
    e2 == null ? this.removeAttribute(e.ASSET_START_TIME) : this.setAttribute(e.ASSET_START_TIME, `${e2}`);
  }
  get assetEndTime() {
    return y3(this.getAttribute(e.ASSET_END_TIME));
  }
  set assetEndTime(e2) {
    e2 == null ? this.removeAttribute(e.ASSET_END_TIME) : this.setAttribute(e.ASSET_END_TIME, `${e2}`);
  }
  get extraSourceParams() {
    return this.hasAttribute(o2.EXTRA_SOURCE_PARAMS) ? [...new URLSearchParams(this.getAttribute(o2.EXTRA_SOURCE_PARAMS)).entries()].reduce((e2, [i2, r12]) => (e2[i2] = r12, e2), {}) : _a3;
  }
  set extraSourceParams(e2) {
    e2 == null ? this.removeAttribute(o2.EXTRA_SOURCE_PARAMS) : this.setAttribute(o2.EXTRA_SOURCE_PARAMS, new URLSearchParams(e2).toString());
  }
  get customDomain() {
    var e2;
    return (e2 = this.getAttribute(e.CUSTOM_DOMAIN)) != null ? e2 : void 0;
  }
  set customDomain(e2) {
    e2 !== this.customDomain && (e2 ? this.setAttribute(e.CUSTOM_DOMAIN, e2) : this.removeAttribute(e.CUSTOM_DOMAIN));
  }
  get envKey() {
    var e2;
    return (e2 = U3(this, e.ENV_KEY)) != null ? e2 : void 0;
  }
  set envKey(e2) {
    this.setAttribute(e.ENV_KEY, `${e2}`);
  }
  get noVolumePref() {
    return this.hasAttribute(o2.NO_VOLUME_PREF);
  }
  set noVolumePref(e2) {
    e2 ? this.setAttribute(o2.NO_VOLUME_PREF, "") : this.removeAttribute(o2.NO_VOLUME_PREF);
  }
  get debug() {
    return U3(this, e.DEBUG) != null;
  }
  set debug(e2) {
    e2 ? this.setAttribute(e.DEBUG, "") : this.removeAttribute(e.DEBUG);
  }
  get disableTracking() {
    return U3(this, e.DISABLE_TRACKING) != null;
  }
  set disableTracking(e2) {
    this.toggleAttribute(e.DISABLE_TRACKING, !!e2);
  }
  get disableCookies() {
    return U3(this, e.DISABLE_COOKIES) != null;
  }
  set disableCookies(e2) {
    e2 ? this.setAttribute(e.DISABLE_COOKIES, "") : this.removeAttribute(e.DISABLE_COOKIES);
  }
  get streamType() {
    var e2, i2, r12;
    return (r12 = (i2 = this.getAttribute(e.STREAM_TYPE)) != null ? i2 : (e2 = this.media) == null ? void 0 : e2.streamType) != null ? r12 : _.UNKNOWN;
  }
  set streamType(e2) {
    this.setAttribute(e.STREAM_TYPE, `${e2}`);
  }
  get defaultStreamType() {
    var e2, i2, r12;
    return (r12 = (i2 = this.getAttribute(o2.DEFAULT_STREAM_TYPE)) != null ? i2 : (e2 = this.mediaController) == null ? void 0 : e2.getAttribute(o2.DEFAULT_STREAM_TYPE)) != null ? r12 : _.ON_DEMAND;
  }
  set defaultStreamType(e2) {
    e2 ? this.setAttribute(o2.DEFAULT_STREAM_TYPE, e2) : this.removeAttribute(o2.DEFAULT_STREAM_TYPE);
  }
  get targetLiveWindow() {
    var e2, i2;
    return this.hasAttribute(o2.TARGET_LIVE_WINDOW) ? +this.getAttribute(o2.TARGET_LIVE_WINDOW) : (i2 = (e2 = this.media) == null ? void 0 : e2.targetLiveWindow) != null ? i2 : Number.NaN;
  }
  set targetLiveWindow(e2) {
    e2 == this.targetLiveWindow || Number.isNaN(e2) && Number.isNaN(this.targetLiveWindow) || (e2 == null ? this.removeAttribute(o2.TARGET_LIVE_WINDOW) : this.setAttribute(o2.TARGET_LIVE_WINDOW, `${+e2}`));
  }
  get liveEdgeStart() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2.liveEdgeStart;
  }
  get startTime() {
    return y3(U3(this, e.START_TIME));
  }
  set startTime(e2) {
    this.setAttribute(e.START_TIME, `${e2}`);
  }
  get preferPlayback() {
    let e2 = this.getAttribute(e.PREFER_PLAYBACK);
    if (e2 === X2.MSE || e2 === X2.NATIVE) return e2;
  }
  set preferPlayback(e2) {
    e2 !== this.preferPlayback && (e2 === X2.MSE || e2 === X2.NATIVE ? this.setAttribute(e.PREFER_PLAYBACK, e2) : this.removeAttribute(e.PREFER_PLAYBACK));
  }
  get metadata() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2.metadata;
  }
  set metadata(e2) {
    if (p3(this, m3, w2).call(this), !this.media) {
      E("underlying media element missing when trying to set metadata. metadata will not be set.");
      return;
    }
    this.media.metadata = { ..._t3(this), ...e2 };
  }
  get _hlsConfig() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2._hlsConfig;
  }
  set _hlsConfig(e2) {
    if (p3(this, m3, w2).call(this), !this.media) {
      E("underlying media element missing when trying to set _hlsConfig. _hlsConfig will not be set.");
      return;
    }
    this.media._hlsConfig = e2;
  }
  async addCuePoints(e2) {
    var i2;
    if (p3(this, m3, w2).call(this), !this.media) {
      E("underlying media element missing when trying to addCuePoints. cuePoints will not be added.");
      return;
    }
    return (i2 = this.media) == null ? void 0 : i2.addCuePoints(e2);
  }
  get activeCuePoint() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2.activeCuePoint;
  }
  get cuePoints() {
    var e2, i2;
    return (i2 = (e2 = this.media) == null ? void 0 : e2.cuePoints) != null ? i2 : [];
  }
  addChapters(e2) {
    var i2;
    if (p3(this, m3, w2).call(this), !this.media) {
      E("underlying media element missing when trying to addChapters. chapters will not be added.");
      return;
    }
    return (i2 = this.media) == null ? void 0 : i2.addChapters(e2);
  }
  get activeChapter() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2.activeChapter;
  }
  get chapters() {
    var e2, i2;
    return (i2 = (e2 = this.media) == null ? void 0 : e2.chapters) != null ? i2 : [];
  }
  getStartDate() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2.getStartDate();
  }
  get currentPdt() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2.currentPdt;
  }
  get tokens() {
    let e2 = this.getAttribute(o2.PLAYBACK_TOKEN), i2 = this.getAttribute(o2.DRM_TOKEN), r12 = this.getAttribute(o2.THUMBNAIL_TOKEN), n3 = this.getAttribute(o2.STORYBOARD_TOKEN);
    return { ...u3(this, te3), ...e2 != null ? { playback: e2 } : {}, ...i2 != null ? { drm: i2 } : {}, ...r12 != null ? { thumbnail: r12 } : {}, ...n3 != null ? { storyboard: n3 } : {} };
  }
  set tokens(e2) {
    C5(this, te3, e2 != null ? e2 : {});
  }
  get playbackToken() {
    var e2;
    return (e2 = this.getAttribute(o2.PLAYBACK_TOKEN)) != null ? e2 : void 0;
  }
  set playbackToken(e2) {
    this.setAttribute(o2.PLAYBACK_TOKEN, `${e2}`);
  }
  get drmToken() {
    var e2;
    return (e2 = this.getAttribute(o2.DRM_TOKEN)) != null ? e2 : void 0;
  }
  set drmToken(e2) {
    this.setAttribute(o2.DRM_TOKEN, `${e2}`);
  }
  get thumbnailToken() {
    var e2;
    return (e2 = this.getAttribute(o2.THUMBNAIL_TOKEN)) != null ? e2 : void 0;
  }
  set thumbnailToken(e2) {
    this.setAttribute(o2.THUMBNAIL_TOKEN, `${e2}`);
  }
  get storyboardToken() {
    var e2;
    return (e2 = this.getAttribute(o2.STORYBOARD_TOKEN)) != null ? e2 : void 0;
  }
  set storyboardToken(e2) {
    this.setAttribute(o2.STORYBOARD_TOKEN, `${e2}`);
  }
  addTextTrack(e2, i2, r12, n3) {
    var l4;
    let d4 = (l4 = this.media) == null ? void 0 : l4.nativeEl;
    if (d4) return ne2(d4, e2, i2, r12, n3);
  }
  removeTextTrack(e2) {
    var r12;
    let i2 = (r12 = this.media) == null ? void 0 : r12.nativeEl;
    if (i2) return st2(i2, e2);
  }
  get textTracks() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2.textTracks;
  }
  get castReceiver() {
    var e2;
    return (e2 = this.getAttribute(o2.CAST_RECEIVER)) != null ? e2 : void 0;
  }
  set castReceiver(e2) {
    e2 !== this.castReceiver && (e2 ? this.setAttribute(o2.CAST_RECEIVER, e2) : this.removeAttribute(o2.CAST_RECEIVER));
  }
  get castCustomData() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2.castCustomData;
  }
  set castCustomData(e2) {
    if (!this.media) {
      E("underlying media element missing when trying to set castCustomData. castCustomData will not be set.");
      return;
    }
    this.media.castCustomData = e2;
  }
  get noTooltips() {
    return this.hasAttribute(o2.NO_TOOLTIPS);
  }
  set noTooltips(e2) {
    if (!e2) {
      this.removeAttribute(o2.NO_TOOLTIPS);
      return;
    }
    this.setAttribute(o2.NO_TOOLTIPS, "");
  }
  get proudlyDisplayMuxBadge() {
    return this.hasAttribute(o2.PROUDLY_DISPLAY_MUX_BADGE);
  }
  set proudlyDisplayMuxBadge(e2) {
    e2 ? this.setAttribute(o2.PROUDLY_DISPLAY_MUX_BADGE, "") : this.removeAttribute(o2.PROUDLY_DISPLAY_MUX_BADGE);
  }
};
J3 = /* @__PURE__ */ new WeakMap(), ee3 = /* @__PURE__ */ new WeakMap(), te3 = /* @__PURE__ */ new WeakMap(), I2 = /* @__PURE__ */ new WeakMap(), ae2 = /* @__PURE__ */ new WeakMap(), H3 = /* @__PURE__ */ new WeakMap(), m3 = /* @__PURE__ */ new WeakSet(), w2 = function() {
  var e2, i2, r12, n3;
  if (!u3(this, ee3)) {
    C5(this, ee3, true), p3(this, m3, B4).call(this);
    try {
      if (customElements.upgrade(this.mediaTheme), !(this.mediaTheme instanceof k3.HTMLElement)) throw "";
    } catch {
      E("<media-theme> failed to upgrade!");
    }
    try {
      customElements.upgrade(this.media);
    } catch {
      E("underlying media element failed to upgrade!");
    }
    try {
      if (customElements.upgrade(this.mediaController), !(this.mediaController instanceof media_controller_default)) throw "";
    } catch {
      E("<media-controller> failed to upgrade!");
    }
    p3(this, m3, St3).call(this), p3(this, m3, Nt3).call(this), p3(this, m3, wt3).call(this), C5(this, I2, (i2 = (e2 = this.mediaController) == null ? void 0 : e2.hasAttribute(Attributes.USER_INACTIVE)) != null ? i2 : true), p3(this, m3, It3).call(this), (r12 = this.media) == null || r12.addEventListener("streamtypechange", () => p3(this, m3, B4).call(this)), (n3 = this.media) == null || n3.addEventListener("loadstart", () => p3(this, m3, B4).call(this));
  }
}, Mt3 = function() {
  var e2, i2;
  try {
    (e2 = window == null ? void 0 : window.CSS) == null || e2.registerProperty({ name: "--media-primary-color", syntax: "<color>", inherits: true }), (i2 = window == null ? void 0 : window.CSS) == null || i2.registerProperty({ name: "--media-secondary-color", syntax: "<color>", inherits: true });
  } catch {
  }
}, we2 = function(e2) {
  Object.assign(u3(this, H3), e2), p3(this, m3, B4).call(this);
}, B4 = function(e2 = {}) {
  ct3(bt3(ya2(this, { ...u3(this, H3), ...e2 })), this.shadowRoot);
}, St3 = function() {
  let e2 = (r12) => {
    var l4, b4;
    if (!(r12 != null && r12.startsWith("theme-"))) return;
    let n3 = r12.replace(/^theme-/, "");
    if (Se3.includes(n3)) return;
    let d4 = this.getAttribute(r12);
    d4 != null ? (l4 = this.mediaTheme) == null || l4.setAttribute(n3, d4) : (b4 = this.mediaTheme) == null || b4.removeAttribute(n3);
  };
  new MutationObserver((r12) => {
    for (let { attributeName: n3 } of r12) e2(n3);
  }).observe(this, { attributes: true }), this.getAttributeNames().forEach(e2);
}, Nt3 = function() {
  let e2 = (i2) => {
    var d4;
    let r12 = (d4 = this.media) == null ? void 0 : d4.error;
    if (!(r12 instanceof f)) {
      let { message: l4, code: b4 } = r12 != null ? r12 : {};
      r12 = new f(l4, b4);
    }
    if (!(r12 != null && r12.fatal)) {
      x4(r12), r12.data && x4(`${r12.name} data:`, r12.data);
      return;
    }
    let n3 = Re2(r12, false);
    n3.message && Ee2(n3), E(r12), r12.data && E(`${r12.name} data:`, r12.data), p3(this, m3, we2).call(this, { isDialogOpen: true });
  };
  this.addEventListener("error", e2), this.media && (this.media.errorTranslator = (i2 = {}) => {
    var n3, d4, l4;
    if (!(((n3 = this.media) == null ? void 0 : n3.error) instanceof f)) return i2;
    let r12 = Re2((d4 = this.media) == null ? void 0 : d4.error, false);
    return { player_error_code: (l4 = this.media) == null ? void 0 : l4.error.code, player_error_message: r12.message ? String(r12.message) : i2.player_error_message, player_error_context: r12.context ? String(r12.context) : i2.player_error_context };
  });
}, wt3 = function() {
  var i2, r12, n3, d4;
  let e2 = () => p3(this, m3, B4).call(this);
  (r12 = (i2 = this.media) == null ? void 0 : i2.textTracks) == null || r12.addEventListener("addtrack", e2), (d4 = (n3 = this.media) == null ? void 0 : n3.textTracks) == null || d4.addEventListener("removetrack", e2);
}, It3 = function() {
  var S3, F3;
  if (!/Firefox/i.test(navigator.userAgent)) return;
  let i2, r12 = /* @__PURE__ */ new WeakMap(), n3 = () => this.streamType === _.LIVE && !this.secondaryColor && this.offsetWidth >= 800, d4 = (_3, A4, R = false) => {
    if (n3()) return;
    Array.from(_3 && _3.activeCues || []).forEach((h3) => {
      if (!(!h3.snapToLines || h3.line < -5 || h3.line >= 0 && h3.line < 10)) if (!A4 || this.paused) {
        let ie4 = h3.text.split(`
`).length, W3 = -3;
        this.streamType === _.LIVE && (W3 = -2);
        let Z2 = W3 - ie4;
        if (h3.line === Z2 && !R) return;
        r12.has(h3) || r12.set(h3, h3.line), h3.line = Z2;
      } else setTimeout(() => {
        h3.line = r12.get(h3) || "auto";
      }, 500);
    });
  }, l4 = () => {
    var _3, A4;
    d4(i2, (A4 = (_3 = this.mediaController) == null ? void 0 : _3.hasAttribute(Attributes.USER_INACTIVE)) != null ? A4 : false);
  }, b4 = () => {
    var R, K3;
    let A4 = Array.from(((K3 = (R = this.mediaController) == null ? void 0 : R.media) == null ? void 0 : K3.textTracks) || []).filter((h3) => ["subtitles", "captions"].includes(h3.kind) && h3.mode === "showing")[0];
    A4 !== i2 && (i2 == null || i2.removeEventListener("cuechange", l4)), i2 = A4, i2 == null || i2.addEventListener("cuechange", l4), d4(i2, u3(this, I2));
  };
  b4(), (S3 = this.textTracks) == null || S3.addEventListener("change", b4), (F3 = this.textTracks) == null || F3.addEventListener("addtrack", b4), this.addEventListener("userinactivechange", () => {
    var A4, R;
    let _3 = (R = (A4 = this.mediaController) == null ? void 0 : A4.hasAttribute(Attributes.USER_INACTIVE)) != null ? R : true;
    u3(this, I2) !== _3 && (C5(this, I2, _3), d4(i2, u3(this, I2)));
  });
};
function U3(t3, a3) {
  return t3.media ? t3.media.getAttribute(a3) : t3.getAttribute(a3);
}
var Ei2 = Ne3;

// node_modules/@mux/mux-player/dist/index.mjs
var c3 = (e2) => {
  throw TypeError(e2);
};
var d2 = (e2, t3, n3) => t3.has(e2) || c3("Cannot " + n3);
var g6 = (e2, t3, n3) => (d2(e2, t3, "read from private field"), n3 ? n3.call(e2) : t3.get(e2));
var p4 = (e2, t3, n3) => t3.has(e2) ? c3("Cannot add the same private member more than once") : t3 instanceof WeakSet ? t3.add(e2) : t3.set(e2, n3);
var f4 = (e2, t3, n3, i2) => (d2(e2, t3, "write to private field"), i2 ? i2.call(e2, n3) : t3.set(e2, n3), n3);
var o3 = class {
  addEventListener() {
  }
  removeEventListener() {
  }
  dispatchEvent(t3) {
    return true;
  }
};
if (typeof DocumentFragment == "undefined") {
  class e2 extends o3 {
  }
  globalThis.DocumentFragment = e2;
}
var s2 = class extends o3 {
};
var a2 = class extends o3 {
};
var b3 = { get(e2) {
}, define(e2, t3, n3) {
}, getName(e2) {
  return null;
}, upgrade(e2) {
}, whenDefined(e2) {
  return Promise.resolve(s2);
} };
var r10;
var m4 = class {
  constructor(t3, n3 = {}) {
    p4(this, r10);
    f4(this, r10, n3 == null ? void 0 : n3.detail);
  }
  get detail() {
    return g6(this, r10);
  }
  initCustomEvent() {
  }
};
r10 = /* @__PURE__ */ new WeakMap();
function y4(e2, t3) {
  return new s2();
}
var h2 = { document: { createElement: y4 }, DocumentFragment, customElements: b3, CustomEvent: m4, EventTarget: o3, HTMLElement: s2, HTMLVideoElement: a2 };
var E2 = typeof window == "undefined" || typeof globalThis.customElements == "undefined";
var l3 = E2 ? h2 : globalThis;
var x5 = E2 ? h2.document : globalThis.document;
l3.customElements.get("mux-player") || (l3.customElements.define("mux-player", Ei2), l3.MuxPlayerElement = Ei2);

// node_modules/@mux/mux-player-react/dist/index.mjs
var import_react2 = __toESM(require_react(), 1);
var d3 = __toESM(require_react(), 1);
var import_react3 = __toESM(require_react(), 1);
var import_react4 = __toESM(require_react(), 1);
var M3 = parseInt(import_react2.default.version) >= 19;
var E3 = { className: "class", classname: "class", htmlFor: "for", crossOrigin: "crossorigin", viewBox: "viewBox", playsInline: "playsinline", autoPlay: "autoplay", playbackRate: "playbackrate" };
var B5 = (e2) => e2 == null;
var ee4 = (e2, t3) => B5(t3) ? false : e2 in t3;
var te4 = (e2) => e2.replace(/[A-Z]/g, (t3) => `-${t3.toLowerCase()}`);
var ne4 = (e2, t3) => {
  if (!(!M3 && typeof t3 == "boolean" && !t3)) {
    if (ee4(e2, E3)) return E3[e2];
    if (typeof t3 != "undefined") return /[A-Z]/.test(e2) ? te4(e2) : e2;
  }
};
var ae3 = (e2, t3) => !M3 && typeof e2 == "boolean" ? "" : e2;
var P4 = (e2 = {}) => {
  let { ref: t3, ...n3 } = e2;
  return Object.entries(n3).reduce((o4, [a3, l4]) => {
    let i2 = ne4(a3, l4);
    if (!i2) return o4;
    let c4 = ae3(l4, a3);
    return o4[i2] = c4, o4;
  }, {});
};
function x6(e2, t3) {
  if (typeof e2 == "function") return e2(t3);
  e2 != null && (e2.current = t3);
}
function re4(...e2) {
  return (t3) => {
    let n3 = false, o4 = e2.map((a3) => {
      let l4 = x6(a3, t3);
      return !n3 && typeof l4 == "function" && (n3 = true), l4;
    });
    if (n3) return () => {
      for (let a3 = 0; a3 < o4.length; a3++) {
        let l4 = o4[a3];
        typeof l4 == "function" ? l4() : x6(e2[a3], null);
      }
    };
  };
}
function f5(...e2) {
  return d3.useCallback(re4(...e2), e2);
}
var oe3 = Object.prototype.hasOwnProperty;
var ue2 = (e2, t3) => {
  if (Object.is(e2, t3)) return true;
  if (typeof e2 != "object" || e2 === null || typeof t3 != "object" || t3 === null) return false;
  if (Array.isArray(e2)) return !Array.isArray(t3) || e2.length !== t3.length ? false : e2.some((a3, l4) => t3[l4] === a3);
  let n3 = Object.keys(e2), o4 = Object.keys(t3);
  if (n3.length !== o4.length) return false;
  for (let a3 = 0; a3 < n3.length; a3++) if (!oe3.call(t3, n3[a3]) || !Object.is(e2[n3[a3]], t3[n3[a3]])) return false;
  return true;
};
var p5 = (e2, t3, n3) => !ue2(t3, e2[n3]);
var se4 = (e2, t3, n3) => {
  e2[n3] = t3;
};
var ie3 = (e2, t3, n3, o4 = se4, a3 = p5) => (0, import_react3.useEffect)(() => {
  let l4 = n3 == null ? void 0 : n3.current;
  l4 && a3(l4, t3, e2) && o4(l4, t3, e2);
}, [n3 == null ? void 0 : n3.current, t3]);
var u4 = ie3;
var ye4 = () => {
  try {
    return "3.5.1";
  } catch {
  }
  return "UNKNOWN";
};
var me3 = ye4();
var g7 = () => me3;
var r11 = (e2, t3, n3) => (0, import_react4.useEffect)(() => {
  let o4 = t3 == null ? void 0 : t3.current;
  if (!o4 || !n3) return;
  let a3 = e2, l4 = n3;
  return o4.addEventListener(a3, l4), () => {
    o4.removeEventListener(a3, l4);
  };
}, [t3 == null ? void 0 : t3.current, n3, e2]);
var Pe3 = import_react.default.forwardRef(({ children: e2, ...t3 }, n3) => import_react.default.createElement("mux-player", { suppressHydrationWarning: true, ...P4(t3), ref: n3 }, e2));
var xe3 = (e2, t3) => {
  let { onAbort: n3, onCanPlay: o4, onCanPlayThrough: a3, onEmptied: l4, onLoadStart: i2, onLoadedData: c4, onLoadedMetadata: v4, onProgress: R, onDurationChange: T3, onVolumeChange: h3, onRateChange: b4, onResize: C6, onWaiting: k4, onPlay: O4, onPlaying: S3, onTimeUpdate: w3, onPause: N3, onSeeking: L4, onSeeked: A4, onStalled: I3, onSuspend: _3, onEnded: K3, onError: H4, onCuePointChange: D4, onChapterChange: V3, metadata: W3, tokens: U4, paused: z3, playbackId: F3, playbackRates: G3, currentTime: Z2, themeProps: j4, extraSourceParams: q4, castCustomData: J4, _hlsConfig: Y5, ...$4 } = t3;
  return u4("playbackRates", G3, e2), u4("metadata", W3, e2), u4("extraSourceParams", q4, e2), u4("_hlsConfig", Y5, e2), u4("themeProps", j4, e2), u4("tokens", U4, e2), u4("playbackId", F3, e2), u4("castCustomData", J4, e2), u4("paused", z3, e2, (s3, y5) => {
    y5 != null && (y5 ? s3.pause() : s3.play());
  }, (s3, y5, Q4) => s3.hasAttribute("autoplay") && !s3.hasPlayed ? false : p5(s3, y5, Q4)), u4("currentTime", Z2, e2, (s3, y5) => {
    y5 != null && (s3.currentTime = y5);
  }), r11("abort", e2, n3), r11("canplay", e2, o4), r11("canplaythrough", e2, a3), r11("emptied", e2, l4), r11("loadstart", e2, i2), r11("loadeddata", e2, c4), r11("loadedmetadata", e2, v4), r11("progress", e2, R), r11("durationchange", e2, T3), r11("volumechange", e2, h3), r11("ratechange", e2, b4), r11("resize", e2, C6), r11("waiting", e2, k4), r11("play", e2, O4), r11("playing", e2, S3), r11("timeupdate", e2, w3), r11("pause", e2, N3), r11("seeking", e2, L4), r11("seeked", e2, A4), r11("stalled", e2, I3), r11("suspend", e2, _3), r11("ended", e2, K3), r11("error", e2, H4), r11("cuepointchange", e2, D4), r11("chapterchange", e2, V3), [$4];
};
var de4 = g7();
var fe4 = "mux-player-react";
var ge4 = import_react.default.forwardRef((e2, t3) => {
  var i2;
  let n3 = (0, import_react.useRef)(null), o4 = f5(n3, t3), [a3] = xe3(n3, e2), [l4] = (0, import_react.useState)((i2 = e2.playerInitTime) != null ? i2 : Wr2());
  return import_react.default.createElement(Pe3, { ref: o4, defaultHiddenCaptions: e2.defaultHiddenCaptions, playerSoftwareName: fe4, playerSoftwareVersion: de4, playerInitTime: l4, ...a3 });
});
var ze3 = ge4;
export {
  Gt2 as MaxResolution,
  f as MediaError,
  Xt2 as MinResolution,
  zt2 as RenditionOrder,
  ze3 as default,
  Wr2 as generatePlayerInitTime,
  fe4 as playerSoftwareName,
  de4 as playerSoftwareVersion
};
/*! Bundled license information:

mux-embed/dist/mux.mjs:
  (*!
  * JavaScript Cookie v2.1.3
  * https://github.com/js-cookie/js-cookie
  *
  * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
  * Released under the MIT license
  *)
*/
//# sourceMappingURL=dist-AQWEVF4U.js.map
