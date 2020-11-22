import { Instance, types } from "mobx-state-tree";
import { parse } from "path";

export const FileConfigModel = types
  .model("FileConfig")
  .props({
    path: types.optional(types.string, ""),
    time: types.optional(types.number, 0),
    sizerMode: types.optional(types.enumeration(["flex", "fw", "fh"]), "flex"),
    sizer: types.optional(types.number, 1),
    twopage: types.optional(types.boolean, false),
  })
  .views((self) => {
    return {
      get title(): string {
        return parse(self.path).base;
      },
    };
  })
  .actions((self) => {
    return {
      setPath(p: string) {
        self.path = p;
      },
      setTwoPage(b: boolean) {
        self.twopage = b;
      },
      setSizerMode(s: "flex" | "fw" | "fh") {
        self.sizerMode = s;
      },
      setSizer(n: number) {
        self.sizer = n;
      },
    };
  });

export type FileConfigInstance = Instance<typeof FileConfigModel>;
