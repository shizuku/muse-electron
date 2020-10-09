import React from "react";

export type File = {
  fileName: string;
  filePath: string;
  data: string;
};

export const FileContext = React.createContext<File>({
  fileName: "",
  filePath: "",
  data: "",
});
