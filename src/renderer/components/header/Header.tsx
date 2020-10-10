import React, { FC } from "react";
import { FileContext } from "../../FileContext";
import "./style.css";

export const Header: FC = () => {
  return (
    <FileContext.Consumer>
      {({ fileName }) => (
        <div className="header">
          <div className="header__app-logo"></div>
          <div className="header__window-title">
            {fileName === "" ? `Muse` : `${fileName} - Muse`}
          </div>
          <div className="header__controls"></div>
        </div>
      )}
    </FileContext.Consumer>
  );
};
