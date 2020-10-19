import React, { FC } from "react";
import { observable } from "mobx";
import { useObserver } from "mobx-react";
import Selector, { SelectionSubNote } from "./Selector";
import { MuseConfig, Note } from ".";
import { Border } from "./Border";

export class SubNote implements SelectionSubNote {
  readonly config: MuseConfig;
  @observable isSelect = false;
  @observable note: Note;
  @observable index: number;
  @observable x: string = "";
  @observable n: string = "";
  @observable t: number = 0;
  constructor(
    x: string,
    n: string,
    t: number,
    note: Note,
    index: number,
    config: MuseConfig
  ) {
    this.x = x;
    this.n = n;
    this.t = t;
    this.note = note;
    this.index = index;
    this.config = config;
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

interface MuseSubNoteProps {
  dx: number;
  y: number;
  w: number;
  h: number;
  subNote: SubNote;
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

const MuseSubNote: FC<MuseSubNoteProps> = ({ dx, y, w, h, subNote }) => {
  return useObserver(() => (
    <g
      className={"muse-note__subnote"}
      transform={"translate(" + 0 + "," + y + ")"}
      width={w}
      height={h}
      onClick={() => {
        Selector.instance.selectSubNote(subNote);
      }}
    >
      <text
        fontFamily={subNote.config.noteFontFamily}
        fontSize={subNote.config.noteFontSize}
        transform={"translate(" + dx + "," + 0 + ")"}
      >
        {subNote.n}
      </text>
      <text
        fontFamily={subNote.config.noteFontFamily}
        fontSize={subNote.config.sigFontSize}
        transform={
          "translate(" +
          0 +
          "," +
          (subNote.config.sigFontSize - subNote.config.noteHeight) +
          ")"
        }
      >
        {castX(subNote.x)}
      </text>
      <Border
        x={0}
        y={-h}
        w={w}
        h={subNote.config.noteFontSize}
        clazz={"muse-note__subnote"}
        show={subNote.isSelect}
      />
    </g>
  ));
};

export default MuseSubNote;
