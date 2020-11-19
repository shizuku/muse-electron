import React, { useState, FC } from "react";
import { Form, Modal, Select, InputNumber } from "antd";
import { observer, useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { getAvaliableLangauge } from "../../../shared/locales";
import { PreferenceModalInstance } from "../../models/components/modal/preference";
import { ConfigInstance } from "../../models/config";

export interface PreferenceModalProps {
  model: PreferenceModalInstance;
  config: ConfigInstance;
}

//TODO: add theme
export const PreferenceModal: FC<PreferenceModalProps> = observer(
  ({ model, config }) => {
    const { t } = useTranslation();
    let [lang, setLang] = useState(config.confLang);
    let [scale, setScale] = useState(config.exportScale);
    const onCancel = () => {
      model.hide();
    };
    const onOk = () => {
      config.setConfLang(lang);
      config.setExportScale(scale);
      model.hide();
    };
    return useObserver(() => (
      <Modal
        title={t("modal.preference.preference")}
        visible={model.ifShow}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 0 }}>
          <Form.Item label={t("modal.preference.language")}>
            <Select
              onChange={(v: string) => {
                setLang(v);
              }}
              defaultValue={config.confLang}
            >
              <Select.Option value={"auto"} key={"auto"}>
                {t("modal.preference.language-auto")}
              </Select.Option>
              {getAvaliableLangauge().map((it) => (
                <Select.Option value={it.value} key={it.value}>
                  {it.label}
                </Select.Option>
              ))}
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
      </Modal>
    ));
  }
);
