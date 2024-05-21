import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';

const ActionType = {
  GET_DETAIL_THREAD: 'GET_DETAIL_THREAD',
  RESET_DETAIL_THREAD: 'RESET_DETAIL_THREAD',
  CREATE_COMMENT: 'CREATE_COMMENT',
  UP_VOTE_DETAIL_THREAD: 'UP_VOTE_DETAIL_THREAD',
  DOWN_VOTE_DETAIL_THREAD: 'DOWN_VOTE_DETAIL_THREAD',
  NEUTRAL_VOTE_DETAIL_THREAD: 'NEUTRAL_VOTE_DETAIL_THREAD',
  UP_VOTE_COMMENT_THREAD: 'UP_VOTE_COMMENT_THREAD',
  DOWN_VOTE_COMMENT_THREAD: 'DOWN_VOTE_COMMENT_THREAD',
  NEUTRAL_VOTE_COMMENT_THREAD: 'NEUTRAL_VOTE_COMMENT_THREAD',
};

function getDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.GET_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function createCommentActionCreator(comment) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteDetailThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_DETAIL_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteDetailThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_DETAIL_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralVoteDetailThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_DETAIL_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function upVoteCommentThreadActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT_THREAD,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentThreadActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT_THREAD,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralVoteCommentThreadActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT_THREAD,
    payload: {
      commentId,
      userId,
    },
  };
}

function resetDetailThreadActionCreator() {
  return {
    type: ActionType.RESET_DETAIL_THREAD,
  };
}

function asyncGetDetailThread(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const detailThread = await api.getDetailThread(id);
      dispatch(getDetailThreadActionCreator(detailThread));
      return { status: 'success' };
    } catch (error) {
      alert(error.message);
      return { status: 'error' };
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncCreateComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(createCommentActionCreator(comment));
      return { status: 'success' };
    } catch (error) {
      alert(error.message);
      return { status: 'error' };
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleVoteDetailThread({ threadId, voteType, userId }) {
  return async (dispatch) => {
    dispatch(showLoading());
    switch (voteType) {
      case 1: {
        const responseUpVote = await api.upVoteThread(threadId);
        if (responseUpVote.status === 'success') { dispatch(upVoteDetailThreadActionCreator({ threadId, userId })); }
        break;
      }
      case -1: {
        const responseDownVote = await api.downVoteThread(threadId);
        if (responseDownVote.status === 'success') { dispatch(downVoteDetailThreadActionCreator({ threadId, userId })); }
        break;
      }
      default: {
        const responseNeutralVote = await api.downVoteThread(threadId);
        if (responseNeutralVote.status === 'success') { dispatch(neutralVoteDetailThreadActionCreator({ threadId, userId })); }
        break;
      }
    }
    dispatch(hideLoading());
  };
}

function asyncToggleVoteCommentThread({
  threadId, commentId, voteType, userId,
}) {
  return async (dispatch) => {
    dispatch(showLoading());
    switch (voteType) {
      case 1: {
        const responseUpVote = await api.upVoteComment({ threadId, commentId });
        if (responseUpVote.status === 'success') { dispatch(upVoteCommentThreadActionCreator({ commentId, userId })); }
        break;
      }
      case -1: {
        const responseDownVote = await api.downVoteComment({ threadId, commentId });
        if (responseDownVote.status === 'success') { dispatch(downVoteCommentThreadActionCreator({ commentId, userId })); }
        break;
      }
      default: {
        const responseNeutralVote = await api.neutralVoteComment({ threadId, commentId });
        if (responseNeutralVote.status === 'success') { dispatch(neutralVoteCommentThreadActionCreator({ commentId, userId })); }
        break;
      }
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  getDetailThreadActionCreator,
  createCommentActionCreator,
  resetDetailThreadActionCreator,
  asyncGetDetailThread,
  asyncCreateComment,
  asyncToggleVoteDetailThread,
  asyncToggleVoteCommentThread,
};
