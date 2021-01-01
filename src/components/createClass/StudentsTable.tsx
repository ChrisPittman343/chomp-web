import React, { useState } from "react";
import { FormField } from "./FormField";
import { StudentRow } from "./StudentRow";
import "./StudentsTable.css";

interface Props {
  participants: string[];
  handleChange: React.Dispatch<React.SetStateAction<string[]>>;
}

export const StudentsTable = (props: Props) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email.length === 0) return;
    else if (props.participants.indexOf(email) !== -1) return;
    props.handleChange([...props.participants, email]);
    setEmail("");
    return false;
  };

  const deleteRow = (i: number) => {
    const newEmails = [...props.participants];
    newEmails.splice(i, 1);
    //@ts-ignore
    props.handleChange([...newEmails]);
  };

  return (
    <div className="students-table-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormField currentValue={email} handleChange={setEmail} type="email">
          Email
        </FormField>
      </form>

      <table className="students-table">
        <colgroup>
          <col style={{ width: "75%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "5%" }} />
        </colgroup>

        <tbody className="students-table-body">
          {props.participants.map((e, eIx) => {
            return (
              <StudentRow key={eIx} email={e} delete={() => deleteRow(eIx)} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
