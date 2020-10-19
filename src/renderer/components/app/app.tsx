import React, { FC, useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import hotkeys from "hotkeys-js";
import {
  Modal,
  notification,
  Spin,
  Input,
  Form,
  ConfigProvider,
  Button,
} from "antd";
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
import {
  generateScreenshot,
  getImageData,
  getImageArrayBuffer,
} from "../../../shared/utils";
import { AppState, DisplayStyle, useAppState } from "./AppStateContext";
import { loadConfigs, saveConfig } from "./store";
import "./app.css";

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
  const { t, i18n } = useTranslation();
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
      onExport: () => {
        ipcRenderer.send("export");
      },
      onClose: () => state.close(),
      onUndo: () => {},
      onRedo: () => {},
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
          ipcRenderer.send(
            "app-close-modified",
            "Not Save",
            "There are some modify not saved, do you want to save it before exit?"
          );
        } else {
          ipcRenderer.send("app-close");
        }
      },
      onAbout: () => {
        state.showAboutModel = true;
      },
      onSettings: () => {},
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
        state.modified = false;
      } else {
        openNotificationWithIcon(
          "warning",
          t("notifiction-save-fail"),
          "",
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
          t("notifiction-export-success"),
          "",
          "bottomRight"
        );
      }
    });
    ipcRenderer.on("get-locale-reply", (e, code: string) => {
      console.log(code);
      i18n.changeLanguage(code);
      state.locale = code;
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

const EditMetaModal: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  let [title, setTitle] = useState(state.notation?.info.title || "");
  let [subTitle, setSubTitle] = useState(state.notation?.info.subtitle || "");
  let [author, setAuthor] = useState(
    state.notation?.info.author.reduce((a, b) => a + b + "\n", "") || ""
  );
  const handleCancel = () => {
    state.showEditMetaModel = false;
  };
  const handleOk = () => {
    if (state.notation) {
      state.notation.info.title = title;
      state.notation.info.subtitle = subTitle;
      state.notation.info.author = author.split("\n").filter((it) => it !== "");
    }
    state.modified = true;
    state.showEditMetaModel = false;
  };
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onSubTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubTitle(e.target.value);
  };
  const onAuthorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAuthor(e.target.value);
  };
  return useObserver(() => (
    <Modal
      title={t("modal-meta")}
      visible={state.showEditMetaModel}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 0 }}>
        <Form.Item label={t("modal-meta-title")}>
          <Input onChange={onTitleChange} value={title} />
        </Form.Item>
        <Form.Item label={t("modal-meta-subtitle")}>
          <Input onChange={onSubTitleChange} value={subTitle} />
        </Form.Item>
        <Form.Item label={t("modal-meta-author")}>
          <Input.TextArea onChange={onAuthorChange} value={author} rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  ));
};

const AboutModal: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  const cancel = () => {
    state.showAboutModel = false;
  };
  return useObserver(() => (
    <Modal
      title={t("modal-about")}
      visible={state.showAboutModel}
      onCancel={cancel}
      footer={[]}
    >
      ABOUTABOUTABOUTABOUTABOUTABOUTABOUTABOUTABOUTABOUTABOUTABOUT
    </Modal>
  ));
};

const AppHolder: React.FC = () => {
  let state = useAppState();
  let locales: Record<string, Locale> = { "en-US": enUS, "zh-CN": zhCN };
  return useObserver(() => (
    <div id="app">
      <ConfigProvider locale={locales[state.locale]}>
        {state.opened === true ? (
          <>
            <Spin spinning={state.appLoading}>
              <Header />
              <Toolbar />
              <Content />
              <Footer />
              <EditMetaModal />
              <AboutModal />
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
