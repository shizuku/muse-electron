import { Instance, types } from "mobx-state-tree";
import { BarModel } from "./bar";

export const TrackModel = types.model("Track").props({
  bars: types.optional(types.array(BarModel), []),
});

export type TrackInstance = Instance<typeof TrackModel>;
