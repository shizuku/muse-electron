import React, { FC, useEffect, useRef } from "react";
import {
  CloseOutlined,
  BorderOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { FileContext } from "../../FileContext";
import "./style.css";
import { ipcRenderer } from "electron";
import { Heights } from "../../app";
import { ThemeContext } from "../../ThemeContext";

export const Header: FC<{ h: Heights }> = ({ h }: { h: Heights }) => {
  useEffect(() => {
    h.header = r.current?.clientHeight || 0;
  });
  let r = useRef<HTMLDivElement>(null);
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <FileContext.Consumer>
          {({ fileName }) => (
            <div
              className="header"
              ref={r}
              style={{
                background: theme.colorPrimary,
                color: theme.colorBackground,
              }}
            >
              <div className="header__drag-region"></div>
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
      )}
    </ThemeContext.Consumer>
  );
};
