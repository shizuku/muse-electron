import React, { FC } from "react";
import {
  CloseCircleOutlined,
  SaveOutlined,
  ExportOutlined,
} from "@ant-design/icons";
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
          icon={<SaveOutlined />}
          size="m"
          onClick={state.events?.onSave}
        >
          {"Save"}
        </MenuItem>
        <MenuItem
          icon={<SaveOutlined />}
          size="m"
          onClick={state.events?.onSaveAs}
        >
          {"Save as"}
        </MenuItem>
        <MenuItem
          icon={<SaveOutlined />}
          size="m"
          onClick={state.events?.onAutoSave}
          active={state.autoSave}
        >
          {"Auto save"}
        </MenuItem>
        <MenuItem
          icon={<ExportOutlined />}
          size="m"
          onClick={state.events?.onExport}
        >
          {"Export"}
        </MenuItem>
        <MenuItem
          icon={<CloseCircleOutlined />}
          size="m"
          onClick={state.events?.onClose}
        >
          {"Close"}
        </MenuItem>
      </Menu>
    </div>
  ));
};
