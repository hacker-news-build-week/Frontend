import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { useInput } from '../utilities/useInput';
import { submitComment } from '../actions/actions';

const Sentiment = ({ submitComment }) => {
  const comment = useInput();
  let [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    if (commentCount === 3) {
      console.log('Try it out!');
    }
  }, [commentCount]);

  const requestSubmitComment = e => {
    e.preventDefault();

    submitComment({
      comment: comment.value
    });
    setCommentCount(commentCount++);
  };

  return (
    <div className='comment-form'>
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
    </div>
  );
};

export default connect(
  null,
  { submitComment }
)(Sentiment);
