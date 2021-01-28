import React from "react";
import "./Footer.css";

interface Props {}

export const Footer = (props: Props) => {
  return (
    <footer className="page-footer">
      <ul className="small-txt">
        <li>© 2021 Chomp</li>
        <li>
          <a href="/">Terms</a>
        </li>
        <li>
          <a href="/">Privacy</a>
        </li>
        <li>
          <a href="https://github.com/ChrisPittman343/chomp-web">Github</a>
        </li>
        <li>
          <a href="/">Contact</a>
        </li>
        <li>
          <a href="/">About</a>
        </li>
      </ul>
    </footer>
  );
};
