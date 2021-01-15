import React, { CSSProperties } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import "./StyledToggle.css";
import edit from "../../images/editing_icon.svg";
import markdown from "../../images/markdown_icon.svg";

interface Props {
  setToggle: Function;
  defaultChecked?: boolean;
  style?: CSSProperties;
}

export const StyledToggle = ({
  setToggle,
  defaultChecked = true,
  style,
}: Props) => {
  return (
    <div className="styled-toggle" style={style}>
      <label htmlFor="toggle edit mode">
        <Toggle
          defaultChecked={defaultChecked}
          onChange={(e) => setToggle(!e.target.checked)}
          icons={{
            checked: (
              <img
                alt="edit"
                src={edit}
                width={16}
                height={16}
                style={{ position: "absolute", top: -2.5, left: -2 }}
              />
            ),
            unchecked: (
              <img
                alt="edit"
                src={markdown}
                width={18}
                height={18}
                style={{ position: "absolute", top: -3.5, right: -5 }}
              />
            ),
          }}
        />
      </label>
    </div>
  );
};
