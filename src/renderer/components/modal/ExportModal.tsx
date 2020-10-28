import React, { FC, useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";
import { useObserver } from "mobx-react";
import { ipcRenderer } from "electron";
import { useTranslation } from "react-i18next";
import { useAppState } from "../../states";
import {
  generateScreenshot,
  getFileFolder,
  getFileName,
  getFileNameWithoutExtension,
  getImageArrayBuffer,
  range,
} from "../../../shared/utils";
import { openNotificationWithIcon } from "../../utils";

export const ExportModal: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  const [path, setPath] = useState(
    getFileFolder(state.currentFile?.path || "")
  );
  const [name, setName] = useState(
    getFileNameWithoutExtension(getFileName(state.currentFile?.path || ""))
  );
  const [ext, setExt] = useState("png");
  useEffect(() => {
    ipcRenderer.on("export-data-reply", (e, code) => {
      if (code === "success") {
        console.log("success", state.exportNum);
        if (state.exportNum <= 1) {
          state.exportConfirm = false;
          state.showExport = false;
          openNotificationWithIcon(
            "success",
            t("notifiction-export-success"),
            "",
            "bottomRight"
          );
        } else {
          state.exportNum = state.exportNum - 1;
        }
      }
    });
    return function () {
      ipcRenderer.removeAllListeners("export-data-reply");
    };
  });
  const cancel = () => {
    state.showExport = false;
  };
  const ok = () => {
    state.exportConfirm = true;
    state.exportNum = state.rs.length;
    state.rs.forEach((el, idx) => {
      let n = `${path}${name}-${idx + 1}.${ext}`;
      console.log("export:", n);
      setTimeout(() => {
        generateScreenshot(el).then((c) => {
          getImageArrayBuffer(c).then((s) => {
            ipcRenderer.send("export-data", n, s, idx);
          });
        });
      }, 500);
    });
  };
  return useObserver(() => (
    <Modal
      title={t("modal-export")}
      visible={state.showExport}
      onCancel={cancel}
      onOk={ok}
      confirmLoading={state.exportConfirm}
    >
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 0 }}>
        <Form.Item label={t("modal-export-path")}>
          <Input onChange={(v) => setPath(v.target.value)} value={path} />
        </Form.Item>
        <Form.Item label={t("modal-export-name")}>
          <Input onChange={(v) => setName(v.target.value)} value={name} />
        </Form.Item>
        <Form.Item label={t("modal-export-extension")}>
          <Input
            onChange={(v) => setExt(v.target.value)}
            value={ext}
            disabled
          />
        </Form.Item>
        {range(state.rs.length).map((i) => (
          <div key={i}>{`${path}${name}-${i + 1}.${ext}`}</div>
        ))}
      </Form>
    </Modal>
  ));
};
