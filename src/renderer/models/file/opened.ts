import { Instance, types } from "mobx-state-tree";
import { parse } from "path";
import { HtmlElementModel } from "./html-element";

export const OpenedFileModel = types
  .model("OpenedFile", {
    status: types.literal("opened"),
    modified: types.optional(types.boolean, false),
    isNew: types.optional(types.boolean, false),

    path: types.optional(types.string, ""),

    pages: types.array(HtmlElementModel),
  })
  .views((self) => {
    return {
      get title(): string {
        return parse(self.path).base;
      },
    };
  });

export type OpenedFileInstance = Instance<typeof OpenedFileModel>;
