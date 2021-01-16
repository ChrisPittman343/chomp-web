import { Message } from "../types/firestoreTypes";
import { ReduxAction } from "../types/reduxTypes";
import {
  createMessageFromFirestore,
  NewMessageInput,
} from "../utils/firestoreFunction";
import { updateStateNoRepeats } from "../utils/updateStateNoRepeats";
import { addMessageCreator, addThreadCreator } from "./actionCreators";
import { RootState } from "./reducer";

const initialState: Message[] = [];

// Use the initialState as a default value
export default function messagesReducer(
  state = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case "threads/threadLoaded": {
      return updateStateNoRepeats(state, action.payload.messages);
    }
    case "messages/messageAdded": {
      return updateStateNoRepeats(state, [action.payload.message]);
    }
    default: {
      return state;
    }
  }
}

// THUNKS

export const addNewMessage = (message: NewMessageInput) => {
  return async function addNewMessageThunk(
    dispatch: any,
    getState: () => RootState
  ) {
    createMessageFromFirestore(message)
      .then((m) => {
        dispatch(addMessageCreator(m));
      })
      .catch((err) => console.log(err));
  };
};
