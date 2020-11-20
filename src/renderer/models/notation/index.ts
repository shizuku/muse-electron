import { types, Instance } from "mobx-state-tree";
import { NotationConfigModel } from "./config";
import { NotationInfoModel } from "./info";

export const NotationModel = types.model("Notation", {
  info: types.optional(NotationInfoModel, {}),
  config: types.optional(NotationConfigModel, {}),
});

export type NotationInstance = Instance<typeof NotationModel>;
