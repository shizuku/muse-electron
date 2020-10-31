module.exports = {
  title: "Muse",
  base: "/muse-electron/",
  description: "A react electron project to show and edit music score.",
  locales: {
    "/": {
      lang: "en-US",
      title: "Muse",
      description: "A react electron project to show and edit music score.",
    },
    "/zh-CN/": {
      lang: "zh-CN",
      title: "Muse",
      description: "一个显示编辑简谱的 react electron 项目。",
    },
  },
  themeConfig: {
    locales: {
      "/": {
        selectText: "Languages",
        label: "English",
        ariaLabel: "Languages",
        editLinkText: "Edit this page on GitHub",
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh",
          },
        },
      },
      "/zh-CN/": {
        selectText: "选择语言",
        label: "简体中文",
        editLinkText: "在 GitHub 上编辑此页",
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新",
          },
        },
      },
    },
  },
};
