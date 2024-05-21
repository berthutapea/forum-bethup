import leaderboardsReducer from './reducer';

/**
 * test scenario for leaderboardsReducer
 *
 * - leaderboardsReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the users when given by GET_LEADERBOARDS action
 *
 */

describe('leaderboardsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the leaderboards when given by GET_LEADERBOARDS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'GET_LEADERBOARDS',
      payload: {
        leaderboards: [
          {
            user: {
              id: 'users-1',
              name: 'John Doe',
              email: 'john@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 10,
          },
        ],
      },
    };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
