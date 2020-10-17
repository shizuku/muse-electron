import React, { FC } from "react";
import { useObserver } from "mobx-react";
import { InputNumber, Popover } from "antd";
import { useAppState } from "../../app";
import "./style.css";

const PopItem: FC<{ x: number; s: string }> = ({ x, s }) => {
  let state = useAppState();
  return useObserver(() => (
    <div
      className="pop-item"
      style={
        state.config.pagePerLine === x
          ? { background: state.theme.colorPrimaryLight }
          : {}
      }
      onClick={() => state.events?.onSetLiner(x)}
    >
      {s}
    </div>
  ));
};

const PopContent: FC = () => {
  return useObserver(() => (
    <div className="pop-content">
      <PopItem x={5} s="5" />
      <PopItem x={4} s="4" />
      <PopItem x={3} s="3" />
      <PopItem x={2} s="2" />
      <PopItem x={1} s="1" />
    </div>
  ));
};

export const Liner: FC = () => {
  let state = useAppState();
  const onChange = (v: string | number | undefined) => {
    let x = 0;
    switch (typeof v) {
      case "number":
        x = v;
        break;
      case "string":
        x = parseInt(v);
        break;
      default:
        x = 100;
    }
    state.config.pagePerLine = x;
  };
  return useObserver(() => (
    <div className="liner">
      <Popover content={<PopContent />}>
        <InputNumber
          size="small"
          defaultValue={state.config.pagePerLine}
          min={1}
          max={10}
          precision={0}
          value={state.config.pagePerLine}
          onChange={onChange}
        />
      </Popover>
    </div>
  ));
};
