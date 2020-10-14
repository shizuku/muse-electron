import React, { CSSProperties, FC, useState } from "react";
import { useObserver } from "mobx-react";
import { useAppState } from "../../AppStateContext";
import "./style.css";

export const Footer: FC = () => {
  let state = useAppState();
  let [hover, setHover] = useState(false);
  let [maxHeight, setMaxHeight] = useState(0);
  let styleHover = () => {
    switch (state.display) {
      case "full":
      case "foldtoolbar":
      case "headfoot":
        return {
          display: "block",
          background: state.theme.colorPrimary,
          color: state.theme.colorBackground,
        } as CSSProperties;
      case "content":
        return {
          display: "block",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100vw",
          background: state.theme.colorPrimary,
          color: state.theme.colorBackground,
        } as CSSProperties;
    }
  };
  let styleUnhover = () => {
    switch (state.display) {
      case "full":
      case "foldtoolbar":
      case "headfoot":
        return {
          display: "block",
          background: state.theme.colorPrimary,
          color: state.theme.colorBackground,
        } as CSSProperties;
      case "content":
        return {
          display: "none",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100vw",
          background: state.theme.colorPrimary,
          color: state.theme.colorBackground,
        } as CSSProperties;
    }
  };
  return useObserver(() => (
    <div className="footer">
      <div
        className="footer__hover-region"
        style={{ height: maxHeight }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      ></div>
      <div
        className="footer__container"
        ref={(e) => {
          let h = e?.clientHeight || 0;
          state.heights.footer = h;
          setMaxHeight(maxHeight > h ? maxHeight : h);
        }}
        style={hover ? styleHover() : styleUnhover()}
      >
        Footer
      </div>
    </div>
  ));
};
