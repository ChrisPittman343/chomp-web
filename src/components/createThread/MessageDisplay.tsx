import React, { CSSProperties, useRef, useState } from "react";
import { actionKeys } from "../../constants";
import { inputReducer } from "../../utils/autoFormatMarkdown";
import { MarkdownRenderer } from "../_common/MarkdownRenderer";
import { StyledToggle } from "../_common/StyledToggle";
import "./MessageDisplay.css";

interface Props {
  value: string;
  setValue: Function;
  style?: CSSProperties;
}

export const MessageDisplay = (props: Props) => {
  const { value, setValue } = props;
  const [viewingMD, setViewingMD] = useState(false);
  const [oldHeight, setOldHeight] = useState("200px");
  const box = useRef<HTMLTextAreaElement>(null);

  const autoFormat = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.isTrusted || e.key === "Shift" || e.key === "Control") return;
    let key = e.key;
    key = e.shiftKey ? "Shift " + key : key;
    key = e.ctrlKey ? "Control " + key : key;
    if (!box.current || !actionKeys.includes(key)) return;
    e.preventDefault();
    const res = inputReducer(key, e);
    const [newValue, selectStart, selectEnd] = res;
    box.current.value = newValue;
    setValue(newValue);
    if (box.current && selectStart !== undefined && selectEnd !== undefined) {
      box.current.selectionStart = selectStart;
      box.current.selectionEnd = selectEnd;
    }
  };

  return (
    <div className="message-display" style={{ ...props.style }}>
      <StyledToggle
        setToggle={(bool: boolean) => {
          if (box.current) setOldHeight(box.current.style.height);
          setViewingMD(bool);
        }}
        title="Editing"
        defaultChecked={false}
        style={{ margin: "0 0 7px 14px" }}
      />
      <div className="disp">
        {viewingMD ? (
          <MarkdownRenderer text={value} height={oldHeight} />
        ) : (
          <textarea
            ref={box}
            value={value}
            style={{ height: oldHeight }}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => autoFormat(e)}
            maxLength={6000}
            placeholder="Type your message here."
          />
        )}
      </div>
    </div>
  );
};
