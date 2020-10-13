import React, { FC } from "react";
import { observer } from "mobx-react";
import { AppStateContext } from "../../AppStateContext";
import "./style.css";

export const Footer: FC = observer(() => {
  return (
    <AppStateContext.Consumer>
      {(state) => (
        <div
          className="footer"
          ref={(e) => {
            state.heights.footer = e?.clientHeight || 0;
          }}
          style={{
            background: state.theme.colorPrimary,
            color: state.theme.colorBackground,
          }}
        >
          Footer
        </div>
      )}
    </AppStateContext.Consumer>
  );
});
