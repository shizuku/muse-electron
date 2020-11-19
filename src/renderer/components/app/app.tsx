import React, { FC, useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import hotkeys from "hotkeys-js";
import { ConfigProvider } from "antd";
import { Locale } from "antd/lib/locale-provider";
import zhCN from "antd/es/locale/zh_CN";
import enUS from "antd/es/locale/en_US";
import { observer } from "mobx-react";
import { Welcome } from "../welcome";
import { Content } from "../content";
import { Toolbar } from "../toolbar";
import { Header } from "../header";
import { Footer } from "../footer";
import { Modals } from "../modal";
import "./app.css";
import { RootInstance } from "../../models";
import { ModelInjector } from "../model-injector";

const App: FC = observer(() => {
  // let [state, setState] = useState<AppState>(new AppState());
  // state.readConfigs();
  // useEffect(() => {
  //   ipcRenderer.on("open-file-reply", (event, path: string, data: string) => {
  //     if (data !== "") {
  //       state.open(path, data, false);
  //       state.saveFileConfig();
  //     }
  //   });
  //   ipcRenderer.on(
  //     "new-file-reply",
  //     (event, filePath: string, data: string) => {
  //       state.open(filePath, data, true);
  //     }
  //   );
  //   ipcRenderer.on("full-screen-status", (e, status: boolean) => {
  //     state.fullScreenStatus = status;
  //   });
  //   ipcRenderer.on("max-status", (e, status: boolean) => {
  //     state.maxStatus = status;
  //   });
  //   ipcRenderer.on("get-locale-reply", (e, code: string) => {
  //     if (state.langConf === "auto") {
  //       console.log("auto locale to:", code);
  //       state.changeLang("auto", code);
  //     } else {
  //       state.changeLang(state.langCode, state.langCode);
  //     }
  //   });
  //   ipcRenderer.on("get-dark-light-reply", (e, code: string) => {
  //     if (state.themeConf === "auto") {
  //       console.log("auto theme to: ", code);
  //       state.changeTheme("auto", code);
  //     } else {
  //       state.changeTheme(state.themeCode, state.themeCode);
  //     }
  //   });
  //   return function() {
  //     ipcRenderer.removeAllListeners("open-file-reply");
  //     ipcRenderer.removeAllListeners("new-file-reply");
  //     ipcRenderer.removeAllListeners("save-reply");
  //     ipcRenderer.removeAllListeners("save-as-reply");
  //     ipcRenderer.removeAllListeners("full-screen-status");
  //     ipcRenderer.removeAllListeners("max-status");
  //     ipcRenderer.removeAllListeners("get-locale-reply");
  //     ipcRenderer.removeAllListeners("get-dark-light-reply");
  //   };
  // });
  // useEffect(() => {
  //   hotkeys("ctrl+shift+i,cmd+alt+i", { keyup: true, keydown: false }, () => {
  //     ipcRenderer.send("toggle-dev-tools");
  //   });
  //   hotkeys("f11", { keyup: true, keydown: false }, () => {
  //     ipcRenderer.send("app-toggle-full-screen");
  //   });
  //   hotkeys("ctrl+o", { keyup: true, keydown: false }, () => state.onOpen());
  //   hotkeys("ctrl+n", { keyup: true, keydown: false }, () => state.onNew());
  //   hotkeys("ctrl+s", { keyup: true, keydown: false }, () => state.onSave());
  //   hotkeys("ctrl+shift+s", { keyup: true, keydown: false }, () =>
  //     state.onSaveAs()
  //   );
  //   hotkeys("ctrl+d", { keyup: true, keydown: false }, () =>
  //     state.onEditMetaData()
  //   );
  //   hotkeys("ctrl+e", { keyup: true, keydown: false }, () => state.onExport());
  //   hotkeys("ctrl+z", { keyup: true, keydown: false }, () => state.onUndo());
  //   hotkeys("ctrl+y", { keyup: true, keydown: false }, () => state.onRedo());
  //   hotkeys("ctrl+x", { keyup: true, keydown: false }, () => state.onClose());
  //   hotkeys("ctrl+q", { keyup: true, keydown: false }, () => state.onExit());
  //   hotkeys("ctrl+shift+h", { keyup: true, keydown: false }, () =>
  //     state.onSetTwoPage()
  //   );
  //   hotkeys("ctrl+shift+v", { keyup: true, keydown: false }, () =>
  //     state.onSetOnePage()
  //   );
  // });
  // useEffect(() => {
  //   state.windowDim.wh = document.body.clientHeight;
  //   state.windowDim.ww = document.body.clientWidth;
  //   window.onresize = () => {
  //     state.windowDim.wh = document.body.clientHeight;
  //     state.windowDim.ww = document.body.clientWidth;
  //   };
  //   window.addEventListener("mousemove", (e) => {
  //     if (e.clientY < 30 && e.clientY > 0) {
  //       state.headerHover = true;
  //       state.footerHover = false;
  //     } else if (
  //       e.clientY < state.windowDim.wh &&
  //       e.clientY > state.windowDim.wh - 30
  //     ) {
  //       state.headerHover = false;
  //       state.footerHover = true;
  //     } else {
  //       state.headerHover = false;
  //       state.footerHover = false;
  //     }
  //   });
  // });
  return <ModelInjector>{(root) => <AppHolder model={root} />}</ModelInjector>;
});

interface AppHolderProps {
  model: RootInstance;
}

const AppHolder: React.FC<AppHolderProps> = observer(({ model }) => {
  let locales: Record<string, Locale> = { "en-US": enUS, "zh-CN": zhCN };
  return (
    <div id="app">
      <ConfigProvider locale={locales[model.config.lang]}>
        <Header />
        <Toolbar />
        <Content />
        <Footer />
        <Welcome />
        <Modals />
      </ConfigProvider>
    </div>
  );
});

export default App;
