import axios from 'axios';
import axiosAuth from '../utilities/axiosAuth';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SUBMIT_COMMENT_REQUEST = 'SUBMIT_COMMENT_REQUEST';
export const SUBMIT_COMMENT_SUCCESS = 'SUBMIT_COMMENT_SUCCESS';
export const SUBMIT_COMMENT_FAILURE = 'SUBMIT_COMMENT_FAILURE';

export const ADD_FRIEND_REQUEST = 'ADD_FRIEND_REQUEST';
export const ADD_FRIEND_SUCCESS = 'ADD_FRIEND_SUCCESS';
export const ADD_FRIEND_FAILURE = 'ADD_FRIEND_FAILURE';

export const EDIT_FRIEND_REQUEST = 'EDIT_FRIEND_REQUEST';
export const EDIT_FRIEND_SUCCESS = 'EDIT_FRIEND_SUCCESS';
export const EDIT_FRIEND_FAILURE = 'EDIT_FRIEND_FAILURE';

export const DELETE_FRIEND_REQUEST = 'DELETE_FRIEND_REQUEST';
export const DELETE_FRIEND_SUCCESS = 'DELETE_FRIEND_SUCCESS';
export const DELETE_FRIEND_FAILURE = 'DELETE_FRIEND_FAILURE';

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  return axios
    .post('http://localhost:5200/api/login', creds)
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.payload });
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILURE, payload: err.response.data });
    });
};

export const submitComment = comment => dispatch => {
  dispatch({ type: SUBMIT_COMMENT_REQUEST });
  return axiosAuth()
    .post('http://localhost:5200/api/comments', comment)
    .then(res => {
      dispatch({ type: SUBMIT_COMMENT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: SUBMIT_COMMENT_FAILURE, payload: err.response.data });
    });
};

// export const addFriend = friend => dispatch => {
//   dispatch({ type: ADD_FRIEND_REQUEST });
//   return axiosAuth()
//     .post('http://localhost:5200/api/friends', friend)
//     .then(res => {
//       dispatch({ type: ADD_FRIEND_SUCCESS, payload: res.data });
//     })
//     .catch(err => {
//       dispatch({ type: ADD_FRIEND_FAILURE, payload: err.response.data });
//     });
// };

// export const editFriend = friend => dispatch => {
//   dispatch({ type: EDIT_FRIEND_REQUEST });
//   return axiosAuth()
//     .put(`http://localhost:5200/api/friends/${friend.id}`, friend)
//     .then(res => {
//       dispatch({ type: EDIT_FRIEND_SUCCESS, payload: res.data });
//     })
//     .catch(err => {
//       dispatch({ type: EDIT_FRIEND_FAILURE, payload: err.response.data });
//     });
// };

// export const deleteFriend = id => dispatch => {
//   dispatch({ type: DELETE_FRIEND_REQUEST });
//   return axiosAuth()
//     .delete(`http://localhost:5200/api/friends/${id}`)
//     .then(res => {
//       dispatch({ type: DELETE_FRIEND_SUCCESS, payload: res.data });
//     })
//     .catch(err => {
//       dispatch({ type: DELETE_FRIEND_FAILURE, payload: err.response.data });
//     });
// };
