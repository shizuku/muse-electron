import { Instance, types } from "mobx-state-tree";

export const ToolbarModel = types
  .model("Toolbar")
  .props({
    active: types.optional(types.string, "start"),
  })
  .actions((self) => {
    return {
      setActive(s: string) {
        self.active = s;
      },
    };
  });

export type ToolbarInstance = Instance<typeof ToolbarModel>;
