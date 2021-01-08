import React from "react";
import { useSelector } from "react-redux";
import { getThreadById } from "../../redux/selectors";
import { Thread } from "../../types/firestoreTypes";
import "./ThreadCard.css";

interface Props {
  threadId: string;
}

export const ThreadCard = (props: Props) => {
  const thread = useSelector(getThreadById(props.threadId))!;
  return <li className="thread">{thread.message}</li>;
};
