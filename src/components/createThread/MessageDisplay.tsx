import React from "react";
import { MarkdownRenderer } from "../_common/MarkdownRenderer";
import "./MessageDisplay.css";
interface Props {
  value: string;
  setValue: Function;
}

export const MessageDisplay = (props: Props) => {
  const { value, setValue } = props;
  return (
    <div className="message-display">
      <label htmlFor="thread message" className="bold normal-txt">
        Message{" "}
      </label>
      <textarea value={value} onChange={(e) => setValue(e.target.value)} />
      <MarkdownRenderer text={value} />
    </div>
  );
};
