import React, { FC } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useObserver } from "mobx-react";
import { Menu, MenuItem } from "../menu";
import { useAppState } from "../app";

export const FileTab: FC = () => {
  return <span>File</span>;
};

export const File: FC = () => {
  let state = useAppState();
  return useObserver(() => (
    <div className="pane-container">
      <Menu mode="horizontal">
        <MenuItem
          icon={<CloseCircleOutlined />}
          size="m"
          onClick={() => {
            state.close();
          }}
        >
          {"Close"}
        </MenuItem>
      </Menu>
    </div>
  ));
};
