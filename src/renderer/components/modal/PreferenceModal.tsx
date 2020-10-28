import React, { useState, FC } from "react";
import { Form, Modal, Select } from "antd";
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { getAvaliableLangauge } from "../../../shared/locales";
import { useAppState } from "../../states";

export const PreferenceModal: FC = () => {
  let state = useAppState();
  const { t, i18n } = useTranslation();
  let [lang, setLang] = useState("auto");
  const onCancel = () => {
    state.showSettings = false;
  };
  const onOk = () => {
    state.events?.onSetLanguage(lang);
    state.showSettings = false;
  };
  return useObserver(() => (
    <Modal
      title={t("modal-settings")}
      visible={state.showSettings}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 0 }}>
        <Form.Item label={t("modal-settings-language")}>
          <Select
            onChange={(v: string) => {
              setLang(v);
            }}
            defaultValue={state.langConf}
          >
            <Select.Option value={"auto"} key={"auto"}>
              {t("modal-settings-language-auto")}
            </Select.Option>
            {getAvaliableLangauge().map((it) => (
              <Select.Option value={it.value} key={it.value}>
                {it.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  ));
};
