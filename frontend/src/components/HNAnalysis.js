import React from 'react';
import { connect } from 'react-redux';

import { useInput } from '../utilities/useInput';
import { submitHNUsername } from '../actions/actions';

const HNAnalysis = ({ submitHNUsername, hNUsernameSentiment }) => {
  const username = useInput();

  const requestSubmitHNUsername = e => {
    e.preventDefault();
    submitHNUsername({
      username: username.value
    });
  };

  return (
    <div className='hnanalysis-form'>
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
    </div>
  );
};

const mapStateToProps = ({ hNUsernameSentiment, hNUsernameComments }) => ({
  hNUsernameSentiment,
  hNUsernameComments
});

export default connect(
  mapStateToProps,
  { submitHNUsername }
)(HNAnalysis);
