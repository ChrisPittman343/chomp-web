import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../contexts";
import { SolidBtn } from "../_common/buttons/SolidBtn";
import { TextBtn } from "../_common/buttons/TextBtn";
import { ChompTitle } from "../_common/ChompTitle";
import { NavbarContainer } from "../_common/NavbarContainer";
import "./HomeNavbar.css";

interface Props {
  createClass: Function;
}

export const HomeNavbar = (props: Props) => {
  const darkModeCtx = useContext(DarkModeContext);
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