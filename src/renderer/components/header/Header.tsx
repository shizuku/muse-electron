import React, { CSSProperties, FC } from "react";
import {
  CloseOutlined,
  AppstoreOutlined,
  BorderOutlined,
  MinusOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  MenuFoldOutlined,
  SaveOutlined,
  UndoOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Popover, Tooltip } from "antd";
import { ipcRenderer } from "electron";
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { FuncBar } from "../func-bar";
import { useAppState } from "../../states";
import { MaxmizeOutlined, MinimizeOutlined } from "../icons";
import { FuncButton } from "../func-bar/func-button";
import "./style.css";

const DisplayPopup: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  return useObserver(() => (
    <div className="display-popup">
      <div
        className="display-popup__item"
        onClick={() => state.onSetDisplay("full")}
        style={
          state.display === "full"
            ? { background: state.theme.colorPrimaryLight }
            : {}
        }
      >
        {t("header.display.show-all")}
      </div>
      <div
        className="display-popup__item"
        onClick={() => state.onSetDisplay("headfoot")}
        style={
          state.display === "headfoot"
            ? { background: state.theme.colorPrimaryLight }
            : {}
        }
      >
        {t("header.display.headfoot")}
      </div>
      <div
        className="display-popup__item"
        onClick={() => state.onSetDisplay("content")}
        style={
          state.display === "content"
            ? { background: state.theme.colorPrimaryLight }
            : {}
        }
      >
        {t("header.display.content")}
      </div>
    </div>
  ));
};

export const Header: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  let styleHover = () => {
    switch (state.display) {
      case "full":
      case "headfoot":
        return {
          display: "block",
          background: state.theme.colorPrimary,
          color: state.theme.colorTextLight,
        } as CSSProperties;
      case "content":
        return {
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          background: state.theme.colorPrimary,
          color: state.theme.colorTextLight,
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
          color: state.theme.colorTextLight,
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
              color: state.theme.colorTextLight,
            }
          : {
              display: "block",
              background: state.theme.colorPrimary,
              color: state.theme.colorTextLight,
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
      <div className="header__group-left">
        {state.opened ? (
          <FuncBar>
            <Tooltip
              placement="topLeft"
              title={t("toolbar.file.save")}
              mouseEnterDelay={1}
            >
              <FuncButton
                onClick={() => state.onSave()}
                disable={!state.modified}
              >
                <SaveOutlined />
              </FuncButton>
            </Tooltip>
            <Tooltip
              placement="topLeft"
              title={t("toolbar.start.undo")}
              mouseEnterDelay={1}
            >
              <FuncButton
                onClick={() => state.onUndo()}
                disable={state.undoDisable}
              >
                <UndoOutlined />
              </FuncButton>
            </Tooltip>
            <Tooltip
              placement="topLeft"
              title={t("toolbar.start.redo")}
              mouseEnterDelay={1}
            >
              <FuncButton
                onClick={() => state.onRedo()}
                disable={state.redoDisable}
              >
                <RedoOutlined />
              </FuncButton>
            </Tooltip>
          </FuncBar>
        ) : (
          <></>
        )}
      </div>
      <div className="header__window-title">
        {!state.opened
          ? `Muse`
          : `${state.fileName}${state.modified ? "*" : ""} - ${t("app-name")}`}
      </div>
      <div className="header__controls">
        <Popover
          placement="topLeft"
          title={t("header.display.display")}
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
          {state.maxStatus ? <MinimizeOutlined /> : <MaxmizeOutlined />}
        </div>
        <div
          className="window-icon hover-red"
          onClick={() => state.onExit()}
        >
          <CloseOutlined />
        </div>
      </div>
    </div>
  ));
};
