import React, { FC } from "react";
import { Modal } from "antd";
import { observer } from "mobx-react";
import { ExternalLink } from "../../utils";
import pack from "../../../../package.json";
import { AboutModalInstance } from "../../models/components/modal/about";
import "./about.css";
import { LocaleStringsInstance } from "../../models/values/strings/locale-strings";

export interface AboutModalProps {
  model: AboutModalInstance;
  t: LocaleStringsInstance;
}

export const AboutModal: FC<AboutModalProps> = observer(({ model, t }) => {
  const cancel = () => {
    model.hide();
  };
  return (
    <Modal
      title={t["modal_about"]}
      visible={model.ifShow}
      onCancel={cancel}
      footer={[]}
    >
      <div className="about">
        <ExternalLink url="https://github.com/shizuku/muse-electron">
          <div className="about__title">
            {t["app-name"] + " v" + pack.version}
          </div>
        </ExternalLink>
        <div className="about__content">
          <p>{t["modal_about_content"]}</p>
          <p>{t["modal_about_special"]}</p>
        </div>
        <div className="about__bottom">
          <div className="about__bottom__left">
            <ExternalLink url="https://github.com/shizuku/muse-electron">
              <div className="about__item">{"©2020 " + t["app-name"]}</div>
            </ExternalLink>
          </div>
          <div className="about__bottom__right">
            <ExternalLink url="https://shizuku.github.io/muse-electron">
              <div className="about__item">{t["modal_about_help"]}</div>
            </ExternalLink>
            <ExternalLink url="https://github.com/shizuku/muse-electron/blob/master/LICENSE">
              <div className="about__item">{t["modal_about_license"]}</div>
            </ExternalLink>
            <ExternalLink url="https://github.com/shizuku/muse-electron/issues">
              <div className="about__item">{t["modal_about_issues"]}</div>
            </ExternalLink>
            <ExternalLink url="https://github.com/shizuku/muse-electron/releases">
              <div className="about__item">{t["modal_about_releases"]}</div>
            </ExternalLink>
          </div>
        </div>
      </div>
    </Modal>
  );
});
