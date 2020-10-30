import Store from "electron-store";
import { DisplayStyle, RecentFile } from "../../renderer/states/AppStateContext";

const store = new Store({
  name: "user",
  defaults: {
    "recent-files": [],
    "auto-save": false,
    display: "full",
    theme: "auto",
    language: "auto",
    "export-scale": 1.5,
  },
});

export interface ConfigStore {
  recents: RecentFile[];
  autoSave: boolean;
  display: DisplayStyle;
  theme: string;
  language: string;
  exportScale: number;
}

export function loadConfigs(): ConfigStore {
  return {
    recents: store.get("recent-files"),
    autoSave: store.get("auto-save"),
    display: store.get("display") as DisplayStyle,
    theme: store.get("theme"),
    language: store.get("language"),
    exportScale: store.get("export-scale"),
  };
}

export function saveConfig(key: string, value: any) {
  store.set(key, value);
}
