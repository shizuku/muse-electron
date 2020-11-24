import React, { FC } from "react";
import { RedoOutlined, UndoOutlined, ProfileOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem } from "./menu";
import { FileInstance } from "../../models/file";
import { ThemeItemInstance } from "../../models/values/themes/theme-item";

export const StartTab: FC = observer(() => {
  const { t } = useTranslation();
  return <span>{t("toolbar.start.start")}</span>;
});

export interface StartPaneProps {
  theme: ThemeItemInstance;
  file: FileInstance;
  onUndo: () => void;
  onRedo: () => void;
  onShowEditMetaDataModal: () => void;
}

export const Start: FC<StartPaneProps> = observer(
  ({ theme, file, onUndo, onRedo, onShowEditMetaDataModal }) => {
    const { t } = useTranslation();
    return (
      <div>
        <Menu mode="horizontal" style={{ color: theme.toolbarText }}>
          <MenuItem
            icon={<UndoOutlined />}
            size="m"
            onClick={() => onUndo()}
            disable={file.undoDisable}
          >
            {t("toolbar.start.undo")}
          </MenuItem>
          <MenuItem
            icon={<RedoOutlined />}
            size="m"
            onClick={() => onRedo()}
            disable={file.redoDisable}
          >
            {t("toolbar.start.redo")}
          </MenuItem>
          <MenuItem
            icon={<ProfileOutlined />}
            size="m"
            onClick={() => onShowEditMetaDataModal()}
          >
            {t("toolbar.start.meta-data")}
          </MenuItem>
        </Menu>
      </div>
    );
  }
);
