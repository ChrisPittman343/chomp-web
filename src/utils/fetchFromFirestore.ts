import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Thread, Class, Message, Roster } from "../types/firestoreTypes";
import { NO_LOGIN } from "../types/errors";

/**
 * Returns basic info for all of a user's classes (From their profile).
 *0
 * Used primarily when a user goes to their dashboard.
 * @returns array of type Class
 */
export async function fetchClassesFromFirestore(): Promise<Class[]> {
  const user = firebase.auth().currentUser;
  if (!user) throw NO_LOGIN;
  return firebase
    .firestore()
    .collection("users")
    .where("email", "==", user.email)
    .get()
    .then((res) => {
      if (res.empty) return [] as Class[];
      return res.docs[0] //First doc is the users data
        .data()
        .classes.map((c: unknown) => c as Class);
    })
    .catch((err) => {
      throw err;
    });
}

/**
 * Returns starting data when loading up a new class. (When you click on a class card)
 *
 * This includes a few of the most recent threads (Sorted by creation date), tags, and very basic roster info.
 * @returns array of type Thread (No replies inside, loaded on request)
 */
export async function fetchClassFromFirestore(
  classId: string
): Promise<Thread[]> {
  const db = firebase.firestore();
  const threadDocs = await db
    .collection("classes")
    .doc(classId)
    .collection("threads")
    .orderBy("created", "desc")
    .limit(10)
    .get()
    .then((res) => {
      return res.empty ? [] : res.docs;
    })
    .catch((err) => {
      throw err;
    });
  const threads = threadDocs.map((doc) => doc.data() as Thread);
  return threads;
}

/**
 * Returns a few replies in a thread (Paginate when necessary).
 * @returns a Thread object
 */
export async function fetchThreadFromFirestore(
  classId: string,
  threadId: string
): Promise<Message[]> {
  const db = firebase.firestore();
  return db
    .collection("classes")
    .doc(classId)
    .collection("threads")
    .doc(threadId)
    .collection("messages")
    .orderBy("sent", "desc")
    .limit(10)
    .get()
    .then((res) => {
      return res.empty ? [] : res.docs.map((doc) => doc.data() as Message);
    })
    .catch((err) => {
      throw err;
    });
}

/**
 * Returns roster information for a class
 * @param id
 * @param isRosterId if true, the id will refer to a roster's id, else a class' id. Defaults to roster.
 */
export async function fetchRosterFromFirestore(
  id: string,
  isRosterId = true
): Promise<Roster> {
  const db = firebase.firestore();
  const rosterId = isRosterId
    ? id
    : await db
        .collection("classes")
        .doc(id)
        .get()
        .then((res) => {
          return res.get("roster");
        })
        .catch((err) => {
          throw err;
        });
  return db
    .collection("rosters")
    .doc(rosterId)
    .get()
    .then((res) => {
      //Might have to do some logic to parse data, but this is a good start
      return res.data() as Roster;
    })
    .catch((err) => {
      throw err;
    });
}
