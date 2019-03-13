import React, { useState } from 'react';
import { connect } from 'react-redux';

import { useInput } from '../utilities/useInput';
import { editComment, deleteComment } from '../actions/actions';

export const Comment = ({
  saltyUserId,
  commentId,
  commentText,
  editComment,
  deleteComment
}) => {
  const editCommentText = useInput(commentText);
  const [commentForm, setCommentForm] = useState(false);

  const editCommentForm = e => {
    e.preventDefault();
    setCommentForm(!commentForm);
  };

  const requestEditComment = e => {
    e.preventDefault();
    editComment({
      saltyUserId,
      commentId,
      commentText: editCommentText.value
    });
    setCommentForm(!editCommentForm);
  };

  //   const requestDeleteComment = e => {
  //     e.preventDefault();
  //     deleteComment({
  //       saltyUserId,
  //       commentId
  //     });
  //   };

  return (
    <div className='comment'>
      {!editCommentForm && <p>{commentText}</p>}
      {editCommentForm && (
        <form onSubmit={requestEditComment}>
          <input
            required
            type='text'
            value={commentText.value}
            onChange={commentText.updateValue}
            placeholder='Enter text here'
          />
          <button type='submit'>Submit Edit</button>
          <button onClick={editCommentForm}>Cancel Edit</button>
        </form>
      )}
      <div className='controls'>
        <button onClick={editCommentForm}>Edit Comment</button>
        <div onClick={() => deleteComment(saltyUserId, commentId)}>
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
