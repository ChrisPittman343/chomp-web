import React from "react";
import "./NavbarContainer.css";

interface Props {
  children?: any;
}
/* Structure navbar as such:
- Left side, will probably consist of:
  - Icon
  - Classname 
- Right side
  - Profile
  - Class buttons (Add class, DMs)
Because of this structure, it would be easy to just have 2 divs inside of the navbar as children that spread to both sides of the screen
For smaller screens, it might me better to just disregard the 2 divs and push everything into a hamburger (As a separate component)
(I think a sub-navbar will be a better idea for specific class actions)
*/
export const NavbarContainer = (props: Props) => {
  return (
    <nav className="navbar">
      <div className="navbar-vertical-center">{props.children}</div>
    </nav>
  );
};
