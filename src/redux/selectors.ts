import { Message } from "../types/firestoreTypes";
import { RootState } from "./reducer";
import { store } from "./store";

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

export const getMessageById = (id: string) => (store: RootState) =>
  store.messages.find((m) => m.id === id);

/**
 * @returns parent message of that ID ONLY (Can be a reply to another message)
 */
export const getMessagesByParentId = (parentId: string) => (store: RootState) =>
  store.messages.filter((m) => m.parentId === parentId);
/**
 * @returns parent message of that ID ONLY (Can be a reply to another message)
 */
export const getMessagesByMessage = (message?: Message) => (store: RootState) =>
  store.messages.filter((m) => m.parentId === message?.id);

export const isAnswer = (messageId: string, threadId: string) => (
  store: RootState
) => store.threads.find((t) => t.id === threadId)?.answerId === messageId;

//#endregion

//#region Rosters Selector

export const getRosters = (store: RootState) => store.rosters;

//#endregion

//#region Google Classroom Selector

export const getGoogleClassroom = (store: RootState) => store.googleClassroom;

//#endregion
