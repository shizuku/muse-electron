import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import enUS from "antd/es/locale/en_US";
import "antd/dist/antd.css";
import { App } from "./components/app";
import "./index.css";

ReactDOM.render(
  <ConfigProvider locale={enUS}>
    <App />
  </ConfigProvider>,
  document.getElementById("root")
);
