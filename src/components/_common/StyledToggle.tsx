import React, { CSSProperties, useState } from "react";
import "./StyledToggle.css";
import edit from "../../images/editing_icon.svg";
import markdown from "../../images/markdown_icon.svg";

interface Props {
  title: string;
  defaultChecked?: boolean;
  style?: CSSProperties;
  setToggle: (b: boolean) => any;
}

export const StyledToggle = ({ defaultChecked = true, ...props }: Props) => {
  const [on, setOn] = useState(defaultChecked);

  return (
    <label htmlFor={props.title}>
      <div className="styled-toggle" style={{ ...props.style }}>
        <span className="bold" style={{ paddingRight: 7 }}>
          {props.title}:
        </span>
        <div
          role="checkbox"
          aria-checked={on}
          className={`slider-body ${on ? "slider-on" : "slider-off"}`}
          onClick={() => {
            setOn(!on);
            props.setToggle(!on);
          }}
        >
          <div className="slider-ball" />
        </div>
      </div>
    </label>
  );
};
