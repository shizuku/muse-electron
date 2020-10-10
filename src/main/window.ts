import { BrowserWindow } from "electron";

export const createWindow = () => {
  const mainWindow = new BrowserWindow({
    height: 900,
    width: 1600,
    useContentSize: true,
    titleBarStyle: 'hidden',
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  return mainWindow;
};
