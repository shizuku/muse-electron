import React, { FC } from "react";
import {
  BorderHorizontalOutlined,
  BorderVerticleOutlined,
} from "@ant-design/icons";
import { Menu, MenuItem } from "../menu";

export const StartTab: FC = () => {
  return <span>Start</span>;
};

export const Start: FC = () => {
  return (
    <div>
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
