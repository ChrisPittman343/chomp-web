import firebase from "firebase/app";
import "firebase/firestore";

export interface Class {
  id: string;
  threadIds?: string[];
  tags?: string[];
  name: string;
  section: string;
  description: string;
}
export interface Thread {
  id: string;
  classId: string;
  email: string;
  title: string;
  message: string;
  status: {
    numMessages: number;
    isResolved: boolean;
    isClosed: boolean;
  };
  created: firebase.firestore.Timestamp;
  replyIds?: string[];
}

export interface Message {
  id: string;
  threadId: string;
  email: string;
  message: string;
  sent: string;
  replyIds: string[];
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
