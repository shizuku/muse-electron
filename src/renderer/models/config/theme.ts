import { Instance, types } from "mobx-state-tree";
import { optional } from "mobx-state-tree/dist/internal";

export interface ThemeItemLoader {
  activeColor: string;

  welcomeSiderText: string;
  welcomeSiderBackground: string;
  welcomeContentBackground: string;

  headerText: string;
  headerBackground: string;

  toolbarText: string;
  toolbarBackground: string;

  contentBackground: string;
  contentText: string;

  notationText: string;
  notationBackground: string;

  footerBackground: string;
  footerText: string;
}

export const ThemeItemModel = types.model("ThemeItem", {
  activeColor: types.string,

  welcomeSiderText: types.string,
  welcomeSiderBackground: types.string,
  welcomeContentBackground: types.string,

  headerText: types.string,
  headerBackground: types.string,

  toolbarText: types.string,
  toolbarBackground: types.string,

  contentBackground: types.string,
  contentText: types.string,

  notationText: types.string,
  notationBackground: types.string,

  footerBackground: types.string,
  footerText: types.string,
});

export type ThemeItemInstance = Instance<typeof ThemeItemModel>;

const defaultTheme = ThemeItemModel.create({
  activeColor: "",

  welcomeSiderText: "",
  welcomeSiderBackground: "",
  welcomeContentBackground: "",

  headerText: "",
  headerBackground: "",

  toolbarText: "",
  toolbarBackground: "",

  contentBackground: "",
  contentText: "",

  notationText: "",
  notationBackground: "",

  footerBackground: "",
  footerText: "",
});

export const ThemeModel = types
  .model("Theme")
  .props({
    themes: types.optional(types.map(ThemeItemModel), {
      default: defaultTheme,
    }),
    name: optional(types.string, "default"),
  })
  .views((self) => {
    return {
      get theme(): ThemeItemInstance {
        return self.themes.get(self.name) || defaultTheme;
      },
    };
  });

export type ThemeInstance = Instance<typeof ThemeModel>;
