import { notification } from "antd";
import { IconType, NotificationPlacement } from "antd/lib/notification";

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
