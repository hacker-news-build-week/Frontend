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
      {!commentForm && commentSent === 'positive' ? (
        <p>
          {commentText}
          <i className='far fa-smile' />
        </p>
      ) : !commentForm && commentSent === 'neutral' ? (
        <p>
          {commentText}
          <i className='far fa-meh' />
        </p>
      ) : !commentForm && commentSent === 'negative' ? (
        <p>
          {commentText}
          <i className='far fa-angry' />
        </p>
      ) : null}
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
        <button
          onClick={() =>
            deleteComment({ saltyUserId, commentIdDelete: commentId })
          }
        >
          Delete Comment
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ saltyUserId }) => ({ saltyUserId });

export default connect(
  mapStateToProps,
  { editComment, deleteComment }
)(Comment);
