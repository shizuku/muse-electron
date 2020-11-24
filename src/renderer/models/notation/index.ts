import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import { NotationInfoModel } from "./info";
import { PageModel } from "./page";

export const NotationModel = types.model("Notation", {
  info: types.optional(NotationInfoModel, {}),
  pages: types.optional(types.array(PageModel), []),
});

export type NotationInstance = Instance<typeof NotationModel>;

export type NotationSnapshotIn = SnapshotIn<typeof NotationModel>;
export type NotationSnapshotOut = SnapshotOut<typeof NotationModel>;
