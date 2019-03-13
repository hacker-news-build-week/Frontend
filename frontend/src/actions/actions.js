import axios from 'axios';
import axiosAuth from '../utilities/axiosAuth';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const logIn = creds => dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  return axios
    .post('http://localhost:5200/api/login', creds)
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILURE, payload: err.response });
    });
};

export const INITIALIZE = 'INITIALIZE';

export const initialize = saltyUserId => {
  return { type: INITIALIZE, payload: saltyUserId };
};

export const LOGOUT = 'LOGOUT';

export const logOut = () => {
  return { type: LOGOUT };
};

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const signUp = creds => dispatch => {
  dispatch({ type: SIGNUP_REQUEST });
  return axios
    .post('http://localhost:5200/api/signup', creds)
    .then(res => {
      console.log('res: ', res);
      dispatch({ type: SIGNUP_SUCCESS, payload: res.data.payload });
    })
    .catch(err => {
      console.log('err: ', err);
      dispatch({ type: SIGNUP_FAILURE, payload: err.response });
    });
};

// Fetchs saved comments for salty user:
export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

// I pass in saltyUserId because comments are saved for each salty user:
export const fetchComments = saltyUserId => dispatch => {
  dispatch({ type: FETCH_COMMENTS_REQUEST });
  return axiosAuth()
    .get(`http://localhost:5200/api/saltyComments/${saltyUserId}`)
    .then(res => {
      dispatch({ type: FETCH_COMMENTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_COMMENTS_FAILURE, payload: err.response });
    });
};

// Salty user adds a new comment:
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

// comment is an object that contains saltyUserId and newCommentText
export const addComment = comment => dispatch => {
  dispatch({ type: ADD_COMMENT_REQUEST });
  return axiosAuth()
    .post('http://localhost:5200/api/saltyComments', comment)
    .then(res => {
      dispatch({ type: ADD_COMMENT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: ADD_COMMENT_FAILURE, payload: err.response });
    });
};

// Salty user deletes one of their comments:
export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

// comment is an object that contains saltyUserId and commentIdDelete:
export const deleteComment = comment => dispatch => {
  dispatch({ type: DELETE_COMMENT_REQUEST });
  return axiosAuth()
    .delete('http://localhost:5200/api/saltyComments', {
      data: {
        saltyUserId: comment.saltyUserId,
        commentIdDelete: comment.commentIdDelete
      }
    })
    .then(res => {
      dispatch({ type: DELETE_COMMENT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: DELETE_COMMENT_FAILURE, payload: err.response });
    });
};

// Salty user edits one of their comments:
export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';

// comment is an object that contains saltyUserId, commentId, and editCommentText:
export const editComment = comment => dispatch => {
  dispatch({ type: EDIT_COMMENT_REQUEST });
  return axiosAuth()
    .put('http://localhost:5200/api/saltyComments', comment)
    .then(res => {
      dispatch({ type: EDIT_COMMENT_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: EDIT_COMMENT_FAILURE, payload: err.response });
    });
};

// Salty user can submit a HN username:
export const SUBMIT_HNUSERNAME_REQUEST = 'SUBMIT_HNUSERNAME_REQUEST';
export const SUBMIT_HNUSERNAME_SUCCESS = 'SUBMIT_HNUSERNAME_SUCCESS';
export const SUBMIT_HNUSERNAME_FAILURE = 'SUBMIT_HNUSERNAME_FAILURE';

export const submitHNUsername = HNusername => dispatch => {
  dispatch({ type: SUBMIT_HNUSERNAME_REQUEST });
  return axiosAuth()
    .post('http://localhost:5200/api/HNusernames', HNusername)
    .then(res => {
      dispatch({ type: SUBMIT_HNUSERNAME_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: SUBMIT_HNUSERNAME_FAILURE, payload: err.response });
    });
};

// Fetchs top 10 saltiest HN users:
export const FETCH_SALTIEST_HNUSERS_REQUEST = 'FETCH_SALTIEST_HNUSERS_REQUEST';
export const FETCH_SALTIEST_HNUSERS_SUCCESS = 'FETCH_SALTIEST_HNUSERS_SUCCESS';
export const FETCH_SALTIEST_HNUSERS_FAILURE = 'FETCH_SALTIEST_HNUSERS_FAILURE';

export const fetchSaliestHNUsers = () => dispatch => {
  dispatch({ type: FETCH_SALTIEST_HNUSERS_REQUEST });
  return axiosAuth()
    .get('http://localhost:5200/api/saltiestHNUsers')
    .then(res => {
      dispatch({ type: FETCH_SALTIEST_HNUSERS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: FETCH_SALTIEST_HNUSERS_FAILURE,
        payload: err.response
      });
    });
};

// Fetchs 10 topics (strings) whose posts are the saltiest:
export const FETCH_SALTIEST_HNTOPICS_REQUEST =
  'FETCH_SALTIEST_HNTOPICS_REQUEST';
export const FETCH_SALTIEST_HNTOPICS_SUCCESS =
  'FETCH_SALTIEST_HNTOPICS_SUCCESS';
export const FETCH_SALTIEST_HNTOPICS_FAILURE =
  'FETCH_SALTIEST_HNTOPICS_FAILURE';

export const fetchSaliestHNTopics = () => dispatch => {
  dispatch({ type: FETCH_SALTIEST_HNTOPICS_REQUEST });
  return axiosAuth()
    .get('http://localhost:5200/api/saltiestHNTopics')
    .then(res => {
      dispatch({ type: FETCH_SALTIEST_HNTOPICS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: FETCH_SALTIEST_HNTOPICS_FAILURE,
        payload: err.response
      });
    });
};
