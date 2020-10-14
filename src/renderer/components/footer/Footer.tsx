import React, { FC } from "react";
import { useObserver } from "mobx-react";
import { useAppState } from "../../AppStateContext";
import "./style.css";

export const Footer: FC = () => {
  let state = useAppState();
  return useObserver(() => (
    <div
      className="footer"
      ref={(e) => {
        state.heights.footer = e?.clientHeight || 10;
      }}
      style={{
        background: state.theme.colorPrimary,
        color: state.theme.colorBackground,
      }}
    >
      Footer
    </div>
  ));
};
