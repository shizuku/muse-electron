import { Instance, types } from "mobx-state-tree";

export const ExportModalModel = types
  .model("ExportModal", {
    ifShow: types.optional(types.boolean, false),
    isConfirm: types.optional(types.boolean, false),
    num: types.optional(types.number, 0),
  })
  .actions((self) => {
    return {
      show() {
        self.ifShow = true;
      },
      hide() {
        self.ifShow = false;
      },
      confirm() {
        self.isConfirm = true;
      },
      unConfirm() {
        self.isConfirm = false;
      },
      setNum(n: number) {
        self.num = n;
      },
    };
  });

export type ExportModalInstance = Instance<typeof ExportModalModel>;
