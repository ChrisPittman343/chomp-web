import React, { CSSProperties, useState } from "react";
import { useParams } from "react-router-dom";
import { createMessageFromFirestore } from "../../utils/firestoreFunction";
import { MessageDisplay } from "../createThread/MessageDisplay";
import { SolidBtn } from "../_common/buttons/SolidBtn";
import { TextBtn } from "../_common/buttons/TextBtn";
import { StyledToggle } from "../_common/StyledToggle";

import "./ReplySection.css";

interface Props {
  style?: CSSProperties;
  setReplying: Function;
  parentId: string;
}

export const ReplySection = (props: Props) => {
  //@ts-ignore
  const { classId, threadId } = useParams();
  const [reply, setReply] = useState("");

  const submitReply = () => {
    createMessageFromFirestore({
      classId,
      threadId,
      parentId: props.parentId,
      message: reply,
    });
  };

  return (
    <div className="reply-section">
      <MessageDisplay
        value={reply}
        setValue={setReply}
        style={{ ...props.style }}
      />
      <div className="reply-actions">
        <TextBtn
          style={{ marginRight: 10, fontSize: 15 }}
          onClick={() => {
            props.setReplying(false);
          }}
        >
          Cancel
        </TextBtn>
        <SolidBtn
          style={{ fontSize: 15, padding: "0 6px 2px 6px" }}
          filled
          onClick={() => submitReply()}
        >
          Reply
        </SolidBtn>
      </div>
    </div>
  );
};
