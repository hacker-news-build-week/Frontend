import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { useInput } from '../utilities/useInput';
import { submitHNUsername } from '../actions/actions';
import NavBar from './NavBar';
import HNComment from './HNComment';

const HNAnalysis = ({
  history,
  submitHNUsername,
  hNUsername,
  hNUsernameComments,
  hNUsernameSentiment,
  submittingHNUsername,
  errorStatusCode
}) => {
  const username = useInput();

  const requestSubmitHNUsername = e => {
    e.preventDefault();
    submitHNUsername(username.value);
    username.setValue('');
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
          <button type='submit' className='hn-user'>
            Search for User
          </button>
        </form>
      </div>

      {errorStatusCode && (
        <div className='error'>
          <h2 className='error'>
            There doesn't seem to be a Hacker News user by that name in our
            dataset.
          </h2>
          <h2 className='error'>
            Please consider checking the{' '}
            <Link to='/hnleaderboards' className='link'>
              HN Leaderboards
            </Link>{' '}
            for inspiration.
          </h2>
        </div>
      )}

      {submittingHNUsername && (
        <div className='loading'>
          <h2>Checking our dataset for username...</h2>
        </div>
      )}

      {hNUsername && (
        <div>
          <h1>Hacker News User: {hNUsername}</h1>
          {hNUsernameSentiment >= 0.05 ? (
            <h2>
              Overall Sentiment:&nbsp;
              {hNUsernameSentiment}
              <i className='far fa-smile' />
            </h2>
          ) : hNUsernameSentiment <= -0.05 ? (
            <h2>
              Overall Sentiment:&nbsp;
              {hNUsernameSentiment}
              <i className='far fa-angry' />
            </h2>
          ) : (
            <h2>
              Overall Sentiment:&nbsp;
              {hNUsernameSentiment}
              <i className='far fa-meh' />
            </h2>
          )}
          <h2>Comment Sampler</h2>
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
  hNUsernameComments,
  submittingHNUsername,
  errorStatusCode
}) => ({
  hNUsername,
  hNUsernameSentiment,
  hNUsernameComments,
  submittingHNUsername,
  errorStatusCode
});

export default connect(
  mapStateToProps,
  { submitHNUsername }
)(HNAnalysis);
