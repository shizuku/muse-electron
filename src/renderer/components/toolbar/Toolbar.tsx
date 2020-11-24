import React, { CSSProperties, FC, useState } from "react";
import classNames from "classnames";
import { File, FileTab } from "./File";
import { View, ViewTab } from "./View";
import { Start, StartTab } from "./Start";
import { About, AboutTab } from "./About";
import { observer } from "mobx-react";
import { ToolbarInstance } from "../../models/components/toolbar";
import { ConfigInstance } from "../../models/config";
import { DimensInstance } from "../../models/ui/window/dimens";
import { ModelInjector } from "../model-injector";
import "./style.css";
import { FileInstance } from "../../models/file";
import { ThemeItemInstance } from "../../models/values/themes/theme-item";

export interface TabProps {
  label: string;
  model: ToolbarInstance;
  theme: ThemeItemInstance;
  children?: React.ReactNode;
}

export const Tab: FC<TabProps> = observer(
  ({ label, model, theme, children }) => {
    let [hover, setHover] = useState(false);
    return (
      <div
        className={classNames("toolbar__tab", {
          active: model.active === label,
        })}
        onClick={() => {
          model.setActive(label);
        }}
        style={
          hover
            ? model.active !== label
              ? {
                  background: theme.toolbarTabBackground,
                  color: theme.toolbarTabText,
                }
              : {
                  background: theme.toolbarTabActiveBackground,
                  color: theme.toolbarTabActiveText,
                }
            : model.active !== label
            ? {
                background: theme.toolbarTabBackground,
                color: theme.toolbarTabText,
              }
            : {
                background: theme.toolbarTabActiveBackground,
                color: theme.toolbarTabActiveText,
              }
        }
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <div className={"toolbar__tab-container"}>{children}</div>
      </div>
    );
  }
);

export interface PaneProps {
  label: string;
  model: ToolbarInstance;
  children?: React.ReactNode;
}

export const Pane: FC<PaneProps> = observer(({ label, model, children }) => {
  return (
    <div
      className={classNames("toolbar__pane", {
        active: model.active === label,
        inactive: model.active !== label,
      })}
    >
      {children}
    </div>
  );
});

export interface ToolbarProps {
  model: ToolbarInstance;
  file: FileInstance;
  config: ConfigInstance;
  theme: ThemeItemInstance;
  dimens: DimensInstance;
  onSave: (cb?: (r: string) => void) => void;
  onSaveAs: (cb?: (r: string) => void) => void;
  onAutoSave: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onClose: () => void;
  onSetTwoPage: () => void;
  onSetOnePage: () => void;
  onShowEditMetaDataModal: () => void;
  onShowExportModal: () => void;
  onShowAboutModal: () => void;
  onShowPreferenceModal: () => void;
}

export const Toolbar: FC<ToolbarProps> = observer(
  ({
    model,
    file,
    config,
    theme,
    dimens,
    onSave,
    onSaveAs,
    onAutoSave,
    onUndo,
    onRedo,
    onClose,
    onSetOnePage,
    onSetTwoPage,
    onShowEditMetaDataModal,
    onShowExportModal,
    onShowAboutModal,
    onShowPreferenceModal,
  }) => {
    let toolbarStyle = () => {
      switch (config.display) {
        case "full":
          return {
            display: "block",
            background: theme.toolbarBackground,
          } as CSSProperties;
        case "headfoot":
        case "content":
          return {
            display: "none",
            background: theme.toolbarBackground,
          } as CSSProperties;
      }
    };
    return (
      <ModelInjector>
        {(root) => (
          <div
            className="toolbar"
            ref={(e) => {
              dimens.setToolbar(e?.clientHeight || 0);
            }}
            style={file.isOpen ? toolbarStyle() : { display: "none" }}
          >
            <div
              className="toolbar__tabs"
              style={{ background: theme.toolbarBackground }}
            >
              <Tab label="file" model={model} theme={theme}>
                <FileTab />
              </Tab>
              <Tab label="start" model={model} theme={theme}>
                <StartTab />
              </Tab>
              <Tab label="view" model={model} theme={theme}>
                <ViewTab />
              </Tab>
              <Tab label="about" model={model} theme={theme}>
                <AboutTab />
              </Tab>
            </div>
            <div className="toolbar__panes">
              <Pane label="file" model={model}>
                <File
                  theme={theme}
                  file={root.file}
                  config={config}
                  onSave={onSave}
                  onSaveAs={onSaveAs}
                  onAutoSave={onAutoSave}
                  onClose={onClose}
                  onShowExportModal={onShowExportModal}
                />
              </Pane>
              <Pane label="start" model={model}>
                <Start
                  theme={theme}
                  file={root.file}
                  onUndo={onUndo}
                  onRedo={onRedo}
                  onShowEditMetaDataModal={onShowEditMetaDataModal}
                />
              </Pane>
              <Pane label="view" model={model}>
                <View
                  theme={theme}
                  file={root.file}
                  onSetOnePage={onSetOnePage}
                  onSetTwoPage={onSetTwoPage}
                />
              </Pane>
              <Pane label="about" model={model}>
                <About
                  theme={theme}
                  onShowAboutModal={onShowAboutModal}
                  onShowPreferenceModal={onShowPreferenceModal}
                />
              </Pane>
            </div>
          </div>
        )}
      </ModelInjector>
    );
  }
);
