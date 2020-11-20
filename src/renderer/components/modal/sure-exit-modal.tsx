import React, { FC } from "react";
import { Button, Modal } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { SureExitModalInstance } from "../../models/components/modal/sure-exit";
import { FileInstance } from "../../models/file";
import { RootInstance } from "../../models";

export interface SureExitModalProps {
  model: SureExitModalInstance;
  file: FileInstance;
  root: RootInstance;
}

export const SureExitModal: FC<SureExitModalProps> = observer(
  ({ model, file, root }) => {
    const { t } = useTranslation();
    const cancel = () => {
      model.hide();
    };
    const yes = () => {
      file.save((r) => {
        if (r === "success") {
          model.hide();
          root.exit();
        }
      });
    };
    const no = () => {
      model.hide();
      root.exit();
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
