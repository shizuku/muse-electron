import React, { FC, useEffect, useState } from "react";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import { useObserver } from "mobx-react";
import { ipcRenderer } from "electron";
import { useTranslation } from "react-i18next";
import { useAppState } from "../../states";
import { openNotificationWithIcon } from "../../utils";
import {
  generateScreenshot,
  getFileFolder,
  getFileName,
  getFileNameWithoutExtension,
  getImageArrayBuffer,
  range,
} from "../../../shared/utils";

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
  const [scale, setScale] = useState(state.exportScale);
  useEffect(() => {
    ipcRenderer.on("export-data-reply", (e, code) => {
      if (code === "success") {
        console.log("success", state.exportNum);
        if (state.exportNum <= 1) {
          state.exportConfirm = false;
          state.showExport = false;
          openNotificationWithIcon(
            "success",
            t("notification.export-success"),
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
        generateScreenshot(el, scale).then((c) => {
          getImageArrayBuffer(c).then((s) => {
            ipcRenderer.send("export-data", n, s, idx);
          });
        });
      }, 500);
    });
  };
  return useObserver(() => (
    <Modal
      title={t("modal.export.export")}
      visible={state.showExport}
      onCancel={cancel}
      onOk={ok}
      confirmLoading={state.exportConfirm}
    >
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 0 }}>
        <Form.Item label={t("modal.export.path")}>
          <Input onChange={(v) => setPath(v.target.value)} value={path} />
        </Form.Item>
        <Form.Item label={t("modal.export.name")}>
          <Input onChange={(v) => setName(v.target.value)} value={name} />
        </Form.Item>
        <Form.Item label={t("modal.export.extension")}>
          <Select
            onChange={(v: string) => {
              setExt(v);
            }}
            defaultValue="png"
          >
            <Select.Option key="png" value="png">
              {"png"}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label={t("modal.preference.export-scale")}>
          <InputNumber
            onChange={(v) => {
              if (typeof v === "number") setScale(v);
              else if (typeof v === "string") setScale(parseFloat(v));
            }}
            value={scale}
            defaultValue={scale}
            min={1.0}
            max={4.0}
            step={0.1}
          ></InputNumber>
        </Form.Item>
      </Form>
      {range(state.rs.length).map((i) => (
        <p key={i}>{`${path}${name}-${i + 1}.${ext}`}</p>
      ))}
    </Modal>
  ));
};
