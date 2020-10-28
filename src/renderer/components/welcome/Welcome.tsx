import React, { FC } from "react";
import { List } from "antd";
import {
  FileAddOutlined,
  FolderOpenOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { ipcRenderer } from "electron";
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem } from "./menu";
import { useAppState } from "../../states";
import { getFileFolder, getFileName } from "../../../shared/utils";
import "./style.css";
import { Meta } from "./meta";

export const Welcome: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  return useObserver(() => (
    <div
      className="welcome"
      style={{ background: state.theme.colorBackground }}
    >
      <div
        className="welcome__sider"
        style={{
          background: state.theme.colorPrimary,
          color: state.theme.colorTextLight,
        }}
      >
        <div
          className="welcome__sider__top"
          style={{
            marginTop: "5rem",
          }}
        >
          <Menu mode="vertical">
            <MenuItem
              key="0"
              size="l"
              icon={<FileAddOutlined />}
              onClick={() => state.onNew()}
            >
              {t("welcome.new-file")}
            </MenuItem>
            <MenuItem
              key="1"
              size="l"
              icon={<FolderOpenOutlined />}
              onClick={() => state.onOpen()}
            >
              {t("welcome.open")}
            </MenuItem>
          </Menu>
        </div>
        <div
          className="welcome__sider__bottom"
          style={{
            marginBottom: "3rem",
          }}
        >
          <Menu mode="vertical">
            <MenuItem key="0" size="l" onClick={() => state.onSettings()}>
              {t("toolbar.about.preference")}
            </MenuItem>
            <MenuItem key="1" size="l" onClick={() => state.onAbout()}>
              {t("toolbar.about.about")}
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div
        className="welcome__content"
        style={{ background: state.theme.colorBackground }}
      >
        <h2>{t("welcome.recent")}</h2>
        <div className="welcom__clear">
          <a onClick={() => state.onClearRecent()}>
            {t("welcome.recent-clear")}
          </a>
        </div>
        <div className="welcome__recent-files">
          <List
            itemLayout="horizontal"
            dataSource={state.sortedRecents}
            style={{ background: state.theme.colorBackground }}
            renderItem={(it) => (
              <List.Item>
                <Meta
                  avatar={<FileOutlined style={{ fontSize: "3rem" }} />}
                  title={
                    <a
                      onClick={() => {
                        ipcRenderer.send("open-file", it.path);
                      }}
                    >
                      {getFileName(it.path)}
                    </a>
                  }
                  description={`${getFileFolder(it.path)}`}
                  time={`${new Date(it.time).toLocaleString(state.langCode)}`}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  ));
};
