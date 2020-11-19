import { types } from "mobx-state-tree";
import { ModalModel } from "./modal";

export const UiModel = types.model("UiModel", {
  modal: types.optional(ModalModel, {}),
  display: types.optional(
    types.enumeration("", ["full", "headfoot", "content"]),
    "full"
  ),
  headerHover: types.optional(types.boolean, false),
  footerHover: types.optional(types.boolean, false),
  fullScreen: types.optional(types.boolean, false),
  maximium: types.optional(types.boolean, false),
});
