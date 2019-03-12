import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SUBMIT_COMMENT_REQUEST,
  SUBMIT_COMMENT_SUCCESS,
  SUBMIT_COMMENT_FAILURE,
  ADD_FRIEND_REQUEST,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_FAILURE,
  EDIT_FRIEND_REQUEST,
  EDIT_FRIEND_SUCCESS,
  EDIT_FRIEND_FAILURE,
  DELETE_FRIEND_REQUEST,
  DELETE_FRIEND_SUCCESS,
  DELETE_FRIEND_FAILURE
} from '../actions/actions';

const initialState = {
  loggingIn: false,
  submittingComment: false,
  // It's possible that this doesn't need to be stored. Right now, I'm not sure how to recieve a response from the server and display the response without storing it in state.
  commentSentiment: '',
  addingFriend: false,
  editingFriend: false,
  deletingFriend: false,
  friends: [],
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

    case ADD_FRIEND_REQUEST:
      return { ...state, addingFriend: true, error: null };
    case ADD_FRIEND_SUCCESS:
      return {
        ...state,
        addingFriend: false,
        friends: action.payload,
        error: null
      };
    case ADD_FRIEND_FAILURE:
      return { ...state, addingFriend: false, error: action.payload };

    case EDIT_FRIEND_REQUEST:
      return { ...state, editingFriend: true, error: null };
    case EDIT_FRIEND_SUCCESS:
      return {
        ...state,
        editingFriend: false,
        friends: action.payload,
        error: null
      };
    case EDIT_FRIEND_FAILURE:
      return { ...state, editingFriend: false, error: action.payload };

    case DELETE_FRIEND_REQUEST:
      return { ...state, deletingFriend: true, error: null };
    case DELETE_FRIEND_SUCCESS:
      return {
        ...state,
        deletingFriend: false,
        friends: action.payload,
        error: null
      };
    case DELETE_FRIEND_FAILURE:
      return { ...state, deletingFriend: false, error: action.payload };

    default:
      return state;
  }
};
