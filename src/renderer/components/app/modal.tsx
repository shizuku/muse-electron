import React, { FC, useState } from "react";
import { Form, Input, Modal, Select } from "antd";
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useAppState } from "./AppStateContext";
import { getAvaliableLangauge } from "../../../shared/locales";

export const EditMetaModal: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  let [title, setTitle] = useState(state.notation?.info.title || "");
  let [subTitle, setSubTitle] = useState(state.notation?.info.subtitle || "");
  let [author, setAuthor] = useState(
    state.notation?.info.author.reduce((a, b) => a + b + "\n", "") || ""
  );
  const handleCancel = () => {
    state.showEditMetaModel = false;
  };
  const handleOk = () => {
    if (state.notation) {
      state.notation.info.title = title;
      state.notation.info.subtitle = subTitle;
      state.notation.info.author = author.split("\n").filter((it) => it !== "");
    }
    state.modified = true;
    state.showEditMetaModel = false;
  };
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onSubTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubTitle(e.target.value);
  };
  const onAuthorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAuthor(e.target.value);
  };
  return useObserver(() => (
    <Modal
      title={t("modal-meta")}
      visible={state.showEditMetaModel}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 0 }}>
        <Form.Item label={t("modal-meta-title")}>
          <Input onChange={onTitleChange} value={title} />
        </Form.Item>
        <Form.Item label={t("modal-meta-subtitle")}>
          <Input onChange={onSubTitleChange} value={subTitle} />
        </Form.Item>
        <Form.Item label={t("modal-meta-author")}>
          <Input.TextArea onChange={onAuthorChange} value={author} rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  ));
};

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

export const SettingsModal: FC = () => {
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
