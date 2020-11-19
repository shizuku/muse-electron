import { Instance, types } from "mobx-state-tree";

export const PreferenceModalModel = types
  .model("PreferenceModal", {
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

export type PreferenceModalInstance = Instance<typeof PreferenceModalModel>;
