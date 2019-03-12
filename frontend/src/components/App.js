import React from 'react';
import { Route } from 'react-router-dom';

import PrivateRoute from '../utilities/PrivateRoute';

import LogInSignUp from './LogInSignUp';
import Main from './Main';

const App = () => {
  return (
    <div className='app'>
      <Route path='/loginsignup' component={LogInSignUp} />
      <PrivateRoute exact path='/' component={Main} />
    </div>
  );
};

export default App;
