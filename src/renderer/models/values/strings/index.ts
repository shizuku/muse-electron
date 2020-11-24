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
    locale: types.optional(types.string, "en-US"),
  })
  .views((self) => {
    return {
      get t(): LocaleStringsInstance {
        let l = self.localeMap.get(self.locale);
        if (l) return l;
        else throw "no strings abvalibale.";
      },
    };
  })
  .actions((self) => {
    return {
      setLocale(l: string) {
        self.locale = l;
      },
    };
  });

export type StringsInstance = Instance<typeof StringsModel>;
