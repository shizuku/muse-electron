import React, { FC } from "react";
import "./style.css";

export interface MenuProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  mode?: "vertical" | "horizontal" | "inline";
}

export const Menu: FC<MenuProps> = ({ style, children, mode }) => {
  let display = "";
  switch (mode) {
    case "horizontal":
      display = "flex";
      break;
    case "vertical":
      display = "block";
      break;
    case "inline":
      display = "inline";
      break;
    default:
      display = "flex";
      break;
  }
  return (
    <div className="welcome__menu" style={{ display, ...style }}>
      {children}
    </div>
  );
};

export interface MenuItemProps {
  icon?: React.ReactElement;
  size?: "xl" | "l" | "m" | "s";
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  active?: boolean;
  children?: React.ReactNode;
}

export const MenuItem: FC<MenuItemProps> = ({
  icon,
  size,
  onClick,
  active,
  children,
}) => {
  const iconSize: Record<string, number> = {
    xl: 36,
    l: 30,
    m: 24,
    s: 18,
  };
  const contentSize: Record<string, number> = {
    xl: 24,
    l: 18,
    m: 12,
    s: 6,
  };
  return (
    <div
      className="welcome__menu-item"
      onClick={onClick}
      style={
        active === true
          ? icon
            ? {
                background: "#00000055",
                width: iconSize[size || "m"] * 4,
                padding: "1rem 0",
              }
            : { background: "#00000055", width: iconSize[size || "m"] * 4 }
          : icon
          ? {
              width: iconSize[size || "m"] * 4,
              padding: "1rem 0",
            }
          : { width: iconSize[size || "m"] * 4 }
      }
    >
      <div
        className="welcome__menu-item__container"
        style={{
          width: iconSize[size || "m"] * 4,
        }}
      >
        {icon ? (
          <div
            className="welcome__menu-item__icon"
            style={{
              fontSize: iconSize[size || "m"],
            }}
          >
            {icon}
          </div>
        ) : (
          <></>
        )}
        <div
          className="welcome__menu-item__content"
          style={{
            fontSize: contentSize[size || "m"],
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
