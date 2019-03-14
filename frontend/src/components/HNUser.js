import React from 'react';

export const HNUser = ({ username, numberOfComments, overallSent }) => {
  return (
    <div className='hnuser'>
      <p>
        HN User: {username} Total Number of Comments: {numberOfComments} Overall
        Sentiment: {overallSent}
      </p>
      <i className='far fa-angry' />
    </div>
  );
};

export default HNUser;
