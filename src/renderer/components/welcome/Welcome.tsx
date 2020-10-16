import React, { FC } from "react";
import { List } from "antd";
import {
  FileAddOutlined,
  FolderOpenOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { ipcRenderer } from "electron";
import { useObserver } from "mobx-react";
import { Menu, MenuItem } from "../menu";
import { useAppState } from "../app";
import { getFileFolder, getFileName } from "../../../shared/utils";
import "./style.css";
import { Meta } from "./meta";

export const Welcome: FC = () => {
  let state = useAppState();
  return useObserver(() => (
    <div className="welcome">
      <div
        className="welcome__sider"
        style={{ background: state.theme.colorPrimary }}
      >
        <Menu
          style={{
            background: state.theme.colorPrimary,
            marginTop: "5rem",
            color: state.theme.colorBackground,
          }}
          mode="vertical"
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
        <div className="welcome__recent-files">
          <List
            itemLayout="horizontal"
            dataSource={state.recents}
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
                  time={`${new Date(it.time).toLocaleString()}`}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  ));
};
