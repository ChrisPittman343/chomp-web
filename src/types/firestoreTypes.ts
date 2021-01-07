export interface Class {
  id: string;
  threadIds?: string[];
  name: string;
  section: string;
  description: string;
}
export interface Thread {
  id: string;
  classId: string;
  email: string;
  message: string;
  created: string;
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
