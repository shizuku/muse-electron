import { Instance, types } from "mobx-state-tree";

export const FileModel = types.model("FileModel", {
  opened: types.optional(types.boolean, false),
  modified: types.optional(types.boolean, false),
  isNew: types.optional(types.boolean, false),
});

export type FileInstance = Instance<typeof FileModel>;
