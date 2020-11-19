import { Instance, types } from "mobx-state-tree";
import { AboutModalModel } from "./about";
import { EditMetaModalModel } from "./edit-meta";
import { ExportModalModel } from "./export";
import { PreferenceModalModel } from "./preference";
import { SureCloseModalModel } from "./sure-close";
import { SureExitModalModel } from "./sure-exit";

export const ModalModel = types.model("ModelStateModel", {
  editMeta: types.optional(EditMetaModalModel, {}),
  about: types.optional(AboutModalModel, {}),
  preference: types.optional(PreferenceModalModel, {}),
  export: types.optional(ExportModalModel, {}),
  sureClose: types.optional(SureCloseModalModel, {}),
  sureExit: types.optional(SureExitModalModel, {}),
});

export type ModalInstance = Instance<typeof ModalModel>;
