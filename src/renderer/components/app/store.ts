import Store from "electron-store";
import { DisplayStyle, FileInfo } from "../../states/AppStateContext";

const store = new Store({
  name: "user",
  defaults: {
    "recent-files": [],
    "auto-save": false,
    display: "full",
    theme: "auto",
    language: "auto",
  },
});

export interface ConfigStore {
  recents: FileInfo[];
  autoSave: boolean;
  display: DisplayStyle;
  theme: string;
  language: string;
}

export function loadConfigs(): ConfigStore {
  return {
    recents: store.get("recent-files"),
    autoSave: store.get("auto-save"),
    display: store.get("display") as DisplayStyle,
    theme: store.get("theme"),
    language: store.get("language"),
  };
}

export function saveConfig(key: string, value: any) {
  store.set(key, value);
}
