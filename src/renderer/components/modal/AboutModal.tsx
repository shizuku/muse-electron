import React, { FC } from "react";
import { Modal } from "antd";
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useAppState } from "../../states";

export const AboutModal: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  const cancel = () => {
    state.showAboutModel = false;
  };
  return useObserver(() => (
    <Modal
      title={t("modal-about")}
      visible={state.showAboutModel}
      onCancel={cancel}
      footer={[]}
    >
      ABOUTABOUTABOUTABOUTABOUTABOUTABOUTABOUTABOUTABOUTABOUTABOUT
    </Modal>
  ));
};
