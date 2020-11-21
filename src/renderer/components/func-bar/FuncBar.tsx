import { observer } from "mobx-react";
import React, { FC } from "react";
import { useRootModel } from "../../models";
import "./style.css";

export interface FuncBarProps {
  children?: React.ReactNode;
}

export const FuncBar: FC<FuncBarProps> = observer(({ children }) => {
  let root = useRootModel();
  let theme = root.config.theme.theme;
  return (
    <div className="func-bar" style={{ color: theme.activeColor }}>
      {children}
    </div>
  );
});
