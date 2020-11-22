import { Instance, types, getSnapshot } from "mobx-state-tree";

export interface ThemeItemLoader {
  activeColor: string;

  welcomeSiderText: string;
  welcomeSiderBackground: string;
  welcomeContentBackground: string;

  headerText: string;
  headerBackground: string;
  headerPopupBackground: string;
  headerPopupActiveBackground: string;

  toolbarText: string;
  toolbarBackground: string;
  toolbarTabBackground: string;
  toolbarTabText: string;
  toolbarTabActiveBackground: string;
  toolbarTabActiveText: string;

  contentBackground: string;
  contentText: string;

  notationText: string;
  notationBackground: string;

  footerBackground: string;
  footerText: string;
  footerPopupBackground: string;
  footerPopupActiveBackground: string;
}

export const ThemeItemModel = types.model("ThemeItem", {
  activeColor: types.string,

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

const defaultTheme = ThemeItemModel.create({
  activeColor: "",

  welcomeSiderText: "#FFFFFF",
  welcomeSiderBackground: "#20A0FF",
  welcomeContentBackground: "#F7F7F7",

  headerText: "#FFFFFF",
  headerBackground: "#20A0FF",
  headerPopupBackground: "#FFFFFF",
  headerPopupActiveBackground: "#58B7FF",

  toolbarText: "#111111",
  toolbarBackground: "#F7F7F7",
  toolbarTabBackground: "#20A0FF",
  toolbarTabText: "#FFFFFF",
  toolbarTabActiveBackground: "#FFFFFF",
  toolbarTabActiveText: "#20A0FF",

  contentBackground: "#EEEEEE",
  contentText: "#000000",

  notationText: "#000000",
  notationBackground: "#FFFFFF",

  footerBackground: "#20A0FF",
  footerText: "#FFFFFF",
  footerPopupBackground: "#FFFFFF",
  footerPopupActiveBackground: "#58B7FF",
});

export const ThemeModel = types
  .model("Theme")
  .props({
    themes: types.optional(types.map(ThemeItemModel), {
      default: getSnapshot(defaultTheme),
    }),
    name: types.optional(types.string, "default"),
  })
  .views((self) => {
    return {
      get theme(): ThemeItemInstance {
        return self.themes.get(self.name) || defaultTheme;
      },
    };
  });

export type ThemeInstance = Instance<typeof ThemeModel>;
