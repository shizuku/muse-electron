import React from "react";
import { Layout, Menu, List } from "antd";
import {
  FileAddOutlined,
  FolderOpenOutlined,
  FileOutlined,
} from "@ant-design/icons";
const { Sider, Content } = Layout;
import "./style.css";
import { ipcRenderer } from "electron";
import { RecentContext } from "../../RecentContext";

export const Welcome: React.FC = () => {
  return (
    <Layout className="welcome">
      <Sider className="welcome__sider" theme="light">
        <h1 className="welcome__sider-title">{"Muse"}</h1>
        <Menu
          theme="light"
          mode="inline"
          className="welcome__sider-menu"
          selectable={true}
        >
          <Menu.Item
            key="0"
            icon={<FileAddOutlined />}
            onClick={() => {
              ipcRenderer.send("new-file");
            }}
          >
            New File
          </Menu.Item>
          <Menu.Item
            key="1"
            icon={<FolderOpenOutlined />}
            onClick={() => {
              ipcRenderer.send("open-file");
            }}
          >
            Open
          </Menu.Item>
        </Menu>
      </Sider>
      <Content>
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
      </Content>
    </Layout>
  );
};
