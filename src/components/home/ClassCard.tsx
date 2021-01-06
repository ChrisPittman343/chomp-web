import React from "react";
import { Link } from "react-router-dom";
import { Class } from "../../types/firestoreTypes";
import "./ClassCard.css";

interface Props {
  classInfo: Class;
}

export const ClassCard = (props: Props) => {
  const { name, section, description, id } = props.classInfo;
  return (
    <Link to={`/classes/c/${id}`}>
      <div className="class-card">
        <div className="card-head">
          <div className="card-title">{name}</div>
          <div className="card-section">{section}</div>
        </div>

        <div className="card-body">{description}</div>
      </div>
    </Link>
  );
};
