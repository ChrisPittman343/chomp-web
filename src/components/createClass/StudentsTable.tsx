import React, { useState } from "react";
import { FormField } from "./FormField";
import "./StudentsTable.css";

interface Props {
  participants: string[];
  handleChange: React.Dispatch<React.SetStateAction<string[]>>;
}

export const StudentsTable = (props: Props) => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    props.handleChange([...props.participants, email]);
  };

  return (
    <div className="students-table-container">
      <form onSubmit={handleSubmit}>
        <FormField currentValue={email} handleChange={setEmail}>
          Student Email
        </FormField>
      </form>
      <table className="students-table">
        <thead className="students-table-head"></thead>
        <tbody className="students-table-body"></tbody>
      </table>
    </div>
  );
};
