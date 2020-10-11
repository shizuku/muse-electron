import React, { FC, useEffect, useRef } from "react";
import { Heights } from "../../app";
import "./style.css";

export const Footer: FC<{ h: Heights }> = ({ h }: { h: Heights }) => {
  let r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    h.footer = r.current?.clientHeight || 0;
  });
  return (
    <div className="footer" ref={r} style={{ background: "#1890ff" }}>
      Footer
    </div>
  );
};
