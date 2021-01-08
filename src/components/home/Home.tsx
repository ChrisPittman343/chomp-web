import React, { useEffect } from "react";
import firebase from "firebase";
import "./Home.css";
import { HomeNavbar } from "./HomeNavbar";
import { ClassCard } from "./ClassCard";
import { useDispatch, useSelector } from "react-redux";
import { loadAllClasses } from "../../redux/classesSlice";
import { getClasses } from "../../redux/selectors";

interface Props {
  user: firebase.User;
}

export const Home = (props: Props) => {
  const classes = useSelector(getClasses);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scroll({ top: 0 });
    if (!classes || classes.length === 0) dispatch(loadAllClasses());
  }, []);

  return (
    <div className="home-page">
      <HomeNavbar />
      <div className="home-body">
        <div className="class-card-display">
          {classes.map((c, cIx) => {
            return <ClassCard classInfo={c} key={cIx} />;
          })}
        </div>
      </div>
    </div>
  );
};
