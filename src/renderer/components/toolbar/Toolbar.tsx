import React, { FC, useState } from "react";
import { File, FileTab } from "./file";
import { View, ViewTab } from "./view";
import { Button } from "antd";
import {
  SaveOutlined,
  FolderOpenOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import "./style.css";

export type Active = "file" | "view";

export const ActiveContext = React.createContext<{
  active: Active;
  setActive: (a: Active) => void;
}>({
  active: "file",
  setActive: () => {},
});

export const Toolbar: FC = () => {
  let [active, setActive] = useState<Active>("file");
  return (
    <div className="toolbar">
      <ActiveContext.Provider value={{ active, setActive }}>
        <div className="toolbar__tabs">
          <Button type="primary" icon={<FolderOpenOutlined />} />
          <Button type="primary" icon={<SaveOutlined />} />
          <Button type="primary" icon={<PrinterOutlined />} />
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
