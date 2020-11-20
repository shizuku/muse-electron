import { Instance, types } from "mobx-state-tree";
import { optional } from "mobx-state-tree/dist/internal";

export interface ThemeItemLoader {
  titleBarText: string;
  titleBarBackground: string;
  welcomeSiderText: string;
  welcomeSiderBackground: string;
  welcomeContentBackground: string;

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
  titleBarText: types.string,
  titleBarBackground: types.string,
  welcomeSiderText: types.string,
  welcomeSiderBackground: types.string,
  welcomeContentBackground: types.string,

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
  titleBarText: "",
  titleBarBackground: "",
  welcomeSiderText: "",
  welcomeSiderBackground: "",
  welcomeContentBackground: "",

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
    key: optional(types.string, "default"),
  })
  .views((self) => {
    return {
      get theme(): ThemeItemInstance {
        return self.themes.get(self.key) || defaultTheme;
      },
    };
  });

export type ThemeInstance = Instance<typeof ThemeModel>;
