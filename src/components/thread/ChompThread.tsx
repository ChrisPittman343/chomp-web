import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getThreadById } from "../../redux/selectors";
import { loadThread } from "../../redux/threadsSlice";
import { Footer } from "../_common/Footer";
import { Spinner } from "../_common/Spinner";
import "./ChompThread.css";
import { MessagesSection } from "./MessagesSection";
import { ThreadInfo } from "./ThreadInfo";
import { ThreadNavbar } from "./ThreadNavbar";

interface Props {}

export const ChompThread = (props: Props) => {
  //@ts-ignore
  const { classId, threadId } = useParams();
  const dispatch = useDispatch();
  const thread = useSelector(getThreadById(threadId));
  useEffect(() => {
    dispatch(loadThread(classId, threadId));
  }, []);
  return thread ? (
    <>
      <div className="thread-page">
        <ThreadNavbar thread={thread} />
        <div className="thread-page-content">
          <ThreadInfo thread={thread} />
          <MessagesSection />
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Spinner parentSize={70} style={{ margin: "auto", marginTop: 70 }} />
  );
};
