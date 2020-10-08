import React, { FC } from "react";
import { Button, Tabs } from "antd";
import { SaveOutlined, FolderOpenFilled } from "@ant-design/icons";
import "./style.css";

export const Toolbar: FC = () => {
  const open = () => {};
  const save = () => {};
  return (
    <div className="toolbar">
      <Button size="small" icon={<FolderOpenFilled />} onClick={open} />
      <Button size="small" icon={<SaveOutlined />} onClick={save} />
    </div>
  );
};
