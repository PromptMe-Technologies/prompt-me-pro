import "../../../assets/js/modulepreload-polyfill.js";
import { j as jsxDEV, c as createRoot } from "../../../assets/js/jsx-dev-runtime.js";
import { a as addHmrIntoView } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
import { a as attachTwindStyle } from "../../../assets/js/twind.js";
const Panel$1 = "";
var _jsxFileName$1 = "C:\\Users\\ragha\\OneDrive\\Desktop\\prompt-me-pro\\src\\pages\\panel\\Panel.tsx";
const Panel = () => {
  return /* @__PURE__ */ jsxDEV("div", {
    className: "container",
    children: /* @__PURE__ */ jsxDEV("h1", {
      className: "text-lime-400",
      children: "Dev Tools Panel"
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 7,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 6,
    columnNumber: 5
  }, void 0);
};
const index = "";
var _jsxFileName = "C:\\Users\\ragha\\OneDrive\\Desktop\\prompt-me-pro\\src\\pages\\panel\\index.tsx";
addHmrIntoView("pages/panel");
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  attachTwindStyle(appContainer, document);
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsxDEV(Panel, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 17,
    columnNumber: 15
  }, this));
}
init();
