import React from 'react';
import { Route } from 'react-router-dom';

import PrivateRoute from '../utilities/PrivateRoute';

import Login from './Login';

const App = () => {
  return (
    <div className='app'>
      <Route path='/login' component={Login} />
      {/* <PrivateRoute exact path='/' component={NavBar} />
      <PrivateRoute exact path='/' component={SentimentTest} />
      <PrivateRoute path='/:username' component={SingleUser} />
      <PrivateRoute path='/leaderboards' component={Leaderboards} /> */}
    </div>
  );
};

export default App;
