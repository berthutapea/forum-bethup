import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';
import { getAllThreadsActionCreator } from '../threads/action';
import { getAllUsersActionCreator } from '../users/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();
      dispatch(getAllThreadsActionCreator(threads));
      dispatch(getAllUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { asyncPopulateUsersAndThreads };
