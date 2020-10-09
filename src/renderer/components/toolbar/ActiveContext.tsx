import React from "react";

export const ActiveContext = React.createContext<{
  active: string;
  setActive: (a: string) => void;
}>({
  active: "file",
  setActive: () => {},
});
