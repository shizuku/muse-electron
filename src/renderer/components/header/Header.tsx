import React, { FC } from "react";
import {
  CloseOutlined,
  BorderOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { ipcRenderer } from "electron";
import { useObserver } from "mobx-react";
import { AppStateContext } from "../../AppStateContext";
import "./style.css";

export const Header: FC = () => {
  return useObserver(() => (
    <AppStateContext.Consumer>
      {(state) => (
        <div
          className="header"
          ref={(e) => {
            state.heights.header = e?.clientHeight || 0;
          }}
          style={{
            background: state.theme.colorPrimary,
            color: state.theme.colorBackground,
          }}
        >
          <div className="header__drag-region"></div>
          <div className="header__app-logo"></div>
          <div className="header__window-title">
            {state.fileName === "" ? `Muse` : `${state.fileName} - Muse`}
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
    </AppStateContext.Consumer>
  ));
};
