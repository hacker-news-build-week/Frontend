import { LOGIN_SUCCESS } from '../actions/actions';

export const addTokenToLocalStorage = store => next => action => {
  if (action.type === LOGIN_SUCCESS) {
    localStorage.setItem('saltyToken', action.payload);
  }
  next(action);
};
