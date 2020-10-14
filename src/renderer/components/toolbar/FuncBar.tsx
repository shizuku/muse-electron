import React, { FC } from "react";
import { useAppState } from "../../AppStateContext";
import { FuncButtom } from "./FuncButton";
import { SaveOutlined, UndoOutlined, RedoOutlined } from "@ant-design/icons";

export const FuncBar: FC = () => {
  let state = useAppState();
  return (
    <div className="toolbar__functions">
      <FuncButtom
        onClick={() => {
          state.events?.onSave();
        }}
      >
        <SaveOutlined />
      </FuncButtom>
      <FuncButtom>
        <UndoOutlined />
      </FuncButtom>
      <FuncButtom>
        <RedoOutlined />
      </FuncButtom>
    </div>
  );
};
