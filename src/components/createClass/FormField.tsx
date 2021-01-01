import React from "react";
import "./FormField.css";

interface Props {
  children: string;
  currentValue: string;
  required?: boolean;
  type?: string;
  handleChange: Function;
}

export const FormField = (props: Props) => {
  const name = props.children;
  const emptyClass = !props.currentValue ? "empty-field" : "";
  const type = props.type ? props.type : "text";
  return (
    <div className="form-field">
      <label htmlFor={name} className={`form-field-label ${emptyClass}`}>
        {name}
        {props.required ? <span className="required">*</span> : <></>}
      </label>
      <br />
      <input
        name={name}
        autoComplete="off"
        id={name}
        type={type}
        maxLength={150}
        required={props.required}
        className="form-field-input"
        spellCheck={"false"}
        value={props.currentValue}
        onChange={(e) => props.handleChange(e.target.value)}
      />
    </div>
  );
};
