import React from "react";
import { Link } from "react-router-dom";
import { SolidBtn } from "../_common/buttons/SolidBtn";
import "./Home.css";

interface Props {}

export const Home = (props: Props) => {
  return (
    <div className="home-page">
      <Link to="/">
        <SolidBtn>Landing</SolidBtn>
      </Link>
    </div>
  );
};
