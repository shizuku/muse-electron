import React, { FC } from "react";
import { AboutModal } from "./about-modal";
import { EditMetaModal } from "./edit-meta-modal";
import { ExportModal } from "./export-modal";
import { PreferenceModal } from "./preference-modal";
import { SureCloseModal } from "./sure-close-modal";
import { SureExitModal } from "./sure-exit-modal";
import { observer } from "mobx-react";
import { ModelInjector } from "../model-injector";

export const Modals: FC = observer(() => {
  return (
    <ModelInjector>
      {(root) => (
        <>
          <AboutModal model={root.components.modal.about} />
          <EditMetaModal
            model={root.components.modal.editMeta}
            info={root.notation.info}
          />
          <ExportModal
            model={root.components.modal.export}
            file={root.file}
            config={root.config}
          />
          <PreferenceModal
            model={root.components.modal.preference}
            config={root.config}
          />
          <SureCloseModal
            model={root.components.modal.sureClose}
            file={root.file}
          />
          <SureExitModal
            model={root.components.modal.sureExit}
            file={root.file}
            root={root}
          />
        </>
      )}
    </ModelInjector>
  );
});
