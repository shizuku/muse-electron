import React, { FC } from "react";
import {
  CloseOutlined,
  BorderOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { FileContext } from "../../FileContext";
import "./style.css";
import { ipcRenderer } from "electron";

export const Header: FC = () => {
  return (
    <FileContext.Consumer>
      {({ fileName }) => (
        <div className="header">
          <div className="header__app-logo"></div>
          <div className="header__window-title">
            {fileName === "" ? `Muse` : `${fileName} - Muse`}
          </div>
          <div className="header__controls">
            <div
              className="window-icon minimize"
              onClick={() => {
                ipcRenderer.send("app-minimize");
              }}
            >
              <MinusOutlined />
            </div>
            <div
              className="window-icon maximize"
              onClick={() => {
                ipcRenderer.send("app-maximize");
              }}
            >
              <BorderOutlined />
            </div>
            <div
              className="window-icon close"
              onClick={() => {
                ipcRenderer.send("app-close");
              }}
            >
              <CloseOutlined />
            </div>
          </div>
        </div>
      )}
    </FileContext.Consumer>
  );
};
