import React, { FC, useEffect, useState } from "react";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import { FolderOpenOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { ipcRenderer } from "electron";
import { parse, join } from "path";
import { openNotificationWithIcon } from "../../utils";
import {
  generateScreenshot,
  getImageArrayBuffer,
  range,
} from "../../../shared/utils";
import { ExportModalInstance } from "../../models/components/modal/export";
import { ConfigInstance } from "../../models/config";
import { FileInstance } from "../../models/file";
import { LocaleStringsInstance } from "../../models/values/strings/locale-strings";

export interface ExportModalProps {
  model: ExportModalInstance;
  file: FileInstance;
  config: ConfigInstance;
  t: LocaleStringsInstance;
}

export const ExportModal: FC<ExportModalProps> = observer(
  ({ model, file, config, t }) => {
    let p = parse(file.conf.path);
    const [path, setPath] = useState(p.dir);
    const [name, setName] = useState(p.name);
    const [ext, setExt] = useState("png");
    const [scale, setScale] = useState(config.exportScale);
    useEffect(() => {
      ipcRenderer.on("export-data-reply", (e, code) => {
        if (code === "success") {
          console.log("success", model.num);
          if (model.num <= 1) {
            model.unConfirm();
            model.hide();
            openNotificationWithIcon(
              "success",
              t["notification_export-success"],
              "",
              "bottomRight"
            );
          } else {
            model.setNum(model.num - 1);
          }
        }
      });
      return function() {
        ipcRenderer.removeAllListeners("export-data-reply");
      };
    });
    const cancel = () => {
      model.hide();
    };
    const ok = () => {
      model.confirm();
      model.setNum(file.pages.length);
      file.pages.forEach((el, idx) => {
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
    return (
      <Modal
        title={t["modal_export"]}
        visible={model.ifShow}
        onCancel={cancel}
        onOk={ok}
        confirmLoading={model.isConfirm}
      >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 0 }}>
          <Form.Item label={t["modal_export_path"]}>
            <Input.Search
              onChange={(v) => setPath(v.target.value)}
              value={path}
              enterButton={<FolderOpenOutlined />}
              onSearch={onChooseFolder}
            />
          </Form.Item>
          <Form.Item label={t["modal_export_name"]}>
            <Input onChange={(v) => setName(v.target.value)} value={name} />
          </Form.Item>
          <Form.Item label={t["modal_export_ext"]}>
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
          <Form.Item label={t["modal_preference_export-scale"]}>
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
          {range(model.num).map((i) => {
            return <p key={i}>{`${join(path, name)}-${i + 1}.${ext}`}</p>;
          })}
        </div>
      </Modal>
    );
  }
);
