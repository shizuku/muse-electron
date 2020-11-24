import React, { CSSProperties, FC } from "react";
import { MuseNotation } from "../muse-notation";
import { observer } from "mobx-react";
import { ConfigInstance } from "../../models/config";
import { DimensInstance } from "../../models/ui/window/dimens";
import { FileInstance } from "../../models/file";
import { ThemeItemInstance } from "../../models/values/themes/theme-item";
import "./style.css";

export interface ContentProps {
  file: FileInstance;
  config: ConfigInstance;
  dimens: DimensInstance;
  theme: ThemeItemInstance;
}

export const Content: FC<ContentProps> = observer(
  ({ file, config, dimens, theme }) => {
    let style = () => {
      switch (config.display) {
        case "full":
        case "headfoot":
          return {
            height: dimens.contentH,
            background: theme.contentBackground,
          } as CSSProperties;
        case "content":
          return {
            height: dimens.windowH,
            background: theme.contentBackground,
          } as CSSProperties;
      }
    };
    return (
      <div
        className="content"
        style={file.isOpen ? style() : { display: "none" }}
      >
        <div
          className="notaiton-container"
          ref={(e) => {
            dimens.setContentW(e?.clientWidth || 0);
          }}
        >
          <div className="notaion-outer">
            <div
              className="notation"
              ref={(e) => {
                dimens.setNotationH(e?.scrollHeight || 0);
                dimens.setNotationW(e?.scrollWidth || 0);
              }}
              style={{
                color: theme.contentText,
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
);

// {state.notation ? (
//   <MuseNotation notation={state.notation} />
// ) : (
//   <></>
// )}
