import { Instance, types } from "mobx-state-tree";
import { TrackModel } from "./track";

export const LineModel = types.model("Line").props({
  tracks: types.optional(types.array(TrackModel), []),
});

export type LineInstance = Instance<typeof LineModel>;
