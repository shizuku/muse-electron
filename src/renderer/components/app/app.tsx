import React, { FC, useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import hotkeys from "hotkeys-js";
import { notification, Spin, ConfigProvider } from "antd";
import { Locale } from "antd/lib/locale-provider";
import zhCN from "antd/es/locale/zh_CN";
import enUS from "antd/es/locale/en_US";
import { useObserver, Provider } from "mobx-react";
import { useTranslation } from "react-i18next";
import { IconType, NotificationPlacement } from "antd/lib/notification";
import { Welcome } from "../welcome";
import { Content } from "../content";
import { Toolbar } from "../toolbar";
import { Header } from "../header";
import { Footer } from "../footer";
import { AppState, DisplayStyle, useAppState } from "../../states";
import { loadConfigs, saveConfig } from "./store";
import {
  AboutModal,
  EditMetaModal,
  ExportModal,
  SettingsModal,
  SureClose,
} from "./modal";
import "./app.css";

export const openNotificationWithIcon = (
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
  const { t, i18n } = useTranslation();
  const saveFileConfig = () => {
    if (state.currentFile) state.addRecentFile(state.currentFile, true);
    saveConfig("recent-files", state.recents);
  };
  useEffect(() => {
    state.events = {
      onSetDisplay: (s: DisplayStyle) => {
        state.display = s;
        saveConfig("display", state.display);
      },
      onNew: () => {
        if (!state.opened) {
          ipcRenderer.send("new-file");
        }
      },
      onOpen: () => {
        if (!state.opened) {
          ipcRenderer.send("open-file");
        }
      },
      onSave: (cb?: (result: string) => void) => {
        if (state.modified) {
          if (state.isNew) {
            state.events?.onSaveAs(cb);
          } else {
            ipcRenderer.once("save-reply", (event, result) => {
              if (result === "success") {
                console.log("save success");
                state.modified = false;
                saveFileConfig();
              } else {
                openNotificationWithIcon(
                  "warning",
                  t("notifiction-save-fail"),
                  "",
                  "bottomRight"
                );
              }
              if (cb) cb(result);
            });
            ipcRenderer.send("save", state.currentFile?.path, state.data);
          }
        }
      },
      onSaveAs: (cb?: (result: string) => void) => {
        ipcRenderer.once("save-as-reply", (ev, result, newPath: string) => {
          if (result === "success") {
            console.log("save as success");
            state.modified = false;
            if (state.isNew) {
              if (state.currentFile) state.currentFile.path = newPath;
              state.isNew = false;
            }
            saveFileConfig();
          }
          if (cb) cb(result);
        });
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
      onExport: () => {
        state.showExport = true;
        //ipcRenderer.send("export");
      },
      onClose: () => {
        if (state.modified) {
          state.toExit = false;
          state.showSureClose = true;
        } else {
          state.close();
        }
      },
      onUndo: () => {
        if (!state.undoDisable) {
          console.log("undo");
          let x = state.data;
          if (x && state.sl && state.sl.c)
            state.redoStack.push({
              s: JSON.stringify(state.notation?.code()),
              c: state.sl.c,
            });
          let p = state.undoStack.pop();
          if (p) {
            state.data = p.s;
            state.sl?.select(p.c);
          }
        }
      },
      onRedo: () => {
        if (!state.redoDisable) {
          console.log("redo");
          let p = state.redoStack.pop();
          if (p) {
            state.data = p.s;
            state.sl?.select(p.c);
            state.undoStack.push(p);
          }
        }
      },
      onEditMetaData: () => {
        state.showEditMetaModel = true;
      },
      onSetHorizontal: () => {
        state.config.vertical = false;
        if (state.currentFile) state.currentFile.vertical = false;
        saveFileConfig();
      },
      onSetVertical: () => {
        state.config.vertical = true;
        if (state.currentFile) state.currentFile.vertical = true;
        saveFileConfig();
      },
      onExit: () => {
        if (state.modified) {
          state.toExit = true;
          state.showSureClose = true;
        } else {
          ipcRenderer.send("app-close");
        }
      },
      onAbout: () => {
        state.showAboutModel = true;
      },
      onSettings: () => {
        state.showSettings = true;
      },
      onSetLanguage: (code: string) => {
        if (code !== "auto") {
          state.langConf = code;
          state.langCode = code;
          i18n.changeLanguage(code);
        } else {
          state.langConf = code;
          ipcRenderer.send("get-locale");
        }
        saveConfig("language", code);
      },
      onSetTheme: (t: string) => {
        if (t !== "auto") {
          state.themeConf = t;
          state.themeCode = t;
        } else {
          state.themeConf = t;
          ipcRenderer.send("get-dark-light");
        }
        saveConfig("theme", t);
      },
      onModify: () => {
        console.log("modify");
        state.modified = true;
        if (state.currentFile) state.currentFile.time = Date.now();
        if (state.sl && state.sl.c)
          state.undoStack.push({
            s: JSON.stringify(state.notation?.code()),
            c: state.sl.c,
          });
        state.redoStack.length = 0;
        if (state.autoSave && !state.isNew) {
          state.events?.onSave();
        }
      },
      onClearRecent: () => {
        state.recents = [];
        saveFileConfig();
      },
    };
    return function () {
      ipcRenderer.removeAllListeners("open-file-reply");
      ipcRenderer.removeAllListeners("new-file-reply");
      ipcRenderer.removeAllListeners("save-reply");
      ipcRenderer.removeAllListeners("save-as-reply");
      ipcRenderer.removeAllListeners("full-screen-status");
      ipcRenderer.removeAllListeners("max-status");
      ipcRenderer.removeAllListeners("get-locale-reply");
      ipcRenderer.removeAllListeners("get-dark-light-reply");
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
    ipcRenderer.on("full-screen-status", (e, status: boolean) => {
      state.fullScreenStatus = status;
    });
    ipcRenderer.on("max-status", (e, status: boolean) => {
      state.maxStatus = status;
    });
    ipcRenderer.on("get-locale-reply", (e, code: string) => {
      if (state.langConf === "auto") {
        console.log(code);
        i18n.changeLanguage(code);

        state.langCode = code;
      }
    });
    ipcRenderer.on("get-dark-light-reply", (e, t: string) => {
      if (state.themeConf === "auto") {
        console.log(t);
        state.changeTheme(t);
      }
    });
    return function () {
      ipcRenderer.removeAllListeners("open-file-reply");
      ipcRenderer.removeAllListeners("new-file-reply");
      ipcRenderer.removeAllListeners("save-reply");
      ipcRenderer.removeAllListeners("save-as-reply");
      ipcRenderer.removeAllListeners("full-screen-status");
      ipcRenderer.removeAllListeners("max-status");
      ipcRenderer.removeAllListeners("get-locale-reply");
      ipcRenderer.removeAllListeners("get-dark-light-reply");
    };
  });
  useEffect(() => {
    hotkeys("ctrl+shift+i,cmd+alt+i", { keyup: true, keydown: false }, () => {
      ipcRenderer.send("toggle-dev-tools");
    });
    hotkeys("f11", { keyup: true, keydown: false }, () => {
      ipcRenderer.send("app-toggle-full-screen");
    });
    hotkeys("ctrl+o", { keyup: true, keydown: false }, () =>
      state.events?.onOpen()
    );
    hotkeys("ctrl+n", { keyup: true, keydown: false }, () =>
      state.events?.onNew()
    );
    hotkeys("ctrl+s", { keyup: true, keydown: false }, () =>
      state.events?.onSave()
    );
    hotkeys("ctrl+shift+s", { keyup: true, keydown: false }, () =>
      state.events?.onSaveAs()
    );
    hotkeys("ctrl+d", { keyup: true, keydown: false }, () =>
      state.events?.onEditMetaData()
    );
    hotkeys("ctrl+e", { keyup: true, keydown: false }, () =>
      state.events?.onExport()
    );
    hotkeys("ctrl+z", { keyup: true, keydown: false }, () =>
      state.events?.onUndo()
    );
    hotkeys("ctrl+y", { keyup: true, keydown: false }, () =>
      state.events?.onRedo()
    );
    hotkeys("ctrl+x", { keyup: true, keydown: false }, () =>
      state.events?.onClose()
    );
    hotkeys("ctrl+q", { keyup: true, keydown: false }, () =>
      state.events?.onExit()
    );
    hotkeys("ctrl+shift+h", { keyup: true, keydown: false }, () =>
      state.events?.onSetHorizontal()
    );
    hotkeys("ctrl+shift+v", { keyup: true, keydown: false }, () =>
      state.events?.onSetVertical()
    );
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
    state.langConf = c.language;
    state.themeConf = c.theme;
    state.changeTheme(c.theme);
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
  let locales: Record<string, Locale> = { "en-US": enUS, "zh-CN": zhCN };
  return useObserver(() => (
    <div id="app">
      <ConfigProvider locale={locales[state.langCode]}>
        {state.opened === true ? (
          <>
            <Spin spinning={state.appLoading}>
              <Header />
              <Toolbar />
              <Content />
              <Footer />
              <EditMetaModal />
              <AboutModal />
              <SettingsModal />
              <ExportModal />
              <SureClose />
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
      </ConfigProvider>
    </div>
  ));
};

export default App;
