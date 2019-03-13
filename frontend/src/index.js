import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { addTokenToLocalStorage } from './utilities/addTokenToLocalStorage';
import { removeTokenFromLocalStorage } from './utilities/removeTokenFromLocalStorage';
import rootReducer from './reducers/reducers';

import App from './components/App';
import './main.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      addTokenToLocalStorage,
      removeTokenFromLocalStorage,
      logger
    )
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
