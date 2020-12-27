import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext, UserContext } from "../../contexts";
import { TextBtn } from "../_common/buttons/TextBtn";
import { ChompTitle } from "../_common/ChompTitle";
import { NavbarContainer } from "../_common/NavbarContainer";
import { ProfilePicture } from "../_common/ProfilePicture";
import { Spinner } from "../_common/Spinner";
import "./IndexNavbar.css";

interface Props {}

export const IndexNavbar = (props: Props) => {
  const darkModeCtx = useContext(DarkModeContext);
  const userCtx = useContext(UserContext);

  return (
    <NavbarContainer>
      <Link to="/">
        <ChompTitle />
      </Link>
      <button onClick={() => darkModeCtx?.toggleDarkMode()}>
        Toggle Theme
      </button>
      <ProfilePicture photoURL={userCtx?.user?.photoURL!} size={40} />
      <Spinner />
      <TextBtn onClick={console.log}>Click Me!</TextBtn>
    </NavbarContainer>
  );
};
