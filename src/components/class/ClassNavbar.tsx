import React from "react";
import { Link, useParams } from "react-router-dom";
import { Class } from "../../types/firestoreTypes";
import { ChompTitle } from "../_common/ChompTitle";
import { NavbarContainer } from "../_common/NavbarContainer";
import "./ClassNavbar.css";

interface Props {
  classData: Class;
}

export const ClassNavbar = (props: Props) => {
  //@ts-ignore
  const { classId } = useParams();
  return (
    <NavbarContainer>
      <Link to="/classes">
        <ChompTitle />
      </Link>
      <Link
        to={`/class/c/${classId}`}
        className="big-txt bold"
        style={{ marginLeft: 20, textDecoration: "underline" }}
      >
        {props.classData.name}
      </Link>
    </NavbarContainer>
  );
};
