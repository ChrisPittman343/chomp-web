import React, { CSSProperties } from "react";
import "./TextBtn.css";

interface Props {
  children: any;
  onClick: Function;
  style?: CSSProperties;
}

export const TextBtn = (props: Props) => {
  return (
    <button
      className="btn-reset normal-txt text-btn"
      style={props.style}
      onClick={(e) => props.onClick(e)}
    >
      {props.children}
    </button>
  );
};
