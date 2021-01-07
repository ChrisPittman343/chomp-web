import { GoogleClassroom, ReduxAction } from "../types/reduxTypes";
import firebase from "firebase/app";
import "firebase/firestore";
import { HTTPSCourseInfo } from "../types/httpsTypes";
import { RootState } from "./reducer";
import { authedRequest } from "../utils/authedRequest";
import { BAD_TOKEN, NO_LOGIN } from "../types/errors";

const initialState: GoogleClassroom = { classes: [] };

// Use the initialState as a default value
export default function googleClassroomReducer(
  state = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case "gc/classesFetched": {
      return {
        ...initialState,
        classes: [...initialState.classes, ...action.payload.classes],
      };
    }
    case "gc/tokenRecieved": {
      return initialState;
    }
    default: {
      return initialState;
    }
  }
}

export const fetchGoogleClassroom = () => {
  return async function fetchGoogleClassroomThunk(
    dispatch: any,
    getState: () => RootState
  ) {
    if (getState().googleClassroom.accessToken) {
      const { token, timeSaved } = getState().googleClassroom.accessToken!;
      //Check to see how much time has passed since the token was saved
      const user = firebase.auth().currentUser;
      if (!user) throw NO_LOGIN;
      authedRequest("/get-classes", token);
    } else {
      throw BAD_TOKEN;
    }
  };
};
