import { Thread } from "../types/firestoreTypes";
import { ReduxAction } from "../types/reduxTypes";
import firebase from "firebase/app";
import "firebase/firestore";

const initialState: Thread[] = [];

// Use the initialState as a default value
export default function threadsReducer(
  state = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case "threads/threadLoaded": {
      return initialState;
    }

    default: {
      return initialState;
    }
  }
}
