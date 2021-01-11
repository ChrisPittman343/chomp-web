import firebase from "firebase/app";
import "firebase/firestore";

export interface Class {
  id: string;
  roster: string;
  name: string;
  section: string;
  description: string;
  tags?: string[];
  participants: string[];
}
//For threads and messages, having a subclass of anonymous_X might be a good idea
export interface Thread {
  id: string;
  classId: string;
  className: string;
  email: string;
  title: string;
  message: string;
  tags?: string[];
  status: {
    numMessages: number;
    isResolved: boolean;
    isClosed: boolean;
  };
  created: firebase.firestore.Timestamp;
}

//For threads and messages, having a subclass of anonymous_X might be a good idea
export interface Message {
  id: string;
  parentId: string;
  isTop: boolean;
  email: string;
  message: string;
  sent: string;
}

export interface Roster {
  id: string;
  classId: string;
  people: {
    role?: "teacher" | "student";
    photoUrl?: string;
    email: string;
  }[];
}
