import React, { FC } from "react";
import {
  CloseCircleOutlined,
  SaveOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { observer, useObserver } from "mobx-react";
import { Menu, MenuItem } from "./menu";
import { FileInstance } from "../../models/file";
import { ConfigInstance } from "../../models/config";
import { ThemeItemInstance } from "../../models/values/themes/theme-item";
import { LocaleStringsInstance } from "../../models/values/strings/locale-strings";

export const FileTab: FC<{ t: LocaleStringsInstance }> = observer(({ t }) => {
  return <span>{t["toolbar_file"]}</span>;
});

export interface FilePanrProps {
  theme: ThemeItemInstance;
  file: FileInstance;
  config: ConfigInstance;
  t: LocaleStringsInstance;
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
    t,
    onSave,
    onSaveAs,
    onAutoSave,
    onShowExportModal: onExport,
    onClose,
  }) => {
    return useObserver(() => (
      <div className="pane-container">
        <Menu mode="horizontal" style={{ color: theme.toolbarText }}>
          <MenuItem
            icon={<SaveOutlined />}
            size="m"
            onClick={() => onSave()}
            disable={!file.isModified}
          >
            {t["toolbar_file_save"]}
          </MenuItem>
          <MenuItem icon={<SaveOutlined />} size="m" onClick={() => onSaveAs()}>
            {t["toolbar_file_save-as"]}
          </MenuItem>
          <MenuItem
            icon={<SaveOutlined />}
            size="m"
            onClick={() => onAutoSave()}
            active={config.autoSave}
          >
            {t["toolbar_file_auto-save"]}
          </MenuItem>
          <MenuItem
            icon={<ExportOutlined />}
            size="m"
            onClick={() => onExport()}
          >
            {t["toolbar_file_export"]}
          </MenuItem>
          <MenuItem
            icon={<CloseCircleOutlined />}
            size="m"
            onClick={() => onClose()}
          >
            {t["toolbar_file_close"]}
          </MenuItem>
        </Menu>
      </div>
    ));
  }
);
