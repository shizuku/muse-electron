import React, { FC } from "react";
import { MuseNotation } from "../muse-notation";
import { useObserver } from "mobx-react";
import { AppStateContext } from "../../AppStateContext";
import "./style.css";

export const Content: FC = () => {
  return useObserver(() => (
    <AppStateContext.Consumer>
      {(state) => (
        <div
          className="content"
          style={{ height: state.heights.content }}
          ref={(e) => {
            console.log(state.heights);
          }}
        >
          <div className="notaiton-content">
            {state.notation ? (
              <MuseNotation notation={state.notation} />
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </AppStateContext.Consumer>
  ));
};
