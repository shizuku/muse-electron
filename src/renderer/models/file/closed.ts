import { Instance, types } from "mobx-state-tree";

export const ClosedFileModel = types.model("ClosedFile", {
  status: types.literal("closed"),
});

export type ClosedFileInstacne = Instance<typeof ClosedFileModel>;
