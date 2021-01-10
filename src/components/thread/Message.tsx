import React, { useState } from "react";
import "./Message.css";

interface Props {
  messageId?: string;
  nestingLevel?: number;
}

export const Message = ({ nestingLevel = 0, messageId }: Props) => {
  const [collapse, setCollapse] = useState(false);
  const collapseState = collapse ? "collapsed" : "";

  return (
    <div className="message">
      Message
      {nestingLevel <= 12 ? (
        <div className={`replies-container ${collapseState}`}>
          <div
            className="nesting-bar-container"
            onClick={() => setCollapse(!collapse)}
          >
            <div className="nesting-bar"></div>
          </div>
          <div className="replies">
            <Message nestingLevel={nestingLevel + 1} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
