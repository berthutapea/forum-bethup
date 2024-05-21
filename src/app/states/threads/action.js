import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';

const ActionType = {
  CREATE_THREAD: 'CREATE_THREAD',
  GET_ALL_THREADS: 'GET_ALL_THREADS',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD',
};

function createThreadActionCreator(thread) {
  return {
    type: ActionType.CREATE_THREAD,
    payload: {
      thread,
    },
  };
}

function getAllThreadsActionCreator(threads) {
  return {
    type: ActionType.GET_ALL_THREADS,
    payload: {
      threads,
    },
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncCreateThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(createThreadActionCreator(thread));
      return { status: 'success' };
    } catch (error) {
      alert(error.message);
      return { status: 'error' };
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleVoteThread({ threadId, voteType, userId }) {
  return async (dispatch) => {
    dispatch(showLoading());
    switch (voteType) {
      case 1: {
        const responseUpVote = await api.upVoteThread(threadId);
        if (responseUpVote.status === 'success') { dispatch(upVoteThreadActionCreator({ threadId, userId })); }
        break;
      }
      case -1: {
        const responseDownVote = await api.downVoteThread(threadId);
        if (responseDownVote.status === 'success') { dispatch(downVoteThreadActionCreator({ threadId, userId })); }
        break;
      }
      default: {
        const responseNeutralVote = await api.neutralVoteThread(threadId);
        if (responseNeutralVote.status === 'success') { dispatch(neutralVoteThreadActionCreator({ threadId, userId })); }
        break;
      }
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  createThreadActionCreator,
  getAllThreadsActionCreator,
  asyncCreateThread,
  asyncToggleVoteThread,
};
