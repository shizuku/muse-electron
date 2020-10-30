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
  @observable mark: string = "";
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
  @computed get group(): number[][] {
    let r: number[][] = [];
    let l = this.pages.length;
    if (this.config.twopage) {
      for (let i = 0; i < l; i += 2) {
        let s: number[] = [];
        for (let j = i; j < l && j <= i + 1; ++j) {
          s.push(j);
        }
        r.push(s);
      }
    } else {
      for (let i = 0; i < l; ++i) {
        r.push([i]);
      }
    }
    return r;
  }
  @computed get groupWidth(): number {
    if (this.config.twopage && this.pages.length > 1) {
      return this.config.pageWidth * 2 + this.config.pageGap * 2;
    } else return this.config.pageWidth + this.config.pageGap * 2;
  }
  @computed get groupHeight(): number {
    return this.config.pageHeight + this.config.pageGap * 2;
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
      this.pages.length = 0;
      o.pages.forEach((it: IPage, idx) => {
        this.pages.push(new Page(it, idx, this, this.config));
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
      this.info.mark = o.C;
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
      C: this.info.mark,
      pages,
    };
  }
}

export interface MuseNotationProps {
  notation: Notation;
}

const MuseNotation: FC<MuseNotationProps> = ({ notation }) => {
  let clazz = "muse-notation";
  let state = useAppState();
  return useObserver(() => (
    <div className={clazz}>
      {notation.group.map((ar, idx) => (
        <div
          className="line"
          key={idx}
          style={{
            width: notation.groupWidth,
            height: notation.groupHeight,
            display: "flex",
          }}
        >
          {ar.map((it, idx) => (
            <MusePage
              key={it}
              page={notation.pages[it]}
              c={[it]}
              sl={state.sl}
            />
          ))}
        </div>
      ))}
    </div>
  ));
};

export default MuseNotation;
