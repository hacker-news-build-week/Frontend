import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { useInput } from '../utilities/useInput';
import { submitComment } from '../actions/actions';

const Sentiment = ({ submitComment }) => {
  const comment = useInput();
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    if (commentCount === 3) {
      console.log('Try it out!');
    }
  }, [commentCount]);

  const requestSubmitComment = e => {
    e.preventDefault();
    submitComment({
      comment: comment.value
    }).then(comment.setValue(''));
    setCommentCount(commentCount + 1);
  };

  return (
    <div className='sentiment'>
      <h1>What is sentiment analusis?</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, quis
        doloremque. Doloribus optio voluptate saepe asperiores laudantium vero
        dignissimos beatae. Quisquam provident libero quos fuga ex in quas fugit
        distinctio?
      </p>
      <h2>Try it out by entering a comment below:</h2>
      <form onSubmit={requestSubmitComment}>
        <input
          required
          type='text'
          value={comment.value}
          name='comment'
          onChange={comment.updateValue}
          placeholder='Enter comment here'
        />
        <button type='submit'>Analyze Sentiment</button>
      </form>
      {commentCount === 3 && (
        <Link to='/hncommentanalysis'>Ready to try it?</Link>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  commentSentiment: state.commentSentiment
});

export default connect(
  mapStateToProps,
  { submitComment }
)(Sentiment);
