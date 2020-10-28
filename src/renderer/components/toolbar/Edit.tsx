import React, { FC } from "react";
import { RedoOutlined, UndoOutlined, ProfileOutlined } from "@ant-design/icons";
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useAppState } from "../../states";
import { Menu, MenuItem } from "./menu";

export const EditTab: FC = () => {
  const { t } = useTranslation();
  return <span>{t("toolbar.edit.edit")}</span>;
};

export const Edit: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  return useObserver(() => (
    <div>
      <Menu mode="horizontal" style={{ color: state.theme.colorText }}>
        <MenuItem
          icon={<UndoOutlined />}
          size="m"
          onClick={() => state.onUndo()}
        >
          {t("toolbar.edit.undo")}
        </MenuItem>
        <MenuItem
          icon={<RedoOutlined />}
          size="m"
          onClick={() => state.onRedo()}
        >
          {t("toolbar.edit.redo")}
        </MenuItem>
        <MenuItem
          icon={<ProfileOutlined />}
          size="m"
          onClick={() => state.onEditMetaData()}
        >
          {t("toolbar.edit.meta-data")}
        </MenuItem>
      </Menu>
    </div>
  ));
};
