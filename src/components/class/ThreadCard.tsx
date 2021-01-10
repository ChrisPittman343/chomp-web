import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getThreadById } from "../../redux/selectors";
import { creationDateToString } from "../../utils/creationDateToString";
import "./ThreadCard.css";

interface Props {
  threadId: string;
}
export const ThreadCard = (props: Props) => {
  const thread = useSelector(getThreadById(props.threadId));
  if (!thread) return <></>;
  else {
    const { isResolved, isClosed } = thread.status;
    const stateClass =
      !isClosed && isResolved
        ? "thread-open-resolved"
        : isClosed && !isResolved
        ? "thread-closed-unresolved"
        : isClosed && isResolved
        ? "thread-closed-resolved"
        : "thread-open-unresolved";
    /*
    Open = Amber
    Resolved + Open = Green
    NOT Resolved + Closed = Red
    Resolved + Closed = Nothing
     */
    return (
      <Link to={`/class/c/${thread.classId}/t/${thread.id}`}>
        <li className={`thread-card ${stateClass}`}>
          <div className="thread-head tiny-txt">
            <span className="sent-by">Created by {thread.email}</span>
            <span className="num-messages">
              {thread.status.numMessages} messages
            </span>
            <span className="created-on">
              Posted {creationDateToString(thread.created)}
            </span>
          </div>
          <div className="thread-main med-txt">
            <div className="thread-title">{thread.title}</div>
          </div>
        </li>
      </Link>
    );
  }
};
