import { Store } from "../types/reduxTypes";
import { store } from "./store";

//#region Classes Selector

export const getClasses = (store: Store) => store.classes;

//#endregion

//#region Threads Selector

export const getThreads = (store: Store) => store.threads;

//#endregion

//#region Messages Selector

export const getMessages = (store: Store) => store.messages;

//#endregion
