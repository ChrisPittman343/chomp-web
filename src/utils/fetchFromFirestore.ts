import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Thread, Class, Message, Roster } from "../types/firestoreTypes";
import { NO_LOGIN, NULL_RESPONSE } from "../types/errors";

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

export async function fetchClassFromFirestore(classId: string): Promise<Class> {
  const classRef = firebase.firestore().collection("classes").doc(classId);
  return classRef
    .get()
    .then((res) => {
      if (!res.exists) throw NULL_RESPONSE;
      return res.data() as Class;
    })
    .catch((err) => {
      throw err;
    });
}

/**
 * Returns starting data when loading up a new class. (When you click on a class card)
 *
 * This includes a few of the most recent threads (Sorted by creation date).
 * @returns array of type Thread
 */
export async function fetchClassDataFromFirestore(classId: string) {
  const db = firebase.firestore();
  const classData = await fetchClassFromFirestore(classId)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  const threadDocs = await db
    .collection("threads")
    .where("classId", "==", classId)
    .orderBy("created", "desc")
    .limit(12)
    .get()
    .then((res) => {
      return res.empty ? [] : res.docs;
    })
    .catch((err) => {
      throw err;
    });
  classData.id = classId;
  const threads = threadDocs.map((doc) => doc.data() as Thread);
  threads.forEach((t) => {
    t.classId = classId;
  });
  return { class: classData, threads };
}

/**
 * Returns a few replies in a thread (Paginate when necessary), plus the thread itself.
 * @returns an object of thread and messages
 */
export async function fetchThreadFromFirestore(
  threadId: string
): Promise<{ thread: Thread; messages: Message[] }> {
  const db = firebase.firestore();

  const thread = await db
    .collection("threads")
    .doc(threadId)
    .get()
    .then((res) => {
      return res.data() as Thread;
    })
    .catch((err) => {
      throw err;
    });

  const messages = await db
    .collection("messages")
    .where("threadId", "==", threadId)
    .orderBy("sent", "desc")
    .limit(10)
    .get()
    .then((res) => {
      return res.empty ? [] : res.docs.map((doc) => doc.data() as Message);
    })
    .catch((err) => {
      throw err;
    });
  return { thread, messages };
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
