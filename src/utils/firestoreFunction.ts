import { Class, Thread } from "../types/firestoreTypes";
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/firestore";

export interface NewClassInput {
  name: string;
  section: string;
  description: string;
  participants: string[];
}

export interface NewThreadInput {
  classId: string;
  title: string;
  message?: string;
  tags?: string[];
}

export async function createClassFromFirestore(
  newClass: NewClassInput
): Promise<Class> {
  return firebase
    .functions()
    .httpsCallable("createClass")(newClass)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function createThreadFromFirestore(
  newThread: NewThreadInput
): Promise<Thread> {
  return firebase
    .functions()
    .httpsCallable("createThread")(newThread)
    .then((res) => {
      return {
        ...res.data,
        created: firebase.firestore.Timestamp.fromMillis(
          res.data.created._seconds * 1000
        ),
      } as Thread;
    })
    .catch((err) => {
      throw err;
    });
}
