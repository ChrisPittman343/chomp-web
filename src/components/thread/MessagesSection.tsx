import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMessagesByParentId } from "../../redux/selectors";
import { fetchThreadFromFirestore } from "../../utils/fetchFromFirestore";
import { Message } from "./Message";
import "./MessagesSection.css";

interface Props {}

export const MessagesSection = (props: Props) => {
  //@ts-ignore
  const { threadId } = useParams();
  let messages = useSelector(getMessagesByParentId(threadId));
  return (
    <div className="messages-section">
      <div className="message-list">
        {messages.length > 0 ? (
          messages.map((m, mIx) => (
            <Message key={`${0} ${mIx}`} parentId={threadId} id={m.id} />
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
