import React, { useState } from "react";
import { Spinner } from "./Spinner";

interface Props {
  photoURL: string;
  size?: number;
  style?: React.CSSProperties;
}
export const ProfilePicture = (props: Props) => {
  const [loaded, setLoaded] = useState(false);
  const imgSize = props.size ? props.size : 25;
  const display = loaded ? ["block", "none"] : ["none", "block"];
  return (
    <>
      <img
        alt="Profile"
        src={props.photoURL}
        style={{
          display: display[0],
          borderRadius: "100%",
          width: imgSize,
          height: imgSize,
          ...props.style,
        }}
        onLoad={() => setLoaded(true)}
      />
      <Spinner parentSize={imgSize} style={{ display: display[1] }} />
    </>
  );
};
