import React, { useState, FC } from "react";
import { Form, Input, Modal, Select } from "antd";
import { observer } from "mobx-react";
import { toneMarks } from "../../../shared/const";
import { EditMetaModalInstance } from "../../models/components/modal/edit-meta";
import { NotationInfoInstance } from "../../models/notation/info";
import { LocaleStringsInstance } from "../../models/values/strings/locale-strings";

export interface EditMetaModalProps {
  model: EditMetaModalInstance;
  info: NotationInfoInstance;
  t: LocaleStringsInstance;
}

export const EditMetaModal: FC<EditMetaModalProps> = observer(
  ({ model, info, t }) => {
    let [title, setTitle] = useState(info.title);
    let [subtitle, setSubtitle] = useState(info.subtitle);
    let [author, setAuthor] = useState(info.author);
    let [mark, setMark] = useState(info.mark);
    const handleCancel = () => {
      model.hide();
    };
    const handleOk = () => {
      info.update({
        title,
        subtitle,
        author,
        mark,
      });
      model.hide();
    };
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    };
    const onSubTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubtitle(e.target.value);
    };
    const onAuthorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setAuthor(e.target.value);
    };
    return (
      <Modal
        title={t["modal_meta"]}
        visible={model.ifShow}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form labelCol={{ span: 3 }} wrapperCol={{ span: 0 }}>
          <Form.Item label={t["modal_meta_title"]}>
            <Input
              onChange={onTitleChange}
              value={title}
              defaultValue={title}
            />
          </Form.Item>
          <Form.Item label={t["modal_meta_subtitle"]}>
            <Input
              onChange={onSubTitleChange}
              value={subtitle}
              defaultValue={subtitle}
            />
          </Form.Item>
          <Form.Item label={t["modal_meta_author"]}>
            <Input.TextArea onChange={onAuthorChange} value={author} rows={4} />
          </Form.Item>
          <Form.Item label={t["modal_meta_mark"]}>
            <Select
              onChange={(v: string) => {
                setMark(v);
              }}
              defaultValue={mark}
            >
              {toneMarks.map((it) => (
                <Select.Option key={it} value={it}>
                  {it}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);
