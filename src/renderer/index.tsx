import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../shared/locales";
import { App } from "./components/app";
import "./index.css";
import { ipcRenderer } from "electron";

ReactDOM.render(<App />, document.getElementById("root"));

ipcRenderer.send("get-locale");
ipcRenderer.send("get-dark-light");
