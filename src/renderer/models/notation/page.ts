import { Instance, types } from "mobx-state-tree";
import { LineModel } from "./line";

export const PageModel = types.model("Page").props({
  lines: types.optional(types.array(LineModel), []),
});

export type PageInstance = Instance<typeof PageModel>;
