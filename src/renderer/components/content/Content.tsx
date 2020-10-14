import React, { FC } from "react";
import { MuseNotation } from "../muse-notation";
import { useObserver } from "mobx-react";
import { useAppState } from "../../AppStateContext";
import "./style.css";

export const Content: FC = () => {
  let state = useAppState();
  return useObserver(() => (
    <div className="content" style={{ height: state.heights.content }}>
      <div className="notaiton-content">
        {state.notation ? <MuseNotation notation={state.notation} /> : <></>}
      </div>
    </div>
  ));
};
