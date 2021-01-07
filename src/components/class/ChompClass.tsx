import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ChompClass.css";
import firebase from "firebase/app";
import "firebase/firestore";
import { Spinner } from "../_common/Spinner";
import { ClassNavbar } from "./ClassNavbar";
import { ClassesContext } from "../../contexts";

interface Props {
  user: firebase.User;
}

export const ChompClass = (props: Props) => {
  //@ts-ignore
  const { classId } = useParams();
  const classesCtx = useContext(ClassesContext);
  const currentClass = classesCtx.classes.find((c) => c.id === classId);
  useEffect(() => {}, []);

  return (
    <div className="class-page">
      {currentClass ? (
        <>
          <ClassNavbar classData={currentClass} />
          <div className="class-body"></div>
        </>
      ) : (
        <Spinner style={{ margin: "auto", marginTop: 50 }} />
      )}
    </div>
  );
};
