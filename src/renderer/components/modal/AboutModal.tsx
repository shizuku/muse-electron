import React, { FC } from "react";
import { Modal } from "antd";
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useAppState } from "../../states";
import { ExternalLink } from "../../utils";
import pack from "../../../../package.json";
import "./about.css";

export const AboutModal: FC = () => {
  let state = useAppState();
  const { t } = useTranslation();
  const cancel = () => {
    state.showAboutModel = false;
  };
  return useObserver(() => (
    <Modal
      title={t("modal.about.about")}
      visible={state.showAboutModel}
      onCancel={cancel}
      footer={[]}
    >
      <div className="about">
        <ExternalLink url="https://github.com/shizuku/muse-electron">
          <div className="about__title">
            {t("app-name") + " v" + pack.version}
          </div>
        </ExternalLink>
        <div className="about__content">
          <p>{t("modal.about.content")}</p>
          <p>{t("modal.about.thanks")}</p>
          <p>{t("modal.about.special-thanks")}</p>
        </div>
        <div className="about__bottom">
          <div className="about__bottom__left">
            <ExternalLink url="https://github.com/shizuku/muse-electron">
              <div className="about__item">{"©2020 " + t("app-name")}</div>
            </ExternalLink>
          </div>
          <div className="about__bottom__right">
            <ExternalLink url="https://github.com/shizuku/muse-electron/blob/master/LICENSE">
              <div className="about__item">{t("modal.about.license")}</div>
            </ExternalLink>
            <ExternalLink url="https://github.com/shizuku/muse-electron/issues">
              <div className="about__item">{t("modal.about.issues")}</div>
            </ExternalLink>
            <ExternalLink url="https://github.com/shizuku/muse-electron/releases">
              <div className="about__item">{t("modal.about.releases")}</div>
            </ExternalLink>
          </div>
        </div>
      </div>
    </Modal>
  ));
};
