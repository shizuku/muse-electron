import React, { FC } from "react";
import { OuterBorder } from "./Border";
import MuseConfig from "./MuseConfig";
import Codec from "./Codec";
import Fraction from "./Fraction";
import { computed, observable } from "mobx";
import { useObserver } from "mobx-react";
import Selector, { SelectionNote } from "./Selector";
import { Bar } from "./MuseBar";
import MuseSubNote, { SubNote } from "./MuseSubNote";

export interface INote {
  n: string;
}

export class Note implements Codec, SelectionNote {
  readonly config: MuseConfig;
  @observable index: number;
  @observable bar: Bar;
  @observable subNotes: SubNote[] = [];
  @observable l: number = 0; //__
  @observable p: number = 0; //..
  @observable d: number = 0; // _3_
  @computed get time(): Fraction {
    let r = new Fraction();
    r.u = 1;
    r.d *= Math.pow(2, this.l);
    r.d *= this.d;
    r.d *= Math.pow(2, this.p); //3/2 7/4 15/8
    r.u *= Math.pow(2, this.p + 1) - 1;
    return r.simplify();
  }
  @computed get notesY(): number[] {
    let r: number[] = [];
    let ny = 0;
    this.subNotes.forEach((it, idx) => {
      if (it.t < 0) {
        if (idx !== 0) {
          let i = -it.t;
          for (; i > 0; --i) {
            let x = this.config.pointGap;
            ny += x;
          }
        }
      }
      r.push(ny);
      let h = this.config.noteHeight;
      ny += h;
      if (it.t > 0) {
        let i = it.t;
        for (; i > 0; --i) {
          let x = this.config.pointGap;
          ny += x;
        }
      }
    });
    return r;
  }
  @computed get subNotesHeight(): number[] {
    return this.subNotes.map(
      (it) => it.height + it.marginTop + it.marginBottom
    );
  }
  @computed get subNotesY(): number[] {
    let r: number[] = [];
    let y = this.height;
    this.subNotesHeight.forEach((it) => {
      r.push(y);
      y -= it;
    });
    return r;
  }
  @computed get tailPointsX(): number[] {
    let r: number[] = [];
    for (let i = 0; i < this.p; ++i) {
      r.push(
        this.marginLeft +
          this.config.noteWidth +
          (i + 1 / 2) * this.config.tailPointGap
      );
    }
    return r;
  }
  @computed get width(): number {
    return (
      this.marginLeft +
      this.config.noteWidth +
      this.p * this.config.tailPointGap
    );
  }
  @computed get preHeight(): number {
    let h = 0;
    this.subNotes.forEach((it, idx) => {
      if (it.t < 0) {
        if (idx !== 0) {
          let i = -it.t;
          for (; i > 0; --i) {
            let x = this.config.pointGap;
            h += x;
          }
        }
      }
      h += this.config.noteHeight;
      if (it.t > 0) {
        let i = it.t;
        for (; i > 0; --i) {
          let x = this.config.pointGap;
          h += x;
        }
      }
    });
    return h;
  }
  @computed get height(): number {
    return this.bar.notesMaxHeight;
  }
  @computed get x(): number {
    return this.bar.notesX[this.index];
  }
  @computed get subNotesMarginLeft(): number[] {
    return this.subNotes.map((it) => it.preMarginLeft);
  }
  @computed get marginLeft(): number {
    return Math.max(...this.subNotesMarginLeft);
  }
  @computed get preMarginBottom(): number {
    let mb = 0;
    mb += this.l * this.config.pointGap;
    this.subNotes.forEach((it, idx) => {
      if (it.t < 0) {
        if (idx === 0) {
          let i = -it.t;
          for (; i > 0; --i) {
            let x = this.config.pointGap;
            mb += x;
          }
        }
      }
    });
    return mb;
  }
  @computed get marginBottom(): number {
    return this.bar.notesMaxMarginBottom;
  }
  @observable isSelect: boolean = false;
  constructor(o: INote, bar: Bar, idx: number) {
    this.config = bar.config;
    this.bar = bar;
    this.index = idx;
    this.decode(o);
  }
  setSelect(s: boolean) {
    this.isSelect = s;
  }
  reduceLine(l: number) {
    this.l += l;
    if (this.l < 0) {
      this.l = 0;
    }
  }
  reduceTailPoint(p: number) {
    this.p += p;
    if (this.p < 0) {
      this.p = 0;
    }
  }
  addSubNote(index: number) {
    this.subNotes.splice(
      index,
      0,
      new SubNote("0", this, this.subNotes.length, this.config)
    );
    this.subNotes.forEach((it, idx) => (it.index = idx));
  }
  removeSubNote(index: number) {
    this.subNotes = this.subNotes.filter((it, idx) => idx !== index);
    this.subNotes.forEach((it, idx) => (it.index = idx));
  }
  getThis() {
    return this;
  }
  decode(o: INote): void {
    if (o.n !== undefined) {
      let n: string = o.n;
      let pos = n.search("@");
      let ns = "";
      let ts = "";
      if (pos === -1) {
        ns = n;
        ts = "0|0";
      } else {
        ns = n.substr(0, pos);
        ts = n.substr(pos + 1);
      }
      let ng = ns.split("|");
      ng.forEach((it, idx) => {
        this.subNotes.push(new SubNote(it, this, idx, this.config));
      });
      let tg = ts.split("|");
      if (tg.length === 3) {
        this.l = parseInt(tg[0]);
        this.p = parseInt(tg[1]);
        this.d = parseInt(tg[2]);
      } else if (tg.length === 2) {
        this.l = parseInt(tg[0]);
        this.p = parseInt(tg[1]);
        this.d = 1;
      } else if (tg.length === 1) {
        this.l = parseInt(tg[0]);
        this.p = 0;
        this.d = 1;
      } else {
        this.l = 0;
        this.p = 0;
        this.d = 1;
      }
    }
  }
  code(): INote {
    let ns: string = "";
    this.subNotes.forEach((it, idx) => {
      if (idx + 1 >= this.subNotes.length) {
        ns += `${it.code()}`;
      } else {
        ns += `${it.code()}|`;
      }
    });
    let n = `${ns}@${this.l}|${this.p}|${this.d === 0 ? "" : this.d}`;
    return { n };
  }
}

const MuseNote: FC<{ note: Note }> = ({ note }) => {
  let clazz = "muse-note";
  return useObserver(() => (
    <g
      className={clazz}
      transform={"translate(" + note.x + "," + 0 + ")"}
      width={note.width}
      height={note.height}
      onClick={() => {
        Selector.instance.selectNote(note);
      }}
    >
      <OuterBorder
        w={note.width}
        h={note.height + note.marginBottom}
        clazz={clazz}
        show={note.isSelect || note.config.showBorder}
        color={"blue"}
      />
      {note.subNotes.map((it, idx) => (
        <MuseSubNote key={idx} subNote={it} />
      ))}
      <g className={clazz + "__tail-point"}>
        {note.tailPointsX.map((it, idx) => (
          <circle
            key={idx}
            r={note.config.pointRound}
            fill="black"
            transform={
              "translate(" +
              it +
              "," +
              (note.height - note.config.noteHeight / 3) +
              ")"
            }
          />
        ))}
      </g>
    </g>
  ));
};

export default MuseNote;
