import React from "react";
import { RouteProps } from "react-router-dom";

interface Props {
  children: any;
  path: string;
  routeProps?: RouteProps;
}
// To handle role authorization, check role from firestore? Or read this article
//https://dev.to/emeka/securing-your-express-node-js-api-with-firebase-auth-4b5f
export const TeacherAuthRoute = (props: Props) => {
  return <div></div>;
};
