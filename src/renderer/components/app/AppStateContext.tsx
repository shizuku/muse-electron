import { action, computed, observable } from "mobx";
import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { MuseConfig, Notation } from "../muse-notation";

export interface FileInfo {
  path: string;
  time: number;
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

export class WindowDim {
  constructor() {}
  @observable wh: number = 0;
  @observable ww: number = 0;
  @observable x: number = 0;
  @observable y: number = 0;
  @observable header: number = 0;
  @observable footer: number = 0;
  @observable toolbar: number = 0;
  //target
  @computed get contentH(): number {
    return this.wh - this.header - this.toolbar - this.footer;
  }
  @observable contentW: number = 0;
  //current
  @observable notationH: number = 0;
  @observable notationW: number = 0;
}

export interface Events {
  onSave: () => void;
  onSaveAs: () => void;
  onPrint: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onClose: () => void;
}

//full: show all element,
//headfoot: only show header, footer and content
//content: only show content
export type DisplayStyle = "full" | "headfoot" | "content";

export class AppState {
  constructor() {
    this.config = new MuseConfig();
    this.theme = new Theme();
    this.opened = false;
    this.display = "full";
    this.headerHover = false;
    this.footerHover = false;
    this.fullScreenStatus = false;
    this.maxStatus = false;
    this.windowDim = new WindowDim();
    this.recents = [];
    this.isNew = false;
    this.modified = false;
    this.fileName = "";
    this.filePath = "";
    this.notation = undefined;
  }
  //all
  @observable config: MuseConfig;
  @observable theme: Theme;
  @observable windowDim: WindowDim;
  @observable opened: boolean;
  @observable events?: Events;
  @observable display: DisplayStyle;
  @observable headerHover: boolean;
  @observable footerHover: boolean;
  @observable fullScreenStatus: boolean;
  @observable maxStatus: boolean;
  //unopened
  @observable recents: FileInfo[];
  //opened
  @observable modified: boolean;
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
    isNew: boolean
  ) {
    this.opened = true;
    this.fileName = fileName;
    this.filePath = filePath;
    this.notation = new Notation(JSON.parse(data), this.config);
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

export function useAppState(): AppState {
  return useContext(MobXProviderContext).state;
}
