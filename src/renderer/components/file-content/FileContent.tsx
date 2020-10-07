import React, { FC } from "react";
import { MuseConfig, MuseNotation, Notation } from "../muse-notation";
import { Toolbar } from "../toolbar";
import "./style.css";

export interface FileContentProps {
  filePath: string;
  fileName: string;
  data: string;
}

export const FileContent: FC<FileContentProps> = ({ data }) => {
  let n = new Notation(JSON.parse(data), new MuseConfig());
  return (
    <div className="file-content">
      <Toolbar />
      <div className="main-content">
        <MuseNotation notation={n} />
      </div>
    </div>
  );
};
