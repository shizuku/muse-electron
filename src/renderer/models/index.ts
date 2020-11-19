import { Instance, types } from "mobx-state-tree";
import { ConfigModel } from "./config";
import { DimensModel } from "./dimens";
import { FileModel } from "./file";
import { UiModel } from "./ui";

export const RootModel = types.model("RootModel", {
  config: types.optional(ConfigModel, {}),
  ui: types.optional(UiModel, {}),
  dimens: types.optional(DimensModel, {}),
  file: types.optional(FileModel, {}),
});

export type RootInstance = Instance<typeof RootModel>;
