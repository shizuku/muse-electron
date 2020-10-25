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
          background: state.theme.colorBackgroundDark,
        } as CSSProperties;
      case "content":
        return {
          height: state.windowDim.wh,
          background: state.theme.colorBackgroundDark,
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
            style={{
              color: state.theme.colorText,
            }}
          >
            {state.notation ? (
              <MuseNotation
                notation={state.notation}
                onModify={() => {
                  console.log("modify");
                  state.modified = true;
                  state.undoStack.push(JSON.stringify(state.notation?.code()));
                  state.redoStack.length = 0;
                }}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  ));
};
