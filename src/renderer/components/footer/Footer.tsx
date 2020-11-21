import React, { CSSProperties, FC, useState } from "react";
import { observer, useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { ColumnHeightOutlined, ColumnWidthOutlined } from "@ant-design/icons";
import { Sizer } from "./sizer";
import { FuncBar } from "../func-bar";
import { LayoutHorizontalOutlined, LayoutVerticalOutlined } from "../icons";
import { FuncButton } from "../func-bar/func-button";
import "./style.css";
import { Tooltip } from "antd";
import { ConfigInstance } from "../../models/config";
import { ThemeItemInstance } from "../../models/config/theme";
import { DimensInstance } from "../../models/ui/window/dimens";
import { WindowInstance } from "../../models/ui/window";
import { FileInstance } from "../../models/file";

export interface FooterProps {
  config: ConfigInstance;
  dimens: DimensInstance;
  file: FileInstance;
  theme: ThemeItemInstance;
  win: WindowInstance;
}

export const Footer: FC<FooterProps> = observer(
  ({ config, dimens, file, theme, win }) => {
    const { t } = useTranslation();
    let [maxHeight, setMaxHeight] = useState(0);
    let styleHover = () => {
      switch (config.display) {
        case "full":
        case "headfoot":
          return {
            display: "block",
            background: theme.footerBackground,
            color: theme.footerText,
          } as CSSProperties;
        case "content":
          return {
            display: "block",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100vw",
            background: theme.footerBackground,
            color: theme.footerText,
          } as CSSProperties;
      }
    };
    let styleUnhover = () => {
      switch (config.display) {
        case "full":
        case "headfoot":
          return {
            display: "block",
            background: theme.footerBackground,
            color: theme.footerText,
          } as CSSProperties;
        case "content":
          return {
            display: "none",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100vw",
            background: theme.footerBackground,
            color: theme.footerText,
          } as CSSProperties;
      }
    };
    return useObserver(() => (
      <footer
        className="footer"
        ref={(e) => {
          let h = e?.clientHeight || 0;
          dimens.setFooter(h);
          setMaxHeight(maxHeight > h ? maxHeight : h);
        }}
        style={win.footerHover ? styleHover() : styleUnhover()}
      >
        <div className="footer__group-left">
          <div className="time">
            {new Date(file.conf.time || 0).toLocaleString(config.lang)}
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
                  onClick={() => file.conf.setTwoPage(false)}
                  active={() => file.conf.twopage === false}
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
                  onClick={() => file.conf.setTwoPage(true)}
                  active={() => file.conf.twopage === true}
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
                  active={() => file.conf.sizerMode === "fh"}
                  onClick={() => file.conf.setSizerMode("fh")}
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
                  active={() => file.conf.sizerMode === "fw"}
                  onClick={() => file.conf.setSizerMode("fw")}
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
  }
);
