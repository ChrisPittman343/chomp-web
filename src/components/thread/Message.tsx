import React, { useState } from "react";
import "./Message.css";
import { MarkdownRenderer } from "../_common/MarkdownRenderer";
import {
  getMessageById,
  getMessagesByMessage,
  getVoteOnMessage,
} from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { creationDateToString } from "../../utils/creationDateToString";
import { ReplySection } from "./ReplySection";
import { voteMessage } from "../../redux/votesSlice";
import { resolveThread } from "../../redux/threadsSlice";

interface Props {
  id: string;
  threadId: string;
  parentId: string;
  answerId?: string;
  nestingLevel?: number;
}

export const Message = ({
  nestingLevel = 0,
  parentId,
  answerId,
  id,
  threadId,
}: Props) => {
  const dispatch = useDispatch();
  const [collapse, setCollapse] = useState(false);
  const [replying, setReplying] = useState(false);
  const message = useSelector(getMessageById(id));
  const messages = useSelector(getMessagesByMessage(message));
  const vote = useSelector(getVoteOnMessage(id));
  const isAnswer = answerId === message?.id;
  return message ? (
    <div className="message">
      <div className="message-ctx tiny-txt">
        Sent by {message.email} {creationDateToString(message.sent)}
      </div>
      <MarkdownRenderer
        text={message.message}
        style={{
          borderLeft: isAnswer ? `4px solid var(--green)` : "",
          paddingLeft: isAnswer ? 5 : "",
        }}
      />
      <div className="action-btns">
        <span style={{ paddingRight: 3 }}>{message.score}</span>
        <button
          onClick={() => dispatch(voteMessage(message, 1))}
          style={{
            color: vote === 1 ? "var(--blue)" : "",
          }}
        >
          ▲
        </button>
        <button
          onClick={() => dispatch(voteMessage(message, -1))}
          style={{
            color: vote === -1 ? "var(--bright-red)" : "",
          }}
        >
          ▼
        </button>
        <button
          className={active(isAnswer)}
          onClick={() => dispatch(resolveThread(threadId, id))}
          style={{
            color: isAnswer ? "var(--green)" : "var(--main-color)",
          }}
        >
          ✔
        </button>
        {!replying ? (
          <button
            onClick={() => {
              setCollapse(false);
              setReplying(true);
            }}
          >
            ➥
          </button>
        ) : (
          <></>
        )}
      </div>
      {nestingLevel <= 10 && (replying || messages.length > 0) ? (
        <div className={`replies-container ${collapse ? "collapsed" : ""}`}>
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
              messages
                .sort((a, b) => b.sent.seconds - a.sent.seconds)
                .map((m, mIx) => (
                  <Message
                    key={`${nestingLevel} ${mIx}`}
                    parentId={message.id}
                    id={m.id}
                    threadId={threadId}
                    answerId={answerId}
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

const active = (b: boolean) => (b ? "active" : "");
