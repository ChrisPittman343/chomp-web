import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMessagesByParentId } from "../../redux/selectors";
import { Message } from "./Message";
import "./MessagesSection.css";
import { ReplySection } from "./ReplySection";

interface Props {}

export const MessagesSection = (props: Props) => {
  //@ts-ignore
  const { threadId } = useParams();
  let messages = useSelector(getMessagesByParentId(threadId));
  return (
    <div className="messages-section">
      <div className="new-reply">
        <span className="bold med-txt">Got something you wanna say?</span>
        <br />
        <br />
        <ReplySection
          setReplying={() => {}}
          parentId={threadId}
          cancellable={false}
        />
      </div>
      <hr
        style={{
          width: "100%",
          border: "1px solid transparent",
          color: "var(--main-hover)",
          backgroundColor: "var(--main-hover)",
          height: 1,
          margin: "30px 0 65px 0",
        }}
      />
      <div className="message-list">
        {messages.length > 0 ? (
          messages
            .sort((a, b) => b.sent.seconds - a.sent.seconds)
            .map((m, mIx) => (
              <Message key={`${0} ${mIx}`} parentId={threadId} id={m.id} />
            ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
