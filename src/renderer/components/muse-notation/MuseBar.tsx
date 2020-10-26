import React, { FC } from "react";
import MuseConfig from "./MuseConfig";
import MuseNote, { INote, Note } from "./MuseNote";
import { Border } from "./Border";
import Codec from "./Codec";
import { computed, observable } from "mobx";
import { useObserver } from "mobx-react";
import Fraction from "./Fraction";
import { Track } from "./MuseTrack";
import Selector, { SelectionBar } from "./Selector";

interface Baseline {
  y: number;
  s: number;
  e: number;
}

export interface IBar {
  notes: INote[];
}

export class Bar implements Codec, SelectionBar {
  readonly config: MuseConfig;
  @observable index: number;
  @observable track: Track;
  @observable notes: Note[] = [];
  @observable isSelect: boolean = false;
  @computed get width(): number {
    return this.track.barsWidth[this.index];
  }
  @computed get height(): number {
    let h = 0;
    this.notes.forEach((it) => {
      let u = it.height + it.marginBottom;
      h = u > h ? u : h;
    });
    return h;
  }
  @computed get x(): number {
    return this.track.barsX[this.index];
  }
  @computed get y(): number {
    return 0;
  }
  @computed get notesTime(): Fraction[] {
    return this.notes.map((it) => it.time);
  }
  @computed get notesTimeSum(): Fraction {
    return this.notesTime
      .reduce((a, b) => a.plus(b), new Fraction())
      .plus(new Fraction().init(1, 1));
  }
  @computed get notesWidth(): number[] {
    return this.notes.map((it) => it.width);
  }
  @computed get notesX(): number[] {
    let space = this.width - this.notesWidthSum;
    let unit = new Fraction().init(space, 1).divide(this.notesTimeSum);
    let x = unit.toNumber();
    return this.notesWidth.map((it, idx) => {
      let r = x;
      x += it + this.notesTime[idx].multiply(unit).toNumber();
      return r;
    });
  }
  @computed get preNotesMaxHeight(): number {
    return Math.max(...this.notes.map((it) => it.preHeight));
  }
  @computed get notesMaxHeight(): number {
    return this.track.notesMaxHeight;
  }
  @computed get preNotesMaxMarginBottom(): number {
    return Math.max(...this.notes.map((it) => it.preMarginBottom));
  }
  @computed get notesMaxMarginBottom(): number {
    return this.track.notesMaxMarginBottom;
  }
  @computed get baselineGroup(): Baseline[] {
    let r: {
      y: number;
      s: number;
      e: number;
    }[] = [];
    for (let i = 0; ; ++i) {
      let x = 0;
      let s = 0;
      let e = -1;
      this.notes.forEach((it, idx) => {
        if (it.l > i) {
          e = idx;
          x++;
        } else {
          if (s <= e) r.push({ y: i, s: s, e: e });
          s = idx + 1;
          e = idx;
        }
      });
      if (s <= e) r.push({ y: i, s: s, e: e });
      if (x === 0) {
        break;
      }
    }
    return r;
  }
  @computed get notesWidthSum(): number {
    let w = 0;
    this.notes.forEach((it) => (w += it.width));
    return w;
  }
  constructor(o: IBar, index: number, track: Track, config: MuseConfig) {
    this.index = index;
    this.track = track;
    this.config = config;
    this.decode(o);
  }
  addNote(index: number) {
    this.notes.splice(index, 0, new Note({ n: "0" }, this, this.notes.length));
    this.notes.forEach((it, idx) => (it.index = idx));
  }
  removeNote(index: number) {
    this.notes = this.notes.filter((it, idx) => idx !== index);
    this.notes.forEach((it, idx) => (it.index = idx));
  }
  setSelect(i: boolean) {
    this.isSelect = i;
  }
  getThis() {
    return this;
  }
  decode(o: IBar): void {
    if (o.notes !== undefined) {
      o.notes.forEach((it: INote, idx) => {
        if (this.notes.length <= idx) {
          this.notes.push(new Note(it, this, idx));
        } else {
          this.notes[idx].decode(it);
        }
      });
    }
  }
  code(): IBar {
    let notes: INote[] = this.notes.map((it) => it.code());
    return { notes };
  }
}

const BarLine: FC<{ w: number; h: number; clazz: string }> = ({
  w,
  h,
  clazz,
}) => {
  return useObserver(() => (
    <line
      className={clazz + "__bar-line"}
      x1={w}
      y1={0}
      x2={w}
      y2={h}
      strokeWidth={1}
      stroke="black"
    />
  ));
};

const BaseLine: FC<{ bar: Bar; clazz: string }> = ({ bar, clazz }) => {
  return useObserver(() => (
    <g className={clazz + "__base-line"}>
      {bar.baselineGroup.map((it, idx) => (
        <line
          key={idx}
          x1={bar.notes[it.s].x}
          y1={bar.notes[it.s].height + it.y * bar.config.pointGap}
          x2={bar.notes[it.e].x + bar.notes[it.e].width}
          y2={bar.notes[it.s].height + it.y * bar.config.pointGap}
          stroke={"black"}
          strokeWidth={1}
        />
      ))}
    </g>
  ));
};

const MuseBar: FC<{ bar: Bar; sl?: Selector }> = ({ bar, sl }) => {
  let clazz = "muse-bar";
  return useObserver(() => (
    <g
      className={clazz}
      transform={"translate(" + bar.x + "," + bar.y + ")"}
      width={bar.width}
      height={bar.height}
    >
      <Border
        w={bar.width}
        h={bar.height}
        x={0}
        y={0}
        clazz={clazz}
        show={bar.isSelect || bar.config.showBorder}
      />
      <BarLine w={bar.width} h={bar.height} clazz={clazz} />
      {bar.notes.map((it, idx) => (
        <MuseNote key={idx} note={it} sl={sl} />
      ))}
      <BaseLine bar={bar} clazz={clazz} />
    </g>
  ));
};

export default MuseBar;
