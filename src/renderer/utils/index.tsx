import React, { FC } from "react";
import { notification } from "antd";
import { IconType, NotificationPlacement } from "antd/lib/notification";
import { ipcRenderer } from "electron";
import "./style.css";

export const openNotificationWithIcon = (
  type: IconType,
  message: string,
  description: string,
  placement: NotificationPlacement
) => {
  notification[type]({
    message,
    description,
    placement,
  });
};

export const ExternalLink: FC<{
  url: string;
}> = ({ url, children }) => {
  return (
    <span
      className="external-link"
      onClick={() => ipcRenderer.send("open-external", url)}
    >
      {children}
    </span>
  );
};
