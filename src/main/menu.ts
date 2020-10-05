import { newFile, openFile, save, saveAs } from "./actions";
import { BrowserWindow, Menu } from "electron";
import { Translator } from "../shared/locales";

export const createMenu = (mw: BrowserWindow, t: Translator) => {
  const template = [
    {
      label: t("menu-file"),
      role: "fileMenu",
      submenu: [
        {
          label: t("menu-file-new"),
          accelerator: "Ctrl+N",
          click: () => newFile(),
        },
        { type: "separator" },
        {
          label: t("menu-file-open"),
          accelerator: "Ctrl+O",
          click: () => openFile(mw),
        },
        {
          label: t("menu-file-openrecent"),
          role: "recentdocuments",
          submenu: [
            {
              label: t("menu-file-clearrecent"),
              role: "clearrecentdocuments",
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
    },
    {
      label: t("menu-help"),
      submenu: [
        {
          label: t("menu-help-toggledevtools"),
          accelerator: "Ctrl+Shift+I",
          role: "toggledevtools",
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
