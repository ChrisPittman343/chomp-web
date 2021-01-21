import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SolidBtn } from "../_common/buttons/SolidBtn";
import { TextBtn } from "../_common/buttons/TextBtn";
import "./CreateClass.css";
import { FormField } from "./FormField";
import { StudentsTable } from "./StudentsTable";
import firebase from "firebase/app";
import { reauthWithGoogle } from "../../utils/signInWithGoogle";
import { GCCourseInfo } from "../../types/firestoreTypes";
import { GCSelectionOverlay } from "./GCSelectionOverlay";
import { useDispatch } from "react-redux";
import { addClass } from "../../redux/classesSlice";

interface Props {
  user: firebase.User;
}
let arr: string[] = [];
export const CreateClass = (props: Props) => {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState("");
  const [hidden, setHidden] = useState(true);
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState(arr);
  const history = useHistory();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      addClass(
        {
          name: name.trim(),
          section: section.trim(),
          description: description.trim(),
          participants,
        },
        history
      )
    );
  };

  const openOverlay = async (e: any) => {
    if (accessToken.length === 0) {
      reauthWithGoogle(props.user).then((res) => {
        if (res.user) {
          //@ts-ignore
          setAccessToken(res.credential.accessToken);
          setHidden(false);
        }
      });
    } else {
      setHidden(false);
    }
  };

  const updateFromClass = (cd: GCCourseInfo) => {
    setName(cd.course.name);
    setSection(cd.course.section);
    setDescription(cd.course.description);
    setParticipants(cd.roster);
  };

  return (
    <div className="create-class-page">
      <GCSelectionOverlay
        accessToken={accessToken}
        user={props.user}
        hidden={hidden}
        setHidden={setHidden}
        updateFromClass={updateFromClass}
      />
      <div className="create-form-wrapper">
        <div className="create-form" title="Create Class">
          <div className="create-title">
            Class Details
            <br />
            <span className="small-txt">
              <SolidBtn filled onClick={async (e: any) => await openOverlay(e)}>
                Create from Google Classroom
              </SolidBtn>
            </span>
          </div>
          <FormField currentValue={name} required handleChange={setName}>
            Name
          </FormField>
          <FormField currentValue={section} handleChange={setSection}>
            Section
          </FormField>
          <FormField currentValue={description} handleChange={setDescription}>
            Description
          </FormField>
          <div className="form-buffer" />
          <div className="create-title">Settings</div>
          <FormField currentValue={""} handleChange={() => {}}>
            To Be Done Later
          </FormField>
          <div className="form-buffer" />
          <div className="create-title">Participants</div>
          <span className="small-txt">
            If a participant's account hasn't been made, a temporary account
            will be. If not accessed within 1 week, this temporary account will
            be deleted and removed from the roster.
          </span>
          <StudentsTable
            participants={participants}
            handleChange={setParticipants}
          />
          <div className="form-buffer" />
          <div className="submission-btns med-txt">
            <SolidBtn filled onClick={handleSubmit}>
              Create Class
            </SolidBtn>
            <div>
              <Link to="/classes">
                <TextBtn>Cancel</TextBtn>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
