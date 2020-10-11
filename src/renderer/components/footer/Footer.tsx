import React, { FC, useEffect, useRef } from "react";
import { Heights } from "../../app";
import { ThemeContext } from "../../ThemeContext";
import "./style.css";

export const Footer: FC<{ h: Heights }> = ({ h }: { h: Heights }) => {
  let r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    h.footer = r.current?.clientHeight || 0;
  });
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div
          className="footer"
          ref={r}
          style={{
            background: theme.colorPrimary,
            color: theme.colorBackground,
          }}
        >
          Footer
        </div>
      )}
    </ThemeContext.Consumer>
  );
};
