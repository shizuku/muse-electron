import React, { CSSProperties, FC } from "react";
import { MuseNotation } from "../muse-notation";
import { useObserver } from "mobx-react";
import { useAppState } from "../app";
import "./style.css";

export const Content: FC = () => {
  let state = useAppState();
  let style = () => {
    switch (state.display) {
      case "full":
      case "headfoot":
        return {
          height: state.heights.content,
        } as CSSProperties;
      case "content":
        return {
          height: state.heights.wh,
        } as CSSProperties;
    }
  };
  return useObserver(() => (
    <div className="content" style={style()}>
      <div className="notaiton-content">
        {state.notation ? <MuseNotation notation={state.notation} /> : <></>}
      </div>
    </div>
  ));
};
