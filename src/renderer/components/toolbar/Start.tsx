import React, { FC } from "react";
import {
  BorderHorizontalOutlined,
  BorderVerticleOutlined,
  SaveOutlined,
  RedoOutlined,
  UndoOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useAppState } from "../app";
import { Menu, MenuItem } from "./menu";

export const StartTab: FC = () => {
  const { t } = useTranslation();
  return <span>{t("toolbar-start")}</span>;
};

export const Start: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  return useObserver(() => (
    <div>
      <Menu mode="horizontal" style={{ color: state.theme.colorText }}>
        <MenuItem
          icon={<UndoOutlined />}
          size="m"
          onClick={state.events?.onUndo}
          disable={state.undoDisable}
        >
          {t("toolbar-start-undo")}
        </MenuItem>
        <MenuItem
          icon={<RedoOutlined />}
          size="m"
          onClick={state.events?.onRedo}
          disable={state.redoDisable}
        >
          {t("toolbar-start-redo")}
        </MenuItem>
        <MenuItem
          icon={<ProfileOutlined />}
          size="m"
          onClick={state.events?.onEditMetaData}
        >
          {t("toolbar-start-meta-data")}
        </MenuItem>
      </Menu>
    </div>
  ));
};
