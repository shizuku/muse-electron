import React, { FC } from "react";
import Icon from "@ant-design/icons";

export const LayoutHorizontalOutlinedSvg: FC = () => {
  return (
    <svg
      viewBox="0 0 896 896"
      focusable="false"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={64}
    >
      <path d="M-100 120 H350 v656 H-100 Z" />
      <path d="M996 120 H546 v646 H996 Z" />
    </svg>
  );
};

export const LayoutHorizontalOutlined: FC = (props) => {
  return <Icon component={LayoutHorizontalOutlinedSvg} {...props} />;
};

export const LayoutVerticalOutlinedSvg: FC = () => {
  return (
    <svg
      viewBox="0 0 896 896"
      focusable="false"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={64}
    >
      <path d="M120 -100 V350 h656 V-100 Z" />
      <path d="M120 996 V546 h656 V996 Z" />
    </svg>
  );
};

export const LayoutVerticalOutlined: FC = (props) => {
  return <Icon component={LayoutVerticalOutlinedSvg} {...props} />;
};

export const MaxmizeOutlinedSvg: FC = () => {
  return (
    <svg
      viewBox="0 0 896 896"
      focusable="false"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={64}
    >
      <path d="M180 180 H716 V716 H180 V180 Z" />
    </svg>
  );
};

export const MaxmizeOutlined: FC = (props) => {
  return <Icon component={MaxmizeOutlinedSvg} {...props} />;
};

export const MinimizeOutlinedSvg: FC = () => {
  return (
    <svg
      viewBox="0 0 896 896"
      focusable="false"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={64}
    >
      <path d="M100 260 h536 v536 h-536 v-536 Z" />
      <path d="M260 260 V100 H796 V636 H636 " />
    </svg>
  );
};

export const MinimizeOutlined: FC = (props) => {
  return <Icon component={MinimizeOutlinedSvg} {...props} />;
};
