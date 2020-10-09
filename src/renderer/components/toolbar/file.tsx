import React, { FC } from "react";
import { ActiveContext } from "./Toolbar";
import classNames from "classnames";

const label = "file";

export const FileTab: FC = () => {
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
          <div className={"toolbar__tab-container"}>{"File"}</div>
        </div>
      )}
    </ActiveContext.Consumer>
  );
};

export const File: FC = () => {
  return (
    <ActiveContext.Consumer>
      {(a) => (
        <div
          className={classNames("toolbar__content", {
            active: a.active === label,
            inactive: a.active !== label,
          })}
        >
          File Content
        </div>
      )}
    </ActiveContext.Consumer>
  );
};
