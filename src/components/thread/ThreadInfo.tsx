import React from "react";
import ReactMarkdown from "react-markdown";
import { Thread } from "../../types/firestoreTypes";
import { creationDateToString } from "../../utils/creationDateToString";
import "./ThreadInfo.css";
import gfm from "remark-gfm";

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
        <div className="thread-title big-txt boldish">{thread.title}</div>
        <ReactMarkdown plugins={[gfm]} children={thread.message} />
      </div>
    </div>
  );
};
