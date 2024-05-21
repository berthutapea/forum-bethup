import { ActionType } from './action';

function usersReducer(users = [], action = {}) {
  switch (action.type) {
    case ActionType.REGISTER_USER:
      return [action.payload.user, ...users];
    case ActionType.GET_ALL_USERS:
      return action.payload.users;
    default:
      return users;
  }
}

export default usersReducer;
