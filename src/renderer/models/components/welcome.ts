import { Instance, types } from "mobx-state-tree";

export const RecentFileModel = types.model("RecentFile", {
  path: types.string,
  time: types.number,
  sizeMode: types.enumeration(["flex", "fw", "fh"]),
  size: types.number,
  twopage: types.boolean,
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
