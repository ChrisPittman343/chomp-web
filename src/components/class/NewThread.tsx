import React, { useContext } from "react";
import "./NewThread.css";
import plusIcon from "../../images/plus_icon.svg";
import { DarkModeContext } from "../../contexts";

interface Props {
  //Probably some onClick()
}

export const NewThread = (props: Props) => {
  const darkModeCtx = useContext(DarkModeContext);

  return (
    <div className="new-thread">
      <img
        className={`plus-icon ${darkModeCtx.darkMode ? "inverted" : ""}`}
        alt="Add"
        src={plusIcon}
        width={32}
        height={32}
      />
    </div>
  );
};
