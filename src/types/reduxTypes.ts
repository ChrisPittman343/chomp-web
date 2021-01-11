import { Class, Message, Roster, Thread } from "./firestoreTypes";
import { HTTPSCourseInfo } from "./httpsTypes";

export interface Store {
  classes: Class[];
  threads: Thread[];
  messages: Message[];
  rosters: Roster[];
  googleClassroom: GoogleClassroom;
}

export interface GoogleClassroom {
  accessToken?: {
    token: string;
    timeSaved: number;
  };
  classes: HTTPSCourseInfo[];
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
  };
}

export interface ThreadAddedAction {
  type: "threads/threadAdded";
  payload: {
    thread: Thread;
  };
}

type ThreadAction = ThreadLoadedAction | ThreadAddedAction;
//#endregion

//#region Message Actions

export interface MessageAddedAction {
  type: "messages/messageAdded";
  payload: {
    message: Message;
  };
}

type MessageAction = MessageAddedAction;
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
    classes: HTTPSCourseInfo[];
  };
}

type GoogleClassroomAction = TokenRecievedAction | ClassesFetchedAction;
//#endregion

export type ReduxAction =
  | ClassAction
  | ThreadAction
  | MessageAction
  | RosterAction
  | GoogleClassroomAction;
