import React from 'react';
import { connect } from 'react-redux';

import { useInput } from '../utilities/useInput';
import { submitUsername, submitTopic } from '../actions/actions';

const HNAnalysis = ({
  submitUsername,
  usernameSentiment,
  submitTopic,
  topicSentiment
}) => {
  const username = useInput();
  const topic = useInput();

  const requestSubmitUsername = e => {
    e.preventDefault();
    submitUsername({
      username: username.value
    });
  };

  const requestSubmitTopic = e => {
    e.preventDefault();
    submitTopic({
      topic: topic.value
    });
  };

  return (
    <div className='hnanalysis-form'>
      <h2>Try it out by entering text below:</h2>
      <div className='username-div'>
        <form onSubmit={requestSubmitUsername}>
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
      <div className='topic-div'>
        <form onSubmit={requestSubmitTopic}>
          <input
            required
            type='text'
            value={topic.value}
            onChange={topic.updateValue}
            placeholder='Hacker News topic'
          />
          <button type='submit'>Analyze Sentiment</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  usernameSentiment: state.commentUsername,
  topicSentiment: state.topicSentiment
});

export default connect(
  mapStateToProps,
  { submitUsername, submitTopic }
)(HNAnalysis);
