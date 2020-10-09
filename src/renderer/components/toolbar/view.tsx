import React, { FC } from "react";
import { ActiveContext } from "./Toolbar";
import classNames from "classnames";

const label = "view";

export const ViewTab: FC = () => {
  return (
    <ActiveContext.Consumer>
      {(a) => (
        <div
          className={classNames("toolbar__tab", {
            active: a.active === label,
          })}
          onClick={() => {
            a.setActive(label);
          }}
        >
          <div className={"toolbar__tab-container"}>{"View"}</div>
        </div>
      )}
    </ActiveContext.Consumer>
  );
};

export const View: FC = () => {
  return (
    <ActiveContext.Consumer>
      {(a) => (
        <div
          className={classNames("toolbar__content", {
            active: a.active === label,
            inactive: a.active !== label,
          })}
        >
          View Content
        </div>
      )}
    </ActiveContext.Consumer>
  );
};
