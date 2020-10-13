import { action, computed, observable } from "mobx";
import { createContext } from "react";
import { MuseConfig, Notation } from "./components/muse-notation";

export interface FileInfo {
  path: string;
  time: number;
}

export class Config {
  @observable pageWidth: number = 0;
  constructor() {}
}

export class Theme {
  constructor() {
    this.colorBackground = "#FFFFFF";
    this.colorPrimary = "#20A0FF";
    this.colorPrimaryLight = "#58B7FF";
    this.colorPrimaryDark = "#1D8CE0";
    this.colorSuccess = "#13CE66";
    this.colorWarning = "#F7BA2A";
    this.colorDanger = "#FF4949";
  }
  @observable colorBackground: string;
  @observable colorPrimary: string;
  @observable colorPrimaryLight: string;
  @observable colorPrimaryDark: string;
  @observable colorSuccess: string;
  @observable colorWarning: string;
  @observable colorDanger: string;
}

export class Heights {
  constructor() {}
  @observable wh: number = 0;
  @observable header: number = 0;
  @observable toolbar: number = 0;
  @computed get content(): number {
    return this.wh - this.header - this.toolbar - this.footer;
  }
  @observable footer: number = 0;
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
  @observable config: Config;
  @observable theme: Theme;
  @observable heights: Heights;
  @observable opened: boolean;
  @observable events?: Events;
  //unopened
  @observable recents: FileInfo[];
  //opened
  @observable fileName: string;
  @observable filePath: string;
  @observable notation?: Notation;
  @computed get data(): string {
    return JSON.stringify(this.notation?.code());
  }
  isNew: boolean;
  @action open(
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
  @action close() {
    this.notation = undefined;
    this.opened = false;
  }
  @action loadRecents(recents: FileInfo[]) {
    this.recents = recents;
  }
}

export const AppStateContext = createContext<AppState>(new AppState());
