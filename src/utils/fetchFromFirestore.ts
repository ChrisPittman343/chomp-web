import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Channel, Class, Message } from "../types/firestoreTypes";

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
    .then((res) => (res.docs as unknown) as Class[])
    .catch((err) => {
      throw err;
    });
}

/**
 * Returns starting data when loading up a new class. (When you click on a class card)
 *
 * This includes basic Channel data for a class, as well
 * as recent messages from the most popular channel (Paginate when needed).
 *
 * Channels are sorted by creation date.
 * @returns array of type Channel, with the most popular channel having messages in it
 */
export async function fetchInitialClassData(classId: string) {
  const db = firebase.firestore();
  const channelDocs = await db
    .collection("classes")
    .doc(classId)
    .collection("channels")
    .orderBy("stats.total", "desc")
    .get()
    .then((res) => {
      if (res.empty) throw new Error("No channels in class");
      else return res.docs;
    })
    .catch((err) => {
      throw err;
    });
  const popularChannelRef = channelDocs[0];
  const channels = channelDocs.map((doc) => (doc.data() as unknown) as Channel);
  const messageDocs = await db
    .collection("classes")
    .doc(classId)
    .collection("channels")
    .doc(popularChannelRef.id)
    .collection("messages")
    .orderBy("sent", "desc")
    .limit(5)
    .get()
    .then((res) => {
      if (res.empty) return [];
      return res.docs;
    })
    .catch((err) => {
      throw err;
    });
  const messages = messageDocs.map((doc) => (doc.data() as unknown) as Message);
  channels[0].messages = messages;
  console.log(channels);
  return channels;
}

/**
 * Returns basic info for all channels in one class
 * @returns an array of basic channel info for a class
 */
export async function fetchChannels(classId: string) {}
