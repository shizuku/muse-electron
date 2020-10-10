import React, { FC, useState } from "react";
import { Button } from "antd";
import {
  SaveOutlined,
  FolderOpenOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { ActiveContext } from "./ActiveContext";
import { File, FileTab } from "./file";
import { View, ViewTab } from "./view";
import { StartTab } from "./start";
import "./style.css";

export const Tab: FC<{ label: string }> = ({ label, children }) => {
  return (
    <ActiveContext.Consumer>
      {(a) => (
        <div
          className={classNames("toolbar__tab", {
            active: a.active === label,
          })}
          onClick={() => {
            a.setActive(label);
          }}
        >
          <div className={"toolbar__tab-container"}>{children}</div>
        </div>
      )}
    </ActiveContext.Consumer>
  );
};

export const Pane: FC<{ label: string }> = ({ label, children }) => {
  return (
    <ActiveContext.Consumer>
      {(a) => (
        <div
          className={classNames("toolbar__content", {
            active: a.active === label,
            inactive: a.active !== label,
          })}
        >
          {children}
        </div>
      )}
    </ActiveContext.Consumer>
  );
};

export const Toolbar: FC = () => {
  let [active, setActive] = useState<string>("file");
  return (
    <div className="toolbar">
      <ActiveContext.Provider value={{ active, setActive }}>
        <div className="toolbar__tabs">
          <Button type="primary" icon={<FolderOpenOutlined />} />
          <Button type="primary" icon={<SaveOutlined />} />
          <Button type="primary" icon={<PrinterOutlined />} />
          <Tab label="start">
            <StartTab />
          </Tab>
          <Tab label="file">
            <FileTab />
          </Tab>
          <Tab label="view">
            <ViewTab />
          </Tab>
        </div>
        <div className="toolbar__contents">
          <Pane label="file">
            <File />
          </Pane>
          <Pane label="view">
            <View />
          </Pane>
        </div>
      </ActiveContext.Provider>
    </div>
  );
};
