import { Roster } from "../types/firestoreTypes";
import { ReduxAction } from "../types/reduxTypes";

const initialState: Roster[] = [];

// Use the initialState as a default value
export default function rosterReducer(
  state = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case "rosters/rosterLoaded": {
      return state;
    }
    case "rosters/rosterInvite": {
      return state;
    }
    case "rosters/rosterKick": {
      return state;
    }
    case "rosters/rosterMutate": {
      return state;
    }
    default: {
      return state;
    }
  }
}
