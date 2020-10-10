import { BrowserWindow } from "electron";

export const createWindow = () => {
  const mainWindow = new BrowserWindow({
    height: 900,
    width: 1600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  mainWindow.webContents.openDevTools();
  return mainWindow;
};
