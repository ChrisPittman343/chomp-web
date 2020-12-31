import React from "react";
import { useParams } from "react-router-dom";
import "./ChompClass.css";

interface Props {}

export const ChompClass = (props: Props) => {
  //@ts-ignore
  const { classId } = useParams();

  return <div className="class-page">{classId}</div>;
};
