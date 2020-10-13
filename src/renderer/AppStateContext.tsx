import { computed, makeObservable, observable } from "mobx";
import { createContext } from "react";
import { MuseConfig, Notation } from "./components/muse-notation";

export interface FileInfo {
  path: string;
  time: number;
}

export class Config {
  constructor() {
    makeObservable(this);
  }
}

export class Theme {
  constructor() {
    makeObservable(this);
    this.colorBackground = "#FFFFFF";
    this.colorPrimary = "#20A0FF";
    this.colorPrimaryLight = "#58B7FF";
    this.colorPrimaryDark = "#1D8CE0";
    this.colorSuccess = "#13CE66";
    this.colorWarning = "#F7BA2A";
    this.colorDanger = "#FF4949";
  }
  colorBackground: string;
  colorPrimary: string;
  colorPrimaryLight: string;
  colorPrimaryDark: string;
  colorSuccess: string;
  colorWarning: string;
  colorDanger: string;
}

export class Heights {
  constructor() {
    makeObservable(this, {
      wh: observable,
      header: observable,
      toolbar: observable,
      content: computed,
      footer: observable,
    });
  }
  wh: number = 0;
  header: number = 0;
  toolbar: number = 0;
  get content(): number {
    return this.wh - this.header - this.toolbar - this.footer;
  }
  footer: number = 0;
}

export interface Events {
  onSave: () => void;
  onSaveAs: () => void;
  onPrint: () => void;
  onUndo: () => void;
  onRedo: () => void;
}

export class AppState {
  constructor() {
    makeObservable(this, {
      heights: observable,
      opened: observable,
      recents: observable,
      notation: observable,
      data: computed,
      isNew: observable,
    });
    this.config = new Config();
    this.theme = new Theme();
    this.opened = false;
    this.heights = new Heights();
    this.recents = [];
    this.isNew = false;
    this.fileName = "";
    this.filePath = "";
    this.notation = undefined;
  }
  //all
  config: Config;
  theme: Theme;
  heights: Heights;
  opened: boolean;
  events?: Events;
  //unopened
  recents: FileInfo[];
  //opened
  fileName: string;
  filePath: string;
  notation?: Notation;
  get data(): string {
    return JSON.stringify(this.notation?.code());
  }
  isNew: boolean;
  open(
    fileName: string,
    filePath: string,
    data: string,
    config: MuseConfig,
    isNew: boolean
  ) {
    this.opened = true;
    this.fileName = fileName;
    this.filePath = filePath;
    this.notation = new Notation(JSON.parse(data), config);
    this.isNew = isNew;
  }
  close() {
    this.notation = undefined;
    this.opened = false;
  }
  loadRecents(recents: FileInfo[]) {
    this.recents = recents;
  }
}

export const AppStateContext = createContext<AppState>(new AppState());
