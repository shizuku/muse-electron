import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { MenuBar, MenuItem } from "./components/menu-bar";
import { MuseNotation, Notation, MuseConfig } from "./components/muse-notation";

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
    <div>
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
      <div>{notation ? <MuseNotation notation={notation} /> : <></>}</div>
    </div>
  );
};

export default App;
