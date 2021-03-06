import { Class, Message, Roster, Thread, Votes } from "./firestoreTypes";
import { GCCourseInfo } from "./firestoreTypes";

export interface GoogleClassroom {
  accessToken?: {
    token: string;
    timeSaved: number;
  };
  classes: GCCourseInfo[];
}

//#region Class Actions

export interface ClassAddedAction {
  type: "classes/classAdded";
  payload: {
    class: Class;
  };
}

export interface ClassesLoadedAction {
  type: "classes/classesLoaded";
  payload: {
    classes: Class[];
  };
}

export interface ClassLoadedAction {
  type: "classes/classLoaded";
  payload: {
    class: Class;
    threads: Thread[];
    threadVotes: Votes;
  };
}

export interface OnlyClassLoadedAction {
  type: "classes/onlyClassLoaded";
  payload: {
    class: Class;
  };
}

type ClassAction =
  | ClassAddedAction
  | ClassesLoadedAction
  | ClassLoadedAction
  | OnlyClassLoadedAction;
//#endregion

//#region Thread Actions

export interface ThreadLoadedAction {
  type: "threads/threadLoaded";
  payload: {
    thread: Thread;
    messages: Message[];
    messageVotes: Votes;
  };
}

export interface ThreadAddedAction {
  type: "threads/threadAdded";
  payload: {
    thread: Thread;
  };
}

export interface ThreadResolvedAction {
  type: "threads/threadResolved";
  payload: {
    threadId: string;
    messageId: string;
  };
}

export interface ThreadClosedAction {
  type: "threads/threadClosed";
  payload: {
    threadId: string;
  };
}

export interface ThreadVotedAction {
  type: "threads/threadVoted";
  payload: {
    thread: Thread;
    finalVote: 1 | 0 | -1;
    change: 2 | 1 | 0 | -1 | -2;
  };
}

type ThreadAction =
  | ThreadLoadedAction
  | ThreadAddedAction
  | ThreadResolvedAction
  | ThreadClosedAction
  | ThreadVotedAction;
//#endregion

//#region Message Actions

export interface MessageAddedAction {
  type: "messages/messageAdded";
  payload: {
    message: Message;
  };
}

export interface MessageVotedAction {
  type: "messages/messageVoted";
  payload: {
    message: Message;
    finalVote: 1 | 0 | -1;
    change: 2 | 1 | 0 | -1 | -2;
  };
}

type MessageAction = MessageAddedAction | MessageVotedAction;
//#endregion

//#region Roster Actions

export interface RosterLoadedAction {
  type: "rosters/rosterLoaded";
  payload: {
    roster: Roster;
  };
}

export interface RosterKickUserAction {
  type: "rosters/rosterKick";
  payload: {
    email: string;
  };
}

export interface RosterInviteUserAction {
  type: "rosters/rosterInvite";
  payload: {
    email: string;
  };
}

export interface RosterMutateUserAction {
  type: "rosters/rosterMutate";
  payload: {
    email: string;
    newRole?: "teacher" | "student";
    //Some other mutations, probably
  };
}

type RosterAction =
  | RosterLoadedAction
  | RosterKickUserAction
  | RosterInviteUserAction
  | RosterMutateUserAction;
//#endregion

//#region Google Classroom Actions

export interface TokenRecievedAction {
  type: "gc/tokenRecieved";
  payload: {
    token: string;
  };
}

export interface ClassesFetchedAction {
  type: "gc/classesFetched";
  payload: {
    classes: GCCourseInfo[];
  };
}

type GoogleClassroomAction = TokenRecievedAction | ClassesFetchedAction;
//#endregion

export interface ErrorAction {
  type: "error/newError";
  payload: {
    error: any;
  };
}
export type ReduxAction =
  | ClassAction
  | ThreadAction
  | MessageAction
  | RosterAction
  | GoogleClassroomAction
  | ErrorAction;
