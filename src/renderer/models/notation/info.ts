import { Instance, types } from "mobx-state-tree";

export interface Updater {
  title: string;
  subtitle: string;
  author: string;
  mark: string;
}

export const NotationInfoModel = types
  .model("NotationInfo", {
    title: types.optional(types.string, ""),
    subtitle: types.optional(types.string, ""),
    author: types.optional(types.string, ""),
    mark: types.optional(types.string, ""),
  })
  .views((self) => {
    return {
      get splitAuthor(): string[] {
        return self.author.split("\n");
      },
    };
  })
  .actions((self) => {
    return {
      update(x: Updater) {
        self.title = x.title;
        self.subtitle = x.subtitle;
        self.author = x.author;
        self.mark = x.mark;
      },
    };
  });

export type NotationInfoInstance = Instance<typeof NotationInfoModel>;
