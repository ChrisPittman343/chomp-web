import { ReduxAction } from "../types/reduxTypes";

const initialState: any = null;

// Use the initialState as a default value
export default function errorsReducer(
  state = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case "error/newError": {
      return action.payload.error;
    }
    default: {
      return state;
    }
  }
}
