import React from "react";
import { MenuBarProps } from "./interface";

const MenuBar: React.FC<MenuBarProps> = ({ item }) => {
  return (
    <div className="menu-bar">
      {item.map((it, idx) => (
        <div
          key={idx}
          onClick={() => {
            if (it.onclick) {
              it.onclick();
            }
          }}
        >
          {it.label}
        </div>
      ))}
    </div>
  );
};

export default MenuBar;
