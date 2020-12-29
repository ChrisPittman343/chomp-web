import React, { CSSProperties } from "react";
import "./TextBtn.css";

interface Props {
  children: any;
  underline?: boolean;
  onClick?: Function;
  style?: CSSProperties;
}

export const TextBtn = (props: Props) => {
  const underline = props.underline ? "underline" : "";
  return (
    <button
      className={`btn-reset ${underline} text-btn`}
      style={props.style}
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
      }}
    >
      {props.children}
    </button>
  );
};
