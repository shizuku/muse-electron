import React, { FC } from "react";
import { Button, Modal } from "antd";
import { observer } from "mobx-react";
import { SureExitModalInstance } from "../../models/components/modal/sure-exit";
import { LocaleStringsInstance } from "../../models/values/strings/locale-strings";

export interface SureExitModalProps {
  model: SureExitModalInstance;
  t: LocaleStringsInstance;
  onSave: (cb?: (r: string) => void) => void;
  onExit: () => void;
}

export const SureExitModal: FC<SureExitModalProps> = observer(
  ({ model, t, onSave, onExit }) => {
    const cancel = () => {
      model.hide();
    };
    const yes = () => {
      onSave((r) => {
        if (r === "success") {
          model.hide();
          onExit();
        }
      });
    };
    const no = () => {
      model.hide();
      onExit();
    };
    return (
      <Modal
        title={t["modal_sure"]}
        visible={model.ifShow}
        onCancel={cancel}
        footer={[
          <Button onClick={cancel} key="cancel">
            {t["common_button_cancel"]}
          </Button>,
          <Button onClick={no} key="no">
            {t["common_button_no"]}
          </Button>,
          <Button type="primary" onClick={yes} key="yes">
            {t["common_button_yes"]}
          </Button>,
        ]}
      >
        <p>{t["modal_sure_message"]}</p>
      </Modal>
    );
  }
);
