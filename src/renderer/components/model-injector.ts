import React, { FC } from "react";
import { inject, observer } from "mobx-react";
import { RootInstance } from "../models";

export interface ModelInjectorProps {
  root: RootInstance;
  children: (root: RootInstance) => React.ReactNode;
}

export const ModelInjector = inject("root")(
  observer((({ root, children }) => {
    return children(root!);
  }) as FC<ModelInjectorProps>)
);
