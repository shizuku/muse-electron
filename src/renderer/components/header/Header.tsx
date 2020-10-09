import React, { FC } from "react";
import { FileContext } from "../../FileContext";
import "./style.css";

export const Header: FC = () => {
  return (
    <FileContext.Consumer>
      {(t) => (
        <div className="header">
          <div className="app-logo"></div>
          <div className="window-title">
            {t.fileName === "" ? `Muse` : `${t.fileName} - Muse`}
          </div>
        </div>
      )}
    </FileContext.Consumer>
  );
};
