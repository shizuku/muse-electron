import { welcome } from "./welcome";
import { toolbar } from "./toolbar";
import { header } from "./header";
import { footer } from "./footer";

export const enUS: Record<string, string> = {
  ...welcome,
  ...toolbar,
  ...header,
  ...footer,
};
