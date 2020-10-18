import React, { FC } from "react";
import {
  CloseCircleOutlined,
  SaveOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem } from "../menu";
import { useAppState } from "../app";

export const FileTab: FC = () => {
  const { t } = useTranslation();
  return <span>{t("toolbar-file")}</span>;
};

export const File: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  return useObserver(() => (
    <div className="pane-container">
      <Menu mode="horizontal">
        <MenuItem
          icon={<SaveOutlined />}
          size="m"
          onClick={state.events?.onSave}
        >
          {t("toolbar-file-save")}
        </MenuItem>
        <MenuItem
          icon={<SaveOutlined />}
          size="m"
          onClick={state.events?.onSaveAs}
        >
          {t("toolbar-file-save-as")}
        </MenuItem>
        <MenuItem
          icon={<SaveOutlined />}
          size="m"
          onClick={state.events?.onAutoSave}
          active={state.autoSave}
        >
          {t("toolbar-file-auto-save")}
        </MenuItem>
        <MenuItem
          icon={<ExportOutlined />}
          size="m"
          onClick={state.events?.onExport}
        >
          {t("toolbar-file-export")}
        </MenuItem>
        <MenuItem
          icon={<CloseCircleOutlined />}
          size="m"
          onClick={state.events?.onClose}
        >
          {t("toolbar-file-close")}
        </MenuItem>
      </Menu>
    </div>
  ));
};
