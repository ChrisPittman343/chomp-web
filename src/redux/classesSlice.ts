import { Class } from "../types/firestoreTypes";
import { ReduxAction } from "../types/reduxTypes";
import { RootState } from "./reducer";
import {
  fetchClassDataFromFirestore,
  fetchClassesFromFirestore,
  fetchClassFromFirestore,
} from "../utils/fetchFromFirestore";
import {
  addClassCreator,
  loadClassCreator,
  loadClassesCreator,
  loadOnlyClassCreator,
} from "./actionCreators";
import { updateStateNoRepeats } from "../utils/updateStateNoRepeats";
import {
  createClassFromFirestore,
  NewClassInput,
} from "../utils/firestoreFunction";

const initialState: Class[] = [];

// Use the initialState as a default value
export default function classesReducer(
  state = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case "classes/classAdded": {
      return [action.payload.class, ...state];
    }
    case "classes/classesLoaded": {
      return updateStateNoRepeats(state, action.payload.classes);
    }
    case "classes/onlyClassLoaded": {
      return updateStateNoRepeats(state, [action.payload.class]);
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

export const addClass = (c: NewClassInput, history: any) => {
  return async function addClassThunk(
    dispatch: any,
    getState: () => RootState
  ) {
    createClassFromFirestore(c)
      .then((c) => {
        dispatch(addClassCreator(c));
        return c;
      })
      .then((c) => history.push(`/class/c/${c.id}`))
      .catch((err) => console.log(err));
  };
};

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

export const loadOnlyClass = (classId: string) => {
  return async function loadOnlyClassThunk(
    dispatch: any,
    getState: () => RootState
  ) {
    fetchClassFromFirestore(classId)
      .then((c) => dispatch(loadOnlyClassCreator(c)))
      .catch((err) => console.log(err));
  };
};

/**
 * Called on the screen where you see the threads
 */
export const loadClass = (classId: string) => {
  return async function loadClassThunk(
    dispatch: any,
    getState: () => RootState
  ) {
    fetchClassDataFromFirestore(classId)
      .then((d) => dispatch(loadClassCreator(d.class, d.threads)))
      .catch((err) => console.log(err));
  };
};
