import React, { FC } from "react";
import MuseConfig from "./MuseConfig";
import MusePage, { IPage, Page } from "./MusePage";
import Codec from "./Codec";
import { computed, observable } from "mobx";
import { useObserver } from "mobx-react";
import Selector, { SelectionNotation } from "./Selector";
import { useAppState } from "../../states";

export class NotationInfo {
  @observable title: string = "";
  @observable subtitle: string = "";
  @observable author: string[] = [];
  @observable speed: string = "";
  @observable rhythmic: string = "";
  @observable C: string = "";
}

export interface INotation {
  title: string;
  subtitle: string;
  author: string;
  rhythmic: string;
  speed: string;
  C: string;
  pages: IPage[];
}

export class Notation implements Codec, SelectionNotation {
  readonly config: MuseConfig;
  @observable pages: Page[] = [];
  @observable isSelect = false;
  @observable info: NotationInfo = new NotationInfo();
  @computed get nx() {
    if (this.config.vertical) {
      return this.config.pagePerLine > this.pages.length
        ? this.pages.length
        : this.config.pagePerLine;
    } else {
      let p = parseInt(`${this.pages.length / this.config.pagePerLine}`, 10);
      let q = this.pages.length % this.config.pagePerLine;
      if (q === 0) {
        return p;
      } else {
        return p + 1;
      }
    }
  }
  @computed get ny() {
    if (this.config.vertical) {
      let p = parseInt(`${this.pages.length / this.config.pagePerLine}`, 10);
      let q = this.pages.length % this.config.pagePerLine;
      if (q === 0) {
        return p;
      } else {
        return p + 1;
      }
    } else {
      return this.config.pagePerLine > this.pages.length
        ? this.pages.length
        : this.config.pagePerLine;
    }
  }
  @computed get height() {
    return this.config.pageHeight * this.ny;
  }
  @computed get width() {
    return this.config.pageWidth * this.nx;
  }
  constructor(o: INotation, config: MuseConfig) {
    this.config = config;
    this.decode(o);
  }
  addPage(index: number) {
    this.pages.splice(
      index,
      0,
      new Page(
        { lines: [{ tracks: [{ bars: [{ notes: [{ n: "0" }] }] }] }] },
        this.pages.length,
        this,
        this.config
      )
    );
    this.pages.forEach((it, idx) => (it.index = idx));
  }
  reomvePage(index: number) {
    this.pages = this.pages.filter((it, idx) => idx !== index);
    this.pages.forEach((it, idx) => (it.index = idx));
  }
  setSelect(s: boolean) {
    this.isSelect = s;
  }
  getThis() {
    return this;
  }
  decode(o: INotation): void {
    if (o.pages !== undefined) {
      o.pages.forEach((it: IPage, idx) => {
        if (this.pages.length <= idx) {
          this.pages.push(new Page(it, idx, this, this.config));
        } else {
          this.pages[idx].decode(it);
        }
      });
    }
    if (o.title !== undefined) {
      this.info.title = o.title;
    }
    if (o.subtitle !== undefined) {
      this.info.subtitle = o.subtitle;
    }
    if (o.author !== undefined) {
      this.info.author = o.author.toString().split("|");
    }
    if (o.speed !== undefined) {
      this.info.speed = o.speed;
    }
    if (o.rhythmic) {
      this.info.rhythmic = o.rhythmic;
    }
    if (o.C) {
      this.info.C = o.C;
    }
  }
  code(): INotation {
    let pages: IPage[] = this.pages.map((it) => it.code());
    let author: string = "";
    this.info.author.forEach((it, idx) => {
      if (idx === this.info.author.length - 1) {
        author += it;
      } else {
        author += it + "|";
      }
    });
    return {
      title: this.info.title,
      subtitle: this.info.subtitle,
      author: author,
      rhythmic: this.info.rhythmic,
      speed: this.info.speed,
      C: this.info.C,
      pages,
    };
  }
}

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

export interface MuseNotationProps {
  notation: Notation;
}

const MuseNotation: FC<MuseNotationProps> = ({ notation }) => {
  let clazz = "muse-notation";
  let state = useAppState();
  return useObserver(() => (
    <div className={clazz}>
      {notation.pages.map((it, idx) => (
        <MusePage key={idx} page={it} c={[idx]} sl={state.sl} />
      ))}
    </div>
  ));
};

export default MuseNotation;
