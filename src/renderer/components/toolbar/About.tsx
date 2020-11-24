import React, { FC } from "react";
import { observer, useObserver } from "mobx-react";
import { SettingOutlined, InfoOutlined } from "@ant-design/icons";
import { Menu, MenuItem } from "./menu";
import { ThemeItemInstance } from "../../models/values/themes/theme-item";
import { LocaleStringsInstance } from "../../models/values/strings/locale-strings";

export const AboutTab: FC<{ t: LocaleStringsInstance }> = observer(({ t }) => {
  return <span>{t["toolbar_about"]}</span>;
});

export interface AboutPaneProps {
  theme: ThemeItemInstance;
  t: LocaleStringsInstance;
  onShowAboutModal: () => void;
  onShowPreferenceModal: () => void;
}

export const About: FC<AboutPaneProps> = observer(
  ({ theme, t, onShowAboutModal, onShowPreferenceModal }) => {
    return useObserver(() => (
      <div className="pane-container">
        <Menu mode="horizontal" style={{ color: theme.toolbarText }}>
          <MenuItem
            icon={<SettingOutlined />}
            size="m"
            onClick={() => onShowPreferenceModal()}
          >
            {t["toolbar_about_preference"]}
          </MenuItem>
          <MenuItem
            icon={<InfoOutlined />}
            size="m"
            onClick={() => onShowAboutModal()}
          >
            {t["toolbar_about"]}
          </MenuItem>
        </Menu>
      </div>
    ));
  }
);
