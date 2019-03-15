import React from 'react';
import { Route } from 'react-router-dom';

import PrivateRoute from '../utilities/PrivateRoute';

import LogInSignUp from './LogInSignUp';
import Sentiment from './Sentiment';
import HNAnalysis from './HNAnalysis';
import HNLeaderboards from './HNLeaderboards';

const App = () => {
  return (
    <div className='app'>
      <Route path='/loginsignup' component={LogInSignUp} />
      <PrivateRoute exact path='/' component={Sentiment} />
      <PrivateRoute path='/hnanalysis' component={HNAnalysis} />
      <PrivateRoute path='/hnleaderboards' component={HNLeaderboards} />
    </div>
  );
};

export default App;
