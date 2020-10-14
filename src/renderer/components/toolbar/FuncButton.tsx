import { useObserver } from "mobx-react";
import React, { FC, useState } from "react";
import { useAppState } from "../../AppStateContext";

export interface FuncButtonProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

export const FuncButtom: FC<FuncButtonProps> = ({ children, onClick }) => {
  let [hover, setHover] = useState(false);
  let state = useAppState();
  return useObserver(() => (
    <div
      className="toolbar__button"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={onClick}
      style={hover ? { background: state.theme.colorPrimaryDark } : {}}
    >
      <div className="toolbar__button-container">{children}</div>
    </div>
  ));
};
