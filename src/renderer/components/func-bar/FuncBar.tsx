import { observer } from "mobx-react";
import React, { FC } from "react";
import { ThemeItemInstance } from "../../models/config/theme";
import "./style.css";

export interface FuncBarProps {
  theme: ThemeItemInstance;
  children?: React.ReactNode;
}

export const FuncBar: FC<FuncBarProps> = observer(({ children, theme }) => {
  return (
    <div className="func-bar" style={{ color: theme.activeColor }}>
      {children}
    </div>
  );
});
