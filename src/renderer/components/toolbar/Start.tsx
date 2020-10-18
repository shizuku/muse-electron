import React, { FC } from "react";
import {
  BorderHorizontalOutlined,
  BorderVerticleOutlined,
  SaveOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useObserver } from "mobx-react";
import { useAppState } from "../app";
import { Menu, MenuItem } from "../menu";

export const StartTab: FC = () => {
  return <span>Start</span>;
};

export const Start: FC = () => {
  let state = useAppState();
  return useObserver(() => (
    <div>
      <Menu mode="horizontal">
        <MenuItem
          icon={<ProfileOutlined />}
          size="m"
          onClick={state.events?.onEditMetaData}
        >
          {"Meta data"}
        </MenuItem>
      </Menu>
    </div>
  ));
};
