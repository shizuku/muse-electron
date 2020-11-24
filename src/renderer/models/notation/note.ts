import { Instance, types } from "mobx-state-tree";
import { SubnoteModel } from "./subnote";

export const NoteModel = types.model("Note").props({
  subnotes: types.optional(types.array(SubnoteModel), []),
});

export type NoteModel = Instance<typeof NoteModel>;
