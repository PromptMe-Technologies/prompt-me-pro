import React from "react";
import { createRoot } from "react-dom/client";
import "@pages/popup/index.css";
import Popup from "@pages/popup/Popup";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { attachTwindStyle } from "@src/shared/style/twind";
import logo from "../../assets/logo.png"

refreshOnUpdate("pages/popup");

function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  attachTwindStyle(appContainer, document);
  const root = createRoot(appContainer);
  root.render(
    <>
      <div className="text-center w-full flex justify-center align-middle bg-[#383D3B] ">
        <img className="w-12 h-15=2" src={logo}/>
        <h1 className="text-2xl font-bold p-1 text-transparent bg-clip-text bg-gradient-to-br from-[#7EF29D] to-[#0F68A9]">Prompt Me! Pro🪄</h1>
      </div>
      <Popup />

    </>
  );
}

init();
