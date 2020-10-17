import React, { CSSProperties, FC, useState } from "react";
import { useObserver } from "mobx-react";
import { useAppState } from "../app";
import { Sizer } from "./sizer";
import { Liner } from "./liner";
import { FuncBar } from "../func-bar";
import { LayoutHorizontalOutlined, LayoutVerticalOutlined } from "../icons";
import { FuncButtom } from "../func-bar/func-button";
import "./style.css";

export const Footer: FC = () => {
  let state = useAppState();
  let [maxHeight, setMaxHeight] = useState(0);
  let styleHover = () => {
    switch (state.display) {
      case "full":
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
    <footer
      className="footer"
      ref={(e) => {
        let h = e?.clientHeight || 0;
        state.windowDim.footer = h;
        setMaxHeight(maxHeight > h ? maxHeight : h);
      }}
      style={state.footerHover ? styleHover() : styleUnhover()}
    >
      <div className="footer__group-left">
        <div className="time">
          {new Date(state.currentFile?.time || 0).toLocaleString()}
        </div>
      </div>
      <div className="footer__group-right">
        <div className="footer__item">
          <FuncBar>
            <FuncButtom
              onClick={state.events?.onSetV}
              active={state.config.vertical === true}
            >
              <LayoutVerticalOutlined />
            </FuncButtom>
            <FuncButtom
              onClick={state.events?.onSetH}
              active={state.config.vertical === false}
            >
              <LayoutHorizontalOutlined />
            </FuncButtom>
          </FuncBar>
        </div>
        <div className="footer__item">
          <Liner />
        </div>
        <div className="footer__item">
          <Sizer />
        </div>
      </div>
    </footer>
  ));
};
