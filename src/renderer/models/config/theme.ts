import { Instance, types } from "mobx-state-tree";

export const ThemeModel = types.model("Theme", {
  titleBarText: types.string,
  titleBarBackground: types.string,
  welcomeSiderText: types.string,
  welcomeSiderBackground: types.string,
  welcomeContentBackground: types.string,

  toolbarText: types.string,
  toolbarBackground: types.string,

  contentBackground: types.string,
  
  notationText: types.string,
  notationBackground: types.string,
});

export type ThemeInstance = Instance<typeof ThemeModel>;
