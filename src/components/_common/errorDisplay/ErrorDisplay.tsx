import React, { useState } from "react";
import "./ErrorDisplay.css";
import { useSelector } from "react-redux";
import { getError } from "../../../redux/selectors";

interface Props {}

export const ErrorDisplay = (props: Props) => {
  // First 2 lines will be deleted
  const [str, setStr] = useState("");
  if (str.length === 0) setStr("Something went wrong. This is a SHORT message");

  const error = useSelector(getError);
  const [active, setActive] = useState(error !== null || error !== undefined);
  if (error) setActive(true);

  return (
    <div className={`error-display ${active ? "active" : "active"}`}>
      <div className="error-icon">ⓘ</div>
      <div className="error-message">{str}</div>
      <button title="Dismiss" className="dismiss-btn">
        ✖
      </button>
    </div>
  );
};
