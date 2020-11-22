import React, { FC } from "react";
import { RedoOutlined, UndoOutlined, ProfileOutlined } from "@ant-design/icons";
import { observer, useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem } from "./menu";
import { ThemeItemInstance } from "../../models/config/theme";

export const EditTab: FC = observer(() => {
  const { t } = useTranslation();
  return <span>{t("toolbar.edit.edit")}</span>;
});

export interface EditPaneProps {
  theme: ThemeItemInstance;
  onUndo: () => void;
  onRedo: () => void;
  onShowEditMetaDataModal: () => void;
}

export const Edit: FC<EditPaneProps> = observer(
  ({ theme, onUndo, onRedo, onShowEditMetaDataModal }) => {
    const { t } = useTranslation();
    return useObserver(() => (
      <div>
        <Menu mode="horizontal" style={{ color: theme.toolbarText }}>
          <MenuItem icon={<UndoOutlined />} size="m" onClick={() => onUndo()}>
            {t("toolbar.edit.undo")}
          </MenuItem>
          <MenuItem icon={<RedoOutlined />} size="m" onClick={() => onRedo()}>
            {t("toolbar.edit.redo")}
          </MenuItem>
          <MenuItem
            icon={<ProfileOutlined />}
            size="m"
            onClick={() => onShowEditMetaDataModal()}
          >
            {t("toolbar.edit.meta-data")}
          </MenuItem>
        </Menu>
      </div>
    ));
  }
);
