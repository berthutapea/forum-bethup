import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';
import { asyncIsPreload, isPreloadActionCreator } from './action';
import { loginActionCreator } from '../authUser/action';

/**
 * test scenario
 *
 * - asyncIsPreload thunk
 *  - should dispatch action correctly when isPreload success
 *  - should dispatch action and call alert correctly when isPreload failed
 */

const fakeAuthUserResponse = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncIsPreload thunk', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;

    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when isPreload success', async () => {
    // arrange
    // stub implementation
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);
    api.getAccessToken = () => 'customtoken';
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncIsPreload()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      loginActionCreator(fakeAuthUserResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(isPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when isPreload failed', async () => {
    // arrange
    // stub implementation
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();

    // action
    await asyncIsPreload()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(loginActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(isPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
