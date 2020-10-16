import React, { FC } from "react";
import {
  BorderHorizontalOutlined,
  BorderVerticleOutlined,
} from "@ant-design/icons";
import { useObserver } from "mobx-react";
import { Menu, MenuItem } from "../menu";
import { useAppState } from "../app";

export const ViewTab: FC = () => {
  return <span>View</span>;
};

export const View: FC = () => {
  let state = useAppState();
  return useObserver(() => (
    <div className="pane-container">
      <Menu mode="horizontal">
        <MenuItem
          icon={<BorderVerticleOutlined />}
          size="m"
          onClick={() => {
            state.config.vertical = true;
          }}
          active={state.config.vertical === true}
        >
          {"Vertical"}
        </MenuItem>
        <MenuItem
          icon={<BorderHorizontalOutlined />}
          size="m"
          onClick={() => {
            state.config.vertical = false;
          }}
          active={state.config.vertical === false}
        >
          {"Horizontal"}
        </MenuItem>
      </Menu>
    </div>
  ));
};
