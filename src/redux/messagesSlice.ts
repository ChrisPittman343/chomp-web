import { Message } from "../types/firestoreTypes";
import { ReduxAction } from "../types/reduxTypes";
import firebase from "firebase/app";
import "firebase/firestore";

const initialState: Message[] = [];

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
