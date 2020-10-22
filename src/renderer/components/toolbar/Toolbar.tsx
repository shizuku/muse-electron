import React, { CSSProperties, FC, useState } from "react";
import classNames from "classnames";
import { ActiveContext } from "./ActiveContext";
import { File, FileTab } from "./File";
import { View, ViewTab } from "./View";
import { Start, StartTab } from "./Start";
import { About, AboutTab } from "./About";
import { useAppState } from "../app";
import { useObserver } from "mobx-react";
import "./style.css";

export const Tab: FC<{ label: string }> = ({ label, children }) => {
  let [hover, setHover] = useState(false);
  let state = useAppState();
  return useObserver(() => (
    <ActiveContext.Consumer>
      {(a) => (
        <div
          className={classNames("toolbar__tab", {
            active: a.active === label,
          })}
          onClick={() => {
            a.setActive(label);
          }}
          style={
            hover
              ? a.active !== label
                ? {
                    background: state.theme.colorPrimaryDark,
                    color: state.theme.colorTextLight,
                  }
                : {
                    background: state.theme.colorBackground,
                    color: state.theme.colorPrimary,
                  }
              : a.active !== label
              ? {
                  background: state.theme.colorPrimary,
                  color: state.theme.colorTextLight,
                }
              : {
                  background: state.theme.colorBackground,
                  color: state.theme.colorPrimary,
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
      )}
    </ActiveContext.Consumer>
  ));
};

export const Pane: FC<{ label: string }> = ({ label, children }) => {
  let state = useAppState();
  return useObserver(() => (
    <ActiveContext.Consumer>
      {(a) => (
        <div
          className={classNames("toolbar__pane", {
            active: a.active === label,
            inactive: a.active !== label,
          })}
          style={{ background: state.theme.colorBackground }}
        >
          {children}
        </div>
      )}
    </ActiveContext.Consumer>
  ));
};

export const Toolbar: FC = () => {
  let [active, setActive] = useState<string>("start");
  let state = useAppState();
  let toolbarStyle = () => {
    switch (state.display) {
      case "full":
        return {
          display: "block",
          background: state.theme.colorBackground,
        } as CSSProperties;
      case "headfoot":
      case "content":
        return {
          display: "none",
          background: state.theme.colorBackground,
        } as CSSProperties;
    }
  };
  return useObserver(() => (
    <div
      className="toolbar"
      ref={(e) => {
        state.windowDim.toolbar = e?.clientHeight || 0;
      }}
      style={toolbarStyle()}
    >
      <ActiveContext.Provider value={{ active, setActive }}>
        <div
          className="toolbar__tabs"
          style={{ background: state.theme.colorPrimary }}
        >
          <Tab label="file">
            <FileTab />
          </Tab>
          <Tab label="start">
            <StartTab />
          </Tab>
          <Tab label="view">
            <ViewTab />
          </Tab>
          <Tab label="about">
            <AboutTab />
          </Tab>
        </div>
        <div className="toolbar__panes">
          <Pane label="file">
            <File />
          </Pane>
          <Pane label="start">
            <Start />
          </Pane>
          <Pane label="view">
            <View />
          </Pane>
          <Pane label="about">
            <About />
          </Pane>
        </div>
      </ActiveContext.Provider>
    </div>
  ));
};
