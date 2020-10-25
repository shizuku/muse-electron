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
    <div className="menu" style={{ display, ...style }}>
      {children}
    </div>
  );
};

export interface MenuItemProps {
  icon?: React.ReactElement;
  size?: "xl" | "l" | "m" | "s";
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  active?: boolean;
  disable?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const MenuItem: FC<MenuItemProps> = ({
  icon,
  size,
  onClick,
  active,
  disable,
  children,
  style,
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
      className="menu-item"
      onClick={(ev) => {
        if (!disable && onClick) onClick(ev);
      }}
      style={
        active === true
          ? {
              background: "#00000055",
              width: iconSize[size || "m"] * 3.2,
              height: iconSize[size || "m"] * 3.2,
              ...style,
            }
          : disable === true
          ? {
              color: "#00000022",
              width: iconSize[size || "m"] * 3.2,
              height: iconSize[size || "m"] * 3.2,
              ...style,
            }
          : {
              width: iconSize[size || "m"] * 3.2,
              height: iconSize[size || "m"] * 3.2,
              ...style,
            }
      }
    >
      <div
        className="menu-item__container"
        style={{
          width: iconSize[size || "m"] * 4,
          ...style,
        }}
      >
        {icon ? (
          <div
            className="menu-item__icon"
            style={{
              fontSize: iconSize[size || "m"],
              ...style,
            }}
          >
            {icon}
          </div>
        ) : (
          <></>
        )}
        <div
          className="menu-item__content"
          style={{
            fontSize: contentSize[size || "m"],
            ...style,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
