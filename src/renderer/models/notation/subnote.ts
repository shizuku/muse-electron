import { Instance, types } from "mobx-state-tree";

export const SubnoteModel = types.model("Subnote").props({
    
});

export type SubnoteInstance = Instance<typeof SubnoteModel>;
