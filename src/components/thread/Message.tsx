import React, { useState } from "react";
import "./Message.css";
import { MarkdownRenderer } from "../_common/MarkdownRenderer";
import { getMessageById, getMessagesByMessage } from "../../redux/selectors";
import { useSelector } from "react-redux";
import { creationDateToString } from "../../utils/creationDateToString";
import { MessageDisplay } from "../createThread/MessageDisplay";
import { ReplySection } from "./ReplySection";

interface Props {
  id: string;
  parentId: string;
  nestingLevel?: number;
}

export const Message = ({ nestingLevel = 0, parentId, id }: Props) => {
  const [collapse, setCollapse] = useState(false);
  const [replying, setReplying] = useState(false);
  const collapseState = collapse ? "collapsed" : "";
  const message = useSelector(getMessageById(id));
  const messages = useSelector(getMessagesByMessage(message));
  return message ? (
    <div className="message">
      <div className="message-ctx tiny-txt">
        Sent by {message.email} {creationDateToString(message.sent)}
      </div>
      <MarkdownRenderer text={message.message} />
      <div className="action-btns">
        {!replying ? (
          <button
            className="underline-btn tiny-txt"
            style={{ opacity: 0.75 }}
            onClick={() => {
              setCollapse(false);
              setReplying(true);
            }}
          >
            Reply
          </button>
        ) : (
          <></>
        )}
      </div>
      {nestingLevel <= 12 && (replying || messages.length > 0) ? (
        <div className={`replies-container ${collapseState}`}>
          <div
            className="nesting-bar-container"
            onClick={() => setCollapse(!collapse)}
          >
            <div className="nesting-bar"></div>
          </div>
          <div className="replies">
            {replying ? (
              <ReplySection setReplying={setReplying} parentId={message.id} />
            ) : (
              <></>
            )}
            {messages.length > 0 ? (
              messages.map((m, mIx) => (
                <Message
                  key={`${nestingLevel} ${mIx}`}
                  parentId={message.id}
                  id={m.id}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
};
