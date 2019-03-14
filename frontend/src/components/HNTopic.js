import React from 'react';

export const HNTopic = ({ topic, numberOfComments, overallSent }) => {
  return (
    <div className='hntopic'>
      <p>
        HN Topic: {topic} Total Number of Comments: {numberOfComments} Overall
        Sentiment: {overallSent}
      </p>
      <i className='far fa-angry' />
    </div>
  );
};

export default HNTopic;
