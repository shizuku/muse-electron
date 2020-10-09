import React, { FC, useState } from "react";
import { Button } from "antd";
import {
  SaveOutlined,
  FolderOpenOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { ActiveContext } from "./ActiveContext";
import { File, FileTab } from "./file";
import { View, ViewTab } from "./view";
import { StartTab } from "./start";
import "./style.css";

export const Toolbar: FC = () => {
  let [active, setActive] = useState<string>("file");
  return (
    <div className="toolbar">
      <ActiveContext.Provider value={{ active, setActive }}>
        <div className="toolbar__tabs">
          <Button type="primary" icon={<FolderOpenOutlined />} />
          <Button type="primary" icon={<SaveOutlined />} />
          <Button type="primary" icon={<PrinterOutlined />} />
          <StartTab />
          <FileTab />
          <ViewTab />
        </div>
        <div className="toolbar__contents">
          <File />
          <View />
        </div>
      </ActiveContext.Provider>
    </div>
  );
};
