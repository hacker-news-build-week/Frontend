import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SUBMIT_COMMENT_REQUEST,
  SUBMIT_COMMENT_SUCCESS,
  SUBMIT_COMMENT_FAILURE,
  SUBMIT_USERNAME_REQUEST,
  SUBMIT_USERNAME_SUCCESS,
  SUBMIT_USERNAME_FAILURE,
  SUBMIT_TOPIC_REQUEST,
  SUBMIT_TOPIC_SUCCESS,
  SUBMIT_TOPIC_FAILURE
} from '../actions/actions';

const initialState = {
  loggingIn: false,
  saltyToken: localStorage.getItem('saltyToken'),
  saltyUserId: '',
  signingUp: false,
  submittingComment: false,
  comments: [],
  submittingUsername: false,
  usernameSentiment: '',
  errorStatusCode: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loggingIn: true, errorStatusCode: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        saltyUserId: action.payload,
        errorStatusCode: null
      };
    case LOGIN_FAILURE:
      return { ...state, loggingIn: false, errorStatusCode: action.payload };

    case SIGNUP_REQUEST:
      return { ...state, signingUp: true, errorStatusCode: null };
    case SIGNUP_SUCCESS:
      return { ...state, signingUp: false, errorStatusCode: null };
    case SIGNUP_FAILURE:
      return { ...state, signingUp: false, errorStatusCode: action.payload };

    case SUBMIT_COMMENT_REQUEST:
      return { ...state, submittingComment: true, errorStatusCode: null };
    case SUBMIT_COMMENT_SUCCESS:
      return {
        ...state,
        submittingComment: false,
        commentSentiment: action.payload,
        errorStatusCode: null
      };
    case SUBMIT_COMMENT_FAILURE:
      return {
        ...state,
        submittingComment: false,
        errorStatusCode: action.payload
      };

    case SUBMIT_USERNAME_REQUEST:
      return { ...state, submittingUsername: true, errorStatusCode: null };
    case SUBMIT_USERNAME_SUCCESS:
      return {
        ...state,
        submittingUsername: false,
        usernameSentiment: action.payload,
        errorStatusCode: null
      };
    case SUBMIT_USERNAME_FAILURE:
      return {
        ...state,
        submittingUsername: false,
        errorStatusCode: action.payload
      };

    case SUBMIT_TOPIC_REQUEST:
      return { ...state, submittingTopic: true, errorStatusCode: null };
    case SUBMIT_TOPIC_SUCCESS:
      return {
        ...state,
        submittingTopic: false,
        topicSentiment: action.payload,
        errorStatusCode: null
      };
    case SUBMIT_TOPIC_FAILURE:
      return {
        ...state,
        submittingTopic: false,
        errorStatusCode: action.payload
      };

    default:
      return state;
  }
};
