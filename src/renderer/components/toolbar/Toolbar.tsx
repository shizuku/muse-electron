import React, { FC, useState } from "react";
import { SaveOutlined, UndoOutlined, RedoOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { ActiveContext } from "./ActiveContext";
import { File, FileTab } from "./File";
import { View, ViewTab } from "./View";
import { Start, StartTab } from "./Start";
import "./style.css";
import { EventsContext } from "../../EventsContext";
import { AppStateContext } from "../../AppStateContext";
import { useObserver } from "mobx-react";

export const Tab: FC<{ label: string }> = ({ label, children }) => {
  let [hover, setHover] = useState(false);
  return useObserver(() => (
    <AppStateContext.Consumer>
      {(state) => (
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
                    ? { background: state.theme.colorPrimaryDark }
                    : { background: state.theme.colorBackground }
                  : a.active !== label
                  ? { background: state.theme.colorPrimary }
                  : { background: state.theme.colorBackground }
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
    </AppStateContext.Consumer>
  ));
};

export const Pane: FC<{ label: string }> = ({ label, children }) => {
  return useObserver(() => (
    <AppStateContext.Consumer>
      {(state) => (
        <ActiveContext.Consumer>
          {(a) => (
            <div
              className={classNames("toolbar__content", {
                active: a.active === label,
                inactive: a.active !== label,
              })}
              style={{ background: state.theme.colorBackground }}
            >
              {children}
            </div>
          )}
        </ActiveContext.Consumer>
      )}
    </AppStateContext.Consumer>
  ));
};

export interface FuncButtonProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

export const FuncButtom: FC<FuncButtonProps> = ({ children, onClick }) => {
  let [hover, setHover] = useState(false);
  return useObserver(() => (
    <AppStateContext.Consumer>
      {(state) => (
        <div
          className="toolbar__button"
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
          onClick={onClick}
          style={hover ? { background: state.theme.colorPrimaryDark } : {}}
        >
          <div className="toolbar__button-container">{children}</div>
        </div>
      )}
    </AppStateContext.Consumer>
  ));
};

export const FuncBar: FC = () => {
  return (
    <EventsContext.Consumer>
      {(events) => (
        <div className="toolbar__functions">
          <FuncButtom
            onClick={() => {
              events.onSave();
            }}
          >
            <SaveOutlined />
          </FuncButtom>
          <FuncButtom>
            <UndoOutlined />
          </FuncButtom>
          <FuncButtom>
            <RedoOutlined />
          </FuncButtom>
        </div>
      )}
    </EventsContext.Consumer>
  );
};

export const Toolbar: FC = () => {
  let [active, setActive] = useState<string>("start");
  return useObserver(() => (
    <AppStateContext.Consumer>
      {(state) => (
        <div
          className="toolbar"
          ref={(e) => {
            state.heights.toolbar = e?.clientHeight || 0;
          }}
          style={{ background: state.theme.colorPrimary }}
        >
          <ActiveContext.Provider value={{ active, setActive }}>
            <div
              className="toolbar__tabs"
              style={{ background: state.theme.colorPrimary }}
            >
              <FuncBar />
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
    </AppStateContext.Consumer>
  ));
};
