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
import { FilterOptions } from "./FilterOptions";
import { NewThread } from "./NewThread";

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
  return currentClass ? (
    <div className="class-page">
      <ClassNavbar classData={currentClass} />
      <div className="class-content">
        <FilterOptions classData={currentClass} />
        <ul className="threads-list">
          <NewThread />
          {threads
            .sort((a, b) => b.created.seconds - a.created.seconds)
            .map((t, tIx) => (
              <ThreadCard threadId={t.id} key={tIx} />
            ))}
        </ul>
      </div>
    </div>
  ) : (
    <Spinner parentSize={70} style={{ margin: "auto", marginTop: 70 }} />
  );
};
