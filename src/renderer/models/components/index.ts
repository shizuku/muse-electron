import { Instance, types } from "mobx-state-tree";
import { ModalModel } from "./modal";
import { WelcomeModel } from "./welcome";

export const ComponentsModel = types.model("Components", {
  modal: types.optional(ModalModel, {}),
  welcome: types.optional(WelcomeModel, {}),
});

export type ComponentsInstacnce = Instance<typeof ComponentsModel>;
