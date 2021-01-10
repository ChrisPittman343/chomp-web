import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMessagesById, getThreadById } from "../../redux/selectors";
import { Spinner } from "../_common/Spinner";
import "./ChompThread.css";
import { ThreadNavbar } from "./ThreadNavbar";

interface Props {}

export const ChompThread = (props: Props) => {
  //@ts-ignore
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const thread = useSelector(getThreadById(threadId));
  const messages = useSelector(getMessagesById(threadId));
  useEffect(() => {
    //Fetch thread + messages action
  });
  return thread ? (
    <div className="thread-page">
      <ThreadNavbar thread={thread} />
      <div className="thread-content">
        <div className="thread-info">
          <div className="thread-context">Sender + Date sent</div>
          <div className="thread-description">
            {" "}
            {thread.title} <br /> {thread.message}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Spinner parentSize={70} style={{ margin: "auto", marginTop: 70 }} />
  );
};
