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
          height: state.windowDim.contentH,
        } as CSSProperties;
      case "content":
        return {
          height: state.windowDim.wh,
        } as CSSProperties;
    }
  };
  return useObserver(() => (
    <div className="content" style={style()}>
      <div
        className="notaiton-container"
        ref={(e) => {
          state.windowDim.contentW = e?.clientWidth || 0;
        }}
      >
        <div className="notaion-outer">
          <div
            className="notation"
            ref={(e) => {
              state.windowDim.notationH = e?.scrollHeight || 0;
              state.windowDim.notationW = e?.scrollWidth || 0;
              state.r = e as HTMLElement;
            }}
          >
            {state.notation ? (
              <MuseNotation notation={state.notation} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  ));
};
