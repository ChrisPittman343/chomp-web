import React from "react";
import { Thread } from "../../types/firestoreTypes";
import { ChompTitle } from "../_common/ChompTitle";
import { NavbarContainer } from "../_common/NavbarContainer";
import "./ThreadNavbar.css";
interface Props {
  thread: Thread;
}

export const ThreadNavbar = (props: Props) => {
  const { thread } = props;
  return (
    <NavbarContainer>
      <ChompTitle />
      <span className="big-txt bold">{thread.className}</span>
    </NavbarContainer>
  );
};
