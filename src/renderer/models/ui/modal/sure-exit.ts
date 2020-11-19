import { Instance, types } from "mobx-state-tree";

export const SureExitModel = types
  .model("SureExitModel", {
    show: types.optional(types.boolean, false),
  })
  .actions((self) => {
    return {
      setShow: (show: boolean) => (self.show = show),
    };
  });

export type SureExitInstance = Instance<typeof SureExitModel>;
