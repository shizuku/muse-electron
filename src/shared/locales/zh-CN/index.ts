import { welcome } from "./welcome";
import { toolbar } from "./toolbar";
import { header } from "./header";
import { footer } from "./footer";
import { modal } from "./modal";
import { common } from "./common";
import { notification } from "./notification";

export const zhCN: Record<string, string> = {
  label: "简体中文",
  ...common,
  ...welcome,
  ...toolbar,
  ...header,
  ...footer,
  ...modal,
  ...notification,
};
