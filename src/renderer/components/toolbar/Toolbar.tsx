import React, { FC } from "react";
import { Button, Tabs } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import './style.css'

export const Toolbar: FC = () => {
  const onChange = (k: string) => {};
  return (
    <div className="toolbar">
      <Tabs defaultActiveKey="0" onChange={onChange}>
        <Tabs.TabPane tab={"File"} key="0">
          <Button size="small" icon={<SaveOutlined />} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
