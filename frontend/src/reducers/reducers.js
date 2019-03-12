import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
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
  submittingComment: false,
  // It's possible that this doesn't need to be stored. Right now, I'm not sure how to recieve a response from the server and display the response without storing it in state.
  commentSentiment: '',
  submittingUsername: false,
  usernameSentiment: '',
  submittingTopic: false,
  usernameTopic: '',
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loggingIn: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loggingIn: false, error: null };
    case LOGIN_FAILURE:
      return { ...state, loggingIn: false, error: action.payload };

    case SUBMIT_COMMENT_REQUEST:
      return { ...state, submittingComment: true, error: null };
    case SUBMIT_COMMENT_SUCCESS:
      return {
        ...state,
        submittingComment: false,
        commentSentiment: action.payload,
        error: null
      };
    case SUBMIT_COMMENT_FAILURE:
      return { ...state, submittingComment: false, error: action.payload };

    case SUBMIT_USERNAME_REQUEST:
      return { ...state, submittingUsername: true, error: null };
    case SUBMIT_USERNAME_SUCCESS:
      return {
        ...state,
        submittingUsername: false,
        usernameSentiment: action.payload,
        error: null
      };
    case SUBMIT_USERNAME_FAILURE:
      return { ...state, submittingUsername: false, error: action.payload };

    case SUBMIT_TOPIC_REQUEST:
      return { ...state, submittingTopic: true, error: null };
    case SUBMIT_TOPIC_SUCCESS:
      return {
        ...state,
        submittingTopic: false,
        topicSentiment: action.payload,
        error: null
      };
    case SUBMIT_TOPIC_FAILURE:
      return { ...state, submittingTopic: false, error: action.payload };

    default:
      return state;
  }
};
