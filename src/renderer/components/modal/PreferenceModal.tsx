import React, { useState, FC } from "react";
import { Form, Modal, Select, InputNumber } from "antd";
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { getAvaliableLangauge } from "../../../shared/locales";
import { useAppState } from "../../states";

export const PreferenceModal: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  let [lang, setLang] = useState("auto");
  let [scale, setScale] = useState(state.exportScale);
  const onCancel = () => {
    state.showSettings = false;
  };
  const onOk = () => {
    state.onSetLanguage(lang);
    state.onSetExportScale(scale);
    state.showSettings = false;
  };
  return useObserver(() => (
    <Modal
      title={t("modal.preference.preference")}
      visible={state.showSettings}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 0 }}>
        <Form.Item label={t("modal.preference.language")}>
          <Select
            onChange={(v: string) => {
              setLang(v);
            }}
            defaultValue={state.langConf}
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
};
