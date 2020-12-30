import React from "react";
import { Class } from "../../types/firestoreTypes";
import "./ClassCard.css";

interface Props {
  classInfo: Class;
}

export const ClassCard = (props: Props) => {
  const { name, section, description, role } = props.classInfo;
  return (
    <div className="class-card">
      <div className="card-head">
        <div className="card-title">{name}</div>
        <div className="card-section">{section}</div>
      </div>
      <div className="card-body">
        {description}
        <br />
        {role}
      </div>
    </div>
  );
};
