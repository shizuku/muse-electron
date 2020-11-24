import React, { CSSProperties, FC } from "react";
import { MuseNotation } from "../muse-notation";
import { observer } from "mobx-react";
import { ConfigInstance } from "../../models/config";
import { FileInstance } from "../../models/file";
import { ThemeItemInstance } from "../../models/values/themes/theme-item";
import "./style.css";
import { WindowInstance } from "../../models/ui/window";

export interface ContentProps {
  file: FileInstance;
  config: ConfigInstance;
  win: WindowInstance;
  theme: ThemeItemInstance;
}

export const Content: FC<ContentProps> = observer(
  ({ file, config, win, theme }) => {
    let style = () => {
      switch (win.display) {
        case "full":
        case "headfoot":
          return {
            height: win.contentH,
            background: theme.contentBackground,
          } as CSSProperties;
        case "content":
          return {
            height: win.windowH,
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
            win.setContentW(e?.clientWidth || 0);
          }}
        >
          <div className="notaion-outer">
            <div
              className="notation"
              ref={(e) => {
                win.setNotationH(e?.scrollHeight || 0);
                win.setNotationW(e?.scrollWidth || 0);
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
