import { Class } from "../types/firestoreTypes";
import { ReduxAction } from "../types/reduxTypes";

const initialState = {
  classes: [] as Class[],
};

// Use the initialState as a default value
export default function classesReducer(
  state = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case "classes/classAdded": {
      return {
        ...state,
        classes: [
          ...state.classes,
          {
            ...action.payload,
          },
        ],
      };
    }
    case "threads/threadAdded": {
      return {
        ...state,
        classes: [...state.classes],
      };
    }
    default: {
      return initialState;
    }
  }
}
