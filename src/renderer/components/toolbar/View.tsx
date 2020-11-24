import React, { FC } from "react";
import { observer, useObserver } from "mobx-react";
import { LayoutHorizontalOutlined, LayoutVerticalOutlined } from "../icons";
import { Menu, MenuItem } from "./menu";
import { FileInstance } from "../../models/file";
import { ThemeItemInstance } from "../../models/values/themes/theme-item";
import { LocaleStringsInstance } from "../../models/values/strings/locale-strings";
import { useStrings } from "../../models";

export const ViewTab: FC = observer(() => {
  let s = useStrings();
  return <span>{s.t["toolbar_view"]}</span>;
});

export interface ViewPaneProps {
  theme: ThemeItemInstance;
  file: FileInstance;
  t: LocaleStringsInstance;
  onSetTwoPage: () => void;
  onSetOnePage: () => void;
}

//TODO: change icons
export const View: FC<ViewPaneProps> = observer(
  ({ theme, file, t, onSetTwoPage, onSetOnePage }) => {
    return useObserver(() => (
      <div className="pane-container">
        <Menu mode="horizontal" style={{ color: theme.toolbarText }}>
          <MenuItem
            icon={<LayoutVerticalOutlined />}
            size="m"
            onClick={() => onSetOnePage()}
            active={file.conf.twopage === false}
          >
            {t["toolbar_view_one-page"]}
          </MenuItem>
          <MenuItem
            icon={<LayoutHorizontalOutlined />}
            size="m"
            onClick={() => onSetTwoPage()}
            active={file.conf.twopage === true}
          >
            {t["toolbar_view_two-page"]}
          </MenuItem>
        </Menu>
      </div>
    ));
  }
);
