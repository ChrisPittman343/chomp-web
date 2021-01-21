import firebase from "firebase/app";
import "firebase/firestore";
import { auth, db } from "../firebase";
import { NO_LOGIN } from "../types/errors";
import { Message, Thread, Votes } from "../types/firestoreTypes";

export async function resolveFirestoreThread(
  threadId: string,
  messageId: string
) {
  return db
    .collection("threads")
    .doc(threadId)
    .set({ answerId: messageId }, { merge: true })
    .then(() => ({
      threadId,
      messageId,
    }))
    .catch((err) => {
      console.log("Resolve failure:", err);
      throw err;
    });
}

export async function closeFirestoreThread(threadId: string) {
  return db
    .collection("threads")
    .doc(threadId)
    .set({ isClosed: true }, { merge: true })
    .then(() => ({
      threadId,
    }))
    .catch((err) => {
      console.log("Close failure:", err);
      throw err;
    });
}
export const voteOnThread = async (thread: Thread, action: 1 | -1) =>
  voteOnItem("threadVotes", thread.classId, thread, action)
    .then((res) => res)
    .catch((e) => {
      console.log("Thread vote failure:", e);
      throw e;
    });

export const voteOnMessage = async (message: Message, action: 1 | -1) =>
  voteOnItem("messageVotes", message.threadId, message, action)
    .then((res) => res)
    .catch((e) => {
      console.log("Message vote failure:", e);
      throw e;
    });

/**
 * Performs a vote on an ambiguous (Thread / Message) item.
 * This function is mainly just to cut down on repeated code when voting.
 * @param voteCollectionName name of the collection used to store the likes
 * @param parentId id of the item's parents (Can be either classId or threadId)
 * @param item the item that is being voted on
 * @param action +-1, indicates an upvote or downvote
 */
async function voteOnItem<T extends { id: string }>(
  voteCollectionName: "threadVotes" | "messageVotes",
  parentId: string,
  item: T,
  action: 1 | -1
): Promise<{ votedItem: T; finalValue: 1 | 0 | -1 }> {
  const currentUser = auth.currentUser;
  if (!currentUser || !currentUser.email) throw NO_LOGIN;
  const votesRef = db
    .collection(voteCollectionName)
    .doc(`${parentId}.${currentUser?.uid}`);
  try {
    return await db.runTransaction(async (t) => {
      const oldVotes = await getVotes(t, votesRef, currentUser!);
      const [updatedVotes, finalValue] = mutateVotes(oldVotes, item.id, action);
      t.set(
        votesRef,
        { email: currentUser!.email, votes: updatedVotes.votes },
        { merge: true }
      );
      return { votedItem: item, finalValue };
    });
  } catch (e) {
    throw e;
  }
}

/**
 * Fetches the votes from a given reference (Assumed to be a votes doc)
 */
async function getVotes(
  transaction: firebase.firestore.Transaction,
  votesRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>,
  currentUser: firebase.User
): Promise<Votes> {
  return transaction
    .get(votesRef)
    .then((res) =>
      res.exists
        ? (res.data() as Votes)
        : ({ email: currentUser.email!, votes: [] } as Votes)
    )
    .catch((e) => {
      throw e;
    });
}

/**
 * Performs the necessary mutation on the old votes array, whether it be adding a vote, changing a vote, or removing a vote.
 * @returns a tuple of: Votes obj, FinalValue (Represents the final value of the item being voted on AFTER a vote, with 0 being no vote)
 */
const mutateVotes = (
  oldVotes: Votes,
  id: string,
  action: 1 | -1
): [Votes, 1 | 0 | -1] => {
  const votes: Votes = { ...oldVotes };
  let finalValue: 1 | 0 | -1;
  const voteIx = votes.votes.findIndex((v) => v.id === id);
  // IF there is a vote with the SAME action value, delete it
  if (voteIx !== -1 && votes.votes[voteIx].value === action) {
    votes.votes.splice(voteIx, 1);
    finalValue = 0;
  }
  // ELIF there is a vote with a DIFFERENT action value, mutate it
  else if (voteIx !== -1 && votes.votes[voteIx].value !== action) {
    votes.votes[voteIx].value = action;
    finalValue = action;
  }
  // ELSE the vote doesn't exist, so just push it onto the array
  else {
    votes.votes.push({ id: id, value: action });
    finalValue = action;
  }
  return [votes, finalValue];
};
