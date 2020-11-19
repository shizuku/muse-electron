import { Instance, types } from "mobx-state-tree";

export interface ConfigLoader {
  autoSave: boolean;
  display: "full" | "headfoot" | "content";
  exportScale: number;
  lang: string;
  theme: string;
}

export const ConfigModel = types
  .model("ConfigModel", {
    autoSave: types.optional(types.boolean, false),
    confLang: types.optional(types.string, "auto"),
    machineLang: types.optional(types.string, "en-US"),
    confTheme: types.optional(types.string, "auto"),
    exportScale: types.optional(types.number, 1),
    display: types.optional(
      types.enumeration("", ["full", "headfoot", "content"]),
      "full"
    ),
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
        self.display = c.display;
        self.exportScale = c.exportScale;
        self.confTheme = c.theme;
      },
      toggleAutoSave(): void {
        self.autoSave = !self.autoSave;
      },
      setMachineLang(l: string): void {
        self.machineLang = l;
      },
      setConfLang(l: string): void {
        self.confLang = l;
      },
      setExportScale(s: number): void {
        self.exportScale = s;
      },
    };
  });

export type ConfigInstance = Instance<typeof ConfigModel>;
