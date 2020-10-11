import React, { FC } from "react";
import { List } from "antd";
import {
  FileAddOutlined,
  FolderOpenOutlined,
  FileOutlined,
} from "@ant-design/icons";
import "./style.css";
import { ipcRenderer } from "electron";
import { RecentContext } from "../../RecentContext";
import { ThemeContext } from "../../ThemeContext";
import { Menu, MenuItem } from "../menu";

export const Welcome: FC = () => {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div className="welcome">
          <div
            className="welcome__sider"
            style={{ background: theme.colorPrimary }}
          >
            <Menu
              style={{
                background: theme.colorPrimary,
                marginTop: "5rem",
                color: theme.colorBackground,
              }}
            >
              <MenuItem
                key="0"
                size="l"
                icon={<FileAddOutlined />}
                onClick={() => {
                  ipcRenderer.send("new-file");
                }}
              >
                New File
              </MenuItem>
              <MenuItem
                key="1"
                size="l"
                icon={<FolderOpenOutlined />}
                onClick={() => {
                  ipcRenderer.send("open-file");
                }}
              >
                Open
              </MenuItem>
            </Menu>
          </div>
          <div className="welcome__content">
            <h2>Recent</h2>
            <RecentContext.Consumer>
              {({ files }) => (
                <div className="welcome__recent-files">
                  <List
                    itemLayout="horizontal"
                    dataSource={files}
                    renderItem={(it) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<FileOutlined style={{ fontSize: "3rem" }} />}
                          title={
                            <a
                              onClick={() => {
                                ipcRenderer.send("open-file", it.path);
                              }}
                            >
                              {it.name}
                            </a>
                          }
                          description={`${it.folder}\t${new Date(
                            it.time
                          ).toLocaleString()}`}
                        />
                      </List.Item>
                    )}
                  />
                </div>
              )}
            </RecentContext.Consumer>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};
