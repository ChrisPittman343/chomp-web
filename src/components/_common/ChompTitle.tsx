import React from "react";
import chompTitle from "../../images/title.svg";
import "./ChompTitle.css";

interface Props {
  style?: React.CSSProperties;
}

export const ChompTitle = (props: Props) => {
  return (
    <img
      alt="Chomp"
      src={chompTitle}
      style={{ height: "45px", ...props.style }}
      className="chomp-title"
    />
  );
};
