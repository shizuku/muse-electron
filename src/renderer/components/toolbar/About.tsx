import React, { FC } from "react";
import { observer, useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { SettingOutlined, InfoOutlined } from "@ant-design/icons";
import { Menu, MenuItem } from "./menu";
import { ThemeItemInstance } from "../../models/config/theme";

export const AboutTab: FC = observer(() => {
  const { t } = useTranslation();
  return <span>{t("toolbar.about.about")}</span>;
});

export interface AboutPaneProps {
  theme: ThemeItemInstance;
  onShowAboutModal: () => void;
  onShowPreferenceModal: () => void;
}

export const About: FC<AboutPaneProps> = observer(
  ({ theme, onShowAboutModal, onShowPreferenceModal }) => {
    const { t } = useTranslation();
    return useObserver(() => (
      <div className="pane-container">
        <Menu mode="horizontal" style={{ color: theme.toolbarText }}>
          <MenuItem
            icon={<SettingOutlined />}
            size="m"
            onClick={() => onShowPreferenceModal()}
          >
            {t("toolbar.about.preference")}
          </MenuItem>
          <MenuItem
            icon={<InfoOutlined />}
            size="m"
            onClick={() => onShowAboutModal()}
          >
            {t("toolbar.about.about")}
          </MenuItem>
        </Menu>
      </div>
    ));
  }
);
