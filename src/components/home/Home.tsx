import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase";
import "./Home.css";
import { HomeNavbar } from "./HomeNavbar";
import { ClassesContext } from "../../contexts";
import { ClassCard } from "./ClassCard";
import { Footer } from "../_common/Footer";

interface Props {
  user: firebase.User;
}

export const Home = (props: Props) => {
  const { user } = props;
  const classesCtx = useContext(ClassesContext);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .where("uid", "==", user.uid)
      .get()
      .then((value) => {
        classesCtx.setClasses(value.docs[0].data().classes);
        console.log(value.docs[0].data().classes);
      })
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <div className="home-page">
      <HomeNavbar />
      <div className="home-body">
        <div className="class-card-display">
          {classesCtx.classes.map((c) => {
            return <ClassCard classInfo={c} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};
