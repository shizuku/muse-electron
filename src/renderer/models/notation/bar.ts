import { Instance, types } from "mobx-state-tree";
import { NoteModel } from "./note";

export const BarModel = types.model("Bar").props({
  notes: types.optional(types.array(NoteModel), []),
});

export type BarInstance = Instance<typeof BarModel>;
