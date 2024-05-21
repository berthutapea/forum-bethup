import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';
import {
  asyncGetDetailThread,
  getDetailThreadActionCreator,
  asyncCreateComment,
  createCommentActionCreator,
} from './action';

/**
 * test scenario
 *
 * - asyncGetDetailThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncCreateComment thunk
 *  - should dispatch action correctly when create comment success
 *  - should dispatch action and call alert correctly when create comment failed
 */

const fakeDetailThreadResponse = {
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

const fakeCommentResponse = {
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
};

const fakeCreateCommentInput = {
  threadId: 'thread-1',
  content: 'Ini adalah komentar pertama',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncGetDetailThread thunk', () => {
  beforeEach(() => {
    api._getDetailThread = api.getDetailThread;
  });

  afterEach(() => {
    api.getDetailThread = api._getDetailThread;

    delete api._getDetailThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getDetailThread = () => Promise.resolve(fakeDetailThreadResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncGetDetailThread()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      getDetailThreadActionCreator(fakeDetailThreadResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when register failed', async () => {
    // arrange
    // stub implementation
    api.getDetailThread = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();

    // action
    await asyncGetDetailThread()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncCreateComment thunk', () => {
  beforeEach(() => {
    api._createComment = api.createComment;
  });

  afterEach(() => {
    api.createComment = api._createComment;

    delete api._createComment;
  });

  it('should dispatch action correctly when create comment success', async () => {
    // arrange
    // stub implementation
    api.createComment = () => Promise.resolve(fakeCommentResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncCreateComment(fakeCreateCommentInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      createCommentActionCreator(fakeCommentResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when create comment failed', async () => {
    // arrange
    // stub implementation
    api.createComment = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();

    // action
    await asyncCreateComment(fakeCreateCommentInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
