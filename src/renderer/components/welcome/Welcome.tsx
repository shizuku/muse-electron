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
import { useAppState } from "../../AppStateContext";
import { getFileFolder, getFileName } from "../../../shared/utils";
import "./style.css";

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
                <List.Item.Meta
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
                  description={`${getFileFolder(it.path)}\t${new Date(
                    it.time
                  ).toLocaleString()}`}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  ));
};
