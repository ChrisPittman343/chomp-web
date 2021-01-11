import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMessagesByParentId } from "../../redux/selectors";
import { Message } from "./Message";
import "./MessagesSection.css";

interface Props {}

export const MessagesSection = (props: Props) => {
  //@ts-ignore
  const { threadId } = useParams();
  const messages = useSelector(getMessagesByParentId(threadId));

  return (
    <div className="messages-section">
      <div className="new-message">Create a new message here</div>
      <hr style={{ width: "90%", opacity: 0.45, margin: "50px auto" }} />
      <div className="message-list">
        {messages.map((m, mIx) => (
          <Message key={`${0} ${mIx}`} parentId={threadId} />
        ))}
      </div>
    </div>
  );
};
