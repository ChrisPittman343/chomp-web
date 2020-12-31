import React from "react";
import "./StudentRow.css";

interface Props {
  email: string;
}

export const StudentRow = (props: Props) => {
  return <div>{props.email}</div>;
};
