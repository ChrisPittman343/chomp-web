import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "./GCSelectionOverlay.css";
import { Spinner } from "../_common/Spinner";
import { GCCourseInfo } from "../../types/firestoreTypes";
import { fetchGoogleClassroom } from "../../utils/firestoreFunction";

interface Props {
  hidden: boolean;
  accessToken: string;
  user: firebase.User;
  setHidden: Function;
  updateFromClass: Function;
}
const arr: GCCourseInfo[] = [];
export const GCSelectionOverlay = (props: Props) => {
  const { hidden, accessToken, setHidden, updateFromClass } = props;
  const [courseData, setCourseData] = useState(arr);

  useEffect(() => {
    if (!hidden && accessToken.length > 0) {
      fetchGoogleClassroom(accessToken)
        .then((data) => {
          //Some kind of error must have occured
          if (data.code) onFail();
          const cd = data as GCCourseInfo[];
          setCourseData(cd);
        })
        .catch((e) => {
          console.log(e);
          onFail();
        });
    } else {
      setHidden(true);
    }
  }, [hidden]);

  const selectClass = (e: any, c: GCCourseInfo) => {
    e.preventDefault();
    updateFromClass(c);
    setHidden(true);
  };

  const onFail = () => {
    setCourseData(arr);
    setHidden(true);
    //Display some fail text telling the user that something went wrong, and to try again later.
  };

  return (
    <div
      className="selection-overlay"
      onClick={(e) => {
        if (e.currentTarget === e.target) setHidden(true);
      }}
      style={{ display: hidden ? "none" : "" }}
    >
      {courseData.length !== 0 ? (
        <div className="selection-box">
          <span className="med-txt box-title">Active Classes</span>
          {courseData.map((course, ix) => {
            return (
              <button
                className="btn-reset overlay-btn"
                onClick={(e) => selectClass(e, course)}
                key={ix}
              >
                {course.course.name} - {course.roster.length} People
              </button>
            );
          })}
        </div>
      ) : (
        <Spinner parentSize={100} />
      )}
    </div>
  );
};
