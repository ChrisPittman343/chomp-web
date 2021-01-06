import { combineReducers } from "redux";
import classesReducer from "./classesSlice";
import messagesReducer from "./messagesSlice";
import threadsReducer from "./threadsSlice";

const rootReducer = combineReducers({
  classes: classesReducer,
  threads: threadsReducer,
  messages: messagesReducer,
});

export default rootReducer;
