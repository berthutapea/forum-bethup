import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './states/authUser/reducer';
import isPreloadReducer from './states/isPreload/reducer';
import threadsReducer from './states/threads/reducer';
import usersReducer from './states/users/reducer';
import detailThreadReducer from './states/detailThread/reducer';
import leaderboardsReducer from './states/leaderboards/reducer';

const rootReducer = combineReducers({
  isPreload: isPreloadReducer,
  loadingBar: loadingBarReducer,
  authUser: authUserReducer,
  users: usersReducer,
  threads: threadsReducer,
  detailThread: detailThreadReducer,
  leaderboards: leaderboardsReducer,
});

export const setupStore = (preloadedState) => configureStore({
  reducer: rootReducer,
  preloadedState,
});

export const store = setupStore();
