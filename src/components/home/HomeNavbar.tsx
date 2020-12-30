import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../contexts";
import { SolidBtn } from "../_common/buttons/SolidBtn";
import { TextBtn } from "../_common/buttons/TextBtn";
import { ChompTitle } from "../_common/ChompTitle";
import { NavbarContainer } from "../_common/NavbarContainer";
import "./HomeNavbar.css";

interface Props {}

export const HomeNavbar = (props: Props) => {
  const darkModeCtx = useContext(DarkModeContext);
  return (
    <NavbarContainer>
      <TextBtn
        onClick={() => darkModeCtx.toggleDarkMode()}
        style={{ position: "fixed", right: 5, top: 5 }}
      >
        Toggle Theme
      </TextBtn>
      <Link to="/home">
        <ChompTitle />
      </Link>
      <Link to="/">
        <SolidBtn>Landing</SolidBtn>
      </Link>
    </NavbarContainer>
  );
};
