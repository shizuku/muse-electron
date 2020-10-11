import React, { FC } from "react";
import { FileContext } from "../../FileContext";
import { Heights } from "../../app";
import { MuseConfig, MuseNotation, Notation } from "../muse-notation";
import { useObserver } from "mobx-react";
import "./style.css";

export const Content: FC<{ h: Heights }> = ({ h }: { h: Heights }) => {
  let hc = useObserver(() => {
    return h.content;
  });
  return (
    <FileContext.Consumer>
      {(f) => (
        <div className="content" style={{ height: hc }}>
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
