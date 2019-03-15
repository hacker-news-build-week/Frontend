import React from 'react';

export const HNComment = ({ commentText, commentSent }) => {
  return (
    <div className='comment'>
      {commentSent >= 0.05 ? (
        <p>
          {commentText}
          <i className='far fa-smile' />
        </p>
      ) : commentSent <= -0.05 ? (
        <p>
          {commentText}
          <i className='far fa-angry' />
        </p>
      ) : (
        <p>
          {commentText}
          <i className='far fa-meh' />
        </p>
      )}
    </div>
  );
};

export default HNComment;
