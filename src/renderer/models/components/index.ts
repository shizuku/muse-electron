import { Instance, types } from "mobx-state-tree";
import { ModalModel } from "./modal";

export const ComponentsModel = types.model("Components", {
    modal: types.optional(ModalModel, {}),
});

export type ComponentsInstacnce = Instance<typeof ComponentsModel>;
