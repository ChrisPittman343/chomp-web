import { Class, Message, Thread } from "./firestoreTypes";

export interface Store {
  classes: Class[];
  threads: Thread[];
  messages: Message[];
}

//#region Class Actions

export interface ClassAddedAction {
  type: "classes/classAdded";
  payload: {
    class: Class;
  };
}

//#endregion

//#region Thread Actions

export interface ThreadAddedAction {
  type: "threads/threadAdded";
  payload: {
    thread: Thread;
  };
}

//#endregion

//#region Message Actions

export interface MessageAddedAction {
  type: "messages/messageAdded";
  payload: {
    message: Message;
  };
}

//#endregion

type ClassAction = ClassAddedAction;
type ThreadAction = ThreadAddedAction;
type MessageAction = MessageAddedAction;

export type ReduxAction = ClassAction | ThreadAction | MessageAction;
