import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { MenuBar, MenuItem } from "./components/menu-bar";
import { MuseNotation, Notation, MuseConfig } from "./components/muse-notation";
import "./app.css";

const App: React.FC = () => {
  let [notation, setNotation] = useState<Notation>();
  useEffect(() => {
    ipcRenderer.on("open-file-reply", (event, arg) => {
      setNotation(new Notation(JSON.parse(arg), new MuseConfig()));
      console.log(notation?.code());
    });
  });
  let menu: MenuItem[] = [
    {
      label: "File",
      onclick: () => {
        ipcRenderer.send("open-file", "");
      },
    },
  ];
  return (
    <div id="app">
      <header>
        <MenuBar item={menu} />
      </header>
      <button
        onClick={() => {
          ipcRenderer.send("open-file", "");
        }}
      >
        hahah
      </button>
      <button
        onClick={() => {
          console.log(notation?.code());
        }}
      >
        log
      </button>
      <div className="notation">
        {notation ? <MuseNotation notation={notation} /> : <></>}
      </div>
    </div>
  );
};

export default App;
