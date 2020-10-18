import React, { FC } from "react";
import { useObserver } from "mobx-react";
import { LayoutHorizontalOutlined, LayoutVerticalOutlined } from "../icons";
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
          icon={<LayoutVerticalOutlined />}
          size="m"
          onClick={state.events?.onSetVertical}
          active={state.config.vertical === true}
        >
          {"Vertical"}
        </MenuItem>
        <MenuItem
          icon={<LayoutHorizontalOutlined />}
          size="m"
          onClick={state.events?.onSetHorizontal}
          active={state.config.vertical === false}
        >
          {"Horizontal"}
        </MenuItem>
      </Menu>
    </div>
  ));
};
