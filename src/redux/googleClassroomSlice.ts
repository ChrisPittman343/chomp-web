import { GoogleClassroom, ReduxAction } from "../types/reduxTypes";
import firebase from "firebase/app";
import "firebase/firestore";
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
        ...state,
        classes: [...state.classes, ...action.payload.classes],
      };
    }
    case "gc/tokenRecieved": {
      return state;
    }
    default: {
      return state;
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
      if (Date.now() - timeSaved <= 15 * 60 * 1000) throw BAD_TOKEN; //15 minutes
      const user = firebase.auth().currentUser;
      if (!user) throw NO_LOGIN;
      authedRequest("/get-classes", token);
    } else {
      throw BAD_TOKEN;
    }
  };
};
