import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { useInput } from '../utilities/useInput';
import { fetchComments, addComment } from '../actions/actions';
import NavBar from './NavBar';
import Comment from './Comment';

const Sentiment = ({
  fetchComments,
  comments,
  history,
  saltyUserId,
  addComment,
  addingComment
}) => {
  const newCommentText = useInput();
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    if (comments.length === 0) {
      console.log('comments.length: ', comments.length);
      fetchComments(saltyUserId);
    }
  }, []);

  const requestAddComment = e => {
    e.preventDefault();
    addComment({
      saltyUserId,
      newCommentText: newCommentText.value
    });
    setCommentCount(commentCount + 1);
  };
  return (
    <div className='sentiment'>
      <NavBar history={history} />
      <h1>What is sentiment analysis?</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, quis
        doloremque. Doloribus optio voluptate saepe asperiores laudantium vero
        dignissimos beatae. Quisquam provident libero quos fuga ex in quas fugit
        distinctio?
      </p>
      <h2>Try it out by entering text below:</h2>
      <form onSubmit={requestAddComment}>
        <input
          required
          type='text'
          value={newCommentText.value}
          onChange={newCommentText.updateValue}
          placeholder='Enter text here'
        />
        <button type='submit'>Analyze Sentiment</button>
      </form>
      {commentCount >= 3 && addingComment === false && (
        <Link to='/hnanalysis'>Ready to try it?</Link>
      )}
      <div className='comments-list'>
        {comments.map(comment => (
          <Comment
            key={comment.commentId}
            commentId={comment.commentId}
            commentText={comment.commentText}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ comments, saltyUserId, addingComment }) => ({
  comments,
  saltyUserId,
  addingComment
});

export default connect(
  mapStateToProps,
  { fetchComments, addComment }
)(Sentiment);
