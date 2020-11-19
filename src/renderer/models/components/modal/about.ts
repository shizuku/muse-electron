import { Instance, types } from "mobx-state-tree";

export const AboutModalModel = types
  .model("AboutModal", {
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

export type AboutModalInstance = Instance<typeof AboutModalModel>;
