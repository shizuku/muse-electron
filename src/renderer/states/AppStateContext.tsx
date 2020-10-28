import { ipcRenderer } from "electron";
import { action, computed, observable } from "mobx";
import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { getFileName } from "../../shared/utils";
import { MuseConfig, Notation } from "../components/muse-notation";
import Selector from "../components/muse-notation/Selector";

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

//full: show all element,
//headfoot: only show header, footer and content
//content: only show content
export type DisplayStyle = "full" | "headfoot" | "content";

export interface Op {
  s: string;
  c: number[];
}

export class AppState {
  //modals
  @observable appLoading: boolean = false;
  @observable showEditMetaModel: boolean = false;
  @observable showAboutModel: boolean = false;
  @observable showSettings: boolean = false;
  @observable showExport: boolean = false;
  @observable exportConfirm: boolean = false;
  @observable exportNum: number = 0;
  @observable showSureClose: boolean = false;
  @observable toExit: boolean = false;
  //config
  @observable config: MuseConfig = new MuseConfig();
  @observable langCode: string = "en-US"; //en|zh
  @observable langConf: string = "auto"; //auto|zh|en
  @observable theme: Theme = lightTheme;
  @observable themeConf: string = "auto"; //auto|light|dark
  @observable themeCode: string = "light"; //light|dark
  @observable windowDim: WindowDim = new WindowDim();
  //state
  @observable opened: boolean = false;
  @observable modified: boolean = false;
  @observable display: DisplayStyle = "full";
  @observable headerHover: boolean = false;
  @observable footerHover: boolean = false;
  @observable fullScreenStatus: boolean = false;
  @observable maxStatus: boolean = false;
  //unopened
  @observable recents: FileInfo[] = [];
  @observable sortRectentBy: "time-etl" | "time-lte" = "time-lte";
  @computed get sortedRecents(): FileInfo[] {
    const cbs = {
      "time-etl": (a: FileInfo, b: FileInfo) => a.time - b.time,
      "time-lte": (a: FileInfo, b: FileInfo) => b.time - a.time,
    };
    return this.recents.sort(cbs[this.sortRectentBy]);
  }
  //opened
  @observable undoStack: Op[] = [];
  @observable redoStack: Op[] = [];
  @computed get undoDisable(): boolean {
    return this.undoStack.length === 0;
  }
  @computed get redoDisable(): boolean {
    return this.redoStack.length === 0;
  }
  @computed get fileName() {
    if (this.isNew) return "No title";
    else return getFileName(this.currentFile?.path || "");
  }
  @observable autoSave: boolean = false;
  @observable currentFile?: FileInfo;
  @observable sl?: Selector = undefined;
  @observable notation?: Notation;
  @computed get data(): string {
    return JSON.stringify(this.notation?.code());
  }
  set data(d: string) {
    this.notation?.decode(JSON.parse(d));
    //this.notation = new Notation(JSON.parse(d), this.config);
  }
  @observable isNew: boolean = false;
  @observable rs: HTMLElement[] = [];
  @action open(path: string, data: string, isNew: boolean) {
    this.opened = true;
    this.modified = false;
    this.notation = new Notation(JSON.parse(data), this.config);
    this.sl = new Selector(this.notation, () => this.beforeModify());
    this.isNew = isNew;
    this.currentFile = this.addRecentFile(
      {
        path,
        time: Date.now(),
        line: 1,
        size: 1,
        vertical: true,
      },
      false
    );
    this.rs = [];
    this.undoStack = [];
    this.redoStack = [];
    this.config.vertical = this.currentFile?.vertical || true;
    this.config.pagePerLine = this.currentFile?.line || 1;
    this.config.x = this.currentFile?.size || 1;
  }
  @action close() {
    this.opened = false;
    this.modified = false;
    this.notation = undefined;
    this.sl = undefined;
    this.isNew = false;
    this.currentFile = undefined;
    this.rs = [];
    this.undoStack = [];
    this.redoStack = [];
  }
  @action loadRecents(recents: FileInfo[]) {
    this.recents = recents;
  }
  @action addRecentFile(
    f: FileInfo,
    updateTime: boolean
  ): FileInfo | undefined {
    if (f.path === "") return f;
    for (let i = 0; i < this.recents.length; ++i) {
      if (this.recents[i].path === f.path) {
        if (updateTime) this.recents[i].time = f.time;
        return this.recents[i];
      }
    }
    this.recents.push(f);
    return f;
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

  @action onSetDisplay(s: DisplayStyle) {
    this.display = s;
    //saveConfig("display", this.display);
  }
  @action onNew() {
    if (!this.opened) {
      ipcRenderer.send("new-file");
    }
  }
  @action onOpen() {
    if (!this.opened) {
      ipcRenderer.send("open-file");
    }
  }
  @action onSave(cb?: (result: string) => void) {
    if (this.modified) {
      if (this.isNew) {
        this.onSaveAs(cb);
      } else {
        ipcRenderer.once("save-reply", (ev, result) => {
          if (result === "success") {
            console.log("save success");
            this.modified = false;
          }
          if (cb) cb(result);
        });
        ipcRenderer.send("save", this.currentFile?.path, this.data);
      }
    }
  }
  @action onSaveAs(cb?: (result: string) => void) {
    ipcRenderer.once("save-as-reply", (ev, result, newPath: string) => {
      if (result === "success") {
        console.log("save as success");
        this.modified = false;
        if (this.isNew) {
          if (this.currentFile) this.currentFile.path = newPath;
          this.isNew = false;
        }
      }
      if (cb) cb(result);
    });
    ipcRenderer.send("save-as", this.currentFile?.path, this.data);
  }
  @action onAutoSave() {
    this.autoSave = !this.autoSave;
  }
  @action onSetSizer(x: number) {
    this.config.x = x;
    if (this.currentFile) this.currentFile.size = x;
    //saveFileConfig();
  }
  @action onSetLiner(x: number) {
    this.config.pagePerLine = x;
    if (this.currentFile) this.currentFile.line = x;
    //saveFileConfig();
  }
  @action onExport() {
    this.showExport = true;
  }
  @action onClose() {
    if (this.modified) {
      this.toExit = false;
      this.showSureClose = true;
    } else {
      this.close();
    }
  }
  @action onUndo() {
    if (!this.undoDisable) {
      console.log("undo");
      let x = this.data;
      if (x && this.sl && this.sl.c)
        this.redoStack.push({
          s: JSON.stringify(this.notation?.code()),
          c: this.sl.c,
        });
      let p = this.undoStack.pop();
      if (p) {
        this.data = p.s;
        this.sl?.select(p.c);
      }
    }
  }
  @action onRedo() {
    if (!this.redoDisable) {
      console.log("redo");
      let p = this.redoStack.pop();
      if (p) {
        this.data = p.s;
        this.sl?.select(p.c);
        this.undoStack.push(p);
      }
    }
  }
  @action onEditMetaData() {
    this.showEditMetaModel = true;
  }
  @action onSetTwoPage() {
    this.config.vertical = false;
    if (this.currentFile) this.currentFile.vertical = false;
    //saveFileConfig();
  }
  @action onSetOnePage() {
    this.config.vertical = true;
    if (this.currentFile) this.currentFile.vertical = true;
    // saveFileConfig();
  }
  @action onExit() {
    if (this.modified) {
      this.toExit = true;
      this.showSureClose = true;
    } else {
      ipcRenderer.send("app-close");
    }
  }
  @action onAbout() {
    this.showAboutModel = true;
  }
  @action onSettings() {
    this.showSettings = true;
  }
  @action onSetLanguage(code: string) {
    if (code !== "auto") {
      this.langConf = code;
      this.langCode = code;
      //i18n.changeLanguage(code);
    } else {
      this.langConf = code;
      ipcRenderer.send("get-locale");
    }
    //saveConfig("language", code);
  }
  @action onSetTheme(t: string) {
    if (t !== "auto") {
      this.themeConf = t;
      this.themeCode = t;
    } else {
      this.themeConf = t;
      ipcRenderer.send("get-dark-light");
    }
    //saveConfig("theme", t);
  }
  @action beforeModify() {
    console.log("before modify");
    if (this.currentFile) this.currentFile.time = Date.now();
    if (this.sl && this.sl.c)
      this.undoStack.push({
        s: JSON.stringify(this.notation?.code()),
        c: this.sl.c,
      });
    this.redoStack.length = 0;
    this.modified = true;
    if (this.autoSave && !this.isNew) {
      this.onSave();
    }
  }
  @action onClearRecent() {
    this.recents = [];
    //saveFileConfig();
  }
}

export function useAppState(): AppState {
  return useContext(MobXProviderContext).state;
}
