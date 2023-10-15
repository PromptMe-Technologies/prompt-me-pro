import "../../../assets/js/modulepreload-polyfill.js";
import { c as createRoot, j as jsxDEV } from "../../../assets/js/jsx-dev-runtime.js";
import { a as attachTwindStyle } from "../../../assets/js/twind.js";
var _jsxFileName = "C:\\Users\\ragha\\OneDrive\\Desktop\\prompt-me-pro\\src\\pages\\newtab\\index.tsx";
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  attachTwindStyle(appContainer, document);
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsxDEV("span", {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 18,
    columnNumber: 15
  }, this));
}
init();
