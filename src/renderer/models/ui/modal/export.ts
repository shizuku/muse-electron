import { Instance, types } from "mobx-state-tree";

export const ExportModel = types
  .model("ExportModel", {
    show: types.optional(types.boolean, false),
    confirm: types.optional(types.boolean, false),
    num: types.optional(types.number, 0),
  })
  .actions((self) => {
    return {
      setShow: (show: boolean) => (self.show = show),
    };
  });

export type ExportInstance = Instance<typeof ExportModel>;
