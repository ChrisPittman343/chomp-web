import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMessagesById } from "../../redux/selectors";
import { Message } from "./Message";
import "./MessagesSection.css";

interface Props {}

export const MessagesSection = (props: Props) => {
  //@ts-ignore
  const { threadId } = useParams();
  const messages = useSelector(getMessagesById(threadId));

  return (
    <div className="messages-section">
      <div className="new-message">New Message</div>
      <hr style={{ width: "90%", opacity: 0.45, margin: "50px auto" }} />
      <div className="message-list">
        <Message />
      </div>
    </div>
  );
};
