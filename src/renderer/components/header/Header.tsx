import React, { CSSProperties, FC } from "react";
import {
  CloseOutlined,
  AppstoreOutlined,
  BorderOutlined,
  MinusOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import { ipcRenderer } from "electron";
import { useObserver } from "mobx-react";
import { FuncBar } from "../func-bar";
import { useAppState } from "../app";
import "./style.css";

const DisplayPopup: FC = () => {
  let state = useAppState();
  return useObserver(() => (
    <div className="display-popup">
      <div
        className="display-popup__item"
        onClick={() => {
          state.display = "full";
        }}
        style={
          state.display === "full"
            ? { background: state.theme.colorPrimaryLight }
            : {}
        }
      >
        Show All
      </div>
      <div
        className="display-popup__item"
        onClick={() => {
          state.display = "headfoot";
        }}
        style={
          state.display === "headfoot"
            ? { background: state.theme.colorPrimaryLight }
            : {}
        }
      >
        Hide toolbar
      </div>
      <div
        className="display-popup__item"
        onClick={() => {
          state.display = "content";
        }}
        style={
          state.display === "content"
            ? { background: state.theme.colorPrimaryLight }
            : {}
        }
      >
        Only show content
      </div>
    </div>
  ));
};

export const Header: FC = () => {
  let state = useAppState();
  let styleHover = () => {
    switch (state.display) {
      case "full":
      case "headfoot":
        return {
          display: "block",
          background: state.theme.colorPrimary,
          color: state.theme.colorBackground,
        } as CSSProperties;
      case "content":
        return {
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          background: state.theme.colorPrimary,
          color: state.theme.colorBackground,
        } as CSSProperties;
    }
  };
  let styleUnhover = () => {
    switch (state.display) {
      case "full":
      case "headfoot":
        return {
          display: "block",
          background: state.theme.colorPrimary,
          color: state.theme.colorBackground,
        } as CSSProperties;
      case "content":
        return (state.opened
          ? {
              display: "none",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              background: state.theme.colorPrimary,
              color: state.theme.colorBackground,
            }
          : {
              display: "block",
              background: state.theme.colorPrimary,
              color: state.theme.colorBackground,
            }) as CSSProperties;
    }
  };
  return useObserver(() => (
    <div
      className="header"
      ref={(e) => {
        let h = e?.clientHeight || 0;
        state.windowDim.header = h;
      }}
      style={state.headerHover ? styleHover() : styleUnhover()}
    >
      <div className="header__drag-region"></div>
      {state.opened ? <FuncBar /> : <></>}
      <div className="header__window-title">
        {state.fileName === "" ? `Muse` : `${state.fileName} - Muse`}
      </div>
      <div className="header__controls">
        <Popover
          placement="topLeft"
          title={"Display style"}
          content={<DisplayPopup />}
          trigger="click"
        >
          <div className="window-icon hover-gray" onClick={() => {}}>
            <MenuFoldOutlined />
          </div>
        </Popover>
        <div
          className="window-icon hover-gray"
          onClick={() => {
            ipcRenderer.send("app-toggle-full-screen");
          }}
        >
          {state.fullScreenStatus ? (
            <FullscreenExitOutlined />
          ) : (
            <FullscreenOutlined />
          )}
        </div>
        <div
          className="window-icon hover-gray"
          onClick={() => {
            ipcRenderer.send("app-minimize");
          }}
        >
          <MinusOutlined />
        </div>
        <div
          className="window-icon hover-gray"
          onClick={() => {
            ipcRenderer.send("app-toggle-max");
          }}
        >
          {state.maxStatus ? <AppstoreOutlined /> : <BorderOutlined />}
        </div>
        <div
          className="window-icon hover-red"
          onClick={() => {
            ipcRenderer.send("app-close");
          }}
        >
          <CloseOutlined />
        </div>
      </div>
    </div>
  ));
};
