import React, { FC, useEffect, useState } from "react";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import { FolderOpenOutlined } from "@ant-design/icons";
import { useObserver } from "mobx-react";
import { ipcRenderer } from "electron";
import { useTranslation } from "react-i18next";
import { parse, join } from "path";
import { useAppState } from "../../states";
import { openNotificationWithIcon } from "../../utils";
import {
  generateScreenshot,
  getImageArrayBuffer,
  range,
} from "../../../shared/utils";

export const ExportModal: FC = () => {
  let state = useAppState();
  let p = parse(state.currentFile?.path || "");
  const { t } = useTranslation();
  const [path, setPath] = useState(p.dir);
  const [name, setName] = useState(p.name);
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
    return function() {
      ipcRenderer.removeAllListeners("export-data-reply");
    };
  });
  const cancel = () => {
    state.showExport = false;
  };
  const ok = () => {
    state.exportConfirm = true;
    state.exportNum = state.pages.length;
    state.pages.forEach((el, idx) => {
      let n = `${join(path, name)}-${idx + 1}.${ext}`;
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
  const onChooseFolder = () => {
    ipcRenderer.once("choose-folder-reply", (ev, code: string, p: string) => {
      if (code === "success") {
        setPath(p);
      }
    });
    ipcRenderer.send("choose-folder");
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
          <Input.Search
            onChange={(v) => setPath(v.target.value)}
            value={path}
            enterButton={<FolderOpenOutlined />}
            onSearch={onChooseFolder}
          />
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
      <div>
        {range(state.pages.length).map((i) => {
          return <p key={i}>{`${join(path, name)}-${i + 1}.${ext}`}</p>;
        })}
      </div>
    </Modal>
  ));
};
