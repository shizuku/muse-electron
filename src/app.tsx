import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { MuseNotation, Notation, MuseConfig } from "./components/muse-notation";
import "./app.css";

import { strings } from "./resource";
import { translate } from "./translate";

const App: React.FC = () => {
  let [notation, setNotation] = useState<Notation>();
  let [t, setT] = useState<(k: string) => string>(translate("en-US", strings));
  useEffect(() => {
    ipcRenderer.on("open-file", (event, arg) => {
      if (arg !== "") {
        setNotation(new Notation(JSON.parse(arg), new MuseConfig()));
      }
      console.log(notation?.code());
    });
    ipcRenderer.on("set-locale", (event, arg) => {
      if (arg !== "") {
        setT(translate(arg, strings));
      }
    });
  });
  return (
    <div id="app">
      <header>{t("menuFile")}</header>
      <div className="notation">
        {notation ? <MuseNotation notation={notation} /> : <></>}
      </div>
    </div>
  );
};

export default App;
