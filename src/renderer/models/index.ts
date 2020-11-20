import { ipcRenderer } from "electron";
import { MobXProviderContext } from "mobx-react";
import { Instance, types } from "mobx-state-tree";
import { useContext } from "react";
import { ComponentsModel } from "./components";
import { ConfigModel } from "./config";
import { FileModel } from "./file";
import { NotationModel } from "./notation";
import { UiModel } from "./ui";

export const RootModel = types
  .model("RootModel", {
    components: types.optional(ComponentsModel, {}),
    config: types.optional(ConfigModel, {}),
    ui: types.optional(UiModel, {}),
    file: types.optional(FileModel, FileModel.create()),
    notation: types.optional(NotationModel, {}),
  })
  .views((self) => {
    return {
      get fitWidthSizer(): number {
        // 100 means 100%
        return (
          Math.floor(
            (self.ui.window.dimens.contentW /
              (((self.notation.config.pageWidth +
                2 * self.notation.config.pageGap) /
                self.file.conf.sizer) *
                (self.file.conf.twopage
                  ? (self.file.pages.length || 0) > 1
                    ? 2
                    : 1
                  : 1))) *
              10000
          ) / 100
        );
      },
      get fitHeightSizer(): number {
        // 100 means 100%
        return (
          Math.floor(
            (self.ui.window.dimens.contentH /
              ((self.notation.config.pageHeight + 2 * self.notation.config.pageGap) /
              self.file.conf.sizer)) *
              10000
          ) / 100
        );
      },
    };
  })
  .actions(() => {
    return {
      exit() {
        ipcRenderer.send("app-quit");
      },
    };
  });

export type RootInstance = Instance<typeof RootModel>;

export function useRootModel(): RootInstance {
  return useContext(MobXProviderContext).root;
}
