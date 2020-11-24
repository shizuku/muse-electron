import React, { FC } from "react";
import { List } from "antd";
import {
  FileAddOutlined,
  FolderOpenOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { ipcRenderer } from "electron";
import { observer } from "mobx-react";
import { Menu, MenuItem } from "./menu";
import { basename, dirname } from "path";
import { Meta } from "./meta";
import { ThemeItemInstance } from "../../models/values/themes/theme-item";
import { FileInstance } from "../../models/file";
import { WelcomeInstance } from "../../models/components/welcome";
import { LocaleStringsInstance } from "../../models/values/strings/locale-strings";
import { ConfigInstance } from "../../models/config";
import "./style.css";

export interface WelcomeProps {
  model: WelcomeInstance;
  file: FileInstance;
  theme: ThemeItemInstance;
  config: ConfigInstance;
  t: LocaleStringsInstance;
  onOpen: () => void;
  onNew: () => void;
  onClearRecent: () => void;
  onShowPreferenceModal: () => void;
  onShowAboutModal: () => void;
}

export const Welcome: FC<WelcomeProps> = observer(
  ({
    file,
    theme,
    model,
    config,
    t,
    onNew,
    onOpen,
    onClearRecent,
    onShowAboutModal,
    onShowPreferenceModal,
  }) => {
    return (
      <div
        className="welcome"
        style={
          file.isOpen
            ? { display: "none" }
            : { background: theme.welcomeContentBackground }
        }
      >
        <div
          className="welcome__sider"
          style={{
            background: theme.welcomeSiderBackground,
            color: theme.welcomeSiderText,
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
                onClick={() => onNew()}
              >
                {t["welcome_new-file"]}
              </MenuItem>
              <MenuItem
                key="1"
                size="l"
                icon={<FolderOpenOutlined />}
                onClick={() => onOpen()}
              >
                {t["welcome_open"]}
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
              <MenuItem
                key="0"
                size="l"
                onClick={() => onShowPreferenceModal()}
              >
                {t["toolbar_about_preference"]}
              </MenuItem>
              <MenuItem key="1" size="l" onClick={() => onShowAboutModal()}>
                {t["toolbar_about"]}
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div
          className="welcome__content"
          style={{ background: theme.welcomeContentBackground }}
        >
          <h2>{t["welcome_recents"]}</h2>
          <div className="welcom__clear">
            <a onClick={() => onClearRecent()}>{t["welcome_recents-clear"]}</a>
          </div>
          <div className="welcome__recent-files">
            <List
              itemLayout="horizontal"
              dataSource={model.sortedRecents}
              style={{ background: theme.welcomeContentBackground }}
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
                        {basename(it.path)}
                      </a>
                    }
                    description={`${dirname(it.path)}`}
                    time={`${new Date(it.time).toLocaleString(config.lang)}`}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
);
