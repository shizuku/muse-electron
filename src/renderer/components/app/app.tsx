import React, { FC, useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import Store from "electron-store";
import hotkeys from "hotkeys-js";
import { notification } from "antd";
import { useObserver, Provider } from "mobx-react";
import { IconType, NotificationPlacement } from "antd/lib/notification";
import { Welcome } from "../welcome";
import { Content } from "../content";
import { Toolbar } from "../toolbar";
import { Header } from "../header";
import { Footer } from "../footer";
import { getFileName } from "../../../shared/utils";
import { AppState, FileInfo, useAppState } from "./AppStateContext";
import "./app.css";

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
  const loadConfig = () => state.loadRecents(store.get("recent-files"));
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
      onClose: () => {
        if (state.modified) {
          ipcRenderer.send(
            "app-close-modified",
            "Not Save",
            "There are some modify not saved, do you want to save it before exit?"
          );
        } else {
          ipcRenderer.send("app-close");
        }
      },
    };
  });
  useEffect(() => {
    ipcRenderer.on(
      "open-file-reply",
      (event, filePath: string, data: string) => {
        let fileName = getFileName(filePath);
        if (data !== "") {
          state.open(fileName, filePath, data, false);
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
        state.open("New File", filePath, data, true);
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
    ipcRenderer.on("full-screen-status", (e, status: boolean) => {
      state.fullScreenStatus = status;
    });
    ipcRenderer.on("max-status", (e, status: boolean) => {
      state.maxStatus = status;
    });
  });
  useEffect(() => {
    hotkeys("ctrl+shift+i,cmd+alt+i", { keyup: true, keydown: false }, () => {
      ipcRenderer.send("toggle-dev-tools");
    });
    hotkeys("f11", { keyup: true, keydown: false }, () => {
      ipcRenderer.send("app-toggle-full-screen");
    });
    hotkeys("ctrl+s", { keyup: true, keydown: false }, () => {
      state.events?.onSave();
    });
  });
  useEffect(() => {
    state.windowDim.wh = document.body.clientHeight;
    state.windowDim.ww = document.body.clientWidth;
    window.onresize = () => {
      state.windowDim.wh = document.body.clientHeight;
      state.windowDim.ww = document.body.clientWidth;
    };
    window.addEventListener("mousemove", (e) => {
      if (e.clientY < 30 && e.clientY > 0) {
        state.headerHover = true;
        state.footerHover = false;
      } else if (
        e.clientY < state.windowDim.wh &&
        e.clientY > state.windowDim.wh - 30
      ) {
        state.headerHover = false;
        state.footerHover = true;
      } else {
        state.headerHover = false;
        state.footerHover = false;
      }
    });
  });
  useEffect(() => loadConfig());
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
