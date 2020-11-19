import { Instance, types } from "mobx-state-tree";

export const EditMetaModalModel = types
  .model("EditMetaModal", {
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

export type EditMetaModalInstance = Instance<typeof EditMetaModalModel>;
