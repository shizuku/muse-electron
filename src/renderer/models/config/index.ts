import { Instance, types } from "mobx-state-tree";

export interface ConfigLoader {
  autoSave: boolean;
  display: "full" | "headfoot" | "content";
  exportScale: number;
  lang: string;
}

export const ConfigModel = types
  .model("ConfigModel", {
    autoSave: types.optional(types.boolean, false),
    confLang: types.optional(types.string, "auto"),
    machineLang: types.optional(types.string, "en-US"),
    exportScale: types.optional(types.number, 1),
  })
  .views((self) => {
    return {
      get lang(): string {
        if (self.confLang != "auto") {
          return self.confLang;
        } else {
          return self.machineLang;
        }
      },
    };
  })
  .actions((self) => {
    return {
      loadConf(c: ConfigLoader) {
        self.autoSave = c.autoSave;
        self.confLang = c.lang;
        self.exportScale = c.exportScale;
      },
      toggleAutoSave(): void {
        self.autoSave = !self.autoSave;
      },
      setConfLang(l: string): void {
        self.confLang = l;
      },
      setMachineLang(l: string) {
        self.machineLang = l;
      },
      setExportScale(s: number): void {
        self.exportScale = s;
      },
    };
  });

export type ConfigInstance = Instance<typeof ConfigModel>;
