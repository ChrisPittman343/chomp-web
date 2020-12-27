import React, { CSSProperties } from "react";
import "./Spinner.css";

interface Props {
  parentSize?: number;
  style?: CSSProperties;
}

export const Spinner = (props: Props) => {
  const spinnerSize = props.parentSize ? props.parentSize - 10 : 19;
  return (
    <div
      className="spinner"
      style={{ width: spinnerSize, height: spinnerSize, ...props.style }}
    ></div>
  );
};
