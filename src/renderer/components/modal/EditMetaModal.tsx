import React, { useState, FC } from "react";
import { Form, Input, Modal, Select } from "antd";
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useAppState } from "../../states";

export const EditMetaModal: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  let [title, setTitle] = useState(state.notation?.info.title || "");
  let [subTitle, setSubTitle] = useState(state.notation?.info.subtitle || "");
  let [author, setAuthor] = useState(
    state.notation?.info.author.reduce((a, b) => a + b + "\n", "") || ""
  );
  let [mark, setMark] = useState("C");
  const handleCancel = () => {
    state.showEditMetaModel = false;
  };
  const handleOk = () => {
    state.beforeModify();
    if (state.notation) {
      state.notation.info.title = title;
      state.notation.info.subtitle = subTitle;
      state.notation.info.author = author.split("\n").filter((it) => it !== "");
      state.notation.info.C = mark;
    }
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
      title={t("modal.meta.meta")}
      visible={state.showEditMetaModel}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 0 }}>
        <Form.Item label={t("modal.meta.title")}>
          <Input onChange={onTitleChange} value={title} defaultValue={title} />
        </Form.Item>
        <Form.Item label={t("modal.meta.subtitle")}>
          <Input
            onChange={onSubTitleChange}
            value={subTitle}
            defaultValue={subTitle}
          />
        </Form.Item>
        <Form.Item label={t("modal.meta.author")}>
          <Input.TextArea onChange={onAuthorChange} value={author} rows={4} />
        </Form.Item>
        <Form.Item label={t("modal.meta.mark")}>
          <Select
            onChange={(v: string) => {
              setMark(v);
            }}
            defaultValue={mark}
          >
            <Select.Option key="C" value="C">
              {"C"}
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  ));
};
