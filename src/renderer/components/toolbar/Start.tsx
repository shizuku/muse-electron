import React, { FC } from "react";
import { RedoOutlined, UndoOutlined, ProfileOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { Menu, MenuItem } from "./menu";
import { FileInstance } from "../../models/file";
import { ThemeItemInstance } from "../../models/values/themes/theme-item";
import { LocaleStringsInstance } from "../../models/values/strings/locale-strings";
import { useStrings } from "../../models";

export const StartTab: FC = observer(() => {
  let s = useStrings();
  return <span>{s.t["toolbar_start"]}</span>;
});

export interface StartPaneProps {
  theme: ThemeItemInstance;
  file: FileInstance;
  t: LocaleStringsInstance;
  onUndo: () => void;
  onRedo: () => void;
  onShowEditMetaDataModal: () => void;
}

export const Start: FC<StartPaneProps> = observer(
  ({ theme, file, t, onUndo, onRedo, onShowEditMetaDataModal }) => {
    return (
      <div>
        <Menu mode="horizontal" style={{ color: theme.toolbarText }}>
          <MenuItem
            icon={<UndoOutlined />}
            size="m"
            onClick={() => onUndo()}
            disable={file.undoDisable}
          >
            {t["toolbar_start_undo"]}
          </MenuItem>
          <MenuItem
            icon={<RedoOutlined />}
            size="m"
            onClick={() => onRedo()}
            disable={file.redoDisable}
          >
            {t["toolbar_start_redo"]}
          </MenuItem>
          <MenuItem
            icon={<ProfileOutlined />}
            size="m"
            onClick={() => onShowEditMetaDataModal()}
          >
            {t["toolbar_start_edit-meta"]}
          </MenuItem>
        </Menu>
      </div>
    );
  }
);
