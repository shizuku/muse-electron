import React, { FC } from "react";
import {
  BorderHorizontalOutlined,
  BorderVerticleOutlined,
} from "@ant-design/icons";
import { Menu, MenuItem } from "../menu";
import { useAppState } from "../app";

export const ViewTab: FC = () => {
  return <span>View</span>;
};

export const View: FC = () => {
  let state = useAppState();
  return (
    <div className="pane-container">
      <Menu mode="horizontal">
        <MenuItem icon={<BorderVerticleOutlined />} size="m" onClick={() => {}}>
          {"Vertical"}
        </MenuItem>
        <MenuItem
          icon={<BorderHorizontalOutlined />}
          size="m"
          onClick={() => {}}
        >
          {"Horizontal"}
        </MenuItem>
      </Menu>
    </div>
  );
};
