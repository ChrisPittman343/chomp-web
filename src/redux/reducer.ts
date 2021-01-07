import { combineReducers } from "redux";
import classesReducer from "./classesSlice";
import googleClassroomReducer from "./googleClassroomSlice";
import messagesReducer from "./messagesSlice";
import rosterReducer from "./rosterSlice";
import threadsReducer from "./threadsSlice";

const rootReducer = combineReducers({
  classes: classesReducer,
  threads: threadsReducer,
  messages: messagesReducer,
  rosters: rosterReducer,
  googleClassroom: googleClassroomReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
