import { createContext } from "react";
import firebase from "firebase";
import { Class } from "./types/firestoreTypes";

interface UserContextValue {
  user: firebase.User | null;
  loading: boolean;
  error: any;
}

interface DarkModeContextValue {
  darkMode: boolean;
  toggleDarkMode: Function;
}

interface ClassesContextValue {
  classes: Class[];
  setClasses: Function;
}

//@ts-ignore
export const DarkModeContext = createContext<DarkModeContextValue>({});
//@ts-ignore
export const UserContext = createContext<UserContextValue>({});
//@ts-ignore
export const ClassesContext = createContext<ClassesContextValue>({});
