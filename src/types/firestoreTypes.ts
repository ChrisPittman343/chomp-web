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
  numMessages: number;
  answerId?: string;
  isClosed: boolean;
  score: number;
  created: firebase.firestore.Timestamp;
}

//For threads and messages, having a subclass of anonymous_X might be a good idea
export interface Message {
  classId: string;
  threadId: string;
  parentId: string;
  id: string;
  isTop: boolean;
  email: string;
  message: string;
  score: number;
  sent: firebase.firestore.Timestamp;
}

export interface Votes {
  email: string;
  votes: Vote[];
}

export interface Vote {
  id: string;
  value: 1 | 0 | -1;
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

export interface GCCourseInfo {
  course: {
    name: string;
    section: string;
    description: string;
  };
  roster: string[];
}
