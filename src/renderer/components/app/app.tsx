import React, { FC, useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import hotkeys from "hotkeys-js";
import { notification, Spin } from "antd";
import { useObserver, Provider } from "mobx-react";
import { IconType, NotificationPlacement } from "antd/lib/notification";
import { Welcome } from "../welcome";
import { Content } from "../content";
import { Toolbar } from "../toolbar";
import { Header } from "../header";
import { Footer } from "../footer";
import { generateScreenshot, getImageData } from "../../../shared/utils";
import { AppState, DisplayStyle, useAppState } from "./AppStateContext";
import { loadConfigs, saveConfig } from "./store";
import "./app.css";
import { getImageArrayBuffer } from "../../../shared/utils/exportor";

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
  const saveFileConfig = () => {
    state.addRecentFile(state.currentFile);
    saveConfig("recent-files", state.recents);
  };
  useEffect(() => {
    state.events = {
      onSetDisplay: (s: DisplayStyle) => {
        state.display = s;
        saveConfig("display", state.display);
      },
      onSave: () => {
        if (state.isNew) {
          ipcRenderer.send("save-as", state.currentFile?.path, state.data);
        } else {
          ipcRenderer.send("save", state.currentFile?.path, state.data);
        }
      },
      onSaveAs: () => {
        ipcRenderer.send("save-as", state.currentFile?.path, state.data);
      },
      onAutoSave: () => {
        state.autoSave = !state.autoSave;
        saveConfig("auto-save", state.autoSave);
      },
      onSetSizer: (x: number) => {
        state.config.x = x;
        if (state.currentFile) state.currentFile.size = x;
        saveFileConfig();
      },
      onSetLiner: (x: number) => {
        state.config.pagePerLine = x;
        if (state.currentFile) state.currentFile.line = x;
        saveFileConfig();
      },
      onPrint: () => {},
      onExport: () => {
        ipcRenderer.send("export");
      },
      onClose: () => state.close(),
      onUndo: () => {},
      onRedo: () => {},
      onEditMetaData: () => {},
      onSetH: () => {
        state.config.vertical = false;
        if (state.currentFile) state.currentFile.vertical = false;
        saveFileConfig();
      },
      onSetV: () => {
        state.config.vertical = true;
        if (state.currentFile) state.currentFile.vertical = true;
        saveFileConfig();
      },
      onExit: () => {
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
    ipcRenderer.on("open-file-reply", (event, path: string, data: string) => {
      if (data !== "") {
        state.open(path, data, false);
        saveFileConfig();
      }
    });
    ipcRenderer.on(
      "new-file-reply",
      (event, filePath: string, data: string) => {
        state.open(filePath, data, true);
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
    ipcRenderer.on("export-reply", (e, path) => {
      if (state.r) {
        generateScreenshot(state.r).then((c) => {
          // getImageData(c).then((s) => {
          //   ipcRenderer.send("export-data", path, s);
          // });
          getImageArrayBuffer(c).then((s) => {
            ipcRenderer.send("export-data", path, s);
            state.appLoading = true;
          });
        });
      }
    });
    ipcRenderer.on("export-data-reply", (e, code) => {
      if (code === "success") {
        state.appLoading = false;
        openNotificationWithIcon(
          "success",
          "Export success",
          "",
          "bottomRight"
        );
      }
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
  useEffect(() => {
    let c = loadConfigs();
    state.loadRecents(c.recents);
    state.autoSave = c.autoSave;
    state.display = c.display;
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
      {state.opened === true ? (
        <>
          <Spin spinning={state.appLoading}>
            <Header />
            <Toolbar />
            <Content />
            <Footer />
          </Spin>
        </>
      ) : (
        <>
          <Spin spinning={state.appLoading}>
            <Header />
            <Welcome />
          </Spin>
        </>
      )}
    </div>
  ));
};

export default App;
