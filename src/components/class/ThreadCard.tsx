import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getThreadById, getVoteOnThread } from "../../redux/selectors";
import { voteThread } from "../../redux/votesSlice";
import { creationDateToString } from "../../utils/creationDateToString";
import { ThreadTag } from "../_common/ThreadTag";
import "./ThreadCard.css";

interface Props {
  threadId: string;
}
export const ThreadCard = (props: Props) => {
  const thread = useSelector(getThreadById(props.threadId));
  const vote = useSelector(getVoteOnThread(props.threadId));
  const dispatch = useDispatch();

  const onVote = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    vote: 1 | -1
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (thread) dispatch(voteThread(thread, vote));
  };

  if (!thread) return <></>;
  else {
    const { answerId, isClosed } = thread;
    const stateClass =
      !isClosed && answerId
        ? "thread-open-resolved"
        : isClosed && !answerId
        ? "thread-closed-unresolved"
        : isClosed && answerId
        ? "thread-closed-resolved"
        : "thread-open-unresolved";
    return (
      <a href={`/class/c/${thread.classId}/t/${thread.id}`}>
        <li className={`thread-card ${stateClass}`}>
          <div className="thread-head tiny-txt">
            <span className="sent-by">Created by {thread.email}</span>
            <span className="num-messages">{thread.numMessages} messages</span>
            <span className="created-on">
              Posted {creationDateToString(thread.created)}
            </span>
          </div>
          <div className="thread-main med-txt">
            <div className="thread-score">
              <button
                onClick={(e) => onVote(e, 1)}
                className={`vote-btn ${vote === 1 ? "current-upvote" : ""}`}
              >
                ▲
              </button>
              <button>{thread.score}</button>
              <button
                onClick={(e) => onVote(e, -1)}
                className={`vote-btn ${vote === -1 ? "current-downvote" : ""}`}
              >
                ▼
              </button>
            </div>
            <div className="thread-title">
              {thread.title}
              {thread.tags?.map((t, tIx) => (
                <ThreadTag tag={t} key={tIx} />
              ))}
            </div>
          </div>
        </li>
      </a>
    );
  }
};
