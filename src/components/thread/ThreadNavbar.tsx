import React from "react";
import { Link } from "react-router-dom";
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
      <Link to="/classes">
        <ChompTitle />
      </Link>
      <span className="big-txt bold" style={{ paddingLeft: 20 }}>
        {thread.className}
      </span>
    </NavbarContainer>
  );
};
