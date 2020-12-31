import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CreateClass.css";
import { FormField } from "./FormField";
import { StudentsTable } from "./StudentsTable";

interface Props {}

export const CreateClass = (props: Props) => {
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState([""]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className="create-class-page">
      <div className="create-form-wrapper">
        <form
          className="create-form"
          title="Create Class"
          autoComplete="off"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="create-title">Class Details</div>
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
          <StudentsTable
            participants={participants}
            handleChange={setParticipants}
          />
          <div className="form-buffer" />
          <div className="submission-btns">
            <div>
              <input type="submit" value="Create Class" className="form-btn" />
            </div>
            <div>
              <Link to="/classes">
                <button className="form-btn">Cancel</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
