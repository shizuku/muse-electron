import React, { FC } from "react";
import {
  CloseCircleOutlined,
  SaveOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { observer, useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem } from "./menu";
import { ThemeItemInstance } from "../../models/config/theme";
import { FileInstance } from "../../models/file";
import { ConfigInstance } from "../../models/config";

export const FileTab: FC = observer(() => {
  const { t } = useTranslation();
  return <span>{t("toolbar.file.file")}</span>;
});

export interface FilePanrProps {
  theme: ThemeItemInstance;
  file: FileInstance;
  config: ConfigInstance;
  onSave: () => void;
  onSaveAs: () => void;
  onAutoSave: () => void;
  onShowExportModal: () => void;
  onClose: () => void;
}

export const File: FC<FilePanrProps> = observer(
  ({
    theme,
    file,
    config,
    onSave,
    onSaveAs,
    onAutoSave,
    onShowExportModal: onExport,
    onClose,
  }) => {
    const { t } = useTranslation();
    return useObserver(() => (
      <div className="pane-container">
        <Menu mode="horizontal" style={{ color: theme.toolbarText }}>
          <MenuItem
            icon={<SaveOutlined />}
            size="m"
            onClick={() => onSave()}
            disable={!file.isModified}
          >
            {t("toolbar.file.save")}
          </MenuItem>
          <MenuItem icon={<SaveOutlined />} size="m" onClick={() => onSaveAs()}>
            {t("toolbar.file.save-as")}
          </MenuItem>
          <MenuItem
            icon={<SaveOutlined />}
            size="m"
            onClick={() => onAutoSave()}
            active={config.autoSave}
          >
            {t("toolbar.file.auto-save")}
          </MenuItem>
          <MenuItem
            icon={<ExportOutlined />}
            size="m"
            onClick={() => onExport()}
          >
            {t("toolbar.file.export")}
          </MenuItem>
          <MenuItem
            icon={<CloseCircleOutlined />}
            size="m"
            onClick={() => onClose()}
          >
            {t("toolbar.file.close")}
          </MenuItem>
        </Menu>
      </div>
    ));
  }
);
