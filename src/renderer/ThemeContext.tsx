import React from "react";

export interface Theme {
  colorBackground: string;
  colorPrimary: string;
  colorPrimaryLight: string;
  colorPrimaryDark: string;
  colorSuccess: string;
  colorWarning: string;
  colorDanger: string;
}

export const defaultTheme: Theme = {
  colorBackground: "#FFFFFF",
  colorPrimary: "#20A0FF",
  colorPrimaryLight: "#58B7FF",
  colorPrimaryDark: "#1D8CE0",
  colorSuccess: "#13CE66",
  colorWarning: "#F7BA2A",
  colorDanger: "#FF4949",
};

export const ThemeContext = React.createContext<Theme>(defaultTheme);
