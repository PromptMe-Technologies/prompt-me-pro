import "../../../assets/js/modulepreload-polyfill.js";
import { j as jsxDEV, a as addHmrIntoView, c as createRoot } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
const Options$1 = "";
var _jsxFileName$1 = "C:\\Users\\ragha\\OneDrive\\Desktop\\prompt-me-pro\\src\\pages\\options\\Options.tsx";
const Options = () => {
  return /* @__PURE__ */ jsxDEV("div", {
    className: "container text-lime-400",
    children: "Options"
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 5,
    columnNumber: 10
  }, void 0);
};
const index = "";
var _jsxFileName = "C:\\Users\\ragha\\OneDrive\\Desktop\\prompt-me-pro\\src\\pages\\options\\index.tsx";
addHmrIntoView("pages/options");
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsxDEV(Options, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 15,
    columnNumber: 15
  }, this));
}
init();
