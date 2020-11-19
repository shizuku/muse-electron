import { Instance, types } from "mobx-state-tree";

export const AboutModel = types
  .model("AboutModel", {
    show: types.optional(types.boolean, false),
  })
  .actions((self) => {
    return {
      setShow: (show: boolean) => (self.show = show),
    };
  });

export type AboutInstance = Instance<typeof AboutModel>;
