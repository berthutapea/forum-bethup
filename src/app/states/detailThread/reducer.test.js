import detailThreadReducer from './reducer';

/**
 * test scenario for detailThreadReducer
 *
 * - detailThreadReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the detailThread when given by GET_DETAIL_THREAD action
 *  - should return the detailThread with the new comment when given by CREATE_COMMENT action
 *  - should return the detailThread with the toggled upvote
 *    when given by UP_VOTE_DETAIL_THREAD action
 *  - should return the detailThread with the toggled downvote
 *    when given by DOWN_VOTE_DETAIL_THREAD action
 *  - should return the detailThread with the toggled neutral vote
 *    when given by NEUTRAL_VOTE_DETAIL_THREAD action
 *  - should return the detailThread with the toggled upvote comment
 *    when given by UP_VOTE_COMMENT_THREAD action
 *  - should return the detailThread with the toggled downvote comment
 *    when given by DOWN_VOTE_COMMENT_THREAD action
 *  - should return the detailThread with the toggled neutral vote comment
 *    when given by NEUTRAL_VOTE_COMMENT_THREAD action
 *
 */

describe('detailThreadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the detailThread when given by GET_DETAIL_THREAD action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'GET_DETAIL_THREAD',
      payload: {
        detailThread: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [],
        },
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.detailThread);
  });

  it('should return the detailThread with the new comment when given by CREATE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'CREATE_COMMENT',
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
          },
        },
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState, comments: [action.payload.comment],
    });
  });

  it('should return the detailThread with the toggled upvote when given by UP_VOTE_DETAIL_THREAD action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'UP_VOTE_DETAIL_THREAD',
      payload: {
        userId: 'user-1',
      },
    };

    // action: upvote
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload.userId],
      downVotesBy: [],
    });

    // action: unupvote
    const nextState2 = detailThreadReducer(nextState, action);

    expect(nextState2).toEqual(initialState);
  });

  it('should return the detailThread with the toggled downvote when given by DOWN_VOTE_DETAIL_THREAD action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'DOWN_VOTE_DETAIL_THREAD',
      payload: {
        userId: 'user-1',
      },
    };

    // action: downvote
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [action.payload.userId],
    });

    // action: undownvote
    const nextState2 = detailThreadReducer(nextState, action);

    expect(nextState2).toEqual(initialState);
  });

  it('should return the detailThread with the neutral vote when given by NEUTRAL_VOTE_THREAD action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'NEUTRAL_VOTE_DETAIL_THREAD',
      payload: {
        userId: 'user-1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [],
    });
  });

  it('should return the detailThread with the toggled upvote comment when given by UP_VOTE_COMMENT_THREAD action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [{
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        upVotesBy: [],
        downVotesBy: [],
        owner: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
        },
      }],
    };

    const action = {
      type: 'UP_VOTE_COMMENT_THREAD',
      payload: {
        userId: 'user-1',
        commentId: 'comment-1',
      },
    };

    // action: upvote comment
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [{
        ...initialState.comments[0],
        upVotesBy: [action.payload.userId],
        downVotesBy: [],
      }],
    });

    // action: unupvote comment
    const nextState2 = detailThreadReducer(nextState, action);

    expect(nextState2).toEqual(initialState);
  });

  it('should return the detailThread with the toggled downvote comment when given by DOWN_VOTE_COMMENT_THREAD action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [{
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        upVotesBy: [],
        downVotesBy: [],
        owner: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
        },
      }],
    };

    const action = {
      type: 'DOWN_VOTE_COMMENT_THREAD',
      payload: {
        userId: 'user-1',
        commentId: 'comment-1',
      },
    };

    // action: downvote comment
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [{
        ...initialState.comments[0],
        upVotesBy: [],
        downVotesBy: [action.payload.userId],
      }],
    });

    // action: undownvote comment
    const nextState2 = detailThreadReducer(nextState, action);

    expect(nextState2).toEqual(initialState);
  });

  it('should return the detailThread with the toggled neutral vote comment when given by NEUTRAL_VOTE_COMMENT_THREAD action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [{
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        upVotesBy: [],
        downVotesBy: [],
        owner: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
        },
      }],
    };

    const action = {
      type: 'NEUTRAL_VOTE_COMMENT_THREAD',
      payload: {
        userId: 'user-1',
        commentId: 'comment-1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [{
        ...initialState.comments[0],
        upVotesBy: [],
        downVotesBy: [],
      }],
    });
  });
});
