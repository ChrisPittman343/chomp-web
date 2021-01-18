/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { loadOnlyClass } from "../../redux/classesSlice";
import { getClassById } from "../../redux/selectors";
import { addNewThread } from "../../redux/threadsSlice";
import { FormField } from "../createClass/FormField";
import { SolidBtn } from "../_common/buttons/SolidBtn";
import { TextBtn } from "../_common/buttons/TextBtn";
import { Spinner } from "../_common/Spinner";
import "./CreateThread.css";
import { MessageDisplay } from "./MessageDisplay";
import { TagBtn } from "./TagBtn";

interface Props {}

export const CreateThread = (props: Props) => {
  //@ts-ignore
  const { classId } = useParams();
  const dispatch = useDispatch();
  const c = useSelector(getClassById(classId));
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState([] as string[]);
  const history = useHistory();

  useEffect(() => {
    dispatch(loadOnlyClass(classId));
  }, []);

  const createNewThread = async () => {
    dispatch(
      addNewThread(
        {
          classId: classId,
          title: title.trim(),
          message: message.trim(),
          tags,
        },
        history
      )
    );
  };

  /**
   * @param b value ? add tag to list : remove tag from list
   */
  const toggleTag = (b: boolean, tag: string) => {
    if (b) {
      const newList = [...tags];
      newList.push(tag);
      setTags(newList);
    } else setTags(tags.filter((t) => t !== tag));
  };

  return c ? (
    <div className="create-thread-page">
      <div className="create-thread-container">
        <FormField
          currentValue={title}
          handleChange={setTitle}
          required
          children="Thread Title"
        />
        <div>
          <label htmlFor="thread message" className="bold normal-txt">
            Message <br /> <br />
          </label>
          <MessageDisplay value={message} setValue={setMessage} />{" "}
        </div>
        <div className="tag-section">
          <div className="bold" style={{ paddingBottom: 10 }}>
            Tags
          </div>
          <div className="tag-list">
            {c.tags?.map((t, tIx) => (
              <TagBtn key={tIx} tag={t} toggleTag={(b) => toggleTag(b, t)} />
            ))}
          </div>
        </div>
        <div className="anonymous-section">
          <span className="bold">Appear Anonymous*</span>
          <br />{" "}
          <span className="tiny-txt">
            *Administrators can choose to view anonymous posts, but they will
            still count towards participation.
          </span>
        </div>
        <div className="form-actions">
          <Link to={`/class/c/${classId}`}>
            {" "}
            <TextBtn>Cancel</TextBtn>
          </Link>
          <SolidBtn filled onClick={async () => await createNewThread()}>
            Create Thread
          </SolidBtn>
        </div>
      </div>
    </div>
  ) : (
    <Spinner parentSize={70} style={{ margin: "auto", marginTop: 70 }} />
  );
};
