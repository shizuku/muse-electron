import React, { useEffect } from "react";
import { ipcRenderer } from "electron";
import { Welcome } from "./components/welcome";
import { Content } from "./components/content";
import { Toolbar } from "./components/toolbar";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import Store from "electron-store";
import { getFileName } from "../shared/utils";
import hotkeys from "hotkeys-js";
import { AppState, AppStateContext, FileInfo } from "./AppStateContext";
import { MuseConfig } from "./components/muse-notation";

import "./app.css";
import { observer } from "mobx-react";

const store = new Store({ name: "user", defaults: { "recent-files": [] } });

const App: React.FC = observer(() => {
  let state = new AppState();
  state.heights.wh = document.body.clientHeight;
  const addFile = (f: FileInfo) => {
    let re = state.recents;
    for (let i = 0; i < re.length; ++i) {
      if (re[i].path === f.path) {
        re[i].time = f.time;
        state.recents = re;
        re.sort((a, b) => b.time - a.time);
        store.set("recent-files", re);
        return;
      }
    }
    re.push(f);
    state.recents = re;
    re.sort((a, b) => b.time - a.time);
    store.set("recent-files", re);
  };
  state.events = {
    onSave: () => {
      if (state.isNew) {
        ipcRenderer.send("save-as", state.filePath, state.data);
      } else {
      }
    },
    onSaveAs: () => {},
    onPrint: () => {},
    onUndo: () => {},
    onRedo: () => {},
  };
  useEffect(() => {
    ipcRenderer.on(
      "open-file-reply",
      (event, filePath: string, data: string) => {
        let fileName = getFileName(filePath);
        if (data !== "") {
          state.open(fileName, filePath, data, new MuseConfig(), false);
          addFile({
            path: filePath,
            time: Date.now(),
          });
        }
      }
    );
    ipcRenderer.on(
      "new-file-reply",
      (event, filePath: string, data: string) => {
        state.open("New File", filePath, data, new MuseConfig(), true);
      }
    );
  });
  useEffect(() => {
    hotkeys("ctrl+shift+i,cmd+alt+i", { keyup: true, keydown: false }, () => {
      ipcRenderer.send("toggle-dev-tools");
    });
  });
  useEffect(() => {
    window.onresize = () => {
      state.heights.wh = document.body.clientHeight;
    };
  });
  useEffect(() => {
    state.loadRecents(store.get("recent-files"));
  });
  return (
    <div id="app">
      <AppStateContext.Provider value={state}>
        {state.opened ? (
          <>
            <Header />
            <Toolbar />
            <Content />
            <Footer />
          </>
        ) : (
          <>
            <Header />
            <Welcome />
          </>
        )}
      </AppStateContext.Provider>
    </div>
  );
});

export default App;
