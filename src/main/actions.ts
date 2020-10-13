import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { readFile, writeFile } from "fs";

const noTitle = "No title";
const newFileContent = `{"title":"${noTitle}","subtitle":"","author":"","rhythmic":"","speed":"","C":"C","pages":[{"lines":[{"tracks":[{"bars":[{"notes":[{"n":"0@0|0"}]}]}]}]}]}`;

export function createActions(mw: BrowserWindow) {
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
}
