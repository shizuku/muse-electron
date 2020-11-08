import React, { CSSProperties, FC, useState } from "react";
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { ColumnHeightOutlined, ColumnWidthOutlined } from "@ant-design/icons";
import { useAppState } from "../../states";
import { Sizer } from "./sizer";
import { FuncBar } from "../func-bar";
import { LayoutHorizontalOutlined, LayoutVerticalOutlined } from "../icons";
import { FuncButton } from "../func-bar/func-button";
import "./style.css";
import { Tooltip } from "antd";

export const Footer: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
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
          {new Date(state.currentFile?.time || 0).toLocaleString(
            state.langCode
          )}
        </div>
      </div>
      <div className="footer__group-right">
        <div className="footer__item">
          <FuncBar>
            <Tooltip
              placement="topLeft"
              title={t("toolbar.view.one-page")}
              mouseEnterDelay={0.5}
            >
              <FuncButton
                onClick={() => state.onSetOnePage()}
                active={() => state.config.twopage === false}
              >
                <LayoutVerticalOutlined />
              </FuncButton>
            </Tooltip>
            <Tooltip
              placement="topLeft"
              title={t("toolbar.view.two-page")}
              mouseEnterDelay={0.5}
            >
              <FuncButton
                onClick={() => state.onSetTwoPage()}
                active={() => state.config.twopage === true}
              >
                <LayoutHorizontalOutlined />
              </FuncButton>
            </Tooltip>
          </FuncBar>
        </div>
        <div className="footer__item">
          <FuncBar>
            <Tooltip
              placement="topLeft"
              title={t("footer.sizer.fit-height")}
              mouseEnterDelay={0.5}
            >
              <FuncButton
                active={() => state.config.x * 100 === state.fitHeightSizer}
                onClick={() => state.onSetFitHeight()}
              >
                <ColumnHeightOutlined />
              </FuncButton>
            </Tooltip>
            <Tooltip
              placement="topLeft"
              title={t("footer.sizer.fit-width")}
              mouseEnterDelay={0.5}
            >
              <FuncButton
                active={() => state.config.x * 100 === state.fitWidthSizer}
                onClick={() => state.onSetFitWidth()}
              >
                <ColumnWidthOutlined />
              </FuncButton>
            </Tooltip>
          </FuncBar>
        </div>
        <div className="footer__item">
          <Sizer />
        </div>
      </div>
    </footer>
  ));
};
3;
