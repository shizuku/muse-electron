import { Instance, types } from "mobx-state-tree";

export const PreferenceModel = types
  .model("PreferenceModel", {
    show: types.optional(types.boolean, false),
  })
  .actions((self) => {
    return {
      setShow: (show: boolean) => (self.show = show),
    };
  });

export type PreferenceInstance = Instance<typeof PreferenceModel>;
