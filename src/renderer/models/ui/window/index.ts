import { Instance, types } from "mobx-state-tree";

export const WindowModel = types
  .model("Window")
  .props({
    headerHover: types.optional(types.boolean, false),
    footerHover: types.optional(types.boolean, false),
    fullScreen: types.optional(types.boolean, false),
    max: types.optional(types.boolean, false),

    display: types.optional(
      types.enumeration("", ["full", "headfoot", "content"]),
      "full"
    ),
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
      get contentH(): number {
        switch (self.display) {
          case "full":
            return self.windowH - self.header - self.footer - self.toolbar;
          case "headfoot":
            return self.windowH - self.header - self.footer;
          case "content":
            return self.windowH;
        }
      },
    };
  })
  .actions((self) => {
    return {
      setHeaderHover(b: boolean) {
        self.headerHover = b;
      },
      setFooterHover(b: boolean) {
        self.footerHover = b;
      },
      setFullScreen(b: boolean) {
        self.fullScreen = b;
      },
      setMax(b: boolean) {
        self.max = b;
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
      setDisplay(s: "full" | "headfoot" | "content") {
        self.display = s;
      },
    };
  });

export type WindowInstance = Instance<typeof WindowModel>;
