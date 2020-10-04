import { app, BrowserWindow, ipcMain, dialog, Menu, MenuItem } from "electron";
import { readFile } from "fs";
import { strings } from "../shared/resource";
import { translate } from "../shared/translate";

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let t: (key: string) => string;
const loadTranslate = () => {
  console.log(app.getLocale());
  t = translate(app.getLocale(), strings);
};

const createMenu = () => {
  const newFile = () => {};
  const openFileDialog = () => {
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
  const save = () => {};
  const saveAs = () => {};
  const template = [
    {
      label: t("menuFile"),
      role: "fileMenu",
      submenu: [
        {
          label: t("menuFileNew"),
          accelerator: "Ctrl+N",
          click: () => newFile(),
        },
        { type: "separator" },
        {
          label: t("menuFileOpen"),
          accelerator: "Ctrl+O",
          click: () => openFileDialog(),
        },
        {
          label: t("menuFileOpenrecent"),
          role: "recentdocuments",
          submenu: [
            {
              label: t("menuFileOpenrecentClear"),
              role: "clearrecentdocuments",
            },
          ],
        },
        { type: "separator" },
        {
          label: t("menuFileSave"),
          accelerator: "Ctrl+S",
          click: () => save(),
        },
        {
          label: t("menuFileSaveas"),
          accelerator: "Ctrl+Shift+S",
          click: () => saveAs(),
        },
        {
          label: t("menuFileAutosave"),
          type: "checkbox",
          checked: false,
        },
        { type: "separator" },
        {
          label: t("menuFileExit"),
          accelerator: "Ctrl+Q",
          role: "quit",
        },
      ],
    },
    {
      label: t("menuHelp"),
      submenu: [
        {
          label: t("menuHelpToggledevtools"),
          accelerator: "Ctrl+Shift+I",
          role: "toggledevtools",
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

let mw: BrowserWindow;
const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mw = mainWindow;
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  mainWindow.webContents.send("set-locale", app.getLocale());
};

const onready = () => {
  loadTranslate();
  createMenu();
  createWindow();
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", onready);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
