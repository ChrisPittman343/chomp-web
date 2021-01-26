import { Message, Class, Thread, Votes } from "../types/firestoreTypes";
import { GCCourseInfo } from "../types/firestoreTypes";
import {
  ClassAddedAction,
  ClassesFetchedAction,
  ClassesLoadedAction,
  ClassLoadedAction,
  MessageAddedAction,
  MessageVotedAction,
  OnlyClassLoadedAction,
  ThreadAddedAction,
  ThreadLoadedAction,
  ThreadResolvedAction,
  ThreadVotedAction,
} from "../types/reduxTypes";

//#region Classes Action Creators

export const addClassCreator = (c: Class): ClassAddedAction => {
  return {
    type: "classes/classAdded",
    payload: {
      class: c,
    },
  };
};

export const loadClassesCreator = (classes: Class[]): ClassesLoadedAction => {
  return {
    type: "classes/classesLoaded",
    payload: { classes },
  };
};

export const loadClassCreator = (
  classData: Class,
  threads: Thread[],
  threadVotes: Votes
): ClassLoadedAction => {
  return {
    type: "classes/classLoaded",
    payload: { class: classData, threads, threadVotes },
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

export const loadThreadCreator = (
  thread: Thread,
  messages: Message[],
  messageVotes: Votes
): ThreadLoadedAction => {
  return {
    type: "threads/threadLoaded",
    payload: { thread, messages, messageVotes },
  };
};

export const threadVoteCreator = (
  thread: Thread,
  finalVote: 1 | 0 | -1,
  change: 2 | 1 | 0 | -1 | -2
): ThreadVotedAction => {
  console.log(change);
  return {
    type: "threads/threadVoted",
    //@ts-ignore
    payload: { thread, finalVote, change },
  };
};

export const resolveThreadCreator = (
  threadId: string,
  messageId: string
): ThreadResolvedAction => {
  return {
    type: "threads/threadResolved",
    payload: { messageId, threadId },
  };
};

//#endregion

//#region Messages Action Creators

export const addMessageCreator = (message: Message): MessageAddedAction => {
  return {
    type: "messages/messageAdded",
    payload: { message },
  };
};

export const messageVoteCreator = (
  message: Message,
  finalVote: 1 | 0 | -1,
  change: 2 | 1 | 0 | -1 | -2
): MessageVotedAction => {
  return {
    type: "messages/messageVoted",
    payload: { message, finalVote, change },
  };
};

//#endregion

//#region Rosters Action Creators

//#endregion

//#region Google Classroom Action Creators

export const classesFetched = (
  classes: GCCourseInfo[]
): ClassesFetchedAction => {
  return {
    type: "gc/classesFetched",
    payload: { classes },
  };
};

//#endregion
