import { types } from "mobx-state-tree";
import { DimensModel, defaultDimens } from "./dimens";
import { StringsModel } from "./strings";
import { ThemesModel } from "./themes";

export const ValuesModel = types.model("Values").props({
  strings: types.optional(StringsModel, {}),
  dimens: types.optional(DimensModel, defaultDimens),
  themes: types.optional(ThemesModel, {}),
});
