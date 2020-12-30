import React, { useContext } from "react";
import { Route, RouteProps } from "react-router-dom";
import { UserContext } from "../../../contexts";
import { signInWithGoogle } from "../../../utils/signInWithGoogle";
import { Spinner } from "../Spinner";

interface Props {
  children: any;
  path: string;
  routeProps?: RouteProps;
}

export const BasicAuthRoute = (props: Props) => {
  const { user, loading, error } = useContext(UserContext);
  let content;
  if (loading) {
    content = (
      <Spinner parentSize={70} style={{ margin: "auto", marginTop: 70 }} />
    );
  } else if (error || !user) {
    signInWithGoogle();
    content = <></>;
  } else {
    content = props.children;
  }
  return <Route {...props.routeProps} path={props.path} children={content} />;
};
