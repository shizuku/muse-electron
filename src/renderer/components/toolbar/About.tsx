import React, { FC } from "react";
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { SettingOutlined, InfoOutlined } from "@ant-design/icons";
import { Menu, MenuItem } from "./menu";
import { useAppState } from "../app";

export const AboutTab: FC = () => {
  const { t } = useTranslation();
  return <span>{t("toolbar-about")}</span>;
};

export const About: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  return useObserver(() => (
    <div className="pane-container">
      <Menu mode="horizontal">
        <MenuItem
          icon={<SettingOutlined />}
          size="m"
          onClick={state.events?.onSettings}
        >
          {t("toolbar-about-settings")}
        </MenuItem>
        <MenuItem
          icon={<InfoOutlined />}
          size="m"
          onClick={state.events?.onAbout}
        >
          {t("toolbar-about-about")}
        </MenuItem>
      </Menu>
    </div>
  ));
};
