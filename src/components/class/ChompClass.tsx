import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ChompClass.css";
import firebase from "firebase/app";
import "firebase/firestore";
import { Spinner } from "../_common/Spinner";
import { ClassNavbar } from "./ClassNavbar";
import { ClassesContext } from "../../contexts";
import { Channel } from "../../types/firestoreTypes";
import { fetchInitialClassData } from "../../utils/fetchFromFirestore";

interface Props {}

export const ChompClass = (props: Props) => {
  //@ts-ignore
  const { classId } = useParams();
  const classesCtx = useContext(ClassesContext);
  const currentClass = classesCtx.classes.find((c) => c.id === classId);

  useEffect(() => {
    if (!currentClass?.channels) {
      fetchInitialClassData(classId)
        .then(async (res) => {
          if (currentClass) classesCtx.setChannels(classId, res);
          else {
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

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
