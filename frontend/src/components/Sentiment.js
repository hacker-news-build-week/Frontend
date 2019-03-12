import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { useInput } from '../utilities/useInput';
import { submitComment } from '../actions/actions';

const Sentiment = ({ submitComment, submittingComment, commentSentiment }) => {
  const comment = useInput();
  const [commentCount, setCommentCount] = useState(0);

  const requestSubmitComment = e => {
    e.preventDefault();
    submitComment({
      comment: comment.value
    });
    setCommentCount(commentCount + 1);
  };

  return (
    <div className='sentiment'>
      <h1>What is sentiment analysis?</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, quis
        doloremque. Doloribus optio voluptate saepe asperiores laudantium vero
        dignissimos beatae. Quisquam provident libero quos fuga ex in quas fugit
        distinctio?
      </p>
      <h2>Try it out by entering text below:</h2>
      <form onSubmit={requestSubmitComment}>
        <input
          required
          type='text'
          value={comment.value}
          onChange={comment.updateValue}
          placeholder='Enter text here'
        />
        <button type='submit'>Analyze Sentiment</button>
      </form>
      <p>Sentiment of the entered text: {commentSentiment}</p>
      {commentCount >= 3 && submittingComment === false && (
        <Link to='/hncommentanalysis'>Ready to try it?</Link>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  commentSentiment: state.commentSentiment,
  submittingComment: state.submittingComment
});

export default connect(
  mapStateToProps,
  { submitComment }
)(Sentiment);
