import React, { FC } from "react";
import { ipcRenderer } from "electron";
import { Button, Modal } from "antd";
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useAppState } from "../../states";

export const SureCloseModal: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  const cancel = () => {
    state.showSureClose = false;
  };
  const yes = () => {
    console.log("modal sure close yes");
    state.events?.onSave((r) => {
      console.log("modal sure close cb", r);
      if (r === "success") {
        state.showSureClose = false;
        if (state.toExit) {
          ipcRenderer.send("app-close");
        } else {
          state.close();
        }
      }
    });
  };
  const no = () => {
    state.showSureClose = false;
    state.close();
  };
  return useObserver(() => (
    <Modal
      title={t("modal.save-close.save-close")}
      visible={state.showSureClose}
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
};
