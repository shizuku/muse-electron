import React, { FC } from "react";
import { FileContext } from "../../FileContext";
import { MuseConfig, MuseNotation, Notation } from "../muse-notation";
import "./style.css";

export const FileContent: FC = ({}) => {
  return (
    <FileContext.Consumer>
      {(f) => (
        <div className="file-content">
          <div className="notaiton-content">
            <MuseNotation
              notation={new Notation(JSON.parse(f.data), new MuseConfig())}
            />
          </div>
        </div>
      )}
    </FileContext.Consumer>
  );
};
