import { dialog, app, BrowserWindow } from "electron";
import { readFile } from "fs";

export const newFile = () => {};

export const openFile = (mw: BrowserWindow) => {
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
            mw.webContents.send("open-file", data.toString());
          }
        });
      }
    });
};

export const save = () => {};

export const saveAs = () => {};
