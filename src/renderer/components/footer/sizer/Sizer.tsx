import React, { FC } from "react";
import { observer } from "mobx-react";
import { InputNumber, Popover } from "antd";
import { FileInstance } from "../../../models/file";
import { ThemeItemInstance } from "../../../models/values/themes/theme-item";
import { RootInstance } from "../../../models";
import { ModelInjector } from "../../model-injector";
import "./style.css";
import { LocaleStringsInstance } from "../../../models/values/strings/locale-strings";
import { StringsInstance } from "../../../models/values/strings";

export interface PopupItemProps {
  x: number;
  t: string;
  file: FileInstance;
  theme: ThemeItemInstance;
}

const PopItem: FC<PopupItemProps> = observer(({ x, t, file, theme }) => {
  return (
    <div
      className="pop-item"
      style={
        file.conf.sizer === x
          ? { background: theme.footerPopupActiveBackground }
          : {}
      }
      onClick={() => file.conf.setSizer(x)}
    >
      {t}
    </div>
  );
});

export interface PopupProps {
  root: RootInstance;
}

const PopContent: FC<PopupProps> = observer(({ root }) => {
  let t = root.values.strings.t;
  console.log(root.fitWidthSizer, root.fitHeightSizer);
  return (
    <ModelInjector>
      {(root) => (
        <div className="pop-content">
          <PopItem
            x={root.fitWidthSizer}
            t={t["footer_sizer_fit-width"]}
            file={root.file}
            theme={root.values.themes.t}
          />
          <PopItem
            x={root.fitHeightSizer}
            t={t["footer_sizer_fit-height"]}
            file={root.file}
            theme={root.values.themes.t}
          />
          <PopItem
            x={300}
            t="300%"
            file={root.file}
            theme={root.values.themes.t}
          />
          <PopItem
            x={250}
            t="250%"
            file={root.file}
            theme={root.values.themes.t}
          />
          <PopItem
            x={150}
            t="150%"
            file={root.file}
            theme={root.values.themes.t}
          />
          <PopItem
            x={100}
            t="100%"
            file={root.file}
            theme={root.values.themes.t}
          />
          <PopItem
            x={75}
            t="75%"
            file={root.file}
            theme={root.values.themes.t}
          />
          <PopItem
            x={50}
            t="50%"
            file={root.file}
            theme={root.values.themes.t}
          />
          <PopItem
            x={25}
            t="25%"
            file={root.file}
            theme={root.values.themes.t}
          />
        </div>
      )}
    </ModelInjector>
  );
});

export interface SizerProps {
  file: FileInstance;
  t: LocaleStringsInstance;
}

export const Sizer: FC<SizerProps> = observer(({ file, t }) => {
  const onChange = (v: string | number | undefined) => {
    let x = 0;
    switch (typeof v) {
      case "number":
        x = Math.floor(v * 100) / 100;
        break;
      case "string":
        x = Math.floor(parseFloat(v) * 100) / 100;
        break;
      default:
        x = 100;
    }
    file.conf.setSizer(x);
  };

  return (
    <div className="sizer">
      <Popover
        content={
          <ModelInjector>{(root) => <PopContent root={root} />}</ModelInjector>
        }
        title={t["footer_sizer"]}
      >
        <InputNumber
          size="small"
          defaultValue={file.conf.sizer * 100}
          min={10}
          max={500}
          formatter={(value) => `${parseInt(value?.toString() || "100", 10)}%`}
          parser={(value) => parseInt(value?.replace("%", "") || "100", 10)}
          value={file.conf.sizer * 100}
          onChange={onChange}
        />
      </Popover>
    </div>
  );
});
