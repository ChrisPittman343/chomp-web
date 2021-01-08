import { RootState } from "./reducer";

//#region Classes Selector

export const getClasses = (store: RootState) => store.classes;

export const getClassById = (id: string) => (store: RootState) =>
  store.classes.find((c) => c.id === id);

//#endregion

//#region Threads Selector

export const getThreads = (classId: string) => (store: RootState) =>
  store.threads.filter((t) => t.classId === classId);

export const getThreadById = (id: string) => (store: RootState) =>
  store.threads.find((t) => t.id === id);

//#endregion

//#region Messages Selector

export const getMessages = (store: RootState) => store.messages;

//#endregion

//#region Rosters Selector

export const getRosters = (store: RootState) => store.rosters;

//#endregion

//#region Google Classroom Selector

export const getGoogleClassroom = (store: RootState) => store.googleClassroom;

//#endregion
