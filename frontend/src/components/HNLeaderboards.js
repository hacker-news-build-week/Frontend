import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar';
import HNUser from './HNUser';
// import HNTopic from './HNTopic';
import { fetchSaliestHNUsers, fetchSaliestHNTopics } from '../actions/actions';

const HNLeaderboards = ({
  history,
  fetchSaliestHNUsers,
  fetchSaliestHNTopics,
  saltiestHNUsers,
  saltiestHNTopics
}) => {
  useEffect(() => {
    fetchSaliestHNUsers();
    // fetchSaliestHNTopics();
  }, []);

  return (
    <div className='hnleaderboards'>
      <NavBar history={history} />
      <div className='hnleaderboards-users'>
        <h2>Saltiest Hacker News Users</h2>
        <div className='hnuser-list'>
          {saltiestHNUsers.map(hNUser => (
            <HNUser
              key={hNUser.id}
              username={hNUser.username}
              numberOfComments={hNUser.numberOfComments}
              overallSent={hNUser.overallSentNum}
            />
          ))}
        </div>
      </div>
      {/* <div className='hnleaderboards-topics'>
        <h2>Saltiest Hacker News Topics</h2>
        <div className='hntopic-list'>
          {saltiestHNTopics.map(hNTopic => (
            <HNTopic
              key={hNTopic.id}
              topic={hNTopic.topic}
              numberOfComments={hNTopic.numberOfComments}
              overallSent={hNTopic.overallSent}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
};

const mapStateToProps = ({ saltiestHNUsers, saltiestHNTopics }) => ({
  saltiestHNUsers,
  saltiestHNTopics
});

export default connect(
  mapStateToProps,
  { fetchSaliestHNUsers, fetchSaliestHNTopics }
)(HNLeaderboards);
