import "../../../assets/js/modulepreload-polyfill.js";
import { r as react, j as jsxDEV, a as addHmrIntoView, c as createRoot, F as Fragment } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
import { a as attachTwindStyle } from "../../../assets/js/twind.js";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const index = "";
const Popup$2 = "";
const storageMap = /* @__PURE__ */ new Map();
function useStorage(storage2) {
  const _data = react.exports.useSyncExternalStore(storage2.subscribe, storage2.getSnapshot);
  if (!storageMap.has(storage2)) {
    storageMap.set(storage2, wrapPromise(storage2.get()));
  }
  if (_data !== null) {
    storageMap.set(storage2, {
      read: () => _data
    });
  }
  return _data != null ? _data : storageMap.get(storage2).read();
}
function wrapPromise(promise) {
  let status = "pending";
  let result;
  const suspender = promise.then((r) => {
    status = "success";
    result = r;
  }, (e) => {
    status = "error";
    result = e;
  });
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}
var StorageType = /* @__PURE__ */ ((StorageType2) => {
  StorageType2["Local"] = "local";
  StorageType2["Sync"] = "sync";
  StorageType2["Managed"] = "managed";
  StorageType2["Session"] = "session";
  return StorageType2;
})(StorageType || {});
function createStorage(key, fallback, config) {
  var _a;
  let cache = null;
  let listeners = [];
  const storageType = (_a = config == null ? void 0 : config.storageType) != null ? _a : "local";
  const _getDataFromStorage = async () => {
    var _a2;
    if (chrome.storage[storageType] === void 0) {
      throw new Error(
        `Check your storage permission into manifest.json: ${storageType} is not defined`
      );
    }
    const value = await chrome.storage[storageType].get([key]);
    return (_a2 = value[key]) != null ? _a2 : fallback;
  };
  const _emitChange = () => {
    listeners.forEach((listener) => listener());
  };
  const set = async (valueOrUpdate) => {
    if (typeof valueOrUpdate === "function") {
      if (valueOrUpdate.hasOwnProperty("then")) {
        cache = await valueOrUpdate(cache);
      } else {
        cache = valueOrUpdate(cache);
      }
    } else {
      cache = valueOrUpdate;
    }
    await chrome.storage[storageType].set({ [key]: cache });
    _emitChange();
  };
  const subscribe = (listener) => {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };
  const getSnapshot = () => {
    return cache;
  };
  _getDataFromStorage().then((data2) => {
    cache = data2;
    _emitChange();
  });
  return {
    get: _getDataFromStorage,
    set,
    getSnapshot,
    subscribe
  };
}
const storage = createStorage("theme-storage-key", "light", {
  storageType: StorageType.Local
});
const exampleThemeStorage = {
  ...storage,
  toggle: () => {
    storage.set((currentTheme) => {
      return currentTheme === "light" ? "dark" : "light";
    });
  }
};
var _jsxFileName$2 = "C:\\Users\\ragha\\OneDrive\\Desktop\\prompt-me-pro\\src\\shared\\hoc\\withSuspense.tsx";
function withSuspense(Component, SuspenseComponent = null) {
  return function WithSuspense(props) {
    return /* @__PURE__ */ jsxDEV(react.exports.Suspense, {
      fallback: SuspenseComponent,
      children: /* @__PURE__ */ jsxDEV(Component, {
        ...props
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 10,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 9,
      columnNumber: 7
    }, this);
  };
}
var dist = {};
var api = {};
var axios$2 = { exports: {} };
var axios$1 = { exports: {} };
var bind$2 = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};
var bind$1 = bind$2;
var toString = Object.prototype.toString;
function isArray(val) {
  return Array.isArray(val);
}
function isUndefined(val) {
  return typeof val === "undefined";
}
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
}
function isArrayBuffer(val) {
  return toString.call(val) === "[object ArrayBuffer]";
}
function isFormData(val) {
  return toString.call(val) === "[object FormData]";
}
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
function isString(val) {
  return typeof val === "string";
}
function isNumber(val) {
  return typeof val === "number";
}
function isObject(val) {
  return val !== null && typeof val === "object";
}
function isPlainObject(val) {
  if (toString.call(val) !== "[object Object]") {
    return false;
  }
  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}
function isDate(val) {
  return toString.call(val) === "[object Date]";
}
function isFile(val) {
  return toString.call(val) === "[object File]";
}
function isBlob(val) {
  return toString.call(val) === "[object Blob]";
}
function isFunction(val) {
  return toString.call(val) === "[object Function]";
}
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
function isURLSearchParams(val) {
  return toString.call(val) === "[object URLSearchParams]";
}
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
function isStandardBrowserEnv() {
  if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
    return false;
  }
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function forEach(obj, fn) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
function merge() {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === "function") {
      a[key] = bind$1(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
function stripBOM(content) {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
}
var utils$9 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isFunction,
  isStream,
  isURLSearchParams,
  isStandardBrowserEnv,
  forEach,
  merge,
  extend,
  trim,
  stripBOM
};
var utils$8 = utils$9;
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var buildURL$1 = function buildURL(url, params, paramsSerializer) {
  if (!params) {
    return url;
  }
  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$8.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils$8.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === "undefined") {
        return;
      }
      if (utils$8.isArray(val)) {
        key = key + "[]";
      } else {
        val = [val];
      }
      utils$8.forEach(val, function parseValue(v) {
        if (utils$8.isDate(v)) {
          v = v.toISOString();
        } else if (utils$8.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + "=" + encode(v));
      });
    });
    serializedParams = parts.join("&");
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
};
var utils$7 = utils$9;
function InterceptorManager$1() {
  this.handlers = [];
}
InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled,
    rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};
InterceptorManager$1.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
InterceptorManager$1.prototype.forEach = function forEach2(fn) {
  utils$7.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};
var InterceptorManager_1 = InterceptorManager$1;
var utils$6 = utils$9;
var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
  utils$6.forEach(headers, function processHeader(value, name2) {
    if (name2 !== normalizedName && name2.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name2];
    }
  });
};
var enhanceError$1 = function enhanceError(error, config, code, request2, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request2;
  error.response = response;
  error.isAxiosError = true;
  error.toJSON = function toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };
  return error;
};
var transitional = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
var createError;
var hasRequiredCreateError;
function requireCreateError() {
  if (hasRequiredCreateError)
    return createError;
  hasRequiredCreateError = 1;
  var enhanceError3 = enhanceError$1;
  createError = function createError2(message, config, code, request2, response) {
    var error = new Error(message);
    return enhanceError3(error, config, code, request2, response);
  };
  return createError;
}
var settle;
var hasRequiredSettle;
function requireSettle() {
  if (hasRequiredSettle)
    return settle;
  hasRequiredSettle = 1;
  var createError2 = requireCreateError();
  settle = function settle2(resolve, reject, response) {
    var validateStatus2 = response.config.validateStatus;
    if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
      resolve(response);
    } else {
      reject(createError2(
        "Request failed with status code " + response.status,
        response.config,
        null,
        response.request,
        response
      ));
    }
  };
  return settle;
}
var cookies;
var hasRequiredCookies;
function requireCookies() {
  if (hasRequiredCookies)
    return cookies;
  hasRequiredCookies = 1;
  var utils2 = utils$9;
  cookies = utils2.isStandardBrowserEnv() ? function standardBrowserEnv() {
    return {
      write: function write(name2, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name2 + "=" + encodeURIComponent(value));
        if (utils2.isNumber(expires)) {
          cookie.push("expires=" + new Date(expires).toGMTString());
        }
        if (utils2.isString(path)) {
          cookie.push("path=" + path);
        }
        if (utils2.isString(domain)) {
          cookie.push("domain=" + domain);
        }
        if (secure === true) {
          cookie.push("secure");
        }
        document.cookie = cookie.join("; ");
      },
      read: function read(name2) {
        var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name2 + ")=([^;]*)"));
        return match ? decodeURIComponent(match[3]) : null;
      },
      remove: function remove(name2) {
        this.write(name2, "", Date.now() - 864e5);
      }
    };
  }() : function nonStandardBrowserEnv() {
    return {
      write: function write() {
      },
      read: function read() {
        return null;
      },
      remove: function remove() {
      }
    };
  }();
  return cookies;
}
var isAbsoluteURL;
var hasRequiredIsAbsoluteURL;
function requireIsAbsoluteURL() {
  if (hasRequiredIsAbsoluteURL)
    return isAbsoluteURL;
  hasRequiredIsAbsoluteURL = 1;
  isAbsoluteURL = function isAbsoluteURL2(url) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  };
  return isAbsoluteURL;
}
var combineURLs;
var hasRequiredCombineURLs;
function requireCombineURLs() {
  if (hasRequiredCombineURLs)
    return combineURLs;
  hasRequiredCombineURLs = 1;
  combineURLs = function combineURLs2(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  };
  return combineURLs;
}
var buildFullPath;
var hasRequiredBuildFullPath;
function requireBuildFullPath() {
  if (hasRequiredBuildFullPath)
    return buildFullPath;
  hasRequiredBuildFullPath = 1;
  var isAbsoluteURL2 = requireIsAbsoluteURL();
  var combineURLs2 = requireCombineURLs();
  buildFullPath = function buildFullPath2(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL2(requestedURL)) {
      return combineURLs2(baseURL, requestedURL);
    }
    return requestedURL;
  };
  return buildFullPath;
}
var parseHeaders;
var hasRequiredParseHeaders;
function requireParseHeaders() {
  if (hasRequiredParseHeaders)
    return parseHeaders;
  hasRequiredParseHeaders = 1;
  var utils2 = utils$9;
  var ignoreDuplicateOf = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ];
  parseHeaders = function parseHeaders2(headers) {
    var parsed = {};
    var key;
    var val;
    var i;
    if (!headers) {
      return parsed;
    }
    utils2.forEach(headers.split("\n"), function parser(line) {
      i = line.indexOf(":");
      key = utils2.trim(line.substr(0, i)).toLowerCase();
      val = utils2.trim(line.substr(i + 1));
      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === "set-cookie") {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
        }
      }
    });
    return parsed;
  };
  return parseHeaders;
}
var isURLSameOrigin;
var hasRequiredIsURLSameOrigin;
function requireIsURLSameOrigin() {
  if (hasRequiredIsURLSameOrigin)
    return isURLSameOrigin;
  hasRequiredIsURLSameOrigin = 1;
  var utils2 = utils$9;
  isURLSameOrigin = utils2.isStandardBrowserEnv() ? function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement("a");
    var originURL;
    function resolveURL(url) {
      var href = url;
      if (msie) {
        urlParsingNode.setAttribute("href", href);
        href = urlParsingNode.href;
      }
      urlParsingNode.setAttribute("href", href);
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
      };
    }
    originURL = resolveURL(window.location.href);
    return function isURLSameOrigin2(requestURL) {
      var parsed = utils2.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }() : function nonStandardBrowserEnv() {
    return function isURLSameOrigin2() {
      return true;
    };
  }();
  return isURLSameOrigin;
}
var Cancel_1;
var hasRequiredCancel;
function requireCancel() {
  if (hasRequiredCancel)
    return Cancel_1;
  hasRequiredCancel = 1;
  function Cancel2(message) {
    this.message = message;
  }
  Cancel2.prototype.toString = function toString2() {
    return "Cancel" + (this.message ? ": " + this.message : "");
  };
  Cancel2.prototype.__CANCEL__ = true;
  Cancel_1 = Cancel2;
  return Cancel_1;
}
var xhr;
var hasRequiredXhr;
function requireXhr() {
  if (hasRequiredXhr)
    return xhr;
  hasRequiredXhr = 1;
  var utils2 = utils$9;
  var settle2 = requireSettle();
  var cookies2 = requireCookies();
  var buildURL3 = buildURL$1;
  var buildFullPath2 = requireBuildFullPath();
  var parseHeaders2 = requireParseHeaders();
  var isURLSameOrigin2 = requireIsURLSameOrigin();
  var createError2 = requireCreateError();
  var transitionalDefaults2 = transitional;
  var Cancel2 = requireCancel();
  xhr = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;
      var responseType = config.responseType;
      var onCanceled;
      function done() {
        if (config.cancelToken) {
          config.cancelToken.unsubscribe(onCanceled);
        }
        if (config.signal) {
          config.signal.removeEventListener("abort", onCanceled);
        }
      }
      if (utils2.isFormData(requestData)) {
        delete requestHeaders["Content-Type"];
      }
      var request2 = new XMLHttpRequest();
      if (config.auth) {
        var username = config.auth.username || "";
        var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
        requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
      }
      var fullPath = buildFullPath2(config.baseURL, config.url);
      request2.open(config.method.toUpperCase(), buildURL3(fullPath, config.params, config.paramsSerializer), true);
      request2.timeout = config.timeout;
      function onloadend() {
        if (!request2) {
          return;
        }
        var responseHeaders = "getAllResponseHeaders" in request2 ? parseHeaders2(request2.getAllResponseHeaders()) : null;
        var responseData = !responseType || responseType === "text" || responseType === "json" ? request2.responseText : request2.response;
        var response = {
          data: responseData,
          status: request2.status,
          statusText: request2.statusText,
          headers: responseHeaders,
          config,
          request: request2
        };
        settle2(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);
        request2 = null;
      }
      if ("onloadend" in request2) {
        request2.onloadend = onloadend;
      } else {
        request2.onreadystatechange = function handleLoad() {
          if (!request2 || request2.readyState !== 4) {
            return;
          }
          if (request2.status === 0 && !(request2.responseURL && request2.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request2.onabort = function handleAbort() {
        if (!request2) {
          return;
        }
        reject(createError2("Request aborted", config, "ECONNABORTED", request2));
        request2 = null;
      };
      request2.onerror = function handleError() {
        reject(createError2("Network Error", config, null, request2));
        request2 = null;
      };
      request2.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
        var transitional3 = config.transitional || transitionalDefaults2;
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(createError2(
          timeoutErrorMessage,
          config,
          transitional3.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED",
          request2
        ));
        request2 = null;
      };
      if (utils2.isStandardBrowserEnv()) {
        var xsrfValue = (config.withCredentials || isURLSameOrigin2(fullPath)) && config.xsrfCookieName ? cookies2.read(config.xsrfCookieName) : void 0;
        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }
      if ("setRequestHeader" in request2) {
        utils2.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
            delete requestHeaders[key];
          } else {
            request2.setRequestHeader(key, val);
          }
        });
      }
      if (!utils2.isUndefined(config.withCredentials)) {
        request2.withCredentials = !!config.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request2.responseType = config.responseType;
      }
      if (typeof config.onDownloadProgress === "function") {
        request2.addEventListener("progress", config.onDownloadProgress);
      }
      if (typeof config.onUploadProgress === "function" && request2.upload) {
        request2.upload.addEventListener("progress", config.onUploadProgress);
      }
      if (config.cancelToken || config.signal) {
        onCanceled = function(cancel) {
          if (!request2) {
            return;
          }
          reject(!cancel || cancel && cancel.type ? new Cancel2("canceled") : cancel);
          request2.abort();
          request2 = null;
        };
        config.cancelToken && config.cancelToken.subscribe(onCanceled);
        if (config.signal) {
          config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
        }
      }
      if (!requestData) {
        requestData = null;
      }
      request2.send(requestData);
    });
  };
  return xhr;
}
var utils$5 = utils$9;
var normalizeHeaderName2 = normalizeHeaderName$1;
var enhanceError2 = enhanceError$1;
var transitionalDefaults = transitional;
var DEFAULT_CONTENT_TYPE = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function setContentTypeIfUnset(headers, value) {
  if (!utils$5.isUndefined(headers) && utils$5.isUndefined(headers["Content-Type"])) {
    headers["Content-Type"] = value;
  }
}
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== "undefined") {
    adapter = requireXhr();
  } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
    adapter = requireXhr();
  }
  return adapter;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$5.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$5.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults$3 = {
  transitional: transitionalDefaults,
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data2, headers) {
    normalizeHeaderName2(headers, "Accept");
    normalizeHeaderName2(headers, "Content-Type");
    if (utils$5.isFormData(data2) || utils$5.isArrayBuffer(data2) || utils$5.isBuffer(data2) || utils$5.isStream(data2) || utils$5.isFile(data2) || utils$5.isBlob(data2)) {
      return data2;
    }
    if (utils$5.isArrayBufferView(data2)) {
      return data2.buffer;
    }
    if (utils$5.isURLSearchParams(data2)) {
      setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
      return data2.toString();
    }
    if (utils$5.isObject(data2) || headers && headers["Content-Type"] === "application/json") {
      setContentTypeIfUnset(headers, "application/json");
      return stringifySafely(data2);
    }
    return data2;
  }],
  transformResponse: [function transformResponse(data2) {
    var transitional3 = this.transitional || defaults$3.transitional;
    var silentJSONParsing = transitional3 && transitional3.silentJSONParsing;
    var forcedJSONParsing = transitional3 && transitional3.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
    if (strictJSONParsing || forcedJSONParsing && utils$5.isString(data2) && data2.length) {
      try {
        return JSON.parse(data2);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw enhanceError2(e, this, "E_JSON_PARSE");
          }
          throw e;
        }
      }
    }
    return data2;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*"
    }
  }
};
utils$5.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
  defaults$3.headers[method] = {};
});
utils$5.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  defaults$3.headers[method] = utils$5.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults$3;
var utils$4 = utils$9;
var defaults$2 = defaults_1;
var transformData$1 = function transformData(data2, headers, fns) {
  var context = this || defaults$2;
  utils$4.forEach(fns, function transform(fn) {
    data2 = fn.call(context, data2, headers);
  });
  return data2;
};
var isCancel$1;
var hasRequiredIsCancel;
function requireIsCancel() {
  if (hasRequiredIsCancel)
    return isCancel$1;
  hasRequiredIsCancel = 1;
  isCancel$1 = function isCancel2(value) {
    return !!(value && value.__CANCEL__);
  };
  return isCancel$1;
}
var utils$3 = utils$9;
var transformData2 = transformData$1;
var isCancel = requireIsCancel();
var defaults$1 = defaults_1;
var Cancel = requireCancel();
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new Cancel("canceled");
  }
}
var dispatchRequest$1 = function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = config.headers || {};
  config.data = transformData2.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );
  config.headers = utils$3.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );
  utils$3.forEach(
    ["delete", "get", "head", "post", "put", "patch", "common"],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );
  var adapter = config.adapter || defaults$1.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData2.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData2.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }
    return Promise.reject(reason);
  });
};
var utils$2 = utils$9;
var mergeConfig$2 = function mergeConfig(config1, config2) {
  config2 = config2 || {};
  var config = {};
  function getMergedValue(target, source) {
    if (utils$2.isPlainObject(target) && utils$2.isPlainObject(source)) {
      return utils$2.merge(target, source);
    } else if (utils$2.isPlainObject(source)) {
      return utils$2.merge({}, source);
    } else if (utils$2.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(prop) {
    if (!utils$2.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils$2.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function valueFromConfig2(prop) {
    if (!utils$2.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    }
  }
  function defaultToConfig2(prop) {
    if (!utils$2.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    } else if (!utils$2.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  var mergeMap = {
    "url": valueFromConfig2,
    "method": valueFromConfig2,
    "data": valueFromConfig2,
    "baseURL": defaultToConfig2,
    "transformRequest": defaultToConfig2,
    "transformResponse": defaultToConfig2,
    "paramsSerializer": defaultToConfig2,
    "timeout": defaultToConfig2,
    "timeoutMessage": defaultToConfig2,
    "withCredentials": defaultToConfig2,
    "adapter": defaultToConfig2,
    "responseType": defaultToConfig2,
    "xsrfCookieName": defaultToConfig2,
    "xsrfHeaderName": defaultToConfig2,
    "onUploadProgress": defaultToConfig2,
    "onDownloadProgress": defaultToConfig2,
    "decompress": defaultToConfig2,
    "maxContentLength": defaultToConfig2,
    "maxBodyLength": defaultToConfig2,
    "transport": defaultToConfig2,
    "httpAgent": defaultToConfig2,
    "httpsAgent": defaultToConfig2,
    "cancelToken": defaultToConfig2,
    "socketPath": defaultToConfig2,
    "responseEncoding": defaultToConfig2,
    "validateStatus": mergeDirectKeys
  };
  utils$2.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge2 = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge2(prop);
    utils$2.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
};
var data;
var hasRequiredData;
function requireData() {
  if (hasRequiredData)
    return data;
  hasRequiredData = 1;
  data = {
    "version": "0.26.1"
  };
  return data;
}
var VERSION = requireData().version;
var validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
var deprecatedWarnings = {};
validators$1.transitional = function transitional2(validator2, version2, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return function(value, opt, opts) {
    if (validator2 === false) {
      throw new Error(formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")));
    }
    if (version2 && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version2 + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new TypeError("options must be an object");
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator2 = schema[opt];
    if (validator2) {
      var value = options[opt];
      var result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new TypeError("option " + opt + " must be " + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error("Unknown option " + opt);
    }
  }
}
var validator$1 = {
  assertOptions,
  validators: validators$1
};
var utils$1 = utils$9;
var buildURL2 = buildURL$1;
var InterceptorManager = InterceptorManager_1;
var dispatchRequest2 = dispatchRequest$1;
var mergeConfig$1 = mergeConfig$2;
var validator = validator$1;
var validators = validator.validators;
function Axios$1(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
Axios$1.prototype.request = function request(configOrUrl, config) {
  if (typeof configOrUrl === "string") {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }
  config = mergeConfig$1(this.defaults, config);
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = "get";
  }
  var transitional3 = config.transitional;
  if (transitional3 !== void 0) {
    validator.assertOptions(transitional3, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
      return;
    }
    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });
  var promise;
  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest2, void 0];
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);
    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }
  try {
    promise = dispatchRequest2(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }
  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }
  return promise;
};
Axios$1.prototype.getUri = function getUri(config) {
  config = mergeConfig$1(this.defaults, config);
  return buildURL2(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData2(method) {
  Axios$1.prototype[method] = function(url, data2, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: data2
    }));
  };
});
var Axios_1 = Axios$1;
var CancelToken_1;
var hasRequiredCancelToken;
function requireCancelToken() {
  if (hasRequiredCancelToken)
    return CancelToken_1;
  hasRequiredCancelToken = 1;
  var Cancel2 = requireCancel();
  function CancelToken(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    var token = this;
    this.promise.then(function(cancel) {
      if (!token._listeners)
        return;
      var i;
      var l = token._listeners.length;
      for (i = 0; i < l; i++) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = function(onfulfilled) {
      var _resolve;
      var promise = new Promise(function(resolve) {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message) {
      if (token.reason) {
        return;
      }
      token.reason = new Cancel2(message);
      resolvePromise(token.reason);
    });
  }
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };
  CancelToken.prototype.subscribe = function subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  };
  CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    var index2 = this._listeners.indexOf(listener);
    if (index2 !== -1) {
      this._listeners.splice(index2, 1);
    }
  };
  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  };
  CancelToken_1 = CancelToken;
  return CancelToken_1;
}
var spread;
var hasRequiredSpread;
function requireSpread() {
  if (hasRequiredSpread)
    return spread;
  hasRequiredSpread = 1;
  spread = function spread2(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };
  return spread;
}
var isAxiosError;
var hasRequiredIsAxiosError;
function requireIsAxiosError() {
  if (hasRequiredIsAxiosError)
    return isAxiosError;
  hasRequiredIsAxiosError = 1;
  var utils2 = utils$9;
  isAxiosError = function isAxiosError2(payload) {
    return utils2.isObject(payload) && payload.isAxiosError === true;
  };
  return isAxiosError;
}
var utils = utils$9;
var bind2 = bind$2;
var Axios = Axios_1;
var mergeConfig2 = mergeConfig$2;
var defaults = defaults_1;
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind2(Axios.prototype.request, context);
  utils.extend(instance, Axios.prototype, context);
  utils.extend(instance, context);
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig2(defaultConfig, instanceConfig));
  };
  return instance;
}
var axios = createInstance(defaults);
axios.Axios = Axios;
axios.Cancel = requireCancel();
axios.CancelToken = requireCancelToken();
axios.isCancel = requireIsCancel();
axios.VERSION = requireData().version;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = requireSpread();
axios.isAxiosError = requireIsAxiosError();
axios$1.exports = axios;
axios$1.exports.default = axios;
(function(module) {
  module.exports = axios$1.exports;
})(axios$2);
var common = {};
var base = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RequiredError = exports.BaseAPI = exports.COLLECTION_FORMATS = exports.BASE_PATH = void 0;
  const axios_1 = axios$2.exports;
  exports.BASE_PATH = "https://api.openai.com/v1".replace(/\/+$/, "");
  exports.COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "	",
    pipes: "|"
  };
  class BaseAPI {
    constructor(configuration2, basePath = exports.BASE_PATH, axios2 = axios_1.default) {
      this.basePath = basePath;
      this.axios = axios2;
      if (configuration2) {
        this.configuration = configuration2;
        this.basePath = configuration2.basePath || this.basePath;
      }
    }
  }
  exports.BaseAPI = BaseAPI;
  class RequiredError extends Error {
    constructor(field, msg) {
      super(msg);
      this.field = field;
      this.name = "RequiredError";
    }
  }
  exports.RequiredError = RequiredError;
})(base);
var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(common, "__esModule", { value: true });
common.createRequestFunction = common.toPathString = common.serializeDataIfNeeded = common.setSearchParams = common.setOAuthToObject = common.setBearerAuthToObject = common.setBasicAuthToObject = common.setApiKeyToObject = common.assertParamExists = common.DUMMY_BASE_URL = void 0;
const base_1 = base;
common.DUMMY_BASE_URL = "https://example.com";
common.assertParamExists = function(functionName, paramName, paramValue) {
  if (paramValue === null || paramValue === void 0) {
    throw new base_1.RequiredError(paramName, `Required parameter ${paramName} was null or undefined when calling ${functionName}.`);
  }
};
common.setApiKeyToObject = function(object, keyParamName, configuration2) {
  return __awaiter(this, void 0, void 0, function* () {
    if (configuration2 && configuration2.apiKey) {
      const localVarApiKeyValue = typeof configuration2.apiKey === "function" ? yield configuration2.apiKey(keyParamName) : yield configuration2.apiKey;
      object[keyParamName] = localVarApiKeyValue;
    }
  });
};
common.setBasicAuthToObject = function(object, configuration2) {
  if (configuration2 && (configuration2.username || configuration2.password)) {
    object["auth"] = { username: configuration2.username, password: configuration2.password };
  }
};
common.setBearerAuthToObject = function(object, configuration2) {
  return __awaiter(this, void 0, void 0, function* () {
    if (configuration2 && configuration2.accessToken) {
      const accessToken = typeof configuration2.accessToken === "function" ? yield configuration2.accessToken() : yield configuration2.accessToken;
      object["Authorization"] = "Bearer " + accessToken;
    }
  });
};
common.setOAuthToObject = function(object, name2, scopes, configuration2) {
  return __awaiter(this, void 0, void 0, function* () {
    if (configuration2 && configuration2.accessToken) {
      const localVarAccessTokenValue = typeof configuration2.accessToken === "function" ? yield configuration2.accessToken(name2, scopes) : yield configuration2.accessToken;
      object["Authorization"] = "Bearer " + localVarAccessTokenValue;
    }
  });
};
function setFlattenedQueryParams(urlSearchParams, parameter, key = "") {
  if (parameter == null)
    return;
  if (typeof parameter === "object") {
    if (Array.isArray(parameter)) {
      parameter.forEach((item) => setFlattenedQueryParams(urlSearchParams, item, key));
    } else {
      Object.keys(parameter).forEach((currentKey) => setFlattenedQueryParams(urlSearchParams, parameter[currentKey], `${key}${key !== "" ? "." : ""}${currentKey}`));
    }
  } else {
    if (urlSearchParams.has(key)) {
      urlSearchParams.append(key, parameter);
    } else {
      urlSearchParams.set(key, parameter);
    }
  }
}
common.setSearchParams = function(url, ...objects) {
  const searchParams = new URLSearchParams(url.search);
  setFlattenedQueryParams(searchParams, objects);
  url.search = searchParams.toString();
};
common.serializeDataIfNeeded = function(value, requestOptions, configuration2) {
  const nonString = typeof value !== "string";
  const needsSerialization = nonString && configuration2 && configuration2.isJsonMime ? configuration2.isJsonMime(requestOptions.headers["Content-Type"]) : nonString;
  return needsSerialization ? JSON.stringify(value !== void 0 ? value : {}) : value || "";
};
common.toPathString = function(url) {
  return url.pathname + url.search + url.hash;
};
common.createRequestFunction = function(axiosArgs, globalAxios, BASE_PATH, configuration2) {
  return (axios2 = globalAxios, basePath = BASE_PATH) => {
    const axiosRequestArgs = Object.assign(Object.assign({}, axiosArgs.options), { url: ((configuration2 === null || configuration2 === void 0 ? void 0 : configuration2.basePath) || basePath) + axiosArgs.url });
    return axios2.request(axiosRequestArgs);
  };
};
(function(exports) {
  var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.OpenAIApi = exports.OpenAIApiFactory = exports.OpenAIApiFp = exports.OpenAIApiAxiosParamCreator = exports.CreateImageRequestResponseFormatEnum = exports.CreateImageRequestSizeEnum = exports.ChatCompletionResponseMessageRoleEnum = exports.ChatCompletionRequestMessageRoleEnum = void 0;
  const axios_1 = axios$2.exports;
  const common_1 = common;
  const base_12 = base;
  exports.ChatCompletionRequestMessageRoleEnum = {
    System: "system",
    User: "user",
    Assistant: "assistant",
    Function: "function"
  };
  exports.ChatCompletionResponseMessageRoleEnum = {
    System: "system",
    User: "user",
    Assistant: "assistant",
    Function: "function"
  };
  exports.CreateImageRequestSizeEnum = {
    _256x256: "256x256",
    _512x512: "512x512",
    _1024x1024: "1024x1024"
  };
  exports.CreateImageRequestResponseFormatEnum = {
    Url: "url",
    B64Json: "b64_json"
  };
  exports.OpenAIApiAxiosParamCreator = function(configuration2) {
    return {
      cancelFineTune: (fineTuneId, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("cancelFineTune", "fineTuneId", fineTuneId);
        const localVarPath = `/fine-tunes/{fine_tune_id}/cancel`.replace(`{${"fine_tune_id"}}`, encodeURIComponent(String(fineTuneId)));
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      createAnswer: (createAnswerRequest, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("createAnswer", "createAnswerRequest", createAnswerRequest);
        const localVarPath = `/answers`;
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        localVarHeaderParameter["Content-Type"] = "application/json";
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        localVarRequestOptions.data = common_1.serializeDataIfNeeded(createAnswerRequest, localVarRequestOptions, configuration2);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      createChatCompletion: (createChatCompletionRequest, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("createChatCompletion", "createChatCompletionRequest", createChatCompletionRequest);
        const localVarPath = `/chat/completions`;
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        localVarHeaderParameter["Content-Type"] = "application/json";
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        localVarRequestOptions.data = common_1.serializeDataIfNeeded(createChatCompletionRequest, localVarRequestOptions, configuration2);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      createClassification: (createClassificationRequest, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("createClassification", "createClassificationRequest", createClassificationRequest);
        const localVarPath = `/classifications`;
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        localVarHeaderParameter["Content-Type"] = "application/json";
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        localVarRequestOptions.data = common_1.serializeDataIfNeeded(createClassificationRequest, localVarRequestOptions, configuration2);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      createCompletion: (createCompletionRequest, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("createCompletion", "createCompletionRequest", createCompletionRequest);
        const localVarPath = `/completions`;
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        localVarHeaderParameter["Content-Type"] = "application/json";
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        localVarRequestOptions.data = common_1.serializeDataIfNeeded(createCompletionRequest, localVarRequestOptions, configuration2);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      createEdit: (createEditRequest, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("createEdit", "createEditRequest", createEditRequest);
        const localVarPath = `/edits`;
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        localVarHeaderParameter["Content-Type"] = "application/json";
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        localVarRequestOptions.data = common_1.serializeDataIfNeeded(createEditRequest, localVarRequestOptions, configuration2);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      createEmbedding: (createEmbeddingRequest, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("createEmbedding", "createEmbeddingRequest", createEmbeddingRequest);
        const localVarPath = `/embeddings`;
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        localVarHeaderParameter["Content-Type"] = "application/json";
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        localVarRequestOptions.data = common_1.serializeDataIfNeeded(createEmbeddingRequest, localVarRequestOptions, configuration2);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      createFile: (file, purpose, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("createFile", "file", file);
        common_1.assertParamExists("createFile", "purpose", purpose);
        const localVarPath = `/files`;
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        const localVarFormParams = new (configuration2 && configuration2.formDataCtor || FormData)();
        if (file !== void 0) {
          localVarFormParams.append("file", file);
        }
        if (purpose !== void 0) {
          localVarFormParams.append("purpose", purpose);
        }
        localVarHeaderParameter["Content-Type"] = "multipart/form-data";
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
        localVarRequestOptions.data = localVarFormParams;
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      createFineTune: (createFineTuneRequest, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("createFineTune", "createFineTuneRequest", createFineTuneRequest);
        const localVarPath = `/fine-tunes`;
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        localVarHeaderParameter["Content-Type"] = "application/json";
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        localVarRequestOptions.data = common_1.serializeDataIfNeeded(createFineTuneRequest, localVarRequestOptions, configuration2);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      createImage: (createImageRequest, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("createImage", "createImageRequest", createImageRequest);
        const localVarPath = `/images/generations`;
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        localVarHeaderParameter["Content-Type"] = "application/json";
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        localVarRequestOptions.data = common_1.serializeDataIfNeeded(createImageRequest, localVarRequestOptions, configuration2);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      createImageEdit: (image, prompt, mask, n, size, responseFormat, user, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("createImageEdit", "image", image);
        common_1.assertParamExists("createImageEdit", "prompt", prompt);
        const localVarPath = `/images/edits`;
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        const localVarFormParams = new (configuration2 && configuration2.formDataCtor || FormData)();
        if (image !== void 0) {
          localVarFormParams.append("image", image);
        }
        if (mask !== void 0) {
          localVarFormParams.append("mask", mask);
        }
        if (prompt !== void 0) {
          localVarFormParams.append("prompt", prompt);
        }
        if (n !== void 0) {
          localVarFormParams.append("n", n);
        }
        if (size !== void 0) {
          localVarFormParams.append("size", size);
        }
        if (responseFormat !== void 0) {
          localVarFormParams.append("response_format", responseFormat);
        }
        if (user !== void 0) {
          localVarFormParams.append("user", user);
        }
        localVarHeaderParameter["Content-Type"] = "multipart/form-data";
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
        localVarRequestOptions.data = localVarFormParams;
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      createImageVariation: (image, n, size, responseFormat, user, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("createImageVariation", "image", image);
        const localVarPath = `/images/variations`;
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        const localVarFormParams = new (configuration2 && configuration2.formDataCtor || FormData)();
        if (image !== void 0) {
          localVarFormParams.append("image", image);
        }
        if (n !== void 0) {
          localVarFormParams.append("n", n);
        }
        if (size !== void 0) {
          localVarFormParams.append("size", size);
        }
        if (responseFormat !== void 0) {
          localVarFormParams.append("response_format", responseFormat);
        }
        if (user !== void 0) {
          localVarFormParams.append("user", user);
        }
        localVarHeaderParameter["Content-Type"] = "multipart/form-data";
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
        localVarRequestOptions.data = localVarFormParams;
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      createModeration: (createModerationRequest, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("createModeration", "createModerationRequest", createModerationRequest);
        const localVarPath = `/moderations`;
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        localVarHeaderParameter["Content-Type"] = "application/json";
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        localVarRequestOptions.data = common_1.serializeDataIfNeeded(createModerationRequest, localVarRequestOptions, configuration2);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      createSearch: (engineId, createSearchRequest, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("createSearch", "engineId", engineId);
        common_1.assertParamExists("createSearch", "createSearchRequest", createSearchRequest);
        const localVarPath = `/engines/{engine_id}/search`.replace(`{${"engine_id"}}`, encodeURIComponent(String(engineId)));
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        localVarHeaderParameter["Content-Type"] = "application/json";
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        localVarRequestOptions.data = common_1.serializeDataIfNeeded(createSearchRequest, localVarRequestOptions, configuration2);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      createTranscription: (file, model, prompt, responseFormat, temperature, language, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("createTranscription", "file", file);
        common_1.assertParamExists("createTranscription", "model", model);
        const localVarPath = `/audio/transcriptions`;
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        const localVarFormParams = new (configuration2 && configuration2.formDataCtor || FormData)();
        if (file !== void 0) {
          localVarFormParams.append("file", file);
        }
        if (model !== void 0) {
          localVarFormParams.append("model", model);
        }
        if (prompt !== void 0) {
          localVarFormParams.append("prompt", prompt);
        }
        if (responseFormat !== void 0) {
          localVarFormParams.append("response_format", responseFormat);
        }
        if (temperature !== void 0) {
          localVarFormParams.append("temperature", temperature);
        }
        if (language !== void 0) {
          localVarFormParams.append("language", language);
        }
        localVarHeaderParameter["Content-Type"] = "multipart/form-data";
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
        localVarRequestOptions.data = localVarFormParams;
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      createTranslation: (file, model, prompt, responseFormat, temperature, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("createTranslation", "file", file);
        common_1.assertParamExists("createTranslation", "model", model);
        const localVarPath = `/audio/translations`;
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        const localVarFormParams = new (configuration2 && configuration2.formDataCtor || FormData)();
        if (file !== void 0) {
          localVarFormParams.append("file", file);
        }
        if (model !== void 0) {
          localVarFormParams.append("model", model);
        }
        if (prompt !== void 0) {
          localVarFormParams.append("prompt", prompt);
        }
        if (responseFormat !== void 0) {
          localVarFormParams.append("response_format", responseFormat);
        }
        if (temperature !== void 0) {
          localVarFormParams.append("temperature", temperature);
        }
        localVarHeaderParameter["Content-Type"] = "multipart/form-data";
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
        localVarRequestOptions.data = localVarFormParams;
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      deleteFile: (fileId, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("deleteFile", "fileId", fileId);
        const localVarPath = `/files/{file_id}`.replace(`{${"file_id"}}`, encodeURIComponent(String(fileId)));
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      deleteModel: (model, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("deleteModel", "model", model);
        const localVarPath = `/models/{model}`.replace(`{${"model"}}`, encodeURIComponent(String(model)));
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      downloadFile: (fileId, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("downloadFile", "fileId", fileId);
        const localVarPath = `/files/{file_id}/content`.replace(`{${"file_id"}}`, encodeURIComponent(String(fileId)));
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      listEngines: (options = {}) => __awaiter2(this, void 0, void 0, function* () {
        const localVarPath = `/engines`;
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      listFiles: (options = {}) => __awaiter2(this, void 0, void 0, function* () {
        const localVarPath = `/files`;
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      listFineTuneEvents: (fineTuneId, stream, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("listFineTuneEvents", "fineTuneId", fineTuneId);
        const localVarPath = `/fine-tunes/{fine_tune_id}/events`.replace(`{${"fine_tune_id"}}`, encodeURIComponent(String(fineTuneId)));
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        if (stream !== void 0) {
          localVarQueryParameter["stream"] = stream;
        }
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      listFineTunes: (options = {}) => __awaiter2(this, void 0, void 0, function* () {
        const localVarPath = `/fine-tunes`;
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      listModels: (options = {}) => __awaiter2(this, void 0, void 0, function* () {
        const localVarPath = `/models`;
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      retrieveEngine: (engineId, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("retrieveEngine", "engineId", engineId);
        const localVarPath = `/engines/{engine_id}`.replace(`{${"engine_id"}}`, encodeURIComponent(String(engineId)));
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      retrieveFile: (fileId, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("retrieveFile", "fileId", fileId);
        const localVarPath = `/files/{file_id}`.replace(`{${"file_id"}}`, encodeURIComponent(String(fileId)));
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      retrieveFineTune: (fineTuneId, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("retrieveFineTune", "fineTuneId", fineTuneId);
        const localVarPath = `/fine-tunes/{fine_tune_id}`.replace(`{${"fine_tune_id"}}`, encodeURIComponent(String(fineTuneId)));
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      }),
      retrieveModel: (model, options = {}) => __awaiter2(this, void 0, void 0, function* () {
        common_1.assertParamExists("retrieveModel", "model", model);
        const localVarPath = `/models/{model}`.replace(`{${"model"}}`, encodeURIComponent(String(model)));
        const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
        let baseOptions;
        if (configuration2) {
          baseOptions = configuration2.baseOptions;
        }
        const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
        const localVarHeaderParameter = {};
        const localVarQueryParameter = {};
        common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
        let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
        return {
          url: common_1.toPathString(localVarUrlObj),
          options: localVarRequestOptions
        };
      })
    };
  };
  exports.OpenAIApiFp = function(configuration2) {
    const localVarAxiosParamCreator = exports.OpenAIApiAxiosParamCreator(configuration2);
    return {
      cancelFineTune(fineTuneId, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.cancelFineTune(fineTuneId, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      createAnswer(createAnswerRequest, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.createAnswer(createAnswerRequest, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      createChatCompletion(createChatCompletionRequest, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.createChatCompletion(createChatCompletionRequest, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      createClassification(createClassificationRequest, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.createClassification(createClassificationRequest, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      createCompletion(createCompletionRequest, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.createCompletion(createCompletionRequest, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      createEdit(createEditRequest, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.createEdit(createEditRequest, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      createEmbedding(createEmbeddingRequest, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.createEmbedding(createEmbeddingRequest, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      createFile(file, purpose, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.createFile(file, purpose, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      createFineTune(createFineTuneRequest, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.createFineTune(createFineTuneRequest, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      createImage(createImageRequest, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.createImage(createImageRequest, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      createImageEdit(image, prompt, mask, n, size, responseFormat, user, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.createImageEdit(image, prompt, mask, n, size, responseFormat, user, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      createImageVariation(image, n, size, responseFormat, user, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.createImageVariation(image, n, size, responseFormat, user, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      createModeration(createModerationRequest, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.createModeration(createModerationRequest, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      createSearch(engineId, createSearchRequest, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.createSearch(engineId, createSearchRequest, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      createTranscription(file, model, prompt, responseFormat, temperature, language, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.createTranscription(file, model, prompt, responseFormat, temperature, language, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      createTranslation(file, model, prompt, responseFormat, temperature, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.createTranslation(file, model, prompt, responseFormat, temperature, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      deleteFile(fileId, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteFile(fileId, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      deleteModel(model, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteModel(model, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      downloadFile(fileId, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.downloadFile(fileId, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      listEngines(options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.listEngines(options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      listFiles(options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.listFiles(options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      listFineTuneEvents(fineTuneId, stream, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.listFineTuneEvents(fineTuneId, stream, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      listFineTunes(options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.listFineTunes(options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      listModels(options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.listModels(options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      retrieveEngine(engineId, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.retrieveEngine(engineId, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      retrieveFile(fileId, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.retrieveFile(fileId, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      retrieveFineTune(fineTuneId, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.retrieveFineTune(fineTuneId, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      },
      retrieveModel(model, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const localVarAxiosArgs = yield localVarAxiosParamCreator.retrieveModel(model, options);
          return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_12.BASE_PATH, configuration2);
        });
      }
    };
  };
  exports.OpenAIApiFactory = function(configuration2, basePath, axios2) {
    const localVarFp = exports.OpenAIApiFp(configuration2);
    return {
      cancelFineTune(fineTuneId, options) {
        return localVarFp.cancelFineTune(fineTuneId, options).then((request2) => request2(axios2, basePath));
      },
      createAnswer(createAnswerRequest, options) {
        return localVarFp.createAnswer(createAnswerRequest, options).then((request2) => request2(axios2, basePath));
      },
      createChatCompletion(createChatCompletionRequest, options) {
        return localVarFp.createChatCompletion(createChatCompletionRequest, options).then((request2) => request2(axios2, basePath));
      },
      createClassification(createClassificationRequest, options) {
        return localVarFp.createClassification(createClassificationRequest, options).then((request2) => request2(axios2, basePath));
      },
      createCompletion(createCompletionRequest, options) {
        return localVarFp.createCompletion(createCompletionRequest, options).then((request2) => request2(axios2, basePath));
      },
      createEdit(createEditRequest, options) {
        return localVarFp.createEdit(createEditRequest, options).then((request2) => request2(axios2, basePath));
      },
      createEmbedding(createEmbeddingRequest, options) {
        return localVarFp.createEmbedding(createEmbeddingRequest, options).then((request2) => request2(axios2, basePath));
      },
      createFile(file, purpose, options) {
        return localVarFp.createFile(file, purpose, options).then((request2) => request2(axios2, basePath));
      },
      createFineTune(createFineTuneRequest, options) {
        return localVarFp.createFineTune(createFineTuneRequest, options).then((request2) => request2(axios2, basePath));
      },
      createImage(createImageRequest, options) {
        return localVarFp.createImage(createImageRequest, options).then((request2) => request2(axios2, basePath));
      },
      createImageEdit(image, prompt, mask, n, size, responseFormat, user, options) {
        return localVarFp.createImageEdit(image, prompt, mask, n, size, responseFormat, user, options).then((request2) => request2(axios2, basePath));
      },
      createImageVariation(image, n, size, responseFormat, user, options) {
        return localVarFp.createImageVariation(image, n, size, responseFormat, user, options).then((request2) => request2(axios2, basePath));
      },
      createModeration(createModerationRequest, options) {
        return localVarFp.createModeration(createModerationRequest, options).then((request2) => request2(axios2, basePath));
      },
      createSearch(engineId, createSearchRequest, options) {
        return localVarFp.createSearch(engineId, createSearchRequest, options).then((request2) => request2(axios2, basePath));
      },
      createTranscription(file, model, prompt, responseFormat, temperature, language, options) {
        return localVarFp.createTranscription(file, model, prompt, responseFormat, temperature, language, options).then((request2) => request2(axios2, basePath));
      },
      createTranslation(file, model, prompt, responseFormat, temperature, options) {
        return localVarFp.createTranslation(file, model, prompt, responseFormat, temperature, options).then((request2) => request2(axios2, basePath));
      },
      deleteFile(fileId, options) {
        return localVarFp.deleteFile(fileId, options).then((request2) => request2(axios2, basePath));
      },
      deleteModel(model, options) {
        return localVarFp.deleteModel(model, options).then((request2) => request2(axios2, basePath));
      },
      downloadFile(fileId, options) {
        return localVarFp.downloadFile(fileId, options).then((request2) => request2(axios2, basePath));
      },
      listEngines(options) {
        return localVarFp.listEngines(options).then((request2) => request2(axios2, basePath));
      },
      listFiles(options) {
        return localVarFp.listFiles(options).then((request2) => request2(axios2, basePath));
      },
      listFineTuneEvents(fineTuneId, stream, options) {
        return localVarFp.listFineTuneEvents(fineTuneId, stream, options).then((request2) => request2(axios2, basePath));
      },
      listFineTunes(options) {
        return localVarFp.listFineTunes(options).then((request2) => request2(axios2, basePath));
      },
      listModels(options) {
        return localVarFp.listModels(options).then((request2) => request2(axios2, basePath));
      },
      retrieveEngine(engineId, options) {
        return localVarFp.retrieveEngine(engineId, options).then((request2) => request2(axios2, basePath));
      },
      retrieveFile(fileId, options) {
        return localVarFp.retrieveFile(fileId, options).then((request2) => request2(axios2, basePath));
      },
      retrieveFineTune(fineTuneId, options) {
        return localVarFp.retrieveFineTune(fineTuneId, options).then((request2) => request2(axios2, basePath));
      },
      retrieveModel(model, options) {
        return localVarFp.retrieveModel(model, options).then((request2) => request2(axios2, basePath));
      }
    };
  };
  class OpenAIApi extends base_12.BaseAPI {
    cancelFineTune(fineTuneId, options) {
      return exports.OpenAIApiFp(this.configuration).cancelFineTune(fineTuneId, options).then((request2) => request2(this.axios, this.basePath));
    }
    createAnswer(createAnswerRequest, options) {
      return exports.OpenAIApiFp(this.configuration).createAnswer(createAnswerRequest, options).then((request2) => request2(this.axios, this.basePath));
    }
    createChatCompletion(createChatCompletionRequest, options) {
      return exports.OpenAIApiFp(this.configuration).createChatCompletion(createChatCompletionRequest, options).then((request2) => request2(this.axios, this.basePath));
    }
    createClassification(createClassificationRequest, options) {
      return exports.OpenAIApiFp(this.configuration).createClassification(createClassificationRequest, options).then((request2) => request2(this.axios, this.basePath));
    }
    createCompletion(createCompletionRequest, options) {
      return exports.OpenAIApiFp(this.configuration).createCompletion(createCompletionRequest, options).then((request2) => request2(this.axios, this.basePath));
    }
    createEdit(createEditRequest, options) {
      return exports.OpenAIApiFp(this.configuration).createEdit(createEditRequest, options).then((request2) => request2(this.axios, this.basePath));
    }
    createEmbedding(createEmbeddingRequest, options) {
      return exports.OpenAIApiFp(this.configuration).createEmbedding(createEmbeddingRequest, options).then((request2) => request2(this.axios, this.basePath));
    }
    createFile(file, purpose, options) {
      return exports.OpenAIApiFp(this.configuration).createFile(file, purpose, options).then((request2) => request2(this.axios, this.basePath));
    }
    createFineTune(createFineTuneRequest, options) {
      return exports.OpenAIApiFp(this.configuration).createFineTune(createFineTuneRequest, options).then((request2) => request2(this.axios, this.basePath));
    }
    createImage(createImageRequest, options) {
      return exports.OpenAIApiFp(this.configuration).createImage(createImageRequest, options).then((request2) => request2(this.axios, this.basePath));
    }
    createImageEdit(image, prompt, mask, n, size, responseFormat, user, options) {
      return exports.OpenAIApiFp(this.configuration).createImageEdit(image, prompt, mask, n, size, responseFormat, user, options).then((request2) => request2(this.axios, this.basePath));
    }
    createImageVariation(image, n, size, responseFormat, user, options) {
      return exports.OpenAIApiFp(this.configuration).createImageVariation(image, n, size, responseFormat, user, options).then((request2) => request2(this.axios, this.basePath));
    }
    createModeration(createModerationRequest, options) {
      return exports.OpenAIApiFp(this.configuration).createModeration(createModerationRequest, options).then((request2) => request2(this.axios, this.basePath));
    }
    createSearch(engineId, createSearchRequest, options) {
      return exports.OpenAIApiFp(this.configuration).createSearch(engineId, createSearchRequest, options).then((request2) => request2(this.axios, this.basePath));
    }
    createTranscription(file, model, prompt, responseFormat, temperature, language, options) {
      return exports.OpenAIApiFp(this.configuration).createTranscription(file, model, prompt, responseFormat, temperature, language, options).then((request2) => request2(this.axios, this.basePath));
    }
    createTranslation(file, model, prompt, responseFormat, temperature, options) {
      return exports.OpenAIApiFp(this.configuration).createTranslation(file, model, prompt, responseFormat, temperature, options).then((request2) => request2(this.axios, this.basePath));
    }
    deleteFile(fileId, options) {
      return exports.OpenAIApiFp(this.configuration).deleteFile(fileId, options).then((request2) => request2(this.axios, this.basePath));
    }
    deleteModel(model, options) {
      return exports.OpenAIApiFp(this.configuration).deleteModel(model, options).then((request2) => request2(this.axios, this.basePath));
    }
    downloadFile(fileId, options) {
      return exports.OpenAIApiFp(this.configuration).downloadFile(fileId, options).then((request2) => request2(this.axios, this.basePath));
    }
    listEngines(options) {
      return exports.OpenAIApiFp(this.configuration).listEngines(options).then((request2) => request2(this.axios, this.basePath));
    }
    listFiles(options) {
      return exports.OpenAIApiFp(this.configuration).listFiles(options).then((request2) => request2(this.axios, this.basePath));
    }
    listFineTuneEvents(fineTuneId, stream, options) {
      return exports.OpenAIApiFp(this.configuration).listFineTuneEvents(fineTuneId, stream, options).then((request2) => request2(this.axios, this.basePath));
    }
    listFineTunes(options) {
      return exports.OpenAIApiFp(this.configuration).listFineTunes(options).then((request2) => request2(this.axios, this.basePath));
    }
    listModels(options) {
      return exports.OpenAIApiFp(this.configuration).listModels(options).then((request2) => request2(this.axios, this.basePath));
    }
    retrieveEngine(engineId, options) {
      return exports.OpenAIApiFp(this.configuration).retrieveEngine(engineId, options).then((request2) => request2(this.axios, this.basePath));
    }
    retrieveFile(fileId, options) {
      return exports.OpenAIApiFp(this.configuration).retrieveFile(fileId, options).then((request2) => request2(this.axios, this.basePath));
    }
    retrieveFineTune(fineTuneId, options) {
      return exports.OpenAIApiFp(this.configuration).retrieveFineTune(fineTuneId, options).then((request2) => request2(this.axios, this.basePath));
    }
    retrieveModel(model, options) {
      return exports.OpenAIApiFp(this.configuration).retrieveModel(model, options).then((request2) => request2(this.axios, this.basePath));
    }
  }
  exports.OpenAIApi = OpenAIApi;
})(api);
var configuration$1 = {};
const name = "openai";
const version = "3.3.0";
const description = "Node.js library for the OpenAI API";
const repository = {
  type: "git",
  url: "git@github.com:openai/openai-node.git"
};
const keywords = [
  "openai",
  "open",
  "ai",
  "gpt-3",
  "gpt3"
];
const author = "OpenAI";
const license = "MIT";
const main = "./dist/index.js";
const types = "./dist/index.d.ts";
const scripts = {
  build: "tsc --outDir dist/"
};
const dependencies = {
  axios: "^0.26.0",
  "form-data": "^4.0.0"
};
const devDependencies = {
  "@types/node": "^12.11.5",
  typescript: "^3.6.4"
};
const require$$0 = {
  name,
  version,
  description,
  repository,
  keywords,
  author,
  license,
  main,
  types,
  scripts,
  dependencies,
  devDependencies
};
var browser;
var hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser)
    return browser;
  hasRequiredBrowser = 1;
  browser = typeof self == "object" ? self.FormData : window.FormData;
  return browser;
}
Object.defineProperty(configuration$1, "__esModule", { value: true });
configuration$1.Configuration = void 0;
const packageJson = require$$0;
class Configuration {
  constructor(param = {}) {
    this.apiKey = param.apiKey;
    this.organization = param.organization;
    this.username = param.username;
    this.password = param.password;
    this.accessToken = param.accessToken;
    this.basePath = param.basePath;
    this.baseOptions = param.baseOptions;
    this.formDataCtor = param.formDataCtor;
    if (!this.baseOptions) {
      this.baseOptions = {};
    }
    this.baseOptions.headers = Object.assign({ "User-Agent": `OpenAI/NodeJS/${packageJson.version}`, "Authorization": `Bearer ${this.apiKey}` }, this.baseOptions.headers);
    if (this.organization) {
      this.baseOptions.headers["OpenAI-Organization"] = this.organization;
    }
    if (!this.formDataCtor) {
      this.formDataCtor = requireBrowser();
    }
  }
  isJsonMime(mime) {
    const jsonMime = new RegExp("^(application/json|[^;/ 	]+/[^;/ 	]+[+]json)[ 	]*(;.*)?$", "i");
    return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === "application/json-patch+json");
  }
}
configuration$1.Configuration = Configuration;
(function(exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() {
      return m[k];
    } });
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !exports2.hasOwnProperty(p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(api, exports);
  __exportStar(configuration$1, exports);
})(dist);
var _jsxFileName$1 = "C:\\Users\\ragha\\OneDrive\\Desktop\\prompt-me-pro\\src\\pages\\popup\\Popup.tsx";
const configuration = new dist.Configuration({
  apiKey: ""
});
const openai = new dist.OpenAIApi(configuration);
const Popup = () => {
  useStorage(exampleThemeStorage);
  const [CompletedTyping, setCompletedTyping] = react.exports.useState(false);
  const [displayPromptResponse, setdisplayPromptResponse] = react.exports.useState("");
  const [loader, setloader] = react.exports.useState(false);
  const [walletAddress, setwalletAddress] = react.exports.useState("");
  const [totalCoins, settotalCoins] = react.exports.useState(0);
  react.exports.useState(15);
  const [formData, setFormData] = react.exports.useState({
    promptPurpose: "",
    subject: "",
    writingStyle: "",
    decideTone: "",
    targetAudience: "",
    role: "system",
    content: "You are a helpful prompt generation assistant. Generate short text prompts based on the user's specifications.",
    wordLimit: ""
  });
  const [promptRes, setpromptRes] = react.exports.useState("");
  const handleInputChange = (e) => {
    const {
      name: name2,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name2]: value
    });
  };
  react.exports.useEffect(() => {
    setCompletedTyping(false);
    let i = 0;
    const stringResponse = promptRes;
    const intervalId = setInterval(() => {
      setdisplayPromptResponse(stringResponse.slice(0, i));
      i++;
      if (i > stringResponse.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);
      }
    }, 20);
    return () => clearInterval(intervalId);
  }, [promptRes]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloader(true);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: "prompt purpose is " + formData.promptPurpose
      }, {
        role: "user",
        content: "tone is " + formData.decideTone
      }, {
        role: "user",
        content: "subject is " + formData.subject
      }, {
        role: "user",
        content: "target audience is" + formData.targetAudience
      }, {
        role: "user",
        content: "writing style is" + formData.writingStyle
      }, {
        role: "user",
        content: "the number of words must not be greater than " + formData.wordLimit
      }]
    });
    let x = response.data.choices[0].message.content;
    setpromptRes(x);
    setloader(false);
    chrome.storage.local.set({
      totalCoins: totalCoins + 5
    }, () => {
    });
    settotalCoins(totalCoins + 5);
  };
  react.exports.useEffect(() => {
    chrome.storage.local.get(["totalCoins"], (result) => {
      console.log(result.totalCoins);
      settotalCoins(result.totalCoins != void 0 ? result.totalCoins : 0);
    });
  }, []);
  react.exports.useEffect(() => {
    chrome.storage.local.get(["walletAddress"], (result) => {
      console.log(result.walletAddress);
      setwalletAddress(result.walletAddress ? result.walletAddress : "");
    });
  }, []);
  console.log(totalCoins);
  console.log(walletAddress);
  const handleWalletSubmit = (e) => {
    e.preventDefault();
    setwalletAddress(e.target.value);
    chrome.storage.local.set({
      walletAddress: e.target.value
    }, () => {
    });
  };
  return /* @__PURE__ */ jsxDEV("div", {
    className: "App flex",
    children: /* @__PURE__ */ jsxDEV("div", {
      className: "container flex flex-col justify-center align-middle gap-2",
      children: [/* @__PURE__ */ jsxDEV("div", {
        className: "mb-3",
        children: [/* @__PURE__ */ jsxDEV("label", {
          htmlFor: "text1",
          className: "items-center mb-2 w-full text-sm text-white font-medium text-gray-900 ",
          children: "Enter Your Solana wallet address to airdrop you tokens"
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 135,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ jsxDEV("div", {
          className: "flex justify-evenly align-middle",
          children: /* @__PURE__ */ jsxDEV("input", {
            type: "text",
            id: "text1",
            name: "promptPurpose",
            value: walletAddress,
            onChange: handleWalletSubmit,
            className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-[3/4] focus:ring-blue-500 focus:border-blue-500 block  p-2.5    ",
            placeholder: "Sol wallet address",
            required: true
          }, void 0, false, {
            fileName: _jsxFileName$1,
            lineNumber: 142,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 141,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$1,
        lineNumber: 134,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ jsxDEV("div", {
        className: "inputDiv w-full",
        children: [/* @__PURE__ */ jsxDEV("div", {
          className: "text-2xl font-bold p-1 text-white",
          children: ["Total promptMe", " ", /* @__PURE__ */ jsxDEV("span", {
            className: "w-full items-center text-2xl font-bold p-1 text-transparent bg-clip-text bg-gradient-to-br from-[#7EF29D] to-[#0F68A9]",
            children: [" ", totalCoins]
          }, void 0, true, {
            fileName: _jsxFileName$1,
            lineNumber: 158,
            columnNumber: 13
          }, void 0), "\u{1FA99} earned"]
        }, void 0, true, {
          fileName: _jsxFileName$1,
          lineNumber: 156,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ jsxDEV("form", {
          className: "grid-cols-2 grid gap-2",
          children: [/* @__PURE__ */ jsxDEV("div", {
            className: "mb-3",
            children: [/* @__PURE__ */ jsxDEV("label", {
              htmlFor: "text1",
              className: " mb-2 text-sm text-white font-medium text-gray-900 ",
              children: "Prompt Purpose"
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 166,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ jsxDEV("input", {
              type: "text",
              id: "text1",
              name: "promptPurpose",
              value: formData.promptPurpose,
              onChange: handleInputChange,
              className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block  p-2.5    ",
              placeholder: "Enter your prompt purpose",
              required: true
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 172,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName$1,
            lineNumber: 165,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ jsxDEV("div", {
            className: "mb-3",
            children: [/* @__PURE__ */ jsxDEV("label", {
              htmlFor: "text2",
              className: "mb-2 text-sm font-medium text-white ",
              children: "Subject"
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 184,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ jsxDEV("input", {
              type: "text",
              id: "text2",
              name: "subject",
              value: formData.subject,
              onChange: handleInputChange,
              className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5    ",
              placeholder: "What is this about ?",
              required: true
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 190,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName$1,
            lineNumber: 183,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ jsxDEV("div", {
            className: "mb-3",
            children: [/* @__PURE__ */ jsxDEV("label", {
              htmlFor: "text3",
              className: "block mb-2 text-white text-sm font-medium text-gray-900 ",
              children: "Writing style"
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 202,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ jsxDEV("select", {
              id: "text3",
              name: "writingStyle",
              value: formData.writingStyle,
              onChange: handleInputChange,
              className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
              required: true,
              children: [/* @__PURE__ */ jsxDEV("option", {
                value: "",
                children: "Writing Style"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 216,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Academic",
                children: "Academic"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 217,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Business",
                children: "Business"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 218,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Casual",
                children: "Casual"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 219,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Creative",
                children: "Creative"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 220,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Descriptive",
                children: "Descriptive"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 221,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Emotional",
                children: "Emotional"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 222,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Expository",
                children: "Expository"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 223,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Formal",
                children: "Formal"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 224,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Informal",
                children: "Informal"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 225,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Legal",
                children: "Legal"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 226,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Medical",
                children: "Medical"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 227,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Narrative",
                children: "Narrative"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 228,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Poetic",
                children: "Poetic"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 229,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Technical",
                children: "Technical"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 230,
                columnNumber: 17
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName$1,
              lineNumber: 208,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName$1,
            lineNumber: 201,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ jsxDEV("div", {
            className: "mb-3",
            children: [/* @__PURE__ */ jsxDEV("label", {
              htmlFor: "text4",
              className: "block mb-2 text-white text-sm font-medium text-gray-900 ",
              children: "Decide Tone"
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 234,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ jsxDEV("select", {
              id: "text4",
              name: "decideTone",
              value: formData.decideTone,
              onChange: handleInputChange,
              className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
              required: true,
              children: [/* @__PURE__ */ jsxDEV("option", {
                value: "",
                children: "Decide Tone"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 248,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Angry",
                children: "Angry"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 249,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Assertive",
                children: "Assertive"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 250,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Confident",
                children: "Confident"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 251,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Cooperative",
                children: "Cooperative"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 252,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Curious",
                children: "Curious"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 253,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Empathetic",
                children: "Empathetic"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 254,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Encouraging",
                children: "Encouraging"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 255,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Enthusiastic",
                children: "Enthusiastic"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 256,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Excited",
                children: "Excited"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 257,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Friendly",
                children: "Friendly"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 258,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Funny",
                children: "Funny"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 259,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Joyful",
                children: "Joyful"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 260,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Sad",
                children: "Sad"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 261,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Serious",
                children: "Serious"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 262,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Surprised",
                children: "Surprised"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 263,
                columnNumber: 17
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName$1,
              lineNumber: 240,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName$1,
            lineNumber: 233,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ jsxDEV("div", {
            className: "mb-3",
            children: [/* @__PURE__ */ jsxDEV("label", {
              htmlFor: "text5",
              className: "block mb-2 text-white text-sm font-medium text-gray-900 ",
              children: "Target Audience"
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 267,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ jsxDEV("select", {
              id: "text5",
              name: "targetAudience",
              value: formData.targetAudience,
              onChange: handleInputChange,
              className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
              required: true,
              children: [/* @__PURE__ */ jsxDEV("option", {
                className: "text-slate-500",
                value: "",
                children: "Select Target Audience"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 281,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Teenager",
                children: "Teenager"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 284,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Business Audience",
                children: "Business Audience"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 285,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Expert Audience",
                children: "Expert Audience"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 286,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Hostile Audience",
                children: "Hostile Audience"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 287,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "Neutral Audience",
                children: "Neutral Audience"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 288,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "My Boss",
                children: "My Boss"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 289,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "My Teacher",
                children: "My Teacher"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 290,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "My Parent",
                children: "My Parent"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 291,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "My Colleague",
                children: "My Colleague"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 292,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "My Partner",
                children: "My Partner"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 293,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "My Girlfriend",
                children: "My Girlfriend"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 294,
                columnNumber: 17
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName$1,
              lineNumber: 273,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName$1,
            lineNumber: 266,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ jsxDEV("div", {
            className: "mb-3",
            children: [/* @__PURE__ */ jsxDEV("label", {
              htmlFor: "text5",
              className: "block mb-2 text-white text-sm font-medium text-gray-900 ",
              children: "Word Limit"
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 298,
              columnNumber: 15
            }, void 0), /* @__PURE__ */ jsxDEV("select", {
              id: "text5",
              name: "wordLimit",
              value: formData.wordLimit,
              onChange: handleInputChange,
              className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
              required: true,
              children: [/* @__PURE__ */ jsxDEV("option", {
                value: "",
                children: "Select Word Limit"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 312,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "10 words",
                children: "10 words"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 313,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "50 words",
                children: "50 words"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 314,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "100 words",
                children: "100 words"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 315,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "500 words",
                children: "500 words"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 316,
                columnNumber: 17
              }, void 0), /* @__PURE__ */ jsxDEV("option", {
                value: "1000 words",
                children: "1000 words"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 317,
                columnNumber: 17
              }, void 0)]
            }, void 0, true, {
              fileName: _jsxFileName$1,
              lineNumber: 304,
              columnNumber: 15
            }, void 0)]
          }, void 0, true, {
            fileName: _jsxFileName$1,
            lineNumber: 297,
            columnNumber: 13
          }, void 0), /* @__PURE__ */ jsxDEV("div", {
            className: "flex items-start mb-3"
          }, void 0, false, {
            fileName: _jsxFileName$1,
            lineNumber: 320,
            columnNumber: 13
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName$1,
          lineNumber: 164,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$1,
        lineNumber: 155,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ jsxDEV("button", {
        onClick: handleSubmit,
        className: " relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300",
        children: /* @__PURE__ */ jsxDEV("span", {
          className: "w-full flex  items-center justify-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0",
          children: loader ? /* @__PURE__ */ jsxDEV("div", {
            className: "w-5 h-5 border-t-2 border-b-3 items-center border-green-900 rounded-full animate-spin"
          }, void 0, false, {
            fileName: _jsxFileName$1,
            lineNumber: 330,
            columnNumber: 15
          }, void 0) : /* @__PURE__ */ jsxDEV("span", {
            children: " Prompt Me "
          }, void 0, false, {
            fileName: _jsxFileName$1,
            lineNumber: 332,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 328,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 324,
        columnNumber: 9
      }, void 0), /* @__PURE__ */ jsxDEV("div", {
        className: "outputDiv w-full",
        children: [/* @__PURE__ */ jsxDEV("label", {
          htmlFor: "message",
          className: "block mb-2 text-white text-sm font-medium text-gray-900 ",
          children: "Generated Magic Response \u{1FA84}"
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 338,
          columnNumber: 11
        }, void 0), /* @__PURE__ */ jsxDEV("span", {
          className: "block p-2.5 w-full  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ",
          children: displayPromptResponse
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 353,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$1,
        lineNumber: 337,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName$1,
      lineNumber: 133,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 132,
    columnNumber: 5
  }, void 0);
};
const Popup$1 = withSuspense(Popup);
const logo = "/assets/png/assetsLogo.chunk.png";
var _jsxFileName = "C:\\Users\\ragha\\OneDrive\\Desktop\\prompt-me-pro\\src\\pages\\popup\\index.tsx";
addHmrIntoView("pages/popup");
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  attachTwindStyle(appContainer, document);
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsxDEV(Fragment, {
    children: [/* @__PURE__ */ jsxDEV("div", {
      className: "text-center w-full flex justify-center align-middle bg-[#383D3B] ",
      children: [/* @__PURE__ */ jsxDEV("img", {
        className: "w-12 h-15=2",
        src: logo
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 21,
        columnNumber: 9
      }, this), /* @__PURE__ */ jsxDEV("h1", {
        className: "text-2xl font-bold p-1 text-transparent bg-clip-text bg-gradient-to-br from-[#7EF29D] to-[#0F68A9]",
        children: "Prompt Me! Pro\u{1FA84}"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 22,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 7
    }, this), /* @__PURE__ */ jsxDEV(Popup$1, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }, this)]
  }, void 0, true));
}
init();
