import React from "react";
import { Link } from "react-router-dom";
import { SolidBtn } from "../_common/buttons/SolidBtn";
import { ChompTitle } from "../_common/ChompTitle";
import { NavbarContainer } from "../_common/NavbarContainer";
import "./HomeNavbar.css";

interface Props {}

export const HomeNavbar = (props: Props) => {
  return (
    <NavbarContainer>
      <Link to="/classes">
        <ChompTitle />
      </Link>
      <Link to="/">
        <SolidBtn>Landing</SolidBtn>
      </Link>
      <Link to="/classes/create-class">
        <SolidBtn>Create Class</SolidBtn>
      </Link>
    </NavbarContainer>
  );
};
