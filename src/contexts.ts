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

export const DarkModeContext = createContext<DarkModeContextValue | null>(null);
export const UserContext = createContext<UserContextValue | null>(null);
