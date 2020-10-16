import React, { FC } from "react";
import {
  BorderHorizontalOutlined,
  BorderVerticleOutlined,
  SaveOutlined,
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
        <MenuItem icon={<SaveOutlined />} size="m" onClick={() => {}}>
          {"Auto save"}
        </MenuItem>
      </Menu>
    </div>
  ));
};
