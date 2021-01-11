import React from "react";
import { Thread } from "../../types/firestoreTypes";
import { creationDateToString } from "../../utils/creationDateToString";
import "./ThreadInfo.css";
import { MarkdownRenderer } from "../_common/MarkdownRenderer";

interface Props {
  thread: Thread;
}

export const ThreadInfo = (props: Props) => {
  const { thread } = props;
  return (
    <div className="thread-info">
      <div className="thread-context small-txt">
        <span>{`Created by ${thread.email}`}</span>
        <span style={{ paddingLeft: 20 }}>{`Posted ${creationDateToString(
          thread.created
        )}`}</span>
      </div>
      <div className="thread-description">
        <div className="thread-title big-txt bold">{thread.title}</div>
        <MarkdownRenderer text={thread.message} />
      </div>
    </div>
  );
};
