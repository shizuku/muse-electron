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
import { ModelInjector } from "../model-injector";
import "./app.css";
import { RootInstance } from "../../models";

export interface AppProps {
  root: RootInstance;
}

export const App: FC<AppProps> = observer(({ root }) => {
  const onOpen = () => {
    ipcRenderer.send("open-file");
  };
  const onNew = () => {
    ipcRenderer.send("new-file");
  };
  const onSave = (cb?: (r: string) => void) => {
    if (root.file.isOpen && root.file.isModified) {
      if (root.file.isNew) {
        onSaveAs(cb);
      } else {
        ipcRenderer.once("save-as-reply", (ev, r: string, newPath: string) => {
          if (r === "success") {
            console.log("File.saveAs: success");
            root.file.finishSave(newPath);
          } else {
            console.log("File.saveAs: canceled");
          }
          if (cb) cb(r);
        });
        ipcRenderer.send("save-as", "", root.file.data);
      }
    }
  };
  const onSaveAs = (cb?: (r: string) => void) => {
    if (root.file.isOpen) {
      ipcRenderer.once("save-as-reply", (ev, r: string, newPath: string) => {
        if (r === "success") {
          console.log("File.saveAs: success");
          root.file.finishSave(newPath);
        } else {
          console.log("File.saveAs: canceled");
        }
        if (cb) cb(r);
      });
      ipcRenderer.send("save-as", "", root.file.data);
    }
  };
  const onUndo = () => {};
  const onRedo = () => {};

  const onShowEditMetaDataModal = () => {};
  const onShowExportModal = () => {};
  const onSetTwoPage = () => {};
  const onSetOnePage = () => {};
  const onExit = () => {};
  const saveConfig = () => {};
  const toggleFullScreen = () => {
    ipcRenderer.send("app-toggle-full-screen");
  };
  const onMin = () => {
    ipcRenderer.send("app-minimize");
  };
  const toggleMax = () => {
    ipcRenderer.send("app-toggle-max");
  };
  const onClose = () => {};
  const saveFileConfig = () => {};
  useEffect(() => {
    ipcRenderer.on("open-file-reply", (event, path: string, data: string) => {
      if (data !== "") {
        root.file.open(path, data, false);
        saveFileConfig();
      }
    });
    ipcRenderer.on(
      "new-file-reply",
      (event, filePath: string, data: string) => {
        root.file.open(filePath, data, true);
      }
    );
    ipcRenderer.on("full-screen-status", (e, status: boolean) => {
      root.ui.window.setFullScreen(status);
    });
    ipcRenderer.on("max-status", (e, status: boolean) => {
      root.ui.window.setMax(status);
    });
    ipcRenderer.on("get-locale-reply", (e, code: string) => {
      if (root.config.confLang === "auto") {
        console.log("auto locale to:", code);
        root.config.setMachineLang(code);
      }
    });
    ipcRenderer.on("get-dark-light-reply", (e, code: string) => {
      if (root.config.confTheme === "auto") {
        console.log("auto theme to: ", code);
        root.config.setMachineTheme(code);
      }
    });
    return function() {
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
    hotkeys("ctrl+o", { keyup: true, keydown: false }, () => onOpen());
    hotkeys("ctrl+n", { keyup: true, keydown: false }, () => onNew());
    hotkeys("ctrl+s", { keyup: true, keydown: false }, () => onSave());
    hotkeys("ctrl+shift+s", { keyup: true, keydown: false }, () => onSaveAs());
    hotkeys("ctrl+d", { keyup: true, keydown: false }, () =>
      onShowEditMetaDataModal()
    );
    hotkeys("ctrl+e", { keyup: true, keydown: false }, () =>
      onShowExportModal()
    );
    hotkeys("ctrl+z", { keyup: true, keydown: false }, () => onUndo());
    hotkeys("ctrl+y", { keyup: true, keydown: false }, () => onRedo());
    hotkeys("ctrl+x", { keyup: true, keydown: false }, () => onClose());
    hotkeys("ctrl+q", { keyup: true, keydown: false }, () => onExit());
    hotkeys("ctrl+shift+h", { keyup: true, keydown: false }, () =>
      onSetTwoPage()
    );
    hotkeys("ctrl+shift+v", { keyup: true, keydown: false }, () =>
      onSetOnePage()
    );
  });
  useEffect(() => {
    root.ui.window.dimens.setWindowH(document.body.clientHeight);
    root.ui.window.dimens.setWindowW(document.body.clientWidth);
    window.onresize = () => {
      root.ui.window.dimens.setWindowH(document.body.clientHeight);
      root.ui.window.dimens.setWindowW(document.body.clientWidth);
    };
    window.addEventListener("mousemove", (e) => {
      if (e.clientY < 30 && e.clientY > 0) {
        root.ui.window.setHeaderHover(true);
        root.ui.window.setFooterHover(false);
      } else if (
        e.clientY < root.ui.window.dimens.windowH &&
        e.clientY > root.ui.window.dimens.windowH - 30
      ) {
        root.ui.window.setHeaderHover(false);
        root.ui.window.setFooterHover(true);
      } else {
        root.ui.window.setHeaderHover(false);
        root.ui.window.setFooterHover(false);
      }
    });
  });
  let locales: Record<string, Locale> = { "en-US": enUS, "zh-CN": zhCN };
  return (
    <div id="app">
      <ModelInjector>
        {(root) => (
          <ConfigProvider locale={locales[root.config.lang]}>
            <Header
              dimens={root.ui.window.dimens}
              file={root.file}
              config={root.config}
              theme={root.config.theme.theme}
              win={root.ui.window}
              onExit={onExit}
              onMin={onMin}
              onRedo={onRedo}
              onSave={onSave}
              onUndo={onUndo}
              toggleFullScreen={toggleFullScreen}
              toggleMax={toggleMax}
            />
            <Toolbar />
            <Content
              theme={root.config.theme.theme}
              config={root.config}
              dimens={root.ui.window.dimens}
            />
            <Footer
              dimens={root.ui.window.dimens}
              file={root.file}
              config={root.config}
              theme={root.config.theme.theme}
              win={root.ui.window}
            />
            <Welcome
              model={root.components.welcome}
              modal={root.components.modal}
              file={root.file}
              config={root.config}
              theme={root.config.theme.theme}
            />
            <Modals />
          </ConfigProvider>
        )}
      </ModelInjector>
    </div>
  );
});
