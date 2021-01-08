import { createContext } from "react";
import firebase from "firebase";

interface UserContextValue {
  user: firebase.User | null;
  loading: boolean;
  error: any;
}

interface DarkModeContextValue {
  darkMode: boolean;
  toggleDarkMode: Function;
}

//@ts-ignore
export const DarkModeContext = createContext<DarkModeContextValue>({});
//@ts-ignore
export const UserContext = createContext<UserContextValue>({});
