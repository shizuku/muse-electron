import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { ipcRenderer } from "electron";
import { App } from "./components/app";
import { RootModel } from "./models";
import { ModelInjector } from "./components/model-injector";
import "../shared/locales";
import "antd/dist/antd.css";
import "./index.css";

const root = RootModel.create();

ReactDOM.render(
  <Provider root={root}>
    <ModelInjector>{(root) => <App root={root} />}</ModelInjector>
  </Provider>,
  document.getElementById("root")
);

ipcRenderer.send("get-locale");
ipcRenderer.send("get-dark-light");
