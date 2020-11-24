import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";

export const defaultDimens: DimensSnapshotIn = {
  pageGap: 1,
  pageHeight: 1,
  pageWidth: 1,
};

export const DimensModel = types.model("Dimens").props({
  pageWidth: types.frozen(types.number),
  pageGap: types.frozen(types.number),
  pageHeight: types.frozen(types.number),
});

export type DimensInstance = Instance<typeof DimensModel>;
export type DimensSnapshotIn = SnapshotIn<typeof DimensModel>;
export type DimensSnapshotOut = SnapshotOut<typeof DimensModel>;
