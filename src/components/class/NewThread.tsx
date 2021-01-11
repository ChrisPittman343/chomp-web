import React, { useContext } from "react";
import "./NewThread.css";
import plusIcon from "../../images/plus_icon.svg";
import { DarkModeContext } from "../../contexts";
import { Link, useParams } from "react-router-dom";

interface Props {}

export const NewThread = (props: Props) => {
  //@ts-ignore
  const { classId } = useParams();
  const darkModeCtx = useContext(DarkModeContext);

  return (
    <div className="new-thread">
      <Link to={`/class/c/${classId}/create-thread`}>
        <img
          className={`plus-icon ${darkModeCtx.darkMode ? "inverted" : ""}`}
          alt="+"
          src={plusIcon}
          width={32}
          height={32}
        />
      </Link>
    </div>
  );
};
