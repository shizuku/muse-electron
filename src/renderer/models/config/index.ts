import { Instance, types } from "mobx-state-tree";

export const ConfigModel = types.model("ConfigModel", {
  autoSave: types.optional(types.boolean, false),
  lang: types.optional(types.string, "auto"),
  theme: types.optional(types.string, "auto"),
  exportScale: types.optional(types.number, 1),
});

export type ConfigInstance = Instance<typeof ConfigModel>;
