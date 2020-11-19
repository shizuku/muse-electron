import { Instance, types } from "mobx-state-tree";

export const HtmlElementModel = types.custom<string, HTMLElement>({
  name: "HtmlElement",
  fromSnapshot(value: string): HTMLElement {
    return new DOMParser().parseFromString(value, "text/html").body
      .firstChild as HTMLElement;
  },
  toSnapshot(value: HTMLElement): string {
    return new XMLSerializer().serializeToString(value);
  },
  isTargetType(value: string | HTMLElement): boolean {
    return value instanceof HTMLElement;
  },
  getValidationMessage(value: string): string {
    if (/^-?\d+\.\d+$/.test(value)) return ""; // OK
    return `'${value}' doesn't look like a valid decimal number`;
  },
});

export type HtmlElementInstance = Instance<typeof HtmlElementModel>;
