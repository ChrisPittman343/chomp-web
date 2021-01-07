import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "./GCSelectionOverlay.css";
import { authedRequest } from "../../utils/authedRequest";
import { Spinner } from "../_common/Spinner";
import { HTTPSCourseInfo } from "../../types/httpsTypes";

interface Props {
  hidden: boolean;
  accessToken: string;
  user: firebase.User;
  setHidden: Function;
  updateFromClass: Function;
}
const arr: HTTPSCourseInfo[] = [];
export const GCSelectionOverlay = (props: Props) => {
  const { hidden, accessToken, user, setHidden, updateFromClass } = props;
  const [courseData, setCourseData] = useState(arr);

  useEffect(() => {
    if (!hidden && accessToken.length > 0) {
      authedRequest("/get-classes", accessToken)
        .then((value) => {
          if (value.status === 200) {
            //@ts-ignore
            const cd = value.data as HTTPSCourseInfo[];
            setCourseData(cd);
          } else {
            console.log(`ERROR: Something went wrong.`);
            setCourseData(arr);
            setHidden(true);
          }
        })
        .catch((err) => {
          console.log(`ERROR: ${err}`);
          setCourseData(arr);
          setHidden(true);
        });
    } else {
      setHidden(true);
    }
  }, [hidden]);

  const selectClass = (e: any, c: HTTPSCourseInfo) => {
    e.preventDefault();
    updateFromClass(c);
    setHidden(true);
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
