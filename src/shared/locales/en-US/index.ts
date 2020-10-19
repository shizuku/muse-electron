import { welcome } from "./welcome";
import { toolbar } from "./toolbar";
import { header } from "./header";
import { footer } from "./footer";
import { modal } from "./modal";
import { common } from "./common";
import { notification } from "./notification";

export const enUS: Record<string, string> = {
  ...common,
  ...welcome,
  ...toolbar,
  ...header,
  ...footer,
  ...modal,
  ...notification,
};
