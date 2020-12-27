import React, { useContext } from "react";
import { UserContext } from "../../contexts";
import { Spinner } from "./Spinner";

interface Props {
  photoURL: string;
  size?: number;
  style?: React.CSSProperties;
}
export const ProfilePicture = (props: Props) => {
  const userCtx = useContext(UserContext)!;
  const imgSize = props.size ? props.size : 25;
  return userCtx.user ? (
    <img
      alt="Profile"
      src={props.photoURL}
      style={{
        borderRadius: "100%",
        width: imgSize,
        height: imgSize,
        ...props.style,
      }}
    />
  ) : (
    <Spinner parentSize={imgSize} />
  );
};
