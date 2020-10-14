import React, { FC, useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { Welcome } from "./components/welcome";
import { Content } from "./components/content";
import { Toolbar } from "./components/toolbar";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import Store from "electron-store";
import { getFileName } from "../shared/utils";
import hotkeys from "hotkeys-js";
import { notification } from "antd";
import { AppState, FileInfo, useAppState } from "./AppStateContext";
import { MuseConfig } from "./components/muse-notation";
import { useObserver, Provider } from "mobx-react";
import "./app.css";
import { IconType, NotificationPlacement } from "antd/lib/notification";

const store = new Store({ name: "user", defaults: { "recent-files": [] } });

const openNotificationWithIcon = (
  type: IconType,
  message: string,
  description: string,
  placement: NotificationPlacement
) => {
  notification[type]({
    message,
    description,
    placement,
  });
};

const App: FC = () => {
  let [state, setState] = useState<AppState>(new AppState());
  const addFile = (f: FileInfo) => {
    let re = state.recents;
    for (let i = 0; i < re.length; ++i) {
      if (re[i].path === f.path) {
        re[i].time = f.time;
        state.recents = re;
        re.slice().sort((a, b) => b.time - a.time);
        store.set("recent-files", re);
        return;
      }
    }
    re.push(f);
    state.recents = re;
    re.slice().sort((a, b) => b.time - a.time);
    store.set("recent-files", re);
  };
  useEffect(() => {
    state.events = {
      onSave: () => {
        if (state.isNew) {
          ipcRenderer.send("save-as", state.filePath, state.data);
        } else {
          ipcRenderer.send("save", state.filePath, state.data);
        }
      },
      onSaveAs: () => {},
      onPrint: () => {},
      onUndo: () => {},
      onRedo: () => {},
      onClose:()=>{}
    };
  });
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
    ipcRenderer.on("save-reply", (event, result) => {
      if (result === "success") {
        console.log("save success");
      } else {
        openNotificationWithIcon(
          "warning",
          "Save Failed",
          "There is some thing worng when saveing the file.",
          "bottomRight"
        );
      }
    });
  });
  useEffect(() => {
    hotkeys("ctrl+shift+i,cmd+alt+i", { keyup: true, keydown: false }, () => {
      ipcRenderer.send("toggle-dev-tools");
    });
  });
  useEffect(() => {
    state.heights.wh = document.body.clientHeight;
    window.onresize = () => {
      state.heights.wh = document.body.clientHeight;
    };
  });
  useEffect(() => {
    state.loadRecents(store.get("recent-files"));
  });
  if (state) {
    return (
      <Provider state={state}>
        <AppHolder />
      </Provider>
    );
  } else {
    return <></>;
  }
};

const AppHolder: React.FC = () => {
  let state = useAppState();
  return useObserver(() => (
    <div id="app">
      <Provider appState={state}>
        {state.opened === true ? (
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
      </Provider>
    </div>
  ));
};

export default App;
