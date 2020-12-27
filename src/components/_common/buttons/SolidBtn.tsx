import React, { CSSProperties } from "react";
import "./SolidBtn.css";

interface Props {
  children: any;
  onClick: Function;
  style?: CSSProperties;
}

export const SolidBtn = (props: Props) => {
  return (
    <button
      className="btn-reset normal-txt solid-btn"
      style={props.style}
      onClick={(e) => props.onClick(e)}
    >
      {props.children}
    </button>
  );
};
