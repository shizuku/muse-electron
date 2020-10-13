import React, { FC, useEffect } from "react";
import { MuseNotation } from "../muse-notation";
import { observer, Observer } from "mobx-react";
import { AppStateContext } from "../../AppStateContext";
import "./style.css";

export const Content: FC = observer(() => {
  return (
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
  );
});
