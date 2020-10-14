import React, { FC, useState } from "react";
import "./func-button.css";

export interface FuncButtonProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

export const FuncButtom: FC<FuncButtonProps> = ({ children, onClick }) => {
  let [hover, setHover] = useState(false);
  let [press, setPress] = useState(false);
  return (
    <div
      className="func-button"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onMouseDown={() => {
        setPress(true);
      }}
      onMouseUp={() => {
        setPress(false);
      }}
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
