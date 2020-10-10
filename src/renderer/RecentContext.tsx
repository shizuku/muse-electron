import React from "react";

export type FileInfo = {
  name: string;
  path: string;
};

export const RecentContext = React.createContext<{
  files: FileInfo[];
  addFile: (f: FileInfo) => void;
}>({
  files: [],
  addFile: () => {},
});
