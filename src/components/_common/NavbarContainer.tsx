import React from "react";
import "./NavbarContainer.css";

interface Props {
  children?: any;
}

export const NavbarContainer = (props: Props) => {
  return (
    <nav className="navbar">
      <div className="navbar-vertical-center">{props.children}</div>
    </nav>
  );
};
