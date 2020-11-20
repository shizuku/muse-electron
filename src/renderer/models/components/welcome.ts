import { Instance, types } from "mobx-state-tree";
import { boolean } from "mobx-state-tree/dist/internal";

export const RecentFileModel = types.model("RecentFile", {
  path: types.string,
  time: types.number,
  sizeMode: types.enumeration(["flex", "fw", "fh"]),
  size: types.number,
  twopage: boolean,
});

export const WelcomeModel = types
  .model("Welcome", {
    recents: types.optional(types.array(RecentFileModel), []),
  })
  .views((self) => {
    return {
      get sortedRecents() {
        return self.recents;
      },
    };
  });

export type WelcomeInstance = Instance<typeof WelcomeModel>;
