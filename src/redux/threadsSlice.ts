import { Thread } from "../types/firestoreTypes";
import { ReduxAction } from "../types/reduxTypes";
import { updateStateNoRepeats } from "../utils/updateStateNoRepeats";

const initialState: Thread[] = [];

// Use the initialState as a default value
export default function threadsReducer(
  state = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case "classes/classLoaded": {
      return updateStateNoRepeats(state, action.payload.threads);
    }
    case "threads/threadLoaded": {
      return state;
    }
    default: {
      return state;
    }
  }
}
