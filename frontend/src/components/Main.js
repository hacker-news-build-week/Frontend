import React from 'react';
import PrivateRoute from '../utilities/PrivateRoute';

import NavBar from './NavBar';
import Sentiment from './Sentiment';

const Main = () => {
  return (
    <div className='main'>
      <NavBar />
      <PrivateRoute path='/sentiment' component={Sentiment} />
      {/* <PrivateRoute path='/hnsearch' component={HNSearch} />
      <PrivateRoute path='/hnsearch/:username' component={SingleUser} />
      <PrivateRoute path='/hnsearch/:topic' component={SingleTopic} />
      <PrivateRoute path='/hnleaderboards' component={HNLeaderboards} /> */}
    </div>
  );
};

export default Main;
