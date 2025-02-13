import React, { CSSProperties, FC, useState } from "react";
import { observer } from "mobx-react";
import { ColumnHeightOutlined, ColumnWidthOutlined } from "@ant-design/icons";
import { Sizer } from "./sizer";
import { FuncBar } from "./func-bar";
import { LayoutHorizontalOutlined, LayoutVerticalOutlined } from "../icons";
import { FuncButton } from "./func-bar/func-button";
import "./style.css";
import { Tooltip } from "antd";
import { ConfigInstance } from "../../models/config";
import { ThemeItemInstance } from "../../models/values/themes/theme-item";
import { WindowInstance } from "../../models/ui/window";
import { FileInstance } from "../../models/file";
import { LocaleStringsInstance } from "../../models/values/strings/locale-strings";

export interface FooterProps {
  config: ConfigInstance;
  file: FileInstance;
  theme: ThemeItemInstance;
  t: LocaleStringsInstance;
  win: WindowInstance;
}

export const Footer: FC<FooterProps> = observer(
  ({ config, file, theme, t, win }) => {
    let [maxHeight, setMaxHeight] = useState(0);
    let styleHover = () => {
      switch (win.display) {
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
      switch (win.display) {
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
    return (
      <footer
        className="footer"
        ref={(e) => {
          let h = e?.clientHeight || 0;
          win.setFooter(h);
          setMaxHeight(maxHeight > h ? maxHeight : h);
        }}
        style={
          file.isOpen
            ? win.footerHover
              ? styleHover()
              : styleUnhover()
            : { display: "none" }
        }
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
                title={t["toolbar_view_one-page"]}
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
                title={t["toolbar_view_two-page"]}
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
                title={t["footer_sizer_fit-height"]}
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
                title={t["footer_sizer_fit-width"]}
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
            <Sizer file={file} t={t} />
          </div>
        </div>
      </footer>
    );
  }
);
