import React, { FC } from "react";
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { InputNumber, Popover } from "antd";
import { useAppState } from "../../../states";
import "./style.css";

const PopItem: FC<{ x: number; s: string }> = ({ x, s }) => {
  let state = useAppState();
  return useObserver(() => (
    <div
      className="pop-item"
      style={
        state.config.x * 100 === x
          ? { background: state.theme.colorPrimaryLight }
          : {}
      }
      onClick={() => state.onSetSizer(x)}
    >
      {s}
    </div>
  ));
};

const PopContent: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  console.log(state.fitWidthSizer, state.fitHeightSizer);
  return useObserver(() => (
    <div className="pop-content">
      <PopItem x={state.fitWidthSizer} s={t("footer.sizer.fit-width")} />
      <PopItem x={state.fitHeightSizer} s={t("footer.sizer.fit-height")} />
      <PopItem x={300} s="300%" />
      <PopItem x={250} s="250%" />
      <PopItem x={150} s="150%" />
      <PopItem x={100} s="100%" />
      <PopItem x={75} s="75%" />
      <PopItem x={50} s="50%" />
      <PopItem x={25} s="25%" />
    </div>
  ));
};

export const Sizer: FC = () => {
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
};
