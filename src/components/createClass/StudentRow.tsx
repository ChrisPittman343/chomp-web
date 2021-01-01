import React from "react";
import { TextBtn } from "../_common/buttons/TextBtn";
import "./StudentRow.css";

interface Props {
  email: string;
  delete: (i: number) => any;
}

export const StudentRow = (props: Props) => {
  return (
    <tr>
      <td>{props.email}</td>
      <td>Student</td>
      <td>
        <TextBtn onClick={props.delete}>X</TextBtn>
      </td>
    </tr>
  );
};
