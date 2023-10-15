import { r as react, j as jsxDEV, a as addHmrIntoView, c as createRoot } from "./_virtual_reload-on-update-in-view.js";
import { a as attachTwindStyle } from "./twind.js";
var _jsxFileName$1 = "C:\\Users\\ragha\\OneDrive\\Desktop\\prompt-me-pro\\src\\pages\\content\\components\\Demo\\app.tsx";
function App() {
  react.exports.useEffect(() => {
    console.log("content view loaded");
  }, []);
  return /* @__PURE__ */ jsxDEV("div", {
    className: "text-lime-400",
    children: "content view"
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 8,
    columnNumber: 10
  }, this);
}
var _jsxFileName = "C:\\Users\\ragha\\OneDrive\\Desktop\\prompt-me-pro\\src\\pages\\content\\components\\Demo\\index.tsx";
addHmrIntoView("pages/content");
const root = document.createElement("div");
root.id = "chrome-extension-boilerplate-react-vite-content-view-root";
document.body.append(root);
const rootIntoShadow = document.createElement("div");
rootIntoShadow.id = "shadow-root";
const shadowRoot = root.attachShadow({
  mode: "open"
});
shadowRoot.appendChild(rootIntoShadow);
attachTwindStyle(rootIntoShadow, shadowRoot);
createRoot(rootIntoShadow).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 27,
  columnNumber: 35
}, globalThis));
