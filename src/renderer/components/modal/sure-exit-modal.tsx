import React, { FC } from "react";
import { Button, Modal } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { SureExitModalInstance } from "../../models/components/modal/sure-exit";

export interface SureExitModalProps {
  model: SureExitModalInstance;
  onSave: (cb: (r: string) => void) => void;
  onExit: () => void;
}

export const SureExitModal: FC<SureExitModalProps> = observer(
  ({ model, onSave, onExit }) => {
    const { t } = useTranslation();
    const cancel = () => {
      model.setShow(false);
    };
    const yes = () => {
      onSave((r) => {
        if (r === "success") {
          model.setShow(false);
          onExit();
        }
      });
    };
    const no = () => {
      model.setShow(false);
      onExit();
    };
    return (
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
    );
  }
);
