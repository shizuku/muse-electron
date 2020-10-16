import React, { FC } from "react";
import {
  BorderHorizontalOutlined,
  BorderVerticleOutlined,
  SaveOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useObserver } from "mobx-react";
import { Menu, MenuItem } from "../menu";

export const StartTab: FC = () => {
  return <span>Start</span>;
};

export const Start: FC = () => {
  return useObserver(() => (
    <div>
      <Menu mode="horizontal">
        <MenuItem icon={<ProfileOutlined />} size="m" onClick={() => {}}>
          {"Meta data"}
        </MenuItem>
      </Menu>
    </div>
  ));
};
