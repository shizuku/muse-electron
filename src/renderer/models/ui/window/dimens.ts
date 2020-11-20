import { Instance, types } from "mobx-state-tree";

export const DimensModel = types
  .model("DimensModel", {
    windowH: types.optional(types.number, 0),
    windowW: types.optional(types.number, 0),
    x: types.optional(types.number, 0),
    y: types.optional(types.number, 0),
    header: types.optional(types.number, 0),
    footer: types.optional(types.number, 0),
    toolbar: types.optional(types.number, 0),
    contentW: types.optional(types.number, 0),
    notationH: types.optional(types.number, 0),
    notationW: types.optional(types.number, 0),
  })
  .views((self) => {
    return {
      get contentH() {
        return self.windowH;
      },
    };
  })
  .actions((self) => {
    return {
      setWindowH(n: number) {
        self.windowH = n;
      },
      setWindowW(n: number) {
        self.windowW = n;
      },
      setX(n: number) {
        self.x = n;
      },
      setY(n: number) {
        self.y = n;
      },
      setHeader(n: number) {
        self.header = n;
      },
      setFooter(n: number) {
        self.footer = n;
      },
      setToolbar(n: number) {
        self.toolbar = n;
      },
      setContentW(n: number) {
        self.contentW = n;
      },
      setNotationH(n: number) {
        self.notationH = n;
      },
      setNotationW(n: number) {
        self.notationW = n;
      },
    };
  });

export type DimensInstance = Instance<typeof DimensModel>;
