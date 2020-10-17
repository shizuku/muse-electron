import Store from "electron-store";
import { FileInfo } from "./AppStateContext";

export const store = new Store({
  name: "user",
  defaults: { "recent-files": [] },
});

export interface ConfigStore {
  recents: FileInfo[];
}

export function loadConfig() {
  return { recents: store.get("recent-files") };
}
