import React from 'react';
import { Route } from 'react-router-dom';

import PrivateRoute from '../utilities/PrivateRoute';

import Login from './Login';
import Main from './Main';

const App = () => {
  return (
    <div className='app'>
      <Route path='/login' component={Login} />
      <PrivateRoute path='/' component={Main} />
    </div>
  );
};

export default App;
