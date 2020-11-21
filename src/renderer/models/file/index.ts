import { ipcRenderer } from "electron";
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
      new() {},
      clearRecent() {},
    };
  })
  .actions((self) => {
    const saveAsHandler = (cb?: (r: string) => void) => {
      ipcRenderer.once("save-as-reply", (ev, r: string, newPath: string) => {
        if (r === "success") {
          console.log("File.saveAs: success");
          self.isModified = false;
          if (self.isNew) {
            self.conf.setPath(newPath);
            self.isNew = false;
          }
        } else {
          console.log("File.saveAs: canceled");
        }
        if (cb) cb(r);
      });
      ipcRenderer.send("save-as", "", self.data);
    };
    const saveHandler = (cb?: (r: string) => void) => {
      ipcRenderer.once("save-reply", (ev, r: string) => {
        if (r === "success") {
          console.log("File.save: success");
          self.isModified = false;
        } else {
          console.log("File.save: canceled");
        }
        if (cb) cb(r);
      });
      ipcRenderer.send("save", self.conf.path, self.data);
    };
    return {
      close() {
        if (self.isOpen) {
          self.isOpen = false;
        }
      },
      saveAs(cb?: (r: string) => void) {
        saveAsHandler(cb);
      },
      save(cb?: (r: string) => void) {
        if (self.isOpen && self.isModified) {
          if (self.isNew) {
            saveAsHandler(cb);
          } else {
            saveHandler(cb);
          }
        }
      },
      finishSave(newPath: string) {
        self.isModified = false;
        if (self.isNew) {
          self.conf.setPath(newPath);
          self.isNew = false;
        }
      },
    };
  });

export type FileInstance = Instance<typeof FileModel>;
