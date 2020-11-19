import { Instance, types } from "mobx-state-tree";

export const SureCloseModalModel = types
  .model("SureCloseModal", {
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

export type SureCloseModalInstance = Instance<typeof SureCloseModalModel>;
