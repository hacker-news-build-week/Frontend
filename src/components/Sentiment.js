import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { useInput } from '../utilities/useInput';
import { initialize, fetchComments, addComment } from '../actions/actions';
import NavBar from './NavBar';
import Comment from './Comment';

const Sentiment = ({
  initialize,
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
    if (localStorage.getItem('saltyUserId')) {
      saltyUserId = localStorage.getItem('saltyUserId');
      initialize(saltyUserId);
      fetchComments(saltyUserId);
    } else {
      history.push('/loginsignup');
    }
  }, []);

  const onEnterPress = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      addComment({
        saltyUserId,
        newCommentText: newCommentText.value
      });
      newCommentText.setValue('');
      setCommentCount(commentCount + 1);
    }
  };

  const requestAddComment = e => {
    e.preventDefault();
    addComment({
      saltyUserId,
      newCommentText: newCommentText.value
    });
    newCommentText.setValue('');
    setCommentCount(commentCount + 1);
  };

  return (
    <div className='sentiment'>
      <NavBar history={history} />
      <h1>What is sentiment analysis?</h1>
      <p>
        Sentiment analysis, also known as opinion mining, is an automated data
        mining process that analyzes written or spoken language in order to
        determine the mood or emotion of what is being expressed. Specifically,
        sentiment analysis seeks to discover whether what is expressed is
        positive, negative, or neutral. It is useful in mining large amounts of
        data to determine people's attitudes on particular topics.
      </p>
      <p>
        In basic sentiment analysis, each word is compared to a sentiment
        dictionary and given a sentiment score. Then the overall sentiment is
        determined by the average of the scores for each word. Notably, the text
        is not analyzed for meaning. For example,{' '}
        <span className='example'>&nbsp;I dislike puppies&nbsp;</span> is scored
        as negative while{' '}
        <span className='example'>&nbsp;I dislike love&nbsp;</span> is scored as
        positive. In the counterintuitive second case, the positive score for
        the word <span className='example'>love</span> outweighs the negative
        score for the word <span className='example'>dislike</span>.
      </p>
      <h2>You can try out sentiment analysis by entering text below.</h2>
      <h2>We'll Keep track of your comments (/lyrics/missives) for you.</h2>
      <form onSubmit={requestAddComment} className='add-comment'>
        <textarea
          autoFocus
          required
          type='text'
          value={newCommentText.value}
          onChange={newCommentText.updateValue}
          onKeyDown={onEnterPress}
          placeholder='Enter text here'
          className='comment-box'
        />
        <button type='submit' className='analyze'>
          Analyze Sentiment
        </button>{' '}
        {commentCount >= 3 && addingComment === false && (
          <Link to='/hnanalysis' className='cta'>
            Try sentiment analysis on Hacker News users!
          </Link>
        )}
      </form>

      <div className='comments-list'>
        {comments.map(comment => (
          <Comment
            key={comment.commentId}
            commentId={comment.commentId}
            commentText={comment.commentText}
            commentSent={comment.commentSent}
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
  { initialize, fetchComments, addComment }
)(Sentiment);
