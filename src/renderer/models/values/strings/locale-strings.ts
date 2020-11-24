import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";

export const LocaleStringsModel = types.model("LocaleStrings").props({
  "app-name": types.string,
});

export type LocaleStringsInstance = Instance<typeof LocaleStringsModel>;
export type LocaleStringsSnapshotIn = SnapshotIn<typeof LocaleStringsModel>;
export type LocaleStringsSnapshotOut = SnapshotOut<typeof LocaleStringsModel>;
