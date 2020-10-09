import React, { FC } from "react";
import classNames from "classnames";
import { ActiveContext } from "./ActiveContext";

export const StartTab: FC = () => {
  return (
    <ActiveContext.Consumer>
      {(a) => (
        <div className={classNames("toolbar__tab")} onClick={() => {}}>
          <div className={"toolbar__tab-container"}>{"Start"}</div>
        </div>
      )}
    </ActiveContext.Consumer>
  );
};
