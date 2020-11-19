import { Instance, types } from "mobx-state-tree";

export const SureExitModalModel = types
  .model("SureExitModal", {
    ifShow: types.optional(types.boolean, false),
  })
  .actions((self) => {
    return {
      show() {
        self.ifShow = true;
      },
      hide() {
        self.ifShow = false;
      },
    };
  });

export type SureExitModalInstance = Instance<typeof SureExitModalModel>;
