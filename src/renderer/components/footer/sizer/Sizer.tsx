import React, { FC } from "react";
import { observer, useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { InputNumber, Popover } from "antd";
import { useAppState } from "../../../states";
import { useRootModel } from "../../../models";
import "./style.css";

const PopItem: FC<{ x: number; t: string }> = observer(({ x, t }) => {
  let root = useRootModel();
  let theme = root.config.theme.theme;
  let fileConf = root.file.conf;
  return useObserver(() => (
    <div
      className="pop-item"
      style={fileConf.sizer === x ? { background: theme.activeColor } : {}}
      onClick={() => fileConf.setSizer(x)}
    >
      {t}
    </div>
  ));
});

const PopContent: FC = observer(() => {
  let root = useRootModel();

  const { t } = useTranslation();
  console.log(root.fitWidthSizer, root.fitHeightSizer);
  return useObserver(() => (
    <div className="pop-content">
      <PopItem x={root.fitWidthSizer} t={t("footer.sizer.fit-width")} />
      <PopItem x={root.fitHeightSizer} t={t("footer.sizer.fit-height")} />
      <PopItem x={300} t="300%" />
      <PopItem x={250} t="250%" />
      <PopItem x={150} t="150%" />
      <PopItem x={100} t="100%" />
      <PopItem x={75} t="75%" />
      <PopItem x={50} t="50%" />
      <PopItem x={25} t="25%" />
    </div>
  ));
});

export const Sizer: FC = observer(() => {
  let state = useAppState();
  const { t } = useTranslation();
  const onChange = (v: string | number | undefined) => {
    let x = 0;
    switch (typeof v) {
      case "number":
        x = Math.floor(v * 100) / 100;
        break;
      case "string":
        x = Math.floor(parseFloat(v) * 100) / 100;
        break;
      default:
        x = 100;
    }
    state.onSetSizer(x);
  };
  return useObserver(() => (
    <div className="sizer">
      <Popover content={<PopContent />} title={t("footer.sizer.sizer")}>
        <InputNumber
          size="small"
          defaultValue={state.config.x * 100}
          min={10}
          max={500}
          formatter={(value) => `${parseInt(value?.toString() || "100", 10)}%`}
          parser={(value) => parseInt(value?.replace("%", "") || "100", 10)}
          value={state.config.x * 100}
          onChange={onChange}
        />
      </Popover>
    </div>
  ));
});
