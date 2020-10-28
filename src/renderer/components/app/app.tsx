import React, { FC, useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import hotkeys from "hotkeys-js";
import { Spin, ConfigProvider } from "antd";
import { Locale } from "antd/lib/locale-provider";
import zhCN from "antd/es/locale/zh_CN";
import enUS from "antd/es/locale/en_US";
import { useObserver, Provider } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Welcome } from "../welcome";
import { Content } from "../content";
import { Toolbar } from "../toolbar";
import { Header } from "../header";
import { Footer } from "../footer";
import { AppState, DisplayStyle, useAppState } from "../../states";
import { loadConfigs, saveConfig } from "./store";
import { openNotificationWithIcon } from "../../utils";
import {
  AboutModal,
  EditMetaModal,
  ExportModal,
  PreferenceModal,
  SureCloseModal,
} from "../modal";
import "./app.css";

const App: FC = () => {
  let [state, setState] = useState<AppState>(new AppState());
  const { t, i18n } = useTranslation();
  const saveFileConfig = () => {
    if (state.currentFile) state.addRecentFile(state.currentFile, true);
    saveConfig("recent-files", state.recents);
  };
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
      state.onOpen()
    );
    hotkeys("ctrl+n", { keyup: true, keydown: false }, () =>
      state.onNew()
    );
    hotkeys("ctrl+s", { keyup: true, keydown: false }, () =>
      state.onSave()
    );
    hotkeys("ctrl+shift+s", { keyup: true, keydown: false }, () =>
      state.onSaveAs()
    );
    hotkeys("ctrl+d", { keyup: true, keydown: false }, () =>
      state.onEditMetaData()
    );
    hotkeys("ctrl+e", { keyup: true, keydown: false }, () =>
      state.onExport()
    );
    hotkeys("ctrl+z", { keyup: true, keydown: false }, () =>
      state.onUndo()
    );
    hotkeys("ctrl+y", { keyup: true, keydown: false }, () =>
      state.onRedo()
    );
    hotkeys("ctrl+x", { keyup: true, keydown: false }, () =>
      state.onClose()
    );
    hotkeys("ctrl+q", { keyup: true, keydown: false }, () =>
      state.onExit()
    );
    hotkeys("ctrl+shift+h", { keyup: true, keydown: false }, () =>
      state.onSetTwoPage()
    );
    hotkeys("ctrl+shift+v", { keyup: true, keydown: false }, () =>
      state.onSetOnePage()
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
        <Spin spinning={state.appLoading}>
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
          <EditMetaModal />
          <AboutModal />
          <PreferenceModal />
          <ExportModal />
          <SureCloseModal />
        </Spin>
      </ConfigProvider>
    </div>
  ));
};

export default App;
