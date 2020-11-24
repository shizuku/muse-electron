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
    machineConf: types.optional(types.string, "undefined"),
  })
  .views((self) => {
    return {
      get t(): ThemeItemInstance {
        console.log("themes conf:", self.conf, self.machineConf);
        let def = light;
        if (self.conf === "auto") {
          return self.themes.get(self.machineConf) || def;
        } else {
          return self.themes.get(self.conf) || def;
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
