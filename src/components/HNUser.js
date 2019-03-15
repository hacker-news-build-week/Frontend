import React from 'react';
import { connect } from 'react-redux';

import { submitHNUsername } from '../actions/actions';

export const HNUser = ({
  history,
  username,
  numberOfComments,
  overallSent,
  submitHNUsername
}) => {
  const requestSubmitHNUsername = e => {
    e.preventDefault();
    submitHNUsername(username);
    history.push('/hnanalysis');
  };

  return (
    <div className='hnuser'>
      <p>HN User: </p>
      <div onClick={requestSubmitHNUsername}>{username}</div>{' '}
      <p>
        Total Number of Comments: {numberOfComments} Overall Sentiment:{' '}
        {overallSent}
      </p>
      <i className='far fa-angry' />
    </div>
  );
};

export default connect(
  null,
  { submitHNUsername }
)(HNUser);
