import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ChompClass.css";
import firebase from "firebase/app";
import "firebase/firestore";
import { Spinner } from "../_common/Spinner";
import { ClassNavbar } from "./ClassNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getClassById, getThreads } from "../../redux/selectors";
import { loadClass } from "../../redux/classesSlice";
import { ThreadCard } from "./ThreadCard";

interface Props {
  user: firebase.User;
}

export const ChompClass = (props: Props) => {
  //@ts-ignore
  const { classId } = useParams();
  const dispatch = useDispatch();
  const threads = useSelector(getThreads(classId));
  const currentClass = useSelector(getClassById(classId));
  useEffect(() => {
    dispatch(loadClass(classId));
  }, []);
  return (
    <div className="class-page">
      {currentClass ? (
        <>
          <ClassNavbar classData={currentClass} />
          <div className="class-body">
            <ul className="threads-list">
              {threads.map((t, tIx) => (
                <ThreadCard threadId={t.id} key={tIx} />
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Spinner parentSize={70} style={{ margin: "auto", marginTop: 70 }} />
      )}
    </div>
  );
};
