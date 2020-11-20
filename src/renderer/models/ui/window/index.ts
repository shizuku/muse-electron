import { Instance, types } from "mobx-state-tree";
import { DimensModel } from "./dimens";

export const WindowModel = types
  .model("Window", {
    dimens: types.optional(DimensModel, {}),
    headerHover: types.optional(types.boolean, false),
    footerHover: types.optional(types.boolean, false),
    fullScreen: types.optional(types.boolean, false),
    maximium: types.optional(types.boolean, false),
  })
  ;

export type WindowInstance = Instance<typeof WindowModel>;
