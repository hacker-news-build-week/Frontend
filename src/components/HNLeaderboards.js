import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar';
import HNUser from './HNUser';
import { fetchSaliestHNUsers } from '../actions/actions';

const HNLeaderboards = ({ history, fetchSaliestHNUsers, saltiestHNUsers }) => {
  useEffect(() => {
    fetchSaliestHNUsers();
  }, []);

  return (
    <div className='hnleaderboards'>
      <NavBar history={history} />
      <div className='hnleaderboards-users'>
        <h1 className='salty'>Saltiest Hacker News Users</h1>
        <div className='hnuser-list'>
          {saltiestHNUsers.map((hNUser, index) => (
            <HNUser
              key={hNUser.id}
              history={history}
              score={index + 1}
              username={hNUser.username}
              numberOfComments={hNUser.numberOfComments}
              overallSent={hNUser.overallSentNum}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ saltiestHNUsers }) => ({
  saltiestHNUsers
});

export default connect(
  mapStateToProps,
  { fetchSaliestHNUsers }
)(HNLeaderboards);
