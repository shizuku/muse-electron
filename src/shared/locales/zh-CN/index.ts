import { menu } from "./menu";
import { welcome } from "./welcome";
import { toolbar } from "./toolbar";
import { header } from "./header";
import { footer } from "./footer";

export const zhCN: Record<string, string> = {
  ...menu,
  ...welcome,
  ...toolbar,
  ...header,
  ...footer,
};
