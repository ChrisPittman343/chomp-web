import { Thread } from "../types/firestoreTypes";
import { ReduxAction } from "../types/reduxTypes";
import { fetchThreadFromFirestore } from "../utils/fetchFromFirestore";
import {
  createThreadFromFirestore,
  NewThreadInput,
} from "../utils/firestoreFunction";
import { resolveFirestoreThread } from "../utils/updateFirestore";
import { updateStateNoRepeats } from "../utils/updateStateNoRepeats";
import {
  addThreadCreator,
  loadThreadCreator,
  resolveThreadCreator,
} from "./actionCreators";
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
    case "threads/threadResolved": {
      return state.map((t) =>
        t.id === action.payload.threadId
          ? { answerId: action.payload.messageId, ...t }
          : t
      );
    }
    // Here, create an updated thread with the new score
    // This will be pushed into the new state
    case "threads/threadVoted": {
      const oldThread = action.payload.thread;
      const updatedThread = {
        ...oldThread,
        score: oldThread.score + action.payload.change,
      } as Thread;
      return updateStateNoRepeats(state, [updatedThread]);
    }
    default: {
      return state;
    }
  }
}

//THUNKS

export const addNewThread = (thread: NewThreadInput, history: any) => {
  return async function addNewThreadThunk(
    dispatch: any,
    getState: () => RootState
  ) {
    createThreadFromFirestore(thread)
      .then((t) => {
        dispatch(addThreadCreator(t));
        return t;
      })
      .then((t) => history.push(`/class/c/${t.classId}/t/${t.id}`))
      .catch((err) => console.log(err));
  };
};

export const loadThread = (classId: string, threadId: string) => {
  return async function loadThreadThunk(
    dispatch: any,
    getState: () => RootState
  ) {
    fetchThreadFromFirestore(threadId)
      .then(({ thread, messages, messageVotes }) => {
        dispatch(loadThreadCreator(thread, messages, messageVotes));
      })
      .catch((err) => console.log(err));
  };
};

export const resolveThread = (threadId: string, messageId: string) => {
  return async function (dispatch: any, getState: () => RootState) {
    resolveFirestoreThread(threadId, messageId)
      .then(({ messageId, threadId }) => {
        dispatch(resolveThreadCreator(threadId, messageId));
      })
      .catch((err) => console.log(err));
  };
};
