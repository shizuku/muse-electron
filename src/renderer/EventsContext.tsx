import React from "react";

export interface Events {
  onSave: () => void;
  onSaveAs: () => void;
  onPrint: () => void;
  onUndo: () => void;
  onRedo: () => void;
}

export const EventsContext = React.createContext<Events>({
  onSave: () => {},
  onSaveAs: () => {},
  onPrint: () => {},
  onUndo: () => {},
  onRedo: () => {},
});
