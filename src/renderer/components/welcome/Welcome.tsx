import React, { FC } from "react";
import { List } from "antd";
import {
  FileAddOutlined,
  FolderOpenOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { ipcRenderer } from "electron";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem } from "./menu";
import { basename, dirname } from "path";
import { Meta } from "./meta";
import { FileInstance } from "../../models/file";
import { ThemeItemInstance } from "../../models/config/theme";
import { ModalInstance } from "../../models/components/modal";
import { WelcomeInstance } from "../../models/components/welcome";
import { ConfigInstance } from "../../models/config";
import "./style.css";

export interface WelcomeProps {
  model: WelcomeInstance;
  file: FileInstance;
  theme: ThemeItemInstance;
  modal: ModalInstance;
  config: ConfigInstance;
}

export const Welcome: FC<WelcomeProps> = observer(
  ({ file, theme, modal, model, config }) => {
    const { t } = useTranslation();
    return (
      <div
        className="welcome"
        style={{ background: theme.welcomeContentBackground }}
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
                onClick={() => file.new()}
              >
                {t("welcome.new-file")}
              </MenuItem>
              <MenuItem
                key="1"
                size="l"
                icon={<FolderOpenOutlined />}
                onClick={() => file.open()}
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
              <MenuItem
                key="0"
                size="l"
                onClick={() => modal.preference.show()}
              >
                {t("toolbar.about.preference")}
              </MenuItem>
              <MenuItem key="1" size="l" onClick={() => modal.about.show()}>
                {t("toolbar.about.about")}
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div
          className="welcome__content"
          style={{ background: theme.welcomeContentBackground }}
        >
          <h2>{t("welcome.recent")}</h2>
          <div className="welcom__clear">
            <a onClick={() => file.clearRecent()}>
              {t("welcome.recent-clear")}
            </a>
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
