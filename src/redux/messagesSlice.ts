import { Message } from "../types/firestoreTypes";
import { ReduxAction } from "../types/reduxTypes";
import { updateStateNoRepeats } from "../utils/updateStateNoRepeats";

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
      return state;
    }
    default: {
      return state;
    }
  }
}
