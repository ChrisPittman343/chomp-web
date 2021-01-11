import { Message, Class, Thread } from "../types/firestoreTypes";
import { HTTPSCourseInfo } from "../types/httpsTypes";
import {
  ClassesFetchedAction,
  ClassesLoadedAction,
  ClassLoadedAction,
  MessageAddedAction,
  OnlyClassLoadedAction,
  ThreadAddedAction,
} from "../types/reduxTypes";

//#region Classes Action Creators

export const loadClassesCreator = (classes: Class[]): ClassesLoadedAction => {
  return {
    type: "classes/classesLoaded",
    payload: { classes },
  };
};

export const loadClassCreator = (
  classData: Class,
  threads: Thread[]
): ClassLoadedAction => {
  return {
    type: "classes/classLoaded",
    payload: { class: classData, threads },
  };
};

export const loadOnlyClassCreator = (
  classData: Class
): OnlyClassLoadedAction => {
  return {
    type: "classes/onlyClassLoaded",
    payload: { class: classData },
  };
};

//#endregion

//#region Threads Action Creators

export const addThreadCreator = (thread: Thread): ThreadAddedAction => {
  return {
    type: "threads/threadAdded",
    payload: { thread },
  };
};

//#endregion

//#region Messages Action Creators

export const messageAdded = (message: Message): MessageAddedAction => {
  return {
    type: "messages/messageAdded",
    payload: { message },
  };
};

//#endregion

//#region Rosters Action Creators

//#endregion

//#region Google Classroom Action Creators

export const classesFetched = (
  classes: HTTPSCourseInfo[]
): ClassesFetchedAction => {
  return {
    type: "gc/classesFetched",
    payload: { classes },
  };
};

//#endregion
