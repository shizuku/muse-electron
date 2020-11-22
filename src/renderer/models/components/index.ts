import { Instance, types } from "mobx-state-tree";
import { ModalModel } from "./modal";
import { ToolbarModel } from "./toolbar";
import { WelcomeModel } from "./welcome";

export const ComponentsModel = types.model("Components", {
  modal: types.optional(ModalModel, {}),
  welcome: types.optional(WelcomeModel, {}),
  toolbar: types.optional(ToolbarModel, {}),
});

export type ComponentsInstacnce = Instance<typeof ComponentsModel>;
