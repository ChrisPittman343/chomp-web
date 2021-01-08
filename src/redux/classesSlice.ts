import { Class } from "../types/firestoreTypes";
import { ReduxAction } from "../types/reduxTypes";
import { RootState } from "./reducer";
import {
  fetchClassesFromFirestore,
  fetchClassFromFirestore,
} from "../utils/fetchFromFirestore";
import { loadClassCreator, loadClassesCreator } from "./actionCreators";
import { updateStateNoRepeats } from "../utils/updateStateNoRepeats";

const initialState: Class[] = [];

// Use the initialState as a default value
export default function classesReducer(
  state = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case "classes/classAdded": {
      return [...state, action.payload.class];
    }
    case "classes/classesLoaded": {
      return [...state, ...action.payload.classes];
    }
    case "classes/classLoaded": {
      return updateStateNoRepeats(state, [action.payload.class]);
    }
    default: {
      return state;
    }
  }
}

//THUNKS

export const loadAllClasses = () => {
  return async function loadAllClassesThunk(
    dispatch: any,
    getState: () => RootState
  ) {
    fetchClassesFromFirestore()
      .then((classes) => dispatch(loadClassesCreator(classes)))
      .catch((err) => err);
  };
};

export const loadClass = (classId: string) => {
  return async function loadClassThunk(
    dispatch: any,
    getState: () => RootState
  ) {
    fetchClassFromFirestore(classId)
      .then((d) => dispatch(loadClassCreator(d.class, d.threads)))
      .catch((err) => console.log(err));
  };
};
