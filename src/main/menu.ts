import { BrowserWindow, Menu, dialog, app, MenuItem } from "electron";
import { Translator } from "../shared/locales";
import { readFile } from "fs";

export const newFile = (mw: BrowserWindow) => {
  
};

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

export const createMenu = (mw: BrowserWindow, t: Translator) => {
  const menu = Menu.buildFromTemplate([
    {
      label: t("menu-file"),
      role: "fileMenu",
      submenu: [
        {
          label: t("menu-file-new"),
          accelerator: "Ctrl+N",
          click: () => newFile(mw),
        },
        { type: "separator" },
        {
          label: t("menu-file-open"),
          accelerator: "Ctrl+O",
          click: () => openFile(mw),
        },
        {
          label: t("menu-file-openrecent"),
          role: "recentDocuments",
          submenu: [
            {
              label: t("menu-file-clearrecent"),
              role: "clearRecentDocuments",
            },
          ],
        },
        { type: "separator" },
        {
          label: t("menu-file-save"),
          accelerator: "Ctrl+S",
          click: () => save(),
        },
        {
          label: t("menu-file-saveas"),
          accelerator: "Ctrl+Shift+S",
          click: () => saveAs(),
        },
        {
          label: t("menu-file-autosave"),
          type: "checkbox",
          checked: false,
        },
        { type: "separator" },
        {
          label: t("menu-file-exit"),
          accelerator: "Ctrl+Q",
          role: "quit",
        },
      ],
      checked: false,
      click: () => {},
    },
    {
      label: t("menu-help"),
      submenu: [
        {
          label: t("menu-help-toggledevtools"),
          accelerator: "Ctrl+Shift+I",
          role: "toggleDevTools",
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
};
