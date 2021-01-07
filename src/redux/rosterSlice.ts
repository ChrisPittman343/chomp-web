import { Roster } from "../types/firestoreTypes";
import { ReduxAction } from "../types/reduxTypes";
import firebase from "firebase/app";
import "firebase/firestore";

const initialState: Roster[] = [];

// Use the initialState as a default value
export default function rosterReducer(
  state = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case "rosters/rosterLoaded": {
      return initialState;
    }
    case "rosters/rosterInvite": {
      return initialState;
    }
    case "rosters/rosterKick": {
      return initialState;
    }
    case "rosters/rosterMutate": {
      return initialState;
    }
    default: {
      return initialState;
    }
  }
}
