import { Instance, types } from "mobx-state-tree";

export const EditMetaModel = types
  .model("EditMetaModel", {
    show: types.optional(types.boolean, false),
  })
  .actions((self) => {
    return {
      setShow: (show: boolean) => (self.show = show),
    };
  });

export type EditMetaInstance = Instance<typeof EditMetaModel>;
