import React from 'react';
import { connect } from 'react-redux';

import { useInput } from '../utilities/useInput';
import { submitHNUsername } from '../actions/actions';
import NavBar from './NavBar';
import HNComment from './HNComment';

const HNAnalysis = ({
  history,
  submitHNUsername,
  hNUsername,
  hNUsernameComments,
  hNUsernameSentiment
}) => {
  const username = useInput();

  const requestSubmitHNUsername = e => {
    e.preventDefault();
    submitHNUsername(username.value);
  };

  return (
    <div className='hnanalysis-form'>
      <NavBar history={history} />
      <h2>Enter a Hacker News Username below:</h2>
      <div className='username-div'>
        <form onSubmit={requestSubmitHNUsername}>
          <input
            required
            type='text'
            value={username.value}
            onChange={username.updateValue}
            placeholder='Hacker News username'
          />
          <button type='submit'>Analyze Sentiment</button>
        </form>
      </div>

      {hNUsername && (
        <div>
          <h3>Hacker News User: {hNUsername}</h3>
          {hNUsernameSentiment >= 0.05 ? (
            <p>
              Overall Sentiment:
              {hNUsernameSentiment}
              <i className='far fa-smile' />
            </p>
          ) : hNUsernameSentiment <= -0.05 ? (
            <p>
              Overall Sentiment:
              {hNUsernameSentiment}
              <i className='far fa-angry' />
            </p>
          ) : (
            <p>
              Overall Sentiment:
              {hNUsernameSentiment}
              <i className='far fa-meh' />
            </p>
          )}
          <h4>Comment Sampler</h4>
          <div className='comments-list'>
            {hNUsernameComments.map((comment, index) => (
              <HNComment
                key={index}
                commentText={comment[0]}
                commentSent={comment[1]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({
  hNUsername,
  hNUsernameSentiment,
  hNUsernameComments
}) => ({
  hNUsername,
  hNUsernameSentiment,
  hNUsernameComments
});

export default connect(
  mapStateToProps,
  { submitHNUsername }
)(HNAnalysis);
