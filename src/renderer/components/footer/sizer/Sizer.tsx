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
        state.config.x - x > -10e-20 && state.config.x - x < 10e-20
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
  let fw =
    parseInt(
      `${
        (state.windowDim.contentW / state.windowDim.notationW) *
        state.config.x *
        100
      }`,
      10
    ) / 100;
  let fh =
    parseInt(
      `${
        (state.windowDim.contentH / state.windowDim.notationH) *
        state.config.x *
        100
      }`,
      10
    ) / 100;
  console.log(fw, fh);
  return useObserver(() => (
    <div className="pop-content">
      <PopItem x={fw} s={t("footer.sizer.fit-width")} />
      <PopItem x={fh} s={t("footer.sizer.fit-height")} />
      <PopItem x={Math.min(fw, fh)} s={t("footer.sizer.fit-screen")} />
      <PopItem x={Math.max(fw, fh)} s={t("footer.sizer.fit-content")} />
      <PopItem x={3} s="300%" />
      <PopItem x={2.5} s="250%" />
      <PopItem x={1.5} s="150%" />
      <PopItem x={1} s="100%" />
      <PopItem x={0.75} s="75%" />
      <PopItem x={0.5} s="50%" />
      <PopItem x={0.25} s="25%" />
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
        x = parseInt(`${v}`, 10);
        break;
      case "string":
        x = parseInt(v, 10);
        break;
      default:
        x = 100;
    }
    state.config.x = x / 100;
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
