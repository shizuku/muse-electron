import React, { FC } from "react";
import { useObserver } from "mobx-react";
import { InputNumber, Popover } from "antd";
import { useAppState } from "../../app";
import "./style.css";

const floatEqual = (a: number, b: number) => a - b > -10e-20 && a - b < 10e-20;

const PopItem: FC<{ x: number; s: string }> = ({ x, s }) => {
  let state = useAppState();
  return useObserver(() => (
    <div
      className="pop-item"
      style={
        floatEqual(state.config.x, x)
          ? { background: state.theme.colorPrimaryLight }
          : {}
      }
      onClick={() => (state.config.x = x)}
    >
      {s}
    </div>
  ));
};

const PopContent: FC = () => {
  let state = useAppState();
  let fw =
    (state.windowDim.contentW / state.windowDim.notationW) * state.config.x;
  let fh =
    (state.windowDim.contentH / state.windowDim.notationH) * state.config.x;
  return useObserver(() => (
    <div className="pop-content">
      <PopItem x={fw} s="Fit width" />
      <PopItem x={fh} s="Fit height" />
      <PopItem x={Math.min(fw, fh)} s="Fit screen" />
      <PopItem x={Math.max(fw, fh)} s="Fit content" />
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
  const onChange = (v: string | number | undefined) => {
    let x = 0;
    switch (typeof v) {
      case "number":
        x = v;
        break;
      case "string":
        x = parseFloat(v);
        break;
      default:
        x = 100;
    }
    state.config.x = x / 100;
  };
  return useObserver(() => (
    <div className="sizer">
      <Popover content={<PopContent />}>
        <InputNumber
          size="small"
          defaultValue={state.config.x * 100}
          min={10}
          max={500}
          formatter={(value) => `${parseInt(value?.toString() || "100")}%`}
          parser={(value) => parseInt(value?.replace("%", "") || "100")}
          value={state.config.x * 100}
          onChange={onChange}
        />
      </Popover>
    </div>
  ));
};
