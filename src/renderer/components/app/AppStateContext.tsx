import { action, computed, observable } from "mobx";
import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { getFileName } from "../../../shared/utils";
import { MuseConfig, Notation } from "../muse-notation";

export interface FileInfo {
  path: string;
  time: number;
  size: number;
  line: number;
  vertical: boolean;
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
  onSetDisplay: (s: DisplayStyle) => void;
  onSave: () => void;
  onSaveAs: () => void;
  onAutoSave: () => void;
  onSetSizer: (x: number) => void;
  onSetLiner: (l: number) => void;
  onPrint: () => void;
  onExport: () => void;
  onClose: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onEditMetaData: () => void;
  onSetV: () => void;
  onSetH: () => void;
  onExit: () => void;
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
    this.autoSave = false;
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
  @computed get fileName() {
    return getFileName(this.currentFile?.path || "New File.muse");
  }
  @observable autoSave: boolean;
  @observable currentFile?: FileInfo;
  @observable notation?: Notation;
  @computed get data(): string {
    return JSON.stringify(this.notation?.code());
  }
  isNew: boolean;
  @action open(path: string, data: string, isNew: boolean) {
    this.opened = true;
    this.notation = new Notation(JSON.parse(data), this.config);
    this.isNew = isNew;
    this.currentFile = this.addRecentFile({
      path,
      time: Date.now(),
      line: 1,
      size: 1,
      vertical: true,
    });
    this.config.vertical = this.currentFile?.vertical || true;
    this.config.pagePerLine = this.currentFile?.line || 1;
    this.config.x = this.currentFile?.size || 1;
  }
  @action close() {
    this.notation = undefined;
    this.opened = false;
  }
  @action loadRecents(recents: FileInfo[]) {
    this.recents = recents;
  }
  @action addRecentFile(f?: FileInfo): FileInfo | undefined {
    if (f) {
      for (let i = 0; i < this.recents.length; ++i) {
        if (this.recents[i].path === f.path) {
          this.recents[i].time = f.time;
          this.recents.slice().sort((a, b) => b.time - a.time);
          return this.recents[i];
        }
      }
      this.recents.push(f);
      this.recents.slice().sort((a, b) => b.time - a.time);
      return f;
    } else return undefined;
  }
  @action removeFile(path: string) {
    this.recents.filter((it) => it.path !== path);
  }
}

export function useAppState(): AppState {
  return useContext(MobXProviderContext).state;
}
