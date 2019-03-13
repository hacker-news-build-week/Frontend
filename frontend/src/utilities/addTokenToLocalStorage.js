import { LOGIN_SUCCESS } from '../actions/actions';

export const addTokenToLocalStorage = store => next => action => {
  if (action.type === LOGIN_SUCCESS) {
    localStorage.setItem('saltyToken', action.payload.saltyToken);
    localStorage.setItem('saltyUserId', action.payload.saltyUserId);
  }
  next(action);
};
