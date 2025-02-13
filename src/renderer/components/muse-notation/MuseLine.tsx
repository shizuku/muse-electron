import React, { FC } from "react";
import MuseConfig from "./MuseConfig";
import MuseTrack, { ITrack, Track } from "./MuseTrack";
import { Border } from "./Border";
import Codec from "./Codec";
import { computed, observable } from "mobx";
import { useObserver } from "mobx-react";
import { Page } from "./MusePage";
import Selector, { SelectionLine } from "./Selector";

export interface ILine {
  tracks: ITrack[];
}

export class Line implements Codec, SelectionLine {
  readonly config: MuseConfig;
  @observable page: Page;
  @observable index: number;
  @observable tracks: Track[] = [];
  @observable isSelect: boolean = false;
  @computed get width() {
    return this.page.width;
  }
  @computed get height() {
    let h = 0;
    this.tracks.forEach((it) => {
      h += it.height + this.config.trackGap;
    });
    h -= this.config.trackGap;
    return h;
  }
  @computed get x() {
    return this.config.pageMarginHorizontal;
  }
  @computed get y() {
    return this.page.linesY[this.index];
  }
  @computed get tracksY(): number[] {
    let y = 0;
    return this.tracks.map((it) => {
      let r = y;
      y += it.height + this.config.trackGap;
      return r;
    });
  }
  @computed get barsWidth(): number[] {
    let r: number[] = [];
    this.tracks.forEach((it) => {
      if (r.length <= 0) {
        r = it.preBarsWidth;
      } else
        it.preBarsWidth.forEach(
          (it, idx) => (r[idx] = r[idx] > it ? r[idx] : it)
        );
    });
    return r;
  }
  constructor(o: ILine, index: number, page: Page, config: MuseConfig) {
    this.page = page;
    this.index = index;
    this.config = config;
    this.decode(o);
  }
  addTrack(index: number) {
    this.tracks.splice(
      index,
      0,
      new Track(
        { bars: [{ notes: [{ n: "0" }] }] },
        this.tracks.length,
        this,
        this.config
      )
    );
    this.tracks.forEach((it, idx) => (it.index = idx));
  }
  removeTrack(index: number) {
    this.tracks = this.tracks.filter((it, idx) => idx !== index);
    this.tracks.forEach((it, idx) => (it.index = idx));
  }
  setSelect(s: boolean) {
    this.isSelect = s;
  }
  getThis() {
    return this;
  }
  decode(o: ILine): void {
    if (o.tracks !== undefined) {
      this.tracks.length = 0;
      o.tracks.forEach((it: ITrack, idx) => {
        this.tracks.push(new Track(it, idx, this, this.config));
      });
    }
  }
  code(): ILine {
    let tracks: ITrack[] = this.tracks.map((it) => it.code());
    return { tracks };
  }
}

const LineHead: FC<{ height: number; clazz: string }> = ({ height, clazz }) => {
  return useObserver(() => (
    <g className={clazz + "__line-head"}>
      <line x1={0} y1={0} x2={0} y2={height} strokeWidth={1} stroke="black" />
    </g>
  ));
};

const MuseLine: FC<{ line: Line; c: number[]; sl?: Selector }> = ({
  line,
  c,
  sl,
}) => {
  let clazz = "muse-line";
  return useObserver(() => (
    <g
      className={clazz}
      transform={"translate(" + line.x + "," + line.y + ")"}
      width={line.width}
      height={line.height}
    >
      <Border
        w={line.width}
        h={line.height}
        x={0}
        y={0}
        clazz={clazz}
        show={line.isSelect || line.config.showBorder}
      />
      <LineHead height={line.height} clazz={clazz} />
      {line.tracks.map((it, idx) => (
        <MuseTrack key={idx} track={it} c={[...c, idx]} sl={sl} />
      ))}
    </g>
  ));
};

export default MuseLine;
