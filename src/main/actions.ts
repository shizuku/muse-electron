import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { readFile } from "fs";

export function createActions(mw: BrowserWindow) {
  ipcMain.on("new-file", () => {});
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
  ipcMain.on("toggle-dev-tools", () => {
    mw.webContents.toggleDevTools();
  });
}
