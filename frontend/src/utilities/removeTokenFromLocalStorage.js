import { LOGOUT } from '../actions/actions';

export const removeTokenFromLocalStorage = store => next => action => {
  if (action.type === LOGOUT) {
    localStorage.removeItem('saltyToken');
    localStorage.removeItem('saltyUserId');
  }
  next(action);
};
