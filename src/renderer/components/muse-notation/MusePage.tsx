import React, { FC } from "react";
import MuseConfig from "./MuseConfig";
import MuseLine, { ILine, Line } from "./MuseLine";
import { Border, OuterBorder } from "./Border";
import Codec from "./Codec";
import { computed, observable } from "mobx";
import { Notation, NotationInfo } from "./MuseNotation";
import { useObserver } from "mobx-react";
import Selector, { SelectionPage } from "./Selector";
import { useAppState } from "../app";

export interface IPage {
  lines: ILine[];
}

export class Page implements Codec, SelectionPage {
  readonly config: MuseConfig;
  @observable notation: Notation;
  @observable index: number;
  @observable lines: Line[] = [];
  @observable isSelect: boolean = false;
  @computed get width() {
    return this.config.pageWidth - this.config.pageMarginHorizontal * 2;
  }
  @computed get height() {
    return (
      this.config.pageHeight - this.config.pageMarginVertical - this.marginTop
    );
  }
  @computed get xp() {
    if (this.config.vertical) {
      return this.index % this.config.pagePerLine;
    } else {
      return parseInt(`${this.index / this.config.pagePerLine}`, 10);
    }
  }
  @computed get yp() {
    if (this.config.vertical) {
      return parseInt(`${this.index / this.config.pagePerLine}`, 10);
    } else {
      return this.index % this.config.pagePerLine;
    }
  }
  @computed get x() {
    return this.marginLeft + this.xp * this.config.pageWidth;
  }
  @computed get y() {
    return this.marginTop + this.yp * this.config.pageHeight;
  }
  @computed get marginTop() {
    let mt = 0;
    if (this.index === 0) {
      mt += this.config.pageMarginVertical;
      let g = this.config.infoGap;
      mt += this.config.infoTitleFontSize + g;
      mt += this.config.infoSubtitleFontSize + g;
      if (this.notation.info.author.length > 2) {
        mt += this.notation.info.author.length * (this.config.infoFontSize + g);
      } else {
        mt += 2 * (this.config.infoFontSize + g);
      }
    } else {
      mt = this.config.pageMarginVertical;
    }
    return mt;
  }
  @computed get marginBottom() {
    return this.config.pageMarginVertical;
  }
  @computed get marginLeft() {
    return this.config.pageMarginHorizontal;
  }
  @computed get marginRight() {
    return this.config.pageMarginHorizontal;
  }
  @computed get linesHeight(): number[] {
    return this.lines.map((it) => it.height);
  }
  @computed get linesY() {
    let y = this.marginTop;
    let sum = this.linesHeight.reduce((a, b) => a + b, 0);
    let gap = (this.height - sum) / (this.lines.length - 1);
    return this.linesHeight.map((it) => {
      let r = y;
      y += it + gap;
      return r;
    });
  }
  constructor(o: IPage, index: number, notation: Notation, config: MuseConfig) {
    this.index = index;
    this.notation = notation;
    this.config = config;
    this.decode(o);
  }
  addLine(index: number) {
    this.lines.splice(
      index,
      0,
      new Line(
        { tracks: [{ bars: [{ notes: [{ n: "0" }] }] }] },
        this.lines.length,
        this,
        this.config
      )
    );
    this.lines.forEach((it, idx) => (it.index = idx));
  }
  removeLine(index: number) {
    this.lines = this.lines.filter((it, idx) => idx !== index);
    this.lines.forEach((it, idx) => (it.index = idx));
  }
  setSelect(s: boolean) {
    this.isSelect = s;
  }
  getThis() {
    return this;
  }
  decode(o: IPage): void {
    if (o.lines !== undefined) {
      o.lines.forEach((it: ILine, idx) => {
        if (this.lines.length <= idx) {
          this.lines.push(new Line(it, idx, this, this.config));
        } else {
          this.lines[idx].decode(it);
        }
      });
    }
  }
  code(): IPage {
    let lines: ILine[] = this.lines.map((it) => it.code());
    return { lines };
  }
}

interface PageIndexProps {
  index: number;
  x: number;
  y: number;
  clazz: string;
  config: MuseConfig;
}

const PageIndex: FC<PageIndexProps> = ({ index, x, y, clazz, config }) => {
  return (
    <g
      className={clazz + "__page-index"}
      transform={"translate(" + x + "," + y + ")"}
    >
      <text
        textAnchor={"middle"}
        fontFamily={config.textFontFamily}
        fontSize={config.pageIndexFontSize}
      >
        {(index + 1).toString()}
      </text>
    </g>
  );
};

interface MuseNotationInfoProps {
  info: NotationInfo;
  config: MuseConfig;
  clazz: string;
}

const MuseNotationInfo: FC<MuseNotationInfoProps> = ({
  info,
  config,
  clazz,
}) => {
  let y = 0;
  y += config.pageMarginVertical;
  let titleY = y;
  y += config.infoTitleFontSize + config.infoGap;
  let y1 = y;
  let x = info.author.length;
  let y2 = y + (config.infoGap + config.infoSubtitleFontSize);
  let y3 = y2 + (config.infoGap + config.infoFontSize);
  return useObserver(() => (
    <g className={clazz + "__info"} width={config.pageWidth}>
      <text
        className={clazz + "__info-title"}
        fontFamily={config.textFontFamily}
        width={config.pageWidth}
        textAnchor={"middle"}
        fontSize={config.infoTitleFontSize}
        transform={"translate(" + config.pageWidth / 2 + "," + titleY + ")"}
      >
        {info.title}
      </text>
      <text
        className={clazz + "__info-subtitle"}
        fontFamily={config.textFontFamily}
        width={config.pageWidth}
        textAnchor={"middle"}
        fontSize={config.infoSubtitleFontSize}
        transform={"translate(" + config.pageWidth / 2 + "," + y + ")"}
      >
        {info.subtitle}
      </text>
      <g className={clazz + "__info-author"}>
        {info.author.map((it, idx) => {
          y1 += config.infoFontSize + config.infoGap;
          if (idx < x - 2) {
            y += config.infoFontSize + config.infoGap;
          }
          return (
            <text
              key={idx}
              fontFamily={config.textFontFamily}
              width={config.pageWidth}
              fontSize={config.infoFontSize}
              textAnchor={"end"}
              x={0}
              transform={
                "translate(" +
                (config.pageWidth - config.pageMarginHorizontal) +
                "," +
                y1 +
                ")"
              }
            >
              {it}
            </text>
          );
        })}
      </g>
      <g className={clazz + "__info-rythmic"} width={config.pageWidth}>
        <text
          fontFamily={config.textFontFamily}
          width={config.pageWidth}
          fontSize={config.infoFontSize}
          transform={
            "translate(" + config.pageMarginHorizontal + "," + y2 + ")"
          }
        >
          {info.speed}
        </text>
        <text
          fontFamily={config.textFontFamily}
          width={config.pageWidth}
          fontSize={config.infoFontSize}
          transform={
            "translate(" + config.pageMarginHorizontal + "," + y3 + ")"
          }
        >
          {`1=${info.C} ${info.rhythmic}`}
        </text>
      </g>
    </g>
  ));
};

const MusePage: FC<{ page: Page; sl?: Selector }> = ({ page, sl }) => {
  let clazz = "muse-page";
  let state = useAppState();
  return useObserver(() => (
    <div
      className={clazz}
      ref={(e) => {
        state.rs[page.index] = e as HTMLElement;
      }}
      style={{
        width: page.width + page.marginLeft + page.marginRight,
        height: page.height + page.marginTop + page.marginBottom,
        margin: page.config.pageGap,
      }}
    >
      <svg
        className={clazz + "__svg"}
        width={page.width + page.marginLeft + page.marginRight}
        height={page.height + page.marginTop + page.marginBottom}
      >
        <rect
          width={page.width + page.marginLeft + page.marginRight}
          height={page.height + page.marginTop + page.marginBottom}
          strokeWidth={0}
          stroke={"gray"}
          fill={page.config.backgroundColor}
        />
        <Border
          w={page.width}
          h={page.height}
          x={page.x}
          y={page.marginTop}
          clazz={clazz}
          show={page.isSelect || page.config.showBorder}
        />
        <PageIndex
          index={page.index}
          x={page.marginLeft + page.width / 2}
          y={page.marginTop + page.height + page.marginBottom / 2}
          clazz={clazz}
          config={page.config}
        />
        {page.lines.map((it, idx) => (
          <MuseLine key={idx} line={it} sl={sl} />
        ))}
        {page.index === 0 ? (
          <MuseNotationInfo
            info={page.notation.info}
            config={page.notation.config}
            clazz={clazz}
          />
        ) : (
          <></>
        )}
      </svg>
    </div>
  ));
};

export default MusePage;
