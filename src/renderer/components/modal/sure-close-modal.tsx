import React, { FC } from "react";
import { Button, Modal } from "antd";
import { observer, useObserver } from "mobx-react";
import { SureCloseModalInstance } from "../../models/components/modal/sure-close";
import { LocaleStringsInstance } from "../../models/values/strings/locale-strings";

export interface SureCloseModalProps {
  model: SureCloseModalInstance;
  t: LocaleStringsInstance;
  onSave: (cb?: (r: string) => void) => void;
  onClose: () => void;
}

export const SureCloseModal: FC<SureCloseModalProps> = observer(
  ({ model, t, onSave, onClose }) => {
    const cancel = () => {
      model.hide();
    };
    const yes = () => {
      console.log("modal sure close yes");
      onSave((r) => {
        console.log("modal sure close cb", r);
        if (r === "success") {
          model.hide();
          onClose();
        }
      });
    };
    const no = () => {
      model.hide();
      onClose();
    };
    return useObserver(() => (
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
    ));
  }
);
