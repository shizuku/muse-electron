import { app, BrowserWindow, Menu } from "electron";
import { getTranslator } from "../shared/locales";
import { createActions } from "./actions";
import { createWindow } from "./window";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

app.on("ready", () => {
  let mw = createWindow();
  let t = getTranslator(app.getLocale());
  mw.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  createActions(mw);
  Menu.setApplicationMenu(null);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
