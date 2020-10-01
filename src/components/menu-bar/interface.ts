export interface MenuItem {
  type?: "normal" | "separator";
  label: string;
  onclick?: () => void;
  item?: MenuItem[];
}

export type Menu = MenuItem[];

export interface MenuBarProps {
  item: Menu;
}
