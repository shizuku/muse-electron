import React, { FC } from "react";
import { useAppState } from "../../states";
import "./style.css";

export const FuncBar: FC = ({ children }) => {
  let state = useAppState();
  return (
    <div className="func-bar" style={{ color: state.theme.colorBackground }}>
      {children}
    </div>
  );
};
