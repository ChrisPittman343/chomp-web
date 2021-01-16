import React, { CSSProperties, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addNewMessage } from "../../redux/messagesSlice";
import { MessageDisplay } from "../createThread/MessageDisplay";
import { SolidBtn } from "../_common/buttons/SolidBtn";
import { TextBtn } from "../_common/buttons/TextBtn";

import "./ReplySection.css";

interface Props {
  style?: CSSProperties;
  setReplying: Function;
  parentId: string;
  cancellable?: boolean;
}

export const ReplySection = ({ cancellable = true, ...props }: Props) => {
  //@ts-ignore
  const { classId, threadId } = useParams();
  const dispatch = useDispatch();
  const [reply, setReply] = useState("");

  const submitReply = () => {
    dispatch(
      addNewMessage({
        classId,
        threadId,
        parentId: props.parentId,
        message: reply,
      })
    );
    props.setReplying(false);
    setReply("");
  };

  return (
    <div className="reply-section">
      <MessageDisplay
        value={reply}
        setValue={setReply}
        style={{ ...props.style }}
      />
      <div className="reply-actions">
        {cancellable ? (
          <TextBtn
            style={{ marginRight: 10, fontSize: 15 }}
            onClick={() => {
              props.setReplying(false);
            }}
          >
            Cancel
          </TextBtn>
        ) : (
          <></>
        )}
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
