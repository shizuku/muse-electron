import { ipcRenderer } from "electron";
import { action, computed, observable } from "mobx";
import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { parse } from "path";
import { MuseConfig, Notation } from "../components/muse-notation";
import Selector from "../components/muse-notation/Selector";
import { loadConfigs, saveConfig } from "../../shared/store";
import i18n from "../../shared/locales";

export interface RecentFile {
  path: string;
  time: number;
  size: number;
  twopage: boolean;
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
  @observable recents: RecentFile[] = [];
  @observable sortRectentBy: "time-etl" | "time-lte" = "time-lte";
  @computed get sortedRecents(): RecentFile[] {
    const cbs = {
      "time-etl": (a: RecentFile, b: RecentFile) => a.time - b.time,
      "time-lte": (a: RecentFile, b: RecentFile) => b.time - a.time,
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
  @computed get fileName(): string {
    if (this.isNew) return "No title";
    else return parse(this.currentFile?.path || "").name;
  }
  @observable autoSave: boolean = false;
  @observable exportScale: number = 1;
  @observable currentFile?: RecentFile;
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
  @observable pages: HTMLElement[] = [];
  @action open(path: string, data: string, isNew: boolean) {
    this.opened = true;
    this.modified = false;
    this.notation = new Notation(JSON.parse(data), this.config);
    this.sl = new Selector(
      this.notation,
      () => this.beforeModify(),
      () => this.afterModify()
    );
    this.isNew = isNew;
    this.currentFile = this.addRecentFile(
      {
        path,
        time: Date.now(),
        size: 1,
        twopage: true,
      },
      false
    );
    this.pages = [];
    this.undoStack = [];
    this.redoStack = [];
    this.config.twopage = this.currentFile?.twopage || true;
    this.config.x = this.currentFile?.size || 1;
  }
  @action close() {
    this.opened = false;
    this.modified = false;
    this.notation = undefined;
    this.sl = undefined;
    this.isNew = false;
    this.currentFile = undefined;
    this.pages = [];
    this.undoStack = [];
    this.redoStack = [];
  }
  @action loadRecents(recents: RecentFile[]) {
    this.recents = recents;
  }
  @action addRecentFile(
    f: RecentFile,
    updateTime: boolean
  ): RecentFile | undefined {
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
  @action changeLang(conf: string, code: string) {
    this.langConf = conf;
    this.langCode = code;
    i18n.changeLanguage(this.langCode);
    saveConfig("language", conf);
  }
  @action changeTheme(conf: string, code: string) {
    this.themeConf = conf;
    this.themeCode = code;
    this.theme = this.themeCode === "light" ? lightTheme : darkTheme;
    saveConfig("theme", conf);
  }
  @action saveFileConfig() {
    if (this.currentFile) this.addRecentFile(this.currentFile, true);
    saveConfig("recent-files", this.recents);
  }
  @action onSetDisplay(s: DisplayStyle) {
    this.display = s;
    saveConfig("display", this.display);
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
    saveConfig("auto-save", this.autoSave);
  }
  @action onSetSizer(x: number) {
    this.config.x = x;
    if (this.currentFile) this.currentFile.size = x;
    this.saveFileConfig();
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
    this.config.twopage = true;
    if (this.currentFile) this.currentFile.twopage = true;
    this.saveFileConfig();
  }
  @action onSetOnePage() {
    this.config.twopage = false;
    if (this.currentFile) this.currentFile.twopage = false;
    this.saveFileConfig();
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
  @action onSetLanguage(conf: string) {
    if (conf !== "auto") {
      this.changeLang(conf, conf);
    } else {
      this.langConf = conf;
      ipcRenderer.send("get-locale");
    }
  }
  @action onSetTheme(conf: string) {
    if (conf !== "auto") {
      this.changeTheme(conf, conf);
    } else {
      ipcRenderer.send("get-dark-light");
    }
  }
  @action onSetExportScale(s: number) {
    this.exportScale = s;
    saveConfig("export-scale", s);
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
  }
  @action afterModify() {
    if (this.autoSave && !this.isNew) {
      this.onSave();
    }
  }
  @action onClearRecent() {
    this.recents = [];
    this.saveFileConfig();
  }
  @action readConfigs() {
    let c = loadConfigs();
    this.loadRecents(c.recents);
    this.autoSave = c.autoSave;
    this.display = c.display;
    this.exportScale = c.exportScale;
    this.langConf = c.language;
    if (c.language !== "auto") this.langCode = c.language;
    this.themeConf = c.theme;
    if (c.theme !== "auto") this.themeCode = c.theme;
  }
}

export function useAppState(): AppState {
  return useContext(MobXProviderContext).state;
}
