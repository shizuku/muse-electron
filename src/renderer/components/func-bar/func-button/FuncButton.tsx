import React, { FC, useState } from "react";
import "./style.css";

export interface FuncButtonProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
}

export const FuncButtom: FC<FuncButtonProps> = ({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
}) => {
  let [hover, setHover] = useState(false);
  let [press, setPress] = useState(false);
  const ome = () => {
    setHover(true);
  };
  const oml = () => {
    setHover(false);
  };
  const omd = () => {
    setPress(true);
  };
  const omu = () => {
    setPress(false);
  };
  return (
    <div
      className="func-button"
      onFocus={onFocus}
      onMouseEnter={(ev) => {
        if (onMouseEnter) onMouseEnter(ev);
        ome();
      }}
      onMouseLeave={(ev) => {
        if (onMouseLeave) onMouseLeave(ev);
        oml();
      }}
      onMouseDown={omd}
      onMouseUp={omu}
      onClick={onClick}
      style={
        hover
          ? press
            ? { background: "#00000044" }
            : { background: "#00000022" }
          : {}
      }
    >
      <div className="func-button__container">{children}</div>
    </div>
  );
};
