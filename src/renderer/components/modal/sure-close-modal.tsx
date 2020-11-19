import React, { FC } from "react";
import { Button, Modal } from "antd";
import { observer, useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { SureCloseModalInstance } from "../../models/components/modal/sure-close";

export interface SureCloseModalProps {
  model: SureCloseModalInstance;
  onSave: (cb: (r: string) => void) => void;
  onClose: () => void;
}

export const SureCloseModal: FC<SureCloseModalProps> = observer(
  ({ model, onSave, onClose }) => {
    const { t } = useTranslation();
    const cancel = () => {
      model.setShow(false);
    };
    const yes = () => {
      console.log("modal sure close yes");
      onSave((r) => {
        console.log("modal sure close cb", r);
        if (r === "success") {
          model.setShow(false);
          onClose();
        }
      });
    };
    const no = () => {
      model.setShow(false);
      onClose();
    };
    return useObserver(() => (
      <Modal
        title={t("modal.save-close.save-close")}
        visible={model.ifShow}
        onCancel={cancel}
        footer={[
          <Button onClick={cancel} key="cancel">
            {t("common.button-cancel")}
          </Button>,
          <Button onClick={no} key="no">
            {t("common.button-no")}
          </Button>,
          <Button type="primary" onClick={yes} key="yes">
            {t("common.button-yes")}
          </Button>,
        ]}
      >
        <p>{t("modal.save-close.message")}</p>
      </Modal>
    ));
  }
);
