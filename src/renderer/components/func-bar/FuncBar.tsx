import React, { FC } from "react";
import { Tooltip } from "antd";
import { SaveOutlined, UndoOutlined, RedoOutlined } from "@ant-design/icons";
import { useAppState } from "../app";
import { FuncButtom } from "./func-button";
import "./style.css";

export const FuncBar: FC = () => {
  let state = useAppState();
  return (
    <div className="func-bar" style={{ color: state.theme.colorBackground }}>
      <Tooltip placement="topLeft" title="Save" mouseEnterDelay={1}>
        <FuncButtom
          onClick={() => {
            state.events?.onSave();
          }}
        >
          <SaveOutlined />
        </FuncButtom>
      </Tooltip>
      <Tooltip placement="topLeft" title="Undo" mouseEnterDelay={1}>
        <FuncButtom>
          <UndoOutlined />
        </FuncButtom>
      </Tooltip>
      <Tooltip placement="topLeft" title="Redo" mouseEnterDelay={1}>
        <FuncButtom>
          <RedoOutlined />
        </FuncButtom>
      </Tooltip>
    </div>
  );
};
