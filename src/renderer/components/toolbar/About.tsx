import React, { FC } from "react";
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { SettingOutlined, InfoOutlined } from "@ant-design/icons";
import { Menu, MenuItem } from "./menu";
import { useAppState } from "../../states";

export const AboutTab: FC = () => {
  const { t } = useTranslation();
  return <span>{t("toolbar.about.about")}</span>;
};

export const About: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  return useObserver(() => (
    <div className="pane-container">
      <Menu mode="horizontal" style={{ color: state.theme.colorText }}>
        <MenuItem
          icon={<SettingOutlined />}
          size="m"
          onClick={() => state.onSettings()}
        >
          {t("toolbar.about.preference")}
        </MenuItem>
        <MenuItem
          icon={<InfoOutlined />}
          size="m"
          onClick={() => state.onAbout()}
        >
          {t("toolbar.about.about")}
        </MenuItem>
      </Menu>
    </div>
  ));
};
