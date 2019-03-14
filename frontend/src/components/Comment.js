import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { useInput } from '../utilities/useInput';
import { editComment, deleteComment } from '../actions/actions';

export const Comment = ({
  saltyUserId,
  commentId,
  commentText,
  commentSent,
  editComment,
  deleteComment
}) => {
  const editCommentText = useInput('');
  const [commentForm, setCommentForm] = useState(false);

  useEffect(() => {
    if (commentText) {
      editCommentText.setValue(commentText);
    }
  }, [commentText]);

  const editCommentForm = e => {
    e.preventDefault();
    setCommentForm(!commentForm);
  };

  const requestEditComment = e => {
    e.preventDefault();
    editComment({
      saltyUserId,
      commentId,
      editCommentText: editCommentText.value
    });
    setCommentForm(!editCommentForm);
  };

  return (
    <div className='comment'>
      {!commentForm && (
        <p>
          {commentText} {commentSent}
        </p>
      )}
      {commentForm && (
        <form onSubmit={requestEditComment}>
          <input
            required
            type='text'
            value={editCommentText.value}
            onChange={editCommentText.updateValue}
            placeholder='Enter text here'
          />
          <button type='submit'>Submit Edit</button>
          <button onClick={editCommentForm}>Cancel Edit</button>
        </form>
      )}
      <div className='controls'>
        <button onClick={editCommentForm}>Edit Comment</button>
        <div
          onClick={() =>
            deleteComment({ saltyUserId, commentIdDelete: commentId })
          }
        >
          <i className='fas fa-times' />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ saltyUserId }) => ({ saltyUserId });

export default connect(
  mapStateToProps,
  { editComment, deleteComment }
)(Comment);
