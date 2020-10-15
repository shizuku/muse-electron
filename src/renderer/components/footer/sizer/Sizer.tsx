import React, { FC } from "react";
import { Slider } from "antd";
import "./style.css";

export const Sizer: FC = () => {
  return (
    <div className="sizer">
      <Slider defaultValue={50} />
    </div>
  );
};
