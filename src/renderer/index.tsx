import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import "antd/dist/antd.css";
import "./index.css";

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById("root")
);
