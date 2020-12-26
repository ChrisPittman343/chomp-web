import React from "react";
import "./NavbarContainer.css";

interface Props {
  children?: any;
}
export const NavbarContainer = (props: Props) => {
  return <nav className="navbar-container">{props.children}</nav>;
};
