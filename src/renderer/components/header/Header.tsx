import React, { CSSProperties, FC } from "react";
import {
  CloseOutlined,
  MinusOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  MenuFoldOutlined,
  SaveOutlined,
  UndoOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Popover, Tooltip } from "antd";
import is from "electron-is";
import { observer } from "mobx-react";
import { FuncBar } from "./func-bar";
import { MaxmizeOutlined, MinimizeOutlined } from "../icons";
import { FuncButton } from "./func-bar/func-button";
import { ConfigInstance } from "../../models/config";
import { ThemeItemInstance } from "../../models/values/themes/theme-item";
import { FileInstance } from "../../models/file";
import { DimensInstance } from "../../models/ui/window/dimens";
import { WindowInstance } from "../../models/ui/window";
import "./style.css";
import { LocaleStringsInstance } from "../../models/values/strings/locale-strings";

export interface DisplayPopupProps {
  config: ConfigInstance;
  theme: ThemeItemInstance;
  t: LocaleStringsInstance;
}

const DisplayPopup: FC<DisplayPopupProps> = observer(({ config, theme, t }) => {
  return (
    <div className="display-popup">
      <div
        className="display-popup__item"
        onClick={() => config.setDisplay("full")}
        style={
          config.display === "full"
            ? { background: theme.headerPopupActiveBackground }
            : {}
        }
      >
        {t["header_display_show-all"]}
      </div>
      <div
        className="display-popup__item"
        onClick={() => config.setDisplay("headfoot")}
        style={
          config.display === "headfoot"
            ? { background: theme.headerPopupActiveBackground }
            : {}
        }
      >
        {t["header_display_headfoot"]}
      </div>
      <div
        className="display-popup__item"
        onClick={() => config.setDisplay("content")}
        style={
          config.display === "content"
            ? { background: theme.headerPopupActiveBackground }
            : {}
        }
      >
        {t["header_display_content"]}
      </div>
    </div>
  );
});

export interface HeaderProps {
  config: ConfigInstance;
  theme: ThemeItemInstance;
  file: FileInstance;
  dimens: DimensInstance;
  t: LocaleStringsInstance;
  win: WindowInstance;
  toggleFullScreen: () => void;
  toggleMax: () => void;
  onMin: () => void;
  onExit: () => void;
  onSave: (cb?: (r: string) => void) => void;
  onUndo: () => void;
  onRedo: () => void;
}

export const Header: FC<HeaderProps> = observer(
  ({
    config,
    theme,
    file,
    dimens,
    t,
    win,
    toggleFullScreen,
    toggleMax,
    onMin,
    onExit,
    onSave,
    onUndo,
    onRedo,
  }) => {
    let styleHover = () => {
      switch (config.display) {
        case "full":
        case "headfoot":
          return {
            display: "block",
            background: theme.headerBackground,
            color: theme.headerText,
          } as CSSProperties;
        case "content":
          return {
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            background: theme.headerBackground,
            color: theme.headerText,
          } as CSSProperties;
      }
    };
    let styleUnhover = () => {
      switch (config.display) {
        case "full":
        case "headfoot":
          return {
            display: "block",
            background: theme.headerBackground,
            color: theme.headerText,
          } as CSSProperties;
        case "content":
          return (file.isOpen
            ? {
                display: "none",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                background: theme.headerBackground,
                color: theme.headerText,
              }
            : {
                display: "block",
                background: theme.headerBackground,
                color: theme.headerText,
              }) as CSSProperties;
      }
    };
    return (
      <div
        className="header"
        ref={(e) => {
          let h = e?.clientHeight || 0;
          dimens.setHeader(h);
        }}
        style={win.headerHover ? styleHover() : styleUnhover()}
      >
        <div className="header__drag-region"></div>
        <div
          className="header__group-left"
          style={is.macOS() ? { marginLeft: 65 } : {}}
        >
          {file.isOpen ? (
            <FuncBar>
              <Tooltip
                placement="topLeft"
                title={t["toolbar_file_save"]}
                mouseEnterDelay={1}
              >
                <FuncButton onClick={() => onSave()} disable={!file.isModified}>
                  <SaveOutlined />
                </FuncButton>
              </Tooltip>
              <Tooltip
                placement="topLeft"
                title={t["toolbar_start_undo"]}
                mouseEnterDelay={1}
              >
                <FuncButton onClick={() => onUndo()} disable={file.undoDisable}>
                  <UndoOutlined />
                </FuncButton>
              </Tooltip>
              <Tooltip
                placement="topLeft"
                title={t["toolbar_start_redo"]}
                mouseEnterDelay={1}
              >
                <FuncButton onClick={() => onRedo()} disable={file.redoDisable}>
                  <RedoOutlined />
                </FuncButton>
              </Tooltip>
            </FuncBar>
          ) : (
            <></>
          )}
        </div>
        <div className="header__window-title">
          {!file.isOpen
            ? `Muse`
            : `${file.conf.title}${file.isModified ? "*" : ""} - ${
                t["app-name"]
              }`}
        </div>
        <div className="header__controls">
          <Popover
            placement="topLeft"
            title={t["header_display"]}
            content={<DisplayPopup theme={theme} config={config} t={t} />}
            trigger="click"
          >
            <div className="window-icon hover-gray">
              <MenuFoldOutlined />
            </div>
          </Popover>
          <div
            className="window-icon hover-gray"
            onClick={() => toggleFullScreen()}
          >
            {win.fullScreen ? (
              <FullscreenExitOutlined />
            ) : (
              <FullscreenOutlined />
            )}
          </div>
          <div className="window-icon hover-gray" onClick={() => onMin()}>
            <MinusOutlined />
          </div>
          <div className="window-icon hover-gray" onClick={() => toggleMax()}>
            {win.max ? <MinimizeOutlined /> : <MaxmizeOutlined />}
          </div>
          <div className="window-icon hover-red" onClick={() => onExit()}>
            <CloseOutlined />
          </div>
        </div>
      </div>
    );
  }
);
