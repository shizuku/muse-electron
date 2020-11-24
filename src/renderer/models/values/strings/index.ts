import { Instance, types } from "mobx-state-tree";
import { LocaleStringsInstance, LocaleStringsModel } from "./locale-strings";
import { enUS } from "./en-US";
import { zhCN } from "./zh-CN";

export const StringsModel = types
  .model("Strings")
  .props({
    localeMap: types.optional(types.map(LocaleStringsModel), {
      "en-US": enUS,
      "zh-CN": zhCN,
    }),
    conf: types.optional(types.string, "auto"),
    machineConf: types.optional(types.string, "undefined"),
  })
  .views((self) => {
    return {
      get t(): LocaleStringsInstance {
        console.log("strings conf:", self.conf, self.machineConf);
        let def = enUS;
        if (self.conf === "auto") {
          return self.localeMap.get(self.machineConf) || def;
        } else {
          return self.localeMap.get(self.conf) || def;
        }
      },
    };
  })
  .actions((self) => {
    return {
      setConf(l: string) {
        self.conf = l;
      },
      setMachineConf(c: string) {
        self.machineConf = c;
      },
    };
  });

export type StringsInstance = Instance<typeof StringsModel>;
