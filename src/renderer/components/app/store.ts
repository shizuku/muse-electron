import Store from "electron-store";
import { DisplayStyle, FileInfo } from "./AppStateContext";

const store = new Store({
  name: "user",
  defaults: {
    "recent-files": [],
    "auto-save": false,
    display: "full",
  },
});

export interface ConfigStore {
  recents: FileInfo[];
  autoSave: boolean;
  display: DisplayStyle;
}

export function loadConfigs(): ConfigStore {
  return {
    recents: store.get("recent-files"),
    autoSave: store.get("auto-save"),
    display: store.get("display") as DisplayStyle,
  };
}

export function saveConfig(key: string, value: any) {
  store.set(key, value);
}
