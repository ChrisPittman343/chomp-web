import React from "react";
import { Link } from "react-router-dom";

interface Props {}

export const Landing = (props: Props) => {
  return (
    <div>
      Landing Page
      <Link to="/home">home</Link>
    </div>
  );
};
