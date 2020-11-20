import { types, getRoot } from "mobx-state-tree";

export const NotationConfigModel = types
  .model("NotationConfig")
  .props({
    pageWidth: types.optional(types.frozen(types.number), 1),
    pageGap: types.optional(types.frozen(types.number), 1),
    pageHeight: types.optional(types.frozen(types.number), 1),
  })
  .actions((self) => {
    return {};
  });
