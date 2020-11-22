import React, { FC } from "react";
import { observer } from "mobx-react";
import "./style.css";

export interface FuncBarProps {
  children?: React.ReactNode;
}

export const FuncBar: FC<FuncBarProps> = observer(
  ({ children }) => {
    return (
      <div className="func-bar">
        {children}
      </div>
    );
  }
);
