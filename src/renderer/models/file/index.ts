import { Instance, types } from "mobx-state-tree";
import { ClosedFileModel } from "./closed";
import { OpenedFileModel } from "./opened";

export const FileModel = types.union(OpenedFileModel, ClosedFileModel);

export type FileInstance = Instance<typeof FileModel>;
