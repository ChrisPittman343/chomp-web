import React from "react";
import { Link } from "react-router-dom";
import { Class } from "../../types/firestoreTypes";
import { ChompTitle } from "../_common/ChompTitle";
import { NavbarContainer } from "../_common/NavbarContainer";
import "./ClassNavbar.css";

interface Props {
  classData: Class;
}

export const ClassNavbar = (props: Props) => {
  return (
    <NavbarContainer>
      <Link to="/classes">
        <ChompTitle />
      </Link>
      {props.classData.name}
    </NavbarContainer>
  );
};
