import React, { FC } from "react";
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { LayoutHorizontalOutlined, LayoutVerticalOutlined } from "../icons";
import { Menu, MenuItem } from "../menu";
import { useAppState } from "../app";

export const ViewTab: FC = () => {
  const { t } = useTranslation();
  return <span>{t("toolbar-view")}</span>;
};

export const View: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  return useObserver(() => (
    <div className="pane-container">
      <Menu mode="horizontal">
        <MenuItem
          icon={<LayoutVerticalOutlined />}
          size="m"
          onClick={state.events?.onSetVertical}
          active={state.config.vertical === true}
        >
          {t("toolbar-view-vertical")}
        </MenuItem>
        <MenuItem
          icon={<LayoutHorizontalOutlined />}
          size="m"
          onClick={state.events?.onSetHorizontal}
          active={state.config.vertical === false}
        >
          {t("toolbar-view-horizontal")}
        </MenuItem>
      </Menu>
    </div>
  ));
};
