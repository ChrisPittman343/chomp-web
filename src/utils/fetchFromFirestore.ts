import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Thread, Class } from "../types/firestoreTypes";

/**
 * Returns basic info for all of a user's classes (From their profile).
 *
 * Used primarily when a user goes to their dashboard.
 * @returns array of type Class
 */
export async function fetchClasses(user: firebase.User) {
  return firebase
    .firestore()
    .collection("users")
    .where("email", "==", user.email)
    .get()
    .then((res) => {
      if (res.empty) return [];
      return res.docs[0] //First doc is the users data
        .data()
        .classes.map((d: unknown) => (d as unknown) as Class);
    })
    .catch((err) => {
      throw err;
    });
}

/**
 * Returns starting data when loading up a new class. (When you click on a class card)
 *
 * This includes a few of the most recent threads (Sorted by creation date).
 *
 * @returns array of type Thread (No replies inside, loaded on request)
 */
export async function fetchClass(classId: string) {
  const db = firebase.firestore();
  const threadDocs = await db
    .collection("classes")
    .doc(classId)
    .collection("threads")
    .orderBy("created", "desc")
    .limit(10)
    .get()
    .then((res) => {
      if (res.empty) return [];
      else return res.docs;
    })
    .catch((err) => {
      throw err;
    });
  const threads = threadDocs.map((doc) => (doc.data() as unknown) as Thread);
  return threads;
}

/**
 * Returns a few replies in a thread (Paginate when necessary).
 * @returns a Thread object
 */
export async function fetchThread(classId: string, threadId: string) {}
