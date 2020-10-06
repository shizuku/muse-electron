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
            let l = v.filePaths[0].split("/");
            let fileName = l[l.length - 1];
            mw.webContents.send("open-file-reply", {
              fileName: fileName,
              content: data.toString(),
            });
          }
        });
      }
    });
};

export const save = () => {};

export const saveAs = () => {};
