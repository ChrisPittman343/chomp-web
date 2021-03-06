import React from "react";

interface Props {
  tag: string;
}

export const ThreadTag = (props: Props) => {
  return (
    <div
      className="thread-tag bold"
      style={{
        display: "inline-block",
        margin: "0 10px",
        fontSize: 16,
        borderRadius: 5,
        border: "1px solid var(--bright-red)",
        width: "fit-content",
        padding: 3,
      }}
    >
      {props.tag}
    </div>
  );
};
