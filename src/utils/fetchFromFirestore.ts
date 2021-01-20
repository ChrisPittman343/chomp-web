import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Thread, Class, Message, Roster, Votes } from "../types/firestoreTypes";
import { NO_LOGIN, NULL_RESPONSE } from "../types/errors";

/**
 * Returns basic info for all of a user's classes (From their profile).
 *
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
      console.log("Classes fetch failure:", err);
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
      console.log("Class fetch failure:", err);
      throw err;
    });
}

/**
 * Returns starting data when loading up a new class. (When you click on a class card)
 *
 * This includes a few of the most recent threads (Sorted by creation date), as well as their vote status.
 * @returns array of type Thread
 */
export async function fetchClassDataFromFirestore(classId: string) {
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  try {
    if (!currentUser || !currentUser.email) throw NO_LOGIN;
    const classData = await fetchClassFromFirestore(classId);
    const threads = (
      await db
        .collection("threads")
        .where("classId", "==", classId)
        .orderBy("created", "desc")
        .limit(12)
        .get()
    ).docs.map((doc) => doc.data() as Thread);
    threads.forEach((t) => {
      t.classId = classId;
    });
    const threadVotes: Votes = await db
      .collection("threadVotes")
      .doc(`${classData.id}.${currentUser.uid}`)
      .get()
      .then((res) =>
        res.exists
          ? (res.data() as Votes)
          : ({ email: currentUser.email, votes: [] } as Votes)
      );
    return { class: classData, threads, threadVotes };
  } catch (e) {
    console.log("Class load failure:", e);
    throw e;
  }
}

/**
 * Returns a few replies in a thread (Paginate when necessary), plus the thread itself.
 * @returns an object of thread and messages
 */
export async function fetchThreadFromFirestore(
  threadId: string
): Promise<{ thread: Thread; messages: Message[]; messageVotes: Votes }> {
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  try {
    if (!currentUser || !currentUser.email) throw NO_LOGIN;
    const thread = (
      await db.collection("threads").doc(threadId).get()
    ).data() as Thread;

    const messages = (
      await db
        .collection("messages")
        .where("threadId", "==", threadId)
        .orderBy("sent", "desc")
        .limit(10)
        .get()
    ).docs.map((doc) => doc.data() as Message);

    const messageVotes: Votes = await db
      .collection("messageVotes")
      .doc(`${thread.id}.${currentUser.uid}`)
      .get()
      .then((res) =>
        res.exists
          ? (res.data() as Votes)
          : ({ email: currentUser.email, votes: [] } as Votes)
      );
    return { thread, messages, messageVotes };
  } catch (e) {
    console.log("Thread load failure:", e);
    throw e;
  }
}

/**
 * Returns roster information for a class
 * @param id
 */
export async function fetchRosterFromFirestore(
  classId: string
): Promise<Roster> {
  const db = firebase.firestore();
  try {
    return ((
      await db.collection("rosters").where("classId", "==", classId).get()
    ).docs[0] as unknown) as Roster;
  } catch (e) {
    console.log("Thread load failure:", e);
    throw e;
  }
}
