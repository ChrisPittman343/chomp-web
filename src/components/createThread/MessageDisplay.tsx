import React, { useRef, useState } from "react";
import { actionKeys } from "../../constants";
import { inputReducer } from "../../utils/autoFormatMarkdown";
import { TextBtn } from "../_common/buttons/TextBtn";
import { MarkdownRenderer } from "../_common/MarkdownRenderer";
import "./MessageDisplay.css";
interface Props {
  value: string;
  setValue: Function;
}

export const MessageDisplay = (props: Props) => {
  const { value, setValue } = props;
  const [viewingMD, setViewingMD] = useState(false);
  const [oldHeight, setOldHeight] = useState("300px");
  const box = useRef<HTMLTextAreaElement>(null);

  const autoFormat = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.isTrusted || e.key === "Shift" || e.key === "Control") return;
    let key = e.key;
    key = e.shiftKey ? "Shift " + key : key;
    key = e.ctrlKey ? "Control " + key : key;
    if (!box.current || !actionKeys.includes(key)) return;
    e.preventDefault();
    const res = inputReducer(key, e);
    if (!res) return;
    const [newValue, selectStart, selectEnd] = res;
    box.current.value = newValue;
    setValue(newValue);
    if (box.current && selectStart !== undefined && selectEnd !== undefined) {
      box.current.selectionStart = selectStart;
      box.current.selectionEnd = selectEnd;
    }
  };

  return (
    <div className="message-display">
      <label htmlFor="thread message" className="bold normal-txt">
        Message
        <br />
        <br />
      </label>
      <TextBtn
        onClick={() => {
          if (box.current) setOldHeight(box.current.style.height);
          setViewingMD(!viewingMD);
        }}
      >
        View {viewingMD ? "Raw" : "MD"}
      </TextBtn>
      {viewingMD ? (
        <MarkdownRenderer text={value} />
      ) : (
        <textarea
          ref={box}
          value={value}
          style={{ height: oldHeight }}
          onChange={(e) => setValue(e.target.value)}
          onKeyDownCapture={(e) => autoFormat(e)}
        />
      )}
    </div>
  );
};
