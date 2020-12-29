import React from "react";
import "./Feature.css";

interface Props {
  image: any;
  alt: string;
  title: string;
  children: any;
}

export const Feature = (props: Props) => {
  return (
    <div className="feature round">
      <img className="feature-img" src={props.image} alt={props.alt} />
      <div className="feature-description">
        <span className="bold">{props.title}</span>
        <br />
        <br />
        {props.children}
      </div>
    </div>
  );
};
