import { Instance, types } from "mobx-state-tree";
import { light } from "./light";
import { ThemeItemInstance, ThemeItemModel } from "./theme-item";

export const ThemesModel = types
  .model("Themes")
  .props({
    themes: types.optional(types.map(ThemeItemModel), {
      light: light,
    }),
    conf: types.optional(types.string, "auto"),
    machineConf: types.optional(types.string, "auto"),
  })
  .views((self) => {
    return {
      get t(): ThemeItemInstance {
        if (self.conf === "auto") {
          return self.themes.get(self.machineConf) || light;
        } else {
          return self.themes.get(self.conf) || light;
        }
      },
    };
  })
  .actions((self) => {
    return {
      setConf(c: string) {
        self.conf = c;
      },
      setMachineConf(c: string) {
        self.machineConf = c;
      },
    };
  });

export type ThemesInstance = Instance<typeof ThemesModel>;
