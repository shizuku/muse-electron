import { Instance, types } from "mobx-state-tree";
import { ComponentsModel } from "./components";
import { ConfigModel } from "./config";
import { FileModel } from "./file";
import { ClosedFileModel } from "./file/closed";
import { NotationModel } from "./notation";
import { UiModel } from "./ui";

export const RootModel = types.model("RootModel", {
  components: types.optional(ComponentsModel, {}),
  config: types.optional(ConfigModel, {}),
  ui: types.optional(UiModel, {}),
  file: types.optional(FileModel, ClosedFileModel.create()),
  notation: types.optional(NotationModel, {}),
});

export type RootInstance = Instance<typeof RootModel>;
