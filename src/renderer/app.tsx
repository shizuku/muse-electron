import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { MuseNotation, Notation, MuseConfig } from "./components/muse-notation";
import "./app.css";

const App: React.FC = () => {
  let [notation, setNotation] = useState<Notation>();

  useEffect(() => {
    ipcRenderer.on("open-file", (event, arg) => {
      if (arg !== "") {
        setNotation(new Notation(JSON.parse(arg), new MuseConfig()));
      }
      console.log(notation?.code());
    });
  });
  return (
    <div id="app">
      <header></header>
      <div className="notation">
        {notation ? <MuseNotation notation={notation} /> : <></>}
      </div>
    </div>
  );
};

export default App;
