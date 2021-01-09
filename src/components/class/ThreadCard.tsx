import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getThreadById } from "../../redux/selectors";
import { Thread } from "../../types/firestoreTypes";
import "./ThreadCard.css";

interface Props {
  threadId: string;
}
export const ThreadCard = (props: Props) => {
  const thread = useSelector(getThreadById(props.threadId));
  if (!thread) return <></>;
  else {
    const stateClass = thread.status.isResolved
      ? "thread-resolved"
      : thread.status.isClosed
      ? ""
      : "thread-open";
    return (
      <Link to={`/class/c/${thread.classId}/t/${thread.id}`}>
        <li className={`thread-card ${stateClass}`}>
          <div className="thread-head tiny-txt">
            <span className="sent-by">Sent by {thread.email}</span>
            <span className="num-messages">
              {thread.status.numMessages} messages
            </span>
            <span className="created-on">Opened {getCreationDate(thread)}</span>
          </div>
          <div className="thread-main med-txt">
            <div className="thread-title">{thread.title}</div>
          </div>
        </li>
      </Link>
    );
  }
};

/**
 * Returns an appropriate timestamp for the creation date of a thread. Value will follow this flow:
 *
 * Just now, Seconds ago, Minutes ago, Hours ago, Weekday, Month Day, Year
 *
 * @param thread
 */
function getCreationDate(thread: Thread) {
  const currentDate = moment(new Date());
  const createdDate = moment(thread.created.toDate());
  const sd = currentDate.diff(createdDate, "seconds");

  let final: number;
  const f = (num: number) => {
    final = Math.floor(num);
    return final;
  };

  const s = () => (final === 1 ? "" : "s");

  if (sd <= 5) return "just now.";
  else if (sd < 60) return `${f(sd / 1)} second${s()} ago`;
  else if (sd < 3600) return `${f(sd / 60)} minute${s()} ago`;
  else if (sd < 86400) return `${f(sd / 3600)} hour${s()} ago`;
  else if (sd < 604800) return `on ${createdDate.format("dddd")}`;
  else
    return `on ${createdDate.format("MMM")}. ${createdDate.format(
      "Do"
    )}, ${createdDate.year()}`;
}
