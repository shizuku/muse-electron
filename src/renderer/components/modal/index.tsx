import React, { FC } from "react";
import { AboutModal } from "./about-modal";
import { EditMetaModal } from "./edit-meta-modal";
import { ExportModal } from "./export-modal";
import { PreferenceModal } from "./preference-modal";
import { SureCloseModal } from "./sure-close-modal";
import { SureExitModal } from "./sure-exit-modal";
import { observer } from "mobx-react";
import { ModelInjector } from "../model-injector";

export interface ModalsProps {
  onExit: () => void;
  onClose: () => void;
  onSave: (cb: (r: string) => void) => void;
}

export const Modals: FC<ModalsProps> = observer(
  ({ onSave, onClose, onExit }) => {
    return (
      <>
        <ModelInjector>
          {(root) => <AboutModal model={root.components.modal.about} />}
        </ModelInjector>
        <ModelInjector>
          {(root) => (
            <EditMetaModal
              model={root.components.modal.editMeta}
              info={root.notation.info}
            />
          )}
        </ModelInjector>
        <ModelInjector>
          {(root) => (
            <ExportModal
              model={root.components.modal.export}
              file={root.file}
              config={root.config}
            />
          )}
        </ModelInjector>
        <ModelInjector>
          {(root) => (
            <PreferenceModal
              model={root.components.modal.preference}
              config={root.config}
            />
          )}
        </ModelInjector>
        <ModelInjector>
          {(root) => (
            <SureCloseModal
              model={root.components.modal.sureClose}
              onClose={onClose}
              onSave={onSave}
            />
          )}
        </ModelInjector>
        <ModelInjector>
          {(root) => (
            <SureExitModal
              model={root.components.modal.sureExit}
              onExit={onExit}
              onSave={onSave}
            />
          )}
        </ModelInjector>
      </>
    );
  }
);
