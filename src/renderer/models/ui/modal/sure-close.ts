import { Instance, types } from "mobx-state-tree";

export const SureCloseModel = types
  .model("SureCloseModel", {
    show: types.optional(types.boolean, false),
  })
  .actions((self) => {
    return {
      setShow: (show: boolean) => (self.show = show),
    };
  });

export type SureCloseInstance = Instance<typeof SureCloseModel>;
