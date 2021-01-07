import React, { useContext, useEffect } from "react";
import firebase from "firebase";
import "./Home.css";
import { HomeNavbar } from "./HomeNavbar";
import { ClassesContext } from "../../contexts";
import { ClassCard } from "./ClassCard";
import { useDispatch } from "react-redux";
import { fetchAllClasses } from "../../redux/classesSlice";

interface Props {
  user: firebase.User;
}

export const Home = (props: Props) => {
  const classesCtx = useContext(ClassesContext);
  const dispatch = useDispatch();
  dispatch(fetchAllClasses());
  useEffect(() => {
    window.scroll({ top: 0 });
  }, [props]);

  const createClass = async () => {};

  return (
    <div className="home-page">
      <HomeNavbar createClass={() => createClass()} />

      <div className="home-body">
        <div className="class-card-display">
          {classesCtx.classes.map((c) => {
            return <ClassCard classInfo={c} />;
          })}
        </div>
      </div>
    </div>
  );
};
