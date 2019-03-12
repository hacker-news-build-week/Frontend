import React from 'react';
import PrivateRoute from '../utilities/PrivateRoute';

import NavBar from './NavBar';
import Sentiment from './Sentiment';
import HNAnalysis from './HNAnalysis';

const Main = () => {
  return (
    <div className='main'>
      <NavBar />
      <PrivateRoute path='/sentiment' component={Sentiment} />
      <PrivateRoute path='/hnanalysis' component={HNAnalysis} />
      {/* <PrivateRoute path='/hnanalysis/:username' component={SingleUser} />
      <PrivateRoute path='/hnanalysis/:topic' component={SingleTopic} />
      <PrivateRoute path='/hnleaderboards' component={HNLeaderboards} /> */}
    </div>
  );
};

export default Main;
