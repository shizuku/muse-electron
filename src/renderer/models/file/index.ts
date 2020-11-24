import { Instance, types } from "mobx-state-tree";

import { FileConfigModel } from "./file-config";
import { HtmlElementModel } from "./html-element";

export const FileModel = types
  .model("File")
  .props({
    isOpen: types.optional(types.boolean, false),
    isModified: types.optional(types.boolean, false),
    isNew: types.optional(types.boolean, false),

    conf: types.optional(FileConfigModel, {}),

    pages: types.optional(types.array(HtmlElementModel), []),
  })
  .views((self) => {
    return {
      get data(): string {
        return "";
      },
      get undoDisable(): boolean {
        return true;
      },
      get redoDisable(): boolean {
        return true;
      },
    };
  })
  .actions((self) => {
    return {
      open(path: string, data: string, isNew: boolean) {
        if (!self.isOpen) {
          self.isOpen = true;
          self.conf.path = path;
          self.isNew = isNew;
        }
      },
    };
  })
  .actions((self) => {
    return {
      close() {
        if (self.isOpen) {
          self.isOpen = false;
        }
      },
      setModify(m: boolean) {
        self.isModified = m;
      },
      setPath(p: string) {
        self.conf.path = p;
      },
    };
  });

export type FileInstance = Instance<typeof FileModel>;
