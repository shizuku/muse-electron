import { types } from "mobx-state-tree";
import { Instance, optional } from "mobx-state-tree/dist/internal";
import { NotationInfoModel } from "./info";

export const NotationModel = types.model("Notation", {
  info: optional(NotationInfoModel, {}),
});

export type NotationInstance = Instance<typeof NotationModel>;
