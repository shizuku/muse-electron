import React, { FC } from "react";
import { Button, Modal } from "antd";
import { observer, useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { SureCloseModalInstance } from "../../models/components/modal/sure-close";
import { FileInstance } from "../../models/file";

export interface SureCloseModalProps {
  model: SureCloseModalInstance;
  file: FileInstance;
}

export const SureCloseModal: FC<SureCloseModalProps> = observer(
  ({ model, file }) => {
    const { t } = useTranslation();
    const cancel = () => {
      model.hide();
    };
    const yes = () => {
      console.log("modal sure close yes");
      file.save((r) => {
        console.log("modal sure close cb", r);
        if (r === "success") {
          model.hide();
          file.close();
        }
      });
    };
    const no = () => {
      model.hide();
      file.close();
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
