import firebase from "firebase/app";
import "firebase/firestore";

export async function resolveThread(threadId: string, messageId: string) {
  const db = firebase.firestore();
  return db
    .collection("threads")
    .doc(threadId)
    .set({ answerId: messageId }, { merge: true })
    .then(() => ({
      threadId,
      messageId,
    }))
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

export async function closeThread(threadId: string) {
  const db = firebase.firestore();
  return db
    .collection("threads")
    .doc(threadId)
    .set({ isClosed: true }, { merge: true })
    .then(() => ({
      threadId,
    }))
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

export async function voteThread(threadId: string, value: 1 | -1) {
  const db = firebase.firestore();
  return db
    .collection("threads")
    .doc(threadId)
    .set(
      { isClosed: true, score: firebase.firestore.FieldValue.increment(value) },
      { merge: true }
    )
    .then(() => ({
      threadId,
      value,
    }))
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

export async function voteMessage(messageId: string, value: 1 | -1) {
  const db = firebase.firestore();
  return db
    .collection("messages")
    .doc(messageId)
    .set({ isClosed: true }, { merge: true })
    .then(() => ({
      messageId,
    }))
    .catch((err) => {
      console.log(err);
      throw err;
    });
}
