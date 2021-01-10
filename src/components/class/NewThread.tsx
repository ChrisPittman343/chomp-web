import React, { useContext } from "react";
import "./NewThread.css";
import plusIcon from "../../images/plus_icon.svg";
import { DarkModeContext } from "../../contexts";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewThread } from "../../redux/threadsSlice";

interface Props {
  //Probably some onClick()
}

export const NewThread = (props: Props) => {
  //@ts-ignore
  const { classId } = useParams();
  const dispatch = useDispatch();
  const darkModeCtx = useContext(DarkModeContext);

  const createNewThread = async () => {
    dispatch(
      addNewThread({
        classId: classId,
        title: "This is another test thread",
        message: "But if it works thats pretty cool!",
      })
    );
  };

  return (
    <div className="new-thread">
      <img
        className={`plus-icon ${darkModeCtx.darkMode ? "inverted" : ""}`}
        alt="+"
        src={plusIcon}
        width={32}
        height={32}
        onClick={async () => await createNewThread()}
      />
    </div>
  );
};
