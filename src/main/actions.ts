import { app, dialog, ipcMain } from "electron";
import { readFile } from "fs";

export function createActions() {
  ipcMain.on("new-file", () => {});
  ipcMain.on("open-file", (event) => {
    dialog
      .showOpenDialog({
        properties: ["openFile"],
        filters: [{ name: "Notation", extensions: ["json"] }],
      })
      .then((v) => {
        if (!v.canceled) {
          readFile(v.filePaths[0], (err, data) => {
            if (!err) {
              app.addRecentDocument(v.filePaths[0]);
              event.reply("open-file-reply", v.filePaths[0], data.toString());
            }
          });
        }
      });
  });
}
