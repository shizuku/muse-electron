import { Instance, types } from "mobx-state-tree";
import { ComponentsModel } from "./components";
import { ConfigModel } from "./config";
import { FileModel } from "./file";
import { NotationModel } from "./notation";
import { UiModel } from "./ui";
import { ValuesModel } from "./values";

export const RootModel = types
  .model("RootModel", {
    components: types.optional(ComponentsModel, {}),
    config: types.optional(ConfigModel, {}),
    ui: types.optional(UiModel, {}),
    file: types.optional(FileModel, {}),
    notation: types.optional(NotationModel, {}),
    values: types.optional(ValuesModel, {}),
  })
  .views((self) => {
    return {
      get fitWidthSizer(): number {
        // 100 means 100%
        return (
          Math.floor(
            (self.ui.window.dimens.contentW /
              (((self.values.dimens.pageWidth +
                2 * self.values.dimens.pageGap) /
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
              ((self.values.dimens.pageHeight +
                2 * self.values.dimens.pageGap) /
                self.file.conf.sizer)) *
              10000
          ) / 100
        );
      },
    };
  })
  .actions(() => {
    return {
      
    };
  });

export type RootInstance = Instance<typeof RootModel>;
