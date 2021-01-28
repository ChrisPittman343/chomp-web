import { combineReducers } from "redux";
import classesReducer from "./classesSlice";
import errorsReducer from "./errorsSlice";
import googleClassroomReducer from "./googleClassroomSlice";
import messagesReducer from "./messagesSlice";
import rosterReducer from "./rosterSlice";
import threadsReducer from "./threadsSlice";
import votesReducer from "./votesSlice";

const rootReducer = combineReducers({
  classes: classesReducer,
  threads: threadsReducer,
  messages: messagesReducer,
  votes: votesReducer,
  rosters: rosterReducer,
  googleClassroom: googleClassroomReducer,
  errors: errorsReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
