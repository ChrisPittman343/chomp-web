import { Message } from "../types/firestoreTypes";
import { RootState } from "./reducer";

//#region Classes

export const getClasses = (store: RootState) => store.classes;

export const getClassById = (id: string) => (store: RootState) =>
  store.classes.find((c) => c.id === id);

//#endregion

//#region Threads

export const getThreads = (classId: string) => (store: RootState) =>
  store.threads.filter((t) => t.classId === classId);

export const getThreadById = (id: string) => (store: RootState) =>
  store.threads.find((t) => t.id === id);

//#endregion

//#region Messages

export const getMessageById = (id: string) => (store: RootState) =>
  store.messages.find((m) => m.id === id);

export const getMessagesByParentId = (parentId: string) => (store: RootState) =>
  store.messages.filter((m) => m.parentId === parentId);

export const getMessagesByMessage = (message?: Message) => (store: RootState) =>
  store.messages.filter((m) => m.parentId === message?.id);

//#endregion

//#region Votes

export const getVoteOnThread = (threadId: string) => (
  store: RootState
): 1 | 0 | -1 => {
  const vote = store.votes.threadVotes.find((v) => v.id === threadId);
  return vote ? vote.value : 0;
};

export const getVoteOnMessage = (messageId: string) => (
  store: RootState
): 1 | 0 | -1 => {
  const vote = store.votes.messageVotes.find((v) => v.id === messageId);
  return vote ? vote.value : 0;
};

//#endregion

//#region Rosters

export const getRosters = (store: RootState) => store.rosters;

//#endregion

//#region Google Classroom

export const getGoogleClassroom = (store: RootState) => store.googleClassroom;

//#endregion

export const getError = (store: RootState) => store.errors;
