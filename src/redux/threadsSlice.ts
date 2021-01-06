import { Thread } from "../types/firestoreTypes";
import { ReduxAction } from "../types/reduxTypes";

const initialState = {
  threads: [] as Thread[],
};

// Use the initialState as a default value
export default function threadsReducer(
  state = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case "threads/threadAdded": {
      return initialState;
    }

    default: {
      return initialState;
    }
  }
}
