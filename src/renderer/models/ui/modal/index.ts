import { Instance, types } from "mobx-state-tree";
import { AboutModel } from "./about";
import { EditMetaModel } from "./edit-meta";
import { ExportModel } from "./export";
import { PreferenceModel } from "./preference";
import { SureCloseModel } from "./sure-close";
import { SureExitModel } from "./sure-exit";

export const ModalModel = types.model("ModelStateModel", {
  editMeta: types.optional(EditMetaModel, {}),
  about: types.optional(AboutModel, {}),
  preference: types.optional(PreferenceModel, {}),
  export: types.optional(ExportModel, {}),
  sureClose: types.optional(SureCloseModel, {}),
  sureExit: types.optional(SureExitModel, {}),
});

export type ModalInstance = Instance<typeof ModalModel>;
