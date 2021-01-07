import { Class } from "../types/firestoreTypes";
import { ReduxAction } from "../types/reduxTypes";
import firebase from "firebase/app";
import "firebase/firestore";
import { RootState } from "./reducer";
import {
  fetchClassesFromFirestore,
  fetchClassFromFirestore,
} from "../utils/fetchFromFirestore";
import { loadClassCreator, loadClassesCreator } from "./actionCreators";

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
    default: {
      return initialState;
    }
  }
}

export const loadAllClasses = () => {
  return async function fetchAllClassesThunk(
    dispatch: any,
    getState: () => RootState
  ) {
    fetchClassesFromFirestore()
      .then((classes) => dispatch(loadClassesCreator(classes)))
      .catch((err) => err);
  };
};

export const loadClass = (classId: string) => {
  return async function fetchAllClassesThunk(
    dispatch: any,
    getState: () => RootState
  ) {
    fetchClassFromFirestore(classId)
      .then((c) => dispatch(loadClassCreator(c)))
      .catch((err) => err);
  };
};
