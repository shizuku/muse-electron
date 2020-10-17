import React, { FC } from "react";
import MuseConfig from "./MuseConfig";
import MuseLine, { ILine, Line } from "./MuseLine";
import { Border, OuterBorder } from "./Border";
import Codec from "./Codec";
import { computed, observable } from "mobx";
import { Notation } from "./MuseNotation";
import { useObserver } from "mobx-react";
import { SelectionPage } from "./Selector";

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
        this.lines.push(new Line(it, idx, this, this.config));
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

const PageIndex: React.FC<PageIndexProps> = ({
  index,
  x,
  y,
  clazz,
  config,
}: PageIndexProps) => {
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

const MusePage: FC<{ page: Page }> = ({ page }) => {
  let clazz = "muse-page";
  return useObserver(() => (
    <g
      className={clazz}
      transform={
        "translate(" +
        (page.x - page.marginLeft) +
        "," +
        (page.y - page.marginTop) +
        ")"
      }
      width={page.width + page.marginLeft + page.marginRight}
      height={page.height + page.marginTop + page.marginBottom}
    >
      <Border
        w={page.width}
        h={page.height}
        x={page.x}
        y={page.marginTop}
        clazz={clazz}
        show={page.isSelect}
      />
      <OuterBorder
        w={page.width + page.marginLeft + page.marginLeft}
        h={page.height + page.marginTop + page.marginBottom}
        clazz={clazz}
        show={true}
      />
      <PageIndex
        index={page.index}
        x={page.marginLeft + page.width / 2}
        y={page.marginTop + page.height + page.marginBottom / 2}
        clazz={clazz}
        config={page.config}
      />
      {page.lines.map((it, idx) => (
        <MuseLine key={idx} line={it} />
      ))}
    </g>
  ));
};

export default MusePage;
