import React from "react";
import "./FormField.css";

interface Props {
  children: string;
  currentValue: string;
  required?: boolean;
  handleChange: Function;
}

export const FormField = (props: Props) => {
  const name = props.children;
  const emptyClass = !props.currentValue ? "empty-field" : "";
  return (
    <div className="form-field">
      <label htmlFor={name} className={`form-field-label ${emptyClass}`}>
        {name}
        {props.required ? <span className="required"> *</span> : <></>}
      </label>
      <br />
      <input
        name={name}
        id={name}
        required={props.required}
        className="form-field-input"
        spellCheck={"false"}
        value={props.currentValue}
        onChange={(e) => props.handleChange(e.target.value)}
      />
    </div>
  );
};
