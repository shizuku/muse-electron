import React, { FC } from "react";
import { observer, useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { LayoutHorizontalOutlined, LayoutVerticalOutlined } from "../icons";
import { Menu, MenuItem } from "./menu";
import { FileInstance } from "../../models/file";
import { ThemeItemInstance } from "../../models/values/themes/theme-item";

export const ViewTab: FC = observer(() => {
  const { t } = useTranslation();
  return <span>{t("toolbar.view.view")}</span>;
});

export interface ViewPaneProps {
  theme: ThemeItemInstance;
  file: FileInstance;
  onSetTwoPage: () => void;
  onSetOnePage: () => void;
}

//TODO: change icons
export const View: FC<ViewPaneProps> = observer(
  ({ theme, file, onSetTwoPage, onSetOnePage }) => {
    const { t } = useTranslation();
    return useObserver(() => (
      <div className="pane-container">
        <Menu mode="horizontal" style={{ color: theme.toolbarText }}>
          <MenuItem
            icon={<LayoutVerticalOutlined />}
            size="m"
            onClick={() => onSetOnePage()}
            active={file.conf.twopage === false}
          >
            {t("toolbar.view.one-page")}
          </MenuItem>
          <MenuItem
            icon={<LayoutHorizontalOutlined />}
            size="m"
            onClick={() => onSetTwoPage()}
            active={file.conf.twopage === true}
          >
            {t("toolbar.view.two-page")}
          </MenuItem>
        </Menu>
      </div>
    ));
  }
);
