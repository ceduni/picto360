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

// node_modules/vimeo-video-element/dist/react.js
var import_react = __toESM(require_react());

// node_modules/@vimeo/player/dist/player.es.js
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function() {
    return exports;
  };
  var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
    obj[key] = desc.value;
  }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self2, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self2, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {
  }
  function GeneratorFunction() {
  }
  function GeneratorFunctionPrototype() {
  }
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function() {
    return this;
  });
  var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg, value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value2) {
          invoke("next", value2, resolve, reject);
        }, function(err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function(unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function(error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self2, context) {
    var state = "suspendedStart";
    return function(method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg; ; ) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;
        else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self2, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method, method = delegate.iterator[methodName];
    if (void 0 === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = void 0, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = void 0), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(true);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1, next = function next2() {
          for (; ++i < iterable.length; ) if (hasOwn.call(iterable, i)) return next2.value = iterable[i], next2.done = false, next2;
          return next2.value = void 0, next2.done = true, next2;
        };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: void 0,
      done: true
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: true
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: true
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function(genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function(genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function(arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self2, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self2, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
    return this;
  }), define(Gp, "toString", function() {
    return "[object Generator]";
  }), exports.keys = function(val) {
    var object = Object(val), keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length; ) {
        var key2 = keys.pop();
        if (key2 in object) return next.value = key2, next.done = false, next;
      }
      return next.done = true, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = false, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = void 0);
    },
    stop: function() {
      this.done = true;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = void 0), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i], record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName,
        nextLoc
      }, "next" === this.method && (this.arg = void 0), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance = new Constructor();
      if (Class2) _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2)) return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _possibleConstructorReturn(self2, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self2);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
var isNode = typeof global !== "undefined" && {}.toString.call(global) === "[object global]";
function getMethodName(prop, type) {
  if (prop.indexOf(type.toLowerCase()) === 0) {
    return prop;
  }
  return "".concat(type.toLowerCase()).concat(prop.substr(0, 1).toUpperCase()).concat(prop.substr(1));
}
function isDomElement(element) {
  return Boolean(element && element.nodeType === 1 && "nodeName" in element && element.ownerDocument && element.ownerDocument.defaultView);
}
function isInteger(value) {
  return !isNaN(parseFloat(value)) && isFinite(value) && Math.floor(value) == value;
}
function isVimeoUrl(url) {
  return /^(https?:)?\/\/((((player|www)\.)?vimeo\.com)|((player\.)?[a-zA-Z0-9-]+\.(videoji\.(hk|cn)|vimeo\.work)))(?=$|\/)/.test(url);
}
function isVimeoEmbed(url) {
  var expr = /^https:\/\/player\.((vimeo\.com)|([a-zA-Z0-9-]+\.(videoji\.(hk|cn)|vimeo\.work)))\/video\/\d+/;
  return expr.test(url);
}
function getOembedDomain(url) {
  var match = (url || "").match(/^(?:https?:)?(?:\/\/)?([^/?]+)/);
  var domain = (match && match[1] || "").replace("player.", "");
  var customDomains = [".videoji.hk", ".vimeo.work", ".videoji.cn"];
  for (var _i = 0, _customDomains = customDomains; _i < _customDomains.length; _i++) {
    var customDomain = _customDomains[_i];
    if (domain.endsWith(customDomain)) {
      return domain;
    }
  }
  return "vimeo.com";
}
function getVimeoUrl() {
  var oEmbedParameters2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var id = oEmbedParameters2.id;
  var url = oEmbedParameters2.url;
  var idOrUrl = id || url;
  if (!idOrUrl) {
    throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");
  }
  if (isInteger(idOrUrl)) {
    return "https://vimeo.com/".concat(idOrUrl);
  }
  if (isVimeoUrl(idOrUrl)) {
    return idOrUrl.replace("http:", "https:");
  }
  if (id) {
    throw new TypeError("“".concat(id, "” is not a valid video id."));
  }
  throw new TypeError("“".concat(idOrUrl, "” is not a vimeo.com url."));
}
var subscribe = function subscribe2(target, eventName, callback) {
  var onName = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "addEventListener";
  var offName = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : "removeEventListener";
  var eventNames = typeof eventName === "string" ? [eventName] : eventName;
  eventNames.forEach(function(evName) {
    target[onName](evName, callback);
  });
  return {
    cancel: function cancel() {
      return eventNames.forEach(function(evName) {
        return target[offName](evName, callback);
      });
    }
  };
};
var arrayIndexOfSupport = typeof Array.prototype.indexOf !== "undefined";
var postMessageSupport = typeof window !== "undefined" && typeof window.postMessage !== "undefined";
if (!isNode && (!arrayIndexOfSupport || !postMessageSupport)) {
  throw new Error("Sorry, the Vimeo Player API is not available in this browser.");
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}
(function(self2) {
  if (self2.WeakMap) {
    return;
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasDefine = Object.defineProperty && function() {
    try {
      return Object.defineProperty({}, "x", {
        value: 1
      }).x === 1;
    } catch (e) {
    }
  }();
  var defineProperty = function(object, name, value) {
    if (hasDefine) {
      Object.defineProperty(object, name, {
        configurable: true,
        writable: true,
        value
      });
    } else {
      object[name] = value;
    }
  };
  self2.WeakMap = function() {
    function WeakMap2() {
      if (this === void 0) {
        throw new TypeError("Constructor WeakMap requires 'new'");
      }
      defineProperty(this, "_id", genId("_WeakMap"));
      if (arguments.length > 0) {
        throw new TypeError("WeakMap iterable is not supported");
      }
    }
    defineProperty(WeakMap2.prototype, "delete", function(key) {
      checkInstance(this, "delete");
      if (!isObject(key)) {
        return false;
      }
      var entry = key[this._id];
      if (entry && entry[0] === key) {
        delete key[this._id];
        return true;
      }
      return false;
    });
    defineProperty(WeakMap2.prototype, "get", function(key) {
      checkInstance(this, "get");
      if (!isObject(key)) {
        return void 0;
      }
      var entry = key[this._id];
      if (entry && entry[0] === key) {
        return entry[1];
      }
      return void 0;
    });
    defineProperty(WeakMap2.prototype, "has", function(key) {
      checkInstance(this, "has");
      if (!isObject(key)) {
        return false;
      }
      var entry = key[this._id];
      if (entry && entry[0] === key) {
        return true;
      }
      return false;
    });
    defineProperty(WeakMap2.prototype, "set", function(key, value) {
      checkInstance(this, "set");
      if (!isObject(key)) {
        throw new TypeError("Invalid value used as weak map key");
      }
      var entry = key[this._id];
      if (entry && entry[0] === key) {
        entry[1] = value;
        return this;
      }
      defineProperty(key, this._id, [key, value]);
      return this;
    });
    function checkInstance(x, methodName) {
      if (!isObject(x) || !hasOwnProperty.call(x, "_id")) {
        throw new TypeError(methodName + " method called on incompatible receiver " + typeof x);
      }
    }
    function genId(prefix) {
      return prefix + "_" + rand() + "." + rand();
    }
    function rand() {
      return Math.random().toString().substring(2);
    }
    defineProperty(WeakMap2, "_polyfill", true);
    return WeakMap2;
  }();
  function isObject(x) {
    return Object(x) === x;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : commonjsGlobal);
var npo_src = createCommonjsModule(function(module) {
  (function UMD(name, context, definition) {
    context[name] = context[name] || definition();
    if (module.exports) {
      module.exports = context[name];
    }
  })("Promise", typeof commonjsGlobal != "undefined" ? commonjsGlobal : commonjsGlobal, function DEF() {
    var builtInProp, cycle, scheduling_queue, ToString = Object.prototype.toString, timer = typeof setImmediate != "undefined" ? function timer2(fn) {
      return setImmediate(fn);
    } : setTimeout;
    try {
      Object.defineProperty({}, "x", {});
      builtInProp = function builtInProp2(obj, name, val, config) {
        return Object.defineProperty(obj, name, {
          value: val,
          writable: true,
          configurable: config !== false
        });
      };
    } catch (err) {
      builtInProp = function builtInProp2(obj, name, val) {
        obj[name] = val;
        return obj;
      };
    }
    scheduling_queue = /* @__PURE__ */ function Queue() {
      var first, last, item;
      function Item(fn, self2) {
        this.fn = fn;
        this.self = self2;
        this.next = void 0;
      }
      return {
        add: function add(fn, self2) {
          item = new Item(fn, self2);
          if (last) {
            last.next = item;
          } else {
            first = item;
          }
          last = item;
          item = void 0;
        },
        drain: function drain() {
          var f = first;
          first = last = cycle = void 0;
          while (f) {
            f.fn.call(f.self);
            f = f.next;
          }
        }
      };
    }();
    function schedule(fn, self2) {
      scheduling_queue.add(fn, self2);
      if (!cycle) {
        cycle = timer(scheduling_queue.drain);
      }
    }
    function isThenable(o) {
      var _then, o_type = typeof o;
      if (o != null && (o_type == "object" || o_type == "function")) {
        _then = o.then;
      }
      return typeof _then == "function" ? _then : false;
    }
    function notify() {
      for (var i = 0; i < this.chain.length; i++) {
        notifyIsolated(this, this.state === 1 ? this.chain[i].success : this.chain[i].failure, this.chain[i]);
      }
      this.chain.length = 0;
    }
    function notifyIsolated(self2, cb, chain) {
      var ret, _then;
      try {
        if (cb === false) {
          chain.reject(self2.msg);
        } else {
          if (cb === true) {
            ret = self2.msg;
          } else {
            ret = cb.call(void 0, self2.msg);
          }
          if (ret === chain.promise) {
            chain.reject(TypeError("Promise-chain cycle"));
          } else if (_then = isThenable(ret)) {
            _then.call(ret, chain.resolve, chain.reject);
          } else {
            chain.resolve(ret);
          }
        }
      } catch (err) {
        chain.reject(err);
      }
    }
    function resolve(msg) {
      var _then, self2 = this;
      if (self2.triggered) {
        return;
      }
      self2.triggered = true;
      if (self2.def) {
        self2 = self2.def;
      }
      try {
        if (_then = isThenable(msg)) {
          schedule(function() {
            var def_wrapper = new MakeDefWrapper(self2);
            try {
              _then.call(msg, function $resolve$() {
                resolve.apply(def_wrapper, arguments);
              }, function $reject$() {
                reject.apply(def_wrapper, arguments);
              });
            } catch (err) {
              reject.call(def_wrapper, err);
            }
          });
        } else {
          self2.msg = msg;
          self2.state = 1;
          if (self2.chain.length > 0) {
            schedule(notify, self2);
          }
        }
      } catch (err) {
        reject.call(new MakeDefWrapper(self2), err);
      }
    }
    function reject(msg) {
      var self2 = this;
      if (self2.triggered) {
        return;
      }
      self2.triggered = true;
      if (self2.def) {
        self2 = self2.def;
      }
      self2.msg = msg;
      self2.state = 2;
      if (self2.chain.length > 0) {
        schedule(notify, self2);
      }
    }
    function iteratePromises(Constructor, arr, resolver, rejecter) {
      for (var idx = 0; idx < arr.length; idx++) {
        (function IIFE(idx2) {
          Constructor.resolve(arr[idx2]).then(function $resolver$(msg) {
            resolver(idx2, msg);
          }, rejecter);
        })(idx);
      }
    }
    function MakeDefWrapper(self2) {
      this.def = self2;
      this.triggered = false;
    }
    function MakeDef(self2) {
      this.promise = self2;
      this.state = 0;
      this.triggered = false;
      this.chain = [];
      this.msg = void 0;
    }
    function Promise2(executor) {
      if (typeof executor != "function") {
        throw TypeError("Not a function");
      }
      if (this.__NPO__ !== 0) {
        throw TypeError("Not a promise");
      }
      this.__NPO__ = 1;
      var def = new MakeDef(this);
      this["then"] = function then(success, failure) {
        var o = {
          success: typeof success == "function" ? success : true,
          failure: typeof failure == "function" ? failure : false
        };
        o.promise = new this.constructor(function extractChain(resolve2, reject2) {
          if (typeof resolve2 != "function" || typeof reject2 != "function") {
            throw TypeError("Not a function");
          }
          o.resolve = resolve2;
          o.reject = reject2;
        });
        def.chain.push(o);
        if (def.state !== 0) {
          schedule(notify, def);
        }
        return o.promise;
      };
      this["catch"] = function $catch$(failure) {
        return this.then(void 0, failure);
      };
      try {
        executor.call(void 0, function publicResolve(msg) {
          resolve.call(def, msg);
        }, function publicReject(msg) {
          reject.call(def, msg);
        });
      } catch (err) {
        reject.call(def, err);
      }
    }
    var PromisePrototype = builtInProp(
      {},
      "constructor",
      Promise2,
      /*configurable=*/
      false
    );
    Promise2.prototype = PromisePrototype;
    builtInProp(
      PromisePrototype,
      "__NPO__",
      0,
      /*configurable=*/
      false
    );
    builtInProp(Promise2, "resolve", function Promise$resolve(msg) {
      var Constructor = this;
      if (msg && typeof msg == "object" && msg.__NPO__ === 1) {
        return msg;
      }
      return new Constructor(function executor(resolve2, reject2) {
        if (typeof resolve2 != "function" || typeof reject2 != "function") {
          throw TypeError("Not a function");
        }
        resolve2(msg);
      });
    });
    builtInProp(Promise2, "reject", function Promise$reject(msg) {
      return new this(function executor(resolve2, reject2) {
        if (typeof resolve2 != "function" || typeof reject2 != "function") {
          throw TypeError("Not a function");
        }
        reject2(msg);
      });
    });
    builtInProp(Promise2, "all", function Promise$all(arr) {
      var Constructor = this;
      if (ToString.call(arr) != "[object Array]") {
        return Constructor.reject(TypeError("Not an array"));
      }
      if (arr.length === 0) {
        return Constructor.resolve([]);
      }
      return new Constructor(function executor(resolve2, reject2) {
        if (typeof resolve2 != "function" || typeof reject2 != "function") {
          throw TypeError("Not a function");
        }
        var len = arr.length, msgs = Array(len), count = 0;
        iteratePromises(Constructor, arr, function resolver(idx, msg) {
          msgs[idx] = msg;
          if (++count === len) {
            resolve2(msgs);
          }
        }, reject2);
      });
    });
    builtInProp(Promise2, "race", function Promise$race(arr) {
      var Constructor = this;
      if (ToString.call(arr) != "[object Array]") {
        return Constructor.reject(TypeError("Not an array"));
      }
      return new Constructor(function executor(resolve2, reject2) {
        if (typeof resolve2 != "function" || typeof reject2 != "function") {
          throw TypeError("Not a function");
        }
        iteratePromises(Constructor, arr, function resolver(idx, msg) {
          resolve2(msg);
        }, reject2);
      });
    });
    return Promise2;
  });
});
var callbackMap = /* @__PURE__ */ new WeakMap();
function storeCallback(player, name, callback) {
  var playerCallbacks = callbackMap.get(player.element) || {};
  if (!(name in playerCallbacks)) {
    playerCallbacks[name] = [];
  }
  playerCallbacks[name].push(callback);
  callbackMap.set(player.element, playerCallbacks);
}
function getCallbacks(player, name) {
  var playerCallbacks = callbackMap.get(player.element) || {};
  return playerCallbacks[name] || [];
}
function removeCallback(player, name, callback) {
  var playerCallbacks = callbackMap.get(player.element) || {};
  if (!playerCallbacks[name]) {
    return true;
  }
  if (!callback) {
    playerCallbacks[name] = [];
    callbackMap.set(player.element, playerCallbacks);
    return true;
  }
  var index = playerCallbacks[name].indexOf(callback);
  if (index !== -1) {
    playerCallbacks[name].splice(index, 1);
  }
  callbackMap.set(player.element, playerCallbacks);
  return playerCallbacks[name] && playerCallbacks[name].length === 0;
}
function shiftCallbacks(player, name) {
  var playerCallbacks = getCallbacks(player, name);
  if (playerCallbacks.length < 1) {
    return false;
  }
  var callback = playerCallbacks.shift();
  removeCallback(player, name, callback);
  return callback;
}
function swapCallbacks(oldElement, newElement) {
  var playerCallbacks = callbackMap.get(oldElement);
  callbackMap.set(newElement, playerCallbacks);
  callbackMap.delete(oldElement);
}
function parseMessageData(data) {
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch (error) {
      console.warn(error);
      return {};
    }
  }
  return data;
}
function postMessage(player, method, params) {
  if (!player.element.contentWindow || !player.element.contentWindow.postMessage) {
    return;
  }
  var message = {
    method
  };
  if (params !== void 0) {
    message.value = params;
  }
  var ieVersion = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"));
  if (ieVersion >= 8 && ieVersion < 10) {
    message = JSON.stringify(message);
  }
  player.element.contentWindow.postMessage(message, player.origin);
}
function processData(player, data) {
  data = parseMessageData(data);
  var callbacks = [];
  var param;
  if (data.event) {
    if (data.event === "error") {
      var promises = getCallbacks(player, data.data.method);
      promises.forEach(function(promise) {
        var error = new Error(data.data.message);
        error.name = data.data.name;
        promise.reject(error);
        removeCallback(player, data.data.method, promise);
      });
    }
    callbacks = getCallbacks(player, "event:".concat(data.event));
    param = data.data;
  } else if (data.method) {
    var callback = shiftCallbacks(player, data.method);
    if (callback) {
      callbacks.push(callback);
      param = data.value;
    }
  }
  callbacks.forEach(function(callback2) {
    try {
      if (typeof callback2 === "function") {
        callback2.call(player, param);
        return;
      }
      callback2.resolve(param);
    } catch (e) {
    }
  });
}
var oEmbedParameters = ["airplay", "audio_tracks", "audiotrack", "autopause", "autoplay", "background", "byline", "cc", "chapter_id", "chapters", "chromecast", "color", "colors", "controls", "dnt", "end_time", "fullscreen", "height", "id", "initial_quality", "interactive_params", "keyboard", "loop", "maxheight", "max_quality", "maxwidth", "min_quality", "muted", "play_button_position", "playsinline", "portrait", "preload", "progress_bar", "quality", "quality_selector", "responsive", "skipping_forward", "speed", "start_time", "texttrack", "thumbnail_id", "title", "transcript", "transparent", "unmute_button", "url", "vimeo_logo", "volume", "watch_full_video", "width"];
function getOEmbedParameters(element) {
  var defaults = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return oEmbedParameters.reduce(function(params, param) {
    var value = element.getAttribute("data-vimeo-".concat(param));
    if (value || value === "") {
      params[param] = value === "" ? 1 : value;
    }
    return params;
  }, defaults);
}
function createEmbed(_ref, element) {
  var html = _ref.html;
  if (!element) {
    throw new TypeError("An element must be provided");
  }
  if (element.getAttribute("data-vimeo-initialized") !== null) {
    return element.querySelector("iframe");
  }
  var div = document.createElement("div");
  div.innerHTML = html;
  element.appendChild(div.firstChild);
  element.setAttribute("data-vimeo-initialized", "true");
  return element.querySelector("iframe");
}
function getOEmbedData(videoUrl) {
  var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var element = arguments.length > 2 ? arguments[2] : void 0;
  return new Promise(function(resolve, reject) {
    if (!isVimeoUrl(videoUrl)) {
      throw new TypeError("“".concat(videoUrl, "” is not a vimeo.com url."));
    }
    var domain = getOembedDomain(videoUrl);
    var url = "https://".concat(domain, "/api/oembed.json?url=").concat(encodeURIComponent(videoUrl));
    for (var param in params) {
      if (params.hasOwnProperty(param)) {
        url += "&".concat(param, "=").concat(encodeURIComponent(params[param]));
      }
    }
    var xhr = "XDomainRequest" in window ? new XDomainRequest() : new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function() {
      if (xhr.status === 404) {
        reject(new Error("“".concat(videoUrl, "” was not found.")));
        return;
      }
      if (xhr.status === 403) {
        reject(new Error("“".concat(videoUrl, "” is not embeddable.")));
        return;
      }
      try {
        var json = JSON.parse(xhr.responseText);
        if (json.domain_status_code === 403) {
          createEmbed(json, element);
          reject(new Error("“".concat(videoUrl, "” is not embeddable.")));
          return;
        }
        resolve(json);
      } catch (error) {
        reject(error);
      }
    };
    xhr.onerror = function() {
      var status = xhr.status ? " (".concat(xhr.status, ")") : "";
      reject(new Error("There was an error fetching the embed code from Vimeo".concat(status, ".")));
    };
    xhr.send();
  });
}
function initializeEmbeds() {
  var parent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
  var elements = [].slice.call(parent.querySelectorAll("[data-vimeo-id], [data-vimeo-url]"));
  var handleError = function handleError2(error) {
    if ("console" in window && console.error) {
      console.error("There was an error creating an embed: ".concat(error));
    }
  };
  elements.forEach(function(element) {
    try {
      if (element.getAttribute("data-vimeo-defer") !== null) {
        return;
      }
      var params = getOEmbedParameters(element);
      var url = getVimeoUrl(params);
      getOEmbedData(url, params, element).then(function(data) {
        return createEmbed(data, element);
      }).catch(handleError);
    } catch (error) {
      handleError(error);
    }
  });
}
function resizeEmbeds() {
  var parent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
  if (window.VimeoPlayerResizeEmbeds_) {
    return;
  }
  window.VimeoPlayerResizeEmbeds_ = true;
  var onMessage = function onMessage2(event) {
    if (!isVimeoUrl(event.origin)) {
      return;
    }
    if (!event.data || event.data.event !== "spacechange") {
      return;
    }
    var iframes = parent.querySelectorAll("iframe");
    for (var i = 0; i < iframes.length; i++) {
      if (iframes[i].contentWindow !== event.source) {
        continue;
      }
      var space = iframes[i].parentElement;
      space.style.paddingBottom = "".concat(event.data.data[0].bottom, "px");
      break;
    }
  };
  window.addEventListener("message", onMessage);
}
function initAppendVideoMetadata() {
  var parent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
  if (window.VimeoSeoMetadataAppended) {
    return;
  }
  window.VimeoSeoMetadataAppended = true;
  var onMessage = function onMessage2(event) {
    if (!isVimeoUrl(event.origin)) {
      return;
    }
    var data = parseMessageData(event.data);
    if (!data || data.event !== "ready") {
      return;
    }
    var iframes = parent.querySelectorAll("iframe");
    for (var i = 0; i < iframes.length; i++) {
      var iframe = iframes[i];
      var isValidMessageSource = iframe.contentWindow === event.source;
      if (isVimeoEmbed(iframe.src) && isValidMessageSource) {
        var player = new Player(iframe);
        player.callMethod("appendVideoMetadata", window.location.href);
      }
    }
  };
  window.addEventListener("message", onMessage);
}
function checkUrlTimeParam() {
  var parent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
  if (window.VimeoCheckedUrlTimeParam) {
    return;
  }
  window.VimeoCheckedUrlTimeParam = true;
  var handleError = function handleError2(error) {
    if ("console" in window && console.error) {
      console.error("There was an error getting video Id: ".concat(error));
    }
  };
  var onMessage = function onMessage2(event) {
    if (!isVimeoUrl(event.origin)) {
      return;
    }
    var data = parseMessageData(event.data);
    if (!data || data.event !== "ready") {
      return;
    }
    var iframes = parent.querySelectorAll("iframe");
    var _loop = function _loop2() {
      var iframe = iframes[i];
      var isValidMessageSource = iframe.contentWindow === event.source;
      if (isVimeoEmbed(iframe.src) && isValidMessageSource) {
        var player = new Player(iframe);
        player.getVideoId().then(function(videoId) {
          var matches = new RegExp("[?&]vimeo_t_".concat(videoId, "=([^&#]*)")).exec(window.location.href);
          if (matches && matches[1]) {
            var sec = decodeURI(matches[1]);
            player.setCurrentTime(sec);
          }
          return;
        }).catch(handleError);
      }
    };
    for (var i = 0; i < iframes.length; i++) {
      _loop();
    }
  };
  window.addEventListener("message", onMessage);
}
function initializeScreenfull() {
  var fn = function() {
    var val;
    var fnMap = [
      ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
      // New WebKit
      ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
      // Old WebKit
      ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
      ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
      ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
    ];
    var i = 0;
    var l = fnMap.length;
    var ret = {};
    for (; i < l; i++) {
      val = fnMap[i];
      if (val && val[1] in document) {
        for (i = 0; i < val.length; i++) {
          ret[fnMap[0][i]] = val[i];
        }
        return ret;
      }
    }
    return false;
  }();
  var eventNameMap = {
    fullscreenchange: fn.fullscreenchange,
    fullscreenerror: fn.fullscreenerror
  };
  var screenfull2 = {
    request: function request(element) {
      return new Promise(function(resolve, reject) {
        var onFullScreenEntered = function onFullScreenEntered2() {
          screenfull2.off("fullscreenchange", onFullScreenEntered2);
          resolve();
        };
        screenfull2.on("fullscreenchange", onFullScreenEntered);
        element = element || document.documentElement;
        var returnPromise = element[fn.requestFullscreen]();
        if (returnPromise instanceof Promise) {
          returnPromise.then(onFullScreenEntered).catch(reject);
        }
      });
    },
    exit: function exit() {
      return new Promise(function(resolve, reject) {
        if (!screenfull2.isFullscreen) {
          resolve();
          return;
        }
        var onFullScreenExit = function onFullScreenExit2() {
          screenfull2.off("fullscreenchange", onFullScreenExit2);
          resolve();
        };
        screenfull2.on("fullscreenchange", onFullScreenExit);
        var returnPromise = document[fn.exitFullscreen]();
        if (returnPromise instanceof Promise) {
          returnPromise.then(onFullScreenExit).catch(reject);
        }
      });
    },
    on: function on(event, callback) {
      var eventName = eventNameMap[event];
      if (eventName) {
        document.addEventListener(eventName, callback);
      }
    },
    off: function off(event, callback) {
      var eventName = eventNameMap[event];
      if (eventName) {
        document.removeEventListener(eventName, callback);
      }
    }
  };
  Object.defineProperties(screenfull2, {
    isFullscreen: {
      get: function get() {
        return Boolean(document[fn.fullscreenElement]);
      }
    },
    element: {
      enumerable: true,
      get: function get() {
        return document[fn.fullscreenElement];
      }
    },
    isEnabled: {
      enumerable: true,
      get: function get() {
        return Boolean(document[fn.fullscreenEnabled]);
      }
    }
  });
  return screenfull2;
}
var defaultOptions = {
  role: "viewer",
  autoPlayMuted: true,
  allowedDrift: 0.3,
  maxAllowedDrift: 1,
  minCheckInterval: 0.1,
  maxRateAdjustment: 0.2,
  maxTimeToCatchUp: 1
};
var TimingSrcConnector = function(_EventTarget) {
  _inherits(TimingSrcConnector2, _EventTarget);
  var _super = _createSuper(TimingSrcConnector2);
  function TimingSrcConnector2(_player, timingObject) {
    var _this;
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var logger = arguments.length > 3 ? arguments[3] : void 0;
    _classCallCheck(this, TimingSrcConnector2);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "logger", void 0);
    _defineProperty(_assertThisInitialized(_this), "speedAdjustment", 0);
    _defineProperty(_assertThisInitialized(_this), "adjustSpeed", function() {
      var _ref = _asyncToGenerator(_regeneratorRuntime().mark(function _callee(player, newAdjustment) {
        var newPlaybackRate;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(_this.speedAdjustment === newAdjustment)) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              _context.next = 4;
              return player.getPlaybackRate();
            case 4:
              _context.t0 = _context.sent;
              _context.t1 = _this.speedAdjustment;
              _context.t2 = _context.t0 - _context.t1;
              _context.t3 = newAdjustment;
              newPlaybackRate = _context.t2 + _context.t3;
              _this.log("New playbackRate:  ".concat(newPlaybackRate));
              _context.next = 12;
              return player.setPlaybackRate(newPlaybackRate);
            case 12:
              _this.speedAdjustment = newAdjustment;
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
    _this.logger = logger;
    _this.init(timingObject, _player, _objectSpread2(_objectSpread2({}, defaultOptions), options));
    return _this;
  }
  _createClass(TimingSrcConnector2, [{
    key: "disconnect",
    value: function disconnect() {
      this.dispatchEvent(new Event("disconnect"));
    }
    /**
     * @param {TimingObject} timingObject
     * @param {PlayerControls} player
     * @param {TimingSrcConnectorOptions} options
     * @return {Promise<void>}
     */
  }, {
    key: "init",
    value: function() {
      var _init = _asyncToGenerator(_regeneratorRuntime().mark(function _callee2(timingObject, player, options) {
        var _this2 = this;
        var playerUpdater, positionSync, timingObjectUpdater;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.waitForTOReadyState(timingObject, "open");
            case 2:
              if (!(options.role === "viewer")) {
                _context2.next = 10;
                break;
              }
              _context2.next = 5;
              return this.updatePlayer(timingObject, player, options);
            case 5:
              playerUpdater = subscribe(timingObject, "change", function() {
                return _this2.updatePlayer(timingObject, player, options);
              });
              positionSync = this.maintainPlaybackPosition(timingObject, player, options);
              this.addEventListener("disconnect", function() {
                positionSync.cancel();
                playerUpdater.cancel();
              });
              _context2.next = 14;
              break;
            case 10:
              _context2.next = 12;
              return this.updateTimingObject(timingObject, player);
            case 12:
              timingObjectUpdater = subscribe(player, ["seeked", "play", "pause", "ratechange"], function() {
                return _this2.updateTimingObject(timingObject, player);
              }, "on", "off");
              this.addEventListener("disconnect", function() {
                return timingObjectUpdater.cancel();
              });
            case 14:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function init(_x3, _x4, _x5) {
        return _init.apply(this, arguments);
      }
      return init;
    }()
    /**
     * Sets the TimingObject's state to reflect that of the player
     *
     * @param {TimingObject} timingObject
     * @param {PlayerControls} player
     * @return {Promise<void>}
     */
  }, {
    key: "updateTimingObject",
    value: function() {
      var _updateTimingObject = _asyncToGenerator(_regeneratorRuntime().mark(function _callee3(timingObject, player) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = timingObject;
              _context3.next = 3;
              return player.getCurrentTime();
            case 3:
              _context3.t1 = _context3.sent;
              _context3.next = 6;
              return player.getPaused();
            case 6:
              if (!_context3.sent) {
                _context3.next = 10;
                break;
              }
              _context3.t2 = 0;
              _context3.next = 13;
              break;
            case 10:
              _context3.next = 12;
              return player.getPlaybackRate();
            case 12:
              _context3.t2 = _context3.sent;
            case 13:
              _context3.t3 = _context3.t2;
              _context3.t4 = {
                position: _context3.t1,
                velocity: _context3.t3
              };
              _context3.t0.update.call(_context3.t0, _context3.t4);
            case 16:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function updateTimingObject(_x6, _x7) {
        return _updateTimingObject.apply(this, arguments);
      }
      return updateTimingObject;
    }()
    /**
     * Sets the player's timing state to reflect that of the TimingObject
     *
     * @param {TimingObject} timingObject
     * @param {PlayerControls} player
     * @param {TimingSrcConnectorOptions} options
     * @return {Promise<void>}
     */
  }, {
    key: "updatePlayer",
    value: function() {
      var _updatePlayer = _asyncToGenerator(_regeneratorRuntime().mark(function _callee5(timingObject, player, options) {
        var _timingObject$query, position, velocity;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _timingObject$query = timingObject.query(), position = _timingObject$query.position, velocity = _timingObject$query.velocity;
              if (typeof position === "number") {
                player.setCurrentTime(position);
              }
              if (!(typeof velocity === "number")) {
                _context5.next = 25;
                break;
              }
              if (!(velocity === 0)) {
                _context5.next = 11;
                break;
              }
              _context5.next = 6;
              return player.getPaused();
            case 6:
              _context5.t0 = _context5.sent;
              if (!(_context5.t0 === false)) {
                _context5.next = 9;
                break;
              }
              player.pause();
            case 9:
              _context5.next = 25;
              break;
            case 11:
              if (!(velocity > 0)) {
                _context5.next = 25;
                break;
              }
              _context5.next = 14;
              return player.getPaused();
            case 14:
              _context5.t1 = _context5.sent;
              if (!(_context5.t1 === true)) {
                _context5.next = 19;
                break;
              }
              _context5.next = 18;
              return player.play().catch(function() {
                var _ref2 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee4(err) {
                  return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                    while (1) switch (_context4.prev = _context4.next) {
                      case 0:
                        if (!(err.name === "NotAllowedError" && options.autoPlayMuted)) {
                          _context4.next = 5;
                          break;
                        }
                        _context4.next = 3;
                        return player.setMuted(true);
                      case 3:
                        _context4.next = 5;
                        return player.play().catch(function(err2) {
                          return console.error("Couldn't play the video from TimingSrcConnector. Error:", err2);
                        });
                      case 5:
                      case "end":
                        return _context4.stop();
                    }
                  }, _callee4);
                }));
                return function(_x11) {
                  return _ref2.apply(this, arguments);
                };
              }());
            case 18:
              this.updatePlayer(timingObject, player, options);
            case 19:
              _context5.next = 21;
              return player.getPlaybackRate();
            case 21:
              _context5.t2 = _context5.sent;
              _context5.t3 = velocity;
              if (!(_context5.t2 !== _context5.t3)) {
                _context5.next = 25;
                break;
              }
              player.setPlaybackRate(velocity);
            case 25:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function updatePlayer(_x8, _x9, _x10) {
        return _updatePlayer.apply(this, arguments);
      }
      return updatePlayer;
    }()
    /**
     * Since video players do not play with 100% time precision, we need to closely monitor
     * our player to be sure it remains in sync with the TimingObject.
     *
     * If out of sync, we use the current conditions and the options provided to determine
     * whether to re-sync via setting currentTime or adjusting the playbackRate
     *
     * @param {TimingObject} timingObject
     * @param {PlayerControls} player
     * @param {TimingSrcConnectorOptions} options
     * @return {{cancel: (function(): void)}}
     */
  }, {
    key: "maintainPlaybackPosition",
    value: function maintainPlaybackPosition(timingObject, player, options) {
      var _this3 = this;
      var allowedDrift = options.allowedDrift, maxAllowedDrift = options.maxAllowedDrift, minCheckInterval = options.minCheckInterval, maxRateAdjustment = options.maxRateAdjustment, maxTimeToCatchUp = options.maxTimeToCatchUp;
      var syncInterval = Math.min(maxTimeToCatchUp, Math.max(minCheckInterval, maxAllowedDrift)) * 1e3;
      var check = function() {
        var _ref3 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee6() {
          var diff, diffAbs, min, max, adjustment;
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                _context6.t0 = timingObject.query().velocity === 0;
                if (_context6.t0) {
                  _context6.next = 6;
                  break;
                }
                _context6.next = 4;
                return player.getPaused();
              case 4:
                _context6.t1 = _context6.sent;
                _context6.t0 = _context6.t1 === true;
              case 6:
                if (!_context6.t0) {
                  _context6.next = 8;
                  break;
                }
                return _context6.abrupt("return");
              case 8:
                _context6.t2 = timingObject.query().position;
                _context6.next = 11;
                return player.getCurrentTime();
              case 11:
                _context6.t3 = _context6.sent;
                diff = _context6.t2 - _context6.t3;
                diffAbs = Math.abs(diff);
                _this3.log("Drift: ".concat(diff));
                if (!(diffAbs > maxAllowedDrift)) {
                  _context6.next = 22;
                  break;
                }
                _context6.next = 18;
                return _this3.adjustSpeed(player, 0);
              case 18:
                player.setCurrentTime(timingObject.query().position);
                _this3.log("Resync by currentTime");
                _context6.next = 29;
                break;
              case 22:
                if (!(diffAbs > allowedDrift)) {
                  _context6.next = 29;
                  break;
                }
                min = diffAbs / maxTimeToCatchUp;
                max = maxRateAdjustment;
                adjustment = min < max ? (max - min) / 2 : max;
                _context6.next = 28;
                return _this3.adjustSpeed(player, adjustment * Math.sign(diff));
              case 28:
                _this3.log("Resync by playbackRate");
              case 29:
              case "end":
                return _context6.stop();
            }
          }, _callee6);
        }));
        return function check2() {
          return _ref3.apply(this, arguments);
        };
      }();
      var interval = setInterval(function() {
        return check();
      }, syncInterval);
      return {
        cancel: function cancel() {
          return clearInterval(interval);
        }
      };
    }
    /**
     * @param {string} msg
     */
  }, {
    key: "log",
    value: function log(msg) {
      var _this$logger;
      (_this$logger = this.logger) === null || _this$logger === void 0 ? void 0 : _this$logger.call(this, "TimingSrcConnector: ".concat(msg));
    }
  }, {
    key: "waitForTOReadyState",
    value: (
      /**
       * @param {TimingObject} timingObject
       * @param {TConnectionState} state
       * @return {Promise<void>}
       */
      function waitForTOReadyState(timingObject, state) {
        return new Promise(function(resolve) {
          var check = function check2() {
            if (timingObject.readyState === state) {
              resolve();
            } else {
              timingObject.addEventListener("readystatechange", check2, {
                once: true
              });
            }
          };
          check();
        });
      }
    )
  }]);
  return TimingSrcConnector2;
}(_wrapNativeSuper(EventTarget));
var playerMap = /* @__PURE__ */ new WeakMap();
var readyMap = /* @__PURE__ */ new WeakMap();
var screenfull = {};
var Player = function() {
  function Player2(element) {
    var _this = this;
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    _classCallCheck(this, Player2);
    if (window.jQuery && element instanceof jQuery) {
      if (element.length > 1 && window.console && console.warn) {
        console.warn("A jQuery object with multiple elements was passed, using the first element.");
      }
      element = element[0];
    }
    if (typeof document !== "undefined" && typeof element === "string") {
      element = document.getElementById(element);
    }
    if (!isDomElement(element)) {
      throw new TypeError("You must pass either a valid element or a valid id.");
    }
    if (element.nodeName !== "IFRAME") {
      var iframe = element.querySelector("iframe");
      if (iframe) {
        element = iframe;
      }
    }
    if (element.nodeName === "IFRAME" && !isVimeoUrl(element.getAttribute("src") || "")) {
      throw new Error("The player element passed isn’t a Vimeo embed.");
    }
    if (playerMap.has(element)) {
      return playerMap.get(element);
    }
    this._window = element.ownerDocument.defaultView;
    this.element = element;
    this.origin = "*";
    var readyPromise = new npo_src(function(resolve, reject) {
      _this._onMessage = function(event) {
        if (!isVimeoUrl(event.origin) || _this.element.contentWindow !== event.source) {
          return;
        }
        if (_this.origin === "*") {
          _this.origin = event.origin;
        }
        var data = parseMessageData(event.data);
        var isError = data && data.event === "error";
        var isReadyError = isError && data.data && data.data.method === "ready";
        if (isReadyError) {
          var error = new Error(data.data.message);
          error.name = data.data.name;
          reject(error);
          return;
        }
        var isReadyEvent = data && data.event === "ready";
        var isPingResponse = data && data.method === "ping";
        if (isReadyEvent || isPingResponse) {
          _this.element.setAttribute("data-ready", "true");
          resolve();
          return;
        }
        processData(_this, data);
      };
      _this._window.addEventListener("message", _this._onMessage);
      if (_this.element.nodeName !== "IFRAME") {
        var params = getOEmbedParameters(element, options);
        var url = getVimeoUrl(params);
        getOEmbedData(url, params, element).then(function(data) {
          var iframe2 = createEmbed(data, element);
          _this.element = iframe2;
          _this._originalElement = element;
          swapCallbacks(element, iframe2);
          playerMap.set(_this.element, _this);
          return data;
        }).catch(reject);
      }
    });
    readyMap.set(this, readyPromise);
    playerMap.set(this.element, this);
    if (this.element.nodeName === "IFRAME") {
      postMessage(this, "ping");
    }
    if (screenfull.isEnabled) {
      var exitFullscreen = function exitFullscreen2() {
        return screenfull.exit();
      };
      this.fullscreenchangeHandler = function() {
        if (screenfull.isFullscreen) {
          storeCallback(_this, "event:exitFullscreen", exitFullscreen);
        } else {
          removeCallback(_this, "event:exitFullscreen", exitFullscreen);
        }
        _this.ready().then(function() {
          postMessage(_this, "fullscreenchange", screenfull.isFullscreen);
        });
      };
      screenfull.on("fullscreenchange", this.fullscreenchangeHandler);
    }
    return this;
  }
  _createClass(Player2, [{
    key: "callMethod",
    value: function callMethod(name) {
      var _this2 = this;
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      if (name === void 0 || name === null) {
        throw new TypeError("You must pass a method name.");
      }
      return new npo_src(function(resolve, reject) {
        return _this2.ready().then(function() {
          storeCallback(_this2, name, {
            resolve,
            reject
          });
          postMessage(_this2, name, args);
        }).catch(reject);
      });
    }
    /**
     * Get a promise for the value of a player property.
     *
     * @param {string} name The property name
     * @return {Promise}
     */
  }, {
    key: "get",
    value: function get(name) {
      var _this3 = this;
      return new npo_src(function(resolve, reject) {
        name = getMethodName(name, "get");
        return _this3.ready().then(function() {
          storeCallback(_this3, name, {
            resolve,
            reject
          });
          postMessage(_this3, name);
        }).catch(reject);
      });
    }
    /**
     * Get a promise for setting the value of a player property.
     *
     * @param {string} name The API method to call.
     * @param {mixed} value The value to set.
     * @return {Promise}
     */
  }, {
    key: "set",
    value: function set(name, value) {
      var _this4 = this;
      return new npo_src(function(resolve, reject) {
        name = getMethodName(name, "set");
        if (value === void 0 || value === null) {
          throw new TypeError("There must be a value to set.");
        }
        return _this4.ready().then(function() {
          storeCallback(_this4, name, {
            resolve,
            reject
          });
          postMessage(_this4, name, value);
        }).catch(reject);
      });
    }
    /**
     * Add an event listener for the specified event. Will call the
     * callback with a single parameter, `data`, that contains the data for
     * that event.
     *
     * @param {string} eventName The name of the event.
     * @param {function(*)} callback The function to call when the event fires.
     * @return {void}
     */
  }, {
    key: "on",
    value: function on(eventName, callback) {
      if (!eventName) {
        throw new TypeError("You must pass an event name.");
      }
      if (!callback) {
        throw new TypeError("You must pass a callback function.");
      }
      if (typeof callback !== "function") {
        throw new TypeError("The callback must be a function.");
      }
      var callbacks = getCallbacks(this, "event:".concat(eventName));
      if (callbacks.length === 0) {
        this.callMethod("addEventListener", eventName).catch(function() {
        });
      }
      storeCallback(this, "event:".concat(eventName), callback);
    }
    /**
     * Remove an event listener for the specified event. Will remove all
     * listeners for that event if a `callback` isn’t passed, or only that
     * specific callback if it is passed.
     *
     * @param {string} eventName The name of the event.
     * @param {function} [callback] The specific callback to remove.
     * @return {void}
     */
  }, {
    key: "off",
    value: function off(eventName, callback) {
      if (!eventName) {
        throw new TypeError("You must pass an event name.");
      }
      if (callback && typeof callback !== "function") {
        throw new TypeError("The callback must be a function.");
      }
      var lastCallback = removeCallback(this, "event:".concat(eventName), callback);
      if (lastCallback) {
        this.callMethod("removeEventListener", eventName).catch(function(e) {
        });
      }
    }
    /**
     * A promise to load a new video.
     *
     * @promise LoadVideoPromise
     * @fulfill {number} The video with this id or url successfully loaded.
     * @reject {TypeError} The id was not a number.
     */
    /**
     * Load a new video into this embed. The promise will be resolved if
     * the video is successfully loaded, or it will be rejected if it could
     * not be loaded.
     *
     * @param {number|string|object} options The id of the video, the url of the video, or an object with embed options.
     * @return {LoadVideoPromise}
     */
  }, {
    key: "loadVideo",
    value: function loadVideo(options) {
      return this.callMethod("loadVideo", options);
    }
    /**
     * A promise to perform an action when the Player is ready.
     *
     * @todo document errors
     * @promise LoadVideoPromise
     * @fulfill {void}
     */
    /**
     * Trigger a function when the player iframe has initialized. You do not
     * need to wait for `ready` to trigger to begin adding event listeners
     * or calling other methods.
     *
     * @return {ReadyPromise}
     */
  }, {
    key: "ready",
    value: function ready() {
      var readyPromise = readyMap.get(this) || new npo_src(function(resolve, reject) {
        reject(new Error("Unknown player. Probably unloaded."));
      });
      return npo_src.resolve(readyPromise);
    }
    /**
     * A promise to add a cue point to the player.
     *
     * @promise AddCuePointPromise
     * @fulfill {string} The id of the cue point to use for removeCuePoint.
     * @reject {RangeError} the time was less than 0 or greater than the
     *         video’s duration.
     * @reject {UnsupportedError} Cue points are not supported with the current
     *         player or browser.
     */
    /**
     * Add a cue point to the player.
     *
     * @param {number} time The time for the cue point.
     * @param {object} [data] Arbitrary data to be returned with the cue point.
     * @return {AddCuePointPromise}
     */
  }, {
    key: "addCuePoint",
    value: function addCuePoint(time) {
      var data = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this.callMethod("addCuePoint", {
        time,
        data
      });
    }
    /**
     * A promise to remove a cue point from the player.
     *
     * @promise AddCuePointPromise
     * @fulfill {string} The id of the cue point that was removed.
     * @reject {InvalidCuePoint} The cue point with the specified id was not
     *         found.
     * @reject {UnsupportedError} Cue points are not supported with the current
     *         player or browser.
     */
    /**
     * Remove a cue point from the video.
     *
     * @param {string} id The id of the cue point to remove.
     * @return {RemoveCuePointPromise}
     */
  }, {
    key: "removeCuePoint",
    value: function removeCuePoint(id) {
      return this.callMethod("removeCuePoint", id);
    }
    /**
     * A representation of a text track on a video.
     *
     * @typedef {Object} VimeoTextTrack
     * @property {string} language The ISO language code.
     * @property {string} kind The kind of track it is (captions or subtitles).
     * @property {string} label The human‐readable label for the track.
     */
    /**
     * A promise to enable a text track.
     *
     * @promise EnableTextTrackPromise
     * @fulfill {VimeoTextTrack} The text track that was enabled.
     * @reject {InvalidTrackLanguageError} No track was available with the
     *         specified language.
     * @reject {InvalidTrackError} No track was available with the specified
     *         language and kind.
     */
    /**
     * Enable the text track with the specified language, and optionally the
     * specified kind (captions or subtitles).
     *
     * When set via the API, the track language will not change the viewer’s
     * stored preference.
     *
     * @param {string} language The two‐letter language code.
     * @param {string} [kind] The kind of track to enable (captions or subtitles).
     * @return {EnableTextTrackPromise}
     */
  }, {
    key: "enableTextTrack",
    value: function enableTextTrack(language, kind) {
      if (!language) {
        throw new TypeError("You must pass a language.");
      }
      return this.callMethod("enableTextTrack", {
        language,
        kind
      });
    }
    /**
     * A promise to disable the active text track.
     *
     * @promise DisableTextTrackPromise
     * @fulfill {void} The track was disabled.
     */
    /**
     * Disable the currently-active text track.
     *
     * @return {DisableTextTrackPromise}
     */
  }, {
    key: "disableTextTrack",
    value: function disableTextTrack() {
      return this.callMethod("disableTextTrack");
    }
    /**
     * A promise to pause the video.
     *
     * @promise PausePromise
     * @fulfill {void} The video was paused.
     */
    /**
     * Pause the video if it’s playing.
     *
     * @return {PausePromise}
     */
  }, {
    key: "pause",
    value: function pause() {
      return this.callMethod("pause");
    }
    /**
     * A promise to play the video.
     *
     * @promise PlayPromise
     * @fulfill {void} The video was played.
     */
    /**
     * Play the video if it’s paused. **Note:** on iOS and some other
     * mobile devices, you cannot programmatically trigger play. Once the
     * viewer has tapped on the play button in the player, however, you
     * will be able to use this function.
     *
     * @return {PlayPromise}
     */
  }, {
    key: "play",
    value: function play() {
      return this.callMethod("play");
    }
    /**
     * Request that the player enters fullscreen.
     * @return {Promise}
     */
  }, {
    key: "requestFullscreen",
    value: function requestFullscreen() {
      if (screenfull.isEnabled) {
        return screenfull.request(this.element);
      }
      return this.callMethod("requestFullscreen");
    }
    /**
     * Request that the player exits fullscreen.
     * @return {Promise}
     */
  }, {
    key: "exitFullscreen",
    value: function exitFullscreen() {
      if (screenfull.isEnabled) {
        return screenfull.exit();
      }
      return this.callMethod("exitFullscreen");
    }
    /**
     * Returns true if the player is currently fullscreen.
     * @return {Promise}
     */
  }, {
    key: "getFullscreen",
    value: function getFullscreen() {
      if (screenfull.isEnabled) {
        return npo_src.resolve(screenfull.isFullscreen);
      }
      return this.get("fullscreen");
    }
    /**
     * Request that the player enters picture-in-picture.
     * @return {Promise}
     */
  }, {
    key: "requestPictureInPicture",
    value: function requestPictureInPicture() {
      return this.callMethod("requestPictureInPicture");
    }
    /**
     * Request that the player exits picture-in-picture.
     * @return {Promise}
     */
  }, {
    key: "exitPictureInPicture",
    value: function exitPictureInPicture() {
      return this.callMethod("exitPictureInPicture");
    }
    /**
     * Returns true if the player is currently picture-in-picture.
     * @return {Promise}
     */
  }, {
    key: "getPictureInPicture",
    value: function getPictureInPicture() {
      return this.get("pictureInPicture");
    }
    /**
     * A promise to prompt the viewer to initiate remote playback.
     *
     * @promise RemotePlaybackPromptPromise
     * @fulfill {void}
     * @reject {NotFoundError} No remote playback device is available.
     */
    /**
     * Request to prompt the user to initiate remote playback.
     *
     * @return {RemotePlaybackPromptPromise}
     */
  }, {
    key: "remotePlaybackPrompt",
    value: function remotePlaybackPrompt() {
      return this.callMethod("remotePlaybackPrompt");
    }
    /**
     * A promise to unload the video.
     *
     * @promise UnloadPromise
     * @fulfill {void} The video was unloaded.
     */
    /**
     * Return the player to its initial state.
     *
     * @return {UnloadPromise}
     */
  }, {
    key: "unload",
    value: function unload() {
      return this.callMethod("unload");
    }
    /**
     * Cleanup the player and remove it from the DOM
     *
     * It won't be usable and a new one should be constructed
     *  in order to do any operations.
     *
     * @return {Promise}
     */
  }, {
    key: "destroy",
    value: function destroy() {
      var _this5 = this;
      return new npo_src(function(resolve) {
        readyMap.delete(_this5);
        playerMap.delete(_this5.element);
        if (_this5._originalElement) {
          playerMap.delete(_this5._originalElement);
          _this5._originalElement.removeAttribute("data-vimeo-initialized");
        }
        if (_this5.element && _this5.element.nodeName === "IFRAME" && _this5.element.parentNode) {
          if (_this5.element.parentNode.parentNode && _this5._originalElement && _this5._originalElement !== _this5.element.parentNode) {
            _this5.element.parentNode.parentNode.removeChild(_this5.element.parentNode);
          } else {
            _this5.element.parentNode.removeChild(_this5.element);
          }
        }
        if (_this5.element && _this5.element.nodeName === "DIV" && _this5.element.parentNode) {
          _this5.element.removeAttribute("data-vimeo-initialized");
          var iframe = _this5.element.querySelector("iframe");
          if (iframe && iframe.parentNode) {
            if (iframe.parentNode.parentNode && _this5._originalElement && _this5._originalElement !== iframe.parentNode) {
              iframe.parentNode.parentNode.removeChild(iframe.parentNode);
            } else {
              iframe.parentNode.removeChild(iframe);
            }
          }
        }
        _this5._window.removeEventListener("message", _this5._onMessage);
        if (screenfull.isEnabled) {
          screenfull.off("fullscreenchange", _this5.fullscreenchangeHandler);
        }
        resolve();
      });
    }
    /**
     * A promise to get the autopause behavior of the video.
     *
     * @promise GetAutopausePromise
     * @fulfill {boolean} Whether autopause is turned on or off.
     * @reject {UnsupportedError} Autopause is not supported with the current
     *         player or browser.
     */
    /**
     * Get the autopause behavior for this player.
     *
     * @return {GetAutopausePromise}
     */
  }, {
    key: "getAutopause",
    value: function getAutopause() {
      return this.get("autopause");
    }
    /**
     * A promise to set the autopause behavior of the video.
     *
     * @promise SetAutopausePromise
     * @fulfill {boolean} Whether autopause is turned on or off.
     * @reject {UnsupportedError} Autopause is not supported with the current
     *         player or browser.
     */
    /**
     * Enable or disable the autopause behavior of this player.
     *
     * By default, when another video is played in the same browser, this
     * player will automatically pause. Unless you have a specific reason
     * for doing so, we recommend that you leave autopause set to the
     * default (`true`).
     *
     * @param {boolean} autopause
     * @return {SetAutopausePromise}
     */
  }, {
    key: "setAutopause",
    value: function setAutopause(autopause) {
      return this.set("autopause", autopause);
    }
    /**
     * A promise to get the buffered property of the video.
     *
     * @promise GetBufferedPromise
     * @fulfill {Array} Buffered Timeranges converted to an Array.
     */
    /**
     * Get the buffered property of the video.
     *
     * @return {GetBufferedPromise}
     */
  }, {
    key: "getBuffered",
    value: function getBuffered() {
      return this.get("buffered");
    }
    /**
     * @typedef {Object} CameraProperties
     * @prop {number} props.yaw - Number between 0 and 360.
     * @prop {number} props.pitch - Number between -90 and 90.
     * @prop {number} props.roll - Number between -180 and 180.
     * @prop {number} props.fov - The field of view in degrees.
     */
    /**
     * A promise to get the camera properties of the player.
     *
     * @promise GetCameraPromise
     * @fulfill {CameraProperties} The camera properties.
     */
    /**
     * For 360° videos get the camera properties for this player.
     *
     * @return {GetCameraPromise}
     */
  }, {
    key: "getCameraProps",
    value: function getCameraProps() {
      return this.get("cameraProps");
    }
    /**
     * A promise to set the camera properties of the player.
     *
     * @promise SetCameraPromise
     * @fulfill {Object} The camera was successfully set.
     * @reject {RangeError} The range was out of bounds.
     */
    /**
     * For 360° videos set the camera properties for this player.
     *
     * @param {CameraProperties} camera The camera properties
     * @return {SetCameraPromise}
     */
  }, {
    key: "setCameraProps",
    value: function setCameraProps(camera) {
      return this.set("cameraProps", camera);
    }
    /**
     * A representation of a chapter.
     *
     * @typedef {Object} VimeoChapter
     * @property {number} startTime The start time of the chapter.
     * @property {object} title The title of the chapter.
     * @property {number} index The place in the order of Chapters. Starts at 1.
     */
    /**
     * A promise to get chapters for the video.
     *
     * @promise GetChaptersPromise
     * @fulfill {VimeoChapter[]} The chapters for the video.
     */
    /**
     * Get an array of all the chapters for the video.
     *
     * @return {GetChaptersPromise}
     */
  }, {
    key: "getChapters",
    value: function getChapters() {
      return this.get("chapters");
    }
    /**
     * A promise to get the currently active chapter.
     *
     * @promise GetCurrentChaptersPromise
     * @fulfill {VimeoChapter|undefined} The current chapter for the video.
     */
    /**
     * Get the currently active chapter for the video.
     *
     * @return {GetCurrentChaptersPromise}
     */
  }, {
    key: "getCurrentChapter",
    value: function getCurrentChapter() {
      return this.get("currentChapter");
    }
    /**
     * A promise to get the accent color of the player.
     *
     * @promise GetColorPromise
     * @fulfill {string} The hex color of the player.
     */
    /**
     * Get the accent color for this player. Note this is deprecated in place of `getColorTwo`.
     *
     * @return {GetColorPromise}
     */
  }, {
    key: "getColor",
    value: function getColor() {
      return this.get("color");
    }
    /**
     * A promise to get all colors for the player in an array.
     *
     * @promise GetColorsPromise
     * @fulfill {string[]} The hex colors of the player.
     */
    /**
     * Get all the colors for this player in an array: [colorOne, colorTwo, colorThree, colorFour]
     *
     * @return {GetColorPromise}
     */
  }, {
    key: "getColors",
    value: function getColors() {
      return npo_src.all([this.get("colorOne"), this.get("colorTwo"), this.get("colorThree"), this.get("colorFour")]);
    }
    /**
     * A promise to set the accent color of the player.
     *
     * @promise SetColorPromise
     * @fulfill {string} The color was successfully set.
     * @reject {TypeError} The string was not a valid hex or rgb color.
     * @reject {ContrastError} The color was set, but the contrast is
     *         outside of the acceptable range.
     * @reject {EmbedSettingsError} The owner of the player has chosen to
     *         use a specific color.
     */
    /**
     * Set the accent color of this player to a hex or rgb string. Setting the
     * color may fail if the owner of the video has set their embed
     * preferences to force a specific color.
     * Note this is deprecated in place of `setColorTwo`.
     *
     * @param {string} color The hex or rgb color string to set.
     * @return {SetColorPromise}
     */
  }, {
    key: "setColor",
    value: function setColor(color) {
      return this.set("color", color);
    }
    /**
     * A promise to set all colors for the player.
     *
     * @promise SetColorsPromise
     * @fulfill {string[]} The colors were successfully set.
     * @reject {TypeError} The string was not a valid hex or rgb color.
     * @reject {ContrastError} The color was set, but the contrast is
     *         outside of the acceptable range.
     * @reject {EmbedSettingsError} The owner of the player has chosen to
     *         use a specific color.
     */
    /**
     * Set the colors of this player to a hex or rgb string. Setting the
     * color may fail if the owner of the video has set their embed
     * preferences to force a specific color.
     * The colors should be passed in as an array: [colorOne, colorTwo, colorThree, colorFour].
     * If a color should not be set, the index in the array can be left as null.
     *
     * @param {string[]} colors Array of the hex or rgb color strings to set.
     * @return {SetColorsPromise}
     */
  }, {
    key: "setColors",
    value: function setColors(colors) {
      if (!Array.isArray(colors)) {
        return new npo_src(function(resolve, reject) {
          return reject(new TypeError("Argument must be an array."));
        });
      }
      var nullPromise = new npo_src(function(resolve) {
        return resolve(null);
      });
      var colorPromises = [colors[0] ? this.set("colorOne", colors[0]) : nullPromise, colors[1] ? this.set("colorTwo", colors[1]) : nullPromise, colors[2] ? this.set("colorThree", colors[2]) : nullPromise, colors[3] ? this.set("colorFour", colors[3]) : nullPromise];
      return npo_src.all(colorPromises);
    }
    /**
     * A representation of a cue point.
     *
     * @typedef {Object} VimeoCuePoint
     * @property {number} time The time of the cue point.
     * @property {object} data The data passed when adding the cue point.
     * @property {string} id The unique id for use with removeCuePoint.
     */
    /**
     * A promise to get the cue points of a video.
     *
     * @promise GetCuePointsPromise
     * @fulfill {VimeoCuePoint[]} The cue points added to the video.
     * @reject {UnsupportedError} Cue points are not supported with the current
     *         player or browser.
     */
    /**
     * Get an array of the cue points added to the video.
     *
     * @return {GetCuePointsPromise}
     */
  }, {
    key: "getCuePoints",
    value: function getCuePoints() {
      return this.get("cuePoints");
    }
    /**
     * A promise to get the current time of the video.
     *
     * @promise GetCurrentTimePromise
     * @fulfill {number} The current time in seconds.
     */
    /**
     * Get the current playback position in seconds.
     *
     * @return {GetCurrentTimePromise}
     */
  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      return this.get("currentTime");
    }
    /**
     * A promise to set the current time of the video.
     *
     * @promise SetCurrentTimePromise
     * @fulfill {number} The actual current time that was set.
     * @reject {RangeError} the time was less than 0 or greater than the
     *         video’s duration.
     */
    /**
     * Set the current playback position in seconds. If the player was
     * paused, it will remain paused. Likewise, if the player was playing,
     * it will resume playing once the video has buffered.
     *
     * You can provide an accurate time and the player will attempt to seek
     * to as close to that time as possible. The exact time will be the
     * fulfilled value of the promise.
     *
     * @param {number} currentTime
     * @return {SetCurrentTimePromise}
     */
  }, {
    key: "setCurrentTime",
    value: function setCurrentTime(currentTime) {
      return this.set("currentTime", currentTime);
    }
    /**
     * A promise to get the duration of the video.
     *
     * @promise GetDurationPromise
     * @fulfill {number} The duration in seconds.
     */
    /**
     * Get the duration of the video in seconds. It will be rounded to the
     * nearest second before playback begins, and to the nearest thousandth
     * of a second after playback begins.
     *
     * @return {GetDurationPromise}
     */
  }, {
    key: "getDuration",
    value: function getDuration() {
      return this.get("duration");
    }
    /**
     * A promise to get the ended state of the video.
     *
     * @promise GetEndedPromise
     * @fulfill {boolean} Whether or not the video has ended.
     */
    /**
     * Get the ended state of the video. The video has ended if
     * `currentTime === duration`.
     *
     * @return {GetEndedPromise}
     */
  }, {
    key: "getEnded",
    value: function getEnded() {
      return this.get("ended");
    }
    /**
     * A promise to get the loop state of the player.
     *
     * @promise GetLoopPromise
     * @fulfill {boolean} Whether or not the player is set to loop.
     */
    /**
     * Get the loop state of the player.
     *
     * @return {GetLoopPromise}
     */
  }, {
    key: "getLoop",
    value: function getLoop() {
      return this.get("loop");
    }
    /**
     * A promise to set the loop state of the player.
     *
     * @promise SetLoopPromise
     * @fulfill {boolean} The loop state that was set.
     */
    /**
     * Set the loop state of the player. When set to `true`, the player
     * will start over immediately once playback ends.
     *
     * @param {boolean} loop
     * @return {SetLoopPromise}
     */
  }, {
    key: "setLoop",
    value: function setLoop(loop) {
      return this.set("loop", loop);
    }
    /**
     * A promise to set the muted state of the player.
     *
     * @promise SetMutedPromise
     * @fulfill {boolean} The muted state that was set.
     */
    /**
     * Set the muted state of the player. When set to `true`, the player
     * volume will be muted.
     *
     * @param {boolean} muted
     * @return {SetMutedPromise}
     */
  }, {
    key: "setMuted",
    value: function setMuted(muted) {
      return this.set("muted", muted);
    }
    /**
     * A promise to get the muted state of the player.
     *
     * @promise GetMutedPromise
     * @fulfill {boolean} Whether or not the player is muted.
     */
    /**
     * Get the muted state of the player.
     *
     * @return {GetMutedPromise}
     */
  }, {
    key: "getMuted",
    value: function getMuted() {
      return this.get("muted");
    }
    /**
     * A promise to get the paused state of the player.
     *
     * @promise GetLoopPromise
     * @fulfill {boolean} Whether or not the video is paused.
     */
    /**
     * Get the paused state of the player.
     *
     * @return {GetLoopPromise}
     */
  }, {
    key: "getPaused",
    value: function getPaused() {
      return this.get("paused");
    }
    /**
     * A promise to get the playback rate of the player.
     *
     * @promise GetPlaybackRatePromise
     * @fulfill {number} The playback rate of the player on a scale from 0 to 2.
     */
    /**
     * Get the playback rate of the player on a scale from `0` to `2`.
     *
     * @return {GetPlaybackRatePromise}
     */
  }, {
    key: "getPlaybackRate",
    value: function getPlaybackRate() {
      return this.get("playbackRate");
    }
    /**
     * A promise to set the playbackrate of the player.
     *
     * @promise SetPlaybackRatePromise
     * @fulfill {number} The playback rate was set.
     * @reject {RangeError} The playback rate was less than 0 or greater than 2.
     */
    /**
     * Set the playback rate of the player on a scale from `0` to `2`. When set
     * via the API, the playback rate will not be synchronized to other
     * players or stored as the viewer's preference.
     *
     * @param {number} playbackRate
     * @return {SetPlaybackRatePromise}
     */
  }, {
    key: "setPlaybackRate",
    value: function setPlaybackRate(playbackRate) {
      return this.set("playbackRate", playbackRate);
    }
    /**
     * A promise to get the played property of the video.
     *
     * @promise GetPlayedPromise
     * @fulfill {Array} Played Timeranges converted to an Array.
     */
    /**
     * Get the played property of the video.
     *
     * @return {GetPlayedPromise}
     */
  }, {
    key: "getPlayed",
    value: function getPlayed() {
      return this.get("played");
    }
    /**
     * A promise to get the qualities available of the current video.
     *
     * @promise GetQualitiesPromise
     * @fulfill {Array} The qualities of the video.
     */
    /**
     * Get the qualities of the current video.
     *
     * @return {GetQualitiesPromise}
     */
  }, {
    key: "getQualities",
    value: function getQualities() {
      return this.get("qualities");
    }
    /**
     * A promise to get the current set quality of the video.
     *
     * @promise GetQualityPromise
     * @fulfill {string} The current set quality.
     */
    /**
     * Get the current set quality of the video.
     *
     * @return {GetQualityPromise}
     */
  }, {
    key: "getQuality",
    value: function getQuality() {
      return this.get("quality");
    }
    /**
     * A promise to set the video quality.
     *
     * @promise SetQualityPromise
     * @fulfill {number} The quality was set.
     * @reject {RangeError} The quality is not available.
     */
    /**
     * Set a video quality.
     *
     * @param {string} quality
     * @return {SetQualityPromise}
     */
  }, {
    key: "setQuality",
    value: function setQuality(quality) {
      return this.set("quality", quality);
    }
    /**
     * A promise to get the remote playback availability.
     *
     * @promise RemotePlaybackAvailabilityPromise
     * @fulfill {boolean} Whether remote playback is available.
     */
    /**
     * Get the availability of remote playback.
     *
     * @return {RemotePlaybackAvailabilityPromise}
     */
  }, {
    key: "getRemotePlaybackAvailability",
    value: function getRemotePlaybackAvailability() {
      return this.get("remotePlaybackAvailability");
    }
    /**
     * A promise to get the current remote playback state.
     *
     * @promise RemotePlaybackStatePromise
     * @fulfill {string} The state of the remote playback: connecting, connected, or disconnected.
     */
    /**
     * Get the current remote playback state.
     *
     * @return {RemotePlaybackStatePromise}
     */
  }, {
    key: "getRemotePlaybackState",
    value: function getRemotePlaybackState() {
      return this.get("remotePlaybackState");
    }
    /**
     * A promise to get the seekable property of the video.
     *
     * @promise GetSeekablePromise
     * @fulfill {Array} Seekable Timeranges converted to an Array.
     */
    /**
     * Get the seekable property of the video.
     *
     * @return {GetSeekablePromise}
     */
  }, {
    key: "getSeekable",
    value: function getSeekable() {
      return this.get("seekable");
    }
    /**
     * A promise to get the seeking property of the player.
     *
     * @promise GetSeekingPromise
     * @fulfill {boolean} Whether or not the player is currently seeking.
     */
    /**
     * Get if the player is currently seeking.
     *
     * @return {GetSeekingPromise}
     */
  }, {
    key: "getSeeking",
    value: function getSeeking() {
      return this.get("seeking");
    }
    /**
     * A promise to get the text tracks of a video.
     *
     * @promise GetTextTracksPromise
     * @fulfill {VimeoTextTrack[]} The text tracks associated with the video.
     */
    /**
     * Get an array of the text tracks that exist for the video.
     *
     * @return {GetTextTracksPromise}
     */
  }, {
    key: "getTextTracks",
    value: function getTextTracks() {
      return this.get("textTracks");
    }
    /**
     * A promise to get the embed code for the video.
     *
     * @promise GetVideoEmbedCodePromise
     * @fulfill {string} The `<iframe>` embed code for the video.
     */
    /**
     * Get the `<iframe>` embed code for the video.
     *
     * @return {GetVideoEmbedCodePromise}
     */
  }, {
    key: "getVideoEmbedCode",
    value: function getVideoEmbedCode() {
      return this.get("videoEmbedCode");
    }
    /**
     * A promise to get the id of the video.
     *
     * @promise GetVideoIdPromise
     * @fulfill {number} The id of the video.
     */
    /**
     * Get the id of the video.
     *
     * @return {GetVideoIdPromise}
     */
  }, {
    key: "getVideoId",
    value: function getVideoId() {
      return this.get("videoId");
    }
    /**
     * A promise to get the title of the video.
     *
     * @promise GetVideoTitlePromise
     * @fulfill {number} The title of the video.
     */
    /**
     * Get the title of the video.
     *
     * @return {GetVideoTitlePromise}
     */
  }, {
    key: "getVideoTitle",
    value: function getVideoTitle() {
      return this.get("videoTitle");
    }
    /**
     * A promise to get the native width of the video.
     *
     * @promise GetVideoWidthPromise
     * @fulfill {number} The native width of the video.
     */
    /**
     * Get the native width of the currently‐playing video. The width of
     * the highest‐resolution available will be used before playback begins.
     *
     * @return {GetVideoWidthPromise}
     */
  }, {
    key: "getVideoWidth",
    value: function getVideoWidth() {
      return this.get("videoWidth");
    }
    /**
     * A promise to get the native height of the video.
     *
     * @promise GetVideoHeightPromise
     * @fulfill {number} The native height of the video.
     */
    /**
     * Get the native height of the currently‐playing video. The height of
     * the highest‐resolution available will be used before playback begins.
     *
     * @return {GetVideoHeightPromise}
     */
  }, {
    key: "getVideoHeight",
    value: function getVideoHeight() {
      return this.get("videoHeight");
    }
    /**
     * A promise to get the vimeo.com url for the video.
     *
     * @promise GetVideoUrlPromise
     * @fulfill {number} The vimeo.com url for the video.
     * @reject {PrivacyError} The url isn’t available because of the video’s privacy setting.
     */
    /**
     * Get the vimeo.com url for the video.
     *
     * @return {GetVideoUrlPromise}
     */
  }, {
    key: "getVideoUrl",
    value: function getVideoUrl() {
      return this.get("videoUrl");
    }
    /**
     * A promise to get the volume level of the player.
     *
     * @promise GetVolumePromise
     * @fulfill {number} The volume level of the player on a scale from 0 to 1.
     */
    /**
     * Get the current volume level of the player on a scale from `0` to `1`.
     *
     * Most mobile devices do not support an independent volume from the
     * system volume. In those cases, this method will always return `1`.
     *
     * @return {GetVolumePromise}
     */
  }, {
    key: "getVolume",
    value: function getVolume() {
      return this.get("volume");
    }
    /**
     * A promise to set the volume level of the player.
     *
     * @promise SetVolumePromise
     * @fulfill {number} The volume was set.
     * @reject {RangeError} The volume was less than 0 or greater than 1.
     */
    /**
     * Set the volume of the player on a scale from `0` to `1`. When set
     * via the API, the volume level will not be synchronized to other
     * players or stored as the viewer’s preference.
     *
     * Most mobile devices do not support setting the volume. An error will
     * *not* be triggered in that situation.
     *
     * @param {number} volume
     * @return {SetVolumePromise}
     */
  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      return this.set("volume", volume);
    }
    /** @typedef {import('./lib/timing-object.types').TimingObject} TimingObject */
    /** @typedef {import('./lib/timing-src-connector.types').TimingSrcConnectorOptions} TimingSrcConnectorOptions */
    /** @typedef {import('./lib/timing-src-connector').TimingSrcConnector} TimingSrcConnector */
    /**
     * Connects a TimingObject to the video player (https://webtiming.github.io/timingobject/)
     *
     * @param {TimingObject} timingObject
     * @param {TimingSrcConnectorOptions} options
     *
     * @return {Promise<TimingSrcConnector>}
     */
  }, {
    key: "setTimingSrc",
    value: function() {
      var _setTimingSrc = _asyncToGenerator(_regeneratorRuntime().mark(function _callee(timingObject, options) {
        var _this6 = this;
        var connector;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (timingObject) {
                _context.next = 2;
                break;
              }
              throw new TypeError("A Timing Object must be provided.");
            case 2:
              _context.next = 4;
              return this.ready();
            case 4:
              connector = new TimingSrcConnector(this, timingObject, options);
              postMessage(this, "notifyTimingObjectConnect");
              connector.addEventListener("disconnect", function() {
                return postMessage(_this6, "notifyTimingObjectDisconnect");
              });
              return _context.abrupt("return", connector);
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function setTimingSrc(_x, _x2) {
        return _setTimingSrc.apply(this, arguments);
      }
      return setTimingSrc;
    }()
  }]);
  return Player2;
}();
if (!isNode) {
  screenfull = initializeScreenfull();
  initializeEmbeds();
  resizeEmbeds();
  initAppendVideoMetadata();
  checkUrlTimeParam();
}
var player_es_default = Player;

// node_modules/vimeo-video-element/dist/vimeo-video-element.js
var EMBED_BASE = "https://player.vimeo.com/video";
var MATCH_SRC = /vimeo\.com\/(?:video\/)?(\d+)(?:\/([\w-]+))?/;
function getTemplateHTML(attrs, props = {}) {
  const iframeAttrs = {
    src: serializeIframeUrl(attrs, props),
    frameborder: 0,
    width: "100%",
    height: "100%",
    allow: "accelerometer; fullscreen; autoplay; encrypted-media; gyroscope; picture-in-picture"
  };
  if (props.config) {
    iframeAttrs["data-config"] = JSON.stringify(props.config);
  }
  return (
    /*html*/
    `
    <style>
      :host {
        display: inline-block;
        min-width: 300px;
        min-height: 150px;
        position: relative;
      }
      iframe {
        position: absolute;
        top: 0;
        left: 0;
      }
      :host(:not([controls])) {
        pointer-events: none;
      }
    </style>
    <iframe${serializeAttributes(iframeAttrs)}></iframe>
  `
  );
}
function serializeIframeUrl(attrs, props) {
  if (!attrs.src) return;
  const matches = attrs.src.match(MATCH_SRC);
  const srcId = matches && matches[1];
  const hParam = matches && matches[2];
  const params = {
    // ?controls=true is enabled by default in the iframe
    controls: attrs.controls === "" ? null : 0,
    autoplay: attrs.autoplay,
    loop: attrs.loop,
    muted: attrs.muted,
    playsinline: attrs.playsinline,
    preload: attrs.preload ?? "metadata",
    transparent: false,
    autopause: attrs.autopause,
    h: hParam,
    // This param is required when the video is Unlisted.
    ...props.config
  };
  return `${EMBED_BASE}/${srcId}?${serialize(params)}`;
}
var _loadRequested, _hasLoaded, _isInit, _currentTime, _duration, _muted, _paused, _playbackRate, _progress, _readyState, _seeking, _volume, _videoWidth, _videoHeight, _config, _VimeoVideoElement_instances, upgradeProperty_fn;
var VimeoVideoElement = class extends (globalThis.HTMLElement ?? class {
}) {
  constructor() {
    super();
    __privateAdd(this, _VimeoVideoElement_instances);
    __publicField(this, "loadComplete", new PublicPromise());
    __privateAdd(this, _loadRequested);
    __privateAdd(this, _hasLoaded);
    __privateAdd(this, _isInit);
    __privateAdd(this, _currentTime, 0);
    __privateAdd(this, _duration, NaN);
    __privateAdd(this, _muted, false);
    __privateAdd(this, _paused, !this.autoplay);
    __privateAdd(this, _playbackRate, 1);
    __privateAdd(this, _progress, 0);
    __privateAdd(this, _readyState, 0);
    __privateAdd(this, _seeking, false);
    __privateAdd(this, _volume, 1);
    __privateAdd(this, _videoWidth, NaN);
    __privateAdd(this, _videoHeight, NaN);
    __privateAdd(this, _config, null);
    __privateMethod(this, _VimeoVideoElement_instances, upgradeProperty_fn).call(this, "config");
  }
  requestFullscreen() {
    var _a, _b;
    return (_b = (_a = this.api) == null ? void 0 : _a.requestFullscreen) == null ? void 0 : _b.call(_a);
  }
  exitFullscreen() {
    var _a, _b;
    return (_b = (_a = this.api) == null ? void 0 : _a.exitFullscreen) == null ? void 0 : _b.call(_a);
  }
  requestPictureInPicture() {
    var _a, _b;
    return (_b = (_a = this.api) == null ? void 0 : _a.requestPictureInPicture) == null ? void 0 : _b.call(_a);
  }
  exitPictureInPicture() {
    var _a, _b;
    return (_b = (_a = this.api) == null ? void 0 : _a.exitPictureInPicture) == null ? void 0 : _b.call(_a);
  }
  get config() {
    return __privateGet(this, _config);
  }
  set config(value) {
    __privateSet(this, _config, value);
  }
  async load() {
    var _a;
    if (__privateGet(this, _loadRequested)) return;
    const isFirstLoad = !__privateGet(this, _hasLoaded);
    if (__privateGet(this, _hasLoaded)) this.loadComplete = new PublicPromise();
    __privateSet(this, _hasLoaded, true);
    await __privateSet(this, _loadRequested, Promise.resolve());
    __privateSet(this, _loadRequested, null);
    __privateSet(this, _currentTime, 0);
    __privateSet(this, _duration, NaN);
    __privateSet(this, _muted, false);
    __privateSet(this, _paused, !this.autoplay);
    __privateSet(this, _playbackRate, 1);
    __privateSet(this, _progress, 0);
    __privateSet(this, _readyState, 0);
    __privateSet(this, _seeking, false);
    __privateSet(this, _volume, 1);
    __privateSet(this, _readyState, 0);
    __privateSet(this, _videoWidth, NaN);
    __privateSet(this, _videoHeight, NaN);
    this.dispatchEvent(new Event("emptied"));
    let oldApi = this.api;
    this.api = null;
    if (!this.src) {
      return;
    }
    this.dispatchEvent(new Event("loadstart"));
    const options = {
      autoplay: this.autoplay,
      controls: this.controls,
      loop: this.loop,
      muted: this.defaultMuted,
      playsinline: this.playsInline,
      preload: this.preload ?? "metadata",
      transparent: false,
      autopause: this.hasAttribute("autopause"),
      ...__privateGet(this, _config)
    };
    const onLoaded = async () => {
      __privateSet(this, _readyState, 1);
      this.dispatchEvent(new Event("loadedmetadata"));
      if (this.api) {
        __privateSet(this, _muted, await this.api.getMuted());
        __privateSet(this, _volume, await this.api.getVolume());
        this.dispatchEvent(new Event("volumechange"));
        __privateSet(this, _duration, await this.api.getDuration());
        this.dispatchEvent(new Event("durationchange"));
      }
      this.dispatchEvent(new Event("loadcomplete"));
      this.loadComplete.resolve();
    };
    if (__privateGet(this, _isInit)) {
      this.api = oldApi;
      await this.api.loadVideo({
        ...options,
        url: this.src
      });
      await onLoaded();
      await this.loadComplete;
      return;
    }
    __privateSet(this, _isInit, true);
    let iframe = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("iframe");
    if (isFirstLoad && iframe) {
      __privateSet(this, _config, JSON.parse(iframe.getAttribute("data-config") || "{}"));
    }
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = getTemplateHTML(namedNodeMapToObject(this.attributes), this);
      iframe = this.shadowRoot.querySelector("iframe");
    }
    this.api = new player_es_default(iframe);
    const onceLoaded = () => {
      this.api.off("loaded", onceLoaded);
      onLoaded();
    };
    this.api.on("loaded", onceLoaded);
    this.api.on("bufferstart", () => {
      if (__privateGet(this, _paused)) {
        __privateSet(this, _paused, false);
        this.dispatchEvent(new Event("play"));
      }
      this.dispatchEvent(new Event("waiting"));
    });
    this.api.on("play", () => {
      if (!__privateGet(this, _paused)) return;
      __privateSet(this, _paused, false);
      this.dispatchEvent(new Event("play"));
    });
    this.api.on("playing", () => {
      __privateSet(this, _readyState, 3);
      __privateSet(this, _paused, false);
      this.dispatchEvent(new Event("playing"));
    });
    this.api.on("seeking", () => {
      __privateSet(this, _seeking, true);
      this.dispatchEvent(new Event("seeking"));
    });
    this.api.on("seeked", () => {
      __privateSet(this, _seeking, false);
      this.dispatchEvent(new Event("seeked"));
    });
    this.api.on("pause", () => {
      __privateSet(this, _paused, true);
      this.dispatchEvent(new Event("pause"));
    });
    this.api.on("ended", () => {
      __privateSet(this, _paused, true);
      this.dispatchEvent(new Event("ended"));
    });
    this.api.on("ratechange", ({ playbackRate }) => {
      __privateSet(this, _playbackRate, playbackRate);
      this.dispatchEvent(new Event("ratechange"));
    });
    this.api.on("volumechange", async ({ volume }) => {
      __privateSet(this, _volume, volume);
      if (this.api) {
        __privateSet(this, _muted, await this.api.getMuted());
      }
      this.dispatchEvent(new Event("volumechange"));
    });
    this.api.on("durationchange", ({ duration }) => {
      __privateSet(this, _duration, duration);
      this.dispatchEvent(new Event("durationchange"));
    });
    this.api.on("timeupdate", ({ seconds }) => {
      __privateSet(this, _currentTime, seconds);
      this.dispatchEvent(new Event("timeupdate"));
    });
    this.api.on("progress", ({ seconds }) => {
      __privateSet(this, _progress, seconds);
      this.dispatchEvent(new Event("progress"));
    });
    this.api.on("resize", ({ videoWidth, videoHeight }) => {
      __privateSet(this, _videoWidth, videoWidth);
      __privateSet(this, _videoHeight, videoHeight);
      this.dispatchEvent(new Event("resize"));
    });
    await this.loadComplete;
  }
  async attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue === newValue) return;
    switch (attrName) {
      case "autoplay":
      case "controls":
      case "src": {
        this.load();
        return;
      }
    }
    await this.loadComplete;
    switch (attrName) {
      case "loop": {
        this.api.setLoop(this.loop);
        break;
      }
    }
  }
  async play() {
    var _a;
    __privateSet(this, _paused, false);
    this.dispatchEvent(new Event("play"));
    await this.loadComplete;
    try {
      await ((_a = this.api) == null ? void 0 : _a.play());
    } catch (error) {
      __privateSet(this, _paused, true);
      this.dispatchEvent(new Event("pause"));
      throw error;
    }
  }
  async pause() {
    var _a;
    await this.loadComplete;
    return (_a = this.api) == null ? void 0 : _a.pause();
  }
  get ended() {
    return __privateGet(this, _currentTime) >= __privateGet(this, _duration);
  }
  get seeking() {
    return __privateGet(this, _seeking);
  }
  get readyState() {
    return __privateGet(this, _readyState);
  }
  get videoWidth() {
    return __privateGet(this, _videoWidth);
  }
  get videoHeight() {
    return __privateGet(this, _videoHeight);
  }
  get src() {
    return this.getAttribute("src");
  }
  set src(val) {
    if (this.src == val) return;
    this.setAttribute("src", val);
  }
  get paused() {
    return __privateGet(this, _paused);
  }
  get duration() {
    return __privateGet(this, _duration);
  }
  get autoplay() {
    return this.hasAttribute("autoplay");
  }
  set autoplay(val) {
    if (this.autoplay == val) return;
    this.toggleAttribute("autoplay", Boolean(val));
  }
  get buffered() {
    if (__privateGet(this, _progress) > 0) {
      return createTimeRanges(0, __privateGet(this, _progress));
    }
    return createTimeRanges();
  }
  get controls() {
    return this.hasAttribute("controls");
  }
  set controls(val) {
    if (this.controls == val) return;
    this.toggleAttribute("controls", Boolean(val));
  }
  get currentTime() {
    return __privateGet(this, _currentTime);
  }
  set currentTime(val) {
    if (this.currentTime == val) return;
    __privateSet(this, _currentTime, val);
    this.loadComplete.then(() => {
      var _a;
      (_a = this.api) == null ? void 0 : _a.setCurrentTime(val);
    });
  }
  get defaultMuted() {
    return this.hasAttribute("muted");
  }
  set defaultMuted(val) {
    if (this.defaultMuted == val) return;
    this.toggleAttribute("muted", Boolean(val));
  }
  get loop() {
    return this.hasAttribute("loop");
  }
  set loop(val) {
    if (this.loop == val) return;
    this.toggleAttribute("loop", Boolean(val));
  }
  get muted() {
    return __privateGet(this, _muted);
  }
  set muted(val) {
    if (this.muted == val) return;
    __privateSet(this, _muted, val);
    this.loadComplete.then(() => {
      var _a;
      (_a = this.api) == null ? void 0 : _a.setMuted(val);
    });
  }
  get playbackRate() {
    return __privateGet(this, _playbackRate);
  }
  set playbackRate(val) {
    if (this.playbackRate == val) return;
    __privateSet(this, _playbackRate, val);
    this.loadComplete.then(() => {
      var _a;
      (_a = this.api) == null ? void 0 : _a.setPlaybackRate(val);
    });
  }
  get playsInline() {
    return this.hasAttribute("playsinline");
  }
  set playsInline(val) {
    if (this.playsInline == val) return;
    this.toggleAttribute("playsinline", Boolean(val));
  }
  get poster() {
    return this.getAttribute("poster");
  }
  set poster(val) {
    if (this.poster == val) return;
    this.setAttribute("poster", `${val}`);
  }
  get volume() {
    return __privateGet(this, _volume);
  }
  set volume(val) {
    if (this.volume == val) return;
    __privateSet(this, _volume, val);
    this.loadComplete.then(() => {
      var _a;
      (_a = this.api) == null ? void 0 : _a.setVolume(val);
    });
  }
};
_loadRequested = new WeakMap();
_hasLoaded = new WeakMap();
_isInit = new WeakMap();
_currentTime = new WeakMap();
_duration = new WeakMap();
_muted = new WeakMap();
_paused = new WeakMap();
_playbackRate = new WeakMap();
_progress = new WeakMap();
_readyState = new WeakMap();
_seeking = new WeakMap();
_volume = new WeakMap();
_videoWidth = new WeakMap();
_videoHeight = new WeakMap();
_config = new WeakMap();
_VimeoVideoElement_instances = new WeakSet();
// This is a pattern to update property values that are set before
// the custom element is upgraded.
// https://web.dev/custom-elements-best-practices/#make-properties-lazy
upgradeProperty_fn = function(prop) {
  if (Object.prototype.hasOwnProperty.call(this, prop)) {
    const value = this[prop];
    delete this[prop];
    this[prop] = value;
  }
};
__publicField(VimeoVideoElement, "getTemplateHTML", getTemplateHTML);
__publicField(VimeoVideoElement, "shadowRootOptions", { mode: "open" });
__publicField(VimeoVideoElement, "observedAttributes", [
  "autoplay",
  "controls",
  "crossorigin",
  "loop",
  "muted",
  "playsinline",
  "poster",
  "preload",
  "src"
]);
function serializeAttributes(attrs) {
  let html = "";
  for (const key in attrs) {
    const value = attrs[key];
    if (value === "") html += ` ${escapeHtml(key)}`;
    else html += ` ${escapeHtml(key)}="${escapeHtml(`${value}`)}"`;
  }
  return html;
}
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/`/g, "&#x60;");
}
function serialize(props) {
  return String(new URLSearchParams(boolToBinary(props)));
}
function boolToBinary(props) {
  let p = {};
  for (let key in props) {
    let val = props[key];
    if (val === true || val === "") p[key] = 1;
    else if (val === false) p[key] = 0;
    else if (val != null) p[key] = val;
  }
  return p;
}
function namedNodeMapToObject(namedNodeMap) {
  let obj = {};
  for (let attr of namedNodeMap) {
    obj[attr.name] = attr.value;
  }
  return obj;
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
function createTimeRanges(start, end) {
  if (Array.isArray(start)) {
    return createTimeRangesObj(start);
  } else if (start == null || end == null || start === 0 && end === 0) {
    return createTimeRangesObj([[0, 0]]);
  }
  return createTimeRangesObj([[start, end]]);
}
function createTimeRangesObj(ranges) {
  Object.defineProperties(ranges, {
    start: {
      value: (i) => ranges[i][0]
    },
    end: {
      value: (i) => ranges[i][1]
    }
  });
  return ranges;
}
if (globalThis.customElements && !globalThis.customElements.get("vimeo-video")) {
  globalThis.customElements.define("vimeo-video", VimeoVideoElement);
}
var vimeo_video_element_default = VimeoVideoElement;

// node_modules/vimeo-video-element/dist/react.js
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
  tagName: "vimeo-video",
  elementClass: vimeo_video_element_default
});
export {
  react_default as default
};
/*! Bundled license information:

@vimeo/player/dist/player.es.js:
  (*! @vimeo/player v2.29.0 | (c) 2025 Vimeo | MIT License | https://github.com/vimeo/player.js *)
  (*!
   * weakmap-polyfill v2.0.4 - ECMAScript6 WeakMap polyfill
   * https://github.com/polygonplanet/weakmap-polyfill
   * Copyright (c) 2015-2021 polygonplanet <polygon.planet.aqua@gmail.com>
   * @license MIT
   *)
  (*! Native Promise Only
      v0.8.1 (c) Kyle Simpson
      MIT License: http://getify.mit-license.org
  *)

vimeo-video-element/dist/react.js:
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
//# sourceMappingURL=react-HVY3J7SE.js.map
