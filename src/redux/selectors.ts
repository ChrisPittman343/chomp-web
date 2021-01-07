import { RootState } from "./reducer";

//#region Classes Selector

export const getClasses = (store: RootState) => store.classes;

//#endregion

//#region Threads Selector

export const getThreads = (store: RootState) => store.threads;

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
