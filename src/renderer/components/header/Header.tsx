import React, { CSSProperties, FC, useState } from "react";
import {
  CloseOutlined,
  BorderOutlined,
  MinusOutlined,
  FullscreenOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { ipcRenderer } from "electron";
import { useObserver } from "mobx-react";
import { useAppState } from "../../AppStateContext";
import "./style.css";
import { Popover } from "antd";

const DisplayPopup: FC = () => {
  let state = useAppState();
  return (
    <div className="display-popup">
      <div
        className="display-popup__item"
        onClick={() => {
          state.display = "full";
        }}
      >
        Show All
      </div>
      <div
        className="display-popup__item"
        onClick={() => {
          state.display = "foldtoolbar";
        }}
      >
        Fold toolbar
      </div>
      <div
        className="display-popup__item"
        onClick={() => {
          state.display = "headfoot";
        }}
      >
        Hide toolbar
      </div>
      <div
        className="display-popup__item"
        onClick={() => {
          state.display = "content";
        }}
      >
        Only show content
      </div>
    </div>
  );
};

export const HeaderHolder: FC<{ hover: boolean }> = ({
  hover,
}: {
  hover: boolean;
}) => {
  let state = useAppState();
  let styleHover = () => {
    switch (state.display) {
      case "full":
      case "foldtoolbar":
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
      case "foldtoolbar":
      case "headfoot":
        return {
          display: "block",
          background: state.theme.colorPrimary,
          color: state.theme.colorBackground,
        } as CSSProperties;
      case "content":
        return {
          display: "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          background: state.theme.colorPrimary,
          color: state.theme.colorBackground,
        } as CSSProperties;
    }
  };
  return useObserver(() => (
    <div
      className="header__container"
      ref={(e) => {
        let h = e?.clientHeight || 0;
        state.heights.header = h;
      }}
      style={hover ? styleHover() : styleUnhover()}
    >
      <div className="header__drag-region"></div>
      <div className="header__app-logo"></div>
      <div className="header__window-title">
        {state.fileName === "" ? `Muse` : `${state.fileName} - Muse`}
      </div>
      <div className="header__controls">
        <Popover
          placement="topLeft"
          title={"dada"}
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
          <FullscreenOutlined />
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
          <BorderOutlined />
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

export const Header: FC = () => {
  let [hover, setHover] = useState(false);
  return useObserver(() => (
    <div className="header">
      <div
        className="header__hover-region"
        style={{ height: 18 }}
        onMouseEnter={() => {
          console.log("enter");
          if (!hover) setHover(true);
        }}
        onMouseLeave={() => {
          console.log("leave");
          if (hover) setHover(false);
        }}
      ></div>
      <HeaderHolder hover={hover} />
    </div>
  ));
};
