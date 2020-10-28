import React, { FC } from "react";
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { LayoutHorizontalOutlined, LayoutVerticalOutlined } from "../icons";
import { Menu, MenuItem } from "./menu";
import { useAppState } from "../../states";

export const ViewTab: FC = () => {
  const { t } = useTranslation();
  return <span>{t("toolbar.view.view")}</span>;
};
//TODO: change icons
//TODO:  two page
export const View: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  return useObserver(() => (
    <div className="pane-container">
      <Menu mode="horizontal" style={{ color: state.theme.colorText }}>
        <MenuItem
          icon={<LayoutVerticalOutlined />}
          size="m"
          onClick={() => state.onSetOnePage()}
          active={state.config.vertical === true}
        >
          {t("toolbar.view.one-page")}
        </MenuItem>
        <MenuItem
          icon={<LayoutHorizontalOutlined />}
          size="m"
          onClick={() => state.onSetTwoPage()}
          active={state.config.vertical === false}
        >
          {t("toolbar.view.two-page")}
        </MenuItem>
      </Menu>
    </div>
  ));
};
