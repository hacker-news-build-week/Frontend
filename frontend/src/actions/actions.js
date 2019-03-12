import axios from 'axios';
import axiosAuth from '../utilities/axiosAuth';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

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

export const SUBMIT_COMMENT_REQUEST = 'SUBMIT_COMMENT_REQUEST';
export const SUBMIT_COMMENT_SUCCESS = 'SUBMIT_COMMENT_SUCCESS';
export const SUBMIT_COMMENT_FAILURE = 'SUBMIT_COMMENT_FAILURE';

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

export const SUBMIT_USERNAME_REQUEST = 'SUBMIT_USERNAME_REQUEST';
export const SUBMIT_USERNAME_SUCCESS = 'SUBMIT_USERNAME_SUCCESS';
export const SUBMIT_USERNAME_FAILURE = 'SUBMIT_USERNAME_FAILURE';

export const submitUsername = username => dispatch => {
  dispatch({ type: SUBMIT_USERNAME_REQUEST });
  return axiosAuth()
    .post('http://localhost:5200/api/usernames', username)
    .then(res => {
      dispatch({ type: SUBMIT_USERNAME_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: SUBMIT_USERNAME_FAILURE, payload: err.response.data });
    });
};

export const SUBMIT_TOPIC_REQUEST = 'SUBMIT_TOPIC_REQUEST';
export const SUBMIT_TOPIC_SUCCESS = 'SUBMIT_TOPIC_SUCCESS';
export const SUBMIT_TOPIC_FAILURE = 'SUBMIT_TOPIC_FAILURE';

export const submitTopic = topic => dispatch => {
  dispatch({ type: SUBMIT_TOPIC_REQUEST });
  return axiosAuth()
    .post('http://localhost:5200/api/topics', topic)
    .then(res => {
      dispatch({ type: SUBMIT_TOPIC_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: SUBMIT_TOPIC_FAILURE, payload: err.response.data });
    });
};
