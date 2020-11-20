import { types } from "mobx-state-tree";
import { WelcomeModel } from "../components/welcome";
import { WindowModel } from "./window";

export const UiModel = types.model("UiModel", {
  window: types.optional(WindowModel, {}),
  welcome: types.optional(WelcomeModel, {}),
});
