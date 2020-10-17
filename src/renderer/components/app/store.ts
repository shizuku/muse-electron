import Store from "electron-store";
import { DisplayStyle, FileInfo } from "./AppStateContext";

const store = new Store({
  name: "user",
  defaults: {
    "recent-files": [],
    vertical: false,
    "auto-save": false,
    display: "full",
  },
});

export interface ConfigStore {
  recents: FileInfo[];
  vertical: boolean;
  autoSave: boolean;
  display: DisplayStyle;
}

export function loadConfigs(): ConfigStore {
  return {
    recents: store.get("recent-files"),
    vertical: store.get("vertical"),
    autoSave: store.get("auto-save"),
    display: store.get("display") as DisplayStyle,
  };
}

export function saveConfig(key: string, value: any) {
  store.set(key, value);
}
