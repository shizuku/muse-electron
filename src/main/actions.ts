import { app, BrowserWindow, dialog, ipcMain, nativeTheme } from "electron";
import { readFile, writeFile } from "fs";
import { generateScreenshot, getImageArrayBuffer } from "../shared/utils";

const noTitle = "No title";
const newFileContent = `{"title":"${noTitle}","subtitle":"","author":"","rhythmic":"","speed":"","C":"C","pages":[{"lines":[{"tracks":[{"bars":[{"notes":[{"n":"0@0|0"}]}]}]}]}]}`;

export function createActions(mw: BrowserWindow) {
  ipcMain.on("get-locale", (e) => {
    e.reply("get-locale-reply", app.getLocale());
  });
  ipcMain.on("get-dark-light", (e) => {
    e.reply(
      "get-dark-light-reply",
      nativeTheme.shouldUseDarkColors ? "dark" : "light"
    );
  });
  ipcMain.on("new-file", (event, type) => {
    let p = "";
    event.reply("new-file-reply", p, newFileContent);
  });
  ipcMain.on("open-file", (event, path) => {
    const read = (p: string) => {
      readFile(p, (err, data) => {
        if (!err) {
          app.addRecentDocument(p);
          event.reply("open-file-reply", p, data.toString());
        }
      });
    };
    if (!path || path === "") {
      dialog
        .showOpenDialog({
          properties: ["openFile"],
          filters: [{ name: "Notation", extensions: ["json", "muse"] }],
        })
        .then((v) => {
          if (!v.canceled) {
            read(v.filePaths[0]);
          }
        });
    } else {
      read(path);
    }
  });
  ipcMain.on("save", (event, path, data) => {
    writeFile(path, data, () => {
      event.reply("save-reply", "success");
    });
  });
  ipcMain.on("save-as", (event, path, data) => {
    dialog.showSaveDialog({}).then((v) => {
      if (v.canceled) {
        event.reply("save-as-reply", "canceled");
        return;
      }
      if (v.filePath) {
        writeFile(v.filePath, data, () => {
          event.reply("save-as-reply", "success");
          return;
        });
      }
    });
  });
  ipcMain.on("toggle-dev-tools", () => {
    mw.webContents.toggleDevTools();
  });
  ipcMain.on("app-close", () => {
    mw.close();
  });
  ipcMain.on("app-minimize", () => {
    if (mw.isMinimizable()) mw.minimize();
  });
  ipcMain.on("app-toggle-max", () => {
    if (mw.isMaximizable()) {
      mw.isMaximized() ? mw.unmaximize() : mw.maximize();
    }
    mw.webContents.send("max-status", mw.isMaximized());
  });
  ipcMain.on("app-toggle-full-screen", () => {
    mw.setFullScreen(!mw.fullScreen);
    mw.webContents.send("full-screen-status", mw.fullScreen);
  });
  ipcMain.on("export-data", (e, path, s, idx) => {
    console.log("export-data", path);
    writeFile(path, Buffer.from(s), "binary", () => {
      e.reply("export-data-reply", "success", idx);
    });
  });
}
