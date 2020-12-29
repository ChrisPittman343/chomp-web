import React, { CSSProperties } from "react";
import "./SolidBtn.css";

interface Props {
  children: any;
  filled?: boolean;
  onClick?: Function;
  style?: CSSProperties;
}

export const SolidBtn = (props: Props) => {
  const filled = props.filled ? "filled-solid-btn" : "solid-btn";
  return (
    <button
      className={`btn-reset normal-txt round ${filled}`}
      style={props.style}
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
      }}
    >
      {props.children}
    </button>
  );
};
