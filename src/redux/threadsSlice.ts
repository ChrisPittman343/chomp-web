import { Thread } from "../types/firestoreTypes";
import { ReduxAction } from "../types/reduxTypes";
import { fetchThreadFromFirestore } from "../utils/fetchFromFirestore";
import {
  createThreadFromFirestore,
  NewThreadInput,
} from "../utils/firestoreFunction";
import { updateStateNoRepeats } from "../utils/updateStateNoRepeats";
import { addThreadCreator, loadThreadCreator } from "./actionCreators";
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
      return updateStateNoRepeats(state, [action.payload.thread]);
    }
    case "threads/threadLoaded": {
      return updateStateNoRepeats(state, [action.payload.thread]);
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
        dispatch(addThreadCreator(t));
      })
      .catch((err) => console.log(err));
  };
};

export const loadThread = (classId: string, threadId: string) => {
  return async function loadThreadThunk(
    dispatch: any,
    getState: () => RootState
  ) {
    fetchThreadFromFirestore(classId, threadId)
      .then(({ thread, messages }) => {
        dispatch(loadThreadCreator(thread, messages));
      })
      .catch((err) => console.log(err));
  };
};
