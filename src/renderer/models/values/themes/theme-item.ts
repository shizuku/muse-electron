import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";

export const ThemeItemModel = types.model("ThemeItem", {
  welcomeSiderText: types.string,
  welcomeSiderBackground: types.string,
  welcomeContentBackground: types.string,

  headerText: types.string,
  headerBackground: types.string,
  headerPopupBackground: types.string,
  headerPopupActiveBackground: types.string,

  toolbarText: types.string,
  toolbarBackground: types.string,
  toolbarTabBackground: types.string,
  toolbarTabText: types.string,
  toolbarTabActiveBackground: types.string,
  toolbarTabActiveText: types.string,

  contentBackground: types.string,
  contentText: types.string,

  notationText: types.string,
  notationBackground: types.string,

  footerBackground: types.string,
  footerText: types.string,
  footerPopupBackground: types.string,
  footerPopupActiveBackground: types.string,
});

export type ThemeItemInstance = Instance<typeof ThemeItemModel>;
export type ThemeItemSnapshotIn = SnapshotIn<typeof ThemeItemModel>;
export type ThemeItemSnapshotOut = SnapshotOut<typeof ThemeItemModel>;
