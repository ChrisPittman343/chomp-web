import React, { useContext, useEffect } from "react";
import firebase from "firebase";
import "./Home.css";
import { HomeNavbar } from "./HomeNavbar";
import { ClassesContext } from "../../contexts";
import { ClassCard } from "./ClassCard";
import { fetchClasses } from "../../utils/fetchFromFirestore";

interface Props {
  user: firebase.User;
}

export const Home = (props: Props) => {
  const { user } = props;
  const classesCtx = useContext(ClassesContext);

  useEffect(() => {
    window.scroll({ top: 0 });
    fetchClasses(user)
      .then((value) => {
        classesCtx.setClasses(value);
      })
      .catch((err) => console.log(err));
  }, [user]);

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
