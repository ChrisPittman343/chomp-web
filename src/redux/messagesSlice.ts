import { Message } from "../types/firestoreTypes";
import { ReduxAction } from "../types/reduxTypes";

const initialState = {
  messages: [] as Message[],
};

// Use the initialState as a default value
export default function messagesReducer(
  state = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case "messages/messageAdded": {
      return initialState;
    }

    default: {
      return initialState;
    }
  }
}
