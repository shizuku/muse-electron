import { Instance, types } from "mobx-state-tree";
import { DimensModel } from "./dimens";

export const WindowModel = types
  .model("Window", {
    dimens: types.optional(DimensModel, {}),
    headerHover: types.optional(types.boolean, false),
    footerHover: types.optional(types.boolean, false),
    fullScreen: types.optional(types.boolean, false),
    max: types.optional(types.boolean, false),
  })
  .actions((self) => {
    return {
      setHeaderHover(b: boolean) {
        self.headerHover = b;
      },
      setFooterHover(b: boolean) {
        self.footerHover = b;
      },
      setFullScreen(b: boolean) {
        self.fullScreen = b;
      },
      setMax(b: boolean) {
        self.max = b;
      },
    };
  });

export type WindowInstance = Instance<typeof WindowModel>;
