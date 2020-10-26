import React, { FC } from "react";
import { computed, observable } from "mobx";
import { useObserver } from "mobx-react";
import Selector, { SelectionSubNote } from "./Selector";
import { MuseConfig, Note } from ".";
import { Border } from "./Border";
import Codec from "./Codec";

export class SubNote implements SelectionSubNote, Codec {
  readonly config: MuseConfig;
  @observable isSelect = false;
  @observable note: Note;
  @observable index: number;
  @computed get preMarginLeft(): number {
    return this.x === "" ? 0 : this.config.sigFontSize / 2;
  }
  @computed get marginLeft(): number {
    return this.note.marginLeft;
  }
  @computed get width(): number {
    return this.config.noteWidth;
  }
  @computed get height(): number {
    return this.config.noteHeight;
  }
  @computed get marginTop(): number {
    if (this.t > 0) {
      return this.t * this.config.pointGap;
    } else return 0;
  }
  @computed get marginBottom(): number {
    if (this.t < 0) {
      return -this.t * this.config.pointGap;
    } else return 0;
  }
  @computed get pointsY(): number[] {
    let r: number[] = [];
    if (this.t < 0) {
      let y = 0;
      if (this.index === 0) {
        y += this.note.l * this.config.pointGap;
      }
      for (let i = 0; i < -this.t; ++i) {
        r.push(y);
        y += this.config.pointGap;
      }
    } else if (this.t > 0) {
      let y = -this.height;
      for (let i = 0; i < this.t; ++i) {
        r.push(y);
        y -= this.config.pointGap;
      }
    }
    return r;
  }
  @computed get y(): number {
    return this.note.subNotesY[this.index];
  }
  @observable x: string = ""; //#b
  @observable n: string = ""; //12
  @observable t: number = 0; //+-
  constructor(it: string, note: Note, index: number, config: MuseConfig) {
    this.note = note;
    this.index = index;
    this.config = config;
    this.decode(it);
  }
  decode(it: string): void {
    for (let i = 0; i < it.length; ++i) {
      if (
        (it.charCodeAt(i) <= 57 && it.charCodeAt(i) >= 48) ||
        it.charCodeAt(i) === 45
      ) {
        this.x = it.substr(0, i);
        this.n = it.charAt(i);
        this.t = it.substr(i + 1).length;
        if (this.t !== 0 && it.charAt(i + 1) === "-") {
          this.t = -this.t;
        }
        break;
      }
    }
  }
  code(): string {
    let t = "";
    if (this.t > 0) {
      for (let i = 0; i < this.t; ++i) {
        t += "+";
      }
    } else {
      for (let i = 0; i < -this.t; ++i) {
        t += "-";
      }
    }
    return `${this.x}${this.n}${t}`;
  }
  setSelect(s: boolean) {
    this.isSelect = s;
  }
  setNum(n: string) {
    this.n = n;
  }
  reducePoint(h: number) {
    this.t += h;
  }
  reduceLine(l: number) {
    this.note.l += l;
    if (this.note.l < 0) {
      this.note.l = 0;
    }
  }
  reduceTailPoint(p: number) {
    this.note.p += p;
    if (this.note.p < 0) {
      this.note.p = 0;
    }
  }
  getThis() {
    return this;
  }
}

function castX(x: string) {
  let m: Record<string, string> = {
    S: "#",
    F: "b",
    DS: "x",
    DF: "d",
    N: "n",
  };
  return m[x] || "";
}

const MuseSubNote: FC<{ subNote: SubNote; sl?: Selector }> = ({
  subNote,
  sl,
}) => {
  return useObserver(() => (
    <g
      className={"muse-subnote"}
      transform={"translate(" + subNote.marginLeft + "," + subNote.y + ")"}
      width={subNote.width}
      height={subNote.height}
      onClick={() => {
        sl?.selectSubNote(subNote);
      }}
    >
      <text
        fontFamily={subNote.config.noteFontFamily}
        fontSize={subNote.config.noteFontSize}
        transform={"translate(" + 0.2 + "," + -3.5 + ")"}
      >
        {subNote.n}
      </text>
      <text
        fontFamily={subNote.config.noteFontFamily}
        fontSize={subNote.config.sigFontSize}
        transform={
          "translate(" +
          -subNote.config.sigFontSize / 2 +
          "," +
          (subNote.config.sigFontSize - subNote.config.noteHeight) +
          ")"
        }
      >
        {castX(subNote.x)}
      </text>
      <g
        className="muse-subnote__point-group"
        transform={"translate(" + 0 + "," + 0 + ")"}
      >
        {subNote.pointsY.map((it, idx) => (
          <circle
            key={idx}
            transform={
              "translate(" + subNote.config.noteWidth / 2 + "," + it + ")"
            }
            r={subNote.config.pointRound}
          />
        ))}
      </g>
      <Border
        x={-subNote.preMarginLeft}
        y={-subNote.height}
        w={subNote.width + subNote.preMarginLeft}
        h={subNote.height}
        clazz={"muse-subnote"}
        show={subNote.isSelect || subNote.config.showBorder}
      />
    </g>
  ));
};

export default MuseSubNote;
