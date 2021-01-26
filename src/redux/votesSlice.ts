import { Message, Thread, Vote } from "../types/firestoreTypes";
import { ReduxAction } from "../types/reduxTypes";
import { voteOnMessage, voteOnThread } from "../utils/updateFirestore";
import { updateStateNoRepeats } from "../utils/updateStateNoRepeats";
import { messageVoteCreator, threadVoteCreator } from "./actionCreators";
import { RootState } from "./reducer";

const initialState: { threadVotes: Vote[]; messageVotes: Vote[] } = {
  threadVotes: [],
  messageVotes: [],
};

// Use the initialState as a default value
export default function votesReducer(
  state = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case "classes/classLoaded": {
      return {
        threadVotes: updateStateNoRepeats(
          state.threadVotes,
          action.payload.threadVotes.votes
        ),
        messageVotes: [...state.messageVotes],
      };
    }
    case "threads/threadLoaded": {
      return {
        messageVotes: updateStateNoRepeats(
          state.messageVotes,
          action.payload.messageVotes.votes
        ),
        threadVotes: [...state.threadVotes],
      };
    }
    case "threads/threadVoted": {
      const newVote: Vote = {
        id: action.payload.thread.id,
        value: action.payload.finalVote,
      };
      return {
        threadVotes: updateStateNoRepeats(state.threadVotes, [newVote]),
        messageVotes: [...state.messageVotes],
      };
    }
    case "messages/messageVoted": {
      const newVote: Vote = {
        id: action.payload.message.id,
        value: action.payload.finalVote,
      };
      return {
        threadVotes: [...state.threadVotes],
        messageVotes: updateStateNoRepeats(state.messageVotes, [newVote]),
      };
    }
    default: {
      return state;
    }
  }
}

// THUNKS

export const voteThread = (thread: Thread, action: 1 | -1) => {
  return async function voteThreadThunk(
    dispatch: any,
    getState: () => RootState
  ) {
    voteOnThread(thread, action)
      .then((res) => {
        dispatch(threadVoteCreator(res.votedItem, res.finalVote, res.change));
      })
      .catch((err) => console.log(err));
  };
};

export const voteMessage = (message: Message, action: 1 | -1) => {
  return async function voteMessageThunk(
    dispatch: any,
    getState: () => RootState
  ) {
    voteOnMessage(message, action)
      .then((res) => {
        dispatch(messageVoteCreator(res.votedItem, res.finalVote, res.change));
      })
      .catch((err) => console.log(err));
  };
};
