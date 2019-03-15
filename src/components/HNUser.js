import React from 'react';
import { connect } from 'react-redux';

import { submitHNUsername } from '../actions/actions';

export const HNUser = ({
  history,
  username,
  numberOfComments,
  overallSent,
  score,
  submitHNUsername
}) => {
  const requestSubmitHNUsername = e => {
    e.preventDefault();
    submitHNUsername(username);
    history.push('/hnanalysis');
  };

  return (
    <div className='hnuser'>
      <h2 className='score'>{score}.&nbsp;&nbsp;</h2>
      <div onClick={requestSubmitHNUsername} className='hnusername-link'>
        {username}
      </div>
      &nbsp; &nbsp;
      <h2 className='leaderboard'>
        &nbsp; &nbsp; Comments analyzed: {numberOfComments} &nbsp; &nbsp;
        Overall Sentiment: {overallSent}
      </h2>
      <div className='leaderboard-icon'>
        <i className='far fa-angry' />
      </div>
    </div>
  );
};

export default connect(
  null,
  { submitHNUsername }
)(HNUser);
