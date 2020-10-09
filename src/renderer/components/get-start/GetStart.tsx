import React from "react";
import { Layout, Menu } from "antd";
import { FileAddOutlined, FolderOpenOutlined } from "@ant-design/icons";
const { Sider, Content } = Layout;
import "./style.css";
import { ipcRenderer } from "electron";

export const GetStart: React.FC = () => {
  return (
    <Layout className="get-start">
      <Sider className="get-start__sider">
        <h1 className="get-start__sider-title">{"Muse"}</h1>
        <Menu
          theme="dark"
          mode="inline"
          className="get-start__sider-menu"
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
        <div className="get-start__content">
          <h2>Recent</h2>
          <div></div>
        </div>
      </Content>
    </Layout>
  );
};
