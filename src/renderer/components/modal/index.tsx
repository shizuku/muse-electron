import React, { FC } from "react";
import { AboutModal } from "./about-modal";
import { EditMetaModal } from "./edit-meta-modal";
import { ExportModal } from "./export-modal";
import { PreferenceModal } from "./preference-modal";
import { SureCloseModal } from "./sure-close-modal";
import { SureExitModal } from "./sure-exit-modal";
import { observer } from "mobx-react";
import { ModelInjector } from "../model-injector";
import { LocaleStringsInstance } from "../../models/values/strings/locale-strings";

export interface ModalsProps {
  t: LocaleStringsInstance;
  onSave: (cb?: (r: string) => void) => void;
  onClose: () => void;
  onExit: () => void;
}

export const Modals: FC<ModalsProps> = observer(
  ({ t, onSave, onClose, onExit }) => {
    return (
      <ModelInjector>
        {(root) => (
          <>
            <AboutModal model={root.components.modal.about} t={t} />
            <EditMetaModal
              model={root.components.modal.editMeta}
              info={root.notation.info}
              t={t}
            />
            <ExportModal
              model={root.components.modal.export}
              file={root.file}
              config={root.config}
              t={t}
            />
            <PreferenceModal
              model={root.components.modal.preference}
              config={root.config}
              t={t}
            />
            <SureCloseModal
              model={root.components.modal.sureClose}
              onSave={onSave}
              onClose={onClose}
              t={t}
            />
            <SureExitModal
              model={root.components.modal.sureExit}
              onSave={onSave}
              onExit={onExit}
              t={t}
            />
          </>
        )}
      </ModelInjector>
    );
  }
);
