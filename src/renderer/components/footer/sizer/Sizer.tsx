import React, { FC } from "react";
import { Slider, InputNumber } from "antd";
import { useAppState } from "../../app";
import "./style.css";

export const Sizer: FC = () => {
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
    state.config.x = x / 100;
  };
  return (
    <div className="sizer">
      <InputNumber
        size="small"
        defaultValue={100}
        min={10}
        max={500}
        formatter={(value) => `${value}%`}
        parser={(value) => parseInt(value?.replace("%", "") || "100")}
        onChange={onChange}
      />
    </div>
  );
};
