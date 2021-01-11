import React, { useState } from "react";
import "./TagBtn.css";

interface Props {
  tag: string;
  toggleTag: (b: boolean) => void;
}

export const TagBtn = (props: Props) => {
  const [checked, setChecked] = useState(false);
  return (
    <button
      className={`btn-reset  round tag-btn bold ${checked ? "checked" : ""}`}
      onClick={() => {
        checked ? props.toggleTag(false) : props.toggleTag(true);
        setChecked(!checked);
      }}
      title={props.tag}
    >
      {props.tag}
    </button>
  );
};
