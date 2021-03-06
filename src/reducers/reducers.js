import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  INITIALIZE,
  LOGOUT,
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
  FETCH_SALTIEST_HNUSERS_FAILURE
} from '../actions/actions';

const initialState = {
  loggingIn: false,
  saltyUserId: '',
  signingUp: false,
  fetchingComments: false,
  comments: [],
  addingComment: false,
  deletingComment: false,
  editingComment: false,
  submittingHNUsername: false,
  hNUsername: '',
  hNUsernameComments: [],
  hNUsernameSentiment: '',
  fetchingSaltiestHNUsers: false,
  saltiestHNUsers: [],
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
        saltyUserId: action.payload.saltyUserId,
        errorStatusCode: null
      };
    case LOGIN_FAILURE:
      return { ...state, loggingIn: false, errorStatusCode: action.payload };

    case INITIALIZE:
      return { ...state, saltyUserId: action.payload };

    case LOGOUT:
      return { ...initialState };

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
      const roundedSent = action.payload.user_average_sentiment.toFixed(4);
      return {
        ...state,
        submittingHNUsername: false,
        hNUsername: action.payload.hNUsername,
        hNUsernameComments: action.payload.top_10,
        hNUsernameSentiment: roundedSent,
        errorStatusCode: null
      };
    case SUBMIT_HNUSERNAME_FAILURE:
      return {
        ...state,
        submittingHNUsername: false,
        hNUsername: '',
        hNUsernameComments: [],
        hNUsernameSentiment: '',
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

    default:
      return state;
  }
};
