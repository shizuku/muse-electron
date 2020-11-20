import { types } from "mobx-state-tree";
import { WindowModel } from "./window";

export const UiModel = types.model("UiModel", {
  window: types.optional(WindowModel, {}),
});
