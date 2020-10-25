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

export interface Theme {
  colorText: string;
  colorTextLight: string;
  colorTextDark: string;
  colorBackground: string;
  colorBackgroundDark: string;
  colorBackgroundLight: string;
  colorPrimary: string;
  colorPrimaryLight: string;
  colorPrimaryDark: string;
  colorSuccess: string;
  colorWarning: string;
  colorDanger: string;
}

export const lightTheme: Theme = {
  colorText: "#111111",
  colorTextLight: "#FFFFFF",
  colorTextDark: "#000000",
  colorBackground: "#F7F7F7",
  colorBackgroundDark: "#F0F0F0",
  colorBackgroundLight: "#FFFFFF",
  colorPrimary: "#20A0FF",
  colorPrimaryLight: "#58B7FF",
  colorPrimaryDark: "#1D8CE0",
  colorSuccess: "#13CE66",
  colorWarning: "#F7BA2A",
  colorDanger: "#FF4949",
};

export const darkTheme: Theme = {
  colorText: "#999999",
  colorTextLight: "#666666",
  colorTextDark: "#444444",
  colorBackground: "#222222",
  colorBackgroundDark: "#111111",
  colorBackgroundLight: "#333333",
  colorPrimary: "#111111",
  colorPrimaryLight: "#222222",
  colorPrimaryDark: "#000000",
  colorSuccess: "#13CE66",
  colorWarning: "#F7BA2A",
  colorDanger: "#FF4949",
};

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
  onExport: () => void;
  onClose: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onEditMetaData: () => void;
  onSetVertical: () => void;
  onSetHorizontal: () => void;
  onExit: () => void;
  onAbout: () => void;
  onSettings: () => void;
  onSetLanguage: (code: string) => void;
  onSetTheme: (t: string) => void;
}

//full: show all element,
//headfoot: only show header, footer and content
//content: only show content
export type DisplayStyle = "full" | "headfoot" | "content";

export class AppState {
  constructor() {
    this.langCode = "en-US";
    this.langConf = "auto";
    this.appLoading = false;
    this.showEditMetaModel = false;
    this.showAboutModel = false;
    this.showSettings = false;
    this.showExport = false;
    this.exportConfirm = false;
    this.exportNum = 0;
    this.config = new MuseConfig();
    this.theme = lightTheme;
    this.themeConf = "auto";
    this.themeCode = "light";
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
  @observable langCode: string; //en|zh
  @observable langConf: string; //auto|zh|en
  @observable appLoading: boolean;
  @observable showEditMetaModel: boolean;
  @observable showAboutModel: boolean;
  @observable showSettings: boolean;
  @observable showExport: boolean;
  @observable exportConfirm: boolean;
  @observable exportNum: number;
  @observable config: MuseConfig;
  @observable theme: Theme;
  @observable themeConf: string; //auto|light|dark
  @observable themeCode: string; //light|dark
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
  @observable undoStack: string[] = [];
  @observable redoStack: string[] = [];
  @computed get undoDisable(): boolean {
    return this.undoStack.length === 0;
  }
  @computed get redoDisable(): boolean {
    return this.redoStack.length === 0;
  }
  @observable modified: boolean;
  @computed get fileName() {
    return getFileName(this.currentFile?.path || "");
  }
  @observable autoSave: boolean;
  @observable currentFile?: FileInfo;
  @observable notation?: Notation;
  @computed get data(): string {
    return JSON.stringify(this.notation?.code());
  }
  set data(d: string) {
    this.notation?.decode(JSON.parse(d));
    //this.notation = new Notation(JSON.parse(d), this.config);
  }
  @observable isNew: boolean;
  @observable r?: HTMLElement;
  @observable rs: HTMLElement[] = [];
  @action open(path: string, data: string, isNew: boolean) {
    this.opened = true;
    this.modified = false;
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
    this.rs = [];
  }
  @action close() {
    this.notation = undefined;
    this.opened = false;
    this.currentFile = undefined;
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
  @action changeTheme(t: string) {
    if (t !== "auto") {
      this.themeConf = t;
      this.themeCode = t;
      this.theme = this.themeCode === "light" ? lightTheme : darkTheme;
    }
  }
  // @action changeLang(l: string) {
  //   if (l !== "auto") {
  //     this.langConf = l;
  //     this.langCode = l;
  //   }
  // }
}

export function useAppState(): AppState {
  return useContext(MobXProviderContext).state;
}
