import React, { FC } from "react";
import MuseConfig from "./MuseConfig";
import MuseBar, { Bar, IBar } from "./MuseBar";
import { Border } from "./Border";
import Codec from "./Codec";
import { computed, observable } from "mobx";
import { Line } from "./MuseLine";
import Fraction from "./Fraction";
import { useObserver } from "mobx-react";
import Selector, { SelectionTrack } from "./Selector";

export interface ITrack {
  bars: IBar[];
}

export class Track implements Codec, SelectionTrack {
  readonly config: MuseConfig;
  @observable index: number;
  @observable line: Line;
  @observable bars: Bar[] = [];
  @observable isSelect: boolean = false;
  @computed get width(): number {
    return this.line.width;
  }
  @computed get height(): number {
    let h = 0;
    this.bars.forEach((it) => {
      h = it.height > h ? it.height : h;
    });
    return h;
  }
  @computed get x(): number {
    return 0;
  }
  @computed get y(): number {
    return this.line.tracksY[this.index];
  }
  @computed get barsTime(): Fraction[] {
    return this.bars.map((it) => it.notesTimeSum);
  }
  @computed get barsWidth(): number[] {
    let s = this.line.barsWidth.reduce((a, b) => a + b, 0);
    let d = s / this.width;
    return this.line.barsWidth.map((it) => it / d);
  }
  @computed get preBarsWidth(): number[] {
    let timeSum = this.barsTime.reduce((a, b) => a.plus(b), new Fraction());
    let space = this.width - this.notesWidthSum;
    let unit = new Fraction().init(space, 1).divide(timeSum);
    return this.barsNotesWidth.map((it, idx) => {
      return it + this.barsTime[idx].multiply(unit).toNumber();
    });
  }
  @computed get barsX(): number[] {
    let x = 0;
    return this.barsWidth.map((it) => {
      let r = x;
      x += it;
      return r;
    });
  }
  @computed get notesMaxHeight(): number {
    return Math.max(...this.bars.map((it) => it.preNotesMaxHeight));
  }
  @computed get notesMaxMarginBottom(): number {
    return Math.max(...this.bars.map((it) => it.preNotesMaxMarginBottom));
  }
  @computed get notesWidthSum(): number {
    return this.barsNotesWidth.reduce((a, b) => a + b, 0);
  }
  @computed get barsNotesWidth(): number[] {
    return this.bars.map((it) => it.notesWidthSum);
  }
  constructor(o: ITrack, index: number, line: Line, config: MuseConfig) {
    this.index = index;
    this.line = line;
    this.config = config;
    this.decode(o);
  }
  addBar(index: number) {
    this.bars.splice(
      index,
      0,
      new Bar({ notes: [{ n: "0" }] }, this.bars.length, this, this.config)
    );
    this.bars.forEach((it, idx) => (it.index = idx));
  }
  removeBar(index: number) {
    this.bars = this.bars.filter((it, idx) => idx !== index);
    this.bars.forEach((it, idx) => (it.index = idx));
  }
  setSelect(s: boolean) {
    this.isSelect = s;
  }
  getThis() {
    return this;
  }
  decode(o: ITrack): void {
    if (o.bars !== undefined) {
      this.bars.length = 0;
      o.bars.forEach((it: any, idx) => {
        this.bars.push(new Bar(it, idx, this, this.config));
      });
    }
  }
  code(): ITrack {
    let bars: IBar[] = this.bars.map((it) => it.code());
    return { bars };
  }
}

const MuseTrack: FC<{ track: Track; c: number[]; sl?: Selector }> = ({
  track,
  c,
  sl,
}) => {
  let clazz = "muse-track";
  return useObserver(() => (
    <g
      className={clazz}
      transform={"translate(" + track.x + "," + track.y + ")"}
      width={track.width}
      height={track.height}
    >
      <Border
        w={track.width}
        h={track.height}
        x={0}
        y={0}
        clazz={clazz}
        show={track.isSelect || track.config.showBorder}
      />
      {track.bars.map((it, idx) => (
        <MuseBar key={idx} bar={it} c={[...c, idx]} sl={sl} />
      ))}
    </g>
  ));
};

export default MuseTrack;
