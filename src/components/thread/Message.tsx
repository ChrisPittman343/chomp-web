import React, { useState } from "react";
import "./Message.css";
import { MarkdownRenderer } from "../_common/MarkdownRenderer";
import { getMessageById, getMessagesByParentId } from "../../redux/selectors";
import { useSelector } from "react-redux";

interface Props {
  parentId: string;
  nestingLevel?: number;
}

export const Message = ({ nestingLevel = 0, parentId }: Props) => {
  const [collapse, setCollapse] = useState(false);
  const collapseState = collapse ? "collapsed" : "";
  const message = useSelector(getMessageById(parentId))!; //Check this assertion
  const messages = useSelector(getMessagesByParentId(message.id));
  return message ? (
    <div className="message">
      <MarkdownRenderer text={message.message} />
      {nestingLevel <= 12 && messages.length > 0 ? (
        <div className={`replies-container ${collapseState}`}>
          <div
            className="nesting-bar-container"
            onClick={() => setCollapse(!collapse)}
          >
            <div className="nesting-bar"></div>
          </div>
          <div className="replies">
            {messages.map((m, mIx) => (
              <Message
                key={`${nestingLevel} ${parentId}`}
                parentId={message.id}
              />
            ))}
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
