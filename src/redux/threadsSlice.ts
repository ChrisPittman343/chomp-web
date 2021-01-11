import { Thread } from "../types/firestoreTypes";
import { ReduxAction } from "../types/reduxTypes";
import {
  createThreadFromFirestore,
  NewThreadInput,
} from "../utils/firestoreFunction";
import { updateStateNoRepeats } from "../utils/updateStateNoRepeats";
import { addThreadCreator } from "./actionCreators";
import { RootState } from "./reducer";

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
    case "threads/threadAdded": {
      return [action.payload.thread, ...state];
    }
    case "threads/threadLoaded": {
      return state;
    }
    default: {
      return state;
    }
  }
}

//THUNKS

export const addNewThread = (thread: NewThreadInput) => {
  return async function addNewThreadThunk(
    dispatch: any,
    getState: () => RootState
  ) {
    createThreadFromFirestore(thread)
      .then((t) => {
        console.log(t);
        dispatch(addThreadCreator(t));
      })
      .catch((err) => console.log(err));
  };
};
