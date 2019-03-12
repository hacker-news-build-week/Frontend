import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  SUBMIT_HNUSERNAME_REQUEST,
  SUBMIT_HNUSERNAME_SUCCESS,
  SUBMIT_HNUSERNAME_FAILURE,
  FETCH_SALTIEST_HNUSERS_REQUEST,
  FETCH_SALTIEST_HNUSERS_SUCCESS,
  FETCH_SALTIEST_HNUSERS_FAILURE,
  FETCH_SALTIEST_HNTOPICS_REQUEST,
  FETCH_SALTIEST_HNTOPICS_SUCCESS,
  FETCH_SALTIEST_HNTOPICS_FAILURE
} from '../actions/actions';

const initialState = {
  loggingIn: false,
  saltyToken: localStorage.getItem('saltyToken'),
  saltyUserId: '',
  signingUp: false,
  fetchingComments: false,
  comments: [],
  addingComment: false,
  deletingComment: false,
  editingComment: false,
  submittingHNUsername: false,
  hNUsernameSentiment: '',
  fetchingSaltiestHNUsers: false,
  saltiestHNUsers: [],
  fetchingSaltiestHNTopics: false,
  saltiestHNTopics: [],
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

    case FETCH_COMMENTS_REQUEST:
      return { ...state, fetchingComments: true, errorStatusCode: null };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        fetchingComments: false,
        comments: action.payload,
        errorStatusCode: null
      };
    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        fetchingComments: false,
        errorStatusCode: action.payload
      };

    case ADD_COMMENT_REQUEST:
      return { ...state, addingComment: true, errorStatusCode: null };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addingComment: false,
        comments: action.payload,
        errorStatusCode: null
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addingComment: false,
        errorStatusCode: action.payload
      };

    case DELETE_COMMENT_REQUEST:
      return { ...state, deletingComment: true, errorStatusCode: null };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        deletingComment: false,
        comments: action.payload,
        errorStatusCode: null
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        deletingComment: false,
        errorStatusCode: action.payload
      };

    case EDIT_COMMENT_REQUEST:
      return { ...state, editingComment: true, errorStatusCode: null };
    case EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        editingComment: false,
        comments: action.payload,
        errorStatusCode: null
      };
    case EDIT_COMMENT_FAILURE:
      return {
        ...state,
        editingComment: false,
        errorStatusCode: action.payload
      };

    case SUBMIT_HNUSERNAME_REQUEST:
      return { ...state, submittingHNUsername: true, errorStatusCode: null };
    case SUBMIT_HNUSERNAME_SUCCESS:
      return {
        ...state,
        submittingHNUsername: false,
        hNUsernameSentiment: action.payload,
        errorStatusCode: null
      };
    case SUBMIT_HNUSERNAME_FAILURE:
      return {
        ...state,
        submittingHNUsername: false,
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

    case FETCH_SALTIEST_HNUSERS_REQUEST:
      return { ...state, fetchingSaltiestHNUsers: true, errorStatusCode: null };
    case FETCH_SALTIEST_HNUSERS_SUCCESS:
      return {
        ...state,
        fetchingSaltiestHNUsers: false,
        saltiestHNUsers: action.payload,
        errorStatusCode: null
      };
    case FETCH_SALTIEST_HNUSERS_FAILURE:
      return {
        ...state,
        fetchingSaltiestHNUsers: false,
        errorStatusCode: action.payload
      };

    case FETCH_SALTIEST_HNTOPICS_REQUEST:
      return {
        ...state,
        fetchingSaltiestHNTopics: true,
        errorStatusCode: null
      };
    case FETCH_SALTIEST_HNTOPICS_SUCCESS:
      return {
        ...state,
        fetchingSaltiestHNTopics: false,
        saltiestHNTopics: action.payload,
        errorStatusCode: null
      };
    case FETCH_SALTIEST_HNTOPICS_FAILURE:
      return {
        ...state,
        fetchingSaltiestHNTopics: false,
        errorStatusCode: action.payload
      };

    default:
      return state;
  }
};
