import React, { FC, useEffect, useRef, useState } from "react";
import { SaveOutlined, UndoOutlined, RedoOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { ActiveContext } from "./ActiveContext";
import { File, FileTab } from "./file";
import { View, ViewTab } from "./view";
import { Start, StartTab } from "./start";
import "./style.css";
import { Heights } from "../../app";
import { ThemeContext } from "../../ThemeContext";

export const Tab: FC<{ label: string }> = ({ label, children }) => {
  let [hover, setHover] = useState(false);
  return (
    <ThemeContext.Consumer>
      {(theme) => (
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
                    ? { background: theme.colorPrimaryDark }
                    : { background: theme.colorBackground }
                  : a.active !== label
                  ? { background: theme.colorPrimary }
                  : { background: theme.colorBackground }
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
      )}
    </ThemeContext.Consumer>
  );
};

export const Pane: FC<{ label: string }> = ({ label, children }) => {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <ActiveContext.Consumer>
          {(a) => (
            <div
              className={classNames("toolbar__content", {
                active: a.active === label,
                inactive: a.active !== label,
              })}
              style={{ background: theme.colorBackground }}
            >
              {children}
            </div>
          )}
        </ActiveContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
};

export const FunButtom: FC = ({ children }) => {
  let [hover, setHover] = useState(false);
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div
          className="toolbar__button"
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
          style={hover ? { background: theme.colorPrimaryDark } : {}}
        >
          <div className="toolbar__button-container">{children}</div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

export const Toolbar: FC<{ h: Heights }> = ({ h }: { h: Heights }) => {
  let [active, setActive] = useState<string>("start");
  let r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    h.toolbar = r.current?.clientHeight || 0;
  });
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div
          className="toolbar"
          ref={r}
          style={{ background: theme.colorPrimary }}
        >
          <ActiveContext.Provider value={{ active, setActive }}>
            <div
              className="toolbar__tabs"
              style={{ background: theme.colorPrimary }}
            >
              <div className="toolbar__functions">
                <FunButtom>
                  <SaveOutlined />
                </FunButtom>
                <FunButtom>
                  <UndoOutlined />
                </FunButtom>
                <FunButtom>
                  <RedoOutlined />
                </FunButtom>
              </div>
              <Tab label="file">
                <FileTab />
              </Tab>
              <Tab label="start">
                <StartTab />
              </Tab>
              <Tab label="view">
                <ViewTab />
              </Tab>
            </div>
            <div className="toolbar__contents">
              <Pane label="file">
                <File />
              </Pane>
              <Pane label="start">
                <Start />
              </Pane>
              <Pane label="view">
                <View />
              </Pane>
            </div>
          </ActiveContext.Provider>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};
