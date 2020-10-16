import React, { FC } from "react";
import "./style.css";

export interface MetaProps {
  avatar?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  time?: React.ReactNode;
}

export const Meta: FC<MetaProps> = ({ avatar, title, description, time }) => {
  return (
    <div className="meta">
      <div className="meta__avator">{avatar}</div>
      <div className="meta__content">
        <div className="meta__title">{title}</div>
        <div className="meta__descrption-time">
          <div className="meta__descrption">{description}</div>
          <div className="meta__time">{time}</div>
        </div>
      </div>
    </div>
  );
};
