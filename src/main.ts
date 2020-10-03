import { app, BrowserWindow, ipcMain, dialog, Menu, MenuItem } from "electron";
import { readFile } from "fs";

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

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
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

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
ipcMain.on("open-file", (event, arg) => {
  dialog
    .showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "Notation", extensions: ["json"] }],
    })
    .then((v) => {
      if (v.canceled) {
        event.reply("open-file-reply", "");
      } else {
        readFile(v.filePaths[0], (err, data) => {
          if (err) {
            event.reply("open-file-reply", "");
          } else {
            event.reply("open-file-reply", data.toString());
          }
        });
      }
    });
});

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
            mw.webContents.send("open-file-reply", data.toString());
          }
        });
      }
    });
};
const save = () => {};

const template = [
  {
    label: "&File",
    role:"fileMenu",
    submenu: [
      {
        label: "&New File",
        accelerator: "Ctrl+N",
        click: () => newFile(),
      },
      { type: "separator" },
      {
        label: "&Open",
        accelerator: "Ctrl+O",
        click: () => openFileDialog(),
      },
      { type: "separator" },
      {
        label: "&Save",
        accelerator: "Ctrl+S",
        click: () => save(),
      },
      {
        label: "A&uto Save",
        type: "checkbox",
        checked: false,
      },
      { type: "separator" },
      {
        label: "&Exit",
        accelerator: "Ctrl+Q",
        role: "quit",
      },
    ],
  },
  {
    label: "Help",
    submenu: [
      {
        label: "Toggle Develop Tools",
        accelerator: "Ctrl+Shift+I",
        role: "toggledevtools",
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
