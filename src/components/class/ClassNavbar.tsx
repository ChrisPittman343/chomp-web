import React from "react";
import { Link } from "react-router-dom";
import { ChompTitle } from "../_common/ChompTitle";
import { NavbarContainer } from "../_common/NavbarContainer";
import "./ClassNavbar.css";

interface Props {
  classData: any;
}

export const ClassNavbar = (props: Props) => {
  return (
    <NavbarContainer>
      <Link to="/classes">
        <ChompTitle />
      </Link>
      {props.classData.name} {">"} General
    </NavbarContainer>
  );
};
